/**
 * User Model Unit Tests
 */

import { User, type IUserDocument } from '../../../src/models/user.model.js';
import { generateUserData, createTestUser } from '../../helpers/testUtils.js';

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a new user with valid data', async () => {
      const userData = generateUserData();
      const user = new User(userData);
      await user.save();

      expect(user._id).toBeDefined();
      expect(user.email).toBe(userData.email.toLowerCase());
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.role).toBe('user');
      expect(user.isActive).toBe(true);
    });

    it('should hash password before saving', async () => {
      const password = 'PlainTextPassword123!';
      const user = await createTestUser({ password });

      // Password should be hashed
      expect(user.password).not.toBe(password);
      expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt hash format
    });

    it('should not rehash password if not modified', async () => {
      const user = await createTestUser();
      const originalPassword = user.password;

      user.firstName = 'UpdatedName';
      await user.save();

      expect(user.password).toBe(originalPassword);
    });

    it('should enforce email uniqueness', async () => {
      const email = 'unique@example.com';
      await createTestUser({ email });

      await expect(createTestUser({ email })).rejects.toThrow();
    });

    it('should convert email to lowercase', async () => {
      const user = await createTestUser({ email: 'UPPER@EXAMPLE.COM' });
      expect(user.email).toBe('upper@example.com');
    });

    it('should set default values', async () => {
      const user = await createTestUser();

      expect(user.role).toBe('user');
      expect(user.isActive).toBe(true);
      expect(user.isEmailVerified).toBe(true); // Set in createTestUser
      expect(user.authProvider).toBe('local');
      expect(user.onboardingStatus).toBe('registered');
    });
  });

  describe('User Methods', () => {
    describe('comparePassword', () => {
      it('should return true for correct password', async () => {
        const password = 'CorrectPassword123!';
        const user = await createTestUser({ password });

        // Need to select password field
        const userWithPassword = await User.findById(user._id).select('+password');
        const isMatch = await userWithPassword!.comparePassword(password);

        expect(isMatch).toBe(true);
      });

      it('should return false for incorrect password', async () => {
        const user = await createTestUser({ password: 'CorrectPassword123!' });

        const userWithPassword = await User.findById(user._id).select('+password');
        const isMatch = await userWithPassword!.comparePassword('WrongPassword!');

        expect(isMatch).toBe(false);
      });

      it('should return false if no password set', async () => {
        // Create user via social auth (no password)
        const userData = generateUserData();
        delete (userData as unknown as Record<string, unknown>)['password'];
        const user = new User({
          ...userData,
          authProvider: 'google',
          socialProfiles: [{
            provider: 'google',
            providerId: 'google-123',
            email: userData.email,
          }],
        });
        await user.save();

        const isMatch = await user.comparePassword('anypassword');
        expect(isMatch).toBe(false);
      });
    });

    describe('getPublicProfile', () => {
      it('should return public profile without sensitive data', async () => {
        const user = await createTestUser();
        const profile = user.getPublicProfile();

        expect(profile._id).toBeDefined();
        expect(profile.email).toBe(user.email);
        expect(profile.firstName).toBe(user.firstName);
        expect(profile.lastName).toBe(user.lastName);
        expect(profile.role).toBe(user.role);

        // Should not include sensitive data
        expect(profile).not.toHaveProperty('password');
        expect(profile).not.toHaveProperty('refreshToken');
        expect(profile).not.toHaveProperty('passwordResetToken');
      });
    });

    describe('getAge', () => {
      it('should calculate age correctly', async () => {
        const birthYear = new Date().getFullYear() - 25;
        const dateOfBirth = new Date(birthYear, 0, 1); // January 1st

        const user = await createTestUser();
        user.dateOfBirth = dateOfBirth;
        await user.save();

        const age = user.getAge();
        expect(age).toBeGreaterThanOrEqual(24);
        expect(age).toBeLessThanOrEqual(25);
      });
    });

    describe('hasConsent and addConsent', () => {
      it('should check if user has specific consent', async () => {
        const user = await createTestUser();

        user.addConsent({
          type: 'terms_of_service',
          version: '1.0',
          consentedAt: new Date(),
        });

        expect(user.hasConsent('terms_of_service')).toBe(true);
        expect(user.hasConsent('privacy_policy')).toBe(false);
      });

      it('should add new consent', async () => {
        const user = await createTestUser();

        user.addConsent({
          type: 'privacy_policy',
          version: '2.0',
          consentedAt: new Date(),
        });

        expect(user.consents).toHaveLength(1);
        expect(user.consents[0]?.type).toBe('privacy_policy');
        expect(user.consents[0]?.version).toBe('2.0');
      });

      it('should update existing consent', async () => {
        const user = await createTestUser();

        user.addConsent({
          type: 'terms_of_service',
          version: '1.0',
          consentedAt: new Date(),
        });

        user.addConsent({
          type: 'terms_of_service',
          version: '2.0',
          consentedAt: new Date(),
        });

        // Should still have only one consent of this type
        const tosConsents = user.consents.filter(c => c.type === 'terms_of_service');
        expect(tosConsents).toHaveLength(1);
        expect(tosConsents[0]?.version).toBe('2.0');
      });
    });
  });

  describe('Static Methods', () => {
    describe('findByEmail', () => {
      it('should find user by email', async () => {
        const email = 'findme@example.com';
        await createTestUser({ email });

        const found = await User.findByEmail(email);

        expect(found).not.toBeNull();
        expect(found?.email).toBe(email);
      });

      it('should find user by email case-insensitively', async () => {
        const email = 'findme@example.com';
        await createTestUser({ email });

        const found = await User.findByEmail('FINDME@EXAMPLE.COM');

        expect(found).not.toBeNull();
        expect(found?.email).toBe(email);
      });

      it('should return null for non-existent email', async () => {
        const found = await User.findByEmail('nonexistent@example.com');
        expect(found).toBeNull();
      });
    });

    describe('findBySocialId', () => {
      it('should find user by social provider and id', async () => {
        const userData = generateUserData();
        const user = new User({
          ...userData,
          authProvider: 'google',
          socialProfiles: [{
            provider: 'google',
            providerId: 'google-unique-id',
            email: userData.email,
          }],
        });
        await user.save();

        const found = await User.findBySocialId('google', 'google-unique-id');

        expect(found).not.toBeNull();
        expect(found?._id.toString()).toBe(user._id.toString());
      });

      it('should return null for non-existent social id', async () => {
        const found = await User.findBySocialId('google', 'nonexistent-id');
        expect(found).toBeNull();
      });
    });

    describe('isEmailTaken', () => {
      it('should return true for existing email', async () => {
        const email = 'taken@example.com';
        await createTestUser({ email });

        const isTaken = await User.isEmailTaken(email);

        expect(isTaken).toBe(true);
      });

      it('should return false for non-existent email', async () => {
        const isTaken = await User.isEmailTaken('nottaken@example.com');
        expect(isTaken).toBe(false);
      });

      it('should exclude specific user from check', async () => {
        const email = 'myemail@example.com';
        const user = await createTestUser({ email });

        const isTaken = await User.isEmailTaken(email, user._id.toString());

        expect(isTaken).toBe(false);
      });
    });
  });

  describe('Virtuals', () => {
    it('should have fullName virtual', async () => {
      const user = await createTestUser({
        firstName: 'John',
        lastName: 'Doe',
      });

      expect((user as IUserDocument & { fullName: string }).fullName).toBe('John Doe');
    });

    it('should have age virtual', async () => {
      const birthYear = new Date().getFullYear() - 30;
      const user = await createTestUser();
      user.dateOfBirth = new Date(birthYear, 5, 15);
      await user.save();

      expect((user as IUserDocument & { age: number }).age).toBeGreaterThanOrEqual(29);
      expect((user as IUserDocument & { age: number }).age).toBeLessThanOrEqual(30);
    });
  });

  describe('toJSON transformation', () => {
    it('should exclude sensitive fields in JSON output', async () => {
      const user = await createTestUser();
      user.refreshToken = 'some-refresh-token';
      user.passwordResetToken = 'some-reset-token';
      await user.save();

      const json = user.toJSON();

      expect(json).not.toHaveProperty('password');
      expect(json).not.toHaveProperty('refreshToken');
      expect(json).not.toHaveProperty('passwordResetToken');
      expect(json).not.toHaveProperty('__v');
    });
  });
});
