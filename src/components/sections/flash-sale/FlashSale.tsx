"use client";

import { useState, useEffect } from "react";
import Container from "@/components/common/Container";
import ProductCard from "@/components/cards/ProductCard";
import { saleProducts, dummyProducts } from "@/constants/dummyProducts";
import { cn } from "@/lib/utils";

const FLASH_PRODUCTS = saleProducts.length >= 4 ? saleProducts : dummyProducts.slice(0, 4);
const END_TIME = Date.now() + 8 * 60 * 60 * 1000; // 8 hours from now

function useCountdown(target: number) {
  const [diff, setDiff] = useState(Math.max(0, target - Date.now()));
  useEffect(() => {
    const t = setInterval(() => setDiff(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(t);
  }, [target]);
  const h  = Math.floor(diff / 3_600_000);
  const m  = Math.floor((diff % 3_600_000) / 60_000);
  const s  = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

function TimeBox({ val, label }: { val: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[var(--secondary)] text-white text-2xl font-bold w-14 h-14 flex items-center justify-center rounded-[var(--radius)] tabular-nums shadow">
        {String(val).padStart(2, "0")}
      </div>
      <span className="text-[10px] text-[var(--muted-foreground)] mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function FlashSale() {
  const [mounted, setMounted] = useState(false);
  const { h, m, s } = useCountdown(END_TIME);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="flash-sale" className="section-py bg-[var(--background)]">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-8">
          <div>
            <span className="inline-block bg-[var(--destructive)] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-2">⚡ Flash Sale</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">Today&apos;s Special Deals</h2>
          </div>
          {/* Countdown */}
          <div className="flex items-end gap-2">
            <TimeBox val={h} label="Hours" />
            <span className="text-2xl font-bold text-[var(--destructive)] pb-5">:</span>
            <TimeBox val={m} label="Mins" />
            <span className="text-2xl font-bold text-[var(--destructive)] pb-5">:</span>
            <TimeBox val={s} label="Secs" />
          </div>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FLASH_PRODUCTS.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </Container>
    </section>
  );
}
