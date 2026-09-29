"use client";

import React from "react";
import { Header } from "@/modules/main/components/header";
import { Footer } from "@/modules/main/components/footer";
import { useCart } from "../contexts/cart-context";
import { Trash2, Plus, Minus, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export function CartPage() {
    const { state, updateQuantity, removeFromCart, checkout, loading } = useCart();
    const [isCheckingOut, setIsCheckingOut] = React.useState(false);

    const handleCheckout = async () => {
        setIsCheckingOut(true);
        const result = await checkout();
        setIsCheckingOut(false);
        if (result.success) {
            toast.success("Checkout successful!");
        } else {
            toast.error(result.message || "Checkout failed");
        }
    };

    const hasStaleItems = state.items.some(item => item.stock < item.quantity);

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
            <Header />

            <main className="grow w-full max-w-6xl mx-auto px-4 md:px-8 py-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-200 pb-4">Shopping Cart</h1>

                {loading ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <div className="animate-pulse space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-6">
                                    <div className="w-32 h-32 bg-gray-200 rounded-xl" />
                                    <div className="grow space-y-3">
                                        <div className="h-5 bg-gray-200 rounded w-1/2" />
                                        <div className="h-4 bg-gray-100 rounded w-1/4" />
                                        <div className="h-8 bg-gray-200 rounded w-32 mt-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : state.items.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center flex flex-col items-center">
                        <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-6xl">🛒</span>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Your cart is empty!</h2>
                        <p className="text-gray-500 mb-8">Add items to it now.</p>
                        <Link href="/" className="bg-[#008ECC] text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-600 transition shadow-md hover:shadow-lg">
                            Shop Now
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="grow space-y-4">
                            {state.items.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 relative group">
                                    <div className="w-full sm:w-32 h-32 bg-[#F8F9FA] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded" />
                                        )}
                                    </div>

                                    <div className="flex flex-col justify-between grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                                <p className="text-sm text-gray-500 mb-4">Seller: Megamart</p>
                                            </div>
                                            <div className="text-xl font-bold text-gray-900">
                                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                                            </div>
                                        </div>
                                        
                                        {item.stock < item.quantity && (
                                            <div className="flex items-center space-x-1 text-red-500 text-xs font-medium mt-1 bg-red-50 p-2 rounded-lg">
                                                <AlertCircle size={14} />
                                                <span>{item.stock === 0 ? "Out of stock" : `Only ${item.stock} left in stock`}</span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-end mt-4">
                                            <div className="flex items-center space-x-4 bg-[#F8F9FA] border border-gray-200 rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-[#008ECC] hover:bg-blue-50 transition disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="font-semibold text-gray-800 w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-md bg-white shadow-sm text-gray-600 hover:text-[#008ECC] hover:bg-blue-50 transition disabled:opacity-50"
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center space-x-1"
                                            >
                                                <Trash2 size={16} />
                                                <span className="hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="w-full lg:w-96 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-4">
                                <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-100">Order Summary</h3>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Price ({state.items.length} items)</span>
                                        <span className="font-medium text-gray-800">₹{state.total.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Delivery Charges</span>
                                        <span className="font-medium text-green-500">Free</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 border-dashed pt-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-800">Total Amount</span>
                                        <span className="text-2xl font-bold text-[#008ECC]">₹{state.total.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    disabled={hasStaleItems || isCheckingOut || state.items.length === 0}
                                    className="w-full bg-[#008ECC] text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-2 hover:bg-blue-600 transition shadow-lg shadow-blue-200 group disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <span>{isCheckingOut ? "Processing..." : "Proceed to Checkout"}</span>
                                    {!isCheckingOut && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                </button>

                                <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-gray-400">
                                    <span>🔒</span>
                                    <span>Safe and Secure Payments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
