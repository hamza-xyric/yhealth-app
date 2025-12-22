"use client";

import { useState, useCallback } from "react";
import { api, ApiError } from "@/lib/api-client";
import {
  GoalCategory,
  AssessmentMode,
  AssessmentResponse,
  BodyStats,
  Goal,
  Preferences,
} from "../OnboardingContext";

// API Response Types
interface AssessmentResponseData {
  assessmentId: string;
  goalCategory: GoalCategory;
  nextStep: string;
}

interface QuestionData {
  questionId: string;
  text: string;
  type: string;
  category: string;
  pillar: string;
  orderNum: number;
  isRequired: boolean;
  options?: { value: string; label: string }[];
  sliderConfig?: { min: number; max: number; step: number };
}

interface SuggestedGoalData {
  category: GoalCategory;
  pillar: string;
  isPrimary: boolean;
  title: string;
  description: string;
  targetValue: number;
  targetUnit: string;
  timeline: {
    startDate: string;
    targetDate: string;
    durationWeeks: number;
  };
  motivation: string;
  confidenceScore?: number;
}

interface PlanData {
  id: string;
  name: string;
  description: string;
  activities: unknown[];
  weeklyFocuses: unknown[];
  coachMessage?: string;
}

export function useOnboardingApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error
  const clearError = useCallback(() => setError(null), []);

  // Step 1: Select Goal
  const selectGoal = useCallback(
    async (category: GoalCategory, customGoalText?: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<AssessmentResponseData>(
          "/assessment/goal",
          {
            category,
            customGoalText,
          }
        );

        if (response.success && response.data) {
          return response.data;
        }
        throw new Error("Failed to select goal");
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : "Failed to select goal";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Step 2: Select Assessment Mode
  const selectMode = useCallback(async (mode: AssessmentMode) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ mode: AssessmentMode; assessmentId: string }>(
        "/assessment/mode",
        { mode }
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to select mode");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to select mode";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get Assessment Questions
  const getQuestions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{
        questions: QuestionData[];
        totalQuestions: number;
        estimatedMinutes: number;
        goalCategory: GoalCategory;
      }>("/assessment/questions");

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to get questions");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to get questions";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Submit Quick Assessment
  const submitQuickAssessment = useCallback(
    async (responses: AssessmentResponse[], bodyStats?: BodyStats) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post<{
          assessmentId: string;
          completedAt: string;
          nextStep: string;
        }>("/assessment/quick/submit", {
          responses,
          bodyStats,
        });

        if (response.success && response.data) {
          return response.data;
        }
        throw new Error("Failed to submit assessment");
      } catch (err) {
        const message =
          err instanceof ApiError ? err.message : "Failed to submit assessment";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Get Suggested Goals
  const getSuggestedGoals = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{
        goals: SuggestedGoalData[];
        assessmentId: string;
      }>("/assessment/goals/suggested");

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to get suggested goals");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to get suggested goals";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Accept Suggested Goals
  const acceptSuggestedGoals = useCallback(async (goals: Goal[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const formattedGoals = goals.map((g) => ({
        category: g.category,
        pillar: g.pillar,
        isPrimary: g.isPrimary,
        title: g.title,
        description: g.description,
        targetValue: g.targetValue,
        targetUnit: g.targetUnit,
        timeline: {
          startDate: g.timeline.startDate.toISOString(),
          targetDate: g.timeline.targetDate.toISOString(),
          durationWeeks: g.timeline.durationWeeks,
        },
        motivation: g.motivation,
        confidenceLevel: g.confidenceLevel,
      }));

      const response = await api.post<{
        goals: unknown[];
        nextStep: string;
      }>("/assessment/goals/accept-suggested", { goals: formattedGoals });

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to accept goals");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to accept goals";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get Available Integrations
  const getIntegrations = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{
        integrations: {
          id: string;
          name: string;
          type: string;
          connected: boolean;
          dataTypes: string[];
        }[];
      }>("/integrations");

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to get integrations");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to get integrations";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Connect Integration
  const connectIntegration = useCallback(async (integrationId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{
        authUrl?: string;
        connected: boolean;
      }>(`/integrations/${integrationId}/connect`, {});

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to connect integration");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to connect integration";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Complete Integrations Step
  const completeIntegrationsStep = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ nextStep: string }>(
        "/integrations/complete",
        {}
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to complete integrations step");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to complete integrations step";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get Coaching Styles
  const getCoachingStyles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get<{
        styles: { id: string; name: string; description: string; icon: string }[];
        intensities: {
          id: string;
          name: string;
          description: string;
          checkInsPerWeek: number;
        }[];
        channels: { id: string; name: string; icon: string }[];
      }>("/preferences/coaching/styles");

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to get coaching styles");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to get coaching styles";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update Preferences
  const updatePreferences = useCallback(async (preferences: Partial<Preferences>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.patch<{ preferences: unknown }>(
        "/preferences",
        {
          coaching: {
            style: preferences.coachingStyle,
            intensity: preferences.coachingIntensity,
            preferredChannel: preferences.preferredChannel,
            checkInFrequency: preferences.checkInFrequency,
            preferredCheckInTime: preferences.preferredCheckInTime,
            timezone: preferences.timezone,
            aiPersonality: preferences.aiPersonality,
          },
          notifications: {
            quietHours: preferences.quietHours,
          },
        }
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to update preferences");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to update preferences";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Complete Preferences Step
  const completePreferencesStep = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ nextStep: string }>(
        "/preferences/complete",
        {}
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to complete preferences step");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to complete preferences step";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Generate Plan
  const generatePlan = useCallback(async (goalId?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ plan: PlanData; message: string }>(
        "/plans/generate",
        { goalId }
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to generate plan");
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Failed to generate plan";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Complete Onboarding
  const completeOnboarding = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post<{ message: string; planId: string }>(
        "/plans/complete-onboarding",
        {}
      );

      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("Failed to complete onboarding");
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : "Failed to complete onboarding";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    clearError,
    // Goal
    selectGoal,
    // Assessment
    selectMode,
    getQuestions,
    submitQuickAssessment,
    // Goals
    getSuggestedGoals,
    acceptSuggestedGoals,
    // Integrations
    getIntegrations,
    connectIntegration,
    completeIntegrationsStep,
    // Preferences
    getCoachingStyles,
    updatePreferences,
    completePreferencesStep,
    // Plan
    generatePlan,
    completeOnboarding,
  };
}
