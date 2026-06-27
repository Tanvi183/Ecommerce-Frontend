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
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted, className, viewMode = "grid" }: ProductCardProps) {
  if (viewMode === "list") {
    return (
      <div className={cn("bg-white border border-[#e5e5e5] flex flex-col sm:flex-row h-full group hover:border-[#186675] transition-colors", className)}>
        {/* Image container */}
        <Link href={ROUTES.productDetail(product.slug)} className="relative block overflow-hidden aspect-square sm:aspect-auto sm:w-[250px] sm:h-[250px] bg-gray-50 flex-shrink-0">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 250px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* NEW Badge top left */}
          {product.isNew && (
            <div className="absolute top-0 left-0 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1">
              NEW
            </div>
          )}
          {product.isOnSale && (
            <div className="absolute top-0 left-0 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1">
              SALE
            </div>
          )}
        </Link>

        {/* Info container */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <Link href={ROUTES.productDetail(product.slug)}>
              <h3 className="text-[16px] font-bold text-[#29353e] hover:text-[var(--primary)] mb-2">
                {product.name}
              </h3>
            </Link>
            <div className="text-[16px] font-bold text-[#186675] mb-4">
              {formatPrice(product.price)}
            </div>
            {/* Description placeholder since dummy data might not have it */}
            <p className="text-[13px] text-[#696973] line-clamp-3 mb-6 leading-relaxed">
              Experience the best in home decor with {product.name}. This premium product is designed to elevate your living space, combining exceptional durability with stunning aesthetics. Transform any room into a masterpiece with this easy-to-install, high-quality material.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart?.(product)}
              className="bg-[#277b8c] text-white hover:bg-[#186675] transition-colors px-6 py-2.5 text-[12px] font-bold uppercase flex items-center gap-2"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={() => onToggleWishlist?.(product.id)}
              className="bg-[#e9ecef] text-[#333] hover:bg-[#dddddd] transition-colors px-4 py-2.5 flex items-center justify-center"
              title="Add to Wish List"
            >
              <svg width="14" height="14" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              className="bg-[#e9ecef] text-[#333] hover:bg-[#dddddd] transition-colors px-4 py-2.5 flex items-center justify-center"
              title="Compare this Product"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 2v20m-7-7l7 7 7-7m-7-13L5 9m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className={cn("bg-white border border-[#e5e5e5] flex flex-col h-full group hover:border-[#186675] transition-colors", className)}>
      {/* Image container */}
      <Link href={ROUTES.productDetail(product.slug)} className="relative block overflow-hidden aspect-square bg-gray-50 border-b border-[#e5e5e5]">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
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
          <h3 className="text-[13px] font-bold text-[#29353e] group-hover:text-[var(--primary)] line-clamp-2 mb-1 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="text-[14px] font-bold text-[#186675]">
          {formatPrice(product.price)}
        </div>
      </div>

      {/* Bottom Bar (Add to cart & Wishlist) */}
      <div className="flex text-white mt-auto">
        <button
          onClick={() => onAddToCart?.(product)}
          className="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-xs font-bold bg-[#277b8c] hover:bg-[#186675] transition-colors"
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
