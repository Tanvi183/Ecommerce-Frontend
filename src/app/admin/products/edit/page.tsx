"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductBySlug } from '@/lib/adminApi';
import { 
  ChevronRight, 
  UploadCloud, 
  Image as ImageIcon,
  Bold,
  Italic,
  Underline,
  Link2,
  List,
  ListOrdered
} from 'lucide-react';
import Link from 'next/link';

export default function EditProductPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const [activeTab, setActiveTab] = useState('general');
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(!!slug); // start loading if we have a slug

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      getProductBySlug(slug)
        .then(res => {
          if (res.data && res.data.success) {
            setProductData(res.data.data);
          }
        })
        .catch(err => console.error("Failed to fetch product", err))
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  if (isLoading) {
    return <div className="p-10 text-center text-gray-500">Loading product data...</div>;
  }

  const isEditMode = !!productData;

  return (
    <div className="p-4 sm:p-6 pb-24">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h4 className="text-[16px] font-bold text-gray-800 dark:text-white uppercase">{isEditMode ? 'Edit Product' : 'Create Product'}</h4>
        <div className="flex items-center text-[13px] text-gray-500 mt-2 sm:mt-0">
          <Link href="/admin/ecommerce" className="hover:text-[#186675]">Ecommerce</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-400">{isEditMode ? 'Edit Product' : 'Create Product'}</span>
        </div>
      </div>

      <form className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Card 1: Basic Info */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Product Title</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" 
                  placeholder="Enter product title" 
                  defaultValue={productData?.name || ""}
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Product Description</label>
                <div className="border border-gray-300 dark:border-gray-600 rounded overflow-hidden">
                  <div className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-300 dark:border-gray-600 px-3 py-2 flex gap-2">
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><Bold size={14} /></button>
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><Italic size={14} /></button>
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><Underline size={14} /></button>
                    <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><Link2 size={14} /></button>
                    <div className="w-[1px] h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><List size={14} /></button>
                    <button type="button" className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-600 dark:text-gray-300"><ListOrdered size={14} /></button>
                  </div>
                  <textarea 
                    className="w-full p-4 h-48 text-[13px] text-gray-600 dark:text-gray-300 bg-transparent focus:outline-none resize-none"
                    defaultValue={productData?.description || ""}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Product Gallery */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Product Gallery</h5>
            </div>
            <div className="p-4">
              <div className="mb-5">
                <h5 className="text-[13px] font-medium text-gray-800 dark:text-white mb-1">Product Image</h5>
                <p className="text-[12px] text-gray-500 mb-3">Add Product main Image.</p>
                <div className="flex justify-center">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center relative">
                      {productData?.thumbnail ? (
                        <img src={productData.thumbnail} className="max-w-full max-h-full p-1" alt="" />
                      ) : (
                        <div className="text-gray-400">No Image</div>
                      )}
                      <button type="button" className="absolute -bottom-2 -right-2 w-8 h-8 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white shadow-sm cursor-pointer">
                        <ImageIcon size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[13px] font-medium text-gray-800 dark:text-white mb-1">Product Gallery</h5>
                <p className="text-[12px] text-gray-500 mb-3">Add Product Gallery Images.</p>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800/50 p-10 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-center mb-3 text-gray-400">
                    <UploadCloud size={48} />
                  </div>
                  <h5 className="text-[14px] font-medium text-gray-700 dark:text-gray-300">Drop files here or click to upload.</h5>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Tabs for Details */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex border-b border-gray-200 dark:border-gray-700 px-4 pt-2">
              <button 
                type="button"
                onClick={() => setActiveTab('general')}
                className={`pb-3 px-4 text-[13px] font-semibold transition-colors mt-2 ${
                  activeTab === 'general' 
                    ? 'text-[#186675] border-b-2 border-[#186675]' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
                }`}
              >
                General Info
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('meta')}
                className={`pb-3 px-4 text-[13px] font-semibold transition-colors mt-2 ${
                  activeTab === 'meta' 
                    ? 'text-[#186675] border-b-2 border-[#186675]' 
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
                }`}
              >
                Meta Data
              </button>
            </div>
            
            <div className="p-4">
              {activeTab === 'general' && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Manufacturer Name</label>
                      <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.brand?.name || ""} />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Manufacturer Brand</label>
                      <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.brand?.name || ""} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Price</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500 text-[13px]">$</span>
                        <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded pl-7 pr-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.price || ""} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Discount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500 text-[13px]">%</span>
                        <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded pl-7 pr-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.discountPercent || "0"} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Stocks</label>
                      <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.stock || "0"} />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'meta' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Title</label>
                    <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" placeholder="Enter meta title" defaultValue={productData?.name || ""} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Keywords</label>
                    <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" placeholder="Enter meta keywords" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-gray-700 dark:text-gray-300 mb-2">Meta Description</label>
                    <textarea className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white h-24 resize-none" placeholder="Enter meta description" defaultValue={productData?.shortDescription || ""}></textarea>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="xl:col-span-4 space-y-6">
          
          {/* Card 4: Publish */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Publish</h5>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-2">Status</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white">
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-2">Visibility</label>
                <select className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white">
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 5: Publish Schedule */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Publish Schedule</h5>
            </div>
            <div className="p-4">
              <label className="block text-[12px] font-medium text-gray-600 dark:text-gray-400 mb-2">Publish Date & Time</label>
              <input type="text" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.createdAt ? new Date(productData.createdAt).toLocaleDateString() : ""} />
            </div>
          </div>

          {/* Card 6: Product Categories */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Product Categories</h5>
            </div>
            <div className="p-4">
              <select className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white" defaultValue={productData?.categoryId || ""}>
                <option value="">Select category</option>
                {productData?.category && <option value={productData.categoryId}>{productData.category.name}</option>}
              </select>
            </div>
          </div>

          {/* Card 7: Product Tags */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Product Tags</h5>
            </div>
            <div className="p-4">
              <div className="border border-gray-300 dark:border-gray-600 rounded p-2 flex flex-wrap gap-1">
                {productData?.tags?.map((tag: string, i: number) => (
                  <span key={i} className="bg-[#186675]/10 text-[#186675] px-2 py-1 rounded text-[12px] flex items-center gap-1">{tag} <button>&times;</button></span>
                ))}
                <input type="text" className="flex-1 min-w-[50px] outline-none text-[13px] bg-transparent ml-1" placeholder="Add tag..." />
              </div>
            </div>
          </div>

          {/* Card 8: Product Short Description */}
          <div className="bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="border-b border-gray-100 dark:border-gray-700 px-4 py-3">
              <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-0">Product Short Description</h5>
            </div>
            <div className="p-4">
              <p className="text-[12px] text-gray-500 mb-2">Add short description for product</p>
              <textarea 
                className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#186675] bg-transparent text-gray-800 dark:text-white h-24 resize-none" 
                placeholder="Must enter minimum of a 100 characters"
                defaultValue={productData?.shortDescription || ""}
              ></textarea>
            </div>
          </div>

        </div>

      </form>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 right-0 lg:left-64 left-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 z-10 shadow-lg">
        <button className="px-5 py-2 rounded bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-[13px] font-medium transition-colors">
          Save as Draft
        </button>
        <button className="px-5 py-2 rounded bg-[#0ab39c] hover:bg-[#099985] text-white text-[13px] font-medium transition-colors">
          Save Product
        </button>
      </div>

    </div>
  );
}
