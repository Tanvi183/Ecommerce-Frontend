import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag className={cn("max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </Tag>
  );
}
