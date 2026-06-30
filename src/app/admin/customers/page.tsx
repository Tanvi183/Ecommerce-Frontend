"use client";

import { useState, useEffect } from "react";
import { getCustomersAdmin } from "@/lib/adminApi";
import { toast } from "sonner";
import { Users, Mail } from "lucide-react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 15;

  const fetchCustomers = async () => {
    try {
      const res = await getCustomersAdmin({ page, limit });
      if (res.data.success) {
        setCustomers(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to load customers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-gray-800 flex items-center gap-2">
          <Users size={24} className="text-[#186675]" /> Customers Directory
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-600 font-bold uppercase text-[12px]">
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Joined Date</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#186675] text-white flex items-center justify-center font-bold text-[12px]">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-800">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Mail size={14} className="text-gray-400" />
                    <a href={`mailto:${customer.email}`} className="hover:text-[#186675] transition-colors">{customer.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {customer.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    {new Date(customer.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-[13px] border border-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-[13px] text-gray-600">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-[13px] border border-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
