"use client";

import AdminGuard from "@/components/auth/AdminGuard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  LayoutDashboard, 
  ShoppingCart, 
  MessageSquare,
  Briefcase,
  CheckSquare,
  FileText,
  Users,
  DollarSign,
  BriefcaseBusiness,
  Mail,
  Headphones,
  Tag,
  Search,
  Sun,
  Grid,
  Bell,
  Maximize,
  Globe,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  Activity,
  HeartHandshake,
  BadgePercent
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, clearAuth } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dashboardsOpen, setDashboardsOpen] = useState(true);

  const mainLinks = [
    { name: "Ecommerce", path: "/admin/ecommerce" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "CRM", path: "/admin/crm" },
    { name: "Finance", path: "/admin/finance" },
    { name: "Projects", path: "/admin", active: true },
  ];

  const appLinks = [
    { name: "Products", path: "/admin/products", icon: ShoppingCart },
    { name: "Categories", path: "/admin/categories", icon: Grid },
    { name: "Others Feature", path: "/admin/others-feature", icon: Globe },
    { name: "Brands", path: "/admin/brands", icon: Tag },
    { name: "Offers", path: "/admin/offers", icon: BadgePercent, badge: "Sale" },
    { name: "Appearance", path: "/admin/appearance", icon: Sun },
    { name: "Navigation Menu", path: "/admin/navigation", icon: Menu },
    { name: "Orders", path: "/admin/orders", icon: FileText },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Low-Stock", path: "/admin/low-stock", icon: Activity, badge: "Alert" },
    { name: "Reviews", path: "/admin/reviews", icon: MessageSquare },
  ];

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#f4f7fc] flex font-sans text-[#6c757d]">
        {/* Sidebar */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 bg-[#186675] text-[#b3d7dd] w-[260px] transition-transform duration-300 flex flex-col ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0`}
        >
          {/* Logo Area */}
          <div className="h-[70px] flex items-center justify-between px-6 border-b border-[#217584]">
            <Link href="/" className="flex items-center gap-2 text-white text-xl font-bold tracking-wide">
              Décor Culture
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-4 sidebar-scroll">
            <p className="px-6 text-[10px] text-[#86b9c2] font-bold uppercase tracking-[0.1em] mb-3">Main</p>
            
            <div className="px-3">
              <button 
                onClick={() => setDashboardsOpen(!dashboardsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-[14px] text-white font-medium rounded hover:bg-[#13525e] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={18} />
                  Dashboards
                </div>
                {dashboardsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {dashboardsOpen && (
                <div className="mt-1 space-y-1 pl-9 pr-3">
                  {mainLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`block py-1.5 text-[13px] transition-colors ${
                        link.active ? "text-white font-bold" : "text-[#b3d7dd] hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <p className="px-6 text-[10px] text-[#86b9c2] font-bold uppercase tracking-[0.1em] mt-6 mb-3">Apps</p>
            <div className="px-3 space-y-0.5">
              {appLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-[14px] rounded hover:bg-[#13525e] hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} />
                      {link.name}
                    </div>
                    {link.badge ? (
                      <span className="bg-[#f43f5e] text-white text-[10px] font-bold px-1.5 py-0.5 rounded leading-none">
                        {link.badge}
                      </span>
                    ) : (
                      <ChevronRight size={14} className="opacity-40" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-[70px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex items-center justify-between px-4 lg:px-6 z-40 sticky top-0">
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-[#6b7280] hover:bg-gray-100 p-2 rounded-lg lg:hidden"
              >
                <Menu size={20} />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center bg-[#f3f4f7] rounded-full px-4 py-2 w-[280px]">
                <Search size={16} className="text-[#9ca3af]" />
                <input 
                  type="text" 
                  placeholder="Quick Search..." 
                  className="bg-transparent border-none outline-none text-[13px] ml-2 w-full text-gray-700 placeholder:text-[#9ca3af]"
                />
              </div>

              {/* Top Links */}
              <div className="hidden lg:flex items-center gap-6 ml-4 text-[13px] text-[#6b7280] font-medium">
                <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                  Mega Menu <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                  Apps <ChevronDown size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button className="text-[#6b7280] hover:text-[#374151] transition-colors"><Sun size={20} strokeWidth={1.5} /></button>
              <button className="text-[#6b7280] hover:text-[#374151] transition-colors"><Grid size={20} strokeWidth={1.5} /></button>
              <div className="relative">
                <button className="text-[#6b7280] hover:text-[#374151] transition-colors pt-1"><Bell size={20} strokeWidth={1.5} /></button>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f43f5e] text-white text-[9px] font-bold flex items-center justify-center rounded-full border-2 border-white">5</span>
              </div>
              <button className="text-[#6b7280] hover:text-[#374151] transition-colors hidden sm:block"><Maximize size={20} strokeWidth={1.5} /></button>
              <button className="text-[#6b7280] hover:text-[#374151] transition-colors hidden sm:block"><Globe size={20} strokeWidth={1.5} /></button>
              <button className="text-[#6b7280] hover:text-[#374151] transition-colors hidden sm:block"><Settings size={20} strokeWidth={1.5} /></button>

              {/* Profile */}
              <div className="flex items-center gap-2 pl-4 ml-2 border-l border-gray-200 cursor-pointer hover:bg-gray-50 py-1 px-2 rounded transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <img src="https://ui-avatars.com/api/?name=David+Dev&background=random" alt="Avatar" width="32" height="32" />
                </div>
                <div className="hidden sm:block text-right mr-1">
                  <p className="font-semibold text-gray-800 text-[13px] leading-tight">David Dev</p>
                  <p className="text-[11px] text-[#6b7280] leading-tight">Admin Head</p>
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
      <style jsx global>{`
        .sidebar-scroll::-webkit-scrollbar { width: 4px; }
        .sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scroll::-webkit-scrollbar-thumb { background: #13525e; border-radius: 4px; }
      `}</style>
    </AdminGuard>
  );
}
