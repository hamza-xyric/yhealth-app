"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Activity,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  ChevronRight,
  Flame,
  Droplets,
  Moon,
  Heart,
  Brain,
  Dumbbell,
  Utensils,
  Sparkles,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Play,
  Pause,
  MoreHorizontal,
  Bell,
  Zap,
  Trophy,
  Star,
  Timer,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";

// Types
interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  targetValue?: number;
  targetUnit?: string;
  preferredTime: string;
  duration?: number;
  status: "pending" | "completed" | "skipped";
  log?: {
    status: string;
    completedAt?: string;
  };
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
  activities: Activity[];
  weeklyFocuses: Array<{
    week: number;
    theme: string;
    focus: string;
    expectedOutcome: string;
  }>;
}

interface TodayData {
  planId: string;
  date: string;
  dayOfWeek: string;
  activities: Activity[];
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

// Activity Icon mapping
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

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [todayData, setTodayData] = useState<TodayData | null>(null);
  const [weeklySummary, setWeeklySummary] = useState<WeeklySummary | null>(null);
  const [weekCompletionRate, setWeekCompletionRate] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin?callbackUrl=/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch active plan
      const planResponse = await api.get<{
        plan: Plan;
        todayActivities: Activity[];
        weekCompletionRate: number;
      }>("/plans/active");

      if (planResponse.success && planResponse.data) {
        setPlan(planResponse.data.plan);
        setWeekCompletionRate(planResponse.data.weekCompletionRate);
      }

      // Fetch today's activities
      const todayResponse = await api.get<TodayData>("/plans/today");
      if (todayResponse.success && todayResponse.data) {
        setTodayData(todayResponse.data);
      }

