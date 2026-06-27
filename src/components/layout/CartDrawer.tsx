"use client";

import Drawer from "@/components/ui/Drawer";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import type { CartItem } from "@/types";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

export default function CartDrawer({ open, onClose, items, totalPrice, onRemove, onUpdateQty }: CartDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} side="right" title={`Cart (${items.length})`} width="380px">
      <div className="flex flex-col h-full">
        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg width="56" height="56" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-4">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <p className="text-[var(--muted-foreground)] font-medium">Your cart is empty</p>
              <Link href={ROUTES.products} onClick={onClose} className="mt-4 text-sm text-[var(--primary)] underline">Browse Products</Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-[var(--muted)] rounded-[var(--radius)]">
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[var(--foreground)] line-clamp-2">{item.product.name}</p>
                  <p className="text-xs font-bold text-[var(--primary)] mt-1">{formatPrice(item.price)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-xs hover:bg-[var(--border)] transition-colors">−</button>
                    <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="w-6 h-6 rounded border border-[var(--border)] flex items-center justify-center text-xs hover:bg-[var(--border)] transition-colors">+</button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors self-start p-1" aria-label="Remove item">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--border)] p-4 space-y-3">
            <div className="flex justify-between text-sm font-bold">
              <span>Total</span>
              <span className="text-[var(--primary)]">{formatPrice(totalPrice)}</span>
            </div>
            <Link href={ROUTES.checkout} onClick={onClose}
              className="block w-full text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white py-3 rounded-[var(--radius)] font-semibold text-sm transition-colors">
              Proceed to Checkout
            </Link>
            <Link href={ROUTES.cart} onClick={onClose}
              className="block w-full text-center border-2 border-[var(--primary)] text-[var(--primary)] py-2.5 rounded-[var(--radius)] font-semibold text-sm hover:bg-[var(--primary)] hover:text-white transition-colors">
              View Cart
            </Link>
          </div>
        )}
      </div>
    </Drawer>
  );
}
