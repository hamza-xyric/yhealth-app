import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines clsx and tailwind-merge for optimal class name handling.
 * Use this for all className props to ensure Tailwind classes are properly merged.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format a Date object to display format (e.g., "Tuesday, December 7")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get time-based greeting based on hour of day
 */
export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good evening";
  } else {
    return "Good night";
  }
}

/**
 * Clamp a number between min and max values
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Calculate overall wellness score from pillar scores
 * Fitness: 33%, Nutrition: 33%, Wellbeing: 34%
 */
export function calculateOverallScore(
  fitness: number,
  nutrition: number,
  wellbeing: number
): number {
  return Math.round(fitness * 0.33 + nutrition * 0.33 + wellbeing * 0.34);
}