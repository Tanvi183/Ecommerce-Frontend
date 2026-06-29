"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/lib/api";
import { toast } from "sonner";

import Swal from "sweetalert2";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Log out of your account?",
      text: "You can always log back in at any time.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Log out",
      cancelButtonText: "Cancel",
      reverseButtons: true, // Puts confirm button on the right (modern convention)
      background: "#ffffff",
      color: "#333333",
      backdrop: `
        rgba(0,0,0,0.4)
        backdrop-filter: blur(4px)
      `,
      customClass: {
        popup: "rounded-2xl shadow-xl border border-gray-100",
        title: "text-xl font-bold mt-2",
        confirmButton: "bg-[#186675] hover:bg-[#13505c] text-white px-6 py-2.5 rounded-lg font-medium transition-colors border-0 ml-3",
        cancelButton: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg font-medium transition-colors border-0",
        actions: "mt-6 space-x-3 w-full justify-end",
      },
      buttonsStyling: false, // Disables default SweetAlert styles for buttons so our Tailwind classes apply
    });

    if (!result.isConfirmed) return;

    try {
      await api.post("/auth/logout");
      clearAuth();
      router.push(ROUTES.login);
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const navLinks = [
    { name: "My Account", path: ROUTES.profile },
    { name: "Edit your account information", path: "/profile/edit" },
    { name: "Change your password", path: "/profile/password" },
    { name: "Modify your address book entries", path: "/profile/address" },
    { name: "Modify your wish list", path: ROUTES.wishlist },
    { name: "View your order history", path: ROUTES.orders },
    { name: "Your Transactions", path: "/profile/transactions" },
    { name: "Subscribe / unsubscribe to newsletter", path: "/profile/newsletter" },
  ];

  return (
    <div className="bg-white border border-[#efefef] p-0 overflow-hidden">
      <div className="bg-[#186675] px-5 py-3">
        <h2 className="text-[14px] font-bold text-white uppercase tracking-wider">My Account</h2>
      </div>
      <nav className="flex flex-col text-[14px]">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`px-5 py-3 border-b border-[#efefef] transition-colors ${
                isActive
                  ? "text-[#186675] font-bold bg-[#f0f7f8] hover:bg-[#e6f2f4]"
                  : "text-[#444] hover:text-[#186675] hover:bg-[#f8f9fa]"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="px-5 py-3 text-left text-[#d9534f] hover:bg-[#fff5f5] transition-colors font-bold cursor-pointer"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
