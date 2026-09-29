"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories as staticCategories } from "@/config/constants/mock-data";
import { apiFetch } from "@/config/request";

export function CategorySection() {
    const [categories, setCategories] = useState(staticCategories);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await apiFetch<any>("/products/categories");
                if (data?.data?.categories?.length > 0) {
                    setCategories(data.data.categories.map((c: any) => ({
                        name: c.name,
                        slug: c.slug,
                        image: c.image || "https://via.placeholder.com/80?text=Category",
                    })));
                }
            } catch {
                // Fallback to static data
            }
        };
        fetchCategories();
    }, []);

    return (
        <section className="px-4 md:px-8 py-10">
            <div className="flex justify-between items-end border-b border-[#008ECC] pb-2 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Shop From <span className="text-[#008ECC]">Top Categories</span>
                </h2>
                <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#008ECC] transition">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="flex overflow-x-auto gap-8 pb-4 scrollbar-hide justify-between px-4">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer shrink-0">
                        <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-3 transition shadow-sm
                            ${idx === 0 ? "border-2 border-[#008ECC] shadow-blue-100" : "bg-[#F8F9FA] group-hover:shadow-md"}`}>
                            <div className="w-16 h-16 rounded-md bg-gray-300 relative overflow-hidden">
                                {idx === 0 && (
                                    <div className="absolute inset-1 bg-black rounded">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-80" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <span className={`text-sm font-medium ${idx === 0 ? "text-gray-900" : "text-gray-600 group-hover:text-[#008ECC] transition"}`}>
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
