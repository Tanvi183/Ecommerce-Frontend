"use client";

import Image from "next/image";

export default function ProductSidebar() {
  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[22px] font-bold text-[#333333]">Filter</h2>
        <button className="bg-[#277b8c] text-white text-[11px] px-2 py-1 rounded flex items-center gap-1 hover:bg-[#186675] transition-colors">
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>
          Clear
        </button>
      </div>

      {/* PRICE */}
      <div className="bg-[#f4f5f7] mb-2">
        <div className="flex justify-between items-center p-3 border-b border-[#e5e5e5] cursor-pointer">
          <span className="text-[13px] text-[#002f4b] font-semibold uppercase">PRICE</span>
          <span className="text-[#dc3545]">↓</span>
        </div>
        <div className="p-4">
          <div className="relative h-1 bg-[#d5d5d5] w-full my-4 rounded">
            <div className="absolute left-0 right-0 h-full bg-[#e32c2b] rounded"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e32c2b] rounded-full shadow cursor-pointer"></div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#e32c2b] rounded-full shadow cursor-pointer"></div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1">
              <input type="text" value="0" readOnly className="w-16 border border-[#e5e5e5] px-2 py-1 text-[13px] text-center bg-white text-[#333]" />
              <span className="text-[15px]">৳</span>
            </div>
            <div className="flex items-center gap-1">
              <input type="text" value="4800" readOnly className="w-16 border border-[#e5e5e5] px-2 py-1 text-[13px] text-center bg-white text-[#333]" />
              <span className="text-[15px]">৳</span>
            </div>
          </div>
        </div>
      </div>

      {/* AVAILABILITY */}
      <div className="bg-[#f4f5f7] mb-2">
        <div className="flex justify-between items-center p-3 border-b border-[#e5e5e5] cursor-pointer">
          <span className="text-[13px] text-[#002f4b] font-semibold uppercase">AVAILABILITY</span>
          <span className="text-[#dc3545]">↓</span>
        </div>
        <div className="p-4 space-y-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-[13px] h-[13px] border-[#d5d5d5] rounded-sm accent-[#277b8c]" />
            <span className="text-[14px] text-[#333333]">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-[13px] h-[13px] border-[#d5d5d5] rounded-sm accent-[#277b8c]" />
            <span className="text-[14px] text-[#333333]">Out of Stock</span>
          </label>
        </div>
      </div>

      {/* SUBCATEGORIES */}
      <div className="bg-[#f4f5f7] mb-2">
        <div className="flex justify-between items-center p-3 border-b border-[#e5e5e5] cursor-pointer">
          <span className="text-[13px] text-[#002f4b] font-semibold uppercase">SUBCATEGORIES</span>
          <span className="text-[#dc3545]">↓</span>
        </div>
        <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#0f6c7a]">
          {["Glass Paper", "Kitchen Item", "Others Feature", "Wall Panel", "Wallpaper", "Another Item"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-10 h-10 border border-[#e5e5e5] bg-white flex-shrink-0">
                {/* Simulated images for design match */}
                <Image src="/glass_paper_category.png" alt={cat} fill className="object-cover p-0.5 opacity-60" />
              </div>
              <span className="text-[14px] text-[#004f7b] group-hover:text-[#277b8c] transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* BRANDS */}
      <div className="bg-[#f4f5f7] mb-2">
        <div className="flex justify-between items-center p-3 border-b border-[#e5e5e5] cursor-pointer">
          <span className="text-[13px] text-[#002f4b] font-semibold uppercase">BRANDS</span>
          <span className="text-[#dc3545]">↓</span>
        </div>
        <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#0f6c7a]">
          {["3D", "Embossed", "Floral", "Home", "Textured", "Modern"].map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative w-10 h-10 border border-[#e5e5e5] bg-white flex-shrink-0">
                <Image src="/wallpaper_category.png" alt={brand} fill className="object-cover p-0.5 opacity-60" />
              </div>
              <span className="text-[14px] text-[#004f7b] group-hover:text-[#277b8c] transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* SIZE */}
      <div className="bg-[#f4f5f7] mb-2">
        <div className="flex justify-between items-center p-3 border-b border-[#e5e5e5] cursor-pointer">
          <span className="text-[13px] text-[#333333] font-semibold uppercase">SIZE</span>
          <span className="text-[#dc3545]">↓</span>
        </div>
        <div className="p-4 space-y-3">
          {["10 fit / 4 fit", "10 fit / 2 Fit"].map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-[13px] h-[13px] border-[#d5d5d5] rounded-sm accent-[#277b8c]" />
              <span className="text-[14px] text-[#333333]">{size}</span>
              <span className="ml-1 bg-[#dc3545] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">31</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
