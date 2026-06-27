"use client";

import { cn } from "@/lib/utils";

export type BadgeVariant = "new" | "hot" | "sale" | "best" | "out-of-stock" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  new:          "bg-[var(--primary)] text-white",
  hot:          "bg-[var(--accent)] text-[var(--accent-foreground)]",
  sale:         "bg-[var(--destructive)] text-white",
  best:         "bg-[var(--success)] text-white",
  "out-of-stock":"bg-[var(--muted)] text-[var(--muted-foreground)]",
  default:      "bg-[var(--secondary)] text-white",
};

export default function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