      // Fetch weekly summary if we have a plan
      if (planResponse.data?.plan?.id) {
        const summaryResponse = await api.get<WeeklySummary>(
          `/plans/${planResponse.data.plan.id}/summary/weekly`
        );
        if (summaryResponse.success && summaryResponse.data) {
          setWeeklySummary(summaryResponse.data);
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "NOT_FOUND") {
          // No active plan - redirect to onboarding
          setError("no_plan");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to load dashboard data");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated, fetchDashboardData]);

  // Log activity completion
  const handleActivityComplete = async (activityId: string) => {
    if (!plan) return;

    try {
      await api.post(`/plans/${plan.id}/activities/${activityId}/log`, {
        status: "completed",
        scheduledDate: new Date().toISOString(),
      });

      // Refresh data
      fetchDashboardData();
    } catch (err) {
      console.error("Failed to log activity:", err);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <motion.div
              className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <p className="text-slate-400">Loading your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error === "no_plan") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Let&apos;s Get Started!
          </h1>
          <p className="text-slate-400 mb-8">
            Complete your onboarding to get a personalized health plan tailored
            just for you.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Start Onboarding
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-red-500/20 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Something went wrong
          </h1>
          <p className="text-slate-400 mb-8">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  const completedToday = todayData?.completedCount || 0;
  const totalToday = todayData?.totalCount || 0;
  const todayProgress = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {greeting},{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {user?.firstName || "there"}
                </span>
              </h1>
              <p className="text-slate-400 mt-1">
                {currentTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={fetchDashboardData}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
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
                    todayProgress >= 70 ? "text-green-400" : "text-amber-400"
                  }`}
                >
                  {Math.round(todayProgress)}%
                </span>
              </div>
            </div>
            {/* Progress bar */}
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
              <div className="flex items-center gap-1 text-emerald-400 text-xs">
                <ArrowUpRight className="w-3 h-3" />
                +12%
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{weekCompletionRate}%</p>
            <p className="text-sm text-slate-400">Week Progress</p>
          </div>

          {/* Current Streak */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-orange-500/20">
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <Trophy className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-bold text-white">7</p>
            <p className="text-sm text-slate-400">Day Streak</p>
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
            <p className="text-sm text-slate-400">
              of {plan?.durationWeeks || 12}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Today's Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
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
                          : ""}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={plan ? `/plans/${plan.id}` : "#"}
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {todayData?.activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className={`p-4 flex items-center gap-4 transition-colors ${
                      activity.status === "completed"
                        ? "bg-green-500/5"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {/* Time */}
                    <div className="w-16 text-center">
                      <p className="text-sm font-medium text-slate-300">
                        {activity.preferredTime}
                      </p>
                    </div>

                    {/* Activity Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                        activityColors[activity.type] ||
                        "from-slate-500 to-slate-600"
                      } flex items-center justify-center text-white shadow-lg`}
                    >
                      {activityIcons[activity.type] || (
                        <Activity className="w-5 h-5" />
                      )}
                    </div>

                    {/* Activity Info */}
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

                    {/* Status/Action */}
                    <div>
                      {activity.status === "completed" ? (
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                      ) : (
                        <button
                          onClick={() => handleActivityComplete(activity.id)}
                          className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500/20 flex items-center justify-center transition-colors group"
                        >
                          <Circle className="w-5 h-5 text-slate-400 group-hover:text-green-400" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                {(!todayData?.activities ||
                  todayData.activities.length === 0) && (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center">
                      <Star className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-400">
                      No activities scheduled for today
                    </p>
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
                  <h2 className="text-lg font-semibold text-white">
                    Weekly Activity
                  </h2>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none">
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>

              {/* Simple bar chart */}
              <div className="flex items-end justify-between gap-2 h-40">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day, i) => {
                    const height = [65, 80, 45, 90, 70, 55, 85][i];
                    const isToday = i === new Date().getDay() - 1;
                    return (
                      <div
                        key={day}
                        className="flex-1 flex flex-col items-center gap-2"
                      >
                        <motion.div
                          className={`w-full rounded-t-lg ${
                            isToday
                              ? "bg-gradient-to-t from-blue-500 to-purple-500"
                              : "bg-gradient-to-t from-slate-700 to-slate-600"
                          }`}
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                        <span
                          className={`text-xs ${
                            isToday ? "text-blue-400 font-medium" : "text-slate-500"
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
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

                <h3 className="text-lg font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                  {plan.description}
                </p>

                {/* Progress Ring */}
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
                          strokeDashoffset:
                            176 - (176 * plan.overallProgress) / 100,
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
                      {Math.round(
                        (plan.currentWeek / plan.durationWeeks) * 100
                      )}
                      % Complete
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
                  <h3 className="font-semibold text-white">
                    This Week&apos;s Focus
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm font-medium text-amber-400">
                      {weeklySummary.focus.theme}
                    </p>
                  </div>
                  <p className="text-sm text-slate-400">
                    {weeklySummary.focus.focus}
                  </p>
                  <div className="pt-2 border-t border-white/5">
                    <p className="text-xs text-slate-500">Expected Outcome:</p>
                    <p className="text-sm text-slate-300">
                      {weeklySummary.focus.expectedOutcome}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
              <h3 className="font-semibold text-white mb-4">Health Metrics</h3>

              <div className="space-y-4">
                {[
                  {
                    icon: <Flame className="w-4 h-4" />,
                    label: "Calories",
                    value: "1,847",
                    target: "2,200",
                    color: "text-orange-400",
                    bg: "bg-orange-500/20",
                  },
                  {
                    icon: <Droplets className="w-4 h-4" />,
                    label: "Water",
                    value: "6",
                    target: "8 glasses",
                    color: "text-cyan-400",
                    bg: "bg-cyan-500/20",
                  },
                  {
                    icon: <Moon className="w-4 h-4" />,
                    label: "Sleep",
                    value: "7.5h",
                    target: "8h",
                    color: "text-indigo-400",
                    bg: "bg-indigo-500/20",
                  },
                  {
                    icon: <Heart className="w-4 h-4" />,
                    label: "Heart Rate",
                    value: "72",
                    target: "bpm",
                    color: "text-rose-400",
                    bg: "bg-rose-500/20",
                  },
                ].map((metric, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${metric.bg}`}>
                      <span className={metric.color}>{metric.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-400">{metric.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{metric.value}</p>
                      <p className="text-xs text-slate-500">{metric.target}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5">
              <h3 className="font-semibold text-white mb-4">Quick Actions</h3>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <Dumbbell className="w-5 h-5" />,
                    label: "Log Workout",
                    color: "from-orange-500/20 to-red-500/20",
                  },
                  {
                    icon: <Utensils className="w-5 h-5" />,
                    label: "Log Meal",
                    color: "from-green-500/20 to-emerald-500/20",
                  },
                  {
                    icon: <Brain className="w-5 h-5" />,
                    label: "Mindfulness",
                    color: "from-cyan-500/20 to-blue-500/20",
                  },
                  {
                    icon: <Moon className="w-5 h-5" />,
                    label: "Log Sleep",
                    color: "from-indigo-500/20 to-purple-500/20",
                  },
                ].map((action, i) => (
                  <button
                    key={i}
                    className={`p-4 rounded-xl bg-gradient-to-br ${action.color} border border-white/10 hover:border-white/20 transition-colors flex flex-col items-center gap-2`}
                  >
                    <span className="text-slate-300">{action.icon}</span>
                    <span className="text-xs text-slate-400">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
