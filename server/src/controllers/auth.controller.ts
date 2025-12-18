import type { Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { query, transaction } from '../database/pg.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateTokens } from '../middlewares/auth.middleware.js';
import { emailService, smsService, oauthService, logger } from '../services/index.js';
import type { AuthenticatedRequest } from '../types/index.js';
import type {
  RegisterInput,
  LoginInput,
  SocialAuthInput,
  CompleteSocialProfileInput,
  ConsentInput,
  WhatsAppEnrollmentInput,
  WhatsAppVerificationInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '../validators/auth.validator.js';

// Type definitions for raw PostgreSQL results
interface UserRow {
  id: string;
  email: string;
  password: string | null;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  gender: string;
  role: string;
  is_active: boolean;
  is_email_verified: boolean;
  avatar: string | null;
  phone: string | null;
  auth_provider: string;
  onboarding_status: string;
  onboarding_completed_at: Date | null;
  last_login: Date | null;
  refresh_token: string | null;
  password_reset_token: string | null;
  password_reset_expires: Date | null;
  email_verification_token: string | null;
  email_verification_expires: Date | null;
  created_at: Date;
  updated_at: Date;
}

interface ConsentRow {
  id: string;
  user_id: string;
  type: string;
  version: string;
  consented_at: Date;
  ip: string | null;
}

interface WhatsAppRow {
  id: string;
  user_id: string;
  phone_number: string;
  country_code: string;
  is_verified: boolean;
  verified_at: Date | null;
  consented_at: Date | null;
}

interface SocialProfileRow {
  id: string;
  user_id: string;
  provider: string;
  provider_id: string;
  email: string | null;
  name: string | null;
  avatar: string | null;
}

const CONSENT_VERSION = '1.0.0';

// Helper to hash password
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

// Helper to compare password
async function comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch {
    return false;
  }
}

// Helper to convert snake_case to camelCase user
function mapUserRow(row: UserRow) {
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    firstName: row.first_name,
    lastName: row.last_name,
    dateOfBirth: row.date_of_birth,
    gender: row.gender,
    role: row.role,
    isActive: row.is_active,
    isEmailVerified: row.is_email_verified,
    avatar: row.avatar,
    phone: row.phone,
    authProvider: row.auth_provider,
    onboardingStatus: row.onboarding_status,
    onboardingCompletedAt: row.onboarding_completed_at,
    lastLogin: row.last_login,
    refreshToken: row.refresh_token,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Helper to get public profile
function getPublicProfile(user: ReturnType<typeof mapUserRow>) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    gender: user.gender,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    onboardingStatus: user.onboardingStatus,
    createdAt: user.createdAt,
  };
}

// Helper to check if user has consent
function hasConsent(consents: ConsentRow[], type: string): boolean {
  return consents.some(c => c.type === type);
}

/**
 * S01.1.1: Core Account Registration
 * POST /api/auth/register
 */
