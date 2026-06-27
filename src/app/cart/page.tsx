"use client";

import { useCartStore } from "@/store/useCartStore";
import Container from "@/components/common/Container";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12">
      {/* Breadcrumbs */}
      <div className="bg-[#e9ecef] border-b border-[#dddddd] py-3 mb-8">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">Shopping Cart</span>
          </div>
        </Container>
      </div>

      <Container>
        <h1 className="text-[28px] font-bold text-[#333333] mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white border border-[#e5e5e5] p-12 text-center">
            <p className="text-[#666] mb-6">Your shopping cart is empty!</p>
            <Link 
              href={ROUTES.products} 
              className="inline-block bg-[var(--primary)] text-white px-6 py-2.5 font-bold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white border border-[#e5e5e5] overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e5e5e5] bg-[#f8f9fa]">
                      <th className="py-3 px-4 text-[#333] font-bold text-[13px]">Image</th>
                      <th className="py-3 px-4 text-[#333] font-bold text-[13px]">Product Name</th>
                      <th className="py-3 px-4 text-[#333] font-bold text-[13px]">Quantity</th>
                      <th className="py-3 px-4 text-[#333] font-bold text-[13px]">Unit Price</th>
                      <th className="py-3 px-4 text-[#333] font-bold text-[13px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-[#e5e5e5]">
                        <td className="py-4 px-4 w-[100px]">
                          <Link href={ROUTES.productDetail(item.product.slug)}>
                            <div className="relative w-[80px] h-[80px] border border-[#e5e5e5]">
                              <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover p-1" />
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <Link href={ROUTES.productDetail(item.product.slug)} className="text-[var(--primary)] hover:underline text-[14px] font-bold">
                            {item.product.name}
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <input 
                              type="number" 
                              min="1" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                              className="border border-[#ccc] w-[50px] h-[34px] text-center text-[13px] outline-none focus:border-[var(--primary)] mr-2"
                            />
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="bg-[#d9534f] text-white p-2 rounded hover:bg-[#c9302c] transition-colors"
                              title="Remove"
                            >
                              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-[#333] font-bold text-[14px]">
                          {formatPrice(item.price)}
                        </td>
                        <td className="py-4 px-4 text-[#333] font-bold text-[14px]">
                          {formatPrice(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white border border-[#e5e5e5] p-6">
                <h2 className="text-[18px] font-bold text-[#333] mb-4 border-b border-[#e5e5e5] pb-2">Cart Total</h2>
                
                <div className="flex justify-between items-center mb-4 text-[14px] text-[#666]">
                  <span>Sub-Total:</span>
                  <span className="font-bold text-[#333]">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-[16px] text-[#333] border-t border-[#e5e5e5] pt-4">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-[var(--primary)]">{formatPrice(totalPrice)}</span>
                </div>

                <Link 
                  href={ROUTES.checkout} 
                  className="block w-full text-center bg-[var(--primary)] text-white py-3 font-bold uppercase text-[14px] hover:bg-[var(--primary-dark)] transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
