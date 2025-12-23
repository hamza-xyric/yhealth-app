import type { Response } from 'express';
import type { AuthenticatedRequest } from '../types/index.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { query } from '../database/pg.js';
// import { logger } from '../services/logger.service.js';

// Types
interface HealthDataRow {
  id: string;
  user_id: string;
  data_type: string;
  recorded_at: Date;
  value: Record<string, unknown>;
  unit: string;
  provider: string;
}

// Type map for health data to display info
const typeMap: Record<string, { title: string; type: string; pillar: string }> = {
  workouts: { title: 'Workout', type: 'workout', pillar: 'fitness' },
  nutrition: { title: 'Nutrition Log', type: 'meal', pillar: 'nutrition' },
  sleep: { title: 'Sleep Tracked', type: 'sleep', pillar: 'wellbeing' },
  recovery: { title: 'Mindfulness Session', type: 'mindfulness', pillar: 'wellbeing' },
  steps: { title: 'Steps', type: 'steps', pillar: 'fitness' },
  heart_rate: { title: 'Heart Rate', type: 'check_in', pillar: 'fitness' },
  calories: { title: 'Calories', type: 'meal', pillar: 'nutrition' },
  hrv: { title: 'HRV', type: 'check_in', pillar: 'wellbeing' },
  strain: { title: 'Strain Score', type: 'workout', pillar: 'fitness' },
};

// Helper to build description from health data value
function buildDescription(dataType: string, value: Record<string, unknown>): string {
  if (dataType === 'nutrition' && value.glasses) {
    return `${value.glasses} glasses of water`;
  } else if (dataType === 'nutrition' && value.calories) {
    const mealType = value.mealType ? `${value.mealType} - ` : '';
    return `${mealType}${value.calories} kcal`;
  } else if (dataType === 'sleep' && value.duration) {
    return `${((value.duration as number) / 60).toFixed(1)} hours`;
  } else if (dataType === 'workouts') {
    const dur = value.duration ? `${value.duration} minutes` : '';
    const type = value.type ? `${value.type}` : 'workout';
    return dur ? `${dur} - ${type}` : type;
  } else if (dataType === 'recovery') {
    return `${value.duration || 10} minutes - ${value.type || 'meditation'}`;
  } else if (value.notes) {
    return value.notes as string;
  }
  return `Logged ${dataType}`;
}

/**
 * Get Activity List
 * GET /api/activity/logs
 * Returns paginated activity logs for a date range
 */
export const getActivityLogs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const {
    startDate,
    endDate,
    type,
    page = '1',
    limit = '20',
  } = req.query;

  const pageNum = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)));
  const offset = (pageNum - 1) * limitNum;

  // Default to last 30 days if no date range specified
  const today = new Date();
  const defaultStart = new Date(today);
  defaultStart.setDate(defaultStart.getDate() - 30);

  const start = startDate ? new Date(startDate as string) : defaultStart;
  const end = endDate ? new Date(endDate as string) : today;

  // Use health_data_records as the primary source
  let queryStr = `
    SELECT
      id,
      data_type,
      recorded_at,
      value,
      unit,
      provider
    FROM health_data_records
    WHERE user_id = $1
    AND recorded_at >= $2
    AND recorded_at <= $3
  `;

  const params: (string | Date)[] = [userId, start, end];
  let paramIndex = 4;

  if (type) {
    queryStr += ` AND data_type = $${paramIndex}`;
    params.push(type as string);
    paramIndex++;
  }

  // Get total count
  const countQuery = queryStr.replace(
    /SELECT[\s\S]*?FROM/,
    'SELECT COUNT(*) as count FROM'
  ).replace(/ORDER BY[\s\S]*$/, '');

  const countResult = await query<{ count: string }>(countQuery, params);
  const total = parseInt(countResult.rows[0]?.count || '0');

  // Add ordering and pagination
  queryStr += ` ORDER BY recorded_at DESC`;
  queryStr += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
  params.push(limitNum.toString(), offset.toString());

  const logsResult = await query<HealthDataRow>(queryStr, params);

  const activities = logsResult.rows.map(row => {
    const info = typeMap[row.data_type] || { title: row.data_type, type: 'habit', pillar: 'fitness' };
    const value = row.value || {};

    return {
      id: row.id,
      title: info.title,
      description: buildDescription(row.data_type, value),
      type: info.type,
      pillar: info.pillar,
      completedAt: row.recorded_at,
      duration: (value.duration as number) || null,
      status: 'completed',
      source: 'health_data',
    };
  });

  ApiResponse.paginated(res, activities, {
    page: pageNum,
    limit: limitNum,
    total,
  });
});

