"use client";

import { useState } from "react";
import ProductCard from "@/components/cards/ProductCard";
import { dummyProducts } from "@/constants/dummyProducts";

export default function ProductGrid() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // For demo, we just use the first 12 dummy products
  const products = dummyProducts.slice(0, 12);

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={(p) => console.log("Add to cart", p.name)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10">
        <button className="w-full bg-[#277b8c] hover:bg-[#186675] text-white text-[14px] font-bold py-3 px-4 flex items-center justify-center gap-2 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 019-9" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Load Next Products
        </button>
      </div>
    </div>
  );
}
