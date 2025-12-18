/**
 * ApiResponse Utility Unit Tests
 */

import { ApiResponse } from '../../../src/utils/ApiResponse.js';
import { createMockResponse } from '../../helpers/mocks.js';

describe('ApiResponse', () => {
  let mockRes: ReturnType<typeof createMockResponse>;

  beforeEach(() => {
    mockRes = createMockResponse();
  });

  describe('success', () => {
    it('should send a success response with data', () => {
      const data = { id: 1, name: 'Test' };

      ApiResponse.success(mockRes as never, data);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data,
          timestamp: expect.any(String),
        })
      );
    });

    it('should send a success response with custom message', () => {
      const data = { id: 1 };

      ApiResponse.success(mockRes as never, data, { message: 'User created' });

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'User created',
        })
      );
    });

    it('should send a success response with custom status code', () => {
      ApiResponse.success(mockRes as never, null, { statusCode: 201 });

      expect(mockRes.status).toHaveBeenCalledWith(201);
    });

    it('should handle string message parameter', () => {
      ApiResponse.success(mockRes as never, { test: true }, 'Operation successful');

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Operation successful',
        })
      );
    });
  });

  describe('created', () => {
    it('should send a 201 created response', () => {
      const data = { id: 1, name: 'New resource' };

      ApiResponse.created(mockRes as never, data);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data,
        })
      );
    });

    it('should accept custom message', () => {
      ApiResponse.created(mockRes as never, {}, 'Resource created successfully');

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Resource created successfully',
        })
      );
    });
  });

  describe('noContent', () => {
    it('should send a 204 no content response', () => {
      ApiResponse.noContent(mockRes as never);

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.end).toHaveBeenCalled();
    });
  });

  describe('paginated', () => {
    it('should send a paginated response with meta information', () => {
      const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const pagination = { page: 1, limit: 10, total: 100 };

      ApiResponse.paginated(mockRes as never, data, pagination);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data,
          meta: expect.objectContaining({
            page: 1,
            limit: 10,
            total: 100,
            totalPages: 10,
            hasNextPage: true,
            hasPrevPage: false,
          }),
        })
      );
    });

    it('should calculate pagination meta correctly', () => {
      const data = [{ id: 1 }];
      const pagination = { page: 5, limit: 10, total: 50 };

      ApiResponse.paginated(mockRes as never, data, pagination);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            page: 5,
            totalPages: 5,
            hasNextPage: false,
            hasPrevPage: true,
          }),
        })
      );
    });

    it('should handle first page correctly', () => {
      const pagination = { page: 1, limit: 10, total: 25 };

      ApiResponse.paginated(mockRes as never, [], pagination);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            hasPrevPage: false,
            hasNextPage: true,
          }),
        })
      );
    });

    it('should handle last page correctly', () => {
      const pagination = { page: 3, limit: 10, total: 25 };

      ApiResponse.paginated(mockRes as never, [], pagination);

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          meta: expect.objectContaining({
            hasPrevPage: true,
            hasNextPage: false,
          }),
        })
      );
    });
  });

  describe('error', () => {
    it('should send an error response', () => {
      ApiResponse.error(mockRes as never, {
        message: 'Something went wrong',
        statusCode: 500,
      });

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Something went wrong',
        })
      );
    });

    it('should use default values if not provided', () => {
      ApiResponse.error(mockRes as never, {});

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'An error occurred',
        })
      );
    });

    it('should include validation errors if provided', () => {
      const errors = [
        { field: 'email', message: 'Invalid email' },
      ];

      ApiResponse.error(mockRes as never, {
        message: 'Validation failed',
        statusCode: 422,
        errors,
      });

      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          errors,
        })
      );
    });
  });

  describe('badRequest', () => {
    it('should send a 400 bad request response', () => {
      ApiResponse.badRequest(mockRes as never, 'Invalid input');

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Invalid input',
        })
      );
    });
  });

  describe('unauthorized', () => {
    it('should send a 401 unauthorized response', () => {
      ApiResponse.unauthorized(mockRes as never, 'Invalid token');

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Invalid token',
        })
      );
    });
  });

  describe('forbidden', () => {
    it('should send a 403 forbidden response', () => {
      ApiResponse.forbidden(mockRes as never, 'Access denied');

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Access denied',
        })
      );
    });
  });

  describe('notFound', () => {
    it('should send a 404 not found response', () => {
      ApiResponse.notFound(mockRes as never, 'Resource not found');

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Resource not found',
        })
      );
    });
  });
});
