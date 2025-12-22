"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Activity,
  Moon,
  Utensils,
  Brain,
  ChevronRight,
  Ruler,
  Scale,
  Target,
} from "lucide-react";
import { useOnboarding } from "../OnboardingContext";
import { StepNavigation } from "../components/StepNavigation";

interface Question {
  id: string;
  text: string;
  type: "slider" | "emoji_scale" | "single_select" | "multi_select" | "number";
  category: string;
  pillar: string;
  icon: React.ReactNode;
  options?: { value: string; label: string; emoji?: string }[];
  sliderConfig?: { min: number; max: number; step: number; labels?: string[] };
  unit?: string;
}

const assessmentQuestions: Question[] = [
  {
    id: "activity_level",
    text: "How many days per week are you currently active?",
    type: "slider",
    category: "baseline",
    pillar: "fitness",
    icon: <Activity className="w-6 h-6" />,
    sliderConfig: {
      min: 0,
      max: 7,
      step: 1,
      labels: ["0 days", "1-2 days", "3-4 days", "5-6 days", "7 days"],
    },
  },
  {
    id: "sleep_quality",
    text: "How would you rate your sleep quality?",
    type: "emoji_scale",
    category: "baseline",
    pillar: "wellbeing",
    icon: <Moon className="w-6 h-6" />,
    options: [
      { value: "1", label: "Very Poor", emoji: "😴" },
      { value: "2", label: "Poor", emoji: "😞" },
      { value: "3", label: "Fair", emoji: "😐" },
      { value: "4", label: "Good", emoji: "🙂" },
      { value: "5", label: "Excellent", emoji: "😊" },
    ],
  },
  {
    id: "stress_level",
    text: "What is your current stress level?",
    type: "emoji_scale",
    category: "baseline",
    pillar: "wellbeing",
    icon: <Brain className="w-6 h-6" />,
    options: [
      { value: "1", label: "Very Low", emoji: "😌" },
      { value: "2", label: "Low", emoji: "🙂" },
      { value: "3", label: "Moderate", emoji: "😐" },
      { value: "4", label: "High", emoji: "😰" },
      { value: "5", label: "Very High", emoji: "😫" },
    ],
  },
  {
    id: "meals_per_day",
    text: "How many meals do you typically eat per day?",
    type: "single_select",
    category: "baseline",
    pillar: "nutrition",
    icon: <Utensils className="w-6 h-6" />,
    options: [
      { value: "1-2", label: "1-2 meals" },
      { value: "3", label: "3 meals" },
      { value: "4-5", label: "4-5 meals" },
      { value: "6+", label: "6 or more" },
    ],
  },
  {
    id: "biggest_challenge",
    text: "What is your biggest health challenge?",
    type: "single_select",
    category: "baseline",
    pillar: "general",
    icon: <Target className="w-6 h-6" />,
    options: [
      { value: "time", label: "Finding time" },
      { value: "motivation", label: "Staying motivated" },
      { value: "knowledge", label: "Knowing what to do" },
      { value: "consistency", label: "Being consistent" },
      { value: "energy", label: "Having enough energy" },
    ],
  },
  {
    id: "height",
    text: "What is your height?",
    type: "number",
    category: "body_stats",
    pillar: "general",
    icon: <Ruler className="w-6 h-6" />,
    unit: "cm",
  },
  {
    id: "weight",
    text: "What is your current weight?",
    type: "number",
    category: "body_stats",
    pillar: "general",
    icon: <Scale className="w-6 h-6" />,
    unit: "kg",
  },
];

