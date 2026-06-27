import Container from "@/components/common/Container";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-[#eeeeee] py-3 mb-10">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">About Us</span>
          </div>
        </Container>
      </div>

      <Container>
        <h1 className="text-[28px] font-bold text-[#333333] mb-6">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#666666] text-[14px] leading-[24px]">
          <div>
            <p className="mb-4">
              Interior Product Imported Company in Bangladesh.
            </p>
            <p className="mb-4">
              We import <strong className="text-[#333]">wallpaper</strong> directly from China, Garman and Korea. You will find many types of wallpaper like
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>embossed wallpaper</li>
              <li>3d wallpaper, wall stickers</li>
              <li>floral wallpaper, home wallpaper</li>
            </ul>
          </div>
          
          <div>
            <ul className="list-disc pl-5 mb-6 space-y-1">
              <li>official wallpaper</li>
              <li>geometric wallpaper</li>
              <li>brick wallpaper etc.</li>
            </ul>
            <p>
              We are able to give wallpaper like your demand. We have been working on wallpaper for 16 years. We are provides 5 years fittings guarantee, we have branches all over Bangladesh. We also import Floor item , glass paper , artificial grass ect interior product.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