export const register = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as RegisterInput;

  // Check if email exists
  const existingResult = await query<UserRow>(
    'SELECT id FROM users WHERE email = $1',
    [data.email.toLowerCase()]
  );

  if (existingResult.rows.length > 0) {
    throw ApiError.conflict('This email is already registered. Sign in or reset password?');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Generate email verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const hashedVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  // Create user with preferences in a transaction
  const user = await transaction(async (client) => {
    const userResult = await client.query<UserRow>(
      `INSERT INTO users (
        email, password, first_name, last_name, date_of_birth, gender,
        auth_provider, onboarding_status, email_verification_token, email_verification_expires
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        data.email.toLowerCase(),
        hashedPassword,
        data.firstName,
        data.lastName,
        new Date(data.dateOfBirth),
        data.gender,
        'local',
        'consent_pending',
        hashedVerificationToken,
        new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      ]
    );

    const newUser = userResult.rows[0];

    // Create default preferences
    await client.query(
      'INSERT INTO user_preferences (user_id) VALUES ($1)',
      [newUser.id]
    );

    return mapUserRow(newUser);
  });

  // Send verification email
  await emailService.sendVerificationEmail(
    user.email,
    user.firstName,
    verificationToken
  );

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Update user with refresh token
  await query(
    'UPDATE users SET refresh_token = $1 WHERE id = $2',
    [tokens.refreshToken, user.id]
  );

  logger.info('User registered', { userId: user.id, email: user.email });

  ApiResponse.created(res, {
    user: getPublicProfile(user),
    tokens,
    nextStep: 'consent',
  }, 'Account created successfully');
});

/**
 * S01.1.2: Social Sign-In (Google/Apple)
 * POST /api/auth/social
 */
export const socialAuth = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as SocialAuthInput;

  // Verify the social token
  const profileData = await oauthService.verifySocialToken(
    data.provider,
    data.idToken
  );

  if (!profileData) {
    throw ApiError.unauthorized('Invalid social authentication token');
  }

  // Check if user exists with this social ID
  const existingSocialResult = await query<SocialProfileRow & { user_email: string }>(
    `SELECT sp.*, u.email as user_email FROM social_profiles sp
     JOIN users u ON sp.user_id = u.id
     WHERE sp.provider = $1 AND sp.provider_id = $2`,
    [data.provider, profileData.providerId]
  );

  if (existingSocialResult.rows.length > 0) {
    // Existing user - sign in
    const socialProfile = existingSocialResult.rows[0];

    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE id = $1',
      [socialProfile.user_id]
    );
    const user = mapUserRow(userResult.rows[0]);

    await query(
      'UPDATE users SET last_login = $1 WHERE id = $2',
      [new Date(), user.id]
    );

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    await query(
      'UPDATE users SET refresh_token = $1 WHERE id = $2',
      [tokens.refreshToken, user.id]
    );

    logger.info('Social sign-in', { userId: user.id, provider: data.provider });

    ApiResponse.success(res, {
      user: getPublicProfile(user),
      tokens,
      isNewUser: false,
      needsProfileCompletion: !user.dateOfBirth || !user.gender,
    }, 'Signed in successfully');
    return;
  }

  // Check if email exists from regular registration
  const existingUserResult = await query<UserRow>(
    'SELECT * FROM users WHERE email = $1',
    [profileData.email.toLowerCase()]
  );

  if (existingUserResult.rows.length > 0) {
    // Link social account to existing user
    const existingUser = mapUserRow(existingUserResult.rows[0]);

    await query(
      `INSERT INTO social_profiles (user_id, provider, provider_id, email, name, avatar, access_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        existingUser.id,
        data.provider,
        profileData.providerId,
        profileData.email,
        profileData.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : null,
        profileData.avatar || null,
        data.accessToken || null,
      ]
    );

    const tokens = generateTokens({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    });

    await query(
      'UPDATE users SET refresh_token = $1, last_login = $2 WHERE id = $3',
      [tokens.refreshToken, new Date(), existingUser.id]
    );

    logger.info('Social account linked', {
      userId: existingUser.id,
      provider: data.provider,
    });

    ApiResponse.success(res, {
      user: getPublicProfile(existingUser),
      tokens,
      isNewUser: false,
      accountLinked: true,
    }, 'Account linked successfully');
    return;
  }

  // New user - create account
  const user = await transaction(async (client) => {
    const userResult = await client.query<UserRow>(
      `INSERT INTO users (
        email, first_name, last_name, avatar, auth_provider,
        is_email_verified, onboarding_status, date_of_birth, gender
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [
        profileData.email.toLowerCase(),
        profileData.firstName || '',
        profileData.lastName || '',
        profileData.avatar,
        data.provider,
        true, // Social providers verify email
        'consent_pending',
        new Date('1990-01-01'), // Placeholder
        'prefer_not_to_say', // Placeholder
      ]
    );

    const newUser = userResult.rows[0];

    // Create social profile
    await client.query(
      `INSERT INTO social_profiles (user_id, provider, provider_id, email, name, avatar, access_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        newUser.id,
        data.provider,
        profileData.providerId,
        profileData.email,
        profileData.firstName ? `${profileData.firstName} ${profileData.lastName || ''}`.trim() : null,
        profileData.avatar,
        data.accessToken,
      ]
    );

    // Create default preferences
    await client.query(
      'INSERT INTO user_preferences (user_id) VALUES ($1)',
      [newUser.id]
    );

    return mapUserRow(newUser);
  });

  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  await query(
    'UPDATE users SET refresh_token = $1 WHERE id = $2',
    [tokens.refreshToken, user.id]
  );

  // Send welcome email
  if (user.firstName) {
    await emailService.sendWelcomeEmail(user.email, user.firstName);
  }

  logger.info('Social registration', { userId: user.id, provider: data.provider });

  ApiResponse.created(res, {
    user: getPublicProfile(user),
    tokens,
    isNewUser: true,
    needsProfileCompletion: true,
    nextStep: 'complete_profile',
  }, 'Account created successfully');
});

