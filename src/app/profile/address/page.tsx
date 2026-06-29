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

export default function AddressBookPage() {
  const { isAuthenticated, user, updateUser } = useAuthStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
    } else if (user) {
      const fetchAddress = async () => {
        try {
          const { data } = await api.get("/auth/me");
          if (data.data.address) {
             setFormData({
               street: data.data.address.street || "",
               city: data.data.address.city || "",
               state: data.data.address.state || "",
               zip: data.data.address.zip || "",
               country: data.data.address.country || "",
             });
          }
        } catch (error) {
          console.error("Failed to fetch address", error);
        }
      };
      fetchAddress();
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.put("/auth/address", formData);
      if (response.data.success) {
        toast.success("Address updated successfully!");
        // Update user state if we store address in user object, currently we just show success
        router.push(ROUTES.profile);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update address");
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
          <span className="text-[#333]">Address Book</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#efefef] p-6">
              <h1 className="text-[22px] font-bold text-[#333] mb-6">Address Book Entries</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                  <legend className="text-[16px] font-bold text-[#333] mb-4 border-b border-[#efefef] w-full pb-2">Edit Address</legend>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="street" className="text-[14px] text-[#333]">Street Address</label>
                      <input
                        type="text"
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-[14px] text-[#333]">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="zip" className="text-[14px] text-[#333]">Post Code / Zip</label>
                      <input
                        type="text"
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="country" className="text-[14px] text-[#333]">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border border-[#e5e5e5] px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#186675] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="state" className="text-[14px] text-[#333]">Region / State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
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
