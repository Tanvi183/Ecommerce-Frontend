"use client";

import React, { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "@/lib/adminApi";
import { toast } from "sonner";
import { Edit2, Trash2, Plus, X, CornerDownRight, ChevronRight, ChevronDown } from "lucide-react";
import Swal from "sweetalert2";

const CategoryRow = ({ category, level, onEdit, onDelete, onAddSub }: { category: any, level: number, onEdit: (cat: any) => void, onDelete: (id: string) => void, onAddSub: (id: string) => void }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Collapsed by default
  const hasChildren = category.children && category.children.length > 0;

  let rowBg = 'bg-white';
  if (level === 1) rowBg = 'bg-[#fafafa]';
  if (level >= 2) rowBg = 'bg-[#f1f5f9]'; // very subtle blue-gray tint for sub-subcategories

  return (
    <React.Fragment>
      <tr className={`border-b border-gray-100 hover:bg-gray-50 transition-colors group ${rowBg}`}>
        <td className="px-6 py-4 w-20">
          {level === 0 ? (
            <div className="w-12 h-12 bg-gray-50 rounded-lg border border-gray-100 overflow-hidden shadow-sm flex-shrink-0">
              {category.image ? (
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
              )}
            </div>
          ) : null}
        </td>
        <td className="px-6 py-4 text-gray-700 flex items-center gap-3" style={{ paddingLeft: `${(level * 32) + 24}px` }}>
          {level > 0 && <div className="w-4 border-t-2 border-gray-200"></div>}
          {hasChildren ? (
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-6 h-6 flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded shadow-sm text-gray-500 transition-all flex-shrink-0">
              {isExpanded ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
            </button>
          ) : (
            <div className="w-6 flex-shrink-0"></div>
          )}
          <span className={level === 0 ? "text-[15px] font-bold text-gray-900" : "text-[14px] text-gray-700 font-medium"}>{category.name}</span>
        </td>
        <td className="px-6 py-4 text-gray-500 text-[13px]">{category.slug}</td>
        <td className="px-6 py-4 text-center">
           {category.children?.length ? (
             <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[#186675]/10 text-[#186675] text-[12px] font-bold">
               {category.children.length} Sub{category.children.length > 1 ? 's' : ''}
             </span>
           ) : (
             <span className="text-gray-300 text-[12px]">-</span>
           )}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onAddSub(category._id)} className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" title="Add Subcategory">
              <CornerDownRight size={16} strokeWidth={2.5} />
            </button>
            <button onClick={() => onEdit(category)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit">
              <Edit2 size={16} strokeWidth={2.5} />
            </button>
            <button onClick={() => onDelete(category._id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
              <Trash2 size={16} strokeWidth={2.5} />
            </button>
          </div>
        </td>
      </tr>
      
      {isExpanded && hasChildren && category.children.map((child: any) => (
        <CategoryRow key={child._id} category={{...child, parentId: category._id}} level={level + 1} onEdit={onEdit} onDelete={onDelete} onAddSub={onAddSub} />
      ))}
    </React.Fragment>
  );
};

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
    isActive: true
  });

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      if (!formData.parentId) {
        setSelectedPath([]);
      } else {
        const findPath = (cats: any[], targetId: string, currentPath: string[]): string[] | null => {
          for (const cat of cats) {
            const newPath = [...currentPath, cat._id];
            if (cat._id === targetId) return newPath;
            if (cat.children && cat.children.length > 0) {
              const found = findPath(cat.children, targetId, newPath);
              if (found) return found;
            }
          }
          return null;
        };
        const path = findPath(categories, formData.parentId, []) || [];
        setSelectedPath(path);
      }
    }
  }, [isModalOpen, formData.parentId, categories]);

  const handleOpenModal = (category?: any) => {
    if (category) {
      setEditingId(category._id);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        image: category.image || "",
        parentId: category.parentId || "",
        isActive: category.isActive !== undefined ? category.isActive : true
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "", description: "", image: "", parentId: "", isActive: true });
    }
    setIsModalOpen(true);
  };

  const handleAddSub = (parentId: string) => {
    setEditingId(null);
    setFormData({ name: "", slug: "", description: "", image: "", parentId, isActive: true });
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
        parentId: formData.parentId || null
      };

      if (editingId) {
        await updateCategory(editingId, payload);
        toast.success("Category updated successfully");
      } else {
        await createCategory(payload);
        toast.success("Category created successfully");
      }
      handleCloseModal();
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! Ensure it has no subcategories.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#186675',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted");
        fetchCategories();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to delete category");
      }
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-6">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Categories</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage your product categories and nested subcategories.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-5 py-2.5 rounded-lg text-[14px] font-medium transition-all shadow-sm hover:shadow flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={2.5} /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead>
              <tr className="bg-[#f8f9fa] border-b border-gray-100 text-gray-500 font-semibold uppercase text-[12px] tracking-wider">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4 text-center">Subcategories</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <CategoryRow key={cat._id} category={cat} level={0} onEdit={handleOpenModal} onDelete={handleDelete} onAddSub={handleAddSub} />
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No categories found.</td>
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
              <h2 className="text-[18px] font-bold text-gray-900">{editingId ? "Edit Category" : "Add New Category"}</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={handleNameChange} 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Slug <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.slug} 
                  onChange={(e) => setFormData({...formData, slug: e.target.value})} 
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all bg-gray-50/50"
                />
              </div>

              <div className="space-y-4 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                <label className="block text-[13px] font-bold text-gray-700">Category Placement</label>
                
                {/* Level 1 Dropdown */}
                <select 
                  value={selectedPath[0] || ""} 
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      setSelectedPath([]);
                      setFormData({ ...formData, parentId: "" });
                    } else {
                      setSelectedPath([val]);
                      setFormData({ ...formData, parentId: val });
                    }
                  }}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all bg-white shadow-sm"
                >
                  <option value="">None (Top-Level Category)</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id} disabled={cat._id === editingId}>
                      {cat.name}
                    </option>
                  ))}
                </select>

                {/* Deeper Levels Dropdowns */}
                {selectedPath.map((pathId, index) => {
                  const findCat = (cats: any[], id: string): any => {
                    for (const c of cats) {
                      if (c._id === id) return c;
                      if (c.children) {
                        const found = findCat(c.children, id);
                        if (found) return found;
                      }
                    }
                    return null;
                  };
                  
                  const currentCat = findCat(categories, pathId);
                  
                  if (!currentCat || !currentCat.children || currentCat.children.length === 0) {
                    return null;
                  }

                  return (
                    <div key={`level-${index + 1}`} className="flex items-start gap-2 relative">
                      <div className="mt-2 text-gray-400">
                        <CornerDownRight size={18} />
                      </div>
                      <select 
                        value={selectedPath[index + 1] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          const newPath = selectedPath.slice(0, index + 1);
                          if (val) {
                            newPath.push(val);
                            setFormData({ ...formData, parentId: val });
                          } else {
                            setFormData({ ...formData, parentId: pathId });
                          }
                          setSelectedPath(newPath);
                        }}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all bg-white shadow-sm"
                      >
                        <option value="">-- Direct Subcategory of {currentCat.name} --</option>
                        {currentCat.children.map((child: any) => (
                          <option key={child._id} value={child._id} disabled={child._id === editingId}>
                            {child.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Image URL</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})} 
                  placeholder="/categories/category.png"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 accent-[#186675] rounded cursor-pointer"
                />
                <label htmlFor="isActive" className="text-[14px] font-medium text-gray-700 cursor-pointer select-none">Active Status</label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-[14px] font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm hover:shadow"
                >
                  {editingId ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
