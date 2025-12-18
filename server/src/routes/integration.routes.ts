import { Router } from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { apiLimiter } from '../middlewares/rateLimiter.middleware.js';
import {
  selectIntegrationsSchema,
  initiateOAuthSchema,
  completeOAuthSchema,
  triggerSyncSchema,
  updateIntegrationSchema,
} from '../validators/integration.validator.js';
import integrationController from '../controllers/integration.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ============================================
// S01.4.1: Integration Discovery & Selection
// ============================================

// Get available integrations with connection status
router.get(
  '/',
  integrationController.getIntegrations
);

// Select integrations for onboarding
router.post(
  '/select',
  validate(selectIntegrationsSchema),
  integrationController.selectIntegrations
);

// ============================================
// S01.4.2: OAuth Flow Management
// ============================================

// Initiate OAuth flow
router.post(
  '/oauth/initiate',
  apiLimiter,
  validate(initiateOAuthSchema),
  integrationController.initiateOAuth
);

// Complete OAuth flow (callback handler)
router.post(
  '/oauth/complete',
  apiLimiter,
  validate(completeOAuthSchema),
  integrationController.completeOAuth
);

// ============================================
// S01.4.3: Sync Management
// ============================================

// Get sync dashboard
router.get(
  '/sync/status',
  integrationController.getSyncDashboard
);

// Get golden source configuration
router.get(
  '/golden-source',
  integrationController.getGoldenSourceConfig
);

// ============================================
// Provider-Specific Routes
// ============================================

// Get integration status
router.get(
  '/:provider/status',
  integrationController.getIntegrationStatus
);

// Trigger manual sync
router.post(
  '/:provider/sync',
  apiLimiter,
  validate(triggerSyncSchema),
  integrationController.triggerSync
);

// Update integration settings
router.patch(
  '/:provider',
  validate(updateIntegrationSchema),
  integrationController.updateIntegration
);

// Disconnect integration
router.delete(
  '/:provider',
  integrationController.disconnectIntegration
);

// ============================================
// Complete Integration Step
// ============================================

// Complete integrations step in onboarding
router.post(
  '/complete',
  integrationController.completeIntegrationsStep
);

export default router;
