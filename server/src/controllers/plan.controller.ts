import type { Response } from 'express';
import { query } from '../database/pg.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { logger } from '../services/logger.service.js';
import type { AuthenticatedRequest } from '../types/index.js';
import type {
  GeneratePlanInput,
  UpdatePlanInput,
  LogActivityInput,
} from '../validators/plan.validator.js';

// Type definitions
type GoalCategory = 'weight_loss' | 'muscle_building' | 'sleep_improvement' | 'stress_wellness' | 'energy_productivity' | 'event_training' | 'health_condition' | 'habit_building' | 'overall_optimization' | 'custom';
type HealthPillar = 'fitness' | 'nutrition' | 'wellbeing';
type PlanStatus = 'draft' | 'active' | 'paused' | 'completed' | 'archived';
type ActivityLogStatus = 'pending' | 'completed' | 'skipped' | 'partial';
type ActivityType = 'workout' | 'meal' | 'sleep_routine' | 'mindfulness' | 'habit' | 'check_in' | 'reflection' | 'learning';
type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface UserGoalRow {
  id: string;
  user_id: string;
  category: GoalCategory;
  pillar: HealthPillar;
  title: string;
  description: string;
  target_value: number;
  target_unit: string;
  duration_weeks: number;
  status: string;
}

interface UserPlanRow {
  id: string;
  user_id: string;
  goal_id: string;
  name: string;
  description: string;
  pillar: HealthPillar;
  goal_category: GoalCategory;
  start_date: Date;
  end_date: Date;
  duration_weeks: number;
  current_week: number;
  status: PlanStatus;
  paused_at: Date | null;
  resumed_at: Date | null;
  completed_at: Date | null;
  activities: object;
  weekly_focuses: object;
  ai_generated: boolean;
  ai_model: string | null;
  generation_params: object | null;
  user_adjustments: object;
  overall_progress: number;
  weekly_completion_rates: object;
  user_rating: number | null;
  user_feedback: string | null;
  created_at: Date;
  updated_at: Date;
}

interface ActivityLogRow {
  id: string;
  user_id: string;
  plan_id: string;
  activity_id: string;
  scheduled_date: Date;
  completed_at: Date | null;
  status: ActivityLogStatus;
  actual_value: number | null;
  target_value: number | null;
  duration: number | null;
  user_notes: string | null;
  mood: number | null;
  ai_feedback: string | null;
  created_at: Date;
  updated_at: Date;
}

interface UserPreferencesRow {
  id: string;
  user_id: string;
  coaching_style: string;
  coaching_intensity: string;
  timezone: string;
  preferred_check_in_time: string;
}

// Activity interface for the plan
interface IActivity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  targetValue?: number;
  targetUnit?: string;
  daysOfWeek: DayOfWeek[];
  preferredTime: string;
  duration?: number;
  isOptional?: boolean;
  instructions?: string[];
  resources?: Array<{ title: string; url?: string; type: string }>;
}

// Weekly focus interface
interface IWeeklyFocus {
  week: number;
  theme: string;
  focus: string;
  expectedOutcome: string;
  activities: string[];
}

/**
 * S01.6.1: Generate Initial Plan
 * POST /api/plans/generate
 */
export const generatePlan = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const data = req.body as GeneratePlanInput;

  // Check if user has a goal
  const goalsResult = await query<UserGoalRow>(
    `SELECT * FROM user_goals WHERE user_id = $1 AND status = 'active' ORDER BY is_primary DESC`,
    [userId]
  );

  if (goalsResult.rows.length === 0) {
    throw ApiError.badRequest('Please set a goal first');
  }

  const goal = data.goalId
    ? goalsResult.rows.find(g => g.id === data.goalId) || goalsResult.rows[0]
    : goalsResult.rows[0];

  if (!goal) throw ApiError.notFound('Goal not found');

  // Get user preferences
  const prefsResult = await query<UserPreferencesRow>(
    'SELECT * FROM user_preferences WHERE user_id = $1',
    [userId]
  );
  const preferences = prefsResult.rows[0];

  // Check for existing active plan
  const existingPlanResult = await query<UserPlanRow>(
    `SELECT * FROM user_plans WHERE user_id = $1 AND goal_id = $2 AND status = 'active'`,
    [userId, goal.id]
  );

  if (existingPlanResult.rows.length > 0 && !data.regenerate) {
    throw ApiError.conflict('An active plan already exists for this goal. Set regenerate=true to replace it.');
  }

  // Generate the plan
  const generatedPlan = await generateAIPlan(goal, preferences, data);

  // Archive existing active plan if regenerating
  if (existingPlanResult.rows.length > 0) {
    await query(
      `UPDATE user_plans SET status = 'archived', updated_at = CURRENT_TIMESTAMP WHERE id = $1`,
      [existingPlanResult.rows[0].id]
    );
  }

  // Create the plan
  const startDate = new Date();
  const endDate = new Date(startDate.getTime() + goal.duration_weeks * 7 * 24 * 60 * 60 * 1000);

  const planResult = await query<UserPlanRow>(
    `INSERT INTO user_plans (
      user_id, goal_id, name, description, pillar, goal_category,
      start_date, end_date, duration_weeks, current_week,
      status, activities, weekly_focuses,
      ai_generated, ai_model, generation_params, user_adjustments,
      overall_progress, weekly_completion_rates
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *`,
    [
      userId,
      goal.id,
      generatedPlan.name,
      generatedPlan.description,
      goal.pillar,
      goal.category,
      startDate,
      endDate,
      goal.duration_weeks,
      1,
      'active',
      JSON.stringify(generatedPlan.activities),
      JSON.stringify(generatedPlan.weeklyFocuses),
      true,
      'gpt-4',
      JSON.stringify(data),
      '[]',
      0,
      '[]',
    ]
  );

  const plan = planResult.rows[0];

  // Update user onboarding status
  await query(
    `UPDATE users SET
      onboarding_status = 'completed',
      onboarding_completed_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND onboarding_status = 'plan_pending'`,
    [userId]
  );

  logger.info('Plan generated', {
    userId,
    goalId: goal.id,
    planId: plan.id,
    activities: generatedPlan.activities.length,
  });

  ApiResponse.created(res, {
    plan: mapPlanRow(plan),
    message: generatedPlan.coachMessage,
  }, 'Plan generated successfully');
});

/**
 * Get User Plans
 * GET /api/plans
 */
export const getPlans = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { status } = req.query;

  let queryText = 'SELECT * FROM user_plans WHERE user_id = $1';
  const params: (string | PlanStatus)[] = [userId];

  if (status && typeof status === 'string') {
    queryText += ' AND status = $2';
    params.push(status as PlanStatus);
  }

  queryText += ' ORDER BY created_at DESC';

  const plansResult = await query<UserPlanRow>(queryText, params);

  ApiResponse.success(res, { plans: plansResult.rows.map(mapPlanRow) });
});

/**
 * Get Active Plan
 * GET /api/plans/active
 */
export const getActivePlan = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const planResult = await query<UserPlanRow>(
    `SELECT * FROM user_plans WHERE user_id = $1 AND status = 'active' ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );

  if (planResult.rows.length === 0) {
    throw ApiError.notFound('No active plan found');
  }

  const plan = planResult.rows[0];

  // Get today's activities
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLogsResult = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs WHERE plan_id = $1 AND scheduled_date = $2`,
    [plan.id, today]
  );

  // Get week completion rate
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);

  const weekLogsResult = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs WHERE plan_id = $1 AND scheduled_date >= $2`,
    [plan.id, startOfWeek]
  );

  const completed = weekLogsResult.rows.filter(l => l.status === 'completed').length;
  const total = weekLogsResult.rows.length || 1;
  const weekCompletionRate = Math.round((completed / total) * 100);

  ApiResponse.success(res, {
    plan: mapPlanRow(plan),
    todayActivities: todayLogsResult.rows,
    weekCompletionRate,
  });
});

/**
 * Get Plan by ID
 * GET /api/plans/:planId
 */
export const getPlanById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId } = req.params;
  if (!planId) throw ApiError.badRequest('Plan ID is required');

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) {
    throw ApiError.notFound('Plan not found');
  }

  ApiResponse.success(res, { plan: mapPlanRow(planResult.rows[0]) });
});

/**
 * S01.6.2: Update Plan
 * PATCH /api/plans/:planId
 */
export const updatePlan = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId } = req.params;
  const data = req.body as UpdatePlanInput;

  if (!planId) throw ApiError.badRequest('Plan ID is required');

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) throw ApiError.notFound('Plan not found');

  const plan = planResult.rows[0];

  const updates: string[] = [];
  const values: (string | number | Date | object | null)[] = [];
  let paramIndex = 1;

  if (data.status) {
    updates.push(`status = $${paramIndex++}`);
    values.push(data.status);

    if (data.status === 'paused') {
      updates.push(`paused_at = $${paramIndex++}`);
      values.push(new Date());
    } else if (data.status === 'active' && plan.status === 'paused') {
      updates.push(`resumed_at = $${paramIndex++}`);
      values.push(new Date());
    } else if (data.status === 'completed') {
      updates.push(`completed_at = $${paramIndex++}`);
      values.push(new Date());
    }
  }

  if (data.activities) {
    updates.push(`activities = $${paramIndex++}`);
    values.push(JSON.stringify(data.activities));

    // Track adjustment
    const currentAdjustments = (plan.user_adjustments as Array<{ type: string; timestamp: Date }>) || [];
    currentAdjustments.push({ type: 'activities_modified', timestamp: new Date() });
    updates.push(`user_adjustments = $${paramIndex++}`);
    values.push(JSON.stringify(currentAdjustments));
  }

  if (data.userRating !== undefined) {
    updates.push(`user_rating = $${paramIndex++}`);
    values.push(data.userRating);
  }

  if (data.userFeedback !== undefined) {
    updates.push(`user_feedback = $${paramIndex++}`);
    values.push(data.userFeedback);
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  values.push(planId);

  const updateResult = await query<UserPlanRow>(
    `UPDATE user_plans SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
    values
  );

  logger.info('Plan updated', { userId, planId, changes: Object.keys(data) });

  ApiResponse.success(res, { plan: mapPlanRow(updateResult.rows[0]) }, 'Plan updated');
});

