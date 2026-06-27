"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps { className?: string }

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("skeleton", className)} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[var(--card)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)]">
      <Skeleton className="h-52 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-9 w-full mt-3" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <Skeleton className="h-10 w-full rounded-none" />
    </div>
  );
}
