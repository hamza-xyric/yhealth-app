import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { logger } from '../services/logger.service.js';
import { env } from '../config/env.config.js';
import type { AuthenticatedRequest } from '../types/index.js';

// JWT errors
interface JWTError extends Error {
  expiredAt?: Date;
}

// PostgreSQL error interface
interface PgError extends Error {
  code?: string;
  constraint?: string;
  detail?: string;
  table?: string;
  column?: string;
}

/**
 * Convert various error types to ApiError
 */
function normalizeError(error: Error): ApiError {
  // Already an ApiError
  if (error instanceof ApiError) {
    return error;
  }

  // PostgreSQL errors (from pg client)
  const pgError = error as PgError;
  if (pgError.code) {
    // Unique constraint violation
    if (pgError.code === '23505') {
      const detail = pgError.detail || '';
      const match = detail.match(/Key \((.+?)\)=/);
      const field = match ? match[1] : 'field';
      return ApiError.conflict(`${field} already exists`);
    }

    // Foreign key constraint violation
    if (pgError.code === '23503') {
      return ApiError.badRequest('Invalid reference');
    }

    // Not null violation
    if (pgError.code === '23502') {
      const column = pgError.column || 'field';
      return ApiError.badRequest(`${column} is required`);
    }

    // Check constraint violation
    if (pgError.code === '23514') {
      return ApiError.badRequest('Invalid data provided');
    }

    // Undefined table (relation does not exist)
    if (pgError.code === '42P01') {
      logger.error('Database table does not exist', { error: pgError.message });
      return ApiError.internal('Database configuration error');
    }

    // Undefined column
    if (pgError.code === '42703') {
      logger.error('Database column does not exist', { error: pgError.message });
      return ApiError.internal('Database configuration error');
    }
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return ApiError.unauthorized('Invalid token');
  }

  if (error.name === 'TokenExpiredError') {
    const jwtError = error as JWTError;
    return ApiError.unauthorized(`Token expired${jwtError.expiredAt ? ` at ${jwtError.expiredAt.toISOString()}` : ''}`);
  }

  if (error.name === 'NotBeforeError') {
    return ApiError.unauthorized('Token not yet valid');
  }

  // Syntax error (invalid JSON)
  if (error instanceof SyntaxError && 'body' in error) {
    return ApiError.badRequest('Invalid JSON in request body');
  }

  // Default to internal server error
  return ApiError.internal(env.isProduction ? 'Something went wrong' : error.message);
}

/**
 * Log error details
 */
function logError(error: ApiError, req: Request): void {
  const logData = {
    statusCode: error.statusCode,
    code: error.code,
    message: error.message,
    path: req.path,
    method: req.method,
    ip: req.ip,
    requestId: (req as AuthenticatedRequest).requestId,
    userId: (req as AuthenticatedRequest).user?.userId,
    ...(error.details && { details: error.details }),
    ...(!error.isOperational && { stack: error.stack }),
  };

  if (error.statusCode >= 500) {
    logger.error('Server error', logData);
  } else if (error.statusCode >= 400) {
    logger.warn('Client error', logData);
  }
}

/**
 * Global error handler middleware
 */
export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const apiError = normalizeError(error);

  logError(apiError, req);

  const response = {
    success: false,
    message: apiError.message,
    code: apiError.code,
    ...(apiError.details && { errors: apiError.details }),
    timestamp: new Date().toISOString(),
    ...(env.isDevelopment && { stack: apiError.stack }),
    ...((req as AuthenticatedRequest).requestId && {
      requestId: (req as AuthenticatedRequest).requestId,
    }),
  };

  res.status(apiError.statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = ApiError.notFound(`Route ${req.method} ${req.path} not found`);

  res.status(404).json({
    success: false,
    message: error.message,
    code: error.code,
    timestamp: new Date().toISOString(),
    ...((req as AuthenticatedRequest).requestId && {
      requestId: (req as AuthenticatedRequest).requestId,
    }),
  });
};

/**
 * Uncaught exception handler
 */
export function setupUncaughtHandlers(): void {
  process.on('uncaughtException', (error: Error) => {
    logger.error('Uncaught Exception', {
      message: error.message,
      stack: error.stack,
    });

    // Exit with failure
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: unknown) => {
    const message = reason instanceof Error ? reason.message : String(reason);
    const stack = reason instanceof Error ? reason.stack : undefined;

    logger.error('Unhandled Rejection', { message, stack });

    // In production, exit process to let process manager restart
    if (env.isProduction) {
      process.exit(1);
    }
  });
}

export default errorHandler;
