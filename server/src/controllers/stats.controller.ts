import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { query } from '../database/pg.js';
import { logger } from '../services/logger.service.js';

// Types
interface ActivityLogRow {
  id: string;
  user_id: string;
  plan_id: string;
  activity_id: string;
  scheduled_date: Date;
  completed_at: Date | null;
  status: 'pending' | 'completed' | 'skipped' | 'partial';
  actual_value: number | null;
  target_value: number | null;
  duration: number | null;
  created_at: Date;
}

interface HealthDataRow {
  id: string;
  user_id: string;
  data_type: string;
  recorded_at: Date;
  value: object;
  unit: string;
}

interface QuickLogInput {
  type: 'workout' | 'meal' | 'sleep' | 'mindfulness' | 'water' | 'weight';
  value?: number;
  unit?: string;
  notes?: string;
  duration?: number;
  details?: Record<string, unknown>;
}

/**
 * Get Dashboard Stats
 * GET /api/stats/dashboard
 * Returns streak, week progress change, and summary stats
 */
export const getDashboardStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate current streak
  const streakData = await calculateStreak(userId);

  // Get this week's completion rate
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

  const thisWeekLogs = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date >= $2
     AND scheduled_date <= $3`,
    [userId, startOfWeek, today]
  );

  const thisWeekCompleted = thisWeekLogs.rows.filter(l => l.status === 'completed').length;
  const thisWeekTotal = thisWeekLogs.rows.length || 1;
  const thisWeekRate = Math.round((thisWeekCompleted / thisWeekTotal) * 100);

  // Get last week's completion rate for comparison
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
  const endOfLastWeek = new Date(startOfWeek);
  endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);

  const lastWeekLogs = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date >= $2
     AND scheduled_date <= $3`,
    [userId, startOfLastWeek, endOfLastWeek]
  );

  const lastWeekCompleted = lastWeekLogs.rows.filter(l => l.status === 'completed').length;
  const lastWeekTotal = lastWeekLogs.rows.length || 1;
  const lastWeekRate = Math.round((lastWeekCompleted / lastWeekTotal) * 100);

  const weekChange = thisWeekRate - lastWeekRate;

  // Get total activities completed all time
  const totalCompletedResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM activity_logs WHERE user_id = $1 AND status = 'completed'`,
    [userId]
  );
  const totalCompleted = parseInt(totalCompletedResult.rows[0]?.count || '0');

  // Get active goals count
  const activeGoalsResult = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM user_goals WHERE user_id = $1 AND status = 'active'`,
    [userId]
  );
  const activeGoals = parseInt(activeGoalsResult.rows[0]?.count || '0');

  // Get longest streak
  const longestStreak = await calculateLongestStreak(userId);

  ApiResponse.success(res, {
    streak: {
      current: streakData.currentStreak,
      longest: longestStreak,
      lastActivityDate: streakData.lastActivityDate,
    },
    weekProgress: {
      rate: thisWeekRate,
      change: weekChange,
      completed: thisWeekCompleted,
      total: thisWeekTotal,
    },
    summary: {
      totalActivitiesCompleted: totalCompleted,
      activeGoals,
    },
  });
});

/**
 * Get Weekly Activity Data
 * GET /api/stats/weekly-activity
 * Returns activity completion data for each day of the week
 */