export function AssessmentStep() {
  const {
    assessmentResponses,
    addAssessmentResponse,
    setBodyStats,
    bodyStats,
    completeAssessment,
    nextStep,
    prevStep,
  } = useOnboarding();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;

  // Get current response for the question
  const getCurrentResponse = () => {
    if (currentQuestion.id === "height") return bodyStats.heightCm || "";
    if (currentQuestion.id === "weight") return bodyStats.weightKg || "";
    return (
      assessmentResponses.find((r) => r.questionId === currentQuestion.id)
        ?.value || ""
    );
  };

  const handleResponse = (value: string | number) => {
    if (currentQuestion.id === "height") {
      setBodyStats({ heightCm: Number(value) });
    } else if (currentQuestion.id === "weight") {
      setBodyStats({ weightKg: Number(value) });
    } else {
      addAssessmentResponse({ questionId: currentQuestion.id, value });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      prevStep();
    }
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    completeAssessment();
    nextStep();
  };

  const isCurrentAnswered = getCurrentResponse() !== "";

  // Progress percentage
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-slate-400 mb-2">
          <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
        >
          {/* Question Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
              {currentQuestion.icon}
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wide">
                {currentQuestion.pillar}
              </span>
              <h2 className="text-xl font-semibold text-white">
                {currentQuestion.text}
              </h2>
            </div>
          </div>

          {/* Answer Options */}
          <div className="mt-8">
            {currentQuestion.type === "slider" && (
              <SliderQuestion
                config={currentQuestion.sliderConfig!}
                value={Number(getCurrentResponse()) || 0}
                onChange={(v) => handleResponse(v)}
              />
            )}

            {currentQuestion.type === "emoji_scale" && (
              <EmojiScaleQuestion
                options={currentQuestion.options!}
                value={String(getCurrentResponse())}
                onChange={(v) => handleResponse(v)}
              />
            )}

            {currentQuestion.type === "single_select" && (
              <SingleSelectQuestion
                options={currentQuestion.options!}
                value={String(getCurrentResponse())}
                onChange={(v) => handleResponse(v)}
              />
            )}

            {currentQuestion.type === "number" && (
              <NumberQuestion
                unit={currentQuestion.unit}
                value={Number(getCurrentResponse()) || undefined}
                onChange={(v) => handleResponse(v)}
                placeholder={
                  currentQuestion.id === "height"
                    ? "Enter height"
                    : "Enter weight"
                }
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <StepNavigation
        onBack={handlePrev}
        onNext={handleNext}
        backLabel={currentQuestionIndex === 0 ? "Back" : "Previous"}
        nextLabel={
          currentQuestionIndex === totalQuestions - 1
            ? "Complete Assessment"
            : "Next Question"
        }
        isNextDisabled={!isCurrentAnswered}
        isLoading={isCompleting}
      />

      {/* Quick Skip Option */}
      {currentQuestion.category === "body_stats" && (
        <motion.p
          className="text-center mt-4 text-sm text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          This helps us personalize your plan, but you can update it later.
        </motion.p>
      )}
    </div>
  );
}

// Sub-components for different question types

function SliderQuestion({
  config,
  value,
  onChange,
}: {
  config: { min: number; max: number; step: number; labels?: string[] };
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
                   [&::-webkit-slider-thumb]:appearance-none
                   [&::-webkit-slider-thumb]:w-6
                   [&::-webkit-slider-thumb]:h-6
                   [&::-webkit-slider-thumb]:rounded-full
                   [&::-webkit-slider-thumb]:bg-gradient-to-r
                   [&::-webkit-slider-thumb]:from-blue-500
                   [&::-webkit-slider-thumb]:to-purple-500
                   [&::-webkit-slider-thumb]:shadow-lg
                   [&::-webkit-slider-thumb]:cursor-pointer
                   [&::-webkit-slider-thumb]:transition-transform
                   [&::-webkit-slider-thumb]:hover:scale-110"
        />
      </div>

      {/* Value Display */}
      <div className="text-center">
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30"
        >
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-slate-400">days / week</span>
        </motion.div>
      </div>

      {/* Labels */}
      {config.labels && (
        <div className="flex justify-between text-xs text-slate-500">
          {config.labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function EmojiScaleQuestion({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; emoji?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="grid grid-cols-5 gap-2 md:gap-4">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl
              transition-all duration-200 border
              ${
                isSelected
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-2xl md:text-3xl"
              animate={{ scale: isSelected ? 1.2 : 1 }}
            >
              {option.emoji}
            </motion.span>
            <span
              className={`text-xs text-center ${isSelected ? "text-blue-400" : "text-slate-400"}`}
            >
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

function SingleSelectQuestion({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <motion.button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              w-full flex items-center justify-between p-4 rounded-xl
              transition-all duration-200 border text-left
              ${
                isSelected
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            `}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <span
              className={`font-medium ${isSelected ? "text-white" : "text-slate-300"}`}
            >
              {option.label}
            </span>
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function NumberQuestion({
  unit,
  value,
  onChange,
  placeholder,
}: {
  unit?: string;
  value?: number;
  onChange: (value: number) => void;
  placeholder: string;
}) {
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  useEffect(() => {
    setInputValue(value?.toString() || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val && !isNaN(Number(val))) {
      onChange(Number(val));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative inline-flex items-center">
        <input
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-40 px-4 py-4 text-center text-2xl font-bold rounded-xl
                   bg-white/5 border border-white/10 text-white
                   placeholder-slate-500 focus:outline-none focus:border-blue-500/50
                   focus:ring-2 focus:ring-blue-500/20
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit && (
          <span className="absolute right-4 text-slate-400 font-medium">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
