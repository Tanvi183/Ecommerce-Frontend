"use client";

import React from "react";
import Link from "next/link";
import { dummyCategories } from "@/constants/dummyCategories";

interface CategoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoryDrawer({ isOpen, onClose }: CategoryDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-2xl flex flex-col`}
      >
        {/* Header */}
        <div className="bg-[#186675] text-white flex items-center justify-between px-5 h-[60px] flex-shrink-0">
          <div className="flex items-center gap-3 font-bold text-[16px]">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            All Categories
          </div>
          <button onClick={onClose} className="p-1 hover:bg-[#13505c] rounded transition-colors">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Categories List */}
        <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
          {dummyCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              onClick={onClose}
              className="block px-5 py-3.5 text-[15px] text-[#333] hover:text-[#186675] hover:bg-gray-50 border-b border-gray-100 transition-colors font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Bottom Settings Icon (Like Reference Image) */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex-shrink-0">
          <button className="bg-[#186675] w-[40px] h-[40px] rounded-full flex items-center justify-center text-white hover:bg-[#13505c] transition-colors shadow-md">
             <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
