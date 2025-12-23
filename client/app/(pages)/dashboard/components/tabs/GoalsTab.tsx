"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Target,
  Plus,
  ChevronRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Dumbbell,
  Moon,
  Brain,
  Utensils,
  Zap,
  Star,
  Trophy,
  Clock,
  Edit3,
  Trash2,
  MoreVertical,
  Loader2,
  AlertCircle,
  Heart,
  X,
  Check,
  Search,
  Filter,
  Sparkles,
  CheckSquare,
  Square,
  AlertTriangle,
  Save,
  RotateCcw,
  Flame,
  Award,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
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
  motivation?: string;
  milestones?: Array<{
    id: string;
    title: string;
    targetValue: number;
    completed: boolean;
    completedAt?: string;
  }>;
}

interface EditingGoal {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  targetDate: string;
  status: string;
}

// Goal category config
const goalCategoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; bgColor: string; gradient: string }
> = {
  weight_loss: {
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-blue-400",
    bgColor: "from-blue-500/20 to-cyan-500/20",
    gradient: "from-blue-500 to-cyan-500",
  },
  muscle_building: {
    icon: <Dumbbell className="w-5 h-5" />,
    color: "text-orange-400",
    bgColor: "from-orange-500/20 to-red-500/20",
    gradient: "from-orange-500 to-red-500",
  },
  sleep_improvement: {
    icon: <Moon className="w-5 h-5" />,
    color: "text-indigo-400",
    bgColor: "from-indigo-500/20 to-purple-500/20",
    gradient: "from-indigo-500 to-purple-500",
  },
  stress_wellness: {
    icon: <Brain className="w-5 h-5" />,
    color: "text-cyan-400",
    bgColor: "from-cyan-500/20 to-teal-500/20",
    gradient: "from-cyan-500 to-teal-500",
  },
  energy_productivity: {
    icon: <Zap className="w-5 h-5" />,
    color: "text-yellow-400",
    bgColor: "from-yellow-500/20 to-amber-500/20",
    gradient: "from-yellow-500 to-amber-500",
  },
  nutrition: {
    icon: <Utensils className="w-5 h-5" />,
    color: "text-green-400",
    bgColor: "from-green-500/20 to-emerald-500/20",
    gradient: "from-green-500 to-emerald-500",
  },
  fitness: {
    icon: <Heart className="w-5 h-5" />,
    color: "text-rose-400",
    bgColor: "from-rose-500/20 to-pink-500/20",
    gradient: "from-rose-500 to-pink-500",
  },
  habit_building: {
    icon: <Flame className="w-5 h-5" />,
    color: "text-amber-400",
    bgColor: "from-amber-500/20 to-orange-500/20",
    gradient: "from-amber-500 to-orange-500",
  },
  overall_optimization: {
    icon: <Sparkles className="w-5 h-5" />,
    color: "text-violet-400",
    bgColor: "from-violet-500/20 to-purple-500/20",
    gradient: "from-violet-500 to-purple-500",
  },
};

// Animated pulse ring component
const PulseRing = ({ color }: { color: string }) => (
  <motion.div
    className={`absolute inset-0 rounded-full ${color} opacity-30`}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0, 0.3],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated icon wrapper
