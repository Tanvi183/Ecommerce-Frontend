"use client";

import Image from "next/image";
import Container from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

const PROMO_IMAGES = [
  "/wallpaper_category.png",
  "/product_floor1.png",
  "/promo_banner.png",
  "/wallpaper_category.png",
  "/product_floor1.png",
  "/promo_banner.png",
  "/wallpaper_category.png",
  "/product_floor1.png",
];

export default function LowerSellingPrices() {
  return (
    <section className="bg-[#dce6eb] py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Text */}
          <div className="lg:w-1/3">
            <div className="w-4 h-4 bg-[#186675] mb-6"></div>
            <h2 className="text-[#333333] text-2xl md:text-[28px] font-bold mb-6 flex items-center flex-wrap gap-2 leading-tight">
              <span>New</span>
              <span className="bg-[#3b71e1] text-white px-2 py-0.5">Lower Selling Prices</span>
            </h2>
            <p className="text-[#555555] text-[13px] mb-8 leading-relaxed">
              on all products plus special Sale Event. Free Shipping available when applying Free Shipping Coupon on qualified orders. This money-saving combination makes Total Wallcovering a Super Value shopping experience. Designed to save you time and priced to save you money.
            </p>
            <Link 
              href={ROUTES.products}
              className="inline-flex items-center gap-2 border border-gray-300 bg-transparent text-[#333333] px-6 py-2.5 text-[13px] font-bold hover:bg-black/5 transition-colors"
            >
              See All Products
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          {/* Right Image Grid */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {PROMO_IMAGES.map((src, i) => (
                <div key={i} className="relative aspect-square bg-[#f0f0f0] overflow-hidden">
                  <Image 
                    src={src} 
                    alt={`Promo ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
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
