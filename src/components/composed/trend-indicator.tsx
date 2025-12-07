"use client";

import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { TREND_CONFIG } from "@/lib/constants";
import type { TrendDirection } from "@/types";

export interface TrendIndicatorProps {
  /** Direction of the trend */
  direction: TrendDirection;
  /** Text to display (e.g., "+12% from yesterday") */
  value: string;
  /** Additional CSS classes */
  className?: string;
}

const trendIcons = {
  up: ArrowUp,
  down: ArrowDown,
  stable: Minus,
};

/**
 * Displays trend direction with an arrow icon and value text.
 *
 * @example
 * <TrendIndicator direction="up" value="+12% from yesterday" />
 */
export function TrendIndicator({
  direction,
  value,
  className,
}: TrendIndicatorProps) {
  const Icon = trendIcons[direction];
  const config = TREND_CONFIG[direction];

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs",
        config.color,
        className
      )}
      aria-label={`Trend: ${config.label}. ${value}`}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      <span>{value}</span>
    </div>
  );
}

export default TrendIndicator;