const AnimatedIcon = ({ children, isAnimating }: { children: React.ReactNode; isAnimating: boolean }) => (
  <motion.div
    animate={isAnimating ? {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
    } : {}}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

// Confirmation Modal
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  isLoading = false,
  count = 1,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  isLoading?: boolean;
  count?: number;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400">{message}</p>
            </div>
          </div>

          {count > 1 && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-300">
                <strong>{count}</strong> goals will be permanently deleted.
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Edit Modal
const EditModal = ({
  isOpen,
  onClose,
  onSave,
  goal,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditingGoal) => void;
  goal: Goal | null;
  isLoading: boolean;
}) => {
  const [editData, setEditData] = useState<EditingGoal | null>(null);

  useEffect(() => {
    if (goal) {
      setEditData({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        targetValue: goal.targetValue,
        targetDate: goal.targetDate.split('T')[0],
        status: goal.status,
      });
    }
  }, [goal]);

  if (!editData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                  <Edit3 className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Edit Goal</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  placeholder="Goal title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
                  placeholder="Describe your goal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target Value</label>
                  <input
                    type="number"
                    value={editData.targetValue}
                    onChange={(e) => setEditData({ ...editData, targetValue: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Target Date</label>
                  <input
                    type="date"
                    value={editData.targetDate}
                    onChange={(e) => setEditData({ ...editData, targetDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {['active', 'paused', 'completed', 'abandoned'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setEditData({ ...editData, status })}
                      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        editData.status === status
                          ? status === 'active'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : status === 'paused'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : status === 'completed'
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => onSave(editData)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Empty State Component
const EmptyState = ({ filter }: { filter: string }) => {
  const getContent = () => {
    switch (filter) {
      case 'active':
        return {
          icon: <Zap className="w-12 h-12" />,
          title: "No Active Goals",
          description: "Start your journey by creating a new goal or activating an existing one.",
        };
      case 'completed':
        return {
          icon: <Trophy className="w-12 h-12" />,
          title: "No Completed Goals Yet",
          description: "Keep working on your goals! Your achievements will appear here.",
        };
      default:
        return {
          icon: <Target className="w-12 h-12" />,
          title: "No Goals Yet",
          description: "Start your health journey by creating your first goal.",
        };
    }
  };

  const content = getContent();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
        className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center relative overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="text-slate-500 relative z-10">
          {content.icon}
        </div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-white mb-2"
      >
        {content.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-slate-400 mb-6 max-w-sm mx-auto"
      >
        {content.description}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Link
          href="/goals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
        >
          <Plus className="w-5 h-5" />
          Create Goal
        </Link>
      </motion.div>
    </motion.div>
  );
};

export function GoalsTab() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "paused">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [actionMenu, setActionMenu] = useState<string | null>(null);

  const fetchGoals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{ goals: Goal[] }>("/assessment/goals");
      if (response.success && response.data) {
        setGoals(response.data.goals || []);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Failed to load goals");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  // Filter and search goals
  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      const matchesFilter = filter === "all" || goal.status === filter;
      const matchesSearch = !searchQuery ||
        goal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [goals, filter, searchQuery]);

  // Stats calculations
  const stats = useMemo(() => ({
    total: goals.length,
    active: goals.filter((g) => g.status === "active").length,
    completed: goals.filter((g) => g.status === "completed").length,
    paused: goals.filter((g) => g.status === "paused").length,
    avgProgress: goals.length > 0
      ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length)
      : 0,
  }), [goals]);

  // Selection handlers
  const toggleSelection = (goalId: string) => {
    setSelectedGoals((prev) => {
      const next = new Set(prev);
      if (next.has(goalId)) {
        next.delete(goalId);
      } else {
        next.add(goalId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedGoals(new Set(filteredGoals.map((g) => g.id)));
  };

  const clearSelection = () => {
    setSelectedGoals(new Set());
    setIsSelectionMode(false);
  };

  // CRUD handlers
  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setIsEditModalOpen(true);
    setActionMenu(null);
  };

  const handleSaveEdit = async (data: EditingGoal) => {
    setIsUpdating(true);
    try {
      await api.patch(`/assessment/goals/${data.id}`, {
        title: data.title,
        description: data.description,
        targetValue: data.targetValue,
        targetDate: data.targetDate,
        status: data.status,
      });

      setGoals((prev) =>
        prev.map((g) =>
          g.id === data.id
            ? { ...g, title: data.title, description: data.description, targetValue: data.targetValue, targetDate: data.targetDate, status: data.status }
            : g
        )
      );

      setIsEditModalOpen(false);
      setEditingGoal(null);
    } catch (err) {
      console.error("Failed to update goal:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = (goal: Goal) => {
    setGoalToDelete(goal);
    setIsDeleteModalOpen(true);
    setActionMenu(null);
  };

  const confirmDelete = async () => {
    if (!goalToDelete) return;

    setIsDeleting(true);
    try {
      await api.delete(`/assessment/goals/${goalToDelete.id}`);
      setGoals((prev) => prev.filter((g) => g.id !== goalToDelete.id));
      setIsDeleteModalOpen(false);
      setGoalToDelete(null);
    } catch (err) {
      console.error("Failed to delete goal:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmBulkDelete = async () => {
    if (selectedGoals.size === 0) return;

    setIsDeleting(true);
    try {
      await api.delete("/assessment/goals", { goalIds: Array.from(selectedGoals) });
      setGoals((prev) => prev.filter((g) => !selectedGoals.has(g.id)));
      setSelectedGoals(new Set());
      setIsSelectionMode(false);
      setIsBulkDeleteModalOpen(false);
    } catch (err) {
      console.error("Failed to delete goals:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Pause/Resume goal
  const handlePauseResume = async (goal: Goal) => {
    const newStatus = goal.status === 'paused' ? 'active' : 'paused';
    setActionMenu(null);

    try {
      await api.patch(`/assessment/goals/${goal.id}`, { status: newStatus });
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goal.id ? { ...g, status: newStatus } : g
        )
      );
    } catch (err) {
      console.error("Failed to update goal status:", err);
    }
  };

  // Complete goal - sets progress to 100% and status to completed
  const handleComplete = async (goal: Goal) => {
    setActionMenu(null);

    try {
      await api.patch(`/assessment/goals/${goal.id}`, {
        status: 'completed',
        currentValue: goal.targetValue, // Set current value to target for 100% progress
      });
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goal.id
            ? { ...g, status: 'completed', progress: 100, currentValue: goal.targetValue }
            : g
        )
      );
    } catch (err) {
      console.error("Failed to complete goal:", err);
    }
  };

  // Reactivate completed/abandoned goal
  const handleReactivate = async (goal: Goal) => {
    setActionMenu(null);

    try {
      await api.patch(`/assessment/goals/${goal.id}`, { status: 'active' });
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goal.id ? { ...g, status: 'active' } : g
        )
      );
    } catch (err) {
      console.error("Failed to reactivate goal:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-cyan-500" />
        </motion.div>
        <p className="text-slate-400">Loading your goals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={fetchGoals}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Try Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {[
          { label: "Total Goals", value: stats.total, icon: Target, color: "cyan", bg: "from-cyan-500/10 to-blue-500/10" },
          { label: "Active", value: stats.active, icon: Zap, color: "green", bg: "from-green-500/10 to-emerald-500/10" },
          { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "blue", bg: "from-blue-500/10 to-indigo-500/10" },
          { label: "Paused", value: stats.paused, icon: Clock, color: "yellow", bg: "from-yellow-500/10 to-amber-500/10" },
          { label: "Avg Progress", value: `${stats.avgProgress}%`, icon: TrendingUp, color: "purple", bg: "from-purple-500/10 to-violet-500/10" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-5 rounded-2xl bg-gradient-to-br ${stat.bg} border border-white/10 hover:border-white/20 transition-all group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col lg:flex-row lg:items-center gap-4"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search goals..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
          {(["all", "active", "completed", "paused"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                filter === f
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (isSelectionMode) {
                clearSelection();
              } else {
                setIsSelectionMode(true);
              }
            }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 cursor-pointer ${
              isSelectionMode
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {isSelectionMode ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
            {isSelectionMode ? "Cancel" : "Select"}
          </button>

          <AnimatePresence>
            {isSelectionMode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={selectAll}
                  className="px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Select All
                </button>
                {selectedGoals.size > 0 && (
                  <>
                    <span className="text-sm text-slate-500">
                      {selectedGoals.size} selected
                    </span>
                    <button
                      onClick={() => setIsBulkDeleteModalOpen(true)}
                      className="px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Selected
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          href="/goals"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
        >
          <Plus className="w-5 h-5" />
          New Goal
        </Link>
      </motion.div>

      {/* Goals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredGoals.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            filteredGoals.map((goal, index) => {
              const config = goalCategoryConfig[goal.category] || goalCategoryConfig.fitness;
              const isSelected = selectedGoals.has(goal.id);

              return (
                <motion.div
                  key={goal.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ delay: index * 0.03 }}
                  className={`p-5 rounded-2xl border transition-all group relative ${
                    isSelected
                      ? "bg-cyan-500/10 border-cyan-500/30"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Selection Checkbox */}
                    {isSelectionMode && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        onClick={() => toggleSelection(goal.id)}
                        className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-cyan-500 border-cyan-500"
                            : "border-white/30 hover:border-cyan-500"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </motion.button>
                    )}

                    {/* Goal Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${config.bgColor} flex items-center justify-center ${config.color} relative overflow-hidden shrink-0`}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-20 transition-opacity`}
                      />
                      <AnimatedIcon isAnimating={false}>
                        {config.icon}
                      </AnimatedIcon>
                    </div>

                    {/* Goal Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-white truncate">{goal.title}</h3>
                            {goal.isPrimary && (
                              <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 flex items-center gap-1"
                              >
                                <Star className="w-3 h-3" />
                                Primary
                              </motion.span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                goal.status === "active"
                                  ? "bg-green-500/20 text-green-400"
                                  : goal.status === "completed"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : goal.status === "paused"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-slate-500/20 text-slate-400"
                              }`}
                            >
                              {goal.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-400 line-clamp-2">{goal.description}</p>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setActionMenu(actionMenu === goal.id ? null : goal.id)}
                            className="p-2 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10 cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4 text-slate-400" />
                          </button>

                          <AnimatePresence>
                            {actionMenu === goal.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 top-full mt-1 w-44 py-1 rounded-xl bg-slate-800 border border-white/10 shadow-xl z-10"
                              >
                                {/* Edit button */}
                                <button
                                  onClick={() => handleEdit(goal)}
                                  className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                  <Edit3 className="w-4 h-4" />
                                  Edit
                                </button>

                                {/* Pause/Resume button - only for active or paused goals */}
                                {(goal.status === 'active' || goal.status === 'paused') && (
                                  <button
                                    onClick={() => handlePauseResume(goal)}
                                    className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2 cursor-pointer ${
                                      goal.status === 'paused'
                                        ? 'text-green-400 hover:bg-green-500/10'
                                        : 'text-yellow-400 hover:bg-yellow-500/10'
                                    }`}
                                  >
                                    {goal.status === 'paused' ? (
                                      <>
                                        <Play className="w-4 h-4" />
                                        Resume
                                      </>
                                    ) : (
                                      <>
                                        <Pause className="w-4 h-4" />
                                        Pause
                                      </>
                                    )}
                                  </button>
                                )}

                                {/* Complete button - only for active goals */}
                                {goal.status === 'active' && (
                                  <button
                                    onClick={() => handleComplete(goal)}
                                    className="w-full px-4 py-2 text-left text-sm text-blue-400 hover:bg-blue-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                    Mark Complete
                                  </button>
                                )}

                                {/* Reactivate button - for completed or abandoned goals */}
                                {(goal.status === 'completed' || goal.status === 'abandoned') && (
                                  <button
                                    onClick={() => handleReactivate(goal)}
                                    className="w-full px-4 py-2 text-left text-sm text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                                  >
                                    <RefreshCw className="w-4 h-4" />
                                    Reactivate
                                  </button>
                                )}

                                {/* Divider */}
                                <div className="my-1 border-t border-white/10" />

                                {/* Delete button */}
                                <button
                                  onClick={() => handleDelete(goal)}
                                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-slate-500">Progress</span>
                          <span className="text-xs font-medium text-white">
                            {goal.progress}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${config.gradient}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut", delay: index * 0.05 }}
                          />
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {new Date(goal.targetDate).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{goal.durationWeeks} weeks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" />
                          <span>
                            {goal.targetValue} {goal.targetUnit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </motion.div>

      {/* Achievements Preview */}
      {stats.completed > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 relative">
                <Trophy className="w-5 h-5 text-amber-400" />
                <PulseRing color="bg-amber-500" />
              </div>
              <h3 className="font-semibold text-white">Recent Achievements</h3>
            </div>
            <button
              onClick={() => {
                // Switch to achievements tab - this can be done via parent component or URL
                const tabButtons = document.querySelectorAll('[data-tab]');
                tabButtons.forEach(btn => {
                  if ((btn as HTMLElement).dataset.tab === 'achievements') {
                    (btn as HTMLElement).click();
                  }
                });
              }}
              className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 group cursor-pointer"
            >
              View All
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 -mx-2 px-2">
            {[
              { icon: <Flame className="w-6 h-6" />, title: "First Steps", desc: "Completed first week", color: "from-orange-500/20 to-red-500/20" },
              { icon: <Zap className="w-6 h-6" />, title: "Consistency", desc: "7-day streak", color: "from-yellow-500/20 to-amber-500/20" },
              { icon: <Award className="w-6 h-6" />, title: "Goal Setter", desc: "Created 3 goals", color: "from-cyan-500/20 to-blue-500/20" },
            ].map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${achievement.color} border border-white/10 min-w-[160px] cursor-pointer`}
              >
                <div className="text-amber-400 mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-white text-sm">{achievement.title}</h4>
                <p className="text-xs text-slate-400">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Edit Modal */}
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingGoal(null);
        }}
        onSave={handleSaveEdit}
        goal={editingGoal}
        isLoading={isUpdating}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setGoalToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Goal"
        message={`Are you sure you want to delete "${goalToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        isLoading={isDeleting}
      />

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isBulkDeleteModalOpen}
        onClose={() => setIsBulkDeleteModalOpen(false)}
        onConfirm={confirmBulkDelete}
        title="Delete Multiple Goals"
        message="Are you sure you want to delete the selected goals? This action cannot be undone."
        confirmText="Delete All"
        isLoading={isDeleting}
        count={selectedGoals.size}
      />

      {/* Click outside to close action menu */}
      {actionMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActionMenu(null)}
        />
      )}
    </div>
  );
}
