"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import Container from "@/components/common/Container";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import api from "@/lib/api";
import { toast } from "sonner";
import Button from "@/components/ui/Button";

export default function ChangePasswordPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await api.put("/auth/password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      if (response.data.success) {
        toast.success("Password changed successfully!");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        router.push(ROUTES.profile);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[70vh] py-12">
      <Container>
        {/* Breadcrumb */}
        <div className="flex items-center text-[14px] text-[#696973] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span className="mx-2">»</span>
          <Link href={ROUTES.profile} className="hover:text-[var(--primary)] transition-colors">My Account</Link>
          <span className="mx-2">»</span>
          <span className="text-[#333]">Change Password</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#efefef] p-6">
              <h1 className="text-[22px] font-bold text-[#333] mb-6">Change Password</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                  <legend className="text-[16px] font-bold text-[#333] mb-4 border-b border-[#efefef] w-full pb-2">Your Password</legend>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="currentPassword" className="text-[14px] text-[#333]">Current Password <span className="text-red-500">*</span></label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>
                    
                    <div className="hidden md:block"></div> {/* Spacer */}

                    <div className="space-y-2">
                      <label htmlFor="newPassword" className="text-[14px] text-[#333]">New Password <span className="text-red-500">*</span></label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="confirmPassword" className="text-[14px] text-[#333]">Password Confirm <span className="text-red-500">*</span></label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="flex justify-between items-center pt-4 border-t border-[#efefef]">
                  <Link href={ROUTES.profile} className="text-[#186675] hover:underline text-[14px] font-bold">
                    Back
                  </Link>
                  <Button type="submit" disabled={isLoading} className="bg-[#186675] hover:bg-[#13505c] text-white">
                    {isLoading ? "Saving..." : "Continue"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
