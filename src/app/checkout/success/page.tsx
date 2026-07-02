"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "@/components/common/Container";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isAuthenticated) {
      router.push(ROUTES.home);
    }
  }, [isAuthenticated, router]);

  if (!isMounted) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-2xl mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="text-green-500 w-10 h-10" />
      </div>
      
      <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-4">
        Thank you for your order!
      </h1>
      
      <p className="text-gray-500 text-[15px] mb-8 leading-relaxed">
        Your order has been placed successfully and is now being processed. 
        You will receive an email confirmation shortly with your order details.
      </p>

      {orderId && (
        <div className="bg-gray-50 rounded-xl p-4 mb-8 inline-block border border-gray-100">
          <p className="text-[13px] text-gray-500 font-medium mb-1">Order Reference</p>
          <p className="font-mono text-[16px] font-bold text-gray-900">#{orderId.slice(-8).toUpperCase()}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
        <Link 
          href={ROUTES.orders}
          className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          View My Orders <ArrowRight size={16} />
        </Link>
        <Link 
          href={ROUTES.products}
          className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 px-8 py-3.5 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <ShoppingBag size={16} /> Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-[80vh] flex items-center py-12">
      <Container>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#186675]"></div>
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </Container>
    </div>
  );
}
