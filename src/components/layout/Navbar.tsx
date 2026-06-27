"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "ALL PRODUCTS",  href: ROUTES.products },
  { label: "WALLPAPER",     href: ROUTES.wallpaper },
  { label: "FLOOR ITEM",    href: ROUTES.floorItem },
  { label: "BLIND",         href: ROUTES.blind },
  { label: "OFFER",         href: ROUTES.offers, isOffer: true },
  { label: "GLASS PAPER",   href: ROUTES.glassPaper },
  { label: "WALL PANEL",    href: ROUTES.wallPanel },
  { label: "KITCHEN ITEM",  href: ROUTES.kitchenItem },
  { label: "ABOUT",         href: ROUTES.about },
  { label: "CONTACT",       href: ROUTES.contact },
];

interface NavbarProps {
  cartCount?: number;
  totalPrice?: number;
  wishlistCount?: number;
  onCartOpen?: () => void;
  onMobileNavOpen?: () => void;
}

export default function Navbar({ cartCount = 0, totalPrice = 0, wishlistCount = 0, onCartOpen, onMobileNavOpen }: NavbarProps) {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

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
              <div className="relative">
                <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover:stroke-[var(--primary)] transition-colors">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--destructive)] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors">Wishlist</div>
                <div className="text-[11px] text-[#666]">Edit Your Wishlist</div>
              </div>
            </Link>

            {/* Account */}
            <Link href={ROUTES.login} className="hidden lg:flex items-center gap-2 group">
              <svg width="24" height="24" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover:stroke-[var(--primary)] transition-colors">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
              <div>
                <div className="text-sm font-bold text-[var(--foreground)] leading-tight group-hover:text-[var(--primary)] transition-colors">Account</div>
                <div className="text-[11px] text-[#666]">Login / Register</div>
              </div>
            </Link>

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
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 text-[13px] font-bold transition-colors flex items-center h-full",
                    isActive
                      ? "text-[#dc3545]"
                      : link.isOffer
                        ? "text-[var(--accent)] hover:text-[var(--accent-dark)]"
                        : "text-[#333] hover:text-[var(--primary)]"
                  )}
                >
                  {link.label}
                </Link>
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
