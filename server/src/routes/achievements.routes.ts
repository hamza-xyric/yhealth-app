import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import achievementsController from '../controllers/achievements.controller.js';

const router = Router();

// All routes require authentication
router.use(authenticate);

// ============================================
// Achievements
// ============================================

// Get all achievements with user progress
router.get('/', achievementsController.getAchievements);

// Get achievement summary for dashboard
router.get('/summary', achievementsController.getAchievementSummary);

// Get leaderboard
router.get('/leaderboard', achievementsController.getLeaderboard);

// Check for new achievements
router.post('/check', achievementsController.checkNewAchievements);

export default router;
