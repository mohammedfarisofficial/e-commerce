import React from "react";
import { Header } from "@/modules/main/components/header";
import { Footer } from "@/modules/main/components/footer";
import { apiFetch } from "@/config/request";

async function getProduct(slug: string) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1"}/products/${slug}`, {
            next: { revalidate: 60 } // Revalidate every 60 seconds
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data?.product || null;
    } catch (error) {
        return null;
    }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);

    // Fallback to static mock data if API fails or product not found
    const staticProduct = product || {
        name: "Galaxy S22 Ultra",
        price: 67999,
        originalPrice: 85999,
        discount: 56,
        description: "The latest Samsung Galaxy S22 Ultra with 108MP camera, S-Pen and massive battery.",
        image: "https://via.placeholder.com/400x500?text=Galaxy+S22+Ultra"
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
            <Header />
            
            <main className="grow w-full max-w-6xl mx-auto px-4 md:px-8 py-10">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-10">
                    <div className="w-full md:w-1/2 flex items-center justify-center bg-[#F8F9FA] rounded-2xl p-8 relative">
                        {/* Discount Badge */}
                        <div className="absolute top-4 left-4 bg-[#008ECC] text-white text-xs font-bold px-3 py-2 rounded-lg z-10">
                            {staticProduct.discount || Math.round((staticProduct.originalPrice - staticProduct.price) / staticProduct.originalPrice * 100)}% OFF
                        </div>
                        
                        {/* Product Image placeholder */}
                        <div className="w-64 h-96 bg-gray-200 rounded-xl relative shadow-xl transform hover:scale-105 transition duration-300">
                            <div className="absolute inset-1 bg-black rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-500 opacity-80"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                            <span>Smartphones</span>
                            <span>/</span>
                            <span>{staticProduct.brand || "Samsung"}</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{staticProduct.name}</h1>
                        
                        <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100">
                            <span className="text-3xl font-bold text-[#008ECC]">₹{staticProduct.price}</span>
                            <span className="text-lg text-gray-400 line-through">₹{staticProduct.originalPrice}</span>
                            <span className="text-sm font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-md">
                                Save ₹{staticProduct.originalPrice - staticProduct.price}
                            </span>
                        </div>
                        
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed">
                                {staticProduct.description || "Experience the ultimate smartphone performance with stunning display, powerful processor, and an advanced camera system designed to capture every moment in exceptional detail."}
                            </p>
                        </div>
                        
                        <div className="flex gap-4">
                            <button className="flex-1 bg-[#008ECC] text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-200">
                                Buy Now
                            </button>
                            <button className="flex-1 bg-white text-[#008ECC] border-2 border-[#008ECC] py-4 rounded-xl font-semibold text-lg hover:bg-[#F3F9FB] transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}