"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h1 className="text-[20px] font-bold text-gray-800">Reviews Management</h1>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-lg text-[14px]">
        <p className="font-bold mb-1">Global reviews view is pending backend support.</p>
        <p>Currently, reviews are fetched on a per-product basis on the product detail pages. A global "get all reviews" admin endpoint can be added in a future update to populate this table.</p>
      </div>
    </div>
  );
}
