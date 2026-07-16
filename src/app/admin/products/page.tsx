"use client";

import { useState, useEffect } from "react";
import { getProductsAdmin, createProduct, updateProduct, deleteProduct, getCategories, getBrands } from "@/lib/adminApi";
import { toast } from "react-toastify";
import { Edit2, Trash2, Plus, X, MoreHorizontal, Eye } from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]); // Derived from categories
  const [subSubCategories, setSubSubCategories] = useState<any[]>([]); // Derived from subCategories
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  
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
    subSubCategory: "",
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

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openDropdownId) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdownId]);

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      const selectedCat = categories.find(c => (c._id || c.id) === formData.category);
      if (selectedCat && selectedCat.children) {
        setSubCategories(selectedCat.children);
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  }, [formData.category, categories]);

  // Update sub-subcategories when subcategory changes
  useEffect(() => {
    if (formData.subCategory) {
      const selectedSubCat = subCategories.find(c => (c._id || c.id) === formData.subCategory);
      if (selectedSubCat && selectedSubCat.children) {
        setSubSubCategories(selectedSubCat.children);
      } else {
        setSubSubCategories([]);
      }
    } else {
      setSubSubCategories([]);
    }
  }, [formData.subCategory, subCategories]);

  const handleOpenModal = (product?: any) => {
    if (product) {
      setEditingId((product._id || product.id));
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description,
        shortDescription: product.shortDescription || "",
        price: product.price.toString(),
        originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
        thumbnail: product.thumbnail,
        category: product.categoryId || (product.category?._id || product.category?.id) || "",
        subCategory: product.subCategoryId || (product.subCategory?._id || product.subCategory?.id) || "",
        subSubCategory: product.subSubCategoryId || (product.subSubCategory?._id || product.subSubCategory?.id) || "",
        brand: product.brandId || (product.brand?._id || product.brand?.id) || "",
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
        thumbnail: "", category: "", subCategory: "", subSubCategory: "", brand: "", sku: "", stock: "0",
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
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        stock: Number(formData.stock),
        category: formData.category || undefined,
        subCategory: formData.subCategory || null,
        subSubCategory: formData.subSubCategory || null,
        brand: formData.brand || null,
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
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-[20px] font-bold text-gray-800 dark:text-gray-100">Products Management</h1>
        <div className="flex gap-3">
          <Link 
            href="/admin/products/edit"
            className="px-4 py-2 rounded text-[13px] font-bold transition-colors flex items-center gap-2 bg-[#186675] dark:bg-gray-950 hover:bg-[#13525e] dark:bg-gray-800 text-white"
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-bold uppercase text-[12px]">
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
                <tr key={(product._id || product.id)} className="border-b border-gray-50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
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
                        <div className="font-bold text-gray-800 dark:text-gray-100 line-clamp-1">{product.name}</div>
                        <div className="text-[12px] text-gray-500 dark:text-gray-400">SKU: {product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-[#186675]">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.category?.name}</td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.brand?.name || '-'}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      product.stockStatus === 'in_stock' ? 'bg-green-100 text-green-700' : 
                      product.stockStatus === 'low_stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdownId(openDropdownId === (product._id || product.id) ? null : (product._id || product.id));
                        }}
                        className="p-1.5 bg-[#405189] text-white rounded hover:bg-[#364574] transition-colors inline-flex items-center justify-center"
                      >
                        <MoreHorizontal size={16} />
                      </button>
                      
                      {openDropdownId === (product._id || product.id) && (
                        <div className="absolute right-6 top-12 w-32 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50 text-left">
                          <Link 
                            href={`/admin/products/details?slug=${product.slug}`}
                            className="w-full px-4 py-2 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Eye size={14} className="text-gray-400" /> View
                          </Link>
                          <Link 
                            href={`/admin/products/edit?slug=${product.slug}`}
                            className="w-full text-left px-4 py-2 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Edit2 size={14} className="text-gray-400" /> Edit
                          </Link>
                          <button 
                            onClick={() => {
                              setOpenDropdownId(null);
                              handleDelete((product._id || product.id));
                            }}
                            className="w-full text-left px-4 py-2 text-[13px] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                          >
                            <Trash2 size={14} className="text-gray-400" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 dark:border-gray-800">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-[13px] border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-[13px] text-gray-600 dark:text-gray-300">Page {page} of {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-[13px] border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 flex-shrink-0">
              <h2 className="text-[16px] font-bold text-gray-800 dark:text-gray-100">{editingId ? "Edit Product" : "Add New Product"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:text-gray-300"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Name <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={handleNameChange} required className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Slug <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} required className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-gray-50 dark:bg-gray-800/50" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">SKU <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.sku} onChange={(e) => setFormData({...formData, sku: e.target.value})} required className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Price <span className="text-red-500">*</span></label>
                  <input type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Stock Quantity <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} required min="0" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Category <span className="text-red-500">*</span></label>
                  <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value, subCategory: "", subSubCategory: ""})} required className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white dark:bg-gray-800">
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={(cat._id || cat.id)} value={(cat._id || cat.id)}>{cat.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Sub Category</label>
                  <select value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value, subSubCategory: ""})} disabled={subCategories.length === 0} className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white dark:bg-gray-800 disabled:bg-gray-100">
                    <option value="">Select Subcategory</option>
                    {subCategories.map(sub => <option key={(sub._id || sub.id)} value={(sub._id || sub.id)}>{sub.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Sub-Sub Category</label>
                  <select value={formData.subSubCategory} onChange={(e) => setFormData({...formData, subSubCategory: e.target.value})} disabled={subSubCategories.length === 0} className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white dark:bg-gray-800 disabled:bg-gray-100">
                    <option value="">Select Sub-Subcategory</option>
                    {subSubCategories.map(subSub => <option key={(subSub._id || subSub.id)} value={(subSub._id || subSub.id)}>{subSub.name}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Brand</label>
                  <select value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-white dark:bg-gray-800">
                    <option value="">Select Brand</option>
                    {brands.map(brand => <option key={(brand._id || brand.id)} value={(brand._id || brand.id)}>{brand.name}</option>)}
                  </select>
                </div>

                <div className="col-span-2 md:col-span-1">
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Thumbnail URL <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.thumbnail} onChange={(e) => setFormData({...formData, thumbnail: e.target.value})} required placeholder="/products/prod1.jpg" className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div className="col-span-2">
                  <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-200 mb-1">Description <span className="text-red-500">*</span></label>
                  <textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required rows={3} className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]" />
                </div>

                <div className="col-span-2 flex flex-wrap gap-4 mt-2 border-t pt-4 border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isNew" checked={formData.isNew} onChange={(e) => setFormData({...formData, isNew: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isNew" className="text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">New Arrival</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isFeatured" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isFeatured" className="text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">Featured</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="isOnSale" checked={formData.isOnSale} onChange={(e) => setFormData({...formData, isOnSale: e.target.checked})} className="w-4 h-4 accent-[#186675]" />
                    <label htmlFor="isOnSale" className="text-[13px] text-gray-700 dark:text-gray-200 cursor-pointer">On Sale</label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 mt-6">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-[13px] font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">Cancel</button>
                <button type="submit" className="bg-[#186675] dark:bg-gray-950 hover:bg-[#13525e] dark:bg-gray-800 text-white px-6 py-2 rounded text-[13px] font-bold transition-colors">
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
