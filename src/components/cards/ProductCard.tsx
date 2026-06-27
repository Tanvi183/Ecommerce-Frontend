"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (id: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, className }: ProductCardProps) {
  return (
    <div className={cn("bg-white border border-gray-200 flex flex-col h-full", className)}>
      {/* Image container */}
      <Link href={ROUTES.productDetail(product.slug)} className="relative block overflow-hidden aspect-square bg-gray-50">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* NEW Badge top right */}
        {product.isNew && (
          <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1">
            NEW
          </div>
        )}
        {product.isOnSale && (
          <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1">
            SALE
          </div>
        )}
      </Link>

      {/* Info container */}
      <div className="p-3 text-center flex-1 flex flex-col justify-center">
        <Link href={ROUTES.productDetail(product.slug)}>
          <h3 className="text-[13px] font-bold text-[#1a5b6e] hover:text-[var(--primary-dark)] line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        <div className="text-[13px] font-bold text-[#1a5b6e]">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Bottom Bar (Add to cart & Wishlist) */}
      <div className="flex bg-[var(--primary)] text-white mt-auto">
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex-1 flex items-center gap-2 px-3 py-2 text-xs font-bold hover:bg-[var(--primary-dark)] transition-colors"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add To Cart
        </button>
        <button
          onClick={() => onToggleWishlist?.(product.id)}
          className="px-3 py-2 border-l border-white/20 hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center"
          aria-label="Toggle Wishlist"
        >
          <svg width="14" height="14" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