export const getWeeklyActivityData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { week = 'current' } = req.query;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday

  if (week === 'last') {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
  }

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  // Get all logs for the week
  const logsResult = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date >= $2
     AND scheduled_date <= $3
     ORDER BY scheduled_date`,
    [userId, startOfWeek, endOfWeek]
  );

  // Group by day
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyData = days.map((day, index) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + index);
    const dayStr = dayDate.toISOString().split('T')[0];

    const dayLogs = logsResult.rows.filter(l => {
      const logDate = new Date(l.scheduled_date).toISOString().split('T')[0];
      return logDate === dayStr;
    });

    const completed = dayLogs.filter(l => l.status === 'completed').length;
    const total = dayLogs.length || 1;
    const completionRate = Math.round((completed / total) * 100);

    return {
      day,
      date: dayStr,
      completed,
      total: dayLogs.length,
      completionRate,
      isToday: dayStr === today.toISOString().split('T')[0],
    };
  });

  // Calculate week average
  const totalCompleted = weeklyData.reduce((sum, d) => sum + d.completed, 0);
  const totalActivities = weeklyData.reduce((sum, d) => sum + d.total, 0);
  const weekAverage = totalActivities > 0 ? Math.round((totalCompleted / totalActivities) * 100) : 0;

  ApiResponse.success(res, {
    week: week === 'last' ? 'last' : 'current',
    startDate: startOfWeek.toISOString().split('T')[0],
    endDate: endOfWeek.toISOString().split('T')[0],
    days: weeklyData,
    summary: {
      totalCompleted,
      totalActivities,
      averageCompletionRate: weekAverage,
    },
  });
});

/**
 * Get Current Streak
 * GET /api/stats/streak
 */
export const getCurrentStreak = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const streakData = await calculateStreak(userId);
  const longestStreak = await calculateLongestStreak(userId);

  // Get streak history (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const historyResult = await query<{ date: Date; completed: string; total: string }>(
    `SELECT
       scheduled_date as date,
       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
       COUNT(*) as total
     FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date >= $2
     GROUP BY scheduled_date
     ORDER BY scheduled_date DESC`,
    [userId, thirtyDaysAgo]
  );

  const streakHistory = historyResult.rows.map(row => ({
    date: new Date(row.date).toISOString().split('T')[0],
    completed: parseInt(row.completed),
    total: parseInt(row.total),
    hasActivity: parseInt(row.completed) > 0,
  }));

  ApiResponse.success(res, {
    currentStreak: streakData.currentStreak,
    longestStreak,
    lastActivityDate: streakData.lastActivityDate,
    streakHistory,
  });
});

/**
 * Get Health Metrics
 * GET /api/stats/health-metrics
 * Returns latest health metrics from integrations and manual logs
 */
export const getHealthMetrics = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get latest health data records
  const latestDataResult = await query<HealthDataRow>(
    `SELECT DISTINCT ON (data_type) *
     FROM health_data_records
     WHERE user_id = $1
     AND recorded_at >= $2
     ORDER BY data_type, recorded_at DESC`,
    [userId, new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)] // Last 7 days
  );

  // Build metrics from health data
  const metricsMap: Record<string, { value: unknown; unit: string; recordedAt: string }> = {};

  for (const record of latestDataResult.rows) {
    metricsMap[record.data_type] = {
      value: record.value,
      unit: record.unit,
      recordedAt: record.recorded_at.toISOString(),
    };
  }

  // Get today's activity logs for calories estimation
  const todayLogsResult = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date = $2
     AND status = 'completed'`,
    [userId, today]
  );

  // Calculate estimated calories burned from workouts
  let estimatedCaloriesBurned = 0;
  for (const log of todayLogsResult.rows) {
    if (log.duration) {
      // Rough estimate: 5-8 calories per minute depending on activity
      estimatedCaloriesBurned += log.duration * 6;
    }
  }

  // Get water intake if tracked (stored under 'nutrition' type with water indicator in value)
  const waterResult = await query<{ total: string }>(
    `SELECT SUM((value->>'glasses')::int) as total
     FROM health_data_records
     WHERE user_id = $1
     AND data_type = 'nutrition'
     AND value->>'glasses' IS NOT NULL
     AND recorded_at >= $2`,
    [userId, today]
  );
  const waterGlasses = parseInt(waterResult.rows[0]?.total || '0');

  // Get latest sleep data
  const sleepResult = await query<HealthDataRow>(
    `SELECT * FROM health_data_records
     WHERE user_id = $1
     AND data_type = 'sleep'
     ORDER BY recorded_at DESC
     LIMIT 1`,
    [userId]
  );
  const sleepData = sleepResult.rows[0]?.value as { duration?: number; quality?: number } | undefined;

  // Get heart rate if available
  const heartRateResult = await query<HealthDataRow>(
    `SELECT * FROM health_data_records
     WHERE user_id = $1
     AND data_type = 'heart_rate'
     ORDER BY recorded_at DESC
     LIMIT 1`,
    [userId]
  );
  const heartRateData = heartRateResult.rows[0]?.value as { bpm?: number; resting?: number } | undefined;

  // Get steps if available
  const stepsResult = await query<HealthDataRow>(
    `SELECT * FROM health_data_records
     WHERE user_id = $1
     AND data_type = 'steps'
     AND recorded_at >= $2
     ORDER BY recorded_at DESC
     LIMIT 1`,
    [userId, today]
  );
  const stepsData = stepsResult.rows[0]?.value as { count?: number } | undefined;

  const metrics = {
    calories: {
      value: estimatedCaloriesBurned || null,
      target: 2200,
      unit: 'kcal',
      source: estimatedCaloriesBurned > 0 ? 'estimated' : null,
    },
    water: {
      value: waterGlasses || null,
      target: 8,
      unit: 'glasses',
      source: waterGlasses > 0 ? 'manual' : null,
    },
    sleep: {
      value: sleepData?.duration ? `${(sleepData.duration / 60).toFixed(1)}h` : null,
      target: '8h',
      quality: sleepData?.quality || null,
      source: sleepData ? 'integration' : null,
    },
    heartRate: {
      value: heartRateData?.bpm || heartRateData?.resting || null,
      unit: 'bpm',
      resting: heartRateData?.resting || null,
      source: heartRateData ? 'integration' : null,
    },
    steps: {
      value: stepsData?.count || null,
      target: 10000,
      unit: 'steps',
      source: stepsData ? 'integration' : null,
    },
  };

  ApiResponse.success(res, { metrics });
});

