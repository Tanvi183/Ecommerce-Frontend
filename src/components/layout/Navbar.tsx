"use client";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "ALL PRODUCTS",  href: ROUTES.products },
  { 
    label: "WALLPAPER",     
    href: ROUTES.wallpaper,
    subLinks: [
      { label: "3D Wallpaper", href: "/category/3d-wallpaper" },
      { label: "Brick Wallpaper", href: "/category/brick-wallpaper" },
      { label: "Colour Bank Tesla", href: "/category/colour-bank-tesla" },
      { label: "European wallpaper", href: "/category/european-wallpaper" },
      { label: "Floral Wallpaper", href: "/category/floral-wallpaper" },
      { label: "Foam Wallpaper", href: "/category/foam-wallpaper" },
      { label: "Geometric Wallpaper", href: "/category/geometric-wallpaper" },
      { label: "Home Wallpaper", href: "/category/home-wallpaper" },
      { label: "Kids Wallpaper", href: "/category/kids-wallpaper" },
      { label: "Metallic Wallpaper", href: "/category/metallic-wallpaper" },
      { label: "P-T VOL-2", href: "/category/p-t-vol-2" },
      { label: "Premium-Textured-wallpaper", href: "/category/premium-textured-wallpaper" },
      { label: "Textured Wallpaper", href: "/category/textured-wallpaper" }
    ]
  },
  { 
    label: "FLOOR ITEM",    
    href: ROUTES.floorItem,
    subLinks: [
      { label: "Artificial Grass", href: "/category/artificial-grass" },
      { label: "Decking Floor", href: "/category/decking-floor" },
      { label: "Floor Carpet", href: "/category/floor-carpet" },
      { label: "Pvc Coil Mats", href: "/category/pvc-coil-mats" },
      { label: "PVC Floor", href: "/category/pvc-floor" },
      { label: "PVC Floor Mats", href: "/category/pvc-floor-mats" },
      { label: "Pvc Vinyl floor mat", href: "/category/pvc-vinyl-floor-mat" },
      { label: "SPC Flooring", href: "/category/spc-flooring" },
      { label: "Wooden Floor", href: "/category/wooden-floor" }
    ]
  },
  { label: "BLIND",         href: ROUTES.blind },
  { label: "OFFER",         href: ROUTES.offers, isOffer: true },
  { label: "GLASS PAPER",   href: ROUTES.glassPaper },
  { 
    label: "WALL PANEL",    
    href: ROUTES.wallPanel,
    subLinks: [
      { label: "3D Wall Panel", href: "/category/3d-wall-panel" },
      { label: "Acoustic Panel", href: "/category/acoustic-panel" },
      { label: "Charcoal Louver Panel", href: "/category/charcoal-louver-panel" },
      { label: "PU Stone Wall Panels", href: "/category/pu-stone-wall-panels" },
      { label: "WPC", href: "/category/wpc" }
    ]
  },
  { label: "KITCHEN ITEM",  href: ROUTES.kitchenItem },
  { label: "ABOUT",         href: ROUTES.about },
  { label: "CONTACT",       href: ROUTES.contact },
];

interface NavbarProps {
  onCartOpen?: () => void;
  onMobileNavOpen?: () => void;
}

