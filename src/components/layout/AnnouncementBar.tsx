"use client";

import Link from "next/link";
import Container from "@/components/common/Container";

export default function AnnouncementBar() {
  return (
    <div
      id="announcement-bar"
      className="bg-[var(--secondary)] text-white text-center py-2 text-xs sm:text-sm font-medium"
      style={{ minHeight: "var(--announcement-height)" }}
    >
      <Container className="flex items-center justify-center gap-4">
        <span>🎉 Free Shipping on orders over ৳5,000</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <Link href="/offers" className="hidden sm:inline underline underline-offset-2 hover:text-[var(--accent)] transition-colors">
          View Current Offers →
        </Link>
      </Container>
    </div>
  );
}
