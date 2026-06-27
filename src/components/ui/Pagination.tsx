"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  className?: string;
}

export default function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visible = pages.filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  let prev: number | null = null;
  const items: (number | "...")[] = [];
  for (const p of visible) {
    if (prev !== null && p - prev > 1) items.push("...");
    items.push(p);
    prev = p;
  }

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-1.5 flex-wrap", className)}>
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-2 rounded border border-[var(--border)] text-sm disabled:opacity-40 hover:bg-[var(--muted)] transition-colors"
        aria-label="Previous page"
      >←</button>

      {items.map((item, i) =>
        item === "..." ? (
          <span key={`dots-${i}`} className="px-2 py-2 text-[var(--muted-foreground)]">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              "min-w-[36px] py-2 px-2 rounded border text-sm font-medium transition-colors",
              item === page
                ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                : "border-[var(--border)] hover:bg-[var(--muted)]"
            )}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-2 rounded border border-[var(--border)] text-sm disabled:opacity-40 hover:bg-[var(--muted)] transition-colors"
        aria-label="Next page"
      >→</button>
    </nav>
  );
}
