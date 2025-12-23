"use client";

import { motion } from "framer-motion";
import { Suspense, useEffect, useState, useCallback } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  RefreshCw,
  MoreVertical,
  Dumbbell,
  Utensils,
  Moon,
  Brain,
  Zap,
  Heart,
  Sparkles,
  Trophy,
  Flame,
  Timer,
  BarChart3,
  Star,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";
import { MainLayout } from "@/components/layout";
import { useAuth } from "@/app/context/AuthContext";

// Types
interface PlanActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  targetValue?: number;
  targetUnit?: string;
  preferredTime: string;
  duration?: number;
  dayOfWeek: string[];
  status?: "pending" | "completed" | "skipped";
}

interface WeeklyFocus {
  week: number;
  theme: string;
  focus: string;
  expectedOutcome: string;
}

interface Plan {
  id: string;
  userId: string;
  goalId: string;
  name: string;
  description: string;
  pillar: string;
  goalCategory: string;
  startDate: string;
  endDate: string;
  durationWeeks: number;
  currentWeek: number;
  status: string;
  pausedAt?: string;
  resumedAt?: string;
  completedAt?: string;
  activities: PlanActivity[];
  weeklyFocuses: WeeklyFocus[];
  aiGenerated: boolean;
  overallProgress: number;
  weeklyCompletionRates?: number[];
  userRating?: number;
  userFeedback?: string;
  createdAt: string;
  updatedAt: string;
}

// Activity icon and color mapping
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

const pillarColors: Record<string, string> = {
  fitness: "from-orange-500 to-red-500",
  nutrition: "from-green-500 to-emerald-500",
  sleep: "from-indigo-500 to-purple-500",
  mental_wellness: "from-cyan-500 to-blue-500",
  energy: "from-yellow-500 to-amber-500",
};

