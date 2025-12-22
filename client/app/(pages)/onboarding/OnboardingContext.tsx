"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// Types for the onboarding flow
export type GoalCategory =
  | "weight_loss"
  | "muscle_building"
  | "sleep_improvement"
  | "stress_wellness"
  | "energy_productivity"
  | "event_training"
  | "health_condition"
  | "habit_building"
  | "overall_optimization"
  | "custom";

export type AssessmentMode = "quick" | "deep";

export type HealthPillar = "fitness" | "nutrition" | "wellbeing";

export interface BodyStats {
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  bodyFatPercentage?: number;
}

export interface AssessmentResponse {
  questionId: string;
  value: string | number | string[];
}

export interface Goal {
  id?: string;
  category: GoalCategory;
  customGoalText?: string;
  pillar: HealthPillar;
  isPrimary: boolean;
  title: string;
  description: string;
  targetValue: number;
  targetUnit: string;
  currentValue?: number;
  timeline: {
    startDate: Date;
    targetDate: Date;
    durationWeeks: number;
  };
  motivation: string;
  confidenceLevel?: number;
  aiSuggested?: boolean;
}

export interface Integration {
  id: string;
  name: string;
  type: "wearable" | "app" | "platform";
  icon: string;
  connected: boolean;
  lastSync?: Date;
  dataTypes: string[];
}

export interface Preferences {
  coachingStyle: "supportive" | "direct" | "analytical" | "motivational";
  coachingIntensity: "light" | "moderate" | "intensive";
  preferredChannel: "push" | "email" | "whatsapp" | "sms";
  checkInFrequency: "daily" | "every_other_day" | "weekly";
  preferredCheckInTime: string;
  timezone: string;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  aiPersonality: {
    useEmojis: boolean;
    formalityLevel: "casual" | "balanced" | "formal";
    encouragementLevel: "low" | "medium" | "high";
  };
}

export interface OnboardingState {
  // Current step (0-indexed)
  currentStep: number;
  totalSteps: number;

  // Step 1: Goal Selection
  selectedGoal: GoalCategory | null;
  customGoalText: string;

  // Step 2: Assessment Mode
  assessmentMode: AssessmentMode | null;

  // Step 3: Assessment
  assessmentResponses: AssessmentResponse[];
  bodyStats: BodyStats;
  assessmentComplete: boolean;

  // Step 4: Goals
  suggestedGoals: Goal[];
  confirmedGoals: Goal[];

  // Step 5: Integrations
  availableIntegrations: Integration[];
  connectedIntegrations: string[];

  // Step 6: Preferences
  preferences: Preferences;

  // Step 7: Plan
  generatedPlan: unknown;
  planAccepted: boolean;
}

interface OnboardingContextValue extends OnboardingState {
  // Navigation
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  getStepProgress: () => number;

  // Step 1: Goal
  setSelectedGoal: (goal: GoalCategory) => void;
  setCustomGoalText: (text: string) => void;

  // Step 2: Assessment Mode
  setAssessmentMode: (mode: AssessmentMode) => void;

  // Step 3: Assessment
  addAssessmentResponse: (response: AssessmentResponse) => void;
  setBodyStats: (stats: Partial<BodyStats>) => void;
  completeAssessment: () => void;

  // Step 4: Goals
  setSuggestedGoals: (goals: Goal[]) => void;
  confirmGoal: (goal: Goal) => void;
  removeGoal: (goalId: string) => void;
  updateGoalConfidence: (goalId: string, confidence: number) => void;

  // Step 5: Integrations
  setAvailableIntegrations: (integrations: Integration[]) => void;
  toggleIntegration: (integrationId: string) => void;

  // Step 6: Preferences
  updatePreferences: (prefs: Partial<Preferences>) => void;

  // Step 7: Plan
  setGeneratedPlan: (plan: unknown) => void;
  acceptPlan: () => void;

  // Reset
  resetOnboarding: () => void;
}

const defaultPreferences: Preferences = {
  coachingStyle: "supportive",
  coachingIntensity: "moderate",
  preferredChannel: "push",
  checkInFrequency: "daily",
  preferredCheckInTime: "09:00",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  quietHours: {
    enabled: true,
    start: "22:00",
    end: "07:00",
  },
  aiPersonality: {
    useEmojis: true,
    formalityLevel: "balanced",
    encouragementLevel: "medium",
  },
};

