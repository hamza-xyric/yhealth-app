"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Activity,
  TrendingUp,
  Flame,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  BarChart3,
  Timer,
  Star,
  Dumbbell,
  Utensils,
  Moon,
  Brain,
  Zap,
  Heart,
  Sparkles,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Droplets,
  Trophy,
  Loader2,
  Footprints,
  Scale,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api-client";

// Types
interface ActivityItem {
  id: string;
  type: string;
  title: string;
  description: string;
  targetValue?: number;
  targetUnit?: string;
  preferredTime: string;
  duration?: number;
  status: "pending" | "completed" | "skipped";
}

interface Plan {
  id: string;
  name: string;
  description: string;
  pillar: string;
  goalCategory: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  currentWeek: number;
  status: string;
  overallProgress: number;
  activities: ActivityItem[];
}

interface TodayData {
  planId: string;
  date: string;
  dayOfWeek: string;
  activities: ActivityItem[];
  completedCount: number;
  totalCount: number;
}

interface WeeklySummary {
  week: number;
  focus?: {
    theme: string;
    focus: string;
    expectedOutcome: string;
  };
  stats: {
    totalActivities: number;
    completed: number;
    skipped: number;
    pending: number;
    completionRate: number;
  };
}

interface DashboardStats {
  streak: {
    current: number;
    longest: number;
    lastActivityDate: string | null;
  };
  weekProgress: {
    rate: number;
    change: number;
    completed: number;
    total: number;
  };
  summary: {
    totalActivitiesCompleted: number;
    activeGoals: number;
  };
}

interface WeeklyActivityData {
  week: string;
  startDate: string;
  endDate: string;
  days: Array<{
    day: string;
    date: string;
    completed: number;
    total: number;
    completionRate: number;
    isToday: boolean;
  }>;
  summary: {
    totalCompleted: number;
    totalActivities: number;
    averageCompletionRate: number;
  };
}

interface HealthMetrics {
  calories: { value: number | null; target: number; unit: string; source: string | null };
  water: { value: number | null; target: number; unit: string; source: string | null };
  sleep: { value: string | null; target: string; quality: number | null; source: string | null };
  heartRate: { value: number | null; unit: string; resting: number | null; source: string | null };
  steps: { value: number | null; target: number; unit: string; source: string | null };
}

interface QuickLogModalState {
  isOpen: boolean;
  type: "workout" | "meal" | "mindfulness" | "sleep" | "water" | "weight" | null;
}

// Activity icons and colors
const activityIcons: Record<string, React.ReactNode> = {
  workout: <Dumbbell className="w-5 h-5" />,
  meal: <Utensils className="w-5 h-5" />,
  sleep_routine: <Moon className="w-5 h-5" />,
  mindfulness: <Brain className="w-5 h-5" />,
  habit: <Zap className="w-5 h-5" />,
  check_in: <Heart className="w-5 h-5" />,
  reflection: <Sparkles className="w-5 h-5" />,
  learning: <Target className="w-5 h-5" />,
};

const activityColors: Record<string, string> = {
  workout: "from-orange-500 to-red-500",
  meal: "from-green-500 to-emerald-500",
  sleep_routine: "from-indigo-500 to-purple-500",
  mindfulness: "from-cyan-500 to-blue-500",
  habit: "from-yellow-500 to-amber-500",
  check_in: "from-pink-500 to-rose-500",
  reflection: "from-violet-500 to-purple-500",
  learning: "from-blue-500 to-cyan-500",
};

const quickActions = [
  {
    type: "workout" as const,
    icon: <Dumbbell className="w-5 h-5" />,
    label: "Log Workout",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    type: "meal" as const,
    icon: <Utensils className="w-5 h-5" />,
    label: "Log Meal",
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    type: "mindfulness" as const,
    icon: <Brain className="w-5 h-5" />,
    label: "Mindfulness",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    type: "sleep" as const,
    icon: <Moon className="w-5 h-5" />,
    label: "Log Sleep",
    color: "from-indigo-500/20 to-purple-500/20",
  },
];

interface OverviewTabProps {
  plan: Plan | null;
  todayData: TodayData | null;
  weeklySummary: WeeklySummary | null;
  weekCompletionRate: number;
  onActivityComplete: (activityId: string) => void;
  onRefresh?: () => void;
}

