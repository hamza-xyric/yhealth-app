"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Make skeleton circular */
  circle?: boolean;
}

/**
 * Skeleton loading placeholder with shimmer animation.
 *
 * @example
 * <Skeleton className="h-4 w-32" />
 * <Skeleton circle className="h-10 w-10" />
 */
export function Skeleton({ className, circle = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--muted)]",
        circle ? "rounded-full" : "rounded-lg",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton for card layouts
 */
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg bg-[var(--card)] p-5", className)}>
      <Skeleton className="h-3 w-16 mb-4" />
      <Skeleton className="h-8 w-12 mb-2" />
      <Skeleton className="h-3 w-24" />
    </div>
  );
}

/**
 * Skeleton for the overall score ring
 */
export function ScoreRingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center py-6", className)}>
      <Skeleton circle className="h-[120px] w-[120px]" />
    </div>
  );
}

/**
 * Skeleton for activity feed items
 */
export function ActivityItemSkeleton() {
  return (
    <div className="flex items-center gap-3 py-4">
      <Skeleton circle className="h-4 w-4" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-3 w-12" />
    </div>
  );
}

export default Skeleton;