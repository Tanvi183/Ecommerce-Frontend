"use client";

import React, { useState, useEffect } from "react";
import { getFeatures, createFeature, updateFeature, deleteFeature } from "@/lib/adminApi";
import { toast } from "sonner";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import Swal from "sweetalert2";

export default function AdminFeaturesPage() {
  const [features, setFeatures] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    isActive: true
  });

  const fetchFeatures = async () => {
    try {
      const res = await getFeatures();
      if (res.data.success) {
        setFeatures(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load features");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleOpenModal = (feature?: any) => {
    if (feature) {
      setEditingId(feature._id);
      setFormData({
        name: feature.name,
        slug: feature.slug,
        description: feature.description || "",
        image: feature.image || "",
        isActive: feature.isActive !== undefined ? feature.isActive : true
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "", description: "", image: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        slug: formData.slug || generateSlug(formData.name)
      };

      if (editingId) {
        await updateFeature(editingId, payload);
        toast.success("Feature updated successfully");
      } else {
        await createFeature(payload);
        toast.success("Feature created successfully");
      }
      handleCloseModal();
      fetchFeatures();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#9ca3af",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteFeature(id);
        toast.success("Feature deleted");
        fetchFeatures();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete feature");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Others Feature</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage your standalone service features.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Feature
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-500 font-semibold uppercase text-[12px] tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Feature Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading features...</td>
                </tr>
              ) : features.length > 0 ? (
                features.map((feature) => (
                  <tr key={feature._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4 w-20">
                      <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden shadow-sm flex-shrink-0">
                        {feature.image ? (
                          <img src={feature.image} alt={feature.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[15px] font-bold text-gray-900">{feature.name}</td>
                    <td className="px-6 py-4 text-gray-500 text-[13px]">{feature.slug}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(feature)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
                          <Edit2 size={16} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => handleDelete(feature._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                          <Trash2 size={16} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No features found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-[18px] font-bold text-gray-900">{editingId ? "Edit Feature" : "Add New Feature"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="p-6 space-y-5">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Feature Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="e.g. Services"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-[13px] font-bold text-gray-700">URL Slug</label>
                      <span className="text-[11px] text-gray-400">Leave empty to auto-generate</span>
                    </div>
                    <input 
                      type="text" 
                      value={formData.slug} 
                      onChange={(e) => setFormData({...formData, slug: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all bg-gray-50 focus:bg-white"
                      placeholder="e.g. services"
                    />
                  </div>
                </div>

                {/* Media & Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Image URL</label>
                    <input 
                      type="text" 
                      value={formData.image} 
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="/features/feature.png"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description</label>
                    <textarea 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all resize-none"
                      placeholder="Brief description..."
                    />
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-100 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={formData.isActive}
                        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#186675]"></div>
                    </div>
                    <div>
                      <div className="text-[14px] font-bold text-gray-800">Active Status</div>
                      <div className="text-[12px] text-gray-500">Visible to customers</div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3 rounded-b-2xl">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 text-[14px] font-medium text-gray-600 hover:bg-gray-200 bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm hover:shadow"
                >
                  {editingId ? "Save Changes" : "Create Feature"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
