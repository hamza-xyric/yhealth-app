"use client";

import { cn, getGreeting, formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

export interface HeaderProps {
  /** User's display name */
  userName: string;
  /** User's first name for greeting */
  firstName?: string;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Current date */
  date?: Date;
  /** Avatar click handler */
  onAvatarPress?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * App header with personalized greeting, date, and avatar.
 * Greeting changes based on time of day.
 *
 * @example
 * <Header
 *   userName="Alex Johnson"
 *   firstName="Alex"
 *   avatarUrl={user.avatarUrl}
 *   onAvatarPress={() => navigate("/profile")}
 * />
 */
export function Header({
  userName,
  firstName,
  avatarUrl,
  date = new Date(),
  onAvatarPress,
  className,
}: HeaderProps) {
  const greeting = getGreeting(date);
  const displayName = firstName || userName.split(" ")[0];
  const formattedDate = formatDate(date);

  return (
    <header
      className={cn(
        "h-20 px-4 pt-4 flex items-start justify-between",
        className
      )}
      aria-label="User greeting"
    >
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {greeting}, {displayName}
        </h1>
        <p className="text-sm text-[var(--muted-foreground)] mt-1">
          {formattedDate}
        </p>
      </div>

      <button
        onClick={onAvatarPress}
        className={cn(
          "min-h-[44px] min-w-[44px] flex items-center justify-center",
          "rounded-full transition-opacity hover:opacity-80",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
        )}
        aria-label="View profile"
      >
        <Avatar
          src={avatarUrl}
          alt={userName}
          fallback={userName}
          size="md"
        />
      </button>
    </header>
  );
}

export default Header;