export function OverviewTab({
  plan,
  todayData,
  weeklySummary,
  weekCompletionRate,
  onActivityComplete,
  onRefresh,
}: OverviewTabProps) {
  // State for dynamic data
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [weeklyActivity, setWeeklyActivity] = useState<WeeklyActivityData | null>(null);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<"current" | "last">("current");
  const [quickLogModal, setQuickLogModal] = useState<QuickLogModalState>({
    isOpen: false,
    type: null,
  });
  const [isLoggingQuickAction, setIsLoggingQuickAction] = useState(false);

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    try {
      const response = await api.get<DashboardStats>("/stats/dashboard");
      if (response.success && response.data) {
        setDashboardStats(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  }, []);

  // Fetch weekly activity data
  const fetchWeeklyActivity = useCallback(async (week: "current" | "last") => {
    try {
      const response = await api.get<WeeklyActivityData>("/stats/weekly-activity", {
        params: { week },
      });
      if (response.success && response.data) {
        setWeeklyActivity(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch weekly activity:", err);
    }
  }, []);

  // Fetch health metrics
  const fetchHealthMetrics = useCallback(async () => {
    try {
      const response = await api.get<{ metrics: HealthMetrics }>("/stats/health-metrics");
      if (response.success && response.data) {
        setHealthMetrics(response.data.metrics);
      }
    } catch (err) {
      console.error("Failed to fetch health metrics:", err);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    const fetchAll = async () => {
      setIsLoadingStats(true);
      await Promise.all([
        fetchDashboardStats(),
        fetchWeeklyActivity("current"),
        fetchHealthMetrics(),
      ]);
      setIsLoadingStats(false);
    };
    fetchAll();
  }, [fetchDashboardStats, fetchWeeklyActivity, fetchHealthMetrics]);

  // Refetch weekly activity when selection changes
  useEffect(() => {
    fetchWeeklyActivity(selectedWeek);
  }, [selectedWeek, fetchWeeklyActivity]);

  // Handle quick log
  const handleQuickLog = async (type: QuickLogModalState["type"], value?: number, duration?: number) => {
    if (!type) return;

    setIsLoggingQuickAction(true);
    try {
      await api.post("/stats/quick-log", {
        type,
        value,
        duration,
      });

      // Refresh data
      await Promise.all([fetchDashboardStats(), fetchHealthMetrics()]);

      setQuickLogModal({ isOpen: false, type: null });
    } catch (err) {
      console.error("Failed to log quick action:", err);
    } finally {
      setIsLoggingQuickAction(false);
    }
  };

  // Computed values
  const completedToday = todayData?.completedCount || 0;
  const totalToday = todayData?.totalCount || 0;
  const todayProgress = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  const currentStreak = dashboardStats?.streak.current || 0;
  const weekChange = dashboardStats?.weekProgress.change || 0;
  const effectiveWeekRate = dashboardStats?.weekProgress.rate ?? weekCompletionRate;

  // Health metrics with fallbacks
  const displayMetrics = useMemo(() => [
    {
      icon: <Flame className="w-4 h-4" />,
      label: "Calories",
      value: healthMetrics?.calories.value?.toLocaleString() || "—",
      target: healthMetrics?.calories.target?.toLocaleString() || "2,200",
      color: "text-orange-400",
      bg: "bg-orange-500/20",
      hasData: !!healthMetrics?.calories.value,
    },
    {
      icon: <Droplets className="w-4 h-4" />,
      label: "Water",
      value: healthMetrics?.water.value?.toString() || "—",
      target: `${healthMetrics?.water.target || 8} glasses`,
      color: "text-cyan-400",
      bg: "bg-cyan-500/20",
      hasData: !!healthMetrics?.water.value,
    },
    {
      icon: <Moon className="w-4 h-4" />,
      label: "Sleep",
      value: healthMetrics?.sleep.value || "—",
      target: healthMetrics?.sleep.target || "8h",
      color: "text-indigo-400",
      bg: "bg-indigo-500/20",
      hasData: !!healthMetrics?.sleep.value,
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: "Heart Rate",
      value: healthMetrics?.heartRate.value?.toString() || "—",
      target: "bpm",
      color: "text-rose-400",
      bg: "bg-rose-500/20",
      hasData: !!healthMetrics?.heartRate.value,
    },
    {
      icon: <Footprints className="w-4 h-4" />,
      label: "Steps",
      value: healthMetrics?.steps.value?.toLocaleString() || "—",
      target: healthMetrics?.steps.target?.toLocaleString() || "10,000",
      color: "text-emerald-400",
      bg: "bg-emerald-500/20",
      hasData: !!healthMetrics?.steps.value,
    },
  ], [healthMetrics]);

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Today's Progress */}
        <div className="col-span-2 lg:col-span-1 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Activity className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-xs text-slate-400">Today</span>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-3xl font-bold text-white">
                {completedToday}/{totalToday}
              </p>
              <p className="text-sm text-slate-400">Activities</p>
            </div>
            <div className="text-right">
              <span
                className={`text-lg font-semibold ${
                  todayProgress >= 70 ? "text-green-400" : todayProgress >= 40 ? "text-amber-400" : "text-slate-400"
                }`}
              >
                {Math.round(todayProgress)}%
              </span>
            </div>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${todayProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Week Progress */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
            {isLoadingStats ? (
              <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
            ) : (
              <div
                className={`flex items-center gap-1 text-xs ${
                  weekChange >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {weekChange >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {weekChange >= 0 ? "+" : ""}
                {weekChange}%
              </div>
            )}
          </div>
          <p className="text-3xl font-bold text-white">{effectiveWeekRate}%</p>
          <p className="text-sm text-slate-400">Week Progress</p>
        </div>

        {/* Current Streak */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-orange-500/20">
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            {currentStreak >= 7 && <Trophy className="w-4 h-4 text-amber-400" />}
          </div>
          {isLoadingStats ? (
            <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
          ) : (
            <>
              <p className="text-3xl font-bold text-white">{currentStreak}</p>
              <p className="text-sm text-slate-400">Day Streak</p>
            </>
          )}
        </div>

        {/* Plan Week */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Calendar className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">
            Week {plan?.currentWeek || 1}
          </p>
          <p className="text-sm text-slate-400">of {plan?.durationWeeks || 12}</p>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Today's Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Today's Schedule */}
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden">
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Today&apos;s Schedule
                    </h2>
                    <p className="text-sm text-slate-400">
                      {todayData?.dayOfWeek
                        ? todayData.dayOfWeek.charAt(0).toUpperCase() +
                          todayData.dayOfWeek.slice(1)
                        : new Date().toLocaleDateString("en-US", { weekday: "long" })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {onRefresh && (
                    <button
                      onClick={onRefresh}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  )}
                  <Link
                    href={plan ? `/plans/${plan.id}` : "#"}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {todayData?.activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`p-4 flex items-center gap-4 transition-colors ${
                    activity.status === "completed"
                      ? "bg-green-500/5"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="w-16 text-center">
                    <p className="text-sm font-medium text-slate-300">
                      {activity.preferredTime}
                    </p>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      activityColors[activity.type] || "from-slate-500 to-slate-600"
                    } flex items-center justify-center text-white shadow-lg`}
                  >
                    {activityIcons[activity.type] || <Activity className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-medium ${
                        activity.status === "completed"
                          ? "text-slate-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {activity.title}
                    </h3>
                    <p className="text-sm text-slate-500 truncate">
                      {activity.description}
                    </p>
                    {activity.duration && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-slate-500">
                        <Timer className="w-3 h-3" />
                        {activity.duration} min
                      </div>
                    )}
                  </div>

                  <div>
                    {activity.status === "completed" ? (
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                    ) : (
                      <button
                        onClick={() => onActivityComplete(activity.id)}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500/20 flex items-center justify-center transition-colors group"
                      >
                        <Circle className="w-5 h-5 text-slate-400 group-hover:text-green-400" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}

              {(!todayData?.activities || todayData.activities.length === 0) && (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center">
                    <Star className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400">No activities scheduled for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Weekly Overview Chart */}
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <h2 className="text-lg font-semibold text-white">Weekly Activity</h2>
              </div>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value as "current" | "last")}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none cursor-pointer hover:bg-white/10 transition-colors"
              >
                <option value="current">This Week</option>
                <option value="last">Last Week</option>
              </select>
            </div>

            <div className="flex items-end justify-between gap-2 h-40">
              {weeklyActivity?.days ? (
                weeklyActivity.days.map((day, i) => {
                  const height = day.total > 0 ? day.completionRate : 0;
                  return (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full h-32 flex items-end justify-center">
                        <motion.div
                          className={`w-full max-w-8 rounded-t-lg ${
                            day.isToday
                              ? "bg-gradient-to-t from-blue-500 to-purple-500"
                              : day.completionRate >= 70
                              ? "bg-gradient-to-t from-green-600 to-emerald-500"
                              : day.completionRate >= 40
                              ? "bg-gradient-to-t from-amber-600 to-amber-500"
                              : "bg-gradient-to-t from-slate-700 to-slate-600"
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: `${Math.max(height, 5)}%` }}
                          transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                        />
                        {day.total > 0 && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-500">
                            {day.completed}/{day.total}
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-xs ${
                          day.isToday ? "text-blue-400 font-medium" : "text-slate-500"
                        }`}
                      >
                        {day.day}
                      </span>
                    </div>
                  );
                })
              ) : (
                // Fallback skeleton
                ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full max-w-8 rounded-t-lg bg-slate-700/50"
                      initial={{ height: 0 }}
                      animate={{ height: "20%" }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                    />
                    <span className="text-xs text-slate-500">{day}</span>
                  </div>
                ))
              )}
            </div>

            {weeklyActivity?.summary && (
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-sm">
                <span className="text-slate-400">Week Average</span>
                <span className="text-white font-medium">
                  {weeklyActivity.summary.averageCompletionRate}%
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Current Plan Card */}
          {plan && (
            <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 backdrop-blur-sm p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/10">
                  <Target className="w-5 h-5 text-purple-400" />
                </div>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                  Active
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {plan.description}
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="6"
                      className="text-white/10"
                    />
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={176}
                      initial={{ strokeDashoffset: 176 }}
                      animate={{
                        strokeDashoffset: 176 - (176 * plan.overallProgress) / 100,
                      }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient
                        id="progressGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {plan.overallProgress}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Overall Progress</p>
                  <p className="text-white font-medium">
                    {Math.round((plan.currentWeek / plan.durationWeeks) * 100)}%
                    Complete
                  </p>
                </div>
              </div>

              <Link
                href={`/plans/${plan.id}`}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                View Plan Details
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Weekly Focus */}
          {weeklySummary?.focus && (
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-white">This Week&apos;s Focus</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <p className="text-sm font-medium text-amber-400">
                    {weeklySummary.focus.theme}
                  </p>
                </div>
                <p className="text-sm text-slate-400">{weeklySummary.focus.focus}</p>
                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs text-slate-500">Expected Outcome:</p>
                  <p className="text-sm text-slate-300">
                    {weeklySummary.focus.expectedOutcome}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Health Metrics */}
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Health Metrics</h3>
              {isLoadingStats && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
            </div>

            <div className="space-y-4">
              {displayMetrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${metric.bg}`}>
                    <span className={metric.color}>{metric.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-400">{metric.label}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${metric.hasData ? "text-white" : "text-slate-500"}`}>
                      {metric.value}
                    </p>
                    <p className="text-xs text-slate-500">{metric.target}</p>
                  </div>
                </div>
              ))}
            </div>

            {!healthMetrics && !isLoadingStats && (
              <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <p className="text-xs text-slate-400 text-center">
                  Connect integrations or log data to see your health metrics
                </p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
            <h3 className="font-semibold text-white mb-4">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.type}
                  onClick={() => handleQuickLog(action.type)}
                  disabled={isLoggingQuickAction}
                  className={`p-4 rounded-xl bg-gradient-to-br ${action.color} border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoggingQuickAction ? (
                    <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
                  ) : (
                    <span className="text-slate-300">{action.icon}</span>
                  )}
                  <span className="text-xs text-slate-400">{action.label}</span>
                </button>
              ))}
            </div>

            {/* Extra quick actions */}
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleQuickLog("water", 1)}
                disabled={isLoggingQuickAction}
                className="flex-1 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-cyan-400">+1 Glass Water</span>
              </button>
              <button
                onClick={() => handleQuickLog("weight")}
                disabled={isLoggingQuickAction}
                className="flex-1 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Scale className="w-4 h-4 text-purple-400" />
                <span className="text-xs text-purple-400">Log Weight</span>
              </button>
            </div>
          </div>

          {/* Stats Summary */}
          {dashboardStats && (
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-white">Your Stats</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Activities</span>
                  <span className="text-white font-medium">
                    {dashboardStats.summary.totalActivitiesCompleted}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Active Goals</span>
                  <span className="text-white font-medium">
                    {dashboardStats.summary.activeGoals}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Longest Streak</span>
                  <span className="text-white font-medium">
                    {dashboardStats.streak.longest} days
                  </span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
