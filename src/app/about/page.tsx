import Container from "@/components/common/Container";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-white pb-10 pt-10">
      <Container>
        <h1 className="text-[22px] font-bold text-[#333333] mb-6">About Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-[#333333] text-[13px] leading-[22px]">
          <div>
            <p className="mb-3">
              Interior Product Imported Company in Bangladesh.
            </p>
            <p className="mb-3">
              We import <strong className="font-bold">wallpaper</strong> directly from China, Garman and Korea. You will find many types of wallpaper like
            </p>
            <ul className="list-disc pl-4 space-y-0.5">
              <li>embossed wallpaper</li>
              <li>3d wallpaper, wall stickers</li>
              <li>floral wallpaper, home wallpaper</li>
            </ul>
          </div>
          
          <div>
            <ul className="list-disc pl-4 mb-4 space-y-0.5 mt-0 md:-mt-1">
              <li>official wallpaper</li>
              <li>geometric wallpaper</li>
              <li>brick wallpaper etc.</li>
            </ul>
            <p>
              We are able to give wallpaper like your demand. We have been working on wallpaper for 16 years. We are provides 5 years fittings guarantee, we have branches all over Bangladesh. We also import Floor item , glass paper , artificial grass cct interior product.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
