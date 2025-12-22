"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Check,
  Dumbbell,
  Utensils,
  Moon,
  Brain,
  Calendar,
  TrendingUp,
  Rocket,
  ChevronRight,
  Play,
  Award,
} from "lucide-react";
import { useOnboarding } from "../OnboardingContext";
import { useRouter } from "next/navigation";

interface GenerationPhase {
  id: string;
  label: string;
  icon: React.ReactNode;
  duration: number;
}

const generationPhases: GenerationPhase[] = [
  {
    id: "analyzing",
    label: "Analyzing your goals",
    icon: <TrendingUp className="w-5 h-5" />,
    duration: 2000,
  },
  {
    id: "reviewing",
    label: "Reviewing your assessment",
    icon: <Brain className="w-5 h-5" />,
    duration: 2500,
  },
  {
    id: "nutrition",
    label: "Calculating nutrition targets",
    icon: <Utensils className="w-5 h-5" />,
    duration: 2000,
  },
  {
    id: "workout",
    label: "Designing workout plan",
    icon: <Dumbbell className="w-5 h-5" />,
    duration: 2500,
  },
  {
    id: "wellbeing",
    label: "Adding wellbeing strategies",
    icon: <Moon className="w-5 h-5" />,
    duration: 2000,
  },
  {
    id: "finalizing",
    label: "Finalizing Week 1 actions",
    icon: <Calendar className="w-5 h-5" />,
    duration: 1500,
  },
];

interface PlanActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  days: string[];
  time: string;
  icon: React.ReactNode;
}

interface WeeklyFocus {
  week: number;
  theme: string;
  focus: string;
}

// Mock generated plan
const mockPlan = {
  name: "Your Personalized Health Plan",
  description: "A 16-week journey to achieve your goals",
  activities: [
    {
      id: "1",
      type: "workout",
      title: "Strength Training",
      description: "Full body workout focusing on compound movements",
      days: ["Monday", "Wednesday", "Friday"],
      time: "7:00 AM",
      icon: <Dumbbell className="w-5 h-5" />,
    },
    {
      id: "2",
      type: "nutrition",
      title: "Meal Logging",
      description: "Track your daily food intake",
      days: ["Daily"],
      time: "After meals",
      icon: <Utensils className="w-5 h-5" />,
    },
    {
      id: "3",
      type: "wellbeing",
      title: "Evening Wind-Down",
      description: "Prepare for quality sleep",
      days: ["Daily"],
      time: "9:30 PM",
      icon: <Moon className="w-5 h-5" />,
    },
    {
      id: "4",
      type: "check-in",
      title: "Daily Check-in",
      description: "Rate your energy and mood",
      days: ["Daily"],
      time: "9:00 AM",
      icon: <Brain className="w-5 h-5" />,
    },
  ] as PlanActivity[],
  weeklyFocuses: [
    { week: 1, theme: "Foundation", focus: "Building habits and establishing baseline routines" },
    { week: 2, theme: "Momentum", focus: "Increasing consistency and tracking progress" },
    { week: 3, theme: "Adaptation", focus: "Fine-tuning based on your feedback" },
    { week: 4, theme: "Growth", focus: "Progressive challenge and celebrating wins" },
  ] as WeeklyFocus[],
  milestones: [
    { day: 30, title: "First Month Complete", description: "Review progress and adjust" },
    { day: 60, title: "Halfway There", description: "Major milestone assessment" },
    { day: 90, title: "Three Months Strong", description: "Habit formation achieved" },
  ],
};

