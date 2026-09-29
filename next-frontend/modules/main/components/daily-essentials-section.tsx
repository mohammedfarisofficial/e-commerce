"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { dailyEssentials } from "@/config/constants/mock-data";

export function DailyEssentialsSection() {
    return (
        <section className="px-4 md:px-8 py-10">
            <div className="flex justify-between items-end border-b border-[#008ECC] pb-2 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Daily <span className="text-[#008ECC]">Essentials</span>
                </h2>
                <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#008ECC] transition">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {dailyEssentials.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-pointer">
                        <div className={`w-full aspect-square rounded-2xl flex items-center justify-center mb-4 transition bg-[#F8F9FA] group-hover:shadow-md border border-gray-100 ${idx === 0 ? "border-[#008ECC]" : ""}`}>
                            {/* Placeholder for item image */}
                            <div className="w-24 h-24 bg-gradient-to-tr from-green-300 to-yellow-200 rounded-full opacity-80 mix-blend-multiply"></div>
                        </div>
                        <h3 className="font-semibold text-sm text-gray-700 mb-1 group-hover:text-[#008ECC] transition">{item.name}</h3>
                        <p className="text-xs font-bold text-gray-900">{item.discount}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
