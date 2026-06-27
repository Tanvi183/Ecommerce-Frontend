"use client";

import { getStars } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;       // 0–5
  count?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const sizeMap = { sm: "w-3 h-3", md: "w-4 h-4", lg: "w-5 h-5" };

export default function Rating({ value, count, size = "md", showCount = true, className }: RatingProps) {
  const stars = getStars(value);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {stars.map((type, i) => (
          <svg
            key={i}
            className={cn(sizeMap[size], {
              "text-[var(--accent)] fill-[var(--accent)]": type === "full",
              "text-[var(--border)]  fill-[var(--border)]":  type === "empty",
            })}
            viewBox="0 0 24 24"
          >
            {type === "half" ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`}>
                    <stop offset="50%" stopColor="var(--accent)" />
                    <stop offset="50%" stopColor="var(--border)" />
                  </linearGradient>
                </defs>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                  fill={`url(#half-${i})`} />
              </>
            ) : (
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            )}
          </svg>
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-[var(--muted-foreground)]">({count})</span>
      )}
    </div>
  );
}