export function PlanGenerationStep() {
  const { preferences, confirmedGoals, setGeneratedPlan, acceptPlan } = useOnboarding();
  const router = useRouter();

  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [planReady, setPlanReady] = useState(false);
  const [showPlan, setShowPlan] = useState(false);

  // Simulate plan generation
  useEffect(() => {
    if (!isGenerating) return;

    let phaseIndex = 0;
    const runPhases = async () => {
      for (const phase of generationPhases) {
        setCurrentPhaseIndex(phaseIndex);
        await new Promise((resolve) => setTimeout(resolve, phase.duration));
        phaseIndex++;
      }

      // Generation complete
      setIsGenerating(false);
      setGeneratedPlan(mockPlan);
      setPlanReady(true);

      // Auto-show plan after a moment
      setTimeout(() => setShowPlan(true), 500);
    };

    runPhases();
  }, [isGenerating, setGeneratedPlan]);

  const handleStartPlan = () => {
    acceptPlan();
    router.push("/dashboard");
  };

  // Get coach message based on style
  const getCoachMessage = () => {
    const messages: Record<string, string> = {
      supportive:
        "I'm so excited to be on this journey with you! This plan is designed just for you, and I'll be here every step of the way.",
      direct:
        "Your plan is ready. Follow it consistently and you'll see results. Let's get to work.",
      analytical:
        "I've analyzed your goals and data to create this optimized plan. The activities are sequenced for maximum effectiveness.",
      motivational:
        "This is YOUR time! I've created an amazing plan that's going to transform your life. Let's crush these goals together!",
    };
    return messages[preferences.coachingStyle] || messages.supportive;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <GeneratingView
            key="generating"
            phases={generationPhases}
            currentPhaseIndex={currentPhaseIndex}
          />
        ) : showPlan ? (
          <PlanReadyView
            key="plan"
            plan={mockPlan}
            goals={confirmedGoals}
            coachMessage={getCoachMessage()}
            onStartPlan={handleStartPlan}
          />
        ) : (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-[400px]"
          >
            <Sparkles className="w-12 h-12 text-purple-400 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GeneratingView({
  phases,
  currentPhaseIndex,
}: {
  phases: GenerationPhase[];
  currentPhaseIndex: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      {/* Animated Icon */}
      <motion.div
        className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center relative"
        animate={{
          boxShadow: [
            "0 0 20px rgba(168, 85, 247, 0.3)",
            "0 0 40px rgba(236, 72, 153, 0.3)",
            "0 0 20px rgba(168, 85, 247, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-12 h-12 text-purple-400" />

        {/* Orbiting particles */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-purple-400"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "linear",
            }}
            style={{
              transformOrigin: "center center",
              left: "50%",
              top: "50%",
              marginLeft: -4,
              marginTop: -4,
            }}
          >
            <motion.div
              animate={{
                x: [0, 50, 0, -50, 0],
                y: [-50, 0, 50, 0, -50],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
              }}
              className="w-2 h-2 rounded-full bg-purple-400"
            />
          </motion.div>
        ))}
      </motion.div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Generating Your{" "}
        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Personalized Plan
        </span>
      </h1>
      <p className="text-slate-400 mb-10">
        Our AI is crafting a unique plan just for you...
      </p>

      {/* Progress Steps */}
      <div className="space-y-3">
        {phases.map((phase, index) => {
          const isComplete = index < currentPhaseIndex;
          const isCurrent = index === currentPhaseIndex;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                ${
                  isCurrent
                    ? "bg-purple-500/15 border border-purple-500/30"
                    : isComplete
                      ? "bg-emerald-500/10"
                      : "bg-white/5"
                }
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center
                  ${
                    isComplete
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-white/10 text-slate-500"
                  }
                `}
              >
                {isComplete ? (
                  <Check className="w-5 h-5" />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    {phase.icon}
                  </motion.div>
                ) : (
                  phase.icon
                )}
              </div>

              <span
                className={`font-medium ${
                  isComplete
                    ? "text-emerald-400"
                    : isCurrent
                      ? "text-white"
                      : "text-slate-500"
                }`}
              >
                {phase.label}
              </span>

              {isCurrent && (
                <motion.div
                  className="ml-auto flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

function PlanReadyView({
  plan,
  goals,
  coachMessage,
  onStartPlan,
}: {
  plan: typeof mockPlan;
  goals: ReturnType<typeof useOnboarding>["confirmedGoals"];
  coachMessage: string;
  onStartPlan: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Success Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Your Plan is{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Ready!
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">{coachMessage}</p>
      </motion.div>

      {/* Primary Goal Card */}
      <motion.div
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <span className="text-xs text-blue-400 font-medium uppercase tracking-wide">
              Primary Goal
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              {goals[0]?.title || "Achieve your health goals"}
            </h3>
            <p className="text-slate-400 mt-1">
              {goals[0]?.timeline.durationWeeks || 16} week journey
            </p>
          </div>
        </div>
      </motion.div>

      {/* Week 1 Activities */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-400" />
          Your Week 1 Activities
        </h2>

        <div className="space-y-3">
          {plan.activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-slate-300">
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-white">{activity.title}</h4>
                <p className="text-sm text-slate-400">
                  {activity.days.join(", ")} • {activity.time}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* First Milestone */}
      <motion.div
        className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <span className="text-xs text-purple-400 font-medium">
              First Milestone - Day 30
            </span>
            <p className="text-white font-medium">
              {plan.milestones[0]?.title}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.button
        onClick={onStartPlan}
        className="w-full py-4 rounded-xl font-bold text-lg
                 bg-gradient-to-r from-emerald-500 to-teal-500 text-white
                 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300
                 flex items-center justify-center gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Rocket className="w-6 h-6" />
        Start Your Journey
        <Play className="w-5 h-5" />
      </motion.button>

      <motion.p
        className="text-center mt-4 text-sm text-slate-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Your first check-in is tomorrow at 9:00 AM
      </motion.p>
    </motion.div>
  );
}
