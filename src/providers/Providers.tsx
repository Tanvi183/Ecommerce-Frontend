"use client";

import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
        <Toaster position="bottom-right" richColors />
      </QueryProvider>
    </AuthProvider>
  );
}
