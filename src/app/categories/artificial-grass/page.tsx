import Container from "@/components/common/Container";
import ProductSidebar from "@/components/sections/products/ProductSidebar";
import ProductToolbar from "@/components/sections/products/ProductToolbar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export const metadata = {
  title: "Artificial Grass in Bangladesh | Premium Quality",
  description: "High Quality artificial grass in bangladesh! Artificial grass, also known as synthetic turf, is a popular alternative to natural grass for landscaping and sports fields.",
};

export default function ArtificialGrassPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12">
      {/* Breadcrumbs */}
      <div className="bg-[#e9ecef] border-b border-[#dddddd] py-3">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <Link href={ROUTES.floorItem} className="hover:text-[var(--primary)] transition-colors">
              Floor Item
            </Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">Artificial Grass</span>
          </div>
        </Container>
      </div>

      <Container className="mt-6 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <div className="w-full md:w-[250px] flex-shrink-0">
          <ProductSidebar />
        </div>

        {/* Right Content Area */}
        <div className="flex-1">
          {/* SEO Content / Description */}
          <div className="bg-white border border-[#e5e5e5] p-6 mb-6">
            <h1 className="text-[20px] font-bold text-[#333] mb-3">
              Best Artificial Grass in bangladesh. Replace your old carpet with something new, vibrant grass
            </h1>
            <p className="text-[14px] text-[#666] leading-relaxed">
              <strong>High Quality artificial grass in bangladesh!</strong> Artificial grass, also known as synthetic turf, is a popular alternative to natural grass for landscaping and sports fields. Made from synthetic fibers that mimic the look and feel of real grass, artificial grass offers several benefits over natural grass.
            </p>
          </div>

          <ProductToolbar total={15} />
          <div className="mt-6">
            <ProductGrid />
          </div>
        </div>
      </Container>
    </div>
  );
}
