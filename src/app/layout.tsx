import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/Providers";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  title: "Décor Culture | Premium Wallpaper, Flooring & Interior Decor",
  description:
    "Décor Culture offers premium wallpapers, luxury flooring, elegant window blinds, glass paper, wall panels, kitchen stickers and more. Transform your space with quality interior décor products.",
  keywords: "wallpaper, flooring, window blind, wall panel, glass paper, interior décor, Dhaka",
  openGraph: {
    title: "Décor Culture | Premium Interior Décor",
    description: "Delivering Quality, Ensuring Satisfaction — Shop premium home décor products online.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(inter.variable, poppins.variable)} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
