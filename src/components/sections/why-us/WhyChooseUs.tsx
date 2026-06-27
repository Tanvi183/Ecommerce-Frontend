import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";

const FEATURES = [
  { id: "quality",   icon: "🏆", title: "Premium Quality",    desc: "All products are certified and imported from top global manufacturers." },
  { id: "shipping",  icon: "🚚", title: "Fast Delivery",      desc: "Same-day dispatch for in-stock orders. Free shipping over ৳5,000." },
  { id: "returns",   icon: "🔄", title: "Easy Returns",       desc: "30-day hassle-free return policy with full refund guarantee." },
  { id: "payment",   icon: "🔒", title: "Secure Payment",     desc: "100% secure checkout with SSL encryption and multiple payment options." },
  { id: "support",   icon: "💬", title: "Expert Support",     desc: "Get professional advice from our interior décor specialists anytime." },
  { id: "prices",    icon: "💰", title: "Best Prices",        desc: "Competitive pricing and regular flash sales for maximum savings." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-py bg-[var(--secondary)] text-white">
      <Container>
        <SectionTitle
          title="Why Choose Décor Culture?"
          subtitle="We are committed to transforming your space with quality and care"
          className="[&_h2]:text-white [&_p]:text-white/70"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              id={`why-${f.id}`}
              className="flex gap-4 p-6 rounded-[var(--radius-lg)] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[var(--primary)] transition-all duration-300 group"
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">{f.icon}</div>
              <div>
                <h3 className="font-semibold text-white mb-1.5 group-hover:text-[var(--accent)] transition-colors">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
