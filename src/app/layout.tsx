import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppWidget from "@/components/common/WhatsAppWidget";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Decor Culture | Premium Wallpaper, Flooring & Interior Decor",
  description:
    "Decor Culture offers premium wallpapers, luxury flooring, elegant window blinds, glass paper, wall panels, kitchen stickers and more. Transform your space with quality interior decor products.",
  keywords: "wallpaper, flooring, window blind, wall panel, glass paper, interior decor, Dhaka",
  openGraph: {
    title: "Decor Culture | Premium Interior Decor",
    description: "Delivering Quality, Ensuring Satisfaction - Shop premium home decor products online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)} suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  );
}
