"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import ProductCard from "@/components/cards/ProductCard";
import { dummyProducts } from "@/constants/dummyProducts";

type TabKey = "latest" | "best_rated" | "specials" | "bestsellers";

const TABS: { id: TabKey; label: string }[] = [
  { id: "latest", label: "LATEST" },
  { id: "best_rated", label: "BEST RATED" },
  { id: "specials", label: "SPECIALS" },
  { id: "bestsellers", label: "BESTSELLERS" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<TabKey>("latest");
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Simple filter simulation
  const filteredProducts = dummyProducts.slice(0, 8); // showing 8 items max for grid

  const handleAddToCart = (product: any) => {
    console.log("Add to cart", product);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 bg-white">
      <Container>
        {/* Tabs */}
        <div className="flex justify-center border-b border-gray-200 mb-8">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-bold tracking-wider transition-colors border-b-2 ${
                  isActive
                    ? "text-[var(--primary)] border-[var(--primary)]"
                    : "text-gray-500 border-transparent hover:text-[var(--primary)]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
