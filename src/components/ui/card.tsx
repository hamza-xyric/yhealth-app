"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Add hover effect */
  hoverable?: boolean;
  /** Add touch feedback for mobile */
  pressable?: boolean;
}

/**
 * Card container component with dark mode styling.
 *
 * @example
 * <Card hoverable>
 *   <CardHeader>Title</CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, pressable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg bg-[var(--card)] text-[var(--card-foreground)]",
          hoverable && "hover:bg-[var(--popover)] transition-colors duration-[var(--duration-fast)]",
          pressable && "active:scale-[0.98] transition-transform duration-[var(--duration-fast)]",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-5 pb-0", className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-base font-semibold leading-none tracking-tight",
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-[var(--muted-foreground)]", className)}
      {...props}
    />
  );
});

CardDescription.displayName = "CardDescription";

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("p-5", className)} {...props} />;
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex items-center p-5 pt-0", className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export default Card;