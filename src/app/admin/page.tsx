"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow border border-gray-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#186675] text-white flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Sales", value: "$12,345", icon: "$" },
          { title: "Total Orders", value: "156", icon: "📦" },
          { title: "Total Products", value: "48", icon: "🏷️" },
          { title: "Total Customers", value: "89", icon: "👥" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#f0f7f8] flex items-center justify-center text-2xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center mt-8">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Welcome to the Admin Dashboard</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          From here you can manage products, categories, view orders, and handle customer accounts. 
          Use the sidebar to navigate through the admin modules.
        </p>
      </div>
    </div>
  );
}
