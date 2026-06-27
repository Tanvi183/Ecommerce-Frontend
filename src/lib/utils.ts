import { clsx, type ClassValue } from "clsx";

/**
 * cn — merge Tailwind + conditional class names safely.
 * Usage: cn("base", condition && "extra", { active: isActive })
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/** Format price to local currency string */
export function formatPrice(price: number, currency = "BDT"): string {
  if (currency === "BDT") return `৳${price.toLocaleString("en-BD")}`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);
}

/** Calculate discount percentage */
export function calcDiscount(original: number, sale: number): number {
  if (!original || original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/** Truncate text with ellipsis */
export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + "…" : str;
}

/** Slugify a string */
export function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

/** Debounce a function */
export function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/** Generate star array for rating display */
export function getStars(rating: number): ("full" | "half" | "empty")[] {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });
}
