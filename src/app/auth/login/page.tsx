import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";

export const metadata = {
  title: "Account Login",
  description: "Login to your account",
};

export default function LoginPage() {
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
            <span className="text-[#333333]">Login</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-[1000px] mx-auto">
          <h1 className="text-[26px] font-bold text-[#333] mb-8">Account Login</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
            {/* New Customer Column */}
            <div className="flex flex-col h-full">
              <h2 className="text-[16px] font-bold text-[#333] mb-4">New Customer</h2>
              <p className="text-[14px] text-[#444] leading-[22px] mb-10">
                By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.
              </p>
              <div className="mt-auto">
                <Link 
                  href={ROUTES.register}
                  className="block text-center bg-[#2b7e8d] hover:bg-[#1e616e] text-white px-8 py-2.5 text-[14px] font-bold transition-colors w-full"
                >
                  Continue
                </Link>
              </div>
            </div>

            {/* Returning Customer Column */}
            <div className="flex flex-col h-full">
              <h2 className="text-[16px] font-bold text-[#333] mb-4">Returning Customer</h2>
              
              <form className="flex flex-col flex-1" action="#">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-3">
                  <label htmlFor="email" className="w-[160px] flex-shrink-0 text-[14px] text-[#444]">
                    E Mail Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="E Mail Address" 
                    className="flex-1 border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] text-[14px] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                    required
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0 mb-2">
                  <label htmlFor="password" className="w-[160px] flex-shrink-0 text-[14px] text-[#444]">
                    Password
                  </label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password"
                    placeholder="Password" 
                    className="flex-1 border border-[#efefef] px-3 py-2 outline-none focus:border-[#2b7e8d] text-[14px] transition-colors bg-[#fdfdfd] placeholder:text-[#999]"
                    required
                  />
                </div>
                
                <div className="mb-8 flex">
                  <div className="w-[160px] flex-shrink-0 hidden sm:block"></div>
                  <Link href={ROUTES.forgotPassword} className="text-[14px] font-bold text-[#2b7e8d] hover:text-[#186675] hover:underline">
                    Forgotten Password
                  </Link>
                </div>
                
                <div className="mt-auto">
                  <button 
                    type="submit"
                    className="bg-[#2b7e8d] hover:bg-[#1e616e] text-white px-8 py-2.5 text-[14px] font-bold transition-colors w-full"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