/**
 * Get Activity Stats
 * GET /api/activity/stats
 * Returns activity statistics for a time period
 */
export const getActivityStats = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { period = 'week' } = req.query;

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  let startDate: Date;
  let prevStartDate: Date;
  let prevEndDate: Date;

  switch (period) {
    case 'day':
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      prevStartDate = new Date(startDate);
      prevStartDate.setDate(prevStartDate.getDate() - 1);
      prevEndDate = new Date(startDate);
      prevEndDate.setMilliseconds(-1);
      break;
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      prevStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      prevEndDate = new Date(startDate);
      prevEndDate.setMilliseconds(-1);
      break;
    case 'week':
    default:
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay()); // Sunday
      startDate.setHours(0, 0, 0, 0);
      prevStartDate = new Date(startDate);
      prevStartDate.setDate(prevStartDate.getDate() - 7);
      prevEndDate = new Date(startDate);
      prevEndDate.setMilliseconds(-1);
      break;
  }

  // Get current period stats from health_data_records
  const currentStats = await query<{
    total: string;
    total_duration: string;
    total_calories: string;
  }>(
    `SELECT
      COUNT(*) as total,
      COALESCE(SUM(CASE
        WHEN value->>'duration' IS NOT NULL THEN (value->>'duration')::int
        ELSE 0
      END), 0) as total_duration,
      COALESCE(SUM(CASE
        WHEN data_type = 'workouts' AND value->>'duration' IS NOT NULL
        THEN (value->>'duration')::int * 6
        WHEN value->>'caloriesBurned' IS NOT NULL
        THEN (value->>'caloriesBurned')::int
        ELSE 0
      END), 0) as total_calories
     FROM health_data_records
     WHERE user_id = $1
     AND recorded_at >= $2
     AND recorded_at <= $3`,
    [userId, startDate, today]
  );

  // Get previous period stats for comparison
  const prevStats = await query<{
    total: string;
    total_duration: string;
  }>(
    `SELECT
      COUNT(*) as total,
      COALESCE(SUM(CASE
        WHEN value->>'duration' IS NOT NULL THEN (value->>'duration')::int
        ELSE 0
      END), 0) as total_duration
     FROM health_data_records
     WHERE user_id = $1
     AND recorded_at >= $2
     AND recorded_at <= $3`,
    [userId, prevStartDate, prevEndDate]
  );

  const currentTotal = parseInt(currentStats.rows[0]?.total || '0');
  const currentDuration = parseInt(currentStats.rows[0]?.total_duration || '0');
  const currentCalories = parseInt(currentStats.rows[0]?.total_calories || '0');

  const prevTotal = parseInt(prevStats.rows[0]?.total || '0') || 1;
  const prevDuration = parseInt(prevStats.rows[0]?.total_duration || '0') || 1;

  // Calculate completion rate based on expected activities per period
  const daysInPeriod = period === 'day' ? 1 : period === 'week' ? 7 : 30;
  const expectedActivities = daysInPeriod * 3; // Assume 3 activities per day target
  const currentRate = Math.min(100, Math.round((currentTotal / expectedActivities) * 100));
  const prevRate = Math.min(100, Math.round((prevTotal / expectedActivities) * 100));

  const stats = {
    activitiesThisPeriod: currentTotal,
    activitiesChange: currentTotal - prevTotal,
    caloriesBurned: currentCalories,
    caloriesChange: prevTotal > 0 ? Math.round(((currentCalories - (prevTotal * 180)) / Math.max(prevTotal * 180, 1)) * 100) : 0,
    activeTime: currentDuration,
    activeTimeChange: prevDuration > 0 ? Math.round(((currentDuration - prevDuration) / prevDuration) * 100) : 0,
    completionRate: currentRate,
    completionRateChange: currentRate - prevRate,
    period,
    startDate: startDate.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  };

  ApiResponse.success(res, { stats });
});

