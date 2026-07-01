"use client";

import React, { useState, useEffect } from "react";
import { getProductsAdmin, updateProduct } from "@/lib/adminApi";
import { toast } from "sonner";
import { Plus, Search, Trash2, X, BadgePercent } from "lucide-react";
import Image from "next/image";

export default function AdminOffersPage() {
  const [offers, setOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [discountPercent, setDiscountPercent] = useState<number | "">("");
  const [offerPrice, setOfferPrice] = useState<number | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const res = await getProductsAdmin({ isOnSale: "true", limit: 100 });
      if (res.data.success) {
        setOffers(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load offers");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Search products for the modal
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await getProductsAdmin({ search: searchQuery, limit: 10 });
        if (res.data.success) {
          // Filter out products already on sale
          setSearchResults(res.data.data.filter((p: any) => !p.isOnSale));
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  // Handle calculation when user types percent
  const handlePercentChange = (val: string) => {
    const p = parseFloat(val);
    if (isNaN(p)) {
      setDiscountPercent("");
      setOfferPrice("");
      return;
    }
    setDiscountPercent(p);
    if (selectedProduct) {
      const newPrice = selectedProduct.price - (selectedProduct.price * (p / 100));
      setOfferPrice(parseFloat(newPrice.toFixed(2)));
    }
  };

  // Handle calculation when user types new price
  const handlePriceChange = (val: string) => {
    const p = parseFloat(val);
    if (isNaN(p)) {
      setOfferPrice("");
      setDiscountPercent("");
      return;
    }
    setOfferPrice(p);
    if (selectedProduct && selectedProduct.price > 0) {
      const diff = selectedProduct.price - p;
      const percent = (diff / selectedProduct.price) * 100;
      setDiscountPercent(parseFloat(percent.toFixed(2)));
    }
  };

  const handleAddOffer = async () => {
    if (!selectedProduct || !offerPrice || !discountPercent) {
      toast.error("Please fill all fields properly");
      return;
    }
    setIsSubmitting(true);
    try {
      // originalPrice becomes the current price. price becomes offerPrice.
      const updatedData = {
        isOnSale: true,
        originalPrice: selectedProduct.price,
        price: Number(offerPrice),
        discountPercent: Number(discountPercent)
      };
      
      const res = await updateProduct(selectedProduct._id, updatedData);
      if (res.data.success) {
        toast.success("Offer applied successfully");
        setIsModalOpen(false);
        setSelectedProduct(null);
        setSearchQuery("");
        setDiscountPercent("");
        setOfferPrice("");
        fetchOffers();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to apply offer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveOffer = async (product: any) => {
    if (!confirm(`Are you sure you want to remove ${product.name} from offers? Its price will return to ৳${product.originalPrice || product.price}.`)) return;
    
    try {
      // Restore original price if it exists
      const restoredPrice = product.originalPrice ? product.originalPrice : product.price;
      const updatedData = {
        isOnSale: false,
        price: restoredPrice,
        originalPrice: 0,
        discountPercent: 0
      };
      
      const res = await updateProduct(product._id, updatedData);
      if (res.data.success) {
        toast.success("Offer removed successfully");
        fetchOffers();
      }
    } catch (error) {
      toast.error("Failed to remove offer");
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Active Offers</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage products currently on sale or discount.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-5 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm hover:shadow flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Product to Offer
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500 animate-pulse">Loading offers...</div>
      ) : offers.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 border-dashed rounded-xl">
          <BadgePercent size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-[18px] font-bold text-gray-900">No Active Offers</h3>
          <p className="text-[14px] text-gray-500 mt-2 mb-6">You don't have any products currently on sale.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#186675]/10 text-[#186675] hover:bg-[#186675]/20 px-6 py-2.5 rounded-lg text-[14px] font-bold inline-flex items-center gap-2 transition-colors"
          >
            <Plus size={18} /> Create First Offer
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Original Price</th>
                  <th className="px-6 py-4">Offer Price</th>
                  <th className="px-6 py-4">Discount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offers.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded border border-gray-200 overflow-hidden bg-gray-50 relative flex-shrink-0">
                          {product.thumbnail ? (
                            <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">No Img</div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 line-clamp-1">{product.name}</div>
                          <div className="text-[12px] text-gray-500">SKU: {product.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 line-through">
                      ৳{product.originalPrice || product.price}
                    </td>
                    <td className="px-6 py-4 font-bold text-[#186675]">
                      ৳{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[12px] font-bold">
                        {product.discountPercent}% OFF
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleRemoveOffer(product)}
                        className="text-gray-400 hover:text-red-500 p-2 rounded hover:bg-red-50 transition-colors"
                        title="Remove Offer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Offer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-gray-100">
              <h2 className="text-[18px] font-bold text-gray-900">Add Product to Offer</h2>
              <button onClick={() => { setIsModalOpen(false); setSelectedProduct(null); setSearchQuery(""); }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              {!selectedProduct ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search product by name or SKU..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] text-[14px]"
                    />
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {isSearching ? (
                      <div className="text-center py-4 text-gray-500 text-[13px]">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div 
                          key={product._id} 
                          onClick={() => setSelectedProduct(product)}
                          className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-[#186675] hover:bg-[#186675]/5 cursor-pointer transition-colors"
                        >
                          <div className="w-12 h-12 rounded border border-gray-200 overflow-hidden relative flex-shrink-0">
                            {product.thumbnail && <Image src={product.thumbnail} alt={product.name} fill className="object-cover" />}
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-[14px] text-gray-900 line-clamp-1">{product.name}</div>
                            <div className="text-[12px] text-gray-500 flex justify-between">
                              <span>SKU: {product.sku}</span>
                              <span className="font-bold text-[#186675]">৳{product.price}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : searchQuery.trim().length > 1 ? (
                      <div className="text-center py-4 text-gray-500 text-[13px]">No products found</div>
                    ) : null}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-xl">
                    <div className="w-16 h-16 rounded border border-gray-200 overflow-hidden relative flex-shrink-0 bg-white">
                      {selectedProduct.thumbnail && <Image src={selectedProduct.thumbnail} alt={selectedProduct.name} fill className="object-cover" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-[15px] text-gray-900">{selectedProduct.name}</div>
                      <div className="text-[13px] text-gray-500 mt-1">Current Price: <span className="font-bold text-gray-900 line-through">৳{selectedProduct.price}</span></div>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="text-[12px] text-[#186675] font-bold hover:underline">Change</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Discount (%)</label>
                      <div className="relative">
                        <input 
                          type="number" 
                          min="0" max="100"
                          value={discountPercent}
                          onChange={(e) => handlePercentChange(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg pl-4 pr-8 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675]"
                          placeholder="e.g. 20"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-gray-700 mb-1.5">New Offer Price (৳)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">৳</span>
                        <input 
                          type="number" 
                          min="0"
                          value={offerPrice}
                          onChange={(e) => handlePriceChange(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] font-bold text-[#186675]"
                          placeholder="e.g. 400"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleAddOffer}
                    disabled={isSubmitting || !offerPrice}
                    className="w-full bg-[#186675] hover:bg-[#13525e] text-white py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Applying Offer..." : "Apply Offer"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
