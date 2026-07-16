"use client";

import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors />
          <ToastContainer position="top-right" autoClose={3000} />
        </QueryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
