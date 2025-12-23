"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import {
  Target,
  Sparkles,
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Heart,
  Edit3,
  Save,
  X,
  Clock,
  Gauge,
  Loader2,
} from "lucide-react";
import { useOnboarding, Goal } from "../OnboardingContext";
import { useOnboardingApi } from "../hooks/useOnboardingApi";
import { StepNavigation } from "../components/StepNavigation";
import { SuccessModal } from "@/components/common/success-modal";

// Mock suggested goals based on assessment
const generateSuggestedGoals = (goalCategory: string): Goal[] => {
  const now = new Date();
  const fourMonthsLater = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000);
  const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

  const goals: Record<string, Goal[]> = {
    weight_loss: [
      {
        id: "goal_1",
        category: "weight_loss",
        pillar: "fitness",
        isPrimary: true,
        title: "Lose 20 lbs in 4 months",
        description: "Sustainable weight loss through balanced nutrition and regular exercise",
        targetValue: 20,
        targetUnit: "lbs",
        currentValue: 0,
        timeline: {
          startDate: now,
          targetDate: fourMonthsLater,
          durationWeeks: 16,
        },
        motivation: "Feel confident and have more energy",
        aiSuggested: true,
      },
      {
        id: "goal_2",
        category: "habit_building",
        pillar: "nutrition",
        isPrimary: false,
        title: "Track meals 6 days/week",
        description: "Build awareness of eating habits through consistent tracking",
        targetValue: 6,
        targetUnit: "days/week",
        timeline: {
          startDate: now,
          targetDate: threeMonthsLater,
          durationWeeks: 13,
        },
        motivation: "Food awareness is key to success",
        aiSuggested: true,
      },
    ],
    muscle_building: [
      {
        id: "goal_1",
        category: "muscle_building",
        pillar: "fitness",
        isPrimary: true,
        title: "Gain 10 lbs of muscle in 4 months",
        description: "Progressive strength training with proper nutrition",
        targetValue: 10,
        targetUnit: "lbs",
        timeline: {
          startDate: now,
          targetDate: fourMonthsLater,
          durationWeeks: 16,
        },
        motivation: "Build strength and confidence",
        aiSuggested: true,
      },
    ],
    sleep_improvement: [
      {
        id: "goal_1",
        category: "sleep_improvement",
        pillar: "wellbeing",
        isPrimary: true,
        title: "Improve sleep quality to 8/10",
        description: "Establish consistent sleep routine and optimize environment",
        targetValue: 8,
        targetUnit: "rating",
        currentValue: 5,
        timeline: {
          startDate: now,
          targetDate: threeMonthsLater,
          durationWeeks: 12,
        },
        motivation: "Wake up refreshed and energized",
        aiSuggested: true,
      },
    ],
  };

  return goals[goalCategory] || goals.weight_loss;
};

