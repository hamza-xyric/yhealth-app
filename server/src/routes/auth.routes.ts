import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authLimiter, strictLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  registerSchema,
  verifyRegistrationSchema,
  resendRegistrationOTPSchema,
  socialAuthSchema,
  completeSocialProfileSchema,
  consentSchema,
  whatsAppEnrollmentSchema,
  whatsAppVerificationSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  updateProfileSchema,
} from '../validators/auth.validator.js';
import authController from '../controllers/auth.controller.js';

const router = Router();

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

// S01.1.1: Core Account Registration - Step 1: Send OTP
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  authController.register
);

// S01.1.1: Core Account Registration - Step 2: Verify OTP and Create Account
router.post(
  '/verify-registration',
  authLimiter,
  validate(verifyRegistrationSchema),
  authController.verifyRegistration
);

// Resend Registration OTP
router.post(
  '/resend-registration-otp',
  strictLimiter,
  validate(resendRegistrationOTPSchema),
  authController.resendRegistrationOTP
);

// S01.1.2: Social Sign-In (Google/Apple)
router.post(
  '/social',
  authLimiter,
  validate(socialAuthSchema),
  authController.socialAuth
);

// Login
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  authController.login
);

// Forgot Password
router.post(
  '/forgot-password',
  strictLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);

// Reset Password
router.post(
  '/reset-password',
  strictLimiter,
  validate(resetPasswordSchema),
  authController.resetPassword
);

// Verify Email
router.post(
  '/verify-email',
  validate(verifyEmailSchema),
  authController.verifyEmail
);

// ============================================
// PROTECTED ROUTES (Authentication required)
// ============================================

// Complete Social Profile (DOB, Gender)
router.post(
  '/complete-profile',
  authenticate,
  validate(completeSocialProfileSchema),
  authController.completeSocialProfile
);

// S01.1.3: Privacy Consent
router.post(
  '/consent',
  authenticate,
  validate(consentSchema),
  authController.submitConsent
);

// WhatsApp Enrollment
router.post(
  '/whatsapp/enroll',
  authenticate,
  strictLimiter,
  validate(whatsAppEnrollmentSchema),
  authController.enrollWhatsApp
);

// WhatsApp Verification
router.post(
  '/whatsapp/verify',
  authenticate,
  validate(whatsAppVerificationSchema),
  authController.verifyWhatsApp
);

// Skip WhatsApp Enrollment
router.post(
  '/whatsapp/skip',
  authenticate,
  authController.skipWhatsApp
);

// Logout
router.post(
  '/logout',
  authenticate,
  authController.logout
);

// Get Current User
router.get(
  '/me',
  authenticate,
  authController.getCurrentUser
);

// Get Onboarding Status
router.get(
  '/onboarding-status',
  authenticate,
  authController.getOnboardingStatus
);

// Update Profile
router.patch(
  '/profile',
  authenticate,
  validate(updateProfileSchema),
  authController.updateProfile
);

export default router;
