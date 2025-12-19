import dotenv from 'dotenv';
import path from 'path';
import type { NodeEnv } from '../types/index.js';

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Environment validation
const requiredEnvVars = [
  'NODE_ENV',
  'PORT',
  'DATABASE_URL',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
] as const;

// Optional environment variables (for reference/documentation)
// JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, CORS_ORIGIN, SESSION_SECRET,
// REDIS_URL, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, AWS_S3_BUCKET,
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, LOG_LEVEL, etc.

function validateEnv(): void {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
}

// Validate on import in production
if (process.env['NODE_ENV'] === 'production') {
  validateEnv();
}

// Type-safe environment configuration
export const env = {
  // Node environment
  nodeEnv: (process.env['NODE_ENV'] || 'development') as NodeEnv,
  isProduction: process.env['NODE_ENV'] === 'production',
  isDevelopment: process.env['NODE_ENV'] === 'development',
  isTest: process.env['NODE_ENV'] === 'test',

  // Server
  port: parseInt(process.env['PORT'] || '5000', 10),
  host: process.env['HOST'] || '0.0.0.0',

  // Database (PostgreSQL via Prisma)
  database: {
    url: process.env['DATABASE_URL'] || 'postgresql://postgres:postgres@localhost:5432/yhealth?schema=public',
  },

  // JWT Configuration
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-in-production',
    refreshSecret: process.env['JWT_REFRESH_SECRET'] || 'your-refresh-secret-key-change-in-production',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '15m',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
    issuer: process.env['JWT_ISSUER'] || 'yhealth-api',
    audience: process.env['JWT_AUDIENCE'] || 'yhealth-client',
  },

  // Session
  session: {
    secret: process.env['SESSION_SECRET'] || 'your-session-secret-change-in-production',
    name: process.env['SESSION_NAME'] || 'yhealth.sid',
    maxAge: parseInt(process.env['SESSION_MAX_AGE'] || '86400000', 10), // 24 hours
  },

  // CORS
  cors: {
    origin: process.env['CORS_ORIGIN']?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000', 10), // 15 minutes
    max: parseInt(process.env['RATE_LIMIT_MAX'] || '100', 10),
  },

  // Redis (optional)
  redis: {
    url: process.env['REDIS_URL'],
    enabled: !!process.env['REDIS_URL'],
  },

  // AWS S3
  aws: {
    accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
    secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
    region: process.env['AWS_REGION'] || 'us-east-1',
    s3Bucket: process.env['AWS_S3_BUCKET'],
  },

  // Cloudflare R2 Storage
  r2: {
    accountId: process.env['R2_ACCOUNT_ID'],
    accessKeyId: process.env['R2_ACCESS_KEY_ID'],
    secretAccessKey: process.env['R2_SECRET_ACCESS_KEY'],
    bucketName: process.env['R2_BUCKET_NAME'] || 'yhealth',
    publicUrl: process.env['R2_PUBLIC_URL'],
    endpoint: process.env['R2_ACCOUNT_ID']
      ? `https://${process.env['R2_ACCOUNT_ID']}.r2.cloudflarestorage.com`
      : undefined,
  },

  // Email (SMTP)
  smtp: {
    host: process.env['SMTP_HOST'],
    port: parseInt(process.env['SMTP_PORT'] || '587', 10),
    secure: process.env['SMTP_SECURE'] === 'true',
    user: process.env['SMTP_USER'] || process.env['SMTP_FROM'],
    pass: process.env['SMTP_PASS'],
    from: process.env['SMTP_FROM'] || process.env['SMTP_USER'] || 'noreply@yhealth.com',
  },

  // Stripe
  stripe: {
    secretKey: process.env['STRIPE_SECRET_KEY'],
    webhookSecret: process.env['STRIPE_WEBHOOK_SECRET'],
  },

  // PayPal
  paypal: {
    clientId: process.env['PAYPAL_CLIENT_ID'],
    clientSecret: process.env['PAYPAL_CLIENT_SECRET'],
    mode: process.env['NODE_ENV'] === 'production' ? 'live' : 'sandbox',
  },

  // Logging
  logging: {
    level: process.env['LOG_LEVEL'] || 'info',
    format: process.env['LOG_FORMAT'] || 'combined',
  },

  // API versioning
  api: {
    version: process.env['API_VERSION'] || 'v1',
    prefix: process.env['API_PREFIX'] || '/api',
  },
} as const;

export type EnvConfig = typeof env;
export default env;
