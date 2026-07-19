import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

const sizeMap = { sm: "h-10", md: "h-14", lg: "h-16" };

export default function Logo({ className, size = "md", variant = "default" }: LogoProps) {
  const heightClass = sizeMap[size];

  return (
    <Link href="/" id="site-logo" className={cn("flex items-center group", className)}>
      <img
        src="/logo.png"
        alt="DecorCulture Logo"
        className={cn(
          "w-auto object-contain transition-opacity group-hover:opacity-90 ml-1 md:ml-2 lg:ml-3",
          heightClass,
          variant === "white" ? "brightness-0 invert" : ""
        )}
      />
    </Link>
  );
}
