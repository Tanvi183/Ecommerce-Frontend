"use client";

import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      
      if (res.data.success) {
        setAuth(res.data.data, res.data.accessToken);
        toast.success("Login successful!");
        
        const redirectUrl = searchParams.get("redirect");
        
        if (redirectUrl) {
          router.push(redirectUrl);
        } else if (res.data.data.role === "ADMIN") {
          router.push("/admin");
        } else {
          router.push(ROUTES.profile);
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

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
                  className="inline-block bg-[var(--primary)] text-white text-[14px] font-bold uppercase px-8 py-3 rounded hover:bg-[#13525e] transition-colors shadow-sm"
                >
                  CONTINUE
                </Link>
              </div>
            </div>

            {/* Returning Customer Column */}
            <div className="flex flex-col h-full">
              <h2 className="text-[16px] font-bold text-[#333] mb-4">Returning Customer</h2>
              <p className="text-[14px] text-[#444] mb-6">I am a returning customer</p>
              
              <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                <div className="mb-4">
                  <label className="block text-[14px] text-[#333] font-bold mb-2">E-Mail Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-[#ddd] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--primary)] transition-colors bg-[#f8f9fa]"
                    placeholder="E-Mail Address"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-[14px] text-[#333] font-bold mb-2">Password</label>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-[#ddd] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[var(--primary)] transition-colors bg-[#f8f9fa]"
                    placeholder="Password"
                  />
                  <div className="mt-3 text-right">
                    <Link href={ROUTES.forgotPassword} className="text-[13px] text-[#186675] hover:underline">Forgotten Password</Link>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="bg-[var(--primary)] text-white text-[14px] font-bold uppercase px-8 py-3 rounded hover:bg-[#13525e] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "LOGGING IN..." : "LOGIN"}
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

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