const initialState: OnboardingState = {
  currentStep: 0,
  totalSteps: 7,
  selectedGoal: null,
  customGoalText: "",
  assessmentMode: null,
  assessmentResponses: [],
  bodyStats: {},
  assessmentComplete: false,
  suggestedGoals: [],
  confirmedGoals: [],
  availableIntegrations: [],
  connectedIntegrations: [],
  preferences: defaultPreferences,
  generatedPlan: null,
  planAccepted: false,
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);

  // Navigation
  const nextStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, prev.totalSteps - 1)),
    }));
  }, []);

  const getStepProgress = useCallback(() => {
    return ((state.currentStep + 1) / state.totalSteps) * 100;
  }, [state.currentStep, state.totalSteps]);

  // Step 1: Goal
  const setSelectedGoal = useCallback((goal: GoalCategory) => {
    setState((prev) => ({ ...prev, selectedGoal: goal }));
  }, []);

  const setCustomGoalText = useCallback((text: string) => {
    setState((prev) => ({ ...prev, customGoalText: text }));
  }, []);

  // Step 2: Assessment Mode
  const setAssessmentMode = useCallback((mode: AssessmentMode) => {
    setState((prev) => ({ ...prev, assessmentMode: mode }));
  }, []);

  // Step 3: Assessment
  const addAssessmentResponse = useCallback((response: AssessmentResponse) => {
    setState((prev) => {
      const existingIndex = prev.assessmentResponses.findIndex(
        (r) => r.questionId === response.questionId
      );
      if (existingIndex >= 0) {
        const updated = [...prev.assessmentResponses];
        updated[existingIndex] = response;
        return { ...prev, assessmentResponses: updated };
      }
      return {
        ...prev,
        assessmentResponses: [...prev.assessmentResponses, response],
      };
    });
  }, []);

  const setBodyStats = useCallback((stats: Partial<BodyStats>) => {
    setState((prev) => ({
      ...prev,
      bodyStats: { ...prev.bodyStats, ...stats },
    }));
  }, []);

  const completeAssessment = useCallback(() => {
    setState((prev) => ({ ...prev, assessmentComplete: true }));
  }, []);

  // Step 4: Goals
  const setSuggestedGoals = useCallback((goals: Goal[]) => {
    setState((prev) => ({ ...prev, suggestedGoals: goals }));
  }, []);

  const confirmGoal = useCallback((goal: Goal) => {
    setState((prev) => {
      const exists = prev.confirmedGoals.some((g) => g.id === goal.id);
      if (exists) return prev;
      return { ...prev, confirmedGoals: [...prev.confirmedGoals, goal] };
    });
  }, []);

  const removeGoal = useCallback((goalId: string) => {
    setState((prev) => ({
      ...prev,
      confirmedGoals: prev.confirmedGoals.filter((g) => g.id !== goalId),
    }));
  }, []);

  const updateGoalConfidence = useCallback(
    (goalId: string, confidence: number) => {
      setState((prev) => ({
        ...prev,
        confirmedGoals: prev.confirmedGoals.map((g) =>
          g.id === goalId ? { ...g, confidenceLevel: confidence } : g
        ),
      }));
    },
    []
  );

  // Step 5: Integrations
  const setAvailableIntegrations = useCallback(
    (integrations: Integration[]) => {
      setState((prev) => ({ ...prev, availableIntegrations: integrations }));
    },
    []
  );

  const toggleIntegration = useCallback((integrationId: string) => {
    setState((prev) => {
      const isConnected = prev.connectedIntegrations.includes(integrationId);
      return {
        ...prev,
        connectedIntegrations: isConnected
          ? prev.connectedIntegrations.filter((id) => id !== integrationId)
          : [...prev.connectedIntegrations, integrationId],
      };
    });
  }, []);

  // Step 6: Preferences
  const updatePreferences = useCallback((prefs: Partial<Preferences>) => {
    setState((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, ...prefs },
    }));
  }, []);

  // Step 7: Plan
  const setGeneratedPlan = useCallback((plan: unknown) => {
    setState((prev) => ({ ...prev, generatedPlan: plan }));
  }, []);

  const acceptPlan = useCallback(() => {
    setState((prev) => ({ ...prev, planAccepted: true }));
  }, []);

  // Reset
  const resetOnboarding = useCallback(() => {
    setState(initialState);
  }, []);

  const value: OnboardingContextValue = {
    ...state,
    nextStep,
    prevStep,
    goToStep,
    getStepProgress,
    setSelectedGoal,
    setCustomGoalText,
    setAssessmentMode,
    addAssessmentResponse,
    setBodyStats,
    completeAssessment,
    setSuggestedGoals,
    confirmGoal,
    removeGoal,
    updateGoalConfidence,
    setAvailableIntegrations,
    toggleIntegration,
    updatePreferences,
    setGeneratedPlan,
    acceptPlan,
    resetOnboarding,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
