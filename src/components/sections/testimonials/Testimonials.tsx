import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Rating from "@/components/ui/Rating";
import { testimonials } from "@/constants/dummyReviews";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-py bg-[var(--muted)]">
      <Container>
        <SectionTitle title="What Our Customers Say" subtitle="Real reviews from happy Décor Culture customers" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((review) => (
            <div
              key={review.id}
              id={`review-${review.id}`}
              className="bg-[var(--card)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)] transition-shadow duration-300"
            >
              {/* Stars */}
              <Rating value={review.rating} showCount={false} size="md" className="mb-3" />

              {/* Quote */}
              <p className="text-[var(--foreground)] text-sm leading-relaxed mb-4 relative">
                <span className="text-4xl text-[var(--primary)]/20 font-serif absolute -top-1 -left-1">&ldquo;</span>
                <span className="relative z-10 pl-3">{review.body}</span>
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[var(--border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white font-bold text-sm">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">{review.userName}</p>
                  <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                    {review.isVerified && <span className="text-[var(--success)]">✓</span>}
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
