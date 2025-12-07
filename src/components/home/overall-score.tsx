"use client";

import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/progress-ring";
import { ScoreRingSkeleton } from "@/components/ui/skeleton";

export interface OverallScoreProps {
  /** Overall wellness score 0-100 */
  score: number;
  /** Show loading skeleton */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero section displaying the overall wellness score.
 * Large progress ring with animated fill.
 *
 * @example
 * <OverallScore score={78} />
 */
export function OverallScore({
  score,
  loading = false,
  className,
}: OverallScoreProps) {
  if (loading) {
    return <ScoreRingSkeleton className={className} />;
  }

  return (
    <section
      className={cn("pt-6 pb-4 flex justify-center", className)}
      aria-label="Overall wellness score"
    >
      <ProgressRing
        value={score}
        size="lg"
        showValue
        label="Today"
        animated
      />
    </section>
  );
}

export default OverallScore;