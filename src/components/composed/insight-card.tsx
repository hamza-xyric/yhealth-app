"use client";

import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Insight } from "@/types";

export interface InsightCardProps {
  /** Insight data to display */
  insight: Insight;
  /** Handler for action button click */
  onActionClick?: () => void;
  /** Show loading skeleton */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card displaying an AI coach insight with optional call-to-action.
 * Features a teal left border accent.
 *
 * @example
 * <InsightCard
 *   insight={mockInsight}
 *   onActionClick={() => navigate(insight.actionRoute)}
 * />
 */
export function InsightCard({
  insight,
  onActionClick,
  loading = false,
  className,
}: InsightCardProps) {
  if (loading) {
    return <InsightCardSkeleton className={className} />;
  }

  return (
    <Card
      className={cn(
        "border-l-[3px] border-l-[var(--primary)]",
        className
      )}
    >
      <CardContent>
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb
            className="h-5 w-5 text-[var(--primary)]"
            aria-hidden="true"
          />
          <span className="text-base font-semibold text-[var(--foreground)]">
            {insight.title}
          </span>
        </div>

        {/* Message */}
        <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
          {insight.message}
        </p>

        {/* CTA Button */}
        {insight.actionLabel && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onActionClick}
            className="mt-4 text-[var(--primary)] hover:text-[var(--primary-400)] hover:bg-[var(--primary)]/10 -ml-3"
          >
            {insight.actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function InsightCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("border-l-[3px] border-l-[var(--muted)]", className)}>
      <CardContent>
        <div className="flex items-center gap-2 mb-3">
          <Skeleton circle className="h-5 w-5" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-8 w-20 mt-4" />
      </CardContent>
    </Card>
  );
}

export default InsightCard;