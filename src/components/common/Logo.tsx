import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

const sizeMap = { sm: { icon: 28, text: "text-lg" }, md: { icon: 38, text: "text-2xl" }, lg: { icon: 48, text: "text-3xl" } };

export default function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const s = sizeMap[size];
  const primaryColor = variant === "white" ? "#ffffff" : "var(--primary)";
  const accentColor  = variant === "white" ? "rgba(255,255,255,0.8)" : "var(--accent)";
  const textColor    = variant === "white" ? "text-white" : "text-[var(--primary)]";

  return (
    <Link href="/" id="site-logo" className={cn("flex items-center gap-2 group", className)}>
      {/* House SVG */}
      <svg width={s.icon} height={s.icon} viewBox="0 0 50 50" fill="none" aria-hidden>
        <polygon points="25,4 46,20 46,46 4,46 4,20" fill={primaryColor} opacity="0.12" />
        <polygon points="25,4 46,20 25,20" fill={accentColor} />
        <rect x="15" y="20" width="20" height="22" fill={primaryColor} />
        <rect x="21" y="30" width="8" height="12" fill="white" />
        <rect x="17" y="23" width="5" height="5" fill="white" opacity="0.85" />
        <rect x="28" y="23" width="5" height="5" fill="white" opacity="0.85" />
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className={cn("font-bold tracking-tight group-hover:opacity-90 transition-opacity", s.text, textColor)}>
          Décor<span style={{ color: "var(--accent)" }}>Culture</span>
        </span>
        <span className={cn("text-[10px] tracking-wide", variant === "white" ? "text-white/60" : "text-[var(--muted-foreground)]")}>
          Delivering Quality, Ensuring Satisfaction
        </span>
      </div>
    </Link>
  );
}
