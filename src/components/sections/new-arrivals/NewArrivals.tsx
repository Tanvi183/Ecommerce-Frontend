import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "@/components/cards/ProductCard";
import { dummyProducts } from "@/constants/dummyProducts";

const newArrivals = dummyProducts.filter((p) => p.isNew).slice(0, 4);

export default function NewArrivals() {
  return (
    <section id="new-arrivals" className="section-py bg-[var(--muted)]">
      <Container>
        <SectionTitle title="New Arrivals" subtitle="Fresh additions to our collection — just landed" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
