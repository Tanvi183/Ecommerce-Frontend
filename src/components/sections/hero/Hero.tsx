"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Container from "@/components/common/Container";

const SLIDES = [
  "/hero_1.png",
  "/hero_2.png",
  "/hero_3.png"
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="hero-banner" className="w-full">
      {/* Main Banner Slider */}
      <div className="relative w-full aspect-[21/9] md:aspect-[3/1] max-h-[500px] overflow-hidden group">
        {SLIDES.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={src} 
              alt={`Decor Culture Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Overlay text - only show on the first slide or keep static? The reference just had images. We will keep it static over all slides for now, or just on the first. Let's put it on all slides to keep the text visible. */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
              <Image src="/wallpaper_category.png" alt="Logo" width={80} height={80} className="mb-4 rounded-full border-2 border-white object-cover" />
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-2">SKS TOWER</h1>
              <p className="text-white text-sm md:text-lg mb-4">SKS Tower, Shop-97, Level-2, Mohakhali, Dhaka</p>
              <h2 className="text-white text-2xl md:text-4xl font-bold">Decor Culture এসকেএস টাওয়ারে</h2>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Previous slide"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/30 hover:bg-black/60 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Next slide"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      {/* Grey Information Bar underneath */}
      <div className="bg-[#e2e6e9] py-3 border-b border-[#cccccc] overflow-hidden">
        <Container>
          <div className="overflow-hidden w-full">
            <div className="animate-marquee whitespace-nowrap text-[#333333] text-[13px] font-bold inline-block">
              If anyone is interested to see sample book, we send sample book with a skillful person for measurement. For appointment Call: 01815-407531
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If anyone is interested to see sample book, we send sample book with a skillful person for measurement. For appointment Call: 01815-407531
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
