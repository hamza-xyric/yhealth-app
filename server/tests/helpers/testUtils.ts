/**
 * Test Utilities and Helpers
 */

import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import { User, type IUserDocument } from '../../src/models/user.model.js';
import type { IJwtPayload, UserRole } from '../../src/types/index.js';

// JWT Secret for testing
const JWT_SECRET = process.env['JWT_SECRET'] || 'test-jwt-secret';
const JWT_REFRESH_SECRET = process.env['JWT_REFRESH_SECRET'] || 'test-jwt-refresh-secret';

/**
 * Generate fake user data
 */
export function generateUserData(overrides: Partial<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';
}> = {}) {
  return {
    email: faker.internet.email().toLowerCase(),
    password: 'TestPassword123!',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }),
    gender: faker.helpers.arrayElement(['male', 'female', 'non_binary', 'prefer_not_to_say']) as 'male' | 'female' | 'non_binary' | 'prefer_not_to_say',
    role: 'user' as UserRole,
    ...overrides,
  };
}

/**
 * Create a test user in the database
 */
export async function createTestUser(overrides: Partial<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isEmailVerified: boolean;
  onboardingStatus: string;
}> = {}): Promise<IUserDocument> {
  const userData = generateUserData(overrides);
  const user = new User({
    ...userData,
    isEmailVerified: overrides.isEmailVerified ?? true,
    onboardingStatus: overrides.onboardingStatus ?? 'registered',
  });
  await user.save();
  return user;
}

/**
 * Generate JWT tokens for a user
 */
export function generateTestTokens(user: IUserDocument): {
  accessToken: string;
  refreshToken: string;
} {
  const payload: Omit<IJwtPayload, 'iat' | 'exp'> = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m',
    issuer: 'yhealth-api-test',
    audience: 'yhealth-client-test',
  });

  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: '7d',
    issuer: 'yhealth-api-test',
    audience: 'yhealth-client-test',
  });

  return { accessToken, refreshToken };
}

/**
 * Create authenticated test user with tokens
 */
export async function createAuthenticatedUser(overrides: Partial<{
  email: string;
  role: UserRole;
}> = {}): Promise<{
  user: IUserDocument;
  accessToken: string;
  refreshToken: string;
}> {
  const user = await createTestUser(overrides);
  const { accessToken, refreshToken } = generateTestTokens(user);
  return { user, accessToken, refreshToken };
}

/**
 * Generate fake goal data
 */
export function generateGoalData(overrides: Partial<{
  category: string;
  title: string;
  description: string;
  targetValue: number;
  targetUnit: string;
}> = {}) {
  const categories = [
    'weight_loss',
    'muscle_building',
    'sleep_improvement',
    'stress_wellness',
    'energy_productivity',
  ];

  return {
    category: faker.helpers.arrayElement(categories),
    title: faker.lorem.sentence(4),
    description: faker.lorem.paragraph(),
    targetValue: faker.number.int({ min: 1, max: 100 }),
    targetUnit: faker.helpers.arrayElement(['kg', 'lbs', 'hours', 'minutes', 'days']),
    pillar: faker.helpers.arrayElement(['fitness', 'nutrition', 'wellbeing']),
    motivation: faker.lorem.sentence(),
    confidenceLevel: faker.number.int({ min: 1, max: 10 }),
    timeline: {
      startDate: new Date(),
      targetDate: faker.date.future(),
      durationWeeks: faker.number.int({ min: 4, max: 52 }),
    },
    ...overrides,
  };
}

/**
 * Generate fake assessment response data
 */
export function generateAssessmentData(overrides: Partial<{
  assessmentType: 'quick' | 'deep';
  goalCategory: string;
}> = {}) {
  return {
    assessmentType: faker.helpers.arrayElement(['quick', 'deep']) as 'quick' | 'deep',
    goalCategory: faker.helpers.arrayElement([
      'weight_loss',
      'muscle_building',
      'sleep_improvement',
    ]),
    responses: [
      {
        questionId: 'q1',
        value: faker.helpers.arrayElement(['option1', 'option2', 'option3']),
        answeredAt: new Date(),
      },
      {
        questionId: 'q2',
        value: faker.number.int({ min: 1, max: 10 }),
        answeredAt: new Date(),
      },
    ],
    baselineData: {
      activityDaysPerWeek: faker.number.int({ min: 0, max: 7 }),
      moodRating: faker.number.int({ min: 1, max: 10 }),
      stressLevel: faker.number.int({ min: 1, max: 10 }),
      sleepQuality: faker.number.int({ min: 1, max: 10 }),
    },
    ...overrides,
  };
}

/**
 * Generate fake preferences data
 */
export function generatePreferencesData(overrides: Partial<{
  coachingStyle: string;
  coachingIntensity: string;
}> = {}) {
  return {
    notifications: {
      email: {
        enabled: faker.datatype.boolean(),
        frequency: faker.helpers.arrayElement(['instant', 'daily_digest', 'weekly_digest']),
        types: ['reminders', 'progress_updates'],
      },
      push: {
        enabled: faker.datatype.boolean(),
        quietHours: {
          enabled: true,
          start: '22:00',
          end: '07:00',
        },
      },
    },
    coaching: {
      style: faker.helpers.arrayElement(['supportive', 'direct', 'analytical', 'motivational']),
      intensity: faker.helpers.arrayElement(['gentle', 'moderate', 'intensive']),
    },
    display: {
      theme: faker.helpers.arrayElement(['light', 'dark', 'system']),
      language: 'en',
      timezone: 'UTC',
      units: {
        weight: faker.helpers.arrayElement(['kg', 'lbs']),
        height: faker.helpers.arrayElement(['cm', 'ft']),
        distance: faker.helpers.arrayElement(['km', 'mi']),
        temperature: faker.helpers.arrayElement(['celsius', 'fahrenheit']),
      },
    },
    ...overrides,
  };
}

/**
 * Wait for a specified time
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate random ObjectId string
 */
export function generateObjectId(): string {
  return faker.database.mongodbObjectId();
}

/**
 * Clean up test data
 */
export async function cleanupTestData(): Promise<void> {
  const mongoose = await import('mongoose');
  const collections = mongoose.default.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    if (collection) {
      await collection.deleteMany({});
    }
  }
}
