/**
 * ApiError Utility Unit Tests
 */

import { ApiError } from '../../../src/utils/ApiError.js';

describe('ApiError', () => {
  describe('constructor', () => {
    it('should create an error with statusCode and message', () => {
      const error = new ApiError(400, 'Bad request');

      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Bad request');
      expect(error.isOperational).toBe(true);
    });

    it('should set isOperational to true by default', () => {
      const error = new ApiError(500, 'Internal error');
      expect(error.isOperational).toBe(true);
    });

    it('should allow setting isOperational to false', () => {
      const error = new ApiError(500, 'Internal error', false);
      expect(error.isOperational).toBe(false);
    });

    it('should capture stack trace', () => {
      const error = new ApiError(400, 'Test error');
      expect(error.stack).toBeDefined();
    });
  });

  describe('static factory methods', () => {
    describe('badRequest', () => {
      it('should create a 400 error', () => {
        const error = ApiError.badRequest('Invalid input');

        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Invalid input');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.badRequest();

        expect(error.statusCode).toBe(400);
        expect(error.message).toBe('Bad request');
      });
    });

    describe('unauthorized', () => {
      it('should create a 401 error', () => {
        const error = ApiError.unauthorized('Invalid credentials');

        expect(error.statusCode).toBe(401);
        expect(error.message).toBe('Invalid credentials');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.unauthorized();

        expect(error.statusCode).toBe(401);
        expect(error.message).toBe('Unauthorized');
      });
    });

    describe('forbidden', () => {
      it('should create a 403 error', () => {
        const error = ApiError.forbidden('Access denied');

        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Access denied');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.forbidden();

        expect(error.statusCode).toBe(403);
        expect(error.message).toBe('Forbidden');
      });
    });

    describe('notFound', () => {
      it('should create a 404 error', () => {
        const error = ApiError.notFound('User not found');

        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('User not found');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.notFound();

        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Not found');
      });
    });

    describe('conflict', () => {
      it('should create a 409 error', () => {
        const error = ApiError.conflict('Email already exists');

        expect(error.statusCode).toBe(409);
        expect(error.message).toBe('Email already exists');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.conflict();

        expect(error.statusCode).toBe(409);
        expect(error.message).toBe('Conflict');
      });
    });

    describe('internal', () => {
      it('should create a 500 error', () => {
        const error = ApiError.internal('Database connection failed');

        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Database connection failed');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.internal();

        expect(error.statusCode).toBe(500);
        expect(error.message).toBe('Internal server error');
      });
    });

    describe('validationError', () => {
      it('should create a 422 error with validation errors', () => {
        const errors = [
          { field: 'email', message: 'Invalid email format' },
          { field: 'password', message: 'Password too short' },
        ];

        const error = ApiError.validationError(errors);

        expect(error.statusCode).toBe(422);
        expect(error.errors).toEqual(errors);
      });

      it('should use custom message if provided', () => {
        const error = ApiError.validationError([], 'Validation failed');

        expect(error.message).toBe('Validation failed');
      });
    });

    describe('tooManyRequests', () => {
      it('should create a 429 error', () => {
        const error = ApiError.tooManyRequests('Rate limit exceeded');

        expect(error.statusCode).toBe(429);
        expect(error.message).toBe('Rate limit exceeded');
      });

      it('should use default message if not provided', () => {
        const error = ApiError.tooManyRequests();

        expect(error.statusCode).toBe(429);
        expect(error.message).toBe('Too many requests');
      });
    });
  });

  describe('isApiError', () => {
    it('should return true for ApiError instances', () => {
      const error = new ApiError(400, 'Test');
      expect(ApiError.isApiError(error)).toBe(true);
    });

    it('should return false for regular Error instances', () => {
      const error = new Error('Test');
      expect(ApiError.isApiError(error)).toBe(false);
    });

    it('should return false for non-error objects', () => {
      expect(ApiError.isApiError({})).toBe(false);
      expect(ApiError.isApiError(null)).toBe(false);
      expect(ApiError.isApiError(undefined)).toBe(false);
      expect(ApiError.isApiError('string')).toBe(false);
    });
  });
});