/**
 * Log Quick Action
 * POST /api/stats/quick-log
 * Quick log for workouts, meals, sleep, mindfulness, water, weight
 */
export const logQuickAction = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const data = req.body as QuickLogInput;

  if (!data.type) {
    throw ApiError.badRequest('Type is required');
  }

  const validTypes = ['workout', 'meal', 'sleep', 'mindfulness', 'water', 'weight'];
  if (!validTypes.includes(data.type)) {
    throw ApiError.badRequest(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
  }

  // Map quick log type to data_type (must match database enum)
  // Valid enum values: 'heart_rate', 'hrv', 'sleep', 'steps', 'workouts', 'calories', 'nutrition', 'strain', 'recovery', 'body_temp', 'vo2_max', 'training_load', 'gps_activities'
  const dataTypeMap: Record<string, string> = {
    workout: 'workouts',
    meal: 'nutrition',
    sleep: 'sleep',
    mindfulness: 'recovery',
    water: 'nutrition',  // Map water/hydration to nutrition since 'hydration' isn't in enum
    weight: 'calories',  // Map weight/body_composition to calories since 'body_composition' isn't in enum
  };

  const dataType = dataTypeMap[data.type];

  // Build value based on type
  let value: Record<string, unknown> = {};
  let unit = '';

  switch (data.type) {
    case 'workout':
      value = {
        type: data.details?.workoutType || 'general',
        duration: data.duration || 30,
        intensity: data.details?.intensity || 'moderate',
        caloriesBurned: data.value || (data.duration || 30) * 6,
      };
      unit = 'session';
      break;

    case 'meal':
      value = {
        mealType: data.details?.mealType || 'meal',
        calories: data.value,
        notes: data.notes,
      };
      unit = 'kcal';
      break;

    case 'sleep':
      value = {
        duration: data.value || data.duration,
        quality: data.details?.quality || 7,
        notes: data.notes,
      };
      unit = 'minutes';
      break;

    case 'mindfulness':
      value = {
        type: data.details?.mindfulnessType || 'meditation',
        duration: data.duration || 10,
        mood_before: data.details?.moodBefore,
        mood_after: data.details?.moodAfter,
      };
      unit = 'minutes';
      break;

    case 'water':
      value = {
        glasses: data.value || 1,
        ml: (data.value || 1) * 250,
      };
      unit = 'glasses';
      break;

    case 'weight':
      value = {
        weight: data.value,
        unit: data.unit || 'kg',
      };
      unit = data.unit || 'kg';
      break;
  }

  // Check if user has an integration for this data type
  // For now, we'll create a "manual" integration placeholder
  let integrationId: string | null = null;

  const integrationResult = await query<{ id: string }>(
    `SELECT id FROM user_integrations
     WHERE user_id = $1
     AND status = 'active'
     ORDER BY created_at
     LIMIT 1`,
    [userId]
  );

  if (integrationResult.rows.length > 0) {
    integrationId = integrationResult.rows[0].id;
  } else {
    // Create a placeholder integration for manual entries if none exists
    // This is a workaround - in production you'd have a proper "manual" provider
    const createIntegration = await query<{ id: string }>(
      `INSERT INTO user_integrations (user_id, provider, access_token, status)
       VALUES ($1, 'apple_health', 'manual_entry', 'active')
       ON CONFLICT (user_id, provider) DO UPDATE SET status = 'active'
       RETURNING id`,
      [userId]
    );
    integrationId = createIntegration.rows[0].id;
  }

  // Insert health data record
  const recordResult = await query<{ id: string }>(
    `INSERT INTO health_data_records (user_id, integration_id, provider, data_type, recorded_at, value, unit)
     VALUES ($1, $2, 'apple_health', $3, CURRENT_TIMESTAMP, $4, $5)
     RETURNING id`,
    [userId, integrationId, dataType, JSON.stringify(value), unit]
  );

  logger.info('Quick action logged', {
    userId,
    type: data.type,
    recordId: recordResult.rows[0].id,
  });

  ApiResponse.created(res, {
    id: recordResult.rows[0].id,
    type: data.type,
    value,
    unit,
    recordedAt: new Date().toISOString(),
  }, `${data.type} logged successfully`);
});

