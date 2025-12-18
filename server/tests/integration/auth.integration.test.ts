/**
 * Auth API Integration Tests
 */

import request from 'supertest';
import { createApp } from '../../src/app.js';
import { User } from '../../src/models/user.model.js';
import { generateUserData, createAuthenticatedUser } from '../helpers/testUtils.js';
import type { Application } from 'express';

describe('Auth API Integration Tests', () => {
  let app: Application;

  beforeAll(() => {
    app = createApp();
  });

  describe('POST /api/auth/register', () => {
    const endpoint = '/api/auth/register';

    it('should register a new user successfully', async () => {
      const userData = {
        email: 'newuser@example.com',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        gender: 'male',
      };

      const response = await request(app)
        .post(endpoint)
        .send(userData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('tokens');
      expect(response.body.data.user.email).toBe(userData.email.toLowerCase());
      expect(response.body.data.user).not.toHaveProperty('password');
    });

    it('should return validation error for invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'SecurePass123!',
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        gender: 'male',
      };

      const response = await request(app)
        .post(endpoint)
        .send(userData)
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it('should return 409 for duplicate email', async () => {
      const email = 'duplicate@example.com';

      // Create first user
      await request(app)
        .post(endpoint)
        .send({
          email,
          password: 'SecurePass123!',
          firstName: 'First',
          lastName: 'User',
          dateOfBirth: '1990-05-15',
          gender: 'male',
        })
        .expect(201);

      // Try to create second user with same email
      const response = await request(app)
        .post(endpoint)
        .send({
          email,
          password: 'SecurePass123!',
          firstName: 'Second',
          lastName: 'User',
          dateOfBirth: '1990-05-15',
          gender: 'female',
        })
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already');
    });

    it('should reject weak password', async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          email: 'test@example.com',
          password: '123',
          firstName: 'John',
          lastName: 'Doe',
          dateOfBirth: '1990-05-15',
          gender: 'male',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/login', () => {
    const endpoint = '/api/auth/login';

    beforeEach(async () => {
      // Create a test user before each login test
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'loginuser@example.com',
          password: 'SecurePass123!',
          firstName: 'Login',
          lastName: 'User',
          dateOfBirth: '1990-05-15',
          gender: 'male',
        });
    });

    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          email: 'loginuser@example.com',
          password: 'SecurePass123!',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('tokens');
      expect(response.body.data.tokens).toHaveProperty('accessToken');
      expect(response.body.data.tokens).toHaveProperty('refreshToken');
    });

    it('should return 401 for invalid password', async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          email: 'loginuser@example.com',
          password: 'WrongPassword!',
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 401 for non-existent user', async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          email: 'nonexistent@example.com',
          password: 'SomePassword123!',
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should be case-insensitive for email', async () => {
      const response = await request(app)
        .post(endpoint)
        .send({
          email: 'LOGINUSER@EXAMPLE.COM',
          password: 'SecurePass123!',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('GET /api/auth/me', () => {
    const endpoint = '/api/auth/me';

    it('should return current user profile with valid token', async () => {
      const { accessToken } = await createAuthenticatedUser({
        email: 'meuser@example.com',
      });

      const response = await request(app)
        .get(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('email', 'meuser@example.com');
    });

    it('should return 401 without token', async () => {
      const response = await request(app)
        .get(endpoint)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should return 401 with invalid token', async () => {
      const response = await request(app)
        .get(endpoint)
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/consent', () => {
    const endpoint = '/api/auth/consent';

    it('should record user consent', async () => {
      const { accessToken } = await createAuthenticatedUser();

      const response = await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          consents: [
            { type: 'terms_of_service', version: '1.0', accepted: true },
            { type: 'privacy_policy', version: '1.0', accepted: true },
          ],
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should require authentication', async () => {
      await request(app)
        .post(endpoint)
        .send({
          consents: [
            { type: 'terms_of_service', version: '1.0', accepted: true },
          ],
        })
        .expect(401);
    });
  });

  describe('POST /api/auth/refresh', () => {
    const endpoint = '/api/auth/refresh';

    it('should refresh tokens with valid refresh token', async () => {
      const { refreshToken, user } = await createAuthenticatedUser();

      // Update user with refresh token
      await User.findByIdAndUpdate(user._id, { refreshToken });

      const response = await request(app)
        .post(endpoint)
        .send({ refreshToken })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('tokens');
      expect(response.body.data.tokens).toHaveProperty('accessToken');
    });
  });

  describe('POST /api/auth/logout', () => {
    const endpoint = '/api/auth/logout';

    it('should logout successfully', async () => {
      const { accessToken } = await createAuthenticatedUser();

      const response = await request(app)
        .post(endpoint)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should require authentication', async () => {
      await request(app)
        .post(endpoint)
        .expect(401);
    });
  });
});
