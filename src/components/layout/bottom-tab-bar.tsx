"use client";

import { Home, BarChart2, MessageCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabId = "home" | "insights" | "coach" | "settings";

const tabs: Array<{ id: TabId; icon: typeof Home; label: string }> = [
  { id: "home", icon: Home, label: "Home" },
  { id: "insights", icon: BarChart2, label: "Insights" },
  { id: "coach", icon: MessageCircle, label: "Coach" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export interface BottomTabBarProps {
  /** Currently active tab */
  activeTab: TabId;
  /** Tab change handler */
  onTabChange?: (tabId: TabId) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Fixed bottom navigation bar with 4 tabs.
 * Supports safe area insets for iOS devices.
 *
 * @example
 * <BottomTabBar
 *   activeTab="home"
 *   onTabChange={(tab) => navigate(`/${tab}`)}
 * />
 */
export function BottomTabBar({
  activeTab,
  onTabChange,
  className,
}: BottomTabBarProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30",
        "h-16 bg-[var(--card)] border-t border-[var(--border)]",
        "pb-safe",
        className
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="flex justify-around items-center h-full px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className={cn(
                "min-h-[44px] min-w-[44px] flex flex-col items-center justify-center",
                "transition-colors duration-[var(--duration-fast)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-lg"
              )}
              aria-current={isActive ? "page" : undefined}
              aria-label={tab.label}
            >
              <Icon
                className={cn(
                  "h-6 w-6",
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted-foreground)]"
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "text-[10px] mt-1",
                  isActive
                    ? "text-[var(--primary)] font-medium"
                    : "text-[var(--muted-foreground)]"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomTabBar;