"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  Target,
  Plus,
  ChevronRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Circle,
  Flame,
  Dumbbell,
  Moon,
  Brain,
  Heart,
  Utensils,
  Zap,
  Star,
  Trophy,
  Clock,
  BarChart3,
  Edit3,
  Trash2,
  MoreVertical,
  Loader2,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api-client";

// Types
interface Goal {
  id: string;
  category: string;
  pillar: string;
  title: string;
  description: string;
  targetValue: number;
  targetUnit: string;
  currentValue?: number;
  startDate: string;
  targetDate: string;
  durationWeeks: number;
  status: string;
  isPrimary: boolean;
  progress: number;
  milestones?: Array<{
    id: string;
    title: string;
    targetValue: number;
    completed: boolean;
    completedAt?: string;
  }>;
}

interface Plan {
  id: string;
  name: string;
  goalId: string;
  status: string;
  overallProgress: number;
  currentWeek: number;
  durationWeeks: number;
}

// Goal category icons and colors
const goalCategoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  weight_loss: {
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
  },
  muscle_building: {
    icon: <Dumbbell className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "from-orange-500/20 to-red-500/20",
  },
  sleep_improvement: {
    icon: <Moon className="w-5 h-5" />,
    color: "text-indigo-400",
    bgColor: "from-indigo-500/20 to-purple-500/20",
  },
  stress_wellness: {
    icon: <Brain className="w-5 h-5" />,
    color: "text-cyan-400",
    bgColor: "from-cyan-500/20 to-teal-500/20",
  },
  energy_productivity: {
    icon: <Zap className="w-5 h-5" />,
    color: "text-yellow-400",
    bgColor: "from-yellow-500/20 to-amber-500/20",
  },
  event_training: {
    icon: <Trophy className="w-5 h-5" />,
    color: "text-amber-400",
    bgColor: "from-amber-500/20 to-orange-500/20",
  },
  health_condition: {
    icon: <Heart className="w-5 h-5" />,
    color: "text-rose-400",
    bgColor: "from-rose-500/20 to-pink-500/20",
  },
  habit_building: {
    icon: <Flame className="w-5 h-5" />,
    color: "text-emerald-400",
    bgColor: "from-emerald-500/20 to-green-500/20",
  },
  overall_optimization: {
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-purple-400",
    bgColor: "from-purple-500/20 to-pink-500/20",
  },
  custom: {
    icon: <Target className="w-5 h-5" />,
    color: "text-slate-400",
    bgColor: "from-slate-500/20 to-slate-600/20",
  },
};

