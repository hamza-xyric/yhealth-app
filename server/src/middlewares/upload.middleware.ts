import multer from 'multer';
import type { Request, RequestHandler } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { MAX_FILE_SIZE, type FileType } from '../services/r2.service.js';

// Extended request type with file
export interface FileRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

// Memory storage for processing before R2 upload
const storage = multer.memoryStorage();

// Create upload middleware - allows all file types, 20MB max
export const createUploadMiddleware = (
  _fileType: FileType,
  fieldName: string = 'file'
): RequestHandler => {
  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });

  return upload.single(fieldName) as RequestHandler;
};

// Create upload middleware for multiple files
export const createMultiUploadMiddleware = (
  _fileType: FileType,
  fieldName: string = 'files',
  maxCount: number = 10
): RequestHandler => {
  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE,
      files: maxCount,
    },
  });

  return upload.array(fieldName, maxCount) as RequestHandler;
};

// Create upload middleware for multiple fields
export const createFieldsUploadMiddleware = (
  fields: Array<{ name: string; maxCount: number }>
): RequestHandler => {
  const upload = multer({
    storage,
    limits: {
      fileSize: MAX_FILE_SIZE,
    },
  });

  return upload.fields(fields.map((f) => ({ name: f.name, maxCount: f.maxCount }))) as RequestHandler;
};

// Pre-built middlewares for common use cases
export const uploadImage = createUploadMiddleware('image', 'image');
export const uploadAvatar = createUploadMiddleware('avatar', 'avatar');
export const uploadDocument = createUploadMiddleware('document', 'document');
export const uploadAudio = createUploadMiddleware('audio', 'audio');
export const uploadVideo = createUploadMiddleware('video', 'video');
export const uploadFile = createUploadMiddleware('file', 'file');

// Multiple files upload
export const uploadImages = createMultiUploadMiddleware('image', 'images', 10);
export const uploadFiles = createMultiUploadMiddleware('file', 'files', 10);

// Error handler for multer errors
export const handleUploadError = (
  error: Error,
  _req: Request,
  _res: Response,
  next: (err?: Error) => void
) => {
  if (error instanceof multer.MulterError) {
    switch (error.code) {
      case 'LIMIT_FILE_SIZE':
        next(new ApiError(400, 'File too large. Maximum size: 20MB'));
        break;
      case 'LIMIT_FILE_COUNT':
        next(new ApiError(400, 'Too many files'));
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        next(new ApiError(400, `Unexpected field: ${error.field}`));
        break;
      default:
        next(new ApiError(400, error.message));
    }
  } else {
    next(error);
  }
};
