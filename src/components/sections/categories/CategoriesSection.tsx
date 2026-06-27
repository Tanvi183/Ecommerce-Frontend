import Container from "@/components/common/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import { dummyCategories } from "@/constants/dummyCategories";

export default function CategoriesSection() {
  return (
    <section className="py-12 bg-[#f8f9fa]">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dummyCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </Container>
    </section>
  );
}
