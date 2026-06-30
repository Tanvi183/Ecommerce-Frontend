"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, clearAuth, setIsInitializing } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt silent refresh to get the Access Token using the HttpOnly cookie
        const res = await api.post("/auth/refresh");
        const { accessToken } = res.data;

        // If successful, fetch the user profile
        const userRes = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Store user and token in memory
        setAuth(userRes.data.data, accessToken);
      } catch (error) {
        // If refresh fails (no cookie, expired cookie, etc), ensure we are logged out
        clearAuth();
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, [setAuth, clearAuth, setIsInitializing]);

  return <>{children}</>;
}