export default function GoalsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "all">(
    "active"
  );

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/signin?callbackUrl=/goals");
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch goals data
  const fetchGoals = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fetch goals from assessment endpoint
      const goalsResponse = await api.get<{ goals: Goal[] }>(
        "/assessment/goals"
      );
      if (goalsResponse.success && goalsResponse.data) {
        setGoals(goalsResponse.data.goals || []);
      }

      // Fetch plans
      const plansResponse = await api.get<{ plans: Plan[] }>("/plans");
      if (plansResponse.success && plansResponse.data) {
        setPlans(plansResponse.data.plans || []);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.code !== "NOT_FOUND") {
          setError(err.message);
        }
      } else {
        setError("Failed to load goals");
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchGoals();
    }
  }, [isAuthenticated, fetchGoals]);

  // Filter goals based on active tab
  const filteredGoals = goals.filter((goal) => {
    if (activeTab === "active") return goal.status === "active";
    if (activeTab === "completed") return goal.status === "completed";
    return true;
  });

  // Get plan for a goal
  const getPlanForGoal = (goalId: string) =>
    plans.find((p) => p.goalId === goalId);

  // Calculate overall stats
  const stats = {
    total: goals.length,
    active: goals.filter((g) => g.status === "active").length,
    completed: goals.filter((g) => g.status === "completed").length,
    avgProgress: Math.round(
      goals.reduce((acc, g) => acc + (g.progress || 0), 0) / (goals.length || 1)
    ),
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>
          <p className="text-slate-400">Loading your goals...</p>
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
            onClick={fetchGoals}
            className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 transition-colors"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                My{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Goals
                </span>
              </h1>
              <p className="text-slate-400 mt-1">
                Track and manage your health objectives
              </p>
            </div>

            <Link
              href="/onboarding"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
              New Goal
            </Link>
          </div>
        </motion.header>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
            <p className="text-sm text-slate-400">Total Goals</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-emerald-500/20">
                <Flame className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats.active}</p>
            <p className="text-sm text-slate-400">Active</p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <CheckCircle2 className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats.completed}</p>
            <p className="text-sm text-slate-400">Completed</p>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-xs">
                <ArrowUpRight className="w-3 h-3" />
                +5%
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stats.avgProgress}%</p>
            <p className="text-sm text-slate-400">Avg Progress</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl w-fit"
        >
          {[
            { id: "active", label: "Active" },
            { id: "completed", label: "Completed" },
            { id: "all", label: "All" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-white/10 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Goals List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {filteredGoals.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-800 flex items-center justify-center">
                <Target className="w-10 h-10 text-slate-600" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">
                No goals yet
              </h2>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                {activeTab === "active"
                  ? "You don't have any active goals. Start your health journey by creating one!"
                  : activeTab === "completed"
                  ? "You haven't completed any goals yet. Keep working on your active goals!"
                  : "Create your first goal to start tracking your health progress."}
              </p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                <Plus className="w-5 h-5" />
                Create Goal
              </Link>
            </div>
          ) : (
            filteredGoals.map((goal, index) => {
              const config = goalCategoryConfig[goal.category] ||
                goalCategoryConfig.custom;
              const plan = getPlanForGoal(goal.id);
              const daysRemaining = Math.ceil(
                (new Date(goal.targetDate).getTime() - Date.now()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="group"
                >
                  <div
                    className={`p-6 rounded-2xl bg-gradient-to-br ${config.bgColor} border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Goal Icon & Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div
                          className={`w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center ${config.color}`}
                        >
                          {config.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-white truncate">
                              {goal.title}
                            </h3>
                            {goal.isPrimary && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-1 mb-3">
                            {goal.description}
                          </p>

                          {/* Target & Timeline */}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Target className="w-4 h-4 text-slate-500" />
                              <span>
                                {goal.targetValue} {goal.targetUnit}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300">
                              <Calendar className="w-4 h-4 text-slate-500" />
                              <span>{goal.durationWeeks} weeks</span>
                            </div>
                            <div
                              className={`flex items-center gap-1.5 ${
                                daysRemaining < 7
                                  ? "text-amber-400"
                                  : "text-slate-300"
                              }`}
                            >
                              <Clock className="w-4 h-4" />
                              <span>
                                {daysRemaining > 0
                                  ? `${daysRemaining} days left`
                                  : "Overdue"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="lg:w-48">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-400">
                            Progress
                          </span>
                          <span className="text-sm font-semibold text-white">
                            {goal.progress || 0}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${
                              goal.status === "completed"
                                ? "from-green-500 to-emerald-500"
                                : "from-cyan-500 to-blue-500"
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress || 0}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>

                        {/* Plan Link */}
                        {plan && (
                          <Link
                            href={`/plans/${plan.id}`}
                            className="mt-3 flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                          >
                            View Plan
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {goal.status === "completed" ? (
                          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          </div>
                        ) : (
                          <>
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Milestones */}
                    {goal.milestones && goal.milestones.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/10">
                        <h4 className="text-sm font-medium text-slate-300 mb-3">
                          Milestones
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {goal.milestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                                milestone.completed
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-white/5 text-slate-400"
                              }`}
                            >
                              {milestone.completed ? (
                                <CheckCircle2 className="w-3 h-3" />
                              ) : (
                                <Circle className="w-3 h-3" />
                              )}
                              {milestone.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </motion.div>

        {/* Achievement Section */}
        {stats.completed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex items-center gap-2 mb-6">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-semibold text-white">Achievements</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Star className="w-6 h-6" />,
                  title: "First Goal",
                  desc: "Completed your first goal",
                  unlocked: true,
                },
                {
                  icon: <Flame className="w-6 h-6" />,
                  title: "On Fire",
                  desc: "7 day streak",
                  unlocked: true,
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Goal Crusher",
                  desc: "Complete 5 goals",
                  unlocked: stats.completed >= 5,
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Consistent",
                  desc: "30 day streak",
                  unlocked: false,
                },
              ].map((achievement, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border ${
                    achievement.unlocked
                      ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/30"
                      : "bg-white/5 border-white/10 opacity-50"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                      achievement.unlocked
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-slate-800 text-slate-600"
                    }`}
                  >
                    {achievement.icon}
                  </div>
                  <h3 className="font-medium text-white mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-xs text-slate-400">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
