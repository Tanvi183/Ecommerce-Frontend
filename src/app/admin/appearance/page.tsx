"use client";

import React, { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/lib/adminApi";
import { toast } from "sonner";
import { Save, Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Type, Phone, Mail, MapPin, Share2 } from "lucide-react";

export default function AdminAppearancePage() {
  const [activeTab, setActiveTab] = useState("banners");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    header: { logo: "", contactEmail: "", contactPhone: "" },
    footer: { aboutText: "", address: "", phone: "", email: "", facebook: "", instagram: "", twitter: "", services: [] as any[] },
    banners: [] as any[]
  });

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      if (res.data.success && res.data.data) {
        setFormData({
          header: res.data.data.header || { logo: "", contactEmail: "", contactPhone: "" },
          footer: res.data.data.footer || { aboutText: "", address: "", phone: "", email: "", facebook: "", instagram: "", twitter: "", services: [] },
          banners: res.data.data.banners || []
        });
      }
    } catch (error) {
      toast.error("Failed to load appearance settings");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettings(formData);
      toast.success("Appearance settings updated successfully");
    } catch (error: any) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddBanner = () => {
    setFormData({
      ...formData,
      banners: [...formData.banners, { id: Date.now().toString(), image: "", title: "", subtitle: "", link: "" }]
    });
  };

  const handleRemoveBanner = (index: number) => {
    const newBanners = [...formData.banners];
    newBanners.splice(index, 1);
    setFormData({ ...formData, banners: newBanners });
  };

  const handleBannerChange = (index: number, field: string, value: string) => {
    const newBanners = [...formData.banners];
    newBanners[index][field] = value;
    setFormData({ ...formData, banners: newBanners });
  };

  const handleAddService = () => {
    const newServices = [...(formData.footer.services || []), { label: "", href: "" }];
    setFormData({ ...formData, footer: { ...formData.footer, services: newServices } });
  };

  const handleRemoveService = (index: number) => {
    const newServices = [...(formData.footer.services || [])];
    newServices.splice(index, 1);
    setFormData({ ...formData, footer: { ...formData.footer, services: newServices } });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...(formData.footer.services || [])];
    newServices[index][field] = value;
    setFormData({ ...formData, footer: { ...formData.footer, services: newServices } });
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-medium animate-pulse">Loading settings...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Appearance Settings</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage banners, header, and footer content globally.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm hover:shadow flex items-center gap-2 disabled:opacity-70"
        >
          <Save size={18} strokeWidth={2.5} /> {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("banners")}
          className={`px-5 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "banners" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Hero Banners
        </button>
        <button 
          onClick={() => setActiveTab("header")}
          className={`px-5 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "header" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Header
        </button>
        <button 
          onClick={() => setActiveTab("footer")}
          className={`px-5 py-3 text-[14px] font-bold border-b-2 transition-colors ${activeTab === "footer" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Footer
        </button>
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        
        {/* Banners Tab */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
              <p className="text-[14px] text-gray-600">Add slides to your homepage hero carousel.</p>
              <button 
                onClick={handleAddBanner}
                className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Plus size={16} /> Add Banner Slide
              </button>
            </div>

            <div className="grid gap-6">
              {formData.banners.map((banner, index) => (
                <div key={banner.id || index} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex gap-6 relative group">
                  <button 
                    onClick={() => handleRemoveBanner(index)}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>

                  <div className="w-1/3 flex-shrink-0">
                    <div className="aspect-[21/9] bg-gray-100 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden relative">
                      {banner.image ? (
                        <img src={banner.image} alt="Banner Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-gray-400 flex flex-col items-center">
                          <ImageIcon size={32} className="mb-2 opacity-50" />
                          <span className="text-[12px] font-medium">No Image URL</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><ImageIcon size={14} className="text-[#186675]" /> Image URL *</label>
                      <input 
                        type="text" 
                        value={banner.image} 
                        onChange={(e) => handleBannerChange(index, "image", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                        placeholder="https://example.com/banner.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Type size={14} className="text-[#186675]" /> Title Text</label>
                        <input 
                          type="text" 
                          value={banner.title} 
                          onChange={(e) => handleBannerChange(index, "title", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                          placeholder="e.g. Summer Sale"
                        />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Type size={14} className="text-[#186675]" /> Subtitle Text</label>
                        <input 
                          type="text" 
                          value={banner.subtitle} 
                          onChange={(e) => handleBannerChange(index, "subtitle", e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                          placeholder="e.g. Up to 50% off"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><LinkIcon size={14} className="text-[#186675]" /> Button Link</label>
                      <input 
                        type="text" 
                        value={banner.link} 
                        onChange={(e) => handleBannerChange(index, "link", e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                        placeholder="/products"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {formData.banners.length === 0 && (
                <div className="text-center py-16 bg-white border border-gray-200 border-dashed rounded-xl">
                  <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-[16px] font-bold text-gray-900">No Banners Added</h3>
                  <p className="text-[14px] text-gray-500 mt-1 mb-4">Add your first banner to display on the homepage.</p>
                  <button 
                    onClick={handleAddBanner}
                    className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg text-[13px] font-bold inline-flex items-center gap-2 transition-colors shadow-sm"
                  >
                    <Plus size={16} /> Add Banner Slide
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Header Tab */}
        {activeTab === "header" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl space-y-6">
            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><ImageIcon size={16} className="text-[#186675]" /> Main Logo URL</label>
              <input 
                type="text" 
                value={formData.header.logo} 
                onChange={(e) => setFormData({...formData, header: {...formData.header, logo: e.target.value}})}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                placeholder="/logo.png"
              />
              <p className="text-[12px] text-gray-500 mt-2">Used in the main navigation bar.</p>
            </div>

            <hr className="border-gray-100 my-6" />
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">Top Bar Contact Info</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Mail size={16} className="text-[#186675]" /> Support Email</label>
                <input 
                  type="text" 
                  value={formData.header.contactEmail} 
                  onChange={(e) => setFormData({...formData, header: {...formData.header, contactEmail: e.target.value}})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  placeholder="support@decornculture.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Phone size={16} className="text-[#186675]" /> Support Phone</label>
                <input 
                  type="text" 
                  value={formData.header.contactPhone} 
                  onChange={(e) => setFormData({...formData, header: {...formData.header, contactPhone: e.target.value}})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  placeholder="+880 1234 567890"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Tab */}
        {activeTab === "footer" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-3xl space-y-6">
            
            <div>
              <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Type size={16} className="text-[#186675]" /> About Us Text</label>
              <textarea 
                value={formData.footer.aboutText} 
                onChange={(e) => setFormData({...formData, footer: {...formData.footer, aboutText: e.target.value}})}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all resize-none"
                placeholder="A short description about Decor & Culture..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Details</h3>
                
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><MapPin size={16} className="text-[#186675]" /> Address</label>
                  <textarea 
                    value={formData.footer.address} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, address: e.target.value}})}
                    rows={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all resize-none"
                    placeholder="123 Decor Street, City..."
                  />
                </div>
                
                <div>
                  <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Phone size={16} className="text-[#186675]" /> Phone</label>
                  <input 
                    type="text" 
                    value={formData.footer.phone} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, phone: e.target.value}})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-[13px] font-bold text-gray-700 mb-1.5"><Mail size={16} className="text-[#186675]" /> Email</label>
                  <input 
                    type="text" 
                    value={formData.footer.email} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, email: e.target.value}})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center gap-2"><Share2 size={16}/> Social Links</h3>
                
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Facebook URL</label>
                  <input 
                    type="text" 
                    value={formData.footer.facebook} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, facebook: e.target.value}})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Instagram URL</label>
                  <input 
                    type="text" 
                    value={formData.footer.instagram} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, instagram: e.target.value}})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Twitter/X URL</label>
                  <input 
                    type="text" 
                    value={formData.footer.twitter} 
                    onChange={(e) => setFormData({...formData, footer: {...formData.footer, twitter: e.target.value}})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            <div className="space-y-6">
              <h3 className="text-[16px] font-bold text-gray-900 border-b border-gray-100 pb-2 flex items-center justify-between">
                <span>Footer Service Links</span>
                <button 
                  type="button"
                  onClick={handleAddService}
                  className="text-[12px] text-[#186675] hover:text-[#13525e] flex items-center gap-1 font-bold"
                >
                  <Plus size={14} /> Add Link
                </button>
              </h3>

              <div className="space-y-3">
                {(formData.footer.services || []).map((service: any, index: number) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Label</label>
                        <input 
                          type="text" 
                          value={service.label} 
                          onChange={(e) => handleServiceChange(index, "label", e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#186675]"
                          placeholder="e.g. Wallpaper"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">URL (href)</label>
                        <input 
                          type="text" 
                          value={service.href} 
                          onChange={(e) => handleServiceChange(index, "href", e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#186675]"
                          placeholder="/wallpaper"
                        />
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleRemoveService(index)}
                      className="text-gray-400 hover:text-red-500 mt-4 p-2 bg-white rounded-lg shadow-sm border border-gray-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {(!formData.footer.services || formData.footer.services.length === 0) && (
                  <div className="text-[13px] text-gray-400 italic py-6 text-center border border-dashed border-gray-200 bg-gray-50/50 rounded-xl">No service links added yet.</div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
