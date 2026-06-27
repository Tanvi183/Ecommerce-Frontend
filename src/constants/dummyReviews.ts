import type { Review } from "@/types";

export const dummyReviews: Review[] = [
  {
    id: "r1", productId: "p1", userId: "u1",
    userName: "Anika Rahman", userAvatar: undefined,
    rating: 5, title: "Absolutely love it!",
    body: "The wallpaper is stunning. Installation was easy and the quality exceeded my expectations. My living room looks completely transformed!",
    createdAt: "2025-04-12", isVerified: true,
  },
  {
    id: "r2", productId: "p2", userId: "u2",
    userName: "Karim Hassan", userAvatar: undefined,
    rating: 5, title: "Best flooring I've bought",
    body: "Installed it across three rooms. The SPC locking system is perfect, no gaps, and it looks exactly like real wood. Very happy with the purchase.",
    createdAt: "2025-04-18", isVerified: true,
  },
  {
    id: "r3", productId: "p1", userId: "u3",
    userName: "Sumaya Begum", userAvatar: undefined,
    rating: 4, title: "Great quality, fast delivery",
    body: "The soft stone texture is gorgeous. Delivery was within 2 days. Only minor complaint is the packaging could be better but the product itself is perfect.",
    createdAt: "2025-04-20", isVerified: true,
  },
  {
    id: "r4", productId: "p3", userId: "u4",
    userName: "Faisal Chowdhury", userAvatar: undefined,
    rating: 5, title: "Zebra blind changed my room",
    body: "Excellent build quality. The day/night functionality is exactly what I needed for my bedroom. Very smooth and silent operation.",
    createdAt: "2025-05-02", isVerified: false,
  },
  {
    id: "r5", productId: "p8", userId: "u5",
    userName: "Nasrin Akter", userAvatar: undefined,
    rating: 5, title: "Beautiful floral design",
    body: "The botanical pattern is even more beautiful in person than in the photos. Colours are rich and the paste is easy to apply. Highly recommended!",
    createdAt: "2025-05-10", isVerified: true,
  },
  {
    id: "r6", productId: "p5", userId: "u6",
    userName: "Rashed Mahmud", userAvatar: undefined,
    rating: 4, title: "Great privacy film",
    body: "Applied it to my office partition — looks very professional. Adhesion is strong and it's easy to cut to size. Would buy again.",
    createdAt: "2025-05-15", isVerified: true,
  },
];

/** Testimonials — featured reviews for the homepage */
export const testimonials = dummyReviews.filter((r) => r.isVerified && r.rating >= 5);