export function GoalSetupStep() {
  const {
    selectedGoal,
    suggestedGoals,
    setSuggestedGoals,
    confirmedGoals,
    confirmGoal,
    removeGoal,
    updateGoalConfidence,
    nextStep,
    prevStep,
  } = useOnboarding();

  const { acceptSuggestedGoals, isLoading: apiLoading, error: apiError } = useOnboardingApi();

  const [expandedGoal, setExpandedGoal] = useState<string | null>(null);
  const [confidenceValue, setConfidenceValue] = useState<Record<string, number>>({});
  const [editingGoal, setEditingGoal] = useState<string | null>(null);
  const [editedGoals, setEditedGoals] = useState<Record<string, Partial<Goal>>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Generate suggested goals on mount
  useEffect(() => {
    if (suggestedGoals.length === 0 && selectedGoal) {
      const goals = generateSuggestedGoals(selectedGoal);
      setSuggestedGoals(goals);
      // Auto-confirm primary goal
      const primaryGoal = goals.find((g) => g.isPrimary);
      if (primaryGoal) {
        confirmGoal(primaryGoal);
        setConfidenceValue({ [primaryGoal.id!]: 7 });
      }
    }
  }, [selectedGoal, suggestedGoals.length, setSuggestedGoals, confirmGoal]);

  const handleToggleGoal = (goal: Goal) => {
    const isConfirmed = confirmedGoals.some((g) => g.id === goal.id);
    if (isConfirmed) {
      removeGoal(goal.id!);
    } else {
      confirmGoal(goal);
      setConfidenceValue((prev) => ({ ...prev, [goal.id!]: 7 }));
    }
  };

  const handleConfidenceChange = (goalId: string, value: number) => {
    setConfidenceValue((prev) => ({ ...prev, [goalId]: value }));
    updateGoalConfidence(goalId, value);
  };

  const handleStartEdit = (goal: Goal) => {
    setEditingGoal(goal.id!);
    setEditedGoals((prev) => ({
      ...prev,
      [goal.id!]: {
        targetValue: goal.targetValue,
        timeline: goal.timeline,
        motivation: goal.motivation,
      },
    }));
    setExpandedGoal(goal.id!);
  };

  const handleCancelEdit = () => {
    setEditingGoal(null);
  };

  const handleSaveEdit = (goalId: string) => {
    const goal = suggestedGoals.find((g) => g.id === goalId);
    if (goal && editedGoals[goalId]) {
      const updatedGoal: Goal = {
        ...goal,
        targetValue: editedGoals[goalId].targetValue ?? goal.targetValue,
        timeline: editedGoals[goalId].timeline ?? goal.timeline,
        motivation: editedGoals[goalId].motivation ?? goal.motivation,
      };
      // Update in suggested goals and confirmed goals if applicable
      setSuggestedGoals(suggestedGoals.map((g) => (g.id === goalId ? updatedGoal : g)));
      if (confirmedGoals.some((g) => g.id === goalId)) {
        confirmGoal(updatedGoal);
      }
    }
    setEditingGoal(null);
  };

  const handleEditChange = (goalId: string, field: string, value: number | string) => {
    setEditedGoals((prev) => ({
      ...prev,
      [goalId]: {
        ...prev[goalId],
        [field]: value,
      },
    }));
  };

  const handleTimelineChange = (goalId: string, weeks: number) => {
    const goal = suggestedGoals.find((g) => g.id === goalId);
    if (goal) {
      const newTargetDate = new Date();
      newTargetDate.setDate(newTargetDate.getDate() + weeks * 7);
      setEditedGoals((prev) => ({
        ...prev,
        [goalId]: {
          ...prev[goalId],
          timeline: {
            ...goal.timeline,
            durationWeeks: weeks,
            targetDate: newTargetDate,
          },
        },
      }));
    }
  };

  const getTimelineOptions = () => [
    { weeks: 4, label: "1 month" },
    { weeks: 8, label: "2 months" },
    { weeks: 12, label: "3 months" },
    { weeks: 16, label: "4 months" },
    { weeks: 24, label: "6 months" },
  ];

  // Handle saving goals to API and proceeding
  const handleContinue = useCallback(async () => {
    if (confirmedGoals.length === 0) return;

    setIsSaving(true);
    setError(null);

    try {
      // Save confirmed goals to the API
      await acceptSuggestedGoals(confirmedGoals);
      // Show success modal
      setShowSuccessModal(true);
    } catch (err) {
      console.error("Failed to save goals:", err);
      setError("Failed to save your goals. Please try again.");
      setIsSaving(false);
    }
  }, [confirmedGoals, acceptSuggestedGoals]);

  // Handle success modal close - proceed to next step
  const handleSuccessModalClose = useCallback(() => {
    setShowSuccessModal(false);
    setIsSaving(false);
    nextStep();
  }, [nextStep]);

  const canContinue = confirmedGoals.length > 0 && !isSaving;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-400">
            AI-Generated Goals
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Your Personalized{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Goals
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Based on your assessment, we&apos;ve crafted these goals for you.
          Confirm the ones you&apos;re ready to commit to.
        </p>
      </motion.div>

      {/* Goals List */}
      <div className="space-y-4 mb-8">
        {suggestedGoals.map((goal, index) => {
          const isConfirmed = confirmedGoals.some((g) => g.id === goal.id);
          const isExpanded = expandedGoal === goal.id;
          const confidence = confidenceValue[goal.id!] || 7;

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`
                rounded-2xl border backdrop-blur-sm overflow-hidden
                transition-all duration-300
                ${
                  isConfirmed
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-white/5 border-white/10"
                }
              `}
            >
              {/* Goal Header */}
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Checkbox */}
                  <motion.button
                    onClick={() => handleToggleGoal(goal)}
                    className={`
                      w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center
                      border-2 transition-all duration-200 mt-1
                      ${
                        isConfirmed
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-slate-600 hover:border-slate-500"
                      }
                    `}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isConfirmed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Goal Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {goal.isPrimary && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                          Primary
                        </span>
                      )}
                      {goal.aiSuggested && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                          AI Suggested
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-slate-400">{goal.description}</p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Calendar className="w-4 h-4" />
                        <span>{goal.timeline.durationWeeks} weeks</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>
                          {goal.targetValue} {goal.targetUnit}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {editingGoal === goal.id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(goal.id!)}
                          className="p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors"
                          title="Save changes"
                        >
                          <Save className="w-4 h-4 text-emerald-400" />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors"
                          title="Cancel"
                        >
                          <X className="w-4 h-4 text-red-400" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(goal)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="Edit goal"
                      >
                        <Edit3 className="w-4 h-4 text-slate-400" />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setExpandedGoal(isExpanded ? null : goal.id!)
                      }
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-0 border-t border-white/10">
                      {/* Edit Mode Controls */}
                      {editingGoal === goal.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 space-y-4"
                        >
                          {/* Target Value Editor */}
                          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-3">
                              <Gauge className="w-4 h-4 text-cyan-400" />
                              <span className="text-sm font-medium text-white">
                                Target Value
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <input
                                type="number"
                                value={editedGoals[goal.id!]?.targetValue ?? goal.targetValue}
                                onChange={(e) =>
                                  handleEditChange(goal.id!, "targetValue", Number(e.target.value))
                                }
                                className="w-24 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white text-center focus:border-cyan-500 focus:outline-none"
                              />
                              <span className="text-slate-400">{goal.targetUnit}</span>
                            </div>
                          </div>

                          {/* Timeline Editor */}
                          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span className="text-sm font-medium text-white">
                                Timeline
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {getTimelineOptions().map((option) => {
                                const currentWeeks = editedGoals[goal.id!]?.timeline?.durationWeeks ?? goal.timeline.durationWeeks;
                                const isSelected = currentWeeks === option.weeks;
                                return (
                                  <button
                                    key={option.weeks}
                                    onClick={() => handleTimelineChange(goal.id!, option.weeks)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                      isSelected
                                        ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
                                        : "bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700"
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Motivation Editor */}
                          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <div className="flex items-center gap-2 mb-3">
                              <Heart className="w-4 h-4 text-pink-400" />
                              <span className="text-sm font-medium text-white">
                                Why this matters to you
                              </span>
                            </div>
                            <textarea
                              value={editedGoals[goal.id!]?.motivation ?? goal.motivation}
                              onChange={(e) =>
                                handleEditChange(goal.id!, "motivation", e.target.value)
                              }
                              placeholder="What's driving you to achieve this goal?"
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-600 text-white placeholder-slate-500 focus:border-pink-500 focus:outline-none resize-none"
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* View Mode - Motivation */}
                      {editingGoal !== goal.id && (
                        <div className="mt-4 p-3 rounded-xl bg-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Heart className="w-4 h-4 text-pink-400" />
                            <span className="text-sm font-medium text-white">
                              Why this matters
                            </span>
                          </div>
                          <p className="text-sm text-slate-400">
                            {goal.motivation}
                          </p>
                        </div>
                      )}

                      {/* Confidence Slider */}
                      {isConfirmed && (
                        <div className="mt-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-white">
                              How confident are you?
                            </span>
                            <span
                              className={`text-lg font-bold ${
                                confidence >= 8
                                  ? "text-emerald-400"
                                  : confidence >= 6
                                    ? "text-yellow-400"
                                    : "text-orange-400"
                              }`}
                            >
                              {confidence}/10
                            </span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={10}
                            value={confidence}
                            onChange={(e) =>
                              handleConfidenceChange(
                                goal.id!,
                                Number(e.target.value)
                              )
                            }
                            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                                     [&::-webkit-slider-thumb]:appearance-none
                                     [&::-webkit-slider-thumb]:w-5
                                     [&::-webkit-slider-thumb]:h-5
                                     [&::-webkit-slider-thumb]:rounded-full
                                     [&::-webkit-slider-thumb]:bg-gradient-to-r
                                     [&::-webkit-slider-thumb]:from-emerald-400
                                     [&::-webkit-slider-thumb]:to-teal-400
                                     [&::-webkit-slider-thumb]:shadow-lg"
                          />
                          {confidence < 7 && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20"
                            >
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-yellow-200">
                                  We recommend at least 7/10 confidence.
                                  Consider adjusting the goal or timeline.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <motion.div
        className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-blue-400" />
          <div>
            <span className="text-white font-medium">
              {confirmedGoals.length} goal{confirmedGoals.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <span className="text-slate-400 ml-2">
              (Max 3 active goals recommended)
            </span>
          </div>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.div
          className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Navigation */}
      <StepNavigation
        onBack={prevStep}
        onNext={handleContinue}
        isNextDisabled={!canContinue}
        nextLabel={isSaving ? "Saving Goals..." : "Continue to Integrations"}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="goals"
        title="Goals Saved Successfully!"
        message={`${confirmedGoals.length} health goal${confirmedGoals.length !== 1 ? "s" : ""} have been saved. You're one step closer to your best self!`}
        autoCloseDelay={2500}
      />
    </div>
  );
}
