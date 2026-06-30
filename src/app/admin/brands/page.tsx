"use client";

import { useState, useEffect } from "react";
import { getBrands, createBrand, updateBrand, deleteBrand } from "@/lib/adminApi";
import { toast } from "sonner";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logo: "",
    href: "",
    isActive: true
  });

  const fetchBrands = async () => {
    try {
      const res = await getBrands();
      if (res.data.success) {
        setBrands(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load brands");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleOpenModal = (brand?: any) => {
    if (brand) {
      setEditingId(brand._id);
      setFormData({
        name: brand.name,
        slug: brand.slug,
        logo: brand.logo,
        href: brand.href || "",
        isActive: brand.isActive
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "", logo: "", href: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    // Auto-generate slug if not editing
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
      if (editingId) {
        await updateBrand(editingId, formData);
        toast.success("Brand updated successfully");
      } else {
        await createBrand(formData);
        toast.success("Brand created successfully");
      }
      handleCloseModal();
      fetchBrands();
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
        await deleteBrand(id);
        toast.success("Brand deleted");
        fetchBrands();
      } catch (error) {
        toast.error("Failed to delete brand");
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-gray-800">Brands Management</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#186675] hover:bg-[#13525e] text-white px-4 py-2 rounded text-[13px] font-bold transition-colors flex items-center gap-2"
        >
          <Plus size={16} /> Add Brand
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-600 font-bold uppercase text-[12px]">
                <th className="px-6 py-4">Logo</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-10 bg-gray-100 rounded flex items-center justify-center p-1 border border-gray-200">
                      {brand.logo ? (
                        <img src={brand.logo} alt={brand.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-[10px] text-gray-400">No Image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">{brand.name}</td>
                  <td className="px-6 py-4 text-gray-500">{brand.slug}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${brand.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {brand.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenModal(brand)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(brand._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {brands.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No brands found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-[16px] font-bold text-gray-800">{editingId ? "Edit Brand" : "Add New Brand"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={handleNameChange} 
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675] bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Logo URL <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.logo} 
                  onChange={(e) => setFormData({...formData, logo: e.target.value})} 
                  required
                  placeholder="/brands/brand-1.png"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1">Link (href)</label>
                <input 
                  type="text" 
                  value={formData.href} 
                  onChange={(e) => setFormData({...formData, href: e.target.value})} 
                  placeholder="/categories/brand-name"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-[14px] outline-none focus:border-[#186675]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 accent-[#186675]"
                />
                <label htmlFor="isActive" className="text-[14px] text-gray-700 cursor-pointer">Active</label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-[13px] font-bold text-gray-600 hover:bg-gray-100 rounded transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#186675] hover:bg-[#13525e] text-white px-6 py-2 rounded text-[13px] font-bold transition-colors"
                >
                  {editingId ? "Save Changes" : "Create Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
