"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
export type ButtonSize    = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:     "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-sm hover:shadow-md",
  secondary:   "bg-[var(--secondary)] text-white hover:bg-[var(--secondary-light)]",
  outline:     "border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
  ghost:       "text-[var(--foreground)] hover:bg-[var(--muted)]",
  destructive: "bg-[var(--destructive)] text-white hover:opacity-90",
  accent:      "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-dark)]",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs:  "px-2.5 py-1   text-xs  rounded",
  sm:  "px-3   py-1.5 text-sm  rounded",
  md:  "px-5   py-2.5 text-sm  rounded-[var(--radius)]",
  lg:  "px-6   py-3   text-base rounded-[var(--radius-lg)]",
  xl:  "px-8   py-4   text-lg  rounded-[var(--radius-lg)]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, leftIcon, rightIcon, fullWidth, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          // base
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        ) : leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
