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

export default function NewsletterPage() {
  const { isAuthenticated, user, updateUser } = useAuthStore();
  const router = useRouter();

  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
    } else if (user) {
      const fetchNewsletter = async () => {
        try {
          const { data } = await api.get("/auth/me");
          setNewsletter(data.data.newsletter || false);
        } catch (error) {
          console.error("Failed to fetch newsletter preference", error);
        }
      };
      fetchNewsletter();
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.put("/auth/newsletter", { newsletter });
      if (response.data.success) {
        toast.success("Newsletter subscription updated successfully!");
        // Update user state if we store newsletter in user object
        router.push(ROUTES.profile);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update newsletter subscription");
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
          <span className="text-[#333]">Newsletter</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border border-[#efefef] p-6">
              <h1 className="text-[22px] font-bold text-[#333] mb-6">Newsletter Subscription</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <fieldset>
                  <div className="flex items-center gap-4">
                    <label className="text-[14px] text-[#333]">Subscribe</label>
                    <div className="flex items-center gap-4 text-[14px]">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="newsletter"
                          value="true"
                          checked={newsletter === true}
                          onChange={() => setNewsletter(true)}
                          className="accent-[#186675] w-4 h-4 cursor-pointer"
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="newsletter"
                          value="false"
                          checked={newsletter === false}
                          onChange={() => setNewsletter(false)}
                          className="accent-[#186675] w-4 h-4 cursor-pointer"
                        />
                        <span>No</span>
                      </label>
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
