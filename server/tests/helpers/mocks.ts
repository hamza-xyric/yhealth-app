/**
 * Mock Implementations for Testing
 */

import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest, IJwtPayload } from '../../src/types/index.js';

/**
 * Create a mock Express Request
 */
export function createMockRequest(overrides: Partial<Request> = {}): Partial<Request> {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    cookies: {},
    get: jest.fn(),
    ...overrides,
  };
}

/**
 * Create a mock Express Response
 */
export function createMockResponse(): Partial<Response> {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.cookie = jest.fn().mockReturnValue(res);
  res.clearCookie = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return res;
}

/**
 * Create a mock Express NextFunction
 */
export function createMockNext(): NextFunction {
  return jest.fn();
}

/**
 * Create a mock authenticated request
 */
export function createMockAuthRequest(
  user: Partial<IJwtPayload>,
  overrides: Partial<AuthenticatedRequest> = {}
): Partial<AuthenticatedRequest> {
  return {
    ...createMockRequest(overrides as Partial<Request>),
    user: {
      userId: 'test-user-id',
      email: 'test@example.com',
      role: 'user',
      ...user,
    } as IJwtPayload,
    ...overrides,
  };
}

/**
 * Mock Logger Service
 */
export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  http: jest.fn(),
};

/**
 * Mock Email Service
 */
export const mockEmailService = {
  sendEmail: jest.fn().mockResolvedValue(true),
  sendVerificationEmail: jest.fn().mockResolvedValue(true),
  sendPasswordResetEmail: jest.fn().mockResolvedValue(true),
  sendWelcomeEmail: jest.fn().mockResolvedValue(true),
};

/**
 * Mock SMS Service
 */
export const mockSMSService = {
  sendVerificationCode: jest.fn().mockResolvedValue({ success: true, code: '123456' }),
  verifyCode: jest.fn().mockResolvedValue({ success: true }),
  formatPhoneNumber: jest.fn((phone: string) => phone),
};

/**
 * Mock OAuth Service
 */
export const mockOAuthService = {
  verifyGoogleToken: jest.fn().mockResolvedValue({
    provider: 'google',
    providerId: 'google-123',
    email: 'test@gmail.com',
    firstName: 'Test',
    lastName: 'User',
  }),
  verifyAppleToken: jest.fn().mockResolvedValue({
    provider: 'apple',
    providerId: 'apple-123',
    email: 'test@icloud.com',
  }),
  verifySocialToken: jest.fn().mockResolvedValue({
    provider: 'google',
    providerId: 'google-123',
    email: 'test@gmail.com',
  }),
};

/**
 * Mock Cache Service
 */
export const mockCacheService = {
  get: jest.fn().mockReturnValue(null),
  set: jest.fn(),
  del: jest.fn(),
  has: jest.fn().mockReturnValue(false),
  flush: jest.fn(),
  getStats: jest.fn().mockReturnValue({ keys: 0, hits: 0, misses: 0 }),
};

/**
 * Reset all mocks
 */
export function resetAllMocks(): void {
  jest.clearAllMocks();
  mockLogger.info.mockClear();
  mockLogger.error.mockClear();
  mockLogger.warn.mockClear();
  mockLogger.debug.mockClear();
  mockEmailService.sendEmail.mockClear();
  mockSMSService.sendVerificationCode.mockClear();
  mockSMSService.verifyCode.mockClear();
  mockOAuthService.verifyGoogleToken.mockClear();
  mockOAuthService.verifyAppleToken.mockClear();
  mockCacheService.get.mockClear();
  mockCacheService.set.mockClear();
}