/**
 * Get Activity Breakdown by Type
 * GET /api/activity/breakdown
 * Returns activity breakdown by type for the given period
 */
export const getActivityBreakdown = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { period = 'week' } = req.query;

  const today = new Date();
  today.setHours(23, 59, 59, 999);

  let startDate: Date;
  let daysInPeriod: number;

  switch (period) {
    case 'day':
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      daysInPeriod = 1;
      break;
    case 'month':
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      daysInPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      break;
    case 'week':
    default:
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      startDate.setHours(0, 0, 0, 0);
      daysInPeriod = 7;
      break;
  }

  // Get breakdown by data_type from health_data_records
  const breakdownResult = await query<{
    data_type: string;
    total: string;
    total_duration: string;
  }>(
    `SELECT
      data_type,
      COUNT(*) as total,
      COALESCE(SUM(CASE
        WHEN value->>'duration' IS NOT NULL THEN (value->>'duration')::int
        ELSE 0
      END), 0) as total_duration
     FROM health_data_records
     WHERE user_id = $1
     AND recorded_at >= $2
     AND recorded_at <= $3
     GROUP BY data_type
     ORDER BY total DESC`,
    [userId, startDate, today]
  );

  // Map data types to display info
  const breakdownTypeMap: Record<string, { label: string; type: string; pillar: string }> = {
    workouts: { label: 'Workouts', type: 'workout', pillar: 'fitness' },
    nutrition: { label: 'Meals & Water', type: 'meal', pillar: 'nutrition' },
    sleep: { label: 'Sleep Logged', type: 'sleep', pillar: 'wellbeing' },
    recovery: { label: 'Mindfulness', type: 'mindfulness', pillar: 'wellbeing' },
    steps: { label: 'Steps', type: 'steps', pillar: 'fitness' },
    heart_rate: { label: 'Heart Rate', type: 'check_in', pillar: 'fitness' },
    calories: { label: 'Calories Tracked', type: 'meal', pillar: 'nutrition' },
    hrv: { label: 'HRV', type: 'check_in', pillar: 'wellbeing' },
    strain: { label: 'Strain Score', type: 'workout', pillar: 'fitness' },
  };

  const breakdown = breakdownResult.rows.map(row => {
    const info = breakdownTypeMap[row.data_type] || { label: row.data_type, type: 'habit', pillar: 'fitness' };
    const count = parseInt(row.total);

    return {
      type: info.type,
      activityType: row.data_type,
      label: info.label,
      pillar: info.pillar,
      count,
      total: count,
      completionRate: 100,
      duration: parseInt(row.total_duration),
      expected: Math.ceil(daysInPeriod * 0.7), // 70% of days expected
    };
  });

  ApiResponse.success(res, {
    breakdown,
    period,
    startDate: startDate.toISOString().split('T')[0],
    endDate: today.toISOString().split('T')[0],
  });
});

/**
 * Get Calendar Data
 * GET /api/activity/calendar
 * Returns daily activity summary for calendar view
 */
