"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, rightIcon, wrapperClassName, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--foreground)]"
          >
            {label}
            {props.required && <span className="text-[var(--destructive)] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 text-[var(--muted-foreground)] flex items-center">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full border border-[var(--input-border)] rounded-[var(--radius)]",
              "bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--subtle)]",
              "px-4 py-2.5 text-sm transition-all duration-200",
              "focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20",
              "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--muted)]",
              error && "border-[var(--destructive)] focus:border-[var(--destructive)] focus:ring-[var(--destructive)]/20",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 text-[var(--muted-foreground)] flex items-center cursor-pointer">
              {rightIcon}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-[var(--destructive)] flex items-center gap-1">⚠ {error}</p>}
        {hint && !error && <p className="text-xs text-[var(--muted-foreground)]">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
