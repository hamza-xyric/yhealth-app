"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-lg font-semibold",
    "transition-all duration-[var(--duration-fast)] ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-600)]",
        secondary:
          "border border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)]/10",
        ghost:
          "text-[var(--muted-foreground)] bg-transparent hover:bg-[var(--muted)] hover:text-[var(--foreground)]",
        outline:
          "border border-[var(--border)] text-[var(--foreground)] bg-transparent hover:bg-[var(--muted)]",
        destructive:
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] hover:bg-[var(--destructive)]/90",
        fitness:
          "bg-[var(--fitness)] text-[var(--fitness-foreground)] hover:bg-[var(--fitness-600)]",
        nutrition:
          "bg-[var(--nutrition)] text-[var(--nutrition-foreground)] hover:bg-[var(--nutrition-600)]",
        wellbeing:
          "bg-[var(--wellbeing)] text-[var(--wellbeing-foreground)] hover:bg-[var(--wellbeing-600)]",
      },
      size: {
        sm: "h-8 px-3 text-sm min-w-[44px]",
        md: "h-10 px-4 text-base min-h-[44px]",
        lg: "h-12 px-6 text-lg min-h-[44px]",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner */
  loading?: boolean;
  /** Make button full width */
  fullWidth?: boolean;
  /** Icon to show on the left */
  leftIcon?: ReactNode;
  /** Icon to show on the right */
  rightIcon?: ReactNode;
}

/**
 * Button component with multiple variants and sizes.
 * Supports loading state, icons, and all standard button attributes.
 *
 * @example
 * <Button variant="primary" size="lg">Get Started</Button>
 * <Button variant="fitness" loading>Saving...</Button>
 * <Button variant="ghost" leftIcon={<Plus />}>Add Item</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={loading || disabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;