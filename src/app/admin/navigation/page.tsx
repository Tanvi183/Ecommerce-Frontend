"use client";

import React, { useState, useEffect } from "react";
import { getSettings, updateSettings } from "@/lib/adminApi";
import { toast } from "sonner";
import { Save, Plus, Trash2, Link as LinkIcon, MoveUp, MoveDown } from "lucide-react";

export default function AdminNavigationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [navLinks, setNavLinks] = useState<any[]>([]);

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      if (res.data.success && res.data.data) {
        setNavLinks(res.data.data.navLinks || []);
      }
    } catch (error) {
      toast.error("Failed to load navigation settings");
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
      const res = await getSettings();
      const currentSettings = res.data.data || {};
      
      await updateSettings({ ...currentSettings, navLinks });
      toast.success("Navigation menu updated successfully");
    } catch (error: any) {
      toast.error("Failed to save navigation menu");
    } finally {
      setIsSaving(false);
    }
  };

  const addParentLink = () => {
    setNavLinks([
      ...navLinks, 
      { id: Date.now().toString(), label: "New Link", href: "/", isOffer: false, subLinks: [] }
    ]);
  };

  const removeParentLink = (index: number) => {
    const updated = [...navLinks];
    updated.splice(index, 1);
    setNavLinks(updated);
  };

  const moveParentLink = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === navLinks.length - 1) return;
    
    const updated = [...navLinks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setNavLinks(updated);
  };

  const updateParentLink = (index: number, field: string, value: any) => {
    const updated = [...navLinks];
    updated[index][field] = value;
    setNavLinks(updated);
  };

  // Sublink operations
  const addSubLink = (parentIndex: number) => {
    const updated = [...navLinks];
    if (!updated[parentIndex].subLinks) {
      updated[parentIndex].subLinks = [];
    }
    updated[parentIndex].subLinks.push({ label: "Sub Link", href: "/" });
    setNavLinks(updated);
  };

  const removeSubLink = (parentIndex: number, subIndex: number) => {
    const updated = [...navLinks];
    updated[parentIndex].subLinks.splice(subIndex, 1);
    setNavLinks(updated);
  };

  const updateSubLink = (parentIndex: number, subIndex: number, field: string, value: any) => {
    const updated = [...navLinks];
    updated[parentIndex].subLinks[subIndex][field] = value;
    setNavLinks(updated);
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 font-medium animate-pulse">Loading navigation data...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900 tracking-tight">Navigation Menu</h1>
          <p className="text-[14px] text-gray-500 mt-1">Manage the top navigation links and dropdown menus.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-[#186675] to-[#208498] hover:from-[#13525e] hover:to-[#186675] text-white px-6 py-2.5 rounded-lg text-[14px] font-bold transition-all shadow-sm hover:shadow flex items-center gap-2 disabled:opacity-70"
        >
          <Save size={18} strokeWidth={2.5} /> {isSaving ? "Saving..." : "Save Menu"}
        </button>
      </div>

      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <p className="text-[14px] text-gray-600 font-medium">Add main links to your header navbar.</p>
        <button 
          onClick={addParentLink}
          className="bg-[#186675]/10 text-[#186675] hover:bg-[#186675]/20 px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 transition-colors"
        >
          <Plus size={16} /> Add Main Link
        </button>
      </div>

      <div className="space-y-4 max-w-4xl">
        {navLinks.map((link, pIndex) => (
          <div key={link.id || pIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Parent Link Row */}
            <div className="p-4 bg-gray-50/80 border-b border-gray-100 flex items-start gap-4">
              <div className="flex flex-col gap-1 mt-1 opacity-50">
                <button onClick={() => moveParentLink(pIndex, 'up')} disabled={pIndex === 0} className="hover:text-[#186675] disabled:opacity-30"><MoveUp size={16} /></button>
                <button onClick={() => moveParentLink(pIndex, 'down')} disabled={pIndex === navLinks.length - 1} className="hover:text-[#186675] disabled:opacity-30"><MoveDown size={16} /></button>
              </div>

              <div className="flex-1 grid grid-cols-12 gap-4">
                <div className="col-span-5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Label</label>
                  <input 
                    type="text" 
                    value={link.label}
                    onChange={(e) => updateParentLink(pIndex, 'label', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-[#186675] focus:border-[#186675] font-bold"
                  />
                </div>
                <div className="col-span-5">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">URL (href)</label>
                  <input 
                    type="text" 
                    value={link.href}
                    onChange={(e) => updateParentLink(pIndex, 'href', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-1.5 text-[14px] outline-none focus:ring-1 focus:ring-[#186675] focus:border-[#186675]"
                  />
                </div>
                <div className="col-span-2 flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={link.isOffer || false}
                      onChange={(e) => updateParentLink(pIndex, 'isOffer', e.target.checked)}
                      className="rounded text-red-500 focus:ring-red-500"
                    />
                    <span className="text-[13px] font-bold text-red-500">Offer?</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <button 
                  onClick={() => removeParentLink(pIndex)}
                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
                  title="Remove Link"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Sublinks Section */}
            <div className="p-4 bg-white pl-14">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider">Dropdown Sub-links</h4>
                <button 
                  onClick={() => addSubLink(pIndex)}
                  className="text-[12px] font-bold text-[#186675] hover:text-[#13525e] flex items-center gap-1"
                >
                  <Plus size={14} /> Add Sublink
                </button>
              </div>

              {link.subLinks && link.subLinks.length > 0 ? (
                <div className="space-y-2">
                  {link.subLinks.map((subLink: any, sIndex: number) => (
                    <div key={sIndex} className="flex items-center gap-3 bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="w-1/2">
                        <input 
                          type="text" 
                          value={subLink.label}
                          onChange={(e) => updateSubLink(pIndex, sIndex, 'label', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#186675]"
                          placeholder="Sublink Label"
                        />
                      </div>
                      <div className="w-1/2">
                        <input 
                          type="text" 
                          value={subLink.href}
                          onChange={(e) => updateSubLink(pIndex, sIndex, 'href', e.target.value)}
                          className="w-full border border-gray-300 rounded px-3 py-1.5 text-[13px] outline-none focus:ring-1 focus:ring-[#186675]"
                          placeholder="Sublink URL"
                        />
                      </div>
                      <button 
                        onClick={() => removeSubLink(pIndex, sIndex)}
                        className="text-gray-400 hover:text-red-500 p-1 flex-shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-[13px] text-gray-400 italic">No sub-links. This will be a standard link.</div>
              )}
            </div>
          </div>
        ))}

        {navLinks.length === 0 && (
          <div className="text-center py-12 bg-white border border-gray-200 border-dashed rounded-xl">
            <LinkIcon size={40} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-[16px] font-bold text-gray-900">No Links Added</h3>
            <p className="text-[14px] text-gray-500 mt-1 mb-4">Start building your navigation menu.</p>
            <button 
              onClick={addParentLink}
              className="bg-[#186675] text-white hover:bg-[#13525e] px-4 py-2 rounded-lg text-[13px] font-bold inline-flex items-center gap-2 transition-colors"
            >
              <Plus size={16} /> Add First Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