export const getCalendarData = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { year, month, week } = req.query;

  const today = new Date();
  let startDate: Date;
  let endDate: Date;

  if (week) {
    // Week view
    const weekDate = new Date(week as string);
    startDate = new Date(weekDate);
    startDate.setDate(weekDate.getDate() - weekDate.getDay()); // Sunday
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  } else if (year && month) {
    // Month view
    const y = parseInt(year as string);
    const m = parseInt(month as string) - 1;
    startDate = new Date(y, m, 1);
    endDate = new Date(y, m + 1, 0, 23, 59, 59, 999);
  } else {
    // Default: current week
    startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay());
    startDate.setHours(0, 0, 0, 0);
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
  }

  // Get daily summaries from health_data_records
  const dailyResult = await query<{
    date: string;
    count: string;
    total_duration: string;
  }>(
    `SELECT
      DATE(recorded_at) as date,
      COUNT(*) as count,
      COALESCE(SUM(CASE
        WHEN value->>'duration' IS NOT NULL THEN (value->>'duration')::int
        ELSE 0
      END), 0) as total_duration
     FROM health_data_records
     WHERE user_id = $1
     AND recorded_at >= $2
     AND recorded_at <= $3
     GROUP BY DATE(recorded_at)
     ORDER BY date`,
    [userId, startDate, endDate]
  );

  // Create a map of data by date
  const dataMap = new Map<string, { count: number; duration: number }>();
  for (const row of dailyResult.rows) {
    dataMap.set(row.date, {
      count: parseInt(row.count),
      duration: parseInt(row.total_duration),
    });
  }

  // Build calendar data
  const days: Array<{
    date: string;
    dayOfWeek: string;
    dayNumber: number;
    isToday: boolean;
    activities: {
      total: number;
      completed: number;
      completionRate: number;
    };
    healthLogs: number;
    duration: number;
    hasActivity: boolean;
  }> = [];

  const currentDate = new Date(startDate);
  const todayStr = today.toISOString().split('T')[0];

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const dayData = dataMap.get(dateStr);

    const count = dayData?.count || 0;

    days.push({
      date: dateStr,
      dayOfWeek: currentDate.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: currentDate.getDate(),
      isToday: dateStr === todayStr,
      activities: {
        total: count,
        completed: count,
        completionRate: count > 0 ? 100 : 0,
      },
      healthLogs: count,
      duration: dayData?.duration || 0,
      hasActivity: count > 0,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  ApiResponse.success(res, {
    days,
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  });
});

/**
 * Log Activity Completion
 * POST /api/activity/logs/:logId/complete
 * Mark an activity log as completed (placeholder - requires activity_logs table)
 */
export const completeActivity = asyncHandler(async (req: AuthenticatedRequest, _res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  // This endpoint requires the full activity_logs + user_plans setup
  // For now, return a helpful message
  throw ApiError.badRequest('Activity completion tracking will be available once you create a personalized plan');
});

/**
 * Skip Activity
 * POST /api/activity/logs/:logId/skip
 */
export const skipActivity = asyncHandler(async (req: AuthenticatedRequest, _res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  // This endpoint requires the full activity_logs + user_plans setup
  throw ApiError.badRequest('Activity skipping will be available once you create a personalized plan');
});

/**
 * Get Recent Activities (for dashboard feed)
 * GET /api/activity/recent
 */
export const getRecentActivities = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { limit = '10' } = req.query;
  const limitNum = Math.min(50, Math.max(1, parseInt(limit as string)));

  // Get recent health data logs
  const healthDataResult = await query<HealthDataRow>(
    `SELECT *
     FROM health_data_records
     WHERE user_id = $1
     ORDER BY recorded_at DESC
     LIMIT $2`,
    [userId, limitNum]
  );

  const activities: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    completedAt: string;
    duration: number | null;
    pillar: string;
    source: 'health_data';
    metrics?: Record<string, unknown>;
  }> = [];

  for (const record of healthDataResult.rows) {
    const info = typeMap[record.data_type] || { title: record.data_type, type: 'check_in', pillar: 'fitness' };
    const value = record.value || {};

    activities.push({
      id: record.id,
      type: info.type,
      title: info.title,
      description: buildDescription(record.data_type, value),
      completedAt: record.recorded_at.toISOString(),
      duration: (value.duration as number) || null,
      pillar: info.pillar,
      source: 'health_data',
      metrics: value,
    });
  }

  ApiResponse.success(res, { activities });
});

export default {
  getActivityLogs,
  getActivityStats,
  getActivityBreakdown,
  getCalendarData,
  completeActivity,
  skipActivity,
  getRecentActivities,
};
