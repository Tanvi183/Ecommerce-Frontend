"use client";

import Drawer from "@/components/ui/Drawer";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const NAV_LINKS = [
  { label: "Home",          href: ROUTES.home },
  { label: "All Products",  href: ROUTES.products },
  { label: "Wallpaper",     href: ROUTES.wallpaper },
  { label: "Floor Item",    href: ROUTES.floorItem },
  { label: "Blind",         href: ROUTES.blind },
  { label: "Glass Paper",   href: ROUTES.glassPaper },
  { label: "Wall Panel",    href: ROUTES.wallPanel },
  { label: "Kitchen Item",  href: ROUTES.kitchenItem },
  { label: "Offers",        href: ROUTES.offers, isOffer: true },
  { label: "About",         href: ROUTES.about },
  { label: "Contact",       href: ROUTES.contact },
];

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="Menu" width="280px">
      <nav className="py-2">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="flex items-center px-5 py-3.5 text-sm font-medium border-b border-[var(--border)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--primary)]"
            style={{ color: link.isOffer ? "var(--destructive)" : "var(--foreground)" }}
          >
            {link.label}
            <svg className="ml-auto w-4 h-4 text-[var(--muted-foreground)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </nav>
      <div className="p-5 border-t border-[var(--border)] flex gap-3">
        <Link href={ROUTES.login}    onClick={onClose} className="flex-1 text-center bg-[var(--primary)] text-white py-2.5 rounded text-sm font-semibold hover:bg-[var(--primary-dark)] transition-colors">Login</Link>
        <Link href={ROUTES.register} onClick={onClose} className="flex-1 text-center border-2 border-[var(--primary)] text-[var(--primary)] py-2.5 rounded text-sm font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors">Register</Link>
      </div>
    </Drawer>
  );
}