/**
 * Complete social profile (DOB, Gender for social sign-up)
 * POST /api/auth/complete-profile
 */
export const completeSocialProfile = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw ApiError.unauthorized();

    const data = req.body as CompleteSocialProfileInput;

    const result = await query<UserRow>(
      `UPDATE users SET
        date_of_birth = $1,
        gender = $2,
        first_name = COALESCE($3, first_name),
        last_name = COALESCE($4, last_name),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $5
      RETURNING *`,
      [
        new Date(data.dateOfBirth),
        data.gender,
        data.firstName || null,
        data.lastName || null,
        userId,
      ]
    );

    const user = mapUserRow(result.rows[0]);

    logger.info('Profile completed', { userId });

    ApiResponse.success(res, {
      user: getPublicProfile(user),
      nextStep: 'consent',
    }, 'Profile updated successfully');
  }
);

/**
 * S01.1.3: Privacy Consent
 * POST /api/auth/consent
 */
export const submitConsent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const data = req.body as ConsentInput;

  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  if (userResult.rows.length === 0) throw ApiError.notFound('User not found');
  const user = mapUserRow(userResult.rows[0]);

  const ip = req.ip || req.headers['x-forwarded-for']?.toString() || '';
  const now = new Date();

  // Upsert consents and update user in transaction
  await transaction(async (client) => {
    // Upsert terms_of_service consent
    await client.query(
      `INSERT INTO consent_records (user_id, type, version, consented_at, ip)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, type) DO UPDATE SET
         version = EXCLUDED.version,
         consented_at = EXCLUDED.consented_at,
         ip = EXCLUDED.ip`,
      [userId, 'terms_of_service', CONSENT_VERSION, now, ip]
    );

    // Upsert privacy_policy consent
    await client.query(
      `INSERT INTO consent_records (user_id, type, version, consented_at, ip)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, type) DO UPDATE SET
         version = EXCLUDED.version,
         consented_at = EXCLUDED.consented_at,
         ip = EXCLUDED.ip`,
      [userId, 'privacy_policy', CONSENT_VERSION, now, ip]
    );

    // Add optional email_marketing consent
    if (data.emailMarketing) {
      await client.query(
        `INSERT INTO consent_records (user_id, type, version, consented_at, ip)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, type) DO UPDATE SET
           version = EXCLUDED.version,
           consented_at = EXCLUDED.consented_at,
           ip = EXCLUDED.ip`,
        [userId, 'email_marketing', CONSENT_VERSION, now, ip]
      );
    }

    // Update onboarding status
    await client.query(
      `UPDATE users SET onboarding_status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2`,
      ['assessment_pending', userId]
    );
  });

  // Send welcome email if not already sent
  if (!user.isEmailVerified && user.authProvider === 'local') {
    await emailService.sendWelcomeEmail(user.email, user.firstName);
  }

  const updatedUserResult = await query<UserRow>(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );
  const updatedUser = mapUserRow(updatedUserResult.rows[0]);

  logger.info('Consent submitted', { userId });

  ApiResponse.success(res, {
    user: getPublicProfile(updatedUser),
    nextStep: 'whatsapp_enrollment',
  }, 'Consent recorded successfully');
});

/**
 * WhatsApp Enrollment - Send Verification Code
 * POST /api/auth/whatsapp/enroll
 */
export const enrollWhatsApp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const data = req.body as WhatsAppEnrollmentInput;

  const userResult = await query<UserRow>(
    'SELECT id FROM users WHERE id = $1',
    [userId]
  );

  if (userResult.rows.length === 0) throw ApiError.notFound('User not found');

  // Check if phone is already taken
  const phoneTakenResult = await query<WhatsAppRow>(
    'SELECT id FROM whatsapp_enrollments WHERE phone_number = $1 AND user_id != $2',
    [data.phoneNumber, userId]
  );

  if (phoneTakenResult.rows.length > 0) {
    throw ApiError.conflict('This phone number is already registered');
  }

  // Send verification code
  const result = await smsService.sendVerificationCode(data.phoneNumber, data.countryCode);

  if (!result.success) {
    throw ApiError.badRequest(result.message || 'Failed to send verification code');
  }

  // Store phone number (unverified) - upsert
  await query(
    `INSERT INTO whatsapp_enrollments (user_id, phone_number, country_code, is_verified)
     VALUES ($1, $2, $3, false)
     ON CONFLICT (user_id) DO UPDATE SET
       phone_number = EXCLUDED.phone_number,
       country_code = EXCLUDED.country_code,
       is_verified = false,
       verified_at = NULL,
       consented_at = NULL`,
    [userId, data.phoneNumber, data.countryCode]
  );

  logger.info('WhatsApp enrollment started', { userId });

  ApiResponse.success(res, {
    expiresIn: result.expiresIn,
  }, 'Verification code sent');
});

