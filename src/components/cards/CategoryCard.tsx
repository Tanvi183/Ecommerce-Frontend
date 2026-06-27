"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <div className={cn("bg-white border border-gray-200 flex flex-col h-full", className)}>
      <Link href={ROUTES.category(category.slug)} className="block relative overflow-hidden aspect-[4/3] bg-gray-50">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      <div className="text-center py-2 bg-gray-100 border-b border-gray-200">
        <h3 className="text-[13px] font-bold text-[var(--primary-light)]">
          {category.name}
        </h3>
      </div>
      <Link href={ROUTES.category(category.slug)} className="block w-full text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white text-[11px] font-bold py-2 transition-colors">
        View More
      </Link>
    </div>
  );
}
