import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { apiLimiter } from '../middlewares/rateLimiter.middleware.js';
import planController from '../controllers/plan.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ============================================
// S01.6.1: Plan Generation
// ============================================

// Generate personalized plan preview
router.post(
  '/generate',
  apiLimiter,
  planController.generatePlanPreview
);

// ============================================
// S01.6.2: Plan Creation & Activation
// ============================================

// Get all user plans
router.get(
  '/',
  planController.getPlans
);

// Get active plan
router.get(
  '/active',
  planController.getActivePlan
);

// Get today's activities (global - uses active plan)
router.get(
  '/today',
  planController.getTodayActivities
);

// Create a new plan
router.post(
  '/',
  planController.createPlan
);

// Complete onboarding
router.post(
  '/complete-onboarding',
  planController.completeOnboarding
);

// ============================================
// Individual Plan Operations
// ============================================

// Get specific plan
router.get(
  '/:planId',
  planController.getPlan
);

// Get plan's weekly summary
router.get(
  '/:planId/summary/weekly',
  planController.getWeeklySummary
);

// Get today's activities for specific plan
router.get(
  '/:planId/today',
  planController.getTodayActivities
);

// Get activity logs
router.get(
  '/:planId/logs',
  planController.getActivityLogs
);

// Update plan
router.patch(
  '/:planId',
  planController.updatePlan
);

// Activate plan
router.post(
  '/:planId/activate',
  planController.activatePlan
);

// ============================================
// Activity Operations
// ============================================

// Update activity in plan
router.patch(
  '/:planId/activities/:activityId',
  planController.updateActivity
);

// Log activity completion
router.post(
  '/:planId/activities/:activityId/log',
  planController.logActivityCompletion
);

export default router;
