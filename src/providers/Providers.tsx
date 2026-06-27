"use client";

import QueryProvider from "./QueryProvider";
import ReduxProvider from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
