"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProductBySlug } from '@/lib/adminApi';
import { 
  ChevronRight, 
  ChevronLeft,
  Edit2, 
  Star, 
  DollarSign, 
  FileText, 
  Layers, 
  Inbox, 
  Check,
  ShoppingCart
} from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const [activeTab, setActiveTab] = useState('specification');
  const [mainImage, setMainImage] = useState(0);
  const [productData, setProductData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      getProductBySlug(slug)
        .then(res => {
          if (res.data && res.data.success) {
            setProductData(res.data.data);
            setMainImage(0); // Reset main image on product load
          }
        })
        .catch(err => console.error("Failed to fetch product", err))
        .finally(() => setIsLoading(false));
    }
  }, [slug]);

  const defaultImages = [
    "https://themesbrand.com/velzon/html/master/assets/images/products/img-8.png",
    "https://themesbrand.com/velzon/html/master/assets/images/products/img-6.png",
    "https://themesbrand.com/velzon/html/master/assets/images/products/img-1.png",
    "https://themesbrand.com/velzon/html/master/assets/images/products/img-8.png"
  ];

  const images = productData?.images?.length ? productData.images : defaultImages;

  const displayData = productData || {
    name: "Full Sleeve Sweatshirt for Men (Pink)",
    brand: { name: "Tommy Hilfiger" },
    seller: "Zoetic Fashion",
    createdAt: "2021-03-26T10:00:00.000Z",
    rating: 4.5,
    reviewCount: 5500,
    price: 120.40,
    orders: 2234, // Mock
    stock: 1230,
    revenue: 60645, // Mock
    description: "Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton. Material composition is 100% organic cotton. This is one of the world’s leading designer lifestyle brands and is internationally recognized for celebrating the essence of classic American cool style, featuring preppy with a twist designs."
  };

  return (
    <div className="p-4 sm:p-6 pb-20">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h4 className="text-[16px] font-bold text-gray-800 dark:text-white uppercase">Product Details</h4>
        <div className="flex items-center text-[13px] text-gray-500 mt-2 sm:mt-0">
          <Link href="/admin/ecommerce" className="hover:text-[#186675]">Ecommerce</Link>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-gray-400">Product Details</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column - Images */}
            <div className="xl:col-span-4 max-w-md mx-auto xl:mx-0 w-full xl:sticky xl:top-24 xl:self-start">
              {/* Main Image */}
              <div className="bg-[#f3f6f9] dark:bg-gray-700/50 rounded p-4 mb-4 flex items-center justify-center min-h-[350px] relative">
                <button 
                  onClick={() => setMainImage(prev => prev > 0 ? prev - 1 : images.length - 1)} 
                  className="absolute left-2 w-8 h-8 rounded bg-[#e8ebf0] dark:bg-gray-600 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors shadow-sm"
                >
                   <ChevronLeft size={18} />
                </button>
                
                <img 
                  src={images[mainImage]} 
                  alt="Product" 
                  className="max-w-full max-h-[300px] object-contain drop-shadow-md"
                />

                <button 
                  onClick={() => setMainImage(prev => prev < images.length - 1 ? prev + 1 : 0)} 
                  className="absolute right-2 w-8 h-8 rounded bg-[#e8ebf0] dark:bg-gray-600 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors shadow-sm"
                >
                   <ChevronRight size={18} />
                </button>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3 justify-center">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setMainImage(idx)}
                    className={`w-20 h-20 bg-transparent flex items-center justify-center p-2 rounded transition-all ${
                      mainImage === idx ? 'ring-1 ring-gray-200 dark:ring-gray-700' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="xl:col-span-8">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-[18px] font-medium text-gray-800 dark:text-gray-100 mb-2">{displayData.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray-500">
                    <a href="#" className="text-[#405189] hover:underline">{displayData.brand?.name || 'Unknown Brand'}</a>
                    <div className="w-[1px] h-3.5 bg-gray-300 dark:bg-gray-600"></div>
                    <span>Seller : <span className="font-semibold text-gray-700 dark:text-gray-300">{displayData.seller || 'Zoetic Fashion'}</span></span>
                    <div className="w-[1px] h-3.5 bg-gray-300 dark:bg-gray-600"></div>
                    <span>Published : <span className="font-semibold text-gray-700 dark:text-gray-300">{new Date(displayData.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
                  </div>
                </div>
                <Link href="/admin/products/edit" className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors shrink-0 border border-gray-100 dark:border-gray-700" title="Edit">
                  <Edit2 size={14} />
                </Link>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} className="text-gray-200 dark:text-gray-700" />
                </div>
                <span className="text-gray-500 text-[13px]">( {displayData.reviewCount || 0} Customer Review )</span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded p-3 flex items-center">
                  <div className="w-10 h-10 rounded flex items-center justify-center text-[#0ab39c] mr-2">
                    <DollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[13px] mb-0.5">Price :</p>
                    <h5 className="font-medium text-[15px] text-gray-800 dark:text-white">${displayData.price?.toFixed(2)}</h5>
                  </div>
                </div>
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded p-3 flex items-center">
                  <div className="w-10 h-10 rounded flex items-center justify-center text-[#0ab39c] mr-2">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[13px] mb-0.5">No. of Orders :</p>
                    <h5 className="font-medium text-[15px] text-gray-800 dark:text-white">{displayData.orders || 0}</h5>
                  </div>
                </div>
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded p-3 flex items-center">
                  <div className="w-10 h-10 rounded flex items-center justify-center text-[#0ab39c] mr-2">
                    <Layers size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[13px] mb-0.5">Available Stocks :</p>
                    <h5 className="font-medium text-[15px] text-gray-800 dark:text-white">{displayData.stock || 0}</h5>
                  </div>
                </div>
                <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded p-3 flex items-center">
                  <div className="w-10 h-10 rounded flex items-center justify-center text-[#0ab39c] mr-2">
                    <Inbox size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[13px] mb-0.5">Total Revenue :</p>
                    <h5 className="font-medium text-[15px] text-gray-800 dark:text-white">${(displayData.revenue || 0).toLocaleString()}</h5>
                  </div>
                </div>
              </div>

              {/* Sizes and Colors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div>
                  <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-3">Sizes :</h5>
                  <div className="flex gap-2">
                    <button disabled className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[12px] text-gray-400 bg-gray-50 dark:bg-gray-800 cursor-not-allowed">S</button>
                    <button className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center text-[12px] text-[#186675] bg-[#186675]/10 hover:bg-[#186675] hover:text-white transition-colors">M</button>
                    <button className="w-8 h-8 rounded-full border border-transparent flex items-center justify-center text-[12px] text-[#186675] bg-[#186675]/10 hover:bg-[#186675] hover:text-white transition-colors">L</button>
                    <button disabled className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[12px] text-gray-400 bg-gray-50 dark:bg-gray-800 cursor-not-allowed">XL</button>
                  </div>
                </div>
                <div>
                  <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-3">Colors :</h5>
                  <div className="flex flex-wrap gap-2">
                    <button disabled className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-gray-100 bg-[#186675] text-white cursor-not-allowed opacity-50"><Check size={14}/></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-400 text-transparent hover:text-white transition-colors border-2 border-transparent"></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-green-500 text-transparent hover:text-white transition-colors border-2 border-transparent"></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-cyan-400 text-transparent hover:text-white transition-colors border-2 border-transparent"></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-500 text-transparent hover:text-white transition-colors border-2 border-transparent"></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-red-500 text-transparent hover:text-white transition-colors border-2 border-transparent"></button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-2">Description :</h5>
                <p className="text-[13px] text-gray-500 leading-relaxed">
                  {displayData.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-3">Features :</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center text-[13px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> Full Sleeve</li>
                    <li className="flex items-center text-[13px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> Cotton</li>
                    <li className="flex items-center text-[13px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> All Sizes available</li>
                    <li className="flex items-center text-[13px] text-gray-500"><span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></span> 4 Different Color</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-3">Services :</h5>
                  <ul className="space-y-2">
                    <li className="flex items-center text-[13px] text-gray-500"><Check size={14} className="text-[#0ab39c] mr-2" /> 10 Days Replacement</li>
                    <li className="flex items-center text-[13px] text-gray-500"><Check size={14} className="text-[#0ab39c] mr-2" /> Cash on Delivery available</li>
                  </ul>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-8">
                <button className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors">
                  Close
                </button>
                <button className="bg-[#186675] hover:bg-[#13525e] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold transition-colors flex items-center gap-2">
                  <ShoppingCart size={16} /> Add To Cart
                </button>
              </div>

              {/* Tabs Section */}
              <div className="mt-10 border-t border-gray-100 dark:border-gray-700 pt-6">
                <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-4">Product Description :</h5>
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  <button 
                    onClick={() => setActiveTab('specification')}
                    className={`pb-3 px-4 text-[13px] font-semibold transition-colors ${
                      activeTab === 'specification' 
                        ? 'text-[#0ab39c] border-b-2 border-[#0ab39c]' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
                    }`}
                  >
                    Specification
                  </button>
                  <button 
                    onClick={() => setActiveTab('details')}
                    className={`pb-3 px-4 text-[13px] font-semibold transition-colors ${
                      activeTab === 'details' 
                        ? 'text-[#0ab39c] border-b-2 border-[#0ab39c]' 
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent'
                    }`}
                  >
                    Details
                  </button>
                </div>

                <div className="py-4">
                  {activeTab === 'specification' && (
                    <table className="w-full text-left text-[13px]">
                      <tbody>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <th className="py-2.5 font-semibold text-gray-700 dark:text-gray-300 w-1/3">Category</th>
                          <td className="py-2.5 text-gray-500">T-Shirt</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <th className="py-2.5 font-semibold text-gray-700 dark:text-gray-300">Brand</th>
                          <td className="py-2.5 text-gray-500">Tommy Hilfiger</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <th className="py-2.5 font-semibold text-gray-700 dark:text-gray-300">Color</th>
                          <td className="py-2.5 text-gray-500">Pink</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <th className="py-2.5 font-semibold text-gray-700 dark:text-gray-300">Material</th>
                          <td className="py-2.5 text-gray-500">Cotton</td>
                        </tr>
                        <tr>
                          <th className="py-2.5 font-semibold text-gray-700 dark:text-gray-300">Weight</th>
                          <td className="py-2.5 text-gray-500">140 Gram</td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                  {activeTab === 'details' && (
                    <div className="text-[13px] text-gray-500 leading-relaxed">
                      <p className="mb-2">This is a premium quality sweatshirt from Tommy Hilfiger. Built with 100% organic cotton to provide maximum comfort and durability.</p>
                      <p>Wash care instructions: Machine wash cold with like colors. Tumble dry low. Do not bleach.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ratings & Reviews */}
              <div className="mt-8">
                <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-4">Ratings & Reviews</h5>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Overall Rating & Progress Bars */}
                  <div className="lg:col-span-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex text-amber-400">
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} fill="currentColor" />
                          <Star size={16} className="text-gray-300 dark:text-gray-600" />
                        </div>
                        <span className="font-semibold text-gray-700 dark:text-gray-200">4.5 out of 5</span>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <p className="text-gray-500 text-[13px]">Total <span className="font-bold text-gray-700 dark:text-gray-300">5.50k</span> reviews</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-[12px] text-gray-500">
                        <span className="w-12">5 star</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-[#0ab39c] h-1.5 rounded-full" style={{ width: '50.16%' }}></div>
                        </div>
                        <span className="w-10 text-right">2758</span>
                      </div>
                      <div className="flex items-center text-[12px] text-gray-500">
                        <span className="w-12">4 star</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-[#0ab39c] h-1.5 rounded-full" style={{ width: '19.32%' }}></div>
                        </div>
                        <span className="w-10 text-right">1063</span>
                      </div>
                      <div className="flex items-center text-[12px] text-gray-500">
                        <span className="w-12">3 star</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-[#0ab39c] h-1.5 rounded-full" style={{ width: '18.12%' }}></div>
                        </div>
                        <span className="w-10 text-right">997</span>
                      </div>
                      <div className="flex items-center text-[12px] text-gray-500">
                        <span className="w-12">2 star</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '7.41%' }}></div>
                        </div>
                        <span className="w-10 text-right">408</span>
                      </div>
                      <div className="flex items-center text-[12px] text-gray-500">
                        <span className="w-12">1 star</span>
                        <div className="flex-1 mx-3 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                          <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '4.98%' }}></div>
                        </div>
                        <span className="w-10 text-right">274</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Review List */}
                  <div className="lg:col-span-8">
                    <h5 className="text-[14px] font-bold text-gray-800 dark:text-white mb-4">Reviews:</h5>
                    <div className="space-y-6">
                      
                      {/* Review 1 */}
                      <div className="border-b border-gray-100 dark:border-gray-700 border-dashed pb-6">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="bg-[#0ab39c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> 4.2
                          </div>
                          <p className="text-[13px] text-gray-500 m-0">Superb sweatshirt. I loved it. It is for winter.</p>
                        </div>
                        <div className="flex gap-2 mb-4 pl-12">
                          <img src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg" alt="" className="w-12 h-12 rounded object-cover" />
                          <img src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg" alt="" className="w-12 h-12 rounded object-cover" />
                          <img src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-4.jpg" alt="" className="w-12 h-12 rounded object-cover" />
                        </div>
                        <div className="flex justify-between items-center text-[12px] text-gray-500 pl-12">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Henry</span>
                          <span>12 Jul, 21</span>
                        </div>
                      </div>

                      {/* Review 2 */}
                      <div className="pb-2">
                        <div className="flex items-start gap-4 mb-3">
                          <div className="bg-[#0ab39c] text-white text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> 4.0
                          </div>
                          <p className="text-[13px] text-gray-500 m-0">Great at this price, Product quality and look is awesome.</p>
                        </div>
                        <div className="flex justify-between items-center text-[12px] text-gray-500 pl-12">
                          <span className="font-semibold text-gray-700 dark:text-gray-300">Nancy</span>
                          <span>06 Jul, 21</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
