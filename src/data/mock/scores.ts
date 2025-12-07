import type { WellnessScores } from "@/types";

export const mockWellnessScores: WellnessScores = {
  overall: 78,
  fitness: {
    value: 85,
    trend: {
      direction: "up",
      value: "+12% from yesterday",
      percentage: 12,
    },
  },
  nutrition: {
    value: 72,
    trend: {
      direction: "down",
      value: "-5% from yesterday",
      percentage: -5,
    },
  },
  wellbeing: {
    value: 78,
    trend: {
      direction: "stable",
      value: "Stable",
      percentage: 0,
    },
  },
};