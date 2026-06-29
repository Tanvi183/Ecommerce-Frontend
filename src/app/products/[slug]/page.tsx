"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import { Star, Minus, Plus, Heart, Share2, Check, ShieldCheck, Truck, ChevronRight } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<"description" | "specifications" | "reviews">("description");
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
    // In a real app, the store might support adding quantities directly. 
    // Here we'll just loop for dummy purposes, or call it once if the store handles it.
    // Our dummy store might only add 1 per call or have a quantity parameter.
    // Assuming addToCart takes (product) and just increments. 
    // To respect quantity, we'll call it `quantity` times.
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
    <div className="bg-[#f8f9fa] min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-4 mb-8">
        <Container>
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-[#186675]">Home</Link>
            <span className="mx-2">/</span>
            <Link href={ROUTES.products} className="hover:text-[#186675]">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-[#186675]">{product.name}</span>
          </div>
        </Container>
      </div>

      <Container>
        {/* Top Section: Gallery & Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Left: Image Gallery */}
            <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col">
              <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4 flex-1">
                <Image 
                  src={activeImage || product.thumbnail} 
                  alt={product.name} 
                  fill 
                  className="object-contain p-4"
                />
                {product.isNew && (
                  <div className="absolute top-4 left-4 bg-[#186675] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    NEW
                  </div>
                )}
                {product.isOnSale && (
                  <div className="absolute top-4 right-4 bg-[#e11b22] text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    SALE
                  </div>
                )}
              </div>
              
              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors flex-shrink-0 ${activeImage === img ? 'border-[#186675]' : 'border-transparent hover:border-gray-300 bg-gray-50'}`}
                    >
                      <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="p-8 lg:p-12 flex flex-col">
              {/* Brand & Title */}
              {product.brand && (
                <div className="text-sm font-bold text-[#186675] uppercase tracking-wider mb-2">
                  {product.brand}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Reviews & SKU */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#ffb629]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    {product.rating} ({product.reviewCount} Reviews)
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-500 border-l border-gray-200 pl-6">
                  SKU: <span className="text-gray-900">{product.sku}</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-4 mb-8">
                <div className="text-4xl font-extrabold text-[#186675]">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && (
                  <div className="text-lg font-bold text-gray-400 line-through mb-1">
                    {formatPrice(product.originalPrice)}
                  </div>
                )}
                {product.discountPercent && (
                  <div className="text-sm font-bold text-[#e11b22] bg-[#fce8e9] px-2 py-1 rounded mb-1.5">
                    Save {product.discountPercent}%
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-8">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-[#2db742]' : 'bg-gray-400'}`}></div>
                <span className="font-bold text-sm text-gray-700">
                  {product.stock > 0 ? `${product.stock} IN STOCK` : 'OUT OF STOCK'}
                </span>
              </div>

              {/* Action Area */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10 pb-10 border-b border-gray-100">
                {/* Quantity */}
                <div className="flex items-center border-2 border-gray-200 rounded-lg h-14 w-full sm:w-36">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#186675] hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full h-full text-center font-bold text-lg outline-none appearance-none"
                  />
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[#186675] hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {/* Add to Cart */}
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-[#186675] hover:bg-[#13525e] text-white h-14 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  ADD TO CART
                </button>
              </div>

              {/* Utility Actions */}
              <div className="flex items-center gap-6 text-sm font-bold text-gray-500">
                <button className="flex items-center gap-2 hover:text-[#186675] transition-colors">
                  <Heart size={18} /> Add to Wishlist
                </button>
                <button className="flex items-center gap-2 hover:text-[#186675] transition-colors">
                  <Share2 size={18} /> Share Product
                </button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="text-[#186675] mt-0.5"><ShieldCheck size={20} /></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Secure Payment</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">100% secure checkout</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-[#186675] mt-0.5"><Truck size={20} /></div>
                  <div>
                    <div className="text-sm font-bold text-gray-800">Free Shipping</div>
                    <div className="text-[12px] text-gray-500 mt-0.5">On orders over $500</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="flex flex-wrap border-b border-gray-200">
            <button 
              onClick={() => setActiveTab("description")}
              className={`flex-1 sm:flex-none px-8 py-5 font-bold text-sm tracking-wider uppercase transition-colors border-b-2 ${activeTab === "description" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-[#186675] hover:bg-gray-50"}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab("specifications")}
              className={`flex-1 sm:flex-none px-8 py-5 font-bold text-sm tracking-wider uppercase transition-colors border-b-2 ${activeTab === "specifications" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-[#186675] hover:bg-gray-50"}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className={`flex-1 sm:flex-none px-8 py-5 font-bold text-sm tracking-wider uppercase transition-colors border-b-2 ${activeTab === "reviews" ? "border-[#186675] text-[#186675]" : "border-transparent text-gray-500 hover:text-[#186675] hover:bg-gray-50"}`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="p-8 lg:p-12">
            {activeTab === "description" && (
              <div className="prose prose-teal max-w-none text-gray-600 leading-relaxed">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About This Product</h3>
                <p className="mb-6">{product.description}</p>
                <p>
                  Experience the best in home decor with our premium collections. 
                  Designed to elevate your living space, our products combine exceptional 
                  durability with stunning aesthetics. Transform any room into a masterpiece 
                  with this easy-to-install, high-quality material.
                </p>
                <ul className="mt-8 space-y-3">
                  <li className="flex items-center gap-3"><Check size={16} className="text-[#2db742]" /> Premium build quality</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-[#2db742]" /> Easy and fast installation</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-[#2db742]" /> Highly durable and water-resistant</li>
                  <li className="flex items-center gap-3"><Check size={16} className="text-[#2db742]" /> Environmentally friendly materials</li>
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 bg-gray-50 font-bold text-gray-700 w-1/3">Brand</td>
                        <td className="px-6 py-4 text-gray-600">{product.brand || "Décor Culture"}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-gray-50 font-bold text-gray-700 w-1/3">Category</td>
                        <td className="px-6 py-4 text-gray-600">{product.category?.name || "General"}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-gray-50 font-bold text-gray-700 w-1/3">SKU</td>
                        <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-gray-50 font-bold text-gray-700 w-1/3">Materials</td>
                        <td className="px-6 py-4 text-gray-600">Premium Composite</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 bg-gray-50 font-bold text-gray-700 w-1/3">Dimensions</td>
                        <td className="px-6 py-4 text-gray-600">Standard fit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Reviews</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex text-[#ffb629]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-lg font-bold text-gray-800">{product.rating} out of 5</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">Based on {product.reviewCount} reviews</p>
                  </div>
                  <button className="bg-white border-2 border-[#186675] text-[#186675] hover:bg-[#186675] hover:text-white transition-colors px-6 py-3 rounded-lg font-bold shadow-sm">
                    Write a Review
                  </button>
                </div>
                
                {/* Mock Reviews List */}
                <div className="space-y-6">
                  {[
                    { name: "Sarah Jenkins", date: "June 12, 2026", rating: 5, comment: "Absolutely love this! The quality is way better than I expected for the price. Highly recommended." },
                    { name: "Michael T.", date: "May 28, 2026", rating: 4, comment: "Looks great in my living room. Installation was straightforward, though it took a bit of time." },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-gray-800">{review.name}</div>
                          <div className="text-[12px] text-gray-400 mt-0.5">{review.date}</div>
                        </div>
                        <div className="flex text-[#ffb629]">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} fill={j < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">You May Also Like</h2>
            <Link href={ROUTES.products} className="text-[#186675] font-bold text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayRelated.map((relatedProd) => (
              <ProductCard key={relatedProd.id} product={relatedProd} />
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
}
