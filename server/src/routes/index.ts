import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import assessmentRoutes from './assessment.routes.js';
import integrationRoutes from './integration.routes.js';
import preferencesRoutes from './preferences.routes.js';
import planRoutes from './plan.routes.js';
import uploadRoutes from './upload.routes.js';
import statsRoutes from './stats.routes.js';
import activityRoutes from './activity.routes.js';
import achievementsRoutes from './achievements.routes.js';
import notificationsRoutes from './notifications.routes.js';
import { env } from '../config/env.config.js';

const router = Router();

// API info endpoint
router.get('/', (_req, res) => {
  res.json({
    name: 'YHealth API',
    version: env.api.version,
    status: 'running',
    timestamp: new Date().toISOString(),
    documentation: '/api/docs',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      assessment: '/api/assessment',
      integrations: '/api/integrations',
      preferences: '/api/preferences',
      plans: '/api/plans',
      upload: '/api/upload',
      stats: '/api/stats',
      activity: '/api/activity',
      achievements: '/api/achievements',
      notifications: '/api/notifications',
    },
  });
});

// Health check routes
router.use('/health', healthRoutes);

// Authentication & Onboarding routes (Epic 01 - F1.1)
router.use('/auth', authRoutes);

// Assessment & Goals routes (Epic 01 - F1.2, F1.3)
router.use('/assessment', assessmentRoutes);

// Integration routes (Epic 01 - F1.4)
router.use('/integrations', integrationRoutes);

// Preferences routes (Epic 01 - F1.5)
router.use('/preferences', preferencesRoutes);

// Plan routes (Epic 01 - F1.6)
router.use('/plans', planRoutes);

// File upload routes
router.use('/upload', uploadRoutes);

// Stats routes (Dashboard stats, streaks, health metrics)
router.use('/stats', statsRoutes);

// Activity routes (Activity logs, stats, calendar)
router.use('/activity', activityRoutes);

// Achievements routes
router.use('/achievements', achievementsRoutes);

// Notifications routes
router.use('/notifications', notificationsRoutes);

export default router;
