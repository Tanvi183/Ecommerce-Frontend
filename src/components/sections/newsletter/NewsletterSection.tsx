"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 800)); // Simulate API call
    setStatus("success");
    setEmail("");
  };

  return (
    <section id="newsletter" className="py-16 bg-[var(--primary)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Get Exclusive Offers & Updates
          </h2>
          <p className="text-white/75 text-base mb-8">
            Subscribe to our newsletter and be the first to know about new arrivals, flash sales, and décor tips.
          </p>
          {status === "success" ? (
            <div className="bg-white/20 text-white rounded-[var(--radius-lg)] px-6 py-4 font-semibold text-lg">
              🎉 You&apos;re subscribed! Thank you.
            </div>
          ) : (
            <form onSubmit={handleSubmit} id="newsletter-form" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                id="newsletter-email-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-[var(--radius)] text-[var(--foreground)] bg-white placeholder:text-[var(--muted-foreground)] outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
              <Button
                id="newsletter-submit"
                type="submit"
                variant="accent"
                size="md"
                loading={status === "loading"}
              >
                Subscribe
              </Button>
            </form>
          )}
          <p className="text-white/50 text-xs mt-4">No spam, ever. Unsubscribe at any time.</p>
        </div>
      </Container>
    </section>
  );
}
