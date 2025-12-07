"use client";

import { cn } from "@/lib/utils";
import { PILLAR_CONFIG } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { ProgressRing } from "@/components/ui/progress-ring";
import { CardSkeleton } from "@/components/ui/skeleton";
import { TrendIndicator } from "./trend-indicator";
import type { Pillar, Trend } from "@/types";

export interface PillarCardProps {
  /** Which pillar this card represents */
  pillar: Pillar;
  /** Score value 0-100 */
  score: number;
  /** Trend information */
  trend: Trend;
  /** Click handler */
  onPress?: () => void;
  /** Show loading skeleton */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card displaying a wellness pillar score with trend indicator.
 * Wellbeing card spans 2 columns in the grid layout.
 *
 * @example
 * <PillarCard
 *   pillar="fitness"
 *   score={85}
 *   trend={{ direction: "up", value: "+12% from yesterday" }}
 *   onPress={() => navigate("/fitness")}
 * />
 */
export function PillarCard({
  pillar,
  score,
  trend,
  onPress,
  loading = false,
  className,
}: PillarCardProps) {
  const config = PILLAR_CONFIG[pillar];

  if (loading) {
    return (
      <CardSkeleton
        className={cn(
          "min-h-[140px]",
          pillar === "wellbeing" && "col-span-2",
          className
        )}
      />
    );
  }

  const CardComponent = onPress ? "button" : "div";

  return (
    <CardComponent
      onClick={onPress}
      className={cn(
        "w-full text-left",
        onPress && "transition-transform duration-[var(--duration-fast)] ease-out active:scale-[0.98]",
        pillar === "wellbeing" && "col-span-2",
        className
      )}
      aria-label={`${config.label}: ${score} out of 100. ${trend.value}`}
    >
      <Card className={cn("min-h-[140px]", config.bgHover)} hoverable={!!onPress}>
        <CardContent className="flex flex-col justify-between h-full">
          {/* Pillar label */}
          <span
            className={cn(
              "text-xs font-bold uppercase tracking-widest",
              config.labelColor
            )}
          >
            {config.label}
          </span>

          {/* Score and ring */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-4xl font-bold tabular-nums text-[var(--foreground)]">
                {score}
              </span>
              <TrendIndicator
                direction={trend.direction}
                value={trend.value}
                className="mt-1"
              />
            </div>

            <ProgressRing
              value={score}
              size="sm"
              strokeColor={config.ringColor}
            />
          </div>
        </CardContent>
      </Card>
    </CardComponent>
  );
}

export default PillarCard;