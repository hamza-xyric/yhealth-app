import type { Response } from 'express';
import type { ApiResponse as IApiResponse, PaginationMeta, ValidationError } from '../types/index.js';

type SuccessOptions = {
  message?: string;
  statusCode?: number;
  meta?: PaginationMeta;
  requestId?: string;
};

export class ApiResponse {
  // Success responses - supports both object options and legacy string message
  static success<T>(
    res: Response,
    data?: T,
    optionsOrMessage: SuccessOptions | string = {},
    statusCode?: number
  ): Response {
    // Support both object options and legacy string message
    const options: SuccessOptions = typeof optionsOrMessage === 'string'
      ? { message: optionsOrMessage, statusCode: statusCode ?? 200 }
      : optionsOrMessage;

    const { message = 'Success', statusCode: code = 200, meta, requestId } = options;

    const response: IApiResponse<T> = {
      success: true,
      message,
      timestamp: new Date().toISOString(),
      ...(data !== undefined && { data }),
      ...(meta && { meta }),
      ...(requestId && { requestId }),
    };

    return res.status(code).json(response);
  }

  static created<T>(res: Response, data: T, message = 'Resource created successfully'): Response {
    return this.success(res, data, { message, statusCode: 201 });
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static paginated<T>(
    res: Response,
    data: T[],
    pagination: {
      page: number;
      limit: number;
      total: number;
    },
    message = 'Success'
  ): Response {
    const { page, limit, total } = pagination;
    const totalPages = Math.ceil(total / limit);

    const meta: PaginationMeta = {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    return this.success(res, data, { message, meta });
  }

  // Error responses
  static error(
    res: Response,
    options: {
      message?: string;
      statusCode?: number;
      code?: string;
      errors?: ValidationError[];
      requestId?: string;
    } = {}
  ): Response {
    const {
      message = 'An error occurred',
      statusCode = 500,
      code: _code = 'INTERNAL_ERROR',
      errors,
      requestId,
    } = options;

    const response: IApiResponse = {
      success: false,
      message,
      timestamp: new Date().toISOString(),
      ...(errors && { errors }),
      ...(requestId && { requestId }),
    };

    return res.status(statusCode).json(response);
  }

  static badRequest(res: Response, message = 'Bad Request', errors?: ValidationError[]): Response {
    return this.error(res, { message, statusCode: 400, code: 'BAD_REQUEST', errors });
  }

  static unauthorized(res: Response, message = 'Unauthorized'): Response {
    return this.error(res, { message, statusCode: 401, code: 'UNAUTHORIZED' });
  }

  static forbidden(res: Response, message = 'Forbidden'): Response {
    return this.error(res, { message, statusCode: 403, code: 'FORBIDDEN' });
  }

  static notFound(res: Response, message = 'Resource not found'): Response {
    return this.error(res, { message, statusCode: 404, code: 'NOT_FOUND' });
  }

  static conflict(res: Response, message = 'Resource already exists'): Response {
    return this.error(res, { message, statusCode: 409, code: 'CONFLICT' });
  }

  static validationError(res: Response, errors: ValidationError[]): Response {
    return this.error(res, {
      message: 'Validation Error',
      statusCode: 422,
      code: 'VALIDATION_ERROR',
      errors,
    });
  }

  static tooManyRequests(res: Response, message = 'Too many requests'): Response {
    return this.error(res, { message, statusCode: 429, code: 'TOO_MANY_REQUESTS' });
  }

  static internal(res: Response, message = 'Internal Server Error'): Response {
    return this.error(res, { message, statusCode: 500, code: 'INTERNAL_SERVER_ERROR' });
  }
}

export default ApiResponse;