function PlanDetailContent() {
  const { id } = useParams();
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);

  const fetchPlan = useCallback(async () => {
    if (!id) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{ plan: Plan }>(`/plans/${id}`);
      if (response.success && response.data) {
        setPlan(response.data.plan);
        // Auto-expand current week
        if (response.data.plan.currentWeek) {
          setExpandedWeeks([response.data.plan.currentWeek]);
        }
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code === "NOT_FOUND") {
          setError("Plan not found");
        } else {
          setError(err.message);
        }
      } else {
        setError("Failed to load plan");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin?callbackUrl=/dashboard");
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchPlan();
    }
  }, [isAuthenticated, id, fetchPlan]);

  const toggleWeek = (week: number) => {
    setExpandedWeeks((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]
    );
  };

  const handlePausePlan = async () => {
    if (!plan) return;

    try {
      await api.patch(`/plans/${plan.id}`, {
        status: plan.status === "paused" ? "active" : "paused",
      });
      fetchPlan();
    } catch (err) {
      console.error("Failed to update plan status:", err);
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
          <p className="text-slate-400">Loading plan...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{error}</h1>
            <p className="text-slate-400 mb-8">
              The plan you&apos;re looking for doesn&apos;t exist or you don&apos;t have access to it.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  if (!plan) return null;

  const pillarColor = pillarColors[plan.pillar] || "from-blue-500 to-purple-500";
  const weeksCompleted = plan.currentWeek;
  const progressPercent = Math.round((weeksCompleted / plan.durationWeeks) * 100);

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-950">
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => router.back()}
              className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm">Back</span>
            </button>
          </motion.div>

          {/* Plan Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillarColor} flex items-center justify-center text-white shadow-lg`}
                >
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      {plan.name}
                    </h1>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        plan.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : plan.status === "paused"
                          ? "bg-amber-500/20 text-amber-400"
                          : plan.status === "completed"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-slate-500/20 text-slate-400"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>
                  <p className="text-slate-400 max-w-xl">{plan.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePausePlan}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title={plan.status === "paused" ? "Resume Plan" : "Pause Plan"}
                >
                  {plan.status === "paused" ? (
                    <Play className="w-5 h-5" />
                  ) : (
                    <Pause className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={fetchPlan}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Refresh"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Overall Progress</span>
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-2xl font-bold text-white">{plan.overallProgress}%</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Current Week</span>
                  <Calendar className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {plan.currentWeek}/{plan.durationWeeks}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Activities</span>
                  <Activity className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white">{plan.activities.length}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">Duration</span>
                  <Clock className="w-4 h-4 text-purple-400" />
                </div>
                <p className="text-2xl font-bold text-white">{plan.durationWeeks} weeks</p>
              </div>
            </div>
          </motion.div>

          {/* Timeline Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Plan Timeline</h2>
            <div className="relative">
              <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${pillarColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>
                  {new Date(plan.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>
                  {new Date(plan.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Weekly Focuses */}
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">Weekly Plan</h2>
                </div>

                <div className="divide-y divide-white/5">
                  {plan.weeklyFocuses.map((weekFocus) => {
                    const isCurrentWeek = weekFocus.week === plan.currentWeek;
                    const isPastWeek = weekFocus.week < plan.currentWeek;
                    const isExpanded = expandedWeeks.includes(weekFocus.week);

                    return (
                      <div key={weekFocus.week}>
                        <button
                          onClick={() => toggleWeek(weekFocus.week)}
                          className={`w-full p-4 flex items-center gap-4 text-left transition-colors ${
                            isCurrentWeek
                              ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                              : "hover:bg-white/5"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                              isPastWeek
                                ? "bg-green-500/20"
                                : isCurrentWeek
                                ? "bg-blue-500/20"
                                : "bg-white/5"
                            }`}
                          >
                            {isPastWeek ? (
                              <CheckCircle2 className="w-5 h-5 text-green-400" />
                            ) : (
                              <span
                                className={`text-sm font-bold ${
                                  isCurrentWeek ? "text-blue-400" : "text-slate-500"
                                }`}
                              >
                                {weekFocus.week}
                              </span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">
                                Week {weekFocus.week}: {weekFocus.theme}
                              </h3>
                              {isCurrentWeek && (
                                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-400 truncate">
                              {weekFocus.focus}
                            </p>
                          </div>

                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 pb-4"
                          >
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 ml-14">
                              <p className="text-sm text-slate-300 mb-3">
                                {weekFocus.focus}
                              </p>
                              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                <p className="text-xs text-slate-500 mb-1">
                                  Expected Outcome
                                </p>
                                <p className="text-sm text-amber-400">
                                  {weekFocus.expectedOutcome}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activities */}
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <div className="p-5 border-b border-white/10">
                  <h2 className="text-lg font-semibold text-white">Plan Activities</h2>
                  <p className="text-sm text-slate-400">
                    Your daily and weekly activities
                  </p>
                </div>

                <div className="divide-y divide-white/5">
                  {plan.activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                          activityColors[activity.type] || "from-slate-500 to-slate-600"
                        } flex items-center justify-center text-white shadow-lg`}
                      >
                        {activityIcons[activity.type] || (
                          <Activity className="w-5 h-5" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white">{activity.title}</h3>
                        <p className="text-sm text-slate-400 truncate">
                          {activity.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {activity.preferredTime}
                          </span>
                          {activity.duration && (
                            <span className="flex items-center gap-1">
                              <Timer className="w-3 h-3" />
                              {activity.duration} min
                            </span>
                          )}
                          {activity.dayOfWeek && activity.dayOfWeek.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {activity.dayOfWeek.length === 7
                                ? "Daily"
                                : activity.dayOfWeek.slice(0, 3).join(", ")}
                              {activity.dayOfWeek.length > 3 &&
                                activity.dayOfWeek.length < 7 &&
                                "..."}
                            </span>
                          )}
                        </div>
                      </div>

                      {activity.targetValue && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">
                            {activity.targetValue}
                          </p>
                          <p className="text-xs text-slate-500">
                            {activity.targetUnit}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
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
              {/* Current Week Focus */}
              {plan.weeklyFocuses[plan.currentWeek - 1] && (
                <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="font-semibold text-white">This Week&apos;s Focus</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <p className="text-sm font-medium text-amber-400">
                        {plan.weeklyFocuses[plan.currentWeek - 1].theme}
                      </p>
                    </div>
                    <p className="text-sm text-slate-400">
                      {plan.weeklyFocuses[plan.currentWeek - 1].focus}
                    </p>
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-slate-500">Expected Outcome:</p>
                      <p className="text-sm text-slate-300">
                        {plan.weeklyFocuses[plan.currentWeek - 1].expectedOutcome}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Plan Details */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <h3 className="font-semibold text-white mb-4">Plan Details</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pillar</span>
                    <span className="text-white capitalize">
                      {plan.pillar.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white capitalize">
                      {plan.goalCategory.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Start Date</span>
                    <span className="text-white">
                      {new Date(plan.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">End Date</span>
                    <span className="text-white">
                      {new Date(plan.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">AI Generated</span>
                    <span className="text-white">{plan.aiGenerated ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                <h3 className="font-semibold text-white mb-4">Quick Actions</h3>

                <div className="space-y-3">
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-slate-300">View Dashboard</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link
                    href="/dashboard?tab=goals"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-slate-300">View Goals</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                  <Link
                    href="/dashboard?tab=activity"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-slate-300">Activity History</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                </div>
              </div>

              {/* User Rating */}
              {plan.userRating && (
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <h3 className="font-semibold text-white mb-4">Your Rating</h3>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 ${
                          star <= plan.userRating!
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600"
                        }`}
                      />
                    ))}
                  </div>
                  {plan.userFeedback && (
                    <p className="mt-3 text-sm text-slate-400">{plan.userFeedback}</p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Loading fallback
function PlanLoading() {
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
        <p className="text-slate-400">Loading plan...</p>
      </motion.div>
    </div>
  );
}

// Main export with Suspense
export default function PlanDetailPage() {
  return (
    <Suspense fallback={<PlanLoading />}>
      <PlanDetailContent />
    </Suspense>
  );
}
