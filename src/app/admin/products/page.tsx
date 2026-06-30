"use client";

import { useState, useEffect } from "react";
import { getProductsAdmin, createProduct, updateProduct, deleteProduct, getCategories, getBrands } from "@/lib/adminApi";
import { toast } from "sonner";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]); // Derived from categories
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: "",
    originalPrice: "",
    thumbnail: "",
    category: "",
    subCategory: "",
    brand: "",
    sku: "",
    stock: "",
    isNew: false,
    isFeatured: false,
    isOnSale: false,
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes, brandRes] = await Promise.all([
        getProductsAdmin({ page, limit }),
        getCategories(),
        getBrands()
      ]);

      if (prodRes.data.success) {
        setProducts(prodRes.data.data);
        setTotalPages(prodRes.data.totalPages);
      }
      if (catRes.data.success) {
        setCategories(catRes.data.data);
      }
      if (brandRes.data.success) {
        setBrands(brandRes.data.data);
      }
    } catch (error) {
      toast.error("Failed to load products data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const selectedCat = categories.find(c => c._id === formData.category);
      if (selectedCat && selectedCat.children) {
        setSubCategories(selectedCat.children);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  }, [formData.category, categories]);

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingId(product._id);
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription || "",
        price: product.price.toString(),
        originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
        thumbnail: product.thumbnail,
        category: product.category?._id || "",
        subCategory: product.subCategory?._id || "",
        brand: product.brand?._id || "",
        sku: product.sku,
        stock: product.stock.toString(),
        isNew: product.isNew || false,
        isFeatured: product.isFeatured || false,
        isOnSale: product.isOnSale || false,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "", slug: "", description: "", shortDescription: "", price: "", originalPrice: "",
        thumbnail: "", category: "", subCategory: "", brand: "", sku: "", stock: "0",
        isNew: false, isFeatured: false, isOnSale: false
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (!editingId) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, name, slug });
    } else {
      setFormData({ ...formData, name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        stock: Number(formData.stock),
        subCategory: formData.subCategory || undefined,
        brand: formData.brand || undefined,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        toast.success("Product updated successfully");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully");
      }
      handleCloseModal();
      fetchData();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#186675',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-gray-800">Products Management</h1>
        <button 
          onClick={() => {
            if (categories.length === 0) {
              toast.error("You must create at least one category before creating a product.");
              return;
            }
            handleOpenModal();
          }}
          className={`px-4 py-2 rounded text-[13px] font-bold transition-colors flex items-center gap-2 ${
            categories.length === 0 
              ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
              : "bg-[#186675] hover:bg-[#13525e] text-white"
          }`}
          title={categories.length === 0 ? "Create a category first" : ""}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-600 font-bold uppercase text-[12px]">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Brand</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
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
                  <td className="px-6 py-4 font-bold text-[#186675]">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600">{product.category?.name}</td>
                  <td className="px-6 py-4 text-gray-600">{product.brand?.name || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      product.stockStatus === 'in_stock' ? 'bg-green-100 text-green-700' : 
                      product.stockStatus === 'low_stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(product)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(product._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">No products found.</td>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="text-[16px] font-bold text-gray-800">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={handleNameChange} required className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-gray-50" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">SKU <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} required className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Price <span className="text-red-500">*</span></label>
                  <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required min="0" className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value, subCategory: ""})} required className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white">
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Sub Category</label>
                  <select value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} disabled={subCategories.length === 0} className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white disabled:bg-gray-100">
                    <option value="">Select Subcategory</option>
                    {subCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Brand</label>
                  <select value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white">
                    <option value="">Select Brand</option>
                    {brands.map(brand => <option key={brand._id} value={brand._id}>{brand.name}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Thumbnail URL <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.thumbnail} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} required placeholder="/products/prod1.jpg" className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3} className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div className="col-span-2 flex flex-wrap gap-4 mt-2 border-t pt-4 border-gray-100">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isNew" checked={formData.isNew} onChange={(e) => setFormData({...formData, isNew: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isNew" className="text-[13px] text-gray-700 cursor-pointer">New Arrival</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isFeatured" className="text-[13px] text-gray-700 cursor-pointer">Featured</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isOnSale" checked={formData.isOnSale} onChange={(e) => setFormData({...formData, isOnSale: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isOnSale" className="text-[13px] text-gray-700 cursor-pointer">On Sale</label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-100 rounded transition-colors">Cancel</button>
                <button type="submit" className="bg-[#186675] hover:bg-[#13525e] text-white px-6 py-2 rounded text-[13px] font-bold transition-colors">
                  {editingId ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
