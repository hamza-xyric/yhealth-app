/**
 * The three pillars of wellness in yHealth
 */
export type Pillar = "fitness" | "nutrition" | "wellbeing";

/**
 * Direction of score trend compared to previous period
 */
export type TrendDirection = "up" | "down" | "stable";

/**
 * Trend information for a wellness score
 */
export interface Trend {
  direction: TrendDirection;
  value: string; // e.g., "+12% from yesterday", "Stable"
  percentage?: number; // Optional numeric value
}

/**
 * Individual pillar wellness score
 */
export interface WellnessScore {
  value: number; // 0-100
  trend: Trend;
}

/**
 * Complete wellness scores for all pillars
 */
export interface WellnessScores {
  overall: number;
  fitness: WellnessScore;
  nutrition: WellnessScore;
  wellbeing: WellnessScore;
}

/**
 * AI Coach insight message
 */
export interface Insight {
  id: string;
  title: string;
  message: string;
  actionLabel?: string;
  actionRoute?: string;
  pillar?: Pillar;
  createdAt: Date;
}

/**
 * User profile for display
 */
export interface User {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

/**
 * Navigation tabs for bottom tab bar
 */
export type NavTab = "home" | "insights" | "coach" | "settings";