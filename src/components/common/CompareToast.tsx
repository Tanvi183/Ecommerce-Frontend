"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { Product } from "@/types";
import { toast } from "sonner";

interface CompareToastProps {
  product: Product;
  toastId: string | number;
}

export default function CompareToast({ product, toastId }: CompareToastProps) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded shadow-lg p-4 w-[350px] sm:w-[400px] flex flex-col relative pointer-events-auto">
      {/* Close button */}
      <button 
        onClick={() => toast.dismiss(toastId)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        aria-label="Close"
      >
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="relative w-[80px] h-[80px] border border-[#e5e5e5] flex-shrink-0 mt-1">
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
            <Link href={ROUTES.productDetail(product.slug)} className="text-[#186675] hover:underline cursor-pointer" onClick={() => toast.dismiss(toastId)}>
              {product.name}
            </Link> to your <span className="font-semibold cursor-default">product comparison</span>!
          </p>
        </div>
      </div>
    </div>
  );
}