export default function Navbar({ onCartOpen, onMobileNavOpen }: NavbarProps) {
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  
  // Hydration-safe store reads
  const [isMounted, setIsMounted] = useState(false);
  const cartTotalItems = useCartStore((state) => state.totalItems);
  const cartTotalPrice = useCartStore((state) => state.totalPrice);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = isMounted ? cartTotalItems : 0;
  const totalPrice = isMounted ? cartTotalPrice : 0;
  const wishlistCount = isMounted ? wishlistItems.length : 0;

  return (
    <header id="main-navbar" className="w-full bg-[var(--background)] border-b border-[var(--border)]">
      {/* ── Top row ── */}
      <div className="bg-[var(--background)] py-4">
        <Container className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Search bar */}
          <div className="flex-1 hidden md:flex max-w-2xl mx-auto">
            <div className="flex w-full border border-[var(--input-border)]">
              <select
                id="search-category-select"
                className="bg-[var(--primary)] text-white text-sm px-4 py-2.5 border-none outline-none cursor-pointer border-r border-[var(--primary-dark)]"
                defaultValue="all"
              >
                <option value="all">All</option>
                <option value="wallpaper">Wallpaper</option>
                <option value="floor">Floor</option>
              </select>
              <input
                id="search-bar-input"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="flex-1 px-4 py-2.5 text-sm outline-none bg-white text-[var(--foreground)] placeholder:text-[#999]"
              />
              <button
                id="search-submit-btn"
                type="submit"
                className="bg-[var(--primary)] text-white px-5 hover:bg-[var(--primary-dark)] transition-colors"
                aria-label="Search"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>

          {/* Utility blocks */}
          <div className="flex items-center gap-6">
            {/* Call */}
            <div className="hidden lg:flex items-center gap-2">
              <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
              </svg>
              <div>
                <div className="text-sm font-bold text-[var(--foreground)] leading-tight">Call Us</div>
                <div className="text-[11px] text-[#666]">01815-407531</div>
              </div>
            </div>

            {/* Wishlist */}
            <Link href={ROUTES.wishlist} className="hidden lg:flex items-center gap-2 group">
              <div className="relative flex items-center mt-1">
                <svg width="26" height="26" fill="none" stroke="#186675" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover:stroke-[var(--primary)] transition-colors">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {/* Overlapping Badge (Always visible, even at 0) */}
                <span className="absolute -top-1 -right-2 bg-[#e11b22] text-white text-[10px] font-bold min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center leading-none border border-white">
                  {wishlistCount}
                </span>
              </div>
              <div className="ml-2">
                <div className="text-sm font-bold text-[#186675] leading-tight group-hover:text-[var(--primary)] transition-colors">Wishlist</div>
                <div className="text-[11px] text-[#666]">Edit Your Wishlist</div>
              </div>
            </Link>

            {/* Account */}
            <div className="hidden lg:flex items-center gap-2 group relative cursor-pointer">
              {/* Account Icon with Arrow */}
              <div className="relative text-[#186675] group-hover:text-[var(--primary)] transition-colors">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {/* Arrow Icon embedded */}
                <div className="absolute -bottom-1 -right-2 bg-white rounded-full p-[2px]">
                  <svg width="14" height="14" fill="none" stroke="#186675" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="m12 8 4 4-4 4" />
                  </svg>
                </div>
              </div>
              <div className="ml-2">
                <div className="text-sm font-bold text-[#186675] leading-tight group-hover:text-[var(--primary)] transition-colors">Account</div>
                <div className="text-[11px] text-[#666]">Login / Register</div>
              </div>

              {/* Hover Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-[160px] bg-[#186675] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded shadow-lg before:content-[''] before:absolute before:-top-2 before:right-6 before:border-4 before:border-transparent before:border-b-[#186675]">
                <Link href={ROUTES.login} className="flex items-center gap-2 px-4 py-3 hover:bg-[#13525e] transition-colors border-b border-[#217584]">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="m12 8 4 4-4 4" />
                  </svg>
                  <span className="font-bold text-[13px]">Login</span>
                </Link>
                <Link href={ROUTES.register} className="flex items-center gap-2 px-4 py-3 hover:bg-[#13525e] transition-colors">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
                  </svg>
                  <span className="font-bold text-[13px]">Register</span>
                </Link>
              </div>
            </div>

            {/* Hamburger for mobile */}
            <button onClick={onMobileNavOpen} className="lg:hidden p-2 text-[#666]">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </Container>
      </div>

      {/* ── Nav links row ── */}
      <div className="hidden lg:block bg-white border-t border-[var(--border)] relative">
        <Container className="flex justify-between items-center relative h-12">
          {/* Main Links */}
          <nav className="flex items-center h-full">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="group h-full flex items-center relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "px-4 text-[13px] font-bold transition-colors flex items-center h-full",
                      isActive
                        ? "text-[#dc3545]"
                        : link.isOffer
                          ? "text-[var(--accent)] hover:text-[var(--accent-dark)]"
                          : "text-[#333] group-hover:text-[var(--primary)]"
                    )}
                  >
                    {link.label}
                  </Link>

                  {/* Dropdown Menu */}
                  {link.subLinks && (
                    <div className="absolute top-full left-0 bg-white min-w-[220px] shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 border-t border-[#e5e5e5]">
                      {/* Triangle Pointer */}
                      <div className="absolute -top-2 left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#e5e5e5]"></div>
                      <div className="absolute -top-[7px] left-6 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white"></div>
                      
                      <ul className="py-2">
                        {link.subLinks.map(sub => (
                          <li key={sub.href}>
                            <Link 
                              href={sub.href}
                              className="block px-5 py-2.5 text-[14px] text-[#004f7b] hover:text-[#277b8c] hover:bg-[#f8f9fa] transition-colors"
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Cart Block */}
          <div className="flex items-center h-full border-l border-[var(--border)] pl-4 ml-4">
            <span className="text-[13px] font-bold text-[#333] mr-4">
              {cartCount} item(s) - {totalPrice}৳
            </span>
            <button 
              onClick={onCartOpen}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white h-full px-5 flex items-center justify-center transition-colors relative"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--destructive)] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </Container>
      </div>
    </header>
  );
}
