"use client";

import { useState } from "react";
import Drawer from "@/components/ui/Drawer";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const CATEGORY_LINKS = [
  { label: "All Products",  href: ROUTES.products },
  { label: "Wallpaper",     href: ROUTES.wallpaper },
  { label: "Floor Item",    href: ROUTES.floorItem },
  { label: "Blind",         href: ROUTES.blind },
  { label: "Glass Paper",   href: ROUTES.glassPaper },
  { label: "Wall Panel",    href: ROUTES.wallPanel },
  { label: "Kitchen Item",  href: ROUTES.kitchenItem },
  { label: "Offers",        href: ROUTES.offers, isOffer: true },
];

const MENU_LINKS = [
  { label: "Home", href: "/", isPrimary: true },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Projects", href: "/projects" },
  { label: "Client Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog", isPrimary: true },
  { label: "Compare", href: "/compare", icon: true },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  const [activeTab, setActiveTab] = useState<"CATEGORIES" | "MENU">("MENU");

  return (
    <Drawer open={open} onClose={onClose} side="left" hideHeader={true} width="300px">
      <div className="flex flex-col h-full bg-white">
        {/* Custom Tabs Header */}
        <div className="flex items-center h-[50px] flex-shrink-0">
          <button
            onClick={() => setActiveTab("CATEGORIES")}
            className={cn(
              "flex-1 h-full flex items-center justify-center text-[13px] font-bold tracking-wider transition-colors",
              activeTab === "CATEGORIES" 
                ? "bg-white text-[#333] border-t-2 border-[#186675]" 
                : "bg-[#f2f2f2] text-[#888] border-t-2 border-transparent"
            )}
          >
            CATEGORIES
          </button>
          <button
            onClick={() => setActiveTab("MENU")}
            className={cn(
              "flex-1 h-full flex items-center justify-center text-[13px] font-bold tracking-wider transition-colors",
              activeTab === "MENU" 
                ? "bg-white text-[#333] border-t-2 border-[#186675]" 
                : "bg-[#e8e8e8] text-[#666] border-t-2 border-transparent"
            )}
          >
            MENU
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === "CATEGORIES" ? (
            <nav className="py-2">
              {CATEGORY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center px-5 py-4 text-[14px] font-semibold border-b border-[#f0f0f0] transition-colors hover:bg-gray-50"
                  style={{ color: link.isOffer ? "#e11b22" : "#444" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : (
            <nav className="py-2">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-5 py-4 text-[14px] font-semibold border-b border-[#f0f0f0] transition-colors hover:bg-gray-50 hover:text-[#186675]",
                    link.isPrimary ? "text-[#186675]" : "text-[#444]"
                  )}
                >
                  {link.icon && (
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-[#666]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  )}
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-5 border-t border-[#f0f0f0] flex gap-3 flex-shrink-0 bg-white">
          <Link href={ROUTES.login} onClick={onClose} className="flex-1 text-center bg-[#186675] text-white py-2.5 rounded text-[14px] font-semibold hover:bg-[#13505c] transition-colors">Login</Link>
          <Link href={ROUTES.register} onClick={onClose} className="flex-1 text-center border-2 border-[#186675] text-[#186675] py-2.5 rounded text-[14px] font-semibold hover:bg-[#186675] hover:text-white transition-colors">Register</Link>
        </div>
      </div>
    </Drawer>
  );
}
