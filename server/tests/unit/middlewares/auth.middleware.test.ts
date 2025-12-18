/**
 * Auth Middleware Unit Tests
 */

import jwt from 'jsonwebtoken';
import {
  authenticate,
  optionalAuth,
  authorize,
  generateTokens,
} from '../../../src/middlewares/auth.middleware.js';
import { createMockRequest, createMockResponse, createMockNext } from '../../helpers/mocks.js';
import type { AuthenticatedRequest } from '../../../src/types/index.js';

const JWT_SECRET = process.env['JWT_SECRET'] || 'test-jwt-secret';

describe('Auth Middleware', () => {
  describe('authenticate', () => {
    it('should authenticate valid Bearer token', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user' as const,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '15m',
        issuer: 'yhealth-api-test',
        audience: 'yhealth-client-test',
      });

      const req = createMockRequest({
        headers: { authorization: `Bearer ${token}` },
      });
      const res = createMockResponse();
      const next = createMockNext();

      authenticate(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect((req as AuthenticatedRequest).user).toBeDefined();
      expect((req as AuthenticatedRequest).user?.userId).toBe('user-123');
    });

    it('should reject request without token', () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      authenticate(req as never, res as never, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 401,
        })
      );
    });

    it('should reject invalid token', () => {
      const req = createMockRequest({
        headers: { authorization: 'Bearer invalid-token' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      authenticate(req as never, res as never, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 401,
        })
      );
    });

    it('should reject expired token', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user' as const,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '-1s', // Already expired
        issuer: 'yhealth-api-test',
        audience: 'yhealth-client-test',
      });

      const req = createMockRequest({
        headers: { authorization: `Bearer ${token}` },
      });
      const res = createMockResponse();
      const next = createMockNext();

      authenticate(req as never, res as never, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 401,
          message: expect.stringContaining('expired'),
        })
      );
    });

    it('should extract token from cookie', () => {
      const payload = {
        userId: 'user-456',
        email: 'cookie@example.com',
        role: 'user' as const,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '15m',
        issuer: 'yhealth-api-test',
        audience: 'yhealth-client-test',
      });

      const req = createMockRequest({
        cookies: { access_token: token },
      });
      const res = createMockResponse();
      const next = createMockNext();

      authenticate(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect((req as AuthenticatedRequest).user?.userId).toBe('user-456');
    });
  });

  describe('optionalAuth', () => {
    it('should attach user if valid token provided', () => {
      const payload = {
        userId: 'user-789',
        email: 'optional@example.com',
        role: 'user' as const,
      };
      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '15m',
        issuer: 'yhealth-api-test',
        audience: 'yhealth-client-test',
      });

      const req = createMockRequest({
        headers: { authorization: `Bearer ${token}` },
      });
      const res = createMockResponse();
      const next = createMockNext();

      optionalAuth(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect((req as AuthenticatedRequest).user).toBeDefined();
    });

    it('should continue without user if no token provided', () => {
      const req = createMockRequest();
      const res = createMockResponse();
      const next = createMockNext();

      optionalAuth(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect((req as AuthenticatedRequest).user).toBeUndefined();
    });

    it('should continue without user if invalid token provided', () => {
      const req = createMockRequest({
        headers: { authorization: 'Bearer invalid-token' },
      });
      const res = createMockResponse();
      const next = createMockNext();

      optionalAuth(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      // Should not throw error, just continue
    });
  });

  describe('authorize', () => {
    it('should allow access for user with correct role', () => {
      const req = createMockRequest() as unknown as AuthenticatedRequest;
      req.user = {
        userId: 'admin-123',
        email: 'admin@example.com',
        role: 'admin',
      };
      const res = createMockResponse();
      const next = createMockNext();

      const middleware = authorize('admin', 'moderator');
      middleware(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    });

    it('should deny access for user with wrong role', () => {
      const req = createMockRequest() as unknown as AuthenticatedRequest;
      req.user = {
        userId: 'user-123',
        email: 'user@example.com',
        role: 'user',
      };
      const res = createMockResponse();
      const next = createMockNext();

      const middleware = authorize('admin');
      middleware(req as never, res as never, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 403,
        })
      );
    });

    it('should deny access if user not authenticated', () => {
      const req = createMockRequest() as unknown as AuthenticatedRequest;
      const res = createMockResponse();
      const next = createMockNext();

      const middleware = authorize('user');
      middleware(req as never, res as never, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 401,
        })
      );
    });

    it('should allow multiple roles', () => {
      const req = createMockRequest() as unknown as AuthenticatedRequest;
      req.user = {
        userId: 'mod-123',
        email: 'mod@example.com',
        role: 'moderator',
      };
      const res = createMockResponse();
      const next = createMockNext();

      const middleware = authorize('admin', 'moderator', 'doctor');
      middleware(req as never, res as never, next);

      expect(next).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('generateTokens', () => {
    it('should generate valid access and refresh tokens', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user' as const,
      };

      const tokens = generateTokens(payload);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
      expect(tokens).toHaveProperty('expiresIn');
      expect(typeof tokens.accessToken).toBe('string');
      expect(typeof tokens.refreshToken).toBe('string');
      expect(typeof tokens.expiresIn).toBe('number');
    });

    it('should generate tokens that can be verified', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user' as const,
      };

      const tokens = generateTokens(payload);

      const decoded = jwt.verify(tokens.accessToken, JWT_SECRET, {
        issuer: 'yhealth-api-test',
        audience: 'yhealth-client-test',
      }) as { userId: string; email: string; role: string };

      expect(decoded.userId).toBe('user-123');
      expect(decoded.email).toBe('test@example.com');
      expect(decoded.role).toBe('user');
    });

    it('should include expiration in token', () => {
      const payload = {
        userId: 'user-123',
        email: 'test@example.com',
        role: 'user' as const,
      };

      const tokens = generateTokens(payload);
      const decoded = jwt.decode(tokens.accessToken) as { exp: number };

      expect(decoded.exp).toBeDefined();
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
    });
  });
});
