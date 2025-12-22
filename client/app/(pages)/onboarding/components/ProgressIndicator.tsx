"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  shortLabel: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function ProgressIndicator({
  steps,
  currentStep,
  onStepClick,
}: ProgressIndicatorProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = onStepClick && index <= currentStep;

            return (
              <motion.button
                key={step.id}
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={`
                  relative flex flex-col items-center group
                  ${isClickable ? "cursor-pointer" : "cursor-default"}
                `}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    relative w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 border-2
                    ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-400/50"
                        : isCurrent
                          ? "bg-gradient-to-br from-blue-500 to-purple-500 border-blue-400/50"
                          : "bg-slate-800 border-slate-700"
                    }
                  `}
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    boxShadow: isCurrent
                      ? "0 0 20px rgba(59, 130, 246, 0.5)"
                      : isCompleted
                        ? "0 0 15px rgba(74, 222, 128, 0.3)"
                        : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-semibold ${isCurrent ? "text-white" : "text-slate-400"}`}
                    >
                      {index + 1}
                    </span>
                  )}

                  {/* Pulse effect for current step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/30"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Label */}
                <motion.span
                  className={`
                    mt-2 text-xs font-medium text-center
                    hidden sm:block max-w-[80px]
                    ${isCurrent ? "text-white" : isCompleted ? "text-green-400" : "text-slate-500"}
                  `}
                  initial={false}
                  animate={{ opacity: isCurrent || isCompleted ? 1 : 0.5 }}
                >
                  {step.shortLabel}
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Current Step Label */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="text-sm text-slate-400">Step {currentStep + 1} of {steps.length}</span>
        <h2 className="text-lg font-semibold text-white mt-1">
          {steps[currentStep]?.label}
        </h2>
      </motion.div>
    </div>
  );
}