/**
 * WhatsApp Verification
 * POST /api/auth/whatsapp/verify
 */
export const verifyWhatsApp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const data = req.body as WhatsAppVerificationInput;

  const whatsAppResult = await query<WhatsAppRow>(
    'SELECT * FROM whatsapp_enrollments WHERE user_id = $1',
    [userId]
  );

  if (whatsAppResult.rows.length === 0) {
    throw ApiError.badRequest('No WhatsApp enrollment found. Please enroll first.');
  }

  const whatsApp = whatsAppResult.rows[0];

  // Verify code
  const result = smsService.verifyCode(
    whatsApp.phone_number,
    whatsApp.country_code,
    data.code
  );

  if (!result.success) {
    throw ApiError.badRequest(result.message || 'Invalid verification code');
  }

  const ip = req.ip || '';
  const now = new Date();

  // Update WhatsApp enrollment and add consent in transaction
  await transaction(async (client) => {
    await client.query(
      `UPDATE whatsapp_enrollments SET
        is_verified = true,
        verified_at = $1,
        consented_at = $1
      WHERE user_id = $2`,
      [now, userId]
    );

    // Add WhatsApp consent
    await client.query(
      `INSERT INTO consent_records (user_id, type, version, consented_at, ip)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, type) DO UPDATE SET
         version = EXCLUDED.version,
         consented_at = EXCLUDED.consented_at,
         ip = EXCLUDED.ip`,
      [userId, 'whatsapp_coaching', CONSENT_VERSION, now, ip]
    );
  });

  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );
  const user = mapUserRow(userResult.rows[0]);

  logger.info('WhatsApp verified', { userId });

  ApiResponse.success(res, {
    user: getPublicProfile(user),
    nextStep: 'assessment',
  }, 'WhatsApp verified successfully');
});

/**
 * Skip WhatsApp Enrollment
 * POST /api/auth/whatsapp/skip
 */
export const skipWhatsApp = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  // Delete any partial WhatsApp enrollment
  await query(
    'DELETE FROM whatsapp_enrollments WHERE user_id = $1',
    [userId]
  );

  logger.info('WhatsApp enrollment skipped', { userId });

  ApiResponse.success(res, {
    nextStep: 'assessment',
  }, 'WhatsApp enrollment skipped');
});

/**
 * Login
 * POST /api/auth/login
 */
export const login = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as LoginInput;

  // Find user with password
  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE email = $1',
    [data.email.toLowerCase()]
  );

  if (userResult.rows.length === 0) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const user = mapUserRow(userResult.rows[0]);

  if (!user.password) {
    throw ApiError.unauthorized('Please sign in with your social account');
  }

  // Check password
  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Check if account is active
  if (!user.isActive) {
    throw ApiError.forbidden('Your account has been deactivated');
  }

  // Generate tokens
  const tokens = generateTokens({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  // Update user
  await query(
    'UPDATE users SET last_login = $1, refresh_token = $2 WHERE id = $3',
    [new Date(), tokens.refreshToken, user.id]
  );

  logger.info('User logged in', { userId: user.id });

  ApiResponse.success(res, {
    user: getPublicProfile(user),
    tokens,
  }, 'Logged in successfully');
});

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as ForgotPasswordInput;

  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE email = $1',
    [data.email.toLowerCase()]
  );

  // Always return success to prevent email enumeration
  if (userResult.rows.length === 0) {
    ApiResponse.success(res, null, 'If the email exists, a reset link will be sent');
    return;
  }

  const user = mapUserRow(userResult.rows[0]);

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  await query(
    'UPDATE users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3',
    [hashedToken, new Date(Date.now() + 60 * 60 * 1000), user.id] // 1 hour
  );

  // Send reset email
  await emailService.sendPasswordResetEmail(user.email, user.firstName, resetToken);

  logger.info('Password reset requested', { userId: user.id });

  ApiResponse.success(res, null, 'If the email exists, a reset link will be sent');
});

/**
 * Reset Password
 * POST /api/auth/reset-password
 */
