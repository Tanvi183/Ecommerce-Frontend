"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";

const POPULAR_CATEGORIES = [
  { id: "1", name: "SPC Floor", image: "/floor_category.png" },
  { id: "2", name: "Floor Carpet", image: "/wallpaper_category.png" },
  { id: "3", name: "Wooden Floor", image: "/kitchen_category.png" },
  { id: "4", name: "Vinyl Floor", image: "/floor_category.png" },
];

export default function PopularCategory() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Show 3 items at a time
  const itemsToShow = 3;
  const maxIndex = Math.max(0, POPULAR_CATEGORIES.length - itemsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  return (
    <section className="py-12 bg-[#f8f9fa] overflow-hidden">
      <Container>
        <h2 className="text-center text-2xl font-bold text-[#186675] mb-8">Popular Category</h2>
        
        <div className="relative group/slider">
          {/* Slider track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-4"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
            >
              {POPULAR_CATEGORIES.map(category => (
                <div key={category.id} className="min-w-[calc(33.333%-10.66px)] flex-shrink-0 bg-white group cursor-pointer border border-transparent hover:border-gray-200 transition-colors">
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="bg-[#2c3840] text-white text-center py-2.5 text-[13px] font-bold">
                    {category.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2c3840] text-white flex items-center justify-center shadow-lg border-[4px] border-white hover:bg-[#dc3545] transition-all opacity-0 group-hover/slider:opacity-100 z-10"
            aria-label="Previous slide"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2c3840] text-white flex items-center justify-center shadow-lg border-[4px] border-white hover:bg-[#dc3545] transition-all opacity-0 group-hover/slider:opacity-100 z-10"
            aria-label="Next slide"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-[#186675]" : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide group ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
