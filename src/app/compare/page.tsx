"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useCompareStore } from "@/store/useCompareStore";
import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/types";
import { toast } from "sonner";
import CartToast from "@/components/common/CartToast";

export default function ComparePage() {
  const [isMounted, setIsMounted] = useState(false);
  const compareItems = useCompareStore((state) => state.items);
  const toggleCompare = useCompareStore((state) => state.toggleCompare);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.custom((t) => (
      <CartToast product={product} toastId={t} />
    ), { duration: 3000, position: 'top-right' });
  };

  const handleRemove = (product: Product) => {
    toggleCompare(product);
  };

  if (!isMounted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-[1200px] min-h-[400px]">
        <h1 className="text-2xl font-bold text-[#333] mb-6">Product Comparison</h1>
        <div className="animate-pulse flex gap-4">
          <div className="h-64 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-[1200px]">
      <h1 className="text-[26px] font-bold text-[#333] mb-6">Product Comparison</h1>
      
      {compareItems.length === 0 ? (
        <div className="mb-10">
          <p className="text-[#666] mb-6 text-[13px]">You have not chosen any products to compare.</p>
          <div className="flex justify-end">
            <Link 
              href={ROUTES.home}
              className="bg-[#277b8c] text-white hover:bg-[#186675] transition-colors font-bold text-[13px] px-5 py-2.5 inline-block"
            >
              Continue
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-10">
          <table className="w-full border-collapse border border-[#e5e5e5] min-w-[600px]">
            <thead>
              <tr>
                <td colSpan={compareItems.length + 1} className="bg-[#f5f5f5] text-[#333] font-bold py-2.5 px-3 border border-[#e5e5e5] text-[12px] uppercase">
                  PRODUCT DETAILS
                </td>
              </tr>
            </thead>
            <tbody className="text-[13px] text-[#666]">
              {/* Product Name Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5] w-1/4 min-w-[200px]">Product</td>
                {compareItems.map(item => (
                  <td key={`name-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5] min-w-[250px]">
                    <Link href={ROUTES.productDetail(item.slug)} className="text-[#186675] hover:underline font-bold">
                      {item.name}
                    </Link>
                  </td>
                ))}
              </tr>
              {/* Image Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Image</td>
                {compareItems.map(item => (
                  <td key={`img-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    <div className="relative w-[100px] h-[100px] border border-[#e5e5e5] bg-gray-50">
                      <Image src={item.thumbnail} alt={item.name} fill className="object-contain p-1" />
                    </div>
                  </td>
                ))}
              </tr>
              {/* Price Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Price</td>
                {compareItems.map(item => (
                  <td key={`price-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5] text-[#333]">
                    {formatPrice(item.price)}
                  </td>
                ))}
              </tr>
              {/* Model Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Model</td>
                {compareItems.map(item => (
                  <td key={`model-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    {item.slug.slice(0, 6)}01
                  </td>
                ))}
              </tr>
              {/* Brand Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Brand</td>
                {compareItems.map(item => (
                  <td key={`brand-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    
                  </td>
                ))}
              </tr>
              {/* Availability Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Availability</td>
                {compareItems.map(item => (
                  <td key={`avail-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    In Stock
                  </td>
                ))}
              </tr>
              {/* Rating Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Rating</td>
                {compareItems.map(item => (
                  <td key={`rating-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    <div className="flex gap-0.5 text-gray-300 mb-1">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </div>
                    Based on 0 reviews.
                  </td>
                ))}
              </tr>
              {/* Summary Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Summary</td>
                {compareItems.map(item => (
                  <td key={`desc-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5] align-top leading-relaxed">
                    <p className="line-clamp-4">{item.description || item.name}</p>
                  </td>
                ))}
              </tr>
              {/* Weight Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Weight</td>
                {compareItems.map(item => (
                  <td key={`weight-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    0.00kg
                  </td>
                ))}
              </tr>
              {/* Dimensions Row */}
              <tr>
                <td className="bg-[#f5f5f5] font-bold py-2.5 px-3 border border-[#e5e5e5]">Dimensions (L x W x H)</td>
                {compareItems.map(item => (
                  <td key={`dim-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5]">
                    0.00cm x 0.00cm x 0.00cm
                  </td>
                ))}
              </tr>
              {/* Action Row */}
              <tr>
                <td className="bg-[#f5f5f5] py-2.5 px-3 border border-[#e5e5e5]"></td>
                {compareItems.map(item => (
                  <td key={`action-${item.id}`} className="py-2.5 px-3 border border-[#e5e5e5] bg-[#f5f5f5]">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-[#277b8c] text-white hover:bg-[#186675] font-bold text-[12px] py-2 transition-colors cursor-pointer text-center rounded-[2px]"
                      >
                        Add To Cart
                      </button>
                      <button 
                        onClick={() => handleRemove(item)}
                        className="flex-1 bg-[#d92636] text-white hover:bg-[#c9302c] font-bold text-[12px] py-2 transition-colors cursor-pointer text-center rounded-[2px]"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
