"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const PROMO_IMAGES = [
  "/wallpaper_category.png",
  "/floor_category.png",
  "/kitchen_category.png",
  "/wallpaper_category.png",
  "/floor_category.png",
  "/kitchen_category.png",
  "/wallpaper_category.png",
  "/floor_category.png",
];

export default function LowerSellingPrices() {
  return (
    <section className="bg-[#d7e5ee] py-16">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="lg:w-1/3">
            <div className="w-4 h-4 bg-[var(--primary)] mb-4"></div>
            <h2 className="text-[#333333] text-2xl font-bold mb-4">New Lower Selling Prices</h2>
            <p className="text-[#555555] text-sm mb-6 leading-relaxed">
              on all products plus special Sale Event. Free Shipping available when applying Free Shipping Coupon on qualified orders. This money-saving combination makes Total Wallcovering a Super Value shopping experience. Designed to save you time and priced to save you money.
            </p>
            <Link 
              href={ROUTES.products}
              className="inline-flex items-center gap-2 border border-[#999999] text-[#333333] px-6 py-2 text-sm font-bold hover:bg-black/5 transition-colors"
            >
              See All Products
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Right Image Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-4 gap-2">
              {PROMO_IMAGES.map((src, i) => (
                <div key={i} className="relative aspect-square bg-gray-200">
                  <Image 
                    src={src} 
                    alt="Promo"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
