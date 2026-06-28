import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";

export const metadata = {
  title: "Forgot Your Password?",
  description: "Reset your forgotten password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-white pb-16">
      {/* Breadcrumbs */}
      <div className="bg-[#f8f9fa] border-b border-[#eeeeee] py-3 mb-10">
        <Container>
          <div className="flex items-center text-[13px] text-[#696973]">
            <Link href="/" className="hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3l10 9h-3v9H5v-9H2z"/></svg>
            </Link>
            <span className="mx-2">»</span>
            <Link href={ROUTES.profile} className="hover:text-[var(--primary)] transition-colors">Account</Link>
            <span className="mx-2">»</span>
            <span className="text-[#333333]">Forgotten Password</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-[26px] font-bold text-[#333] mb-4">Forgot Your Password?</h1>
          <p className="text-[14px] text-[#444] mb-8">
            Enter the e-mail address associated with your account. Click submit to have a password reset link e-mailed to you.
          </p>
          
          <form action="#" className="text-[14px]">
            <h2 className="text-[16px] font-bold text-[#333] mb-4">Your E-Mail Address</h2>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-8">
              <label htmlFor="email" className="w-[160px] flex-shrink-0 text-[#444]">
                E-Mail Address <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                id="email" 
                name="email"
                placeholder="E-Mail Address" 
                className="flex-1 max-w-[500px] border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                required
              />
            </div>

            <div className="flex gap-4 mt-8">
              <Link 
                href={ROUTES.login}
                className="flex-1 text-center bg-[#2b7e8d] hover:bg-[#1e616e] text-white px-8 py-3 font-bold transition-colors"
              >
                Back
              </Link>
              <button 
                type="submit"
                className="flex-1 text-center bg-[#2b7e8d] hover:bg-[#1e616e] text-white px-8 py-3 font-bold transition-colors"
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
