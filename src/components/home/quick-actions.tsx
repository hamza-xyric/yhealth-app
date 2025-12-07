"use client";

import { ClipboardCheck, Utensils, Dumbbell, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionPill } from "@/components/composed/action-pill";

const actions = [
  { id: "checkin", icon: ClipboardCheck, label: "Check In" },
  { id: "meal", icon: Utensils, label: "Log Meal" },
  { id: "workout", icon: Dumbbell, label: "Log Workout" },
  { id: "mood", icon: Smile, label: "Log Mood" },
] as const;

export interface QuickActionsProps {
  /** Whether daily check-in is complete */
  isCheckInComplete?: boolean;
  /** Handler for action press */
  onActionPress?: (actionId: string) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Horizontal scrollable row of quick action pills.
 * Check-in pill is highlighted when not complete.
 *
 * @example
 * <QuickActions
 *   isCheckInComplete={false}
 *   onActionPress={(id) => navigate(`/actions/${id}`)}
 * />
 */
export function QuickActions({
  isCheckInComplete = true,
  onActionPress,
  className,
}: QuickActionsProps) {
  return (
    <section className={cn("mt-6", className)} aria-label="Quick actions">
      <h2 className="text-base font-semibold text-[var(--foreground)] px-4 mb-3">
        Quick Actions
      </h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <ActionPill
                key={action.id}
                id={action.id}
                icon={<Icon className="h-6 w-6" />}
                label={action.label}
                onPress={() => onActionPress?.(action.id)}
                highlighted={action.id === "checkin" && !isCheckInComplete}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default QuickActions;