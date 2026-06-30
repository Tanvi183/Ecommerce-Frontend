"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "@/constants/routes";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, isInitializing } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only redirect if we are fully mounted AND authentication initialization has finished
    if (isMounted && !isInitializing) {
      if (!isAuthenticated) {
        router.replace(ROUTES.login);
      } else if (user?.role !== "ADMIN") {
        router.replace("/");
      }
    }
  }, [isMounted, isInitializing, isAuthenticated, user, router]);

  // Show loading spinner if not mounted, still initializing, or not authenticated/admin
  if (!isMounted || isInitializing || !isAuthenticated || user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#186675] mx-auto"></div>
          <p className="mt-4 text-[#666]">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
