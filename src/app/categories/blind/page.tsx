import Container from "@/components/common/Container";
import ProductSidebar from "@/components/sections/products/ProductSidebar";
import ProductToolbar from "@/components/sections/products/ProductToolbar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import Link from "next/link";

export default function BlindPage() {
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
            <span className="text-[#333333]">Blind</span>
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
          <ProductToolbar total={12} />
          <div className="mt-6">
            <ProductGrid />
          </div>
        </div>
      </Container>
    </div>
  );
}
