/**
 * Auth Validator Unit Tests
 */

import {
  registerSchema,
  loginSchema,
  socialAuthSchema,
  recordConsentSchema,
  whatsAppEnrollSchema,
  verifyWhatsAppSchema,
  refreshTokenSchema,
} from '../../../src/validators/auth.validator.js';

describe('Auth Validators', () => {
  describe('registerSchema', () => {
    const validData = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-15',
      gender: 'male',
    };

    it('should validate correct registration data', () => {
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = registerSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('email');
      }
    });

    it('should reject weak password', () => {
      const result = registerSchema.safeParse({
        ...validData,
        password: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing required fields', () => {
      const result = registerSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid gender', () => {
      const result = registerSchema.safeParse({
        ...validData,
        gender: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid gender options', () => {
      const genders = ['male', 'female', 'non_binary', 'prefer_not_to_say'];

      for (const gender of genders) {
        const result = registerSchema.safeParse({ ...validData, gender });
        expect(result.success).toBe(true);
      }
    });

    it('should reject future birth date', () => {
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);

      const result = registerSchema.safeParse({
        ...validData,
        dateOfBirth: futureDate.toISOString().split('T')[0],
      });
      expect(result.success).toBe(false);
    });

    it('should reject names that are too short', () => {
      const result = registerSchema.safeParse({
        ...validData,
        firstName: 'A',
      });
      expect(result.success).toBe(false);
    });

    it('should transform email to lowercase', () => {
      const result = registerSchema.safeParse({
        ...validData,
        email: 'TEST@EXAMPLE.COM',
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('test@example.com');
      }
    });
  });

  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: 'SecurePass123!',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = loginSchema.safeParse({
        email: 'not-an-email',
        password: 'password123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const result = loginSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('socialAuthSchema', () => {
    it('should validate Google auth data', () => {
      const result = socialAuthSchema.safeParse({
        provider: 'google',
        idToken: 'some-google-id-token',
      });
      expect(result.success).toBe(true);
    });

    it('should validate Apple auth data with user data', () => {
      const result = socialAuthSchema.safeParse({
        provider: 'apple',
        idToken: 'some-apple-id-token',
        userData: {
          email: 'user@icloud.com',
          name: {
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid provider', () => {
      const result = socialAuthSchema.safeParse({
        provider: 'facebook',
        idToken: 'some-token',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing idToken', () => {
      const result = socialAuthSchema.safeParse({
        provider: 'google',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('recordConsentSchema', () => {
    it('should validate consent data', () => {
      const result = recordConsentSchema.safeParse({
        consents: [
          { type: 'terms_of_service', version: '1.0', accepted: true },
          { type: 'privacy_policy', version: '1.0', accepted: true },
        ],
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid consent type', () => {
      const result = recordConsentSchema.safeParse({
        consents: [
          { type: 'invalid_type', version: '1.0', accepted: true },
        ],
      });
      expect(result.success).toBe(false);
    });

    it('should validate all consent types', () => {
      const consentTypes = [
        'terms_of_service',
        'privacy_policy',
        'email_marketing',
        'whatsapp_coaching',
      ];

      for (const type of consentTypes) {
        const result = recordConsentSchema.safeParse({
          consents: [{ type, version: '1.0', accepted: true }],
        });
        expect(result.success).toBe(true);
      }
    });

    it('should require version string', () => {
      const result = recordConsentSchema.safeParse({
        consents: [
          { type: 'terms_of_service', accepted: true },
        ],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('whatsAppEnrollSchema', () => {
    it('should validate WhatsApp enrollment data', () => {
      const result = whatsAppEnrollSchema.safeParse({
        phoneNumber: '1234567890',
        countryCode: '+1',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid phone number', () => {
      const result = whatsAppEnrollSchema.safeParse({
        phoneNumber: '123',
        countryCode: '+1',
      });
      expect(result.success).toBe(false);
    });

    it('should accept country codes with + prefix', () => {
      const validCodes = ['+1', '+44', '+91', '+86'];

      for (const countryCode of validCodes) {
        const result = whatsAppEnrollSchema.safeParse({
          phoneNumber: '1234567890',
          countryCode,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe('verifyWhatsAppSchema', () => {
    it('should validate verification data', () => {
      const result = verifyWhatsAppSchema.safeParse({
        phoneNumber: '1234567890',
        countryCode: '+1',
        code: '123456',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid code format', () => {
      const result = verifyWhatsAppSchema.safeParse({
        phoneNumber: '1234567890',
        countryCode: '+1',
        code: '12345', // Too short
      });
      expect(result.success).toBe(false);
    });

    it('should reject non-numeric code', () => {
      const result = verifyWhatsAppSchema.safeParse({
        phoneNumber: '1234567890',
        countryCode: '+1',
        code: 'abcdef',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('refreshTokenSchema', () => {
    it('should validate refresh token', () => {
      const result = refreshTokenSchema.safeParse({
        refreshToken: 'some-refresh-token',
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing refresh token', () => {
      const result = refreshTokenSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    it('should reject empty refresh token', () => {
      const result = refreshTokenSchema.safeParse({
        refreshToken: '',
      });
      expect(result.success).toBe(false);
    });
  });
});
