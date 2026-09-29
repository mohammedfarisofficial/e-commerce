import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="px-4 md:px-8 py-6">
            <div className="relative w-full h-100 bg-[#1E293B] rounded-2xl overflow-hidden flex items-center shadow-lg">
                {/* Background decorative circles */}
                <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
                    <div className="absolute right-[-10%] top-[-20%] w-[60%] h-[140%] border border-white/10 rounded-full"></div>
                    <div className="absolute right-[0%] top-[-10%] w-[50%] h-[120%] border border-white/10 rounded-full"></div>
                    <div className="absolute right-[10%] top-[0%] w-[40%] h-full border border-white/10 rounded-full"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex items-center justify-between px-12 lg:px-24">
                    <div className="text-white max-w-xl">
                        <h3 className="text-xl md:text-2xl font-medium mb-2">Best Deal Online on smart watches</h3>
                        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">SMART WEARABLE.</h1>
                        <p className="text-2xl md:text-3xl font-medium">UP to 80% OFF</p>

                        <div className="mt-8 flex space-x-2">
                            <span className="w-8 h-2 bg-white rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                            <span className="w-2 h-2 bg-white/40 rounded-full block"></span>
                        </div>
                    </div>

                    <div className="hidden md:block relative z-10 transform translate-x-12">
                        {/* Placeholder for watch image */}
                        <div className="w-75 h-75 bg-slate-700/50 rounded-[3rem] border-8 border-rose-300 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-black/50 rotate-[-10deg]">
                            <div className="absolute inset-0 bg-linear-to-br from-black/80 to-transparent"></div>
                            <div className="text-white text-center z-10">
                                <div className="text-4xl font-bold">08:26:00</div>
                                <div className="text-sm text-rose-300">SAT 04/06</div>
                                <div className="mt-4 flex gap-4 text-xs">
                                    <div>100%</div>
                                    <div>234 bpm</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav Buttons */}
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-[#008ECC] shadow-md transition z-20">
                    <ChevronLeft size={24} />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-[#008ECC] shadow-md transition z-20">
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
}
