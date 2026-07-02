"use client";

import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <QueryProvider>
        {children}
        <Toaster position="top-right" richColors />
        <ToastContainer position="top-right" autoClose={3000} />
      </QueryProvider>
    </AuthProvider>
  );
}
