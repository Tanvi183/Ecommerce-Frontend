import Container from "@/components/common/Container";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-12">
      {/* Breadcrumbs */}
      <div className="bg-[#e9ecef] border-b border-[#dddddd] py-3 mb-10">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">Contact Us</span>
          </div>
        </Container>
      </div>

      <Container>
        {/* Info Cards Grid */}
        <div className="bg-[#e9ecef] p-8 md:p-12 mb-10 border border-[#dddddd]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
            
            {/* Store Address Dhaka */}
            <div className="flex gap-4">
              <div className="text-[var(--primary)] flex-shrink-0 mt-1">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#333] text-[15px] mb-2 uppercase">Store Address Dhaka</h3>
                <div className="text-[13px] text-[#666] leading-relaxed">
                  SKS Tower, Shop-97, Level-2,<br />
                  (Mosjid Goli-1st Row),<br />
                  Railgate,<br />
                  Mohakhali, Dhaka
                </div>
              </div>
            </div>

            {/* Store Address Chittagong */}
            <div className="flex gap-4">
              <div className="text-[var(--primary)] flex-shrink-0 mt-1">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#333] text-[15px] mb-2 uppercase">Store Address Chittagong</h3>
                <div className="text-[13px] text-[#666] leading-relaxed">
                  3041/ 3042,(3rd floor) Stadium Shopping Complex,<br />
                  ( Opposite of biman office).<br />
                  Kazir dewri, Chittagong<br />
                  +880 1912-093060
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex gap-4">
              <div className="text-[var(--primary)] flex-shrink-0 mt-1">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#333] text-[15px] mb-2 uppercase">Call Us</h3>
                <div className="text-[13px] text-[#666] leading-relaxed">
                  01624641267<br />
                  01960546090
                </div>
              </div>
            </div>

            {/* Store Hours */}
            <div className="flex gap-4">
              <div className="text-[var(--primary)] flex-shrink-0 mt-1">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#333] text-[15px] mb-2 uppercase">Store Hours</h3>
                <div className="text-[13px] text-[#666] leading-relaxed">
                  Saturday to Thursday<br />
                  Opening Hour: 10:00 am – 10:00 pm
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 md:col-span-2">
              <div className="text-[var(--primary)] flex-shrink-0 mt-1">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-[#333] text-[15px] mb-2 uppercase">Email</h3>
                <div className="text-[13px] text-[#666] leading-relaxed">
                  decornculture@gmail.com
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full h-[400px] border border-[#dddddd] bg-[#e9ecef] overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0425261453264!2d90.39527377511603!3d23.78150497864972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c76ccebc3be7%3A0x6b29780a424a1b!2sDecor%20Culture!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

      </Container>
    </div>
  );
}
