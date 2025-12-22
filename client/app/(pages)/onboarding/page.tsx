"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { OnboardingProvider, useOnboarding } from "./OnboardingContext";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { WelcomeStep } from "./steps/WelcomeStep";
import { AssessmentModeStep } from "./steps/AssessmentModeStep";
import { AssessmentStep } from "./steps/AssessmentStep";
import { GoalSetupStep } from "./steps/GoalSetupStep";
import { IntegrationsStep } from "./steps/IntegrationsStep";
import { PreferencesStep } from "./steps/PreferencesStep";
import { PlanGenerationStep } from "./steps/PlanGenerationStep";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const ONBOARDING_STEPS = [
  {
    id: 0,
    label: "Choose Your Goal",
    shortLabel: "Goal",
  },
  {
    id: 1,
    label: "Select Assessment Mode",
    shortLabel: "Mode",
  },
  {
    id: 2,
    label: "Complete Assessment",
    shortLabel: "Assessment",
  },
  {
    id: 3,
    label: "Set Your Goals",
    shortLabel: "Goals",
  },
  {
    id: 4,
    label: "Connect Devices",
    shortLabel: "Integrations",
  },
  {
    id: 5,
    label: "Set Preferences",
    shortLabel: "Preferences",
  },
  {
    id: 6,
    label: "Generate Plan",
    shortLabel: "Plan",
  },
];

function OnboardingContent() {
  const { currentStep, goToStep } = useOnboarding();
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/signin?callbackUrl=/onboarding");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <AssessmentModeStep />;
      case 2:
        return <AssessmentStep />;
      case 3:
        return <GoalSetupStep />;
      case 4:
        return <IntegrationsStep />;
      case 5:
        return <PreferencesStep />;
      case 6:
        return <PlanGenerationStep />;
      default:
        return <WelcomeStep />;
    }
  };

  // Don't show progress on the plan generation step
  const showProgress = currentStep < 6;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Progress */}
      {showProgress && (
        <motion.header
          className="sticky top-0 z-50 py-6 bg-slate-950/80 backdrop-blur-xl border-b border-white/5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-5xl mx-auto px-4">
            {/* Logo */}
            <div className="text-center mb-6">
              <motion.h1
                className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                yHealth
              </motion.h1>
            </div>

            {/* Progress */}
            <ProgressIndicator
              steps={ONBOARDING_STEPS}
              currentStep={currentStep}
              onStepClick={goToStep}
            />
          </div>
        </motion.header>
      )}

      {/* Main Content */}
      <main className="flex-1 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      {showProgress && (
        <motion.footer
          className="py-4 text-center text-sm text-slate-500 border-t border-white/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>
            Need help?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Contact Support
            </a>
          </p>
        </motion.footer>
      )}
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
