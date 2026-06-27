import Link from "next/link";
import Container from "@/components/common/Container";
import { ROUTES } from "@/constants/routes";

export default function Footer() {
  return (
    <footer className="bg-[var(--footer-bg)] text-[#cccccc] pt-12">
      <Container className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Facebook Widget Mock & Socials */}
          <div>
            <div className="bg-white rounded-sm overflow-hidden mb-6 max-w-[280px]">
              <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-[var(--footer-bg)] rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold text-center leading-none">Decor<br/>Culture</span>
                </div>
                <div>
                  <div className="text-[#385898] font-bold text-sm leading-tight hover:underline cursor-pointer">Decor Culture</div>
                  <div className="text-xs text-gray-500">80,176 followers</div>
                </div>
              </div>
              <div className="bg-gray-50 p-2 flex gap-2">
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold py-1 px-2 flex justify-center items-center gap-1 border border-gray-300">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  Follow Page
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold py-1 px-2 flex justify-center items-center gap-1 border border-gray-300">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M15 10l5 5-5 5v-3c-7 0-11-2-14-7 3.5 2 7 2 14 2v-3z"/></svg>
                  Share
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] text-white">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] text-white">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zm1.5-4.87h.01M6.5 6.5h11A4.5 4.5 0 0 1 22 11v6A4.5 4.5 0 0 1 17.5 21.5h-11A4.5 4.5 0 0 1 2 17v-6A4.5 4.5 0 0 1 6.5 6.5z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center hover:bg-[var(--primary-dark)] text-white">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: My Account */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">My Account</h4>
            <ul className="space-y-4">
              <li><Link href={ROUTES.profile} className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href={ROUTES.contact} className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href={ROUTES.orders} className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Service */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Service</h4>
            <ul className="space-y-4">
              <li><Link href={ROUTES.wallpaper} className="hover:text-white transition-colors">Wallpaper</Link></li>
              <li><Link href={ROUTES.floorItem} className="hover:text-white transition-colors">Floor Item</Link></li>
              <li><Link href={ROUTES.blind} className="hover:text-white transition-colors">Blind</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Brands</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Newsletter</h4>
            <p className="mb-4 text-sm leading-relaxed">
              Don&apos;t miss any updates or promotions by signing up to our newsletter.
            </p>
            <form className="mb-4 flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="w-full bg-white text-gray-800 px-3 py-2 text-sm outline-none"
                required
              />
              <button 
                type="submit" 
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 flex items-center gap-2 text-sm transition-colors"
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Send
              </button>
            </form>
            <label className="flex items-start gap-2 cursor-pointer text-xs">
              <input type="checkbox" className="mt-0.5" required />
              <span>I have read and agree to the <a href="#" className="underline">Privacy Policy</a></span>
            </label>
          </div>

        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-4 py-4 bg-[#212b32]">
        <Container className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>Copyright © 2025, Décor Culture, All Rights Reserved</p>
          <div className="flex gap-2">
            {["VISA", "MC", "PAYPAL", "AMEX"].map(p => (
              <span key={p} className="bg-gray-400 text-white px-2 py-0.5 rounded-sm font-bold text-[9px]">{p}</span>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  );
}
