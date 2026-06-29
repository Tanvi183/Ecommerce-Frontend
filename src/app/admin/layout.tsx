"use client";

import AdminGuard from "@/components/auth/AdminGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Products", path: "/admin/products" },
    { name: "Manage Categories", path: "/admin/categories" },
    { name: "Manage Orders", path: "/admin/orders" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 bg-[#186675] text-white shadow-xl flex-shrink-0">
          <div className="p-6 border-b border-[#217584]">
            <h1 className="text-xl font-bold tracking-wider uppercase text-center">Admin Panel</h1>
          </div>
          <nav className="p-4 space-y-2">
            {adminLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? "bg-white text-[#186675] shadow"
                      : "text-white/90 hover:bg-[#13525e] hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Admin Content */}
        <main className="flex-1 p-6 md:p-10 overflow-auto">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
