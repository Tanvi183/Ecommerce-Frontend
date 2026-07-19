import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";

const BLOG_POSTS = [
  {
    id: "1",
    title: "Top 5 Wallpaper Trends for 2026",
    excerpt: "Discover the latest trends in interior design. From 3D textures to subtle geometric patterns, see what's shaping homes this year.",
    date: "July 12, 2026",
    category: "Design Trends",
    image: "/wallpaper_category.png",
    slug: "top-5-wallpaper-trends-2026"
  },
  {
    id: "2",
    title: "How to Install Glass Paper Like a Pro",
    excerpt: "A comprehensive step-by-step guide to installing glass paper on your windows for privacy without sacrificing natural light.",
    date: "July 05, 2026",
    category: "DIY Guides",
    image: "/glass_paper_category.png",
    slug: "how-to-install-glass-paper"
  },
  {
    id: "3",
    title: "Choosing the Right Floor Item for High Traffic Areas",
    excerpt: "Not all flooring is created equal. Learn which materials hold up best in busy households and commercial spaces.",
    date: "June 28, 2026",
    category: "Tips & Tricks",
    image: "/product_floor1.png",
    slug: "choosing-right-floor-item"
  },
  {
    id: "4",
    title: "The Magic of Wall Panels in Modern Architecture",
    excerpt: "Wall panels aren't just for traditional offices anymore. See how modern designers are using them to create breathtaking feature walls.",
    date: "June 15, 2026",
    category: "Inspiration",
    image: "/wallpaper_category.png",
    slug: "magic-of-wall-panels"
  }
];

export default function BlogPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Blog Header */}
      <div className="bg-[#186675] py-16 mb-12">
        <Container>
          <div className="text-center">
            <h1 className="text-[32px] md:text-[42px] font-bold text-white mb-4">Our Blog</h1>
            <p className="text-[#cce2e6] text-[15px] md:text-[17px] max-w-2xl mx-auto leading-relaxed">
              Discover the latest trends, DIY guides, and interior design inspiration from our experts to help you transform your space.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              className="bg-white rounded-[12px] overflow-hidden shadow-sm border border-[#e5e5e5] hover:shadow-md transition-shadow group flex flex-col"
            >
              {/* Image Container */}
              <Link href={`/blog/${post.slug}`} className="relative h-[200px] block overflow-hidden bg-gray-100">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-[#e11b22] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {post.category}
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-[#666] text-[12px] mb-3 font-medium">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {post.date}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-[17px] font-bold text-[#186675] mb-2 leading-[1.4] group-hover:text-[#277b8c] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-[#555] text-[13.5px] leading-[1.6] mb-5 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#186675] hover:text-[#e11b22] transition-colors mt-auto"
                >
                  Read More
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
