"use client";

import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-14 w-14 text-lg",
  "2xl": "h-16 w-16 text-xl",
};

export interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> {
  /** Image source URL */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Fallback text (usually initials) when image fails */
  fallback?: string;
  /** Size variant */
  size?: AvatarSize;
}

/**
 * Avatar component with image and fallback support.
 * Shows initials when image is not available or fails to load.
 *
 * @example
 * <Avatar src={user.avatarUrl} alt={user.name} fallback="AJ" size="md" />
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt = "", fallback = "?", size = "md", ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const showFallback = !src || hasError;

    /**
     * Generate initials from a name string
     */
    const getInitials = (name: string): string => {
      if (!name) return "?";
      const words = name.trim().split(" ");
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
      }
      return (
        words[0].charAt(0).toUpperCase() +
        words[words.length - 1].charAt(0).toUpperCase()
      );
    };

    const displayFallback = fallback.length <= 2 ? fallback : getInitials(fallback);

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full",
          "bg-[var(--muted)]",
          sizeClasses[size],
          className
        )}
      >
        {showFallback ? (
          <span className="flex h-full w-full items-center justify-center font-medium text-[var(--muted-foreground)]">
            {displayFallback}
          </span>
        ) : (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            onError={() => setHasError(true)}
            {...props}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;