// Helper: Calculate current streak
async function calculateStreak(userId: string): Promise<{ currentStreak: number; lastActivityDate: string | null }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get daily activity completion for last 365 days
  const logsResult = await query<{ date: Date; completed: string }>(
    `SELECT scheduled_date as date,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
     FROM activity_logs
     WHERE user_id = $1
     AND scheduled_date <= $2
     GROUP BY scheduled_date
     ORDER BY scheduled_date DESC
     LIMIT 365`,
    [userId, today]
  );

  if (logsResult.rows.length === 0) {
    return { currentStreak: 0, lastActivityDate: null };
  }

  let streak = 0;
  let lastActivityDate: string | null = null;
  let checkDate = new Date(today);

  for (const row of logsResult.rows) {
    const rowDate = new Date(row.date);
    rowDate.setHours(0, 0, 0, 0);
    const completed = parseInt(row.completed);

    // Check if this is a consecutive day
    const diffDays = Math.floor((checkDate.getTime() - rowDate.getTime()) / (1000 * 60 * 60 * 24));

    if (completed > 0) {
      if (diffDays <= 1) {
        streak++;
        if (!lastActivityDate) {
          lastActivityDate = rowDate.toISOString().split('T')[0];
        }
        checkDate = new Date(rowDate);
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        // Gap in streak
        break;
      }
    } else if (diffDays === 0) {
      // Today has no completed activities, check if streak continues from yesterday
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { currentStreak: streak, lastActivityDate };
}

// Helper: Calculate longest streak
async function calculateLongestStreak(userId: string): Promise<number> {
  const logsResult = await query<{ date: Date; completed: string }>(
    `SELECT scheduled_date as date,
            SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed
     FROM activity_logs
     WHERE user_id = $1
     GROUP BY scheduled_date
     ORDER BY scheduled_date`,
    [userId]
  );

  if (logsResult.rows.length === 0) {
    return 0;
  }

  let longestStreak = 0;
  let currentStreak = 0;
  let prevDate: Date | null = null;

  for (const row of logsResult.rows) {
    const rowDate = new Date(row.date);
    rowDate.setHours(0, 0, 0, 0);
    const completed = parseInt(row.completed);

    if (completed > 0) {
      if (prevDate) {
        const diffDays = Math.floor((rowDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak++;
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
      prevDate = rowDate;
    }
  }

  return longestStreak;
}

export default {
  getDashboardStats,
  getWeeklyActivityData,
  getCurrentStreak,
  getHealthMetrics,
  logQuickAction,
};
