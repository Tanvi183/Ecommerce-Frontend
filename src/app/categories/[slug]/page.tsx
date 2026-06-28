import Container from "@/components/common/Container";
import ProductSidebar from "@/components/sections/products/ProductSidebar";
import ProductToolbar from "@/components/sections/products/ProductToolbar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import Link from "next/link";
import { dummyCategories } from "@/constants/dummyCategories";

// Fallback dynamic route for categories that don't have a specific static page

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = dummyCategories.find(c => c.slug === resolvedParams.slug);
  return {
    title: `${category?.name || 'Category'} | Premium Quality`,
    description: `Explore our collection of ${category?.name || 'premium products'}.`,
  };
}

export default async function CategoryDynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const category = dummyCategories.find(c => c.slug === resolvedParams.slug);
  const categoryName = category?.name || resolvedParams.slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

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
            <span className="text-[#333333]">{categoryName}</span>
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
          <div className="bg-white border border-[#e5e5e5] p-6 mb-6">
            <h1 className="text-[20px] font-bold text-[#333] mb-3">
              {categoryName}
            </h1>
            <p className="text-[14px] text-[#666] leading-relaxed">
              Explore our extensive collection of {categoryName}. We offer premium quality products to suit all your interior and exterior design needs.
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
