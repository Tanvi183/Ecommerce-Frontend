import Container from "@/components/common/Container";
import ProductSidebar from "@/components/sections/products/ProductSidebar";
import ProductToolbar from "@/components/sections/products/ProductToolbar";
import ProductGrid from "@/components/sections/products/ProductGrid";
import Image from "next/image";
import Link from "next/link";

const FLOOR_ITEM_SUBCATEGORIES = [
  { name: "Artificial Grass", image: "/floor_category.png", href: "/category/artificial-grass" },
  { name: "Decking Floor", image: "/floor_category.png", href: "/category/decking-floor" },
  { name: "Floor Carpet", image: "/floor_category.png", href: "/category/floor-carpet" },
  { name: "Pvc Coil Mats", image: "/floor_category.png", href: "/category/pvc-coil-mats" },
  { name: "PVC Floor", image: "/floor_category.png", href: "/category/pvc-floor" },
  { name: "PVC Floor Mats", image: "/floor_category.png", href: "/category/pvc-floor-mats" },
  { name: "Pvc Vinyl floor mat", image: "/floor_category.png", href: "/category/pvc-vinyl-floor-mat" },
  { name: "SPC Flooring", image: "/floor_category.png", href: "/category/spc-flooring" },
  { name: "Wooden Floor", image: "/floor_category.png", href: "/category/wooden-floor" }
];

export default function FloorItemPage() {
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
            <span className="text-[#333333]">Floor Item</span>
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
          {/* Subcategories Grid */}
          <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {FLOOR_ITEM_SUBCATEGORIES.map((sub) => (
              <Link key={sub.name} href={sub.href} className="block border border-[#e5e5e5] bg-white group hover:border-[#186675] transition-colors">
                <div className="aspect-square relative p-2 border-b border-[#e5e5e5]">
                  <Image 
                    src={sub.image} 
                    alt={sub.name} 
                    fill 
                    className="object-cover p-2"
                  />
                </div>
                <div className="p-2 text-center h-[52px] flex items-center justify-center">
                  <h3 className="text-[13px] text-[#29353e] group-hover:text-[#186675] transition-colors leading-tight">
                    {sub.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <ProductToolbar total={12} />
          <div className="mt-6">
            <ProductGrid />
          </div>
        </div>
      </Container>
    </div>
  );
}
