"use client";

import Image from "next/image";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import CartToast from "@/components/common/CartToast";
import WishlistToast from "@/components/common/WishlistToast";
import CompareToast from "@/components/common/CompareToast";
import QuickviewModal from "@/components/common/QuickviewModal";
import { useCompareStore } from "@/store/useCompareStore";

interface ProductCardProps {
  product: Product;
  className?: string;
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, className, viewMode = "grid" }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleCompare = useCompareStore((state) => state.toggleCompare);
  
  const [isMounted, setIsMounted] = useState(false);
  const [isQuickviewOpen, setIsQuickviewOpen] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isWishlisted = isMounted ? wishlistItems.some((item) => item.id === product.id) : false;

  const handleAddToCart = () => {
    addToCart(product);
    toast.custom((t) => (
      <CartToast product={product} toastId={t} />
    ), { 
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleToggleWishlist = () => {
    // We can still toggle it locally for demo purposes, but show the requested auth warning
    toggleWishlist(product);
    
    toast.custom((t) => (
      <WishlistToast product={product} toastId={t} />
    ), { 
      duration: 3000,
      position: 'top-right'
    });
  };

  const handleCompare = () => {
    toggleCompare(product);
    toast.custom((t) => (
      <CompareToast product={product} toastId={t} />
    ), { 
      duration: 3000,
      position: 'top-right'
    });
  };

  if (viewMode === "list") {
    return (
      <div className={cn("bg-white border border-[#e5e5e5] flex flex-col sm:flex-row h-full group hover:border-[#186675] transition-colors", className)}>
        {/* Image container */}
        <div className="relative block overflow-hidden aspect-square sm:aspect-auto sm:w-[250px] sm:h-[250px] bg-gray-50 flex-shrink-0">
          <Link href={ROUTES.productDetail(product.slug)} className="block w-full h-full">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 250px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* NEW Badge top left */}
            {product.isNew && (
              <div className="absolute top-0 left-0 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1 z-10">
                NEW
              </div>
            )}
            {product.isOnSale && (
              <div className="absolute top-0 left-0 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1 z-10">
                SALE
              </div>
            )}
          </Link>

          {/* Quickview Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
            <button 
              className="w-[50px] h-[50px] shrink-0 rounded-full bg-[#277b8c] text-white hover:bg-[#ffb629] flex items-center justify-center pointer-events-auto transition-colors group/btn relative shadow-md border-none outline-none cursor-pointer"
              aria-label="Quickview"
              onClick={(e) => {
                e.preventDefault();
                setIsQuickviewOpen(true);
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                <path d="M12 5v14M5 12h14" />
              </svg>
              
              {/* Tooltip */}
              <div className="absolute -top-[42px] left-1/2 -translate-x-1/2 bg-[#277b8c] text-white text-[13px] font-bold px-3 py-1.5 opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all whitespace-nowrap before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:border-[5px] before:border-transparent before:border-t-[#277b8c] pointer-events-none rounded-sm leading-none flex items-center shadow-sm">
                Quickview
              </div>
            </button>
          </div>
        </div>

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
              onClick={handleAddToCart}
              className="bg-[#277b8c] text-white hover:bg-[#186675] transition-colors px-6 py-2.5 text-[12px] font-bold uppercase flex items-center gap-2 cursor-pointer"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add to Cart
            </button>
            <button
              onClick={handleToggleWishlist}
              className="bg-[#e9ecef] text-[#333] hover:bg-[#dddddd] transition-colors px-4 py-2.5 flex items-center justify-center cursor-pointer"
              title="Add to Wish List"
            >
              <svg width="14" height="14" fill={isWishlisted ? "currentColor" : "none"} stroke={isWishlisted ? "var(--primary)" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              onClick={handleCompare}
              className="bg-[#e9ecef] text-[#333] hover:bg-[#dddddd] transition-colors px-4 py-2.5 flex items-center justify-center cursor-pointer"
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
      <div className="relative block overflow-hidden aspect-square bg-gray-50 border-b border-[#e5e5e5]">
        <Link href={ROUTES.productDetail(product.slug)} className="block w-full h-full">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* NEW Badge top right */}
          {product.isNew && (
            <div className="absolute top-0 right-0 bg-[var(--primary)] text-white text-[10px] font-bold px-2 py-1 z-10">
              NEW
            </div>
          )}
          {product.isOnSale && (
            <div className="absolute top-0 right-0 bg-[var(--accent)] text-white text-[10px] font-bold px-2 py-1 z-10">
              SALE
            </div>
          )}
        </Link>

        {/* Quickview Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
          <button 
            className="w-[50px] h-[50px] shrink-0 rounded-full bg-[#277b8c] text-white hover:bg-[#ffc107] flex items-center justify-center pointer-events-auto transition-colors group/btn relative shadow-md border-none outline-none cursor-pointer"
            aria-label="Quickview"
            onClick={(e) => {
              e.preventDefault();
              setIsQuickviewOpen(true);
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <path d="M12 5v14M5 12h14" />
            </svg>
            
            {/* Tooltip */}
            <div className="absolute -top-[42px] left-1/2 -translate-x-1/2 bg-[#277b8c] text-white text-[13px] font-bold px-3 py-1.5 opacity-0 invisible group-hover/btn:opacity-100 group-hover/btn:visible transition-all whitespace-nowrap before:content-[''] before:absolute before:-bottom-2 before:left-1/2 before:-translate-x-1/2 before:border-[5px] before:border-transparent before:border-t-[#277b8c] pointer-events-none rounded-sm leading-none flex items-center shadow-sm">
              Quickview
            </div>
          </button>
        </div>
      </div>

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
          onClick={handleAddToCart}
          className="flex-1 flex justify-center items-center gap-2 px-3 py-2 text-xs font-bold bg-[#277b8c] hover:bg-[#186675] transition-colors cursor-pointer"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Add To Cart
        </button>
        <button
          onClick={handleToggleWishlist}
          className="px-3 py-2 border-l border-white/20 bg-[#277b8c] hover:bg-[var(--primary-dark)] text-white hover:text-[#ffc107] transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Toggle Wishlist"
        >
          <svg width="14" height="14" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Quickview Modal */}
      {isMounted && (
        <QuickviewModal 
          product={product}
          isOpen={isQuickviewOpen}
          onClose={() => setIsQuickviewOpen(false)}
        />
      )}
    </div>
  );
}
