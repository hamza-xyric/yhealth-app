"use client";

import { cn } from "@/lib/utils";
import { ActivityItem } from "@/components/composed/activity-item";
import { ActivityItemSkeleton } from "@/components/ui/skeleton";
import type { Activity } from "@/types";

export interface ActivityFeedProps {
  /** List of activities to display */
  activities: Activity[];
  /** Handler for activity press */
  onActivityPress?: (activity: Activity) => void;
  /** Message to show when no activities */
  emptyMessage?: string;
  /** Show loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * List of today's logged activities with dividers.
 *
 * @example
 * <ActivityFeed
 *   activities={mockActivities}
 *   onActivityPress={(activity) => showDetail(activity)}
 * />
 */
export function ActivityFeed({
  activities,
  onActivityPress,
  emptyMessage = "No activities logged today. Start by checking in!",
  loading = false,
  className,
}: ActivityFeedProps) {
  return (
    <section
      className={cn("mt-6 px-4 pb-24", className)}
      aria-label="Today's activity"
    >
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-3">
        Today&apos;s Activity
      </h2>

      {loading ? (
        <div className="divide-y divide-[var(--border)]">
          <ActivityItemSkeleton />
          <ActivityItemSkeleton />
          <ActivityItemSkeleton />
        </div>
      ) : activities.length === 0 ? (
        <p className="text-sm text-[var(--muted-foreground)] py-4">
          {emptyMessage}
        </p>
      ) : (
        <div className="divide-y divide-[var(--border)]">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              onPress={
                onActivityPress ? () => onActivityPress(activity) : undefined
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ActivityFeed;