import type { Pillar } from "./wellness";

/**
 * Types of activities that can be logged
 */
export type ActivityType = "workout" | "meal" | "mood" | "sleep";

/**
 * A logged activity entry
 */
export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  detail: string;
  timestamp: string; // Formatted time string, e.g., "8:30am"
  pillar: Pillar;
  createdAt: Date;
}

/**
 * Quick action configuration
 */
export interface QuickAction {
  id: string;
  label: string;
  route: string;
  highlighted?: boolean;
}

/**
 * Navigation tab item
 */
export interface TabItem {
  id: string;
  label: string;
  route: string;
}