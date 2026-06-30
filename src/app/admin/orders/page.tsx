"use client";

import { useState, useEffect } from "react";
import { getOrdersAdmin, updateOrderStatus } from "@/lib/adminApi";
import { toast } from "sonner";
import { FileText, Eye } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const fetchOrders = async () => {
    try {
      const res = await getOrdersAdmin({ page, limit });
      if (res.data.success) {
        setOrders(res.data.data);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  const handleStatusChange = async (id: string, status: string, type: 'status' | 'paymentStatus') => {
    try {
      const payload = type === 'status' ? { status } : { paymentStatus: status };
      await updateOrderStatus(id, payload);
      toast.success("Order updated");
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, ...payload });
      }
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-gray-800">Orders Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-600 font-bold uppercase text-[12px]">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-[12px] text-gray-500">{order._id.substring(order._id.length - 8)}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-800">{order.userId?.name || 'Unknown'}</div>
                    <div className="text-[12px] text-gray-500">{order.userId?.email || ''}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-bold text-[#186675]">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.paymentStatus} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value, 'paymentStatus')}
                      className={`px-2 py-1 rounded text-[12px] font-bold outline-none border cursor-pointer ${
                        order.paymentStatus === 'paid' ? 'bg-green-50 border-green-200 text-green-700' :
                        order.paymentStatus === 'refunded' ? 'bg-red-50 border-red-200 text-red-700' :
                        'bg-orange-50 border-orange-200 text-orange-700'
                      }`}
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status} 
                      onChange={(e) => handleStatusChange(order._id, e.target.value, 'status')}
                      className={`px-2 py-1 rounded text-[12px] font-bold outline-none border cursor-pointer ${
                        order.status === 'delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                        order.status === 'cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                        'bg-blue-50 border-blue-200 text-blue-700'
                      }`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedOrder(order)} 
                      className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors" 
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No orders found.</td>
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-gray-800 flex items-center gap-2">
                <FileText size={18} /> Order #{selectedOrder._id.substring(selectedOrder._id.length - 8)}
              </h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Customer Information</h3>
                  <div className="text-[14px] text-gray-800">
                    <p className="font-bold">{selectedOrder.userId?.name}</p>
                    <p>{selectedOrder.userId?.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Shipping Address</h3>
                  <div className="text-[14px] text-gray-800">
                    <p>{selectedOrder.shippingAddress?.street || 'N/A'}</p>
                    <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} {selectedOrder.shippingAddress?.zip}</p>
                    <p>{selectedOrder.shippingAddress?.country}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Order Items</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-[14px]">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 font-semibold text-gray-600">Product</th>
                      <th className="px-4 py-2 font-semibold text-gray-600 text-center">Qty</th>
                      <th className="px-4 py-2 font-semibold text-gray-600 text-right">Price</th>
                      <th className="px-4 py-2 font-semibold text-gray-600 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item: any, idx: number) => (
                      <tr key={idx} className="border-b border-gray-100 last:border-0">
                        <td className="px-4 py-3 flex items-center gap-3">
                          <img src={item.thumbnail} alt={item.name} className="w-10 h-10 object-cover rounded bg-gray-100" />
                          <span className="font-medium text-gray-800 line-clamp-1">{item.name}</span>
                        </td>
                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-600">Total:</td>
                      <td className="px-4 py-3 text-right font-bold text-[#186675] text-[16px]">${selectedOrder.total.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded text-[13px] font-bold hover:bg-gray-200">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
