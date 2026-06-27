import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import { dummyBrands } from "@/constants/dummyBrands";

export default function BrandsSection() {
  return (
    <section id="brands" className="py-12 bg-[var(--background)]">
      <Container>
        <SectionTitle title="Trusted Brands" subtitle="We stock products from the world's leading décor manufacturers" />
        <div className="flex flex-wrap justify-center gap-6">
          {dummyBrands.map((brand) => (
            <Link
              key={brand.id}
              href={brand.href || "#"}
              id={`brand-${brand.id}`}
              className="relative w-28 h-16 bg-[var(--muted)] rounded-[var(--radius)] overflow-hidden flex items-center justify-center px-4 grayscale hover:grayscale-0 hover:shadow-[var(--shadow)] transition-all duration-300"
              title={brand.name}
            >
              <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" sizes="112px" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
