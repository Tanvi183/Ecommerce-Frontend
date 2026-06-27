"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/types";
import { toast } from "sonner";

interface CartToastProps {
  product: Product;
  toastId: string | number;
}

export default function CartToast({ product, toastId }: CartToastProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded shadow-lg p-4 w-[350px] sm:w-[400px] flex flex-col relative pointer-events-auto">
      {/* Close button */}
      <button 
        onClick={() => toast.dismiss(toastId)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors"
        aria-label="Close"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex gap-4 mb-4 mt-2">
        {/* Thumbnail */}
        <div className="relative w-[80px] h-[80px] border border-[#e5e5e5] flex-shrink-0">
          <Image 
            src={product.thumbnail} 
            alt={product.name} 
            fill 
            className="object-cover p-1"
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 pr-4">
          <h4 className="font-bold text-[#333333] text-[15px] leading-tight mb-2">
            {product.name}
          </h4>
          <p className="text-[#666666] text-[13px] leading-relaxed">
            Success: You have added <br />
            <Link href={ROUTES.productDetail(product.slug)} className="text-[#186675] hover:underline" onClick={() => toast.dismiss(toastId)}>
              {product.name}
            </Link> to your <Link href={ROUTES.cart} className="text-[#186675] hover:underline" onClick={() => toast.dismiss(toastId)}>shopping cart</Link>!
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 w-full">
        <Link 
          href={ROUTES.cart}
          onClick={() => toast.dismiss(toastId)}
          className="flex-1 bg-[#186675] text-white py-2.5 flex items-center justify-center gap-2 hover:bg-[#13525e] transition-colors rounded-sm"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="font-bold text-[13px]">View Cart</span>
        </Link>
        <Link 
          href={ROUTES.checkout}
          onClick={() => toast.dismiss(toastId)}
          className="flex-1 bg-[#5cb85c] text-white py-2.5 flex items-center justify-center gap-2 hover:bg-[#4cae4c] transition-colors rounded-sm"
        >
          <span className="font-bold text-[13px]">Checkout</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
