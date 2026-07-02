"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import Container from "@/components/common/Container";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { ArrowLeft, CheckCircle2, CreditCard, Truck } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { toast } from "react-toastify";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  const { items, totalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "Bangladesh",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash_on_delivery");

  // Shipping cost constant for now
  const shippingCost = 100;
  const orderTotal = totalPrice + shippingCost;

  useEffect(() => {
    setIsMounted(true);
    
    // Auto-fill address if user has one saved
    if (user?.address) {
      setShippingAddress(prev => ({
        ...prev,
        ...user.address
      }));
    }
  }, [user]);

  // Auth and Empty Cart Guards
  useEffect(() => {
    if (!isMounted) return;
    
    if (!isAuthenticated) {
      toast.error("Please login to proceed to checkout");
      router.push(`${ROUTES.login}?redirect=/checkout`);
      return;
    }
    
    if (items.length === 0) {
      toast.info("Your cart is empty");
      router.push(ROUTES.cart);
    }
  }, [isMounted, isAuthenticated, items.length, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zip || !shippingAddress.phone) {
      toast.error("Please fill in all shipping address fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Map cart items to OrderItem schema
      const orderItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        slug: item.product.slug,
        price: item.product.price,
        quantity: item.quantity
      }));

      const payload = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
        total: orderTotal
      };

      const res = await api.post("/orders", payload);
      
      if (res.data.success) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/checkout/success?orderId=${res.data.data.id || res.data.data._id}`);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("Please, Login Before Order Place");
      } else {
        toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted || !isAuthenticated || items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#186675]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f9fa] min-h-screen pt-8 pb-20">
      <Container>
        <div className="mb-6">
          <Link href={ROUTES.cart} className="inline-flex items-center text-[#186675] hover:underline font-medium text-[14px]">
            <ArrowLeft size={16} className="mr-1" /> Back to Cart
          </Link>
          <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900 mt-2">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Forms */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Shipping Address Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#186675]/10 flex items-center justify-center text-[#186675]">
                  <Truck size={20} />
                </div>
                <h2 className="text-[20px] font-bold text-gray-900">Shipping Address</h2>
              </div>
              
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                    placeholder="House number and street name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">State / Division</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="State or Division"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Postal / Zip Code</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={shippingAddress.zip}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="Postal Code"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingAddress.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none focus:ring-2 focus:ring-[#186675]/20 focus:border-[#186675] transition-all"
                      placeholder="e.g. +8801XXXXXXXXX"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Country</label>
                    <input
                      type="text"
                      name="country"
                      readOnly
                      value={shippingAddress.country}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="hidden md:block"></div>
                </div>
              </form>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#186675]/10 flex items-center justify-center text-[#186675]">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-[20px] font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cash_on_delivery' ? 'border-[#186675] bg-[#186675]/5' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cash_on_delivery' ? 'border-[#186675]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cash_on_delivery' && <div className="w-2.5 h-2.5 rounded-full bg-[#186675]"></div>}
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">Cash on Delivery</span>
                      <span className="block text-[13px] text-gray-500">Pay with cash upon delivery.</span>
                    </div>
                  </div>
                </label>
                
                {/* Future payment methods can be added here */}
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-not-allowed opacity-60 bg-gray-50 border-gray-200`}>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    </div>
                    <div>
                      <span className="block font-bold text-gray-900">Online Payment (Coming Soon)</span>
                      <span className="block text-[13px] text-gray-500">Pay via Credit Card, bKash, Nagad etc.</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-[18px] font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 relative">
                      {item.product.thumbnail && (
                        <Image src={item.product.thumbnail} alt={item.product.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-gray-900 line-clamp-2">{item.product.name}</h4>
                      <div className="text-[13px] text-gray-500 mt-1">Qty: {item.quantity}</div>
                      <div className="text-[14px] font-bold text-[#186675] mt-0.5">{formatPrice(item.product.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-[14px] text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[14px] text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="font-bold text-gray-900">{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-[18px] text-gray-900 font-bold border-t border-gray-100 pt-4 mt-2">
                  <span>Total</span>
                  <span className="text-[#186675]">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full bg-[#186675] hover:bg-[#13525e] text-white py-3.5 rounded-xl font-bold text-[15px] transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  "Place Order"
                )}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-gray-500">
                <CheckCircle2 size={14} className="text-green-500" />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
