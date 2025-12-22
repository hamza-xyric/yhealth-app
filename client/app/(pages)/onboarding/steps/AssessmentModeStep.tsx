"use client";

import { motion } from "framer-motion";
import { Zap, MessageCircle, Clock, Check, Sparkles } from "lucide-react";
import { useOnboarding, AssessmentMode } from "../OnboardingContext";
import { StepNavigation } from "../components/StepNavigation";

interface ModeOption {
  id: AssessmentMode;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  duration: string;
  features: string[];
  recommended?: boolean;
  gradient: string;
  borderColor: string;
}

const modeOptions: ModeOption[] = [
  {
    id: "quick",
    icon: <Zap className="w-8 h-8" />,
    title: "Quick Assessment",
    subtitle: "Get started fast",
    duration: "3-5 minutes",
    features: [
      "6-8 targeted questions",
      "Core health insights",
      "Instant plan generation",
      "Perfect for busy schedules",
    ],
    recommended: true,
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/50",
  },
  {
    id: "deep",
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Deep Assessment",
    subtitle: "Comprehensive analysis",
    duration: "10-15 minutes",
    features: [
      "Conversational AI coaching",
      "In-depth lifestyle analysis",
      "Personalized insights",
      "Detailed action plan",
    ],
    gradient: "from-purple-500 to-pink-500",
    borderColor: "border-purple-500/50",
  },
];

export function AssessmentModeStep() {
  const { assessmentMode, setAssessmentMode, nextStep, prevStep, selectedGoal } =
    useOnboarding();

  const handleModeSelect = (mode: AssessmentMode) => {
    setAssessmentMode(mode);
  };

  // Get goal title for display
  const getGoalTitle = () => {
    const goalTitles: Record<string, string> = {
      weight_loss: "losing weight",
      muscle_building: "building muscle",
      sleep_improvement: "better sleep",
      stress_wellness: "stress management",
      energy_productivity: "boosting energy",
      event_training: "event training",
      health_condition: "health management",
      habit_building: "habit building",
      overall_optimization: "health optimization",
      custom: "your custom goal",
    };
    return goalTitles[selectedGoal || ""] || "your health journey";
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Sparkles className="w-8 h-8 text-blue-400" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          How Would You Like to{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Proceed
          </span>
          ?
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          Choose how you&apos;d like us to learn about you for {getGoalTitle()}.
          Either option creates a personalized plan.
        </p>
      </motion.div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {modeOptions.map((mode, index) => {
          const isSelected = assessmentMode === mode.id;

          return (
            <motion.button
              key={mode.id}
              onClick={() => handleModeSelect(mode.id)}
              className={`
                relative p-6 rounded-2xl text-left transition-all duration-300
                border backdrop-blur-sm overflow-hidden
                ${
                  isSelected
                    ? `${mode.borderColor} bg-white/10`
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }
              `}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Recommended Badge */}
              {mode.recommended && (
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-semibold text-white"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Recommended
                </motion.div>
              )}

              {/* Selection Indicator */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              {/* Icon */}
              <div
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-4
                  bg-gradient-to-br ${mode.gradient} bg-opacity-20
                `}
              >
                <div className="text-white">{mode.icon}</div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl font-bold text-white mb-1">
                {mode.title}
              </h3>
              <p className="text-slate-400 mb-4">{mode.subtitle}</p>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-slate-400">{mode.duration}</span>
              </div>

              {/* Features */}
              <ul className="space-y-2">
                {mode.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        isSelected ? "text-blue-400" : "text-slate-500"
                      }`}
                    />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Selection Ring */}
              {isSelected && (
                <motion.div
                  className={`absolute inset-0 rounded-2xl border-2 ${mode.borderColor}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info Section */}
      <motion.div
        className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">
              You can switch anytime
            </h4>
            <p className="text-xs text-slate-400">
              Start with Quick and upgrade to Deep later, or switch modes during
              the assessment if you want more personalization.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <StepNavigation
        onBack={prevStep}
        onNext={nextStep}
        isNextDisabled={!assessmentMode}
        nextLabel={
          assessmentMode === "quick"
            ? "Start Quick Assessment"
            : assessmentMode === "deep"
              ? "Start Deep Assessment"
              : "Select a Mode"
        }
      />
    </div>
  );
}
