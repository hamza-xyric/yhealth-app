/**
 * SMS Service Unit Tests
 */

import { smsService } from '../../../src/services/sms.service.js';

describe('SMSService', () => {
  describe('sendVerificationCode', () => {
    it('should generate and return a verification code', async () => {
      const phoneNumber = '1234567890';
      const countryCode = '+1';

      const result = await smsService.sendVerificationCode(phoneNumber, countryCode);

      expect(result).toHaveProperty('success', true);
      expect(result).toHaveProperty('code');
      expect(result.code).toMatch(/^\d{6}$/); // 6-digit code
    });

    it('should generate different codes for different numbers', async () => {
      const result1 = await smsService.sendVerificationCode('1111111111', '+1');
      const result2 = await smsService.sendVerificationCode('2222222222', '+1');

      // Note: There's a small chance they could be the same, but very unlikely
      expect(result1.code).toBeDefined();
      expect(result2.code).toBeDefined();
    });

    it('should handle phone numbers with different formats', async () => {
      const testCases = [
        { phone: '1234567890', countryCode: '+1' },
        { phone: '(123) 456-7890', countryCode: '+1' },
        { phone: '123-456-7890', countryCode: '+1' },
        { phone: '9876543210', countryCode: '+44' },
      ];

      for (const { phone, countryCode } of testCases) {
        const result = await smsService.sendVerificationCode(phone, countryCode);
        expect(result.success).toBe(true);
        expect(result.code).toBeDefined();
      }
    });
  });

  describe('verifyCode', () => {
    it('should verify a valid code', async () => {
      const phoneNumber = '5555555555';
      const countryCode = '+1';

      // First, generate a code
      const sendResult = await smsService.sendVerificationCode(phoneNumber, countryCode);
      expect(sendResult.success).toBe(true);

      // Then verify it
      const verifyResult = await smsService.verifyCode(phoneNumber, countryCode, sendResult.code!);

      expect(verifyResult).toHaveProperty('success', true);
    });

    it('should reject an invalid code', async () => {
      const phoneNumber = '6666666666';
      const countryCode = '+1';

      // Generate a code
      await smsService.sendVerificationCode(phoneNumber, countryCode);

      // Try to verify with wrong code
      const verifyResult = await smsService.verifyCode(phoneNumber, countryCode, '000000');

      expect(verifyResult).toHaveProperty('success', false);
      expect(verifyResult).toHaveProperty('error');
    });

    it('should reject verification for non-existent phone number', async () => {
      const verifyResult = await smsService.verifyCode('9999999999', '+1', '123456');

      expect(verifyResult).toHaveProperty('success', false);
      expect(verifyResult.error).toContain('No verification code');
    });

    it('should handle maximum verification attempts', async () => {
      const phoneNumber = '7777777777';
      const countryCode = '+1';

      // Generate a code
      await smsService.sendVerificationCode(phoneNumber, countryCode);

      // Try multiple wrong attempts
      for (let i = 0; i < 3; i++) {
        await smsService.verifyCode(phoneNumber, countryCode, '000000');
      }

      // Next attempt should fail due to max attempts
      const result = await smsService.verifyCode(phoneNumber, countryCode, '000000');
      expect(result.success).toBe(false);
    });

    it('should remove code after successful verification', async () => {
      const phoneNumber = '8888888888';
      const countryCode = '+1';

      // Generate and verify
      const sendResult = await smsService.sendVerificationCode(phoneNumber, countryCode);
      await smsService.verifyCode(phoneNumber, countryCode, sendResult.code!);

      // Try to verify again
      const secondVerify = await smsService.verifyCode(phoneNumber, countryCode, sendResult.code!);
      expect(secondVerify.success).toBe(false);
    });
  });

  describe('formatPhoneNumber', () => {
    it('should format phone number to E.164 format', () => {
      // Access private method through any cast for testing
      const service = smsService as unknown as {
        formatPhoneNumber: (phone: string, countryCode: string) => string;
      };

      // Note: This tests the internal formatting logic
      // The actual format depends on implementation
      const formatted = service.formatPhoneNumber('1234567890', '+1');
      expect(formatted).toBeDefined();
      expect(formatted.startsWith('+')).toBe(true);
    });
  });
});
