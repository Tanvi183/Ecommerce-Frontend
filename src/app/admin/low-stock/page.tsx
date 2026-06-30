"use client";

import { useState, useEffect } from "react";
import { getLowStockProducts, updateProductStock } from "@/lib/adminApi";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export default function AdminLowStockPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLowStock = async () => {
    try {
      const res = await getLowStockProducts();
      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load low stock products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStock();
  }, []);

  const handleUpdateStock = async (id: string, newStock: number) => {
    if (newStock < 0) return;
    try {
      await updateProductStock(id, { quantity: newStock, operation: 'set' });
      toast.success("Stock updated successfully");
      fetchLowStock(); // refresh the list, might remove item if it's no longer low stock
    } catch (error) {
      toast.error("Failed to update stock");
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-[20px] font-bold text-gray-800 flex items-center gap-2">
            Low Stock Alerts <AlertTriangle className="text-orange-500" size={24} />
          </h1>
          <p className="text-[13px] text-gray-500 mt-1">Products that are out of stock or running low (≤ 10).</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-600 font-bold uppercase text-[12px]">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Current Stock</th>
                <th className="px-6 py-4 text-right">Quick Update</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {product.thumbnail ? (
                          <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 line-clamp-1">{product.name}</div>
                        <div className="text-[12px] text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      product.stockStatus === 'out_of_stock' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {product.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Low Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center font-bold text-[16px] text-gray-800">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <input 
                        type="number" 
                        min="0"
                        defaultValue={product.stock}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleUpdateStock(product._id, Number(e.currentTarget.value));
                          }
                        }}
                        onBlur={(e) => handleUpdateStock(product._id, Number(e.currentTarget.value))}
                        className="w-20 border border-gray-300 rounded px-2 py-1.5 text-[14px] outline-none focus:border-[#186675] text-center"
                      />
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No low stock products. Everything is well stocked!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
