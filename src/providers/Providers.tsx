"use client";

import QueryProvider from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReduxProvider>
          <QueryProvider>
            {children}
            <Toaster position="bottom-right" richColors />
          </QueryProvider>
        </ReduxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
