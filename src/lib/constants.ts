/**
 * Pillar configuration for consistent styling across components
 */
export const PILLAR_CONFIG = {
  fitness: {
    label: "Fitness",
    labelColor: "text-[var(--fitness-300)]",
    ringColor: "stroke-[var(--fitness)]",
    bgHover: "hover:bg-[var(--fitness)]/5",
    iconColor: "text-[var(--fitness)]",
  },
  nutrition: {
    label: "Nutrition",
    labelColor: "text-[var(--nutrition-300)]",
    ringColor: "stroke-[var(--nutrition)]",
    bgHover: "hover:bg-[var(--nutrition)]/5",
    iconColor: "text-[var(--nutrition)]",
  },
  wellbeing: {
    label: "Wellbeing",
    labelColor: "text-[var(--wellbeing-300)]",
    ringColor: "stroke-[var(--wellbeing)]",
    bgHover: "hover:bg-[var(--wellbeing)]/5",
    iconColor: "text-[var(--wellbeing)]",
  },
} as const;

/**
 * Progress ring size configurations
 */
export const RING_SIZES = {
  sm: { dim: 48, stroke: 4, radius: 20, font: "text-base" },
  md: { dim: 80, stroke: 6, radius: 34, font: "text-2xl" },
  lg: { dim: 120, stroke: 8, radius: 54, font: "text-5xl" },
} as const;

/**
 * Animation duration tokens (matching CSS variables)
 */
export const DURATION = {
  fast: 150,
  normal: 200,
  medium: 300,
  slow: 500,
} as const;

/**
 * Trend direction configuration
 */
export const TREND_CONFIG = {
  up: {
    color: "text-[var(--success)]",
    label: "Improving",
  },
  down: {
    color: "text-[var(--destructive)]",
    label: "Declining",
  },
  stable: {
    color: "text-[var(--muted-foreground)]",
    label: "Stable",
  },
} as const;

/**
 * Activity type icons and colors
 */
export const ACTIVITY_CONFIG = {
  workout: {
    color: "text-[var(--fitness)]",
    pillar: "fitness" as const,
  },
  meal: {
    color: "text-[var(--nutrition)]",
    pillar: "nutrition" as const,
  },
  mood: {
    color: "text-[var(--wellbeing)]",
    pillar: "wellbeing" as const,
  },
  sleep: {
    color: "text-[var(--wellbeing)]",
    pillar: "wellbeing" as const,
  },
} as const;

/**
 * Navigation tabs
 */
export const NAV_TABS = [
  { id: "home", label: "Home", route: "/" },
  { id: "insights", label: "Insights", route: "/insights" },
  { id: "coach", label: "Coach", route: "/coach" },
  { id: "settings", label: "Settings", route: "/settings" },
] as const;

/**
 * Quick actions configuration
 */
export const QUICK_ACTIONS = [
  { id: "checkin", label: "Check In", route: "/checkin" },
  { id: "meal", label: "Log Meal", route: "/nutrition/log" },
  { id: "workout", label: "Log Workout", route: "/fitness/log" },
  { id: "mood", label: "Log Mood", route: "/wellbeing/mood" },
] as const;