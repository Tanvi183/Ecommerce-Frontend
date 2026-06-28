import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";

export const metadata = {
  title: "Register Account",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="bg-white pb-16">
      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-[#eeeeee] py-3 mb-10">
        <Container>
          <div className="flex items-center text-[14px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <Link href={ROUTES.profile} className="hover:text-[var(--primary)] transition-colors">Account</Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">Register</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-[26px] font-bold text-[#333] mb-4">Register Account</h1>
          <p className="text-[14px] text-[#444] mb-8">
            If you already have an account with us, please login at the <Link href={ROUTES.login} className="text-[#2b7e8d] hover:underline font-bold">login page</Link>.
          </p>
          
          <form action="#" className="text-[14px]">
            <h2 className="text-[16px] font-bold text-[#333] border-b border-[#efefef] pb-3 mb-6">Your Personal Details</h2>
            
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="firstname" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>First Name
                </label>
                <input 
                  type="text" 
                  id="firstname" 
                  name="firstname"
                  placeholder="First Name" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="lastname" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>Last Name
                </label>
                <input 
                  type="text" 
                  id="lastname" 
                  name="lastname"
                  placeholder="Last Name" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="email" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>E-Mail
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  placeholder="E-Mail" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="telephone" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>Telephone
                </label>
                <input 
                  type="tel" 
                  id="telephone" 
                  name="telephone"
                  placeholder="Telephone" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>
            </div>

            <h2 className="text-[16px] font-bold text-[#333] border-b border-[#efefef] pb-3 mb-6">Your Password</h2>
            <div className="flex flex-col gap-4 mb-10">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="password" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>Password
                </label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  placeholder="Password" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <label htmlFor="confirm" className="w-[160px] flex-shrink-0 text-[#444]">
                  <span className="text-red-500 mr-1">*</span>Password Confirm
                </label>
                <input 
                  type="password" 
                  id="confirm" 
                  name="confirm"
                  placeholder="Password Confirm" 
                  className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                  required
                />
              </div>
            </div>

            <h2 className="text-[16px] font-bold text-[#333] border-b border-[#efefef] pb-3 mb-6">Newsletter</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-10">
              <label className="w-[160px] flex-shrink-0 text-[#444]">Subscribe</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="newsletter" value="1" className="w-3.5 h-3.5 accent-[#2b7e8d]" />
                  <span>Yes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="newsletter" value="0" className="w-3.5 h-3.5 accent-[#2b7e8d]" defaultChecked />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mt-8 border-t border-[#efefef] pt-6">
              <div className="flex items-center gap-2">
                <span className="text-[#444]">I have read and agree to the <Link href="/privacy-policy" className="text-[#2b7e8d] hover:underline"><b>Privacy Policy</b></Link></span>
                <input type="checkbox" required className="w-3.5 h-3.5 accent-[#2b7e8d] cursor-pointer" />
              </div>
              <button 
                type="submit"
                className="bg-[#2b7e8d] hover:bg-[#1e616e] text-white px-8 py-2.5 font-bold transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
          
        </div>
      </Container>
    </div>
  );
}
