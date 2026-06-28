"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCompareStore } from "@/store/useCompareStore";
import { toast } from "sonner";
import CartToast from "./CartToast";
import WishlistToast from "./WishlistToast";
import CompareToast from "./CompareToast";

interface QuickviewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickviewModal({ product, isOpen, onClose }: QuickviewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.thumbnail);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const wishlistItems = useWishlistStore((state) => state.items);
  const toggleCompare = useCompareStore((state) => state.toggleCompare);

  const [isMounted, setIsMounted] = useState(false);
  const [zoomProps, setZoomProps] = useState({ isZoomed: false, x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isWishlisted = isMounted ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    // Ideally addToCart takes a quantity, but for now we just call it
    addToCart(product);
    toast.custom((t) => (
      <CartToast product={product} toastId={t} />
    ), { duration: 3000, position: 'top-right' });
    onClose();
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast.custom((t) => (
      <WishlistToast product={product} toastId={t} />
    ), { duration: 3000, position: 'top-right' });
  };

  const handleCompare = () => {
    toggleCompare(product);
    toast.custom((t) => (
      <CompareToast product={product} toastId={t} />
    ), { duration: 3000, position: 'top-right' });
  };

  // Use unique images for thumbnails, combining thumbnail and other images
  const thumbnails = Array.from(new Set([product.thumbnail, ...(product.images || [])]));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-[900px] max-h-[90vh] overflow-y-auto flex flex-col md:flex-row p-6 md:p-8 gap-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10 cursor-pointer"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Left: Images */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <div
            className="relative aspect-square w-full border border-gray-100 bg-gray-50 overflow-hidden cursor-crosshair group"
            onMouseMove={(e) => {
              const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
              const x = ((e.clientX - left) / width) * 100;
              const y = ((e.clientY - top) / height) * 100;
              setZoomProps({ isZoomed: true, x, y });
            }}
            onMouseLeave={() => setZoomProps({ isZoomed: false, x: 0, y: 0 })}
          >
            <div
              className={`absolute inset-0 z-0 pointer-events-none ${!zoomProps.isZoomed ? 'transition-transform duration-200' : ''}`}
              style={{
                transform: zoomProps.isZoomed ? 'scale(2.5)' : 'scale(1)',
                transformOrigin: `${zoomProps.x}% ${zoomProps.y}%`
              }}
            >
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            {product.isNew && (
              <div className="absolute top-2 right-2 bg-[#277b8c] text-white text-[11px] font-bold px-2 py-1 z-10 pointer-events-none">
                NEW
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {thumbnails.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className={`relative w-[80px] h-[80px] border ${activeImage === img ? 'border-[#277b8c]' : 'border-gray-200'} bg-gray-50 hover:border-[#277b8c] transition-colors cursor-pointer`}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-[22px] font-bold text-[#333] mb-2 pr-6">
            {product.name}
          </h2>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-2.5 h-2.5 rounded-full bg-[#5cb85c]"></div>
            <span className="text-[#5cb85c] text-[12px] font-bold tracking-wider">IN STOCK</span>
          </div>

          <div className="w-full h-px bg-gray-200 mb-6"></div>

          <div className="mb-auto">
            <div className="text-[32px] font-bold text-[#333] leading-none mb-1">
              {formatPrice(product.price)}
            </div>
            <div className="text-[13px] text-gray-500">
              {formatPrice(product.price)} Per - SFT
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-wrap gap-2 mt-8">
            {/* Quantity Control */}
            <div className="flex border border-gray-300 w-[70px] h-[45px] bg-white">
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-full h-full text-center text-sm font-bold text-gray-700 outline-none"
              />
              <div className="flex flex-col border-l border-gray-300">
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 px-1.5 border-b border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" /></svg>
                </button>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 px-1.5 hover:bg-gray-100 flex items-center justify-center text-gray-500"
                >
                  <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[140px] h-[45px] bg-[#277b8c] text-white hover:bg-[#ffc107] flex items-center justify-center gap-2 font-bold text-[13px] transition-colors cursor-pointer"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Add To Cart
            </button>

            {/* Actions */}
            <button
              onClick={handleToggleWishlist}
              className="w-[45px] h-[45px] bg-gray-500 hover:bg-[#ffc107] text-white flex items-center justify-center transition-colors relative group/wishlist cursor-pointer"
            >
              <svg width="16" height="16" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <div className="absolute -top-[36px] left-1/2 -translate-x-1/2 bg-[#277b8c] text-white text-[12px] font-bold px-2.5 py-1.5 opacity-0 invisible group-hover/wishlist:opacity-100 group-hover/wishlist:visible transition-all whitespace-nowrap before:content-[''] before:absolute before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-[4px] before:border-transparent before:border-t-[#277b8c] pointer-events-none rounded-[2px] leading-none shadow-sm z-50">
                Add to Wish List
              </div>
            </button>

            <button
              onClick={handleCompare}
              className="w-[45px] h-[45px] bg-gray-500 hover:bg-[#ffc107] text-white flex items-center justify-center transition-colors relative group/compare cursor-pointer"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8 9h12M20 9l-3-3M20 9l-3 3M16 15H4M4 15l3-3M4 15l3 3" />
              </svg>
              <div className="absolute -top-[36px] left-1/2 -translate-x-1/2 bg-[#277b8c] text-white text-[12px] font-bold px-2.5 py-1.5 opacity-0 invisible group-hover/compare:opacity-100 group-hover/compare:visible transition-all whitespace-nowrap before:content-[''] before:absolute before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-[4px] before:border-transparent before:border-t-[#277b8c] pointer-events-none rounded-[2px] leading-none shadow-sm z-50">
                Compare this Product
              </div>
            </button>

            <Link href={ROUTES.productDetail(product.slug)} className="w-[45px] h-[45px] bg-[#277b8c] hover:bg-[#186675] text-white flex items-center justify-center transition-colors relative group/details cursor-pointer">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
              <div className="absolute -top-[48px] left-1/2 -translate-x-1/2 bg-[#277b8c] text-white text-[12px] font-bold px-2.5 py-1.5 opacity-0 invisible group-hover/details:opacity-100 group-hover/details:visible transition-all whitespace-nowrap before:content-[''] before:absolute before:-bottom-1.5 before:left-1/2 before:-translate-x-1/2 before:border-[4px] before:border-transparent before:border-t-[#277b8c] pointer-events-none rounded-[2px] shadow-sm z-50 text-center leading-[1.2]">
                More<br />Details
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
