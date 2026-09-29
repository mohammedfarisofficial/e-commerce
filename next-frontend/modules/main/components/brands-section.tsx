"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function BrandsSection() {
    const brands = [
        { name: "IPHONE", icon: "Apple", bg: "bg-[#333333]", textColor: "text-white", discount: "UP to 80% OFF" },
        { name: "REALME", icon: "realme", bg: "bg-[#FFF0D4]", textColor: "text-gray-800", discount: "UP to 80% OFF" },
        { name: "XIAOMI", icon: "mi", bg: "bg-[#FFE4D6]", textColor: "text-gray-800", discount: "UP to 80% OFF" },
    ];

    return (
        <section className="px-4 md:px-8 py-10">
            <div className="flex justify-between items-end border-b border-[#008ECC] pb-2 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Top <span className="text-[#008ECC]">Electronics Brands</span>
                </h2>
                <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#008ECC] transition">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {brands.map((brand, idx) => (
                    <div key={idx} className={`${brand.bg} rounded-2xl p-6 relative overflow-hidden h-48 group cursor-pointer shadow-sm hover:shadow-md transition`}>
                        {/* Decorative background shape */}
                        <div className="absolute right-0 top-0 w-32 h-full bg-white/10 rounded-l-full"></div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="w-fit">
                                <span className={`text-xs font-bold px-3 py-1 rounded-md mb-2 block tracking-wider ${
                                    idx === 0 ? "bg-white/20 text-white" : idx === 1 ? "bg-[#FFC93E] text-gray-900" : "bg-[#FF9B62] text-white"
                                }`}>
                                    {brand.name}
                                </span>
                                {/* Icon placeholder */}
                                <div className={`w-10 h-10 mt-2 ${idx === 0 ? "bg-white" : idx === 1 ? "bg-[#FFC93E]" : "bg-[#FF6900]"} rounded-xl flex items-center justify-center`}>
                                    {/* Icon SVG */}
                                </div>
                            </div>
                            <div className={`${brand.textColor} text-xl font-bold`}>
                                {brand.discount}
                            </div>
                        </div>

                        {/* Phone image placeholder */}
                        <div className="absolute right-4 bottom-[-10%] w-24 h-40 bg-gray-800/80 rounded-xl border border-gray-600 shadow-2xl transform rotate-12 group-hover:rotate-0 transition duration-300">
                             <div className="absolute inset-1 bg-linear-to-t from-gray-900 to-gray-700 rounded-lg"></div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
                <span className="w-6 h-1.5 bg-[#008ECC] rounded-full block"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full block"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full block"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full block"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full block"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full block"></span>
            </div>
        </section>
    );
}
