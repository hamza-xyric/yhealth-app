"use client";

import { cn } from "@/lib/utils";
import { PillarCard } from "@/components/composed/pillar-card";
import type { WellnessScore, Pillar } from "@/types";

export interface PillarCardsGridProps {
  /** Fitness pillar score */
  fitnessScore: WellnessScore;
  /** Nutrition pillar score */
  nutritionScore: WellnessScore;
  /** Wellbeing pillar score */
  wellbeingScore: WellnessScore;
  /** Handler for pillar card press */
  onPillarPress?: (pillar: Pillar) => void;
  /** Show loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Grid layout for the three pillar cards.
 * Fitness and Nutrition side by side, Wellbeing spans full width.
 *
 * @example
 * <PillarCardsGrid
 *   fitnessScore={scores.fitness}
 *   nutritionScore={scores.nutrition}
 *   wellbeingScore={scores.wellbeing}
 *   onPillarPress={(pillar) => navigate(`/${pillar}`)}
 * />
 */
export function PillarCardsGrid({
  fitnessScore,
  nutritionScore,
  wellbeingScore,
  onPillarPress,
  loading = false,
  className,
}: PillarCardsGridProps) {
  return (
    <section
      className={cn("px-4", className)}
      aria-label="Health pillars"
    >
      <div className="grid grid-cols-2 gap-4">
        <PillarCard
          pillar="fitness"
          score={fitnessScore.value}
          trend={fitnessScore.trend}
          onPress={onPillarPress ? () => onPillarPress("fitness") : undefined}
          loading={loading}
        />
        <PillarCard
          pillar="nutrition"
          score={nutritionScore.value}
          trend={nutritionScore.trend}
          onPress={onPillarPress ? () => onPillarPress("nutrition") : undefined}
          loading={loading}
        />
        <PillarCard
          pillar="wellbeing"
          score={wellbeingScore.value}
          trend={wellbeingScore.trend}
          onPress={onPillarPress ? () => onPillarPress("wellbeing") : undefined}
          loading={loading}
        />
      </div>
    </section>
  );
}

export default PillarCardsGrid;