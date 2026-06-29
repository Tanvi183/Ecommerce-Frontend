"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import Button from "@/components/ui/Button";

export default function OrderHistoryPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="bg-[#f8f9fa] min-h-[70vh] py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] text-[#696973] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="mx-2">»</span>
          <Link href={ROUTES.profile} className="hover:text-[var(--primary)] transition-colors">My Account</Link>
          <span className="mx-2">»</span>
          <span className="text-[#333]">Order History</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#efefef] p-6">
              <h1 className="text-[22px] font-bold text-[#333] mb-6">Order History</h1>
              
              <div className="text-[14px] text-[#666] flex flex-col items-center justify-center min-h-[200px] border border-[#efefef] bg-[#f8f9fa] p-8 text-center space-y-4">
                <p>You have not made any previous orders!</p>
                <Button 
                  onClick={() => router.push(ROUTES.products)}
                  className="bg-[#186675] hover:bg-[#13505c] text-white"
                >
                  Start Shopping
                </Button>
              </div>

              <div className="flex justify-between items-center pt-4 mt-6 border-t border-[#efefef]">
                <Link href={ROUTES.profile} className="text-[#186675] hover:underline text-[14px] font-bold">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
