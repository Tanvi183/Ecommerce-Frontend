"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";

export default function ProfilePage() {
  const { isAuthenticated, user, clearAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await import("@/lib/api").then((m) => m.default.post("/auth/logout"));
    } catch (e) {}
    clearAuth();
    router.push(ROUTES.login);
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[70vh] py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] text-[#696973] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="mx-2">»</span>
          <span className="text-[#333]">My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#efefef] p-0 overflow-hidden">
              <div className="bg-[#186675] px-5 py-3">
                <h2 className="text-[14px] font-bold text-white uppercase tracking-wider">My Account</h2>
              </div>
              <nav className="flex flex-col text-[14px]">
                <Link href={ROUTES.profile} className="px-5 py-3 border-b border-[#efefef] text-[#186675] font-bold bg-[#f0f7f8] hover:bg-[#e6f2f4] transition-colors">
                  Account Dashboard
                </Link>
                <Link href={ROUTES.orders} className="px-5 py-3 border-b border-[#efefef] text-[#444] hover:text-[#186675] hover:bg-[#f8f9fa] transition-colors">
                  Order History
                </Link>
                <Link href={ROUTES.wishlist} className="px-5 py-3 border-b border-[#efefef] text-[#444] hover:text-[#186675] hover:bg-[#f8f9fa] transition-colors">
                  Wishlist
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-3 text-left text-[#d9534f] hover:bg-[#fff5f5] transition-colors font-bold"
                >
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Welcome Card */}
            <div className="bg-white border border-[#efefef] p-6">
              <h1 className="text-[22px] font-bold text-[#333] mb-2">
                Hello, <span className="text-[#186675]">{user.name}</span>!
              </h1>
              <p className="text-[14px] text-[#666]">
                Welcome to your account dashboard. From here you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
              </p>
            </div>

            {/* Account Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Account Details Card */}
              <div className="bg-white border border-[#efefef]">
                <div className="bg-[#f8f9fa] border-b border-[#efefef] px-5 py-3 flex items-center justify-between">
                  <h2 className="text-[14px] font-bold text-[#333] uppercase">Account Details</h2>
                  <Link href="/profile/edit" className="text-[12px] text-[#186675] hover:underline font-bold">Edit</Link>
                </div>
                <div className="p-5 space-y-2 text-[14px]">
                  <div className="flex gap-2">
                    <span className="text-[#666] w-[80px]">Name:</span>
                    <span className="text-[#333] font-bold">{user.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#666] w-[80px]">Email:</span>
                    <span className="text-[#333]">{user.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[#666] w-[80px]">Role:</span>
                    <span className="text-[#186675] font-bold capitalize">{user.role?.toLowerCase()}</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Card */}
              <div className="bg-white border border-[#efefef]">
                <div className="bg-[#f8f9fa] border-b border-[#efefef] px-5 py-3 flex items-center justify-between">
                  <h2 className="text-[14px] font-bold text-[#333] uppercase">Recent Orders</h2>
                  <Link href={ROUTES.orders} className="text-[12px] text-[#186675] hover:underline font-bold">View All</Link>
                </div>
                <div className="p-5 text-[14px] text-[#666] flex items-center justify-center min-h-[80px]">
                  You have not placed any orders yet.
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href={ROUTES.products} className="bg-white border border-[#efefef] p-5 flex flex-col items-center gap-3 hover:border-[#186675] transition-colors group">
                <svg width="32" height="32" fill="none" stroke="#186675" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="text-[14px] font-bold text-[#333] group-hover:text-[#186675] transition-colors">Browse Products</span>
              </Link>
              <Link href={ROUTES.wishlist} className="bg-white border border-[#efefef] p-5 flex flex-col items-center gap-3 hover:border-[#186675] transition-colors group">
                <svg width="32" height="32" fill="none" stroke="#186675" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span className="text-[14px] font-bold text-[#333] group-hover:text-[#186675] transition-colors">My Wishlist</span>
              </Link>
              <Link href={ROUTES.orders} className="bg-white border border-[#efefef] p-5 flex flex-col items-center gap-3 hover:border-[#186675] transition-colors group">
                <svg width="32" height="32" fill="none" stroke="#186675" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span className="text-[14px] font-bold text-[#333] group-hover:text-[#186675] transition-colors">My Orders</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
