"use client";

import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import Container from "@/components/common/Container";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#f8f9fa] py-16">
      <Container className="max-w-2xl text-center px-4">
        {/* Animated 404 Text */}
        <div className="relative inline-block mb-8">
          <h1 className="text-[120px] md:text-[180px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#186675] to-[#277b8c] leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full animate-pulse opacity-10">
            <h1 className="text-[120px] md:text-[180px] font-extrabold text-[#186675] leading-none tracking-tighter blur-xl">
              404
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 relative z-10">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={32} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
            We can't seem to find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#186675] hover:bg-[#13525e] text-white px-8 py-3.5 rounded-lg font-bold transition-colors shadow-md hover:shadow-lg"
            >
              <Home size={18} />
              Back to Home
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3.5 rounded-lg font-bold transition-colors"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 text-sm text-gray-400">
          If you believe this is an error, please contact our support team.
        </div>
      </Container>
    </div>
  );
}
