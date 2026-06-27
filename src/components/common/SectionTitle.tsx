import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  accent?: boolean;
  className?: string;
}

export default function SectionTitle({ title, subtitle, align = "center", accent = true, className }: SectionTitleProps) {
  return (
    <div className={cn("mb-10", { "text-left": align === "left", "text-center": align === "center", "text-right": align === "right" }, className)}>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)] font-[var(--font-poppins)]">
        {title}
      </h2>
      {accent && (
        <div className={cn("mt-2 h-1 w-14 rounded-full bg-[var(--accent)]", { "mx-auto": align === "center", "ml-auto": align === "right" })} />
      )}
      {subtitle && (
        <p className="mt-3 text-[var(--muted-foreground)] text-sm sm:text-base max-w-xl"
          style={{ margin: align === "center" ? "0.75rem auto 0" : undefined }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