/**
 * Log Activity Completion
 * POST /api/plans/:planId/activities/:activityId/log
 */
export const logActivity = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId, activityId } = req.params;
  const data = req.body as LogActivityInput;

  if (!planId || !activityId) {
    throw ApiError.badRequest('Plan ID and Activity ID are required');
  }

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) throw ApiError.notFound('Plan not found');

  const plan = planResult.rows[0];
  const activities = plan.activities as IActivity[];

  const activity = activities.find(a => a.id === activityId);
  if (!activity) throw ApiError.notFound('Activity not found in plan');

  const scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : new Date();
  scheduledDate.setHours(0, 0, 0, 0);

  // Upsert activity log
  const existingLogResult = await query<ActivityLogRow>(
    'SELECT * FROM activity_logs WHERE plan_id = $1 AND activity_id = $2 AND scheduled_date = $3',
    [planId, activityId, scheduledDate]
  );

  let activityLog: ActivityLogRow;
  if (existingLogResult.rows.length > 0) {
    const updateResult = await query<ActivityLogRow>(
      `UPDATE activity_logs SET
        status = $1,
        completed_at = $2,
        actual_value = $3,
        duration = $4,
        user_notes = $5,
        mood = $6,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *`,
      [
        data.status,
        data.status === 'completed' ? new Date() : null,
        data.actualValue || null,
        data.duration || null,
        data.notes || null,
        data.mood || null,
        existingLogResult.rows[0].id,
      ]
    );
    activityLog = updateResult.rows[0];
  } else {
    const createResult = await query<ActivityLogRow>(
      `INSERT INTO activity_logs (
        user_id, plan_id, activity_id, scheduled_date,
        status, completed_at, actual_value, target_value, duration, user_notes, mood
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        planId,
        activityId,
        scheduledDate,
        data.status,
        data.status === 'completed' ? new Date() : null,
        data.actualValue || null,
        activity.targetValue || null,
        data.duration || null,
        data.notes || null,
        data.mood || null,
      ]
    );
    activityLog = createResult.rows[0];
  }

  // Generate AI feedback for completed activities
  let feedback: string | undefined;
  if (data.status === 'completed') {
    feedback = await generateActivityFeedback(activity, data);

    await query(
      'UPDATE activity_logs SET ai_feedback = $1 WHERE id = $2',
      [feedback, activityLog.id]
    );
  }

  // Update plan progress
  await updatePlanProgress(planId);

  logger.info('Activity logged', {
    userId,
    planId,
    activityId,
    status: data.status,
  });

  ApiResponse.success(res, {
    log: activityLog,
    feedback,
  }, 'Activity logged successfully');
});

/**
 * Get Activity Logs
 * GET /api/plans/:planId/logs
 */
export const getActivityLogs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId } = req.params;
  const { startDate, endDate, activityId } = req.query;

  if (!planId) throw ApiError.badRequest('Plan ID is required');

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) throw ApiError.notFound('Plan not found');

  let queryText = 'SELECT * FROM activity_logs WHERE plan_id = $1';
  const params: (string | Date)[] = [planId];
  let paramIndex = 2;

  if (startDate && typeof startDate === 'string') {
    queryText += ` AND scheduled_date >= $${paramIndex++}`;
    params.push(new Date(startDate));
  }

  if (endDate && typeof endDate === 'string') {
    queryText += ` AND scheduled_date <= $${paramIndex++}`;
    params.push(new Date(endDate));
  }

  if (activityId && typeof activityId === 'string') {
    queryText += ` AND activity_id = $${paramIndex++}`;
    params.push(activityId);
  }

  queryText += ' ORDER BY scheduled_date DESC, created_at DESC';

  const logsResult = await query<ActivityLogRow>(queryText, params);

  ApiResponse.success(res, { logs: logsResult.rows });
});

/**
 * Get Weekly Summary
 * GET /api/plans/:planId/summary/weekly
 */
export const getWeeklySummary = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId } = req.params;
  const { week } = req.query;

  if (!planId) throw ApiError.badRequest('Plan ID is required');

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) throw ApiError.notFound('Plan not found');

  const plan = planResult.rows[0];
  const targetWeek = week ? parseInt(week as string, 10) : plan.current_week;

  // Calculate week start date
  const planStartDate = new Date(plan.start_date);
  const weekStartDate = new Date(planStartDate.getTime() + (targetWeek - 1) * 7 * 24 * 60 * 60 * 1000);
  const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  const logsResult = await query<ActivityLogRow>(
    `SELECT * FROM activity_logs WHERE plan_id = $1 AND scheduled_date >= $2 AND scheduled_date <= $3`,
    [planId, weekStartDate, weekEndDate]
  );

  const logs = logsResult.rows;

  // Calculate stats
  const totalActivities = logs.length;
  const completedCount = logs.filter(l => l.status === 'completed').length;
  const skippedCount = logs.filter(l => l.status === 'skipped').length;
  const completionRate = totalActivities > 0
    ? Math.round((completedCount / totalActivities) * 100)
    : 0;

  // Get weekly focus
  const weeklyFocuses = plan.weekly_focuses as IWeeklyFocus[];
  const weekFocus = weeklyFocuses.find(f => f.week === targetWeek);

  // Activity breakdown by type
  const activityBreakdown: Record<ActivityType, { completed: number; total: number }> = {
    workout: { completed: 0, total: 0 },
    meal: { completed: 0, total: 0 },
    sleep_routine: { completed: 0, total: 0 },
    mindfulness: { completed: 0, total: 0 },
    habit: { completed: 0, total: 0 },
    check_in: { completed: 0, total: 0 },
    reflection: { completed: 0, total: 0 },
    learning: { completed: 0, total: 0 },
  };

  const activities = plan.activities as IActivity[];
  for (const log of logs) {
    const activity = activities.find(a => a.id === log.activity_id);
    if (activity) {
      activityBreakdown[activity.type].total++;
      if (log.status === 'completed') {
        activityBreakdown[activity.type].completed++;
      }
    }
  }

  ApiResponse.success(res, {
    week: targetWeek,
    weekStartDate,
    weekEndDate,
    focus: weekFocus,
    stats: {
      totalActivities,
      completed: completedCount,
      skipped: skippedCount,
      pending: totalActivities - completedCount - skippedCount,
      completionRate,
    },
    activityBreakdown,
  });
});

/**
 * Get Today's Activities
 * GET /api/plans/:planId/today
 */
export const getTodayActivities = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  const { planId } = req.params;

  if (!planId) throw ApiError.badRequest('Plan ID is required');

  const planResult = await query<UserPlanRow>(
    'SELECT * FROM user_plans WHERE id = $1 AND user_id = $2',
    [planId, userId]
  );

  if (planResult.rows.length === 0) throw ApiError.notFound('Plan not found');

  const plan = planResult.rows[0];
  const today = new Date();
  const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][today.getDay()] as DayOfWeek;

  const activities = plan.activities as IActivity[];
  const todayActivities = activities.filter(a => a.daysOfWeek.includes(dayOfWeek));

  // Get existing logs for today
  const todayStart = new Date(today);
  todayStart.setHours(0, 0, 0, 0);

  const logsResult = await query<ActivityLogRow>(
    'SELECT * FROM activity_logs WHERE plan_id = $1 AND scheduled_date = $2',
    [planId, todayStart]
  );

  const logsMap = new Map(logsResult.rows.map(l => [l.activity_id, l]));

  const formattedActivities = todayActivities.map(activity => ({
    ...activity,
    log: logsMap.get(activity.id) || null,
    status: logsMap.get(activity.id)?.status || 'pending',
  }));

  formattedActivities.sort((a, b) => {
    const timeA = a.preferredTime || '23:59';
    const timeB = b.preferredTime || '23:59';
    return timeA.localeCompare(timeB);
  });

  ApiResponse.success(res, {
    date: today,
    dayOfWeek,
    activities: formattedActivities,
    completedCount: logsResult.rows.filter(l => l.status === 'completed').length,
    totalCount: todayActivities.length,
  });
});

/**
 * Complete Onboarding
 * POST /api/plans/complete-onboarding
 */
export const completeOnboarding = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) throw ApiError.unauthorized();

  // Check if user has an active plan
  const planResult = await query<UserPlanRow>(
    `SELECT * FROM user_plans WHERE user_id = $1 AND status = 'active' LIMIT 1`,
    [userId]
  );

  if (planResult.rows.length === 0) {
    throw ApiError.badRequest('Please generate a plan first');
  }

  await query(
    `UPDATE users SET
      onboarding_status = 'completed',
      onboarding_completed_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1`,
    [userId]
  );

  logger.info('Onboarding completed', { userId });

  ApiResponse.success(res, {
    message: "You're all set! Your personalized plan is ready.",
    planId: planResult.rows[0].id,
  }, 'Onboarding complete');
});

// Helper Functions

function mapPlanRow(row: UserPlanRow) {
  return {
    id: row.id,
    userId: row.user_id,
    goalId: row.goal_id,
    name: row.name,
    description: row.description,
    pillar: row.pillar,
    goalCategory: row.goal_category,
    startDate: row.start_date,
    endDate: row.end_date,
    durationWeeks: row.duration_weeks,
    currentWeek: row.current_week,
    status: row.status,
    pausedAt: row.paused_at,
    resumedAt: row.resumed_at,
    completedAt: row.completed_at,
    activities: row.activities,
    weeklyFocuses: row.weekly_focuses,
    aiGenerated: row.ai_generated,
    aiModel: row.ai_model,
    generationParams: row.generation_params,
    userAdjustments: row.user_adjustments,
    overallProgress: row.overall_progress,
    weeklyCompletionRates: row.weekly_completion_rates,
    userRating: row.user_rating,
    userFeedback: row.user_feedback,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function generateAIPlan(
  goal: UserGoalRow,
  preferences: UserPreferencesRow | undefined,
  _options: GeneratePlanInput
): Promise<{
  name: string;
  description: string;
  activities: IActivity[];
  weeklyFocuses: IWeeklyFocus[];
  coachMessage: string;
}> {
  const planName = `${goal.title} Plan`;
  const planDescription = `A ${goal.duration_weeks}-week plan to achieve ${goal.description.toLowerCase()}`;

  // Generate activities based on goal
  const activities: IActivity[] = [];
  let activityIndex = 0;

  // Workout activities for fitness goals
  if (goal.pillar === 'fitness') {
    activities.push({
      id: `act_${++activityIndex}`,
      type: 'workout',
      title: 'Strength Training',
      description: 'Full body workout focusing on compound movements',
      targetValue: 45,
      targetUnit: 'minutes',
      daysOfWeek: ['monday', 'wednesday', 'friday'],
      preferredTime: '07:00',
      duration: 45,
      instructions: ['Warm up for 5 minutes', 'Follow the exercise routine', 'Cool down and stretch'],
    });
  }

  // Nutrition tracking for all plans
  activities.push({
    id: `act_${++activityIndex}`,
    type: 'meal',
    title: 'Log Meals',
    description: 'Track your daily food intake',
    daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: '20:00',
    instructions: ['Log breakfast, lunch, and dinner', 'Include snacks and beverages'],
  });

  // Sleep routine
  if (goal.category === 'sleep_improvement' || goal.pillar === 'wellbeing') {
    activities.push({
      id: `act_${++activityIndex}`,
      type: 'sleep_routine',
      title: 'Evening Wind-Down',
      description: 'Prepare for quality sleep',
      targetValue: 30,
      targetUnit: 'minutes',
      daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      preferredTime: '21:30',
      instructions: ['Dim lights', 'No screens 30 min before bed', 'Light stretching or reading'],
    });
  }

  // Daily check-in
  activities.push({
    id: `act_${++activityIndex}`,
    type: 'check_in',
    title: 'Daily Check-in',
    description: 'Rate your energy and mood',
    daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    preferredTime: preferences?.preferred_check_in_time || '09:00',
  });

  // Weekly reflection
  activities.push({
    id: `act_${++activityIndex}`,
    type: 'reflection',
    title: 'Weekly Reflection',
    description: 'Review your progress and set intentions',
    daysOfWeek: ['sunday'],
    preferredTime: '18:00',
    isOptional: true,
  });

  // Generate weekly focuses
  const weeklyFocuses: IWeeklyFocus[] = [];
  for (let week = 1; week <= Math.min(goal.duration_weeks, 12); week++) {
    let theme: string;
    let focus: string;
    let expectedOutcome: string;

    if (week === 1) {
      theme = 'Foundation';
      focus = 'Building habits and establishing baseline routines';
      expectedOutcome = 'Consistent daily tracking and initial momentum';
    } else if (week <= 4) {
      theme = 'Acceleration';
      focus = 'Increasing intensity and building consistency';
      expectedOutcome = 'Noticeable improvements in energy and adherence';
    } else if (week <= 8) {
      theme = 'Optimization';
      focus = 'Fine-tuning based on progress and feedback';
      expectedOutcome = 'Measurable progress toward goals';
    } else {
      theme = 'Mastery';
      focus = 'Solidifying habits for long-term success';
      expectedOutcome = 'Sustainable lifestyle changes';
    }

    weeklyFocuses.push({
      week,
      theme,
      focus,
      expectedOutcome,
      activities: activities.slice(0, 3).map(a => a.id),
    });
  }

  // Generate coach message
  const coachMessages: Record<string, string> = {
    supportive: "I'm so excited to be on this journey with you! This plan is designed just for you, and I'll be here every step of the way.",
    direct: "Your plan is ready. Follow it consistently and you'll see results. Let's get to work.",
    analytical: "I've analyzed your goals and data to create this optimized plan. The activities are sequenced for maximum effectiveness.",
    motivational: "This is YOUR time! I've created an amazing plan that's going to transform your life. Let's crush these goals together!",
  };

  const style = preferences?.coaching_style || 'supportive';
  const coachMessage = coachMessages[style] || coachMessages['supportive'];

  return {
    name: planName,
    description: planDescription,
    activities,
    weeklyFocuses,
    coachMessage,
  };
}

async function generateActivityFeedback(
  activity: IActivity,
  data: LogActivityInput
): Promise<string> {
  // Placeholder - integrate with AI service
  const feedbackOptions = [
    `Great job completing "${activity.title}"! Keep up the momentum.`,
    `Excellent work on "${activity.title}"! You're building strong habits.`,
    `"${activity.title}" completed! Every session counts toward your goal.`,
  ];

  if (data.mood && data.mood >= 4) {
    return feedbackOptions[0] + " I can see you're feeling great about it!";
  }

  return feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
}

async function updatePlanProgress(planId: string): Promise<void> {
  const logsResult = await query<ActivityLogRow>(
    'SELECT * FROM activity_logs WHERE plan_id = $1',
    [planId]
  );

  const logs = logsResult.rows;
  if (logs.length === 0) return;

  const completed = logs.filter(l => l.status === 'completed').length;
  const overallProgress = Math.round((completed / logs.length) * 100);

  await query(
    'UPDATE user_plans SET overall_progress = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
    [overallProgress, planId]
  );
}

export default {
  generatePlan,
  generatePlanPreview: generatePlan,
  getPlans,
  getActivePlan,
  getPlanById,
  getPlan: getPlanById,
  createPlan: generatePlan,
  activatePlan: updatePlan,
  updatePlan,
  logActivity,
  logActivityCompletion: logActivity,
  updateActivity: updatePlan,
  getActivityLogs,
  getWeeklySummary,
  getTodayActivities,
  completeOnboarding,
};
