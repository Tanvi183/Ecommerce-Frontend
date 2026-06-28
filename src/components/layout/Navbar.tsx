"use client";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { ROUTES } from "@/constants/routes";
import { cn, formatPrice } from "@/lib/utils";

const NAV_LINKS = [
  { label: "ALL PRODUCTS", href: ROUTES.products },
  {
    label: "WALLPAPER",
    href: ROUTES.wallpaper,
    subLinks: [
      { label: "3D Wallpaper", href: "/categories/3d-wallpaper" },
      { label: "Brick Wallpaper", href: "/categories/brick-wallpaper" },
      { label: "Colour Bank Tesla", href: "/categories/colour-bank-tesla" },
      { label: "European wallpaper", href: "/categories/european-wallpaper" },
      { label: "Floral Wallpaper", href: "/categories/floral-wallpaper" },
      { label: "Foam Wallpaper", href: "/categories/foam-wallpaper" },
      { label: "Geometric Wallpaper", href: "/categories/geometric-wallpaper" },
      { label: "Korean Wallpaper", href: "/categories/korean-wallpaper" },
      { label: "PVC Wallpaper", href: "/categories/pvc-wallpaper" },
      { label: "Stone Wallpaper", href: "/categories/stone-wallpaper" },
      { label: "Textured Wallpaper", href: "/categories/textured-wallpaper" },
      { label: "Vinyl Wallpaper", href: "/categories/vinyl-wallpaper" },
      { label: "Wooden Wallpaper", href: "/categories/wooden-wallpaper" }
    ]
  },
  {
    label: "FLOOR ITEM",
    href: ROUTES.floorItem,
    subLinks: [
      { label: "Artificial Grass", href: "/categories/artificial-grass" },
      { label: "Decking Floor", href: "/categories/decking-floor" },
      { label: "Floor Carpet", href: "/categories/floor-carpet" },
      { label: "Floor Mat", href: "/categories/floor-mat" },
      { label: "Floor Runner", href: "/categories/floor-runner" },
      { label: "Rubber Floor", href: "/categories/rubber-floor" },
      { label: "SPC Floor", href: "/categories/spc-floor" },
      { label: "Vinyl Floor", href: "/categories/vinyl-floor" }
    ]
  },
  { label: "BLIND", href: ROUTES.blind },
  { label: "OFFER", href: ROUTES.offers, isOffer: true },
  { label: "GLASS PAPER", href: ROUTES.glassPaper },
  {
    label: "WALL PANEL",
    href: ROUTES.wallPanel,
    subLinks: [
      { label: "Acoustic Panel", href: "/categories/acoustic-panel" },
      { label: "Charcoal Louver Panel", href: "/categories/charcoal-louver-panel" },
      { label: "PU Stone Wall Panels", href: "/categories/pu-stone-wall-panels" },
      { label: "WPC", href: "/categories/wpc" }
    ]
  },
  { label: "KITCHEN ITEM", href: ROUTES.kitchenItem },
  {
    label: "OTHERS FEATURE",
    href: "/others-feature",
    subLinks: [
      { label: "Artifical Plant", href: "/categories/artifical-plant" },
      { label: "Flexible Soft Stone", href: "/categories/flexible-soft-stone" },
      { label: "Glass Workshop", href: "/categories/glass-workshop" },
      { label: "Metal Workshop", href: "/categories/metal-workshop" },
      { label: "Service", href: "/categories/service" },
      { label: "Steel Strips", href: "/categories/steel-strips" },
      { label: "Table Cover Protector", href: "/categories/table-cover-protector" },
      { label: "Wall Moulding", href: "/categories/wall-moulding" },
      { label: "Wall Shelf", href: "/categories/wall-shelf" },
      { label: "Water Fountain", href: "/categories/water-fountain" }
    ]
  },
  { label: "ABOUT", href: ROUTES.about },
  { label: "CONTACT", href: ROUTES.contact },
];

interface NavbarProps {
  onCartOpen?: () => void;
  onMobileNavOpen?: () => void;
}

