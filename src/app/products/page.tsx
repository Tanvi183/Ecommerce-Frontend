import Link from "next/link";
import Container from "@/components/common/Container";
import ProductSidebar from "@/components/sections/products/ProductSidebar";
import ProductToolbar from "@/components/sections/products/ProductToolbar";
import ProductGrid from "@/components/sections/products/ProductGrid";

export default function ProductsPage() {
  return (
    <div className="bg-white pb-12">
      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-[#eeeeee] py-3 mb-6">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">All Products</span>
          </div>
        </Container>
      </div>

      <Container>
        <h1 className="text-2xl font-bold text-[#333333] mb-6">All Products</h1>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Left Column (Sidebar) */}
          <div className="w-full md:w-1/4 xl:w-1/5 shrink-0">
            <ProductSidebar />
          </div>

          {/* Right Column (Main Content) */}
          <div className="w-full md:w-3/4 xl:w-4/5">
            <ProductToolbar total={24} />
            <ProductGrid />
          </div>
        </div>
      </Container>
    </div>
  );
}