export const resetPassword = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as ResetPasswordInput;

  // Hash token
  const hashedToken = crypto
    .createHash('sha256')
    .update(data.token)
    .digest('hex');

  // Find user with valid token
  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE password_reset_token = $1 AND password_reset_expires > $2',
    [hashedToken, new Date()]
  );

  if (userResult.rows.length === 0) {
    throw ApiError.badRequest('Invalid or expired reset token');
  }

  const user = mapUserRow(userResult.rows[0]);

  // Hash new password
  const hashedPassword = await hashPassword(data.password);

  // Update password
  await query(
    `UPDATE users SET
      password = $1,
      password_reset_token = NULL,
      password_reset_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $2`,
    [hashedPassword, user.id]
  );

  logger.info('Password reset', { userId: user.id });

  ApiResponse.success(res, null, 'Password reset successfully');
});

/**
 * Verify Email
 * POST /api/auth/verify-email
 */
export const verifyEmail = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const data = req.body as VerifyEmailInput;

  // Hash token
  const hashedToken = crypto
    .createHash('sha256')
    .update(data.token)
    .digest('hex');

  // Find user with valid token
  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE email_verification_token = $1 AND email_verification_expires > $2',
    [hashedToken, new Date()]
  );

  if (userResult.rows.length === 0) {
    throw ApiError.badRequest('Invalid or expired verification token');
  }

  const user = mapUserRow(userResult.rows[0]);

  // Verify email
  await query(
    `UPDATE users SET
      is_email_verified = true,
      email_verification_token = NULL,
      email_verification_expires = NULL,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1`,
    [user.id]
  );

  logger.info('Email verified', { userId: user.id });

  ApiResponse.success(res, null, 'Email verified successfully');
});

/**
 * Logout
 * POST /api/auth/logout
 */
export const logout = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (userId) {
    await query(
      'UPDATE users SET refresh_token = NULL WHERE id = $1',
      [userId]
    );
    logger.info('User logged out', { userId });
  }

  ApiResponse.success(res, null, 'Logged out successfully');
});

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const userResult = await query<UserRow>(
    'SELECT * FROM users WHERE id = $1',
    [userId]
  );

  if (userResult.rows.length === 0) throw ApiError.notFound('User not found');

  const user = mapUserRow(userResult.rows[0]);

  ApiResponse.success(res, {
    user: getPublicProfile(user),
  });
});

/**
 * Get onboarding status
 * GET /api/auth/onboarding-status
 */
export const getOnboardingStatus = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) throw ApiError.unauthorized();

    const userResult = await query<UserRow>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) throw ApiError.notFound('User not found');

    const user = mapUserRow(userResult.rows[0]);

    const consentsResult = await query<ConsentRow>(
      'SELECT * FROM consent_records WHERE user_id = $1',
      [userId]
    );
    const consents = consentsResult.rows;

    const whatsAppResult = await query<WhatsAppRow>(
      'SELECT * FROM whatsapp_enrollments WHERE user_id = $1',
      [userId]
    );
    const whatsApp = whatsAppResult.rows[0];

    const hasTerms = hasConsent(consents, 'terms_of_service');
    const hasPrivacy = hasConsent(consents, 'privacy_policy');

    const status = {
      currentStep: user.onboardingStatus,
      steps: {
        registered: true,
        consent: hasTerms && hasPrivacy,
        whatsApp: whatsApp?.is_verified || false,
        assessment: user.onboardingStatus !== 'registered' &&
                    user.onboardingStatus !== 'consent_pending' &&
                    user.onboardingStatus !== 'assessment_pending',
        goals: ['goals_pending', 'integrations_pending', 'preferences_pending', 'plan_pending', 'completed']
          .includes(user.onboardingStatus),
        integrations: ['integrations_pending', 'preferences_pending', 'plan_pending', 'completed']
          .includes(user.onboardingStatus),
        preferences: ['preferences_pending', 'plan_pending', 'completed']
          .includes(user.onboardingStatus),
        plan: user.onboardingStatus === 'completed',
      },
      isComplete: user.onboardingStatus === 'completed',
      completedAt: user.onboardingCompletedAt,
    };

    ApiResponse.success(res, status);
  }
);

export default {
  register,
  socialAuth,
  completeSocialProfile,
  submitConsent,
  enrollWhatsApp,
  verifyWhatsApp,
  skipWhatsApp,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  logout,
  getCurrentUser,
  getOnboardingStatus,
};
