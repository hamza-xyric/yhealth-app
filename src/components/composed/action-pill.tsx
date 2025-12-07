"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ActionPillProps {
  /** Unique identifier */
  id: string;
  /** Icon to display */
  icon: ReactNode;
  /** Label text */
  label: string;
  /** Click handler */
  onPress: () => void;
  /** Highlight this pill (e.g., for incomplete check-in) */
  highlighted?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Pill-shaped action button for quick actions.
 * Can be highlighted to draw attention (e.g., for incomplete check-in).
 *
 * @example
 * <ActionPill
 *   id="checkin"
 *   icon={<ClipboardCheck />}
 *   label="Check In"
 *   onPress={() => navigate("/checkin")}
 *   highlighted={!isCheckInComplete}
 * />
 */
export function ActionPill({
  id,
  icon,
  label,
  onPress,
  highlighted = false,
  className,
}: ActionPillProps) {
  return (
    <button
      onClick={onPress}
      className={cn(
        "flex flex-col items-center justify-center",
        "p-4 rounded-lg min-w-[80px] min-h-[44px]",
        "transition-all duration-[var(--duration-fast)] ease-out",
        "active:scale-[0.98]",
        highlighted
          ? "bg-[var(--primary)]/10 border border-[var(--primary)]"
          : "bg-[var(--muted)]",
        className
      )}
      aria-label={label}
      data-action-id={id}
    >
      <span
        className={cn(
          "mb-2",
          highlighted ? "text-[var(--primary)]" : "text-[var(--foreground)]"
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          "text-xs",
          highlighted
            ? "text-[var(--primary)]"
            : "text-[var(--muted-foreground)]"
        )}
      >
        {label}
      </span>
    </button>
  );
}

export default ActionPill;