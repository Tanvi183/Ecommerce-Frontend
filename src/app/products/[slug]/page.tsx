"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Star, ChevronUp, ChevronDown, ShoppingCart, CreditCard, Heart, Share2, Check, ShieldCheck, Truck, ChevronRight, MessageCircle } from "lucide-react";
import Container from "@/components/common/Container";
import { dummyProducts } from "@/constants/dummyProducts";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/cards/ProductCard";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import CartToast from "@/components/common/CartToast";
import { ROUTES } from "@/constants/routes";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [mounted, setMounted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [activeImage, setActiveImage] = useState<string>("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Find product
  const product = dummyProducts.find((p) => p.slug === resolvedParams.slug);

  // Set initial active image
  useEffect(() => {
    if (product && !activeImage) {
      setActiveImage(product.images[0] || product.thumbnail);
    }
  }, [product, activeImage]);

  if (!product) {
    notFound();
  }

  // Generate some related products (same category or random)
  const relatedProducts = dummyProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  // Fallback if not enough related products
  const displayRelated = relatedProducts.length >= 4 
    ? relatedProducts 
    : dummyProducts.filter(p => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for(let i=0; i<quantity; i++) {
      addToCart(product);
    }
    
    toast.custom((t) => (
      <CartToast product={product} toastId={t} />
    ), { 
      duration: 3000,
      position: 'top-right'
    });
  };

  if (!mounted) return null;

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16 font-sans">
      {/* Breadcrumb */}
      <div className="bg-[#f3f4f6] border-b border-gray-200 py-3 mb-8">
        <Container>
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#186675]">Home</Link>
            <span className="mx-2">/</span>
            <Link href={ROUTES.products} className="hover:text-[#186675]">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </Container>
      </div>

      <Container>
        {/* Top Section: Gallery & Info */}
        <div className="bg-white shadow-sm border border-gray-100 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Left: Image Gallery (Vertical Thumbnails) */}
            <div className="p-4 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 flex gap-4 h-full">
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex flex-col gap-3 overflow-y-auto pr-1 w-[80px] flex-shrink-0 hide-scrollbar h-[500px]">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-full aspect-square border-2 transition-colors flex-shrink-0 ${activeImage === img ? 'border-[#186675]' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <Image src={img} alt={`${product.name} thumbnail ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
              
              {/* Main Image */}
              <div className="relative flex-1 bg-gray-50 min-h-[300px] h-[500px]">
                <Image 
                  src={activeImage || product.thumbnail} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-2"
                />
                {product.isNew && (
                  <div className="absolute top-0 right-0 bg-[#186675] text-white text-[12px] font-bold px-3 py-1 shadow-sm">
                    NEW
                  </div>
                )}
                {product.isOnSale && (
                  <div className="absolute top-0 right-0 bg-[#e11b22] text-white text-[12px] font-bold px-3 py-1 shadow-sm">
                    SALE
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              <h1 className="text-[32px] font-bold text-gray-900 mb-2 leading-tight">
                {product.name}
              </h1>

              {/* Reviews & Links */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex text-transparent border border-gray-300 text-sm">
                  {/* Empty star outlines matching reference image closely */}
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "text-[#ffb629] fill-[#ffb629]" : "text-gray-300"} />
                  ))}
                </div>
                <button className="text-[13px] text-[#186675] hover:underline" onClick={() => setActiveTab("reviews")}>Based on {product.reviewCount} reviews.</button>
                <span className="text-gray-400">-</span>
                <button className="text-[13px] text-[#186675] hover:underline" onClick={() => setActiveTab("reviews")}>Write a review</button>
              </div>

              {/* Pricing & Stock Row */}
              <div className="flex items-start gap-8 border-y border-gray-100 py-6 mb-8">
                <div>
                  <div className="flex items-end gap-1">
                    <span className="text-[40px] font-extrabold text-gray-900 leading-none">{product.price}</span>
                    <span className="text-[30px] font-extrabold text-gray-900 leading-none">৳</span>
                  </div>
                  <div className="text-[13px] text-gray-900 mt-1">{product.price}৳ Per - SFT</div>
                </div>
                
                <div className="flex flex-col justify-center h-full gap-1.5 pt-1 border-l border-gray-100 pl-8">
                  <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#2db742]">
                    <Check size={16} strokeWidth={3} /> IN STOCK
                  </div>
                  <div className="text-[13px] text-gray-900">
                    <span className="text-gray-500">•</span> Model: {product.sku}
                  </div>
                </div>
              </div>

              {/* Action Area */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                {/* Quantity Stacked Arrows */}
                <div className="flex items-center border border-gray-300 rounded overflow-hidden h-[46px] bg-white">
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 h-full text-center font-bold outline-none border-r border-gray-300 appearance-none"
                  />
                  <div className="flex flex-col w-8 h-full bg-gray-50">
                    <button onClick={() => setQuantity(q => q+1)} className="flex-1 flex items-center justify-center border-b border-gray-300 hover:bg-gray-200 text-gray-600">
                      <ChevronUp size={14} strokeWidth={3} />
                    </button>
                    <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="flex-1 flex items-center justify-center hover:bg-gray-200 text-gray-600">
                      <ChevronDown size={14} strokeWidth={3} />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 min-w-[150px] bg-[#186675] hover:bg-[#13525e] text-white h-[46px] rounded font-bold text-[14px] transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm"
                >
                  <ShoppingCart size={18} /> Add To Cart
                </button>
                
                <button 
                  className="flex-1 min-w-[150px] bg-[#13525e] hover:bg-[#0c3942] text-white h-[46px] rounded font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <CreditCard size={18} /> Buy Now
                </button>
              </div>

              {/* WhatsApp Customer Service Banner */}
              <div className="bg-[#2db742] rounded-[30px] p-2 pr-8 flex items-center gap-4 w-fit hover:bg-[#259937] transition-colors cursor-pointer text-white shadow-sm">
                <div className="w-12 h-12 bg-transparent border border-white/30 rounded-full flex items-center justify-center">
                  <MessageCircle size={26} className="text-white fill-white" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-white/90">
                    Customer Service <span className="opacity-50">/</span> Product Manager
                  </div>
                  <div className="text-[16px] font-bold leading-tight">Need Help? Chat us Now!</div>
                  <div>
                    <span className="inline-block bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-sm mt-0.5">Online</span>
                  </div>
                </div>
              </div>

              {/* Key Feature Placeholder */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Feature</h3>
                {/* No key features mapped directly yet, leaving empty as per reference */}
              </div>

            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          {/* Pill Tabs */}
          <div className="flex justify-center gap-3 mb-6">
            <button 
              onClick={() => setActiveTab("description")}
              className={`px-8 py-2.5 rounded text-[13px] font-bold tracking-wider uppercase transition-colors ${activeTab === "description" ? "bg-[#e5e7eb] text-gray-900" : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`px-8 py-2.5 rounded text-[13px] font-bold tracking-wider uppercase transition-colors ${activeTab === "reviews" ? "bg-[#e5e7eb] text-gray-900" : "bg-transparent text-gray-500 hover:bg-gray-100"}`}
            >
              Reviews (0)
            </button>
          </div>

          {/* Description / Content Box */}
          <div className="bg-[#f3f4f6] p-8 lg:p-12">
            {activeTab === "description" && (
              <div className="prose prose-teal max-w-none text-gray-700 text-[15px] leading-relaxed">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{product.name}</h2>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{product.category?.name} – Ideal for High-Traffic Areas</h4>
                
                <p className="mb-4">
                  This <strong>{product.category?.name}</strong> is an excellent choice for commercial and residential floors, offering exceptional durability and long-lasting performance. Designed to withstand heavy foot traffic, it is perfect for high-traffic environments such as <strong>hospitals</strong>, <strong>medical facilities</strong>, <strong>supermarkets</strong>, and <strong>office lobbies</strong>.
                </p>
                <p className="mb-6">
                  Its <strong>waterproof properties</strong> make it ideal for use in <strong>healthcare environments</strong>, <strong>kitchens</strong>, and <strong>bathrooms</strong>, effectively preventing moisture damage and ensuring a clean, hygienic surface. Installation is simple, with options for <strong>floating</strong> or <strong>glued-down methods</strong>, making it suitable for both professional installers and DIY enthusiasts.
                </p>

                <div className="space-y-1 font-bold text-gray-900">
                  <p>Size: Roll Size 6 feet 7 inchi</p>
                  <p>Capacity: 2ton</p>
                  <p>Made in Chaina</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-300 flex flex-wrap gap-2 items-center text-sm">
                  <span className="font-medium mr-2">Tags:</span>
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-gray-800 text-white px-3 py-1 rounded text-[12px]">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-10">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-500 mb-6">Be the first to review this product!</p>
                <button className="bg-[#186675] hover:bg-[#13525e] text-white transition-colors px-6 py-3 rounded font-bold shadow-sm">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight uppercase">Related Products</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayRelated.map((relatedProd) => (
              <ProductCard key={relatedProd.id} product={relatedProd} />
            ))}
          </div>
        </div>
        
        {/* You Might Like */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-[22px] font-bold text-gray-900 tracking-tight uppercase">You Might Like</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayRelated.slice().reverse().map((relatedProd) => (
              <ProductCard key={relatedProd.id + 'might-like'} product={relatedProd} />
            ))}
          </div>
        </div>

      </Container>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
