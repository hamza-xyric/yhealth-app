"use client";

import { cn } from "@/lib/utils";
import { RING_SIZES } from "@/lib/constants";

export type ProgressRingSize = "sm" | "md" | "lg";

export interface ProgressRingProps {
  /** Progress value from 0-100 */
  value: number;
  /** Size variant */
  size?: ProgressRingSize;
  /** Custom stroke color (Tailwind class) */
  strokeColor?: string;
  /** Track color (Tailwind class) */
  trackColor?: string;
  /** Show value in center */
  showValue?: boolean;
  /** Label below value */
  label?: string;
  /** Enable animation */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Circular progress ring for displaying scores and metrics.
 * Supports three sizes and customizable colors.
 *
 * @example
 * <ProgressRing value={78} size="lg" showValue label="Today" />
 */
export function ProgressRing({
  value,
  size = "md",
  strokeColor = "stroke-[var(--primary)]",
  trackColor = "stroke-[var(--muted)]",
  showValue = false,
  label,
  animated = true,
  className,
}: ProgressRingProps) {
  const config = RING_SIZES[size];
  const { dim, stroke, radius, font } = config;

  // Calculate stroke dash values
  const circumference = 2 * Math.PI * radius;
  const safeValue = typeof value === "number" && !Number.isNaN(value) ? value : 0;
  const clampedValue = Math.min(100, Math.max(0, safeValue));
  const offset = circumference * (1 - clampedValue / 100);

  return (
    <div
      className={cn("relative", className)}
      style={{ width: dim, height: dim }}
      role="progressbar"
      aria-valuenow={Math.round(clampedValue)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label}: ${Math.round(clampedValue)}%` : `Progress: ${Math.round(clampedValue)}%`}
    >
      <svg
        className="w-full h-full -rotate-90"
        viewBox={`0 0 ${dim} ${dim}`}
      >
        {/* Track circle */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          className={trackColor}
          strokeWidth={stroke}
        />
        {/* Progress circle */}
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          className={cn(
            strokeColor,
            animated && "transition-all duration-500 ease-out motion-reduce:transition-none"
          )}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center content */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={cn(
              font,
              "font-bold tabular-nums text-[var(--foreground)]"
            )}
          >
            {Math.round(clampedValue)}
          </span>
          {label && (
            <span className="text-xs text-[var(--muted-foreground)]">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default ProgressRing;