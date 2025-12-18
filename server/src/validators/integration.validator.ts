import { z } from 'zod';

// Integration providers
const integrationProviderEnum = z.enum([
  'whoop',
  'apple_health',
  'fitbit',
  'garmin',
  'oura',
  'samsung_health',
  'myfitnesspal',
  'nutritionix',
  'cronometer',
  'strava',
]);

// Data types
const dataTypeEnum = z.enum([
  'heart_rate',
  'hrv',
  'sleep',
  'steps',
  'workouts',
  'calories',
  'nutrition',
  'strain',
  'recovery',
  'body_temp',
  'vo2_max',
  'training_load',
  'gps_activities',
]);

// S01.4.1: Integration Discovery & Selection
export const selectIntegrationsSchema = z.object({
  integrations: z.array(integrationProviderEnum)
    .min(1, 'At least one integration is required for personalized insights'),
});

// S01.4.2: OAuth Connection Flow
export const initiateOAuthSchema = z.object({
  provider: integrationProviderEnum,
  redirectUri: z.string().url().optional(),
});

export const completeOAuthSchema = z.object({
  provider: integrationProviderEnum,
  code: z.string().min(1, 'Authorization code is required'),
  state: z.string().optional(),
});

// API key connection (for Nutritionix)
export const connectApiKeySchema = z.object({
  provider: z.literal('nutritionix'),
  apiKey: z.string().min(1, 'API key is required'),
  appId: z.string().min(1, 'App ID is required'),
});

// S01.4.3: Data Sync
export const triggerSyncSchema = z.object({
  provider: integrationProviderEnum.optional(),
  syncType: z.enum(['initial', 'incremental', 'manual']).default('manual'),
  dateRange: z.object({
    startDate: z.string().or(z.date()).optional(),
    endDate: z.string().or(z.date()).optional(),
  }).optional(),
});

// Update integration settings
export const updateIntegrationSchema = z.object({
  isEnabled: z.boolean().optional(),
  isPrimaryForDataTypes: z.array(dataTypeEnum).optional(),
});

// Disconnect integration
export const disconnectIntegrationSchema = z.object({
  provider: integrationProviderEnum,
  deleteData: z.boolean().default(false),
});

// Set golden source hierarchy
export const setGoldenSourceSchema = z.object({
  dataType: dataTypeEnum,
  providerOrder: z.array(integrationProviderEnum).min(1),
});

// Types
export type SelectIntegrationsInput = z.infer<typeof selectIntegrationsSchema>;
export type InitiateOAuthInput = z.infer<typeof initiateOAuthSchema>;
export type CompleteOAuthInput = z.infer<typeof completeOAuthSchema>;
export type ConnectApiKeyInput = z.infer<typeof connectApiKeySchema>;
export type TriggerSyncInput = z.infer<typeof triggerSyncSchema>;
export type UpdateIntegrationInput = z.infer<typeof updateIntegrationSchema>;
export type DisconnectIntegrationInput = z.infer<typeof disconnectIntegrationSchema>;
export type SetGoldenSourceInput = z.infer<typeof setGoldenSourceSchema>;
