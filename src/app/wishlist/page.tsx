"use client";

import { useWishlistStore } from "@/store/useWishlistStore";
import Container from "@/components/common/Container";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import ProductCard from "@/components/cards/ProductCard";
import { useEffect, useState } from "react";

export default function WishlistPage() {
  const { items } = useWishlistStore();
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
            <span className="text-[#333333]">My Wish List</span>
          </div>
        </Container>
      </div>

      <Container>
        <h1 className="text-[28px] font-bold text-[#333333] mb-6">My Wish List</h1>

        {items.length === 0 ? (
          <div className="bg-white border border-[#e5e5e5] p-12 text-center">
            <p className="text-[#666] mb-6">Your wish list is empty.</p>
            <Link 
              href={ROUTES.products} 
              className="inline-block bg-[var(--primary)] text-white px-6 py-2.5 font-bold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode="grid"
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
