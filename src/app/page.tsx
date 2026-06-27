import Hero from "@/components/sections/hero/Hero";
import CategoriesSection from "@/components/sections/categories/CategoriesSection";
import PopularCategory from "@/components/sections/categories/PopularCategory";
import FeaturedProducts from "@/components/sections/featured/FeaturedProducts";
import LowerSellingPrices from "@/components/sections/promo/LowerSellingPrices";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoriesSection />
      <PopularCategory />
      <FeaturedProducts />
      <LowerSellingPrices />
    </main>
  );
}
