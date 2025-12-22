"use client";

import { motion } from "framer-motion";
import {
  Target,
  Dumbbell,
  Moon,
  Brain,
  Zap,
  Trophy,
  Heart,
  Sparkles,
  TrendingUp,
  Edit3,
} from "lucide-react";
import { useState } from "react";
import { useOnboarding, GoalCategory } from "../OnboardingContext";
import { StepNavigation } from "../components/StepNavigation";

interface GoalOption {
  id: GoalCategory;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const goalOptions: GoalOption[] = [
  {
    id: "weight_loss",
    icon: <Target className="w-6 h-6" />,
    title: "Lose Weight",
    description: "Achieve sustainable weight loss with personalized nutrition and exercise",
    color: "text-rose-400",
    gradient: "from-rose-500/20 to-pink-500/10",
  },
  {
    id: "muscle_building",
    icon: <Dumbbell className="w-6 h-6" />,
    title: "Build Muscle",
    description: "Gain strength and muscle mass with targeted training programs",
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-amber-500/10",
  },
  {
    id: "sleep_improvement",
    icon: <Moon className="w-6 h-6" />,
    title: "Sleep Better",
    description: "Optimize your sleep quality and wake up refreshed every day",
    color: "text-indigo-400",
    gradient: "from-indigo-500/20 to-blue-500/10",
  },
  {
    id: "stress_wellness",
    icon: <Brain className="w-6 h-6" />,
    title: "Reduce Stress",
    description: "Build resilience and manage stress through mindfulness practices",
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    id: "energy_productivity",
    icon: <Zap className="w-6 h-6" />,
    title: "Boost Energy",
    description: "Increase your daily energy levels and productivity",
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/10",
  },
  {
    id: "event_training",
    icon: <Trophy className="w-6 h-6" />,
    title: "Train for Event",
    description: "Prepare for a marathon, competition, or special occasion",
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    id: "health_condition",
    icon: <Heart className="w-6 h-6" />,
    title: "Manage Condition",
    description: "Support your health with lifestyle modifications for your condition",
    color: "text-red-400",
    gradient: "from-red-500/20 to-rose-500/10",
  },
  {
    id: "overall_optimization",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Optimize Health",
    description: "Improve overall wellness across all health pillars",
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  {
    id: "custom",
    icon: <Edit3 className="w-6 h-6" />,
    title: "Custom Goal",
    description: "Define your own unique health and wellness objective",
    color: "text-slate-400",
    gradient: "from-slate-500/20 to-slate-600/10",
  },
];

export function WelcomeStep() {
  const {
    selectedGoal,
    setSelectedGoal,
    customGoalText,
    setCustomGoalText,
    nextStep,
  } = useOnboarding();

  const [showCustomInput, setShowCustomInput] = useState(
    selectedGoal === "custom"
  );

  const handleGoalSelect = (goalId: GoalCategory) => {
    setSelectedGoal(goalId);
    setShowCustomInput(goalId === "custom");
    if (goalId !== "custom") {
      setCustomGoalText("");
    }
  };

  const canContinue =
    selectedGoal !== null &&
    (selectedGoal !== "custom" || customGoalText.trim().length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-400">
            Let&apos;s get started
          </span>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          What&apos;s Your{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Primary Goal
          </span>
          ?
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Choose the goal that matters most to you right now. We&apos;ll create
          a personalized plan to help you achieve it.
        </p>
      </motion.div>

      {/* Goal Cards Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {goalOptions.map((goal, index) => {
          const isSelected = selectedGoal === goal.id;

          return (
            <motion.button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`
                relative p-5 rounded-2xl text-left transition-all duration-300
                border backdrop-blur-sm group overflow-hidden
                ${
                  isSelected
                    ? "border-blue-500/50 bg-blue-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }
              `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${goal.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.svg
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>
              )}

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${goal.color} bg-white/5`}
                >
                  {goal.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {goal.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Custom Goal Input */}
      {showCustomInput && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className="relative">
            <textarea
              value={customGoalText}
              onChange={(e) => setCustomGoalText(e.target.value)}
              placeholder="Describe your custom health goal..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                       text-white placeholder-slate-500 resize-none
                       focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20
                       transition-all duration-200"
              rows={3}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-500">
              {customGoalText.length}/200
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <StepNavigation
        onNext={nextStep}
        showBack={false}
        isNextDisabled={!canContinue}
        nextLabel="Continue to Assessment"
      />

      {/* Info Banner */}
      <motion.div
        className="mt-8 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm text-slate-300 text-center">
          <span className="text-blue-400 font-medium">Pro tip:</span> You can
          add more goals later. Start with the one that excites you most!
        </p>
      </motion.div>
    </div>
  );
}