export default function Navbar({ onCartOpen, onMobileNavOpen }: NavbarProps) {
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const pathname = usePathname();

  // Hydration-safe store reads
  const [isMounted, setIsMounted] = useState(false);
  const cartTotalItems = useCartStore((state) => state.totalItems);
  const cartTotalPrice = useCartStore((state) => state.totalPrice);
  const cartItemsStore = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const wishlistItems = useWishlistStore((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = isMounted ? cartTotalItems : 0;
  const totalPrice = isMounted ? cartTotalPrice : 0;
  const cartItems = isMounted ? cartItemsStore : [];
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
          <div className="flex-1 hidden md:flex max-w-2xl mx-auto px-4 xl:px-8">
            <div className="flex w-full h-[40px] rounded-[12px] overflow-hidden">
              {/* Custom Category Dropdown */}
              <div className="relative h-full flex-shrink-0 group z-50">
                <div className="h-full bg-[#186675] text-white text-[14px] pl-5 pr-8 flex items-center cursor-pointer">
                  {searchCategory}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white">
                    <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-[8px] w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-[#186675] shadow-xl relative rounded-sm">
                    {/* Triangle Pointer */}
                    <div className="absolute -top-[6px] left-6 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-[#186675]"></div>

                    <ul className="py-2">
                      {["All", "Blind", "Floor Item", "Glass Paper", "Kitchen Item", "Others Feature", "Wall Panel", "Wallpaper"].map(cat => (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => setSearchCategory(cat)}
                            className="w-full text-left px-5 py-2.5 text-[14px] text-white hover:bg-[#155a68] transition-colors"
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Input */}
              <input
                id="search-bar-input"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search here..."
                className="flex-1 h-full px-5 text-[14px] outline-none bg-[#f4f6f8] text-[#333] placeholder:text-[#666]"
              />

              {/* Submit Button */}
              <button
                id="search-submit-btn"
                type="submit"
                className="h-full bg-[#186675] text-white px-6 hover:bg-[#13525e] transition-colors flex items-center justify-center"
                aria-label="Search"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
            </div>
          </div>

          {/* Utility blocks */}
          <div className="flex items-center gap-6">
            {/* Call */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="text-[#186675]">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  <path d="M14.05 2a9 9 0 0 1 8 7.94" />
                  <path d="M14.05 6A5 5 0 0 1 18 10" />
                </svg>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[15px] font-bold text-[#186675] leading-none mb-1">Call Us</div>
                <div className="text-[13px] text-[#186675] leading-none">01815-407531</div>
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
              <Link href={ROUTES.login} className="relative text-[#186675] group-hover:text-[var(--primary)] transition-colors">
                <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                {/* Arrow Icon embedded */}
                <div className="absolute -bottom-1 -right-2 bg-white rounded-full p-[2px]">
                  <svg width="14" height="14" fill="none" stroke="#186675" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="m12 8 4 4-4 4" />
                  </svg>
                </div>
              </Link>
              <Link href={ROUTES.login} className="ml-2 block">
                <div className="text-sm font-bold text-[#186675] leading-tight group-hover:text-[var(--primary)] transition-colors">Account</div>
                <div className="text-[11px] text-[#666]">Login / Register</div>
              </Link>

              {/* Hover Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-[160px] bg-[#186675] text-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 rounded shadow-lg before:content-[''] before:absolute before:-top-2 before:right-6 before:border-4 before:border-transparent before:border-b-[#186675] after:content-[''] after:absolute after:-top-3 after:left-0 after:w-full after:h-3">
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
      <div className="hidden lg:block bg-white border-t border-b border-[#e5e5e5] relative">
        <Container className="flex justify-between items-center relative h-[50px]">

          {/* Main Links */}
          <nav className="flex-1 flex justify-between items-center h-full pr-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="group h-full flex items-center relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "px-2 xl:px-3 text-[12px] font-sans font-bold transition-colors flex items-center h-full whitespace-nowrap",
                      link.isOffer
                        ? "text-[#e11b22]"
                        : isActive
                          ? "text-[#186675]"
                          : "text-[#333333] group-hover:text-[var(--primary)]"
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
          <div className="flex items-center h-[50px] my-auto pl-4 border-l border-[#e5e5e5] relative group cursor-pointer">
            <div className="pr-4 h-full flex items-center justify-center">
              <span className="text-[14px] font-normal text-[#333]">
                {cartCount} item(s) - {formatPrice(totalPrice)}
              </span>
            </div>
            <Link
              href={ROUTES.cart}
              className="bg-[#277b8c] hover:bg-[#186675] text-white h-[50px] px-4 flex items-center justify-center transition-colors relative"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="4" y="7" width="16" height="14" rx="1.5" />
                <path d="M8 7V5a4 4 0 0 1 8 0v2" />
              </svg>
              {/* Overlapping Badge */}
              <span className="absolute -top-[6px] -right-[6px] bg-[#e11b22] text-white text-[11px] font-bold min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center leading-none border-2 border-white shadow-sm">
                {cartCount}
              </span>
            </Link>

            {/* Cart Dropdown */}
            <div className="absolute top-full left-0 mt-0 w-[350px] bg-[#f8f9fa] shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 border border-[#e5e5e5] before:content-[''] before:absolute before:-top-[8px] before:left-24 before:border-[8px] before:border-transparent before:border-b-[#f8f9fa]">
              {cartCount === 0 ? (
                <div className="p-6 text-center text-[13px] text-[#666]">
                  Your shopping cart is empty!
                </div>
              ) : (
                <>
                  {/* Item List */}
                  <div className="max-h-[300px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 border-b border-[#e5e5e5] bg-white">
                        <Link href={ROUTES.productDetail(item.product.slug)} className="flex-shrink-0 w-[60px] h-[60px] border border-[#e5e5e5] relative">
                          <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover p-1" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={ROUTES.productDetail(item.product.slug)} className="text-[13px] text-[#186675] hover:underline font-bold truncate block">
                            {item.product.name}
                          </Link>
                        </div>
                        <div className="text-[13px] text-[#333]">x {item.quantity}</div>
                        <div className="text-[13px] font-bold text-[#333] w-[60px] text-right">{formatPrice(item.price)}</div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeFromCart(item.id);
                          }}
                          className="text-[#d9534f] hover:text-[#c9302c] transition-colors p-1"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="p-3 bg-[#f8f9fa] border-b border-[#e5e5e5]">
                    <div className="flex justify-end gap-6 mb-2 text-[13px]">
                      <span className="font-bold text-[#333]">Sub-Total</span>
                      <span className="text-[#333] font-bold w-[70px] text-right">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-end gap-6 text-[13px]">
                      <span className="font-bold text-[#333]">Total</span>
                      <span className="text-[#333] font-bold w-[70px] text-right">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="p-3 bg-[#e9ecef] flex gap-2">
                    <Link
                      href={ROUTES.cart}
                      className="flex-1 bg-[#186675] text-white py-2 flex items-center justify-center gap-2 hover:bg-[#13525e] transition-colors text-[13px] font-bold"
                    >
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      View Cart
                    </Link>
                    <Link
                      href={ROUTES.checkout}
                      className="flex-1 bg-[#186675] text-white py-2 flex items-center justify-center gap-2 hover:bg-[#13525e] transition-colors text-[13px] font-bold"
                    >
                      Checkout
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

        </Container>
      </div>
    </header>
  );
}
