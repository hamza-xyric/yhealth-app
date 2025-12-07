"use client";

import { Dumbbell, Utensils, Smile, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACTIVITY_CONFIG } from "@/lib/constants";
import type { Activity, ActivityType } from "@/types";

const activityIcons: Record<ActivityType, typeof Dumbbell> = {
  workout: Dumbbell,
  meal: Utensils,
  mood: Smile,
  sleep: Moon,
};

export interface ActivityItemProps {
  /** Activity data to display */
  activity: Activity;
  /** Click handler */
  onPress?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Single activity item for the activity feed.
 * Shows icon, title, detail, and timestamp.
 *
 * @example
 * <ActivityItem
 *   activity={{
 *     id: "1",
 *     type: "workout",
 *     title: "Morning Run",
 *     detail: "5.2km",
 *     timestamp: "8:30am",
 *     pillar: "fitness"
 *   }}
 * />
 */
export function ActivityItem({
  activity,
  onPress,
  className,
}: ActivityItemProps) {
  const Icon = activityIcons[activity.type];
  const config = ACTIVITY_CONFIG[activity.type];

  const Component = onPress ? "button" : "div";

  return (
    <Component
      onClick={onPress}
      className={cn(
        "flex items-center gap-3 py-4 w-full text-left",
        onPress && "hover:bg-[var(--muted)]/50 -mx-4 px-4 rounded-lg transition-colors",
        className
      )}
    >
      <Icon className={cn("h-4 w-4 shrink-0", config.color)} aria-hidden="true" />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--foreground)] truncate">
          {activity.title}
          {activity.detail && (
            <span className="text-[var(--muted-foreground)]">
              {" "}
              · {activity.detail}
            </span>
          )}
        </p>
      </div>

      <span className="text-xs text-[var(--muted-foreground)] shrink-0">
        {activity.timestamp}
      </span>
    </Component>
  );
}

export default ActivityItem;