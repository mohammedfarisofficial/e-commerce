import React from "react";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-[#008ECC] text-white pt-12 pb-6 px-4 md:px-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white opacity-5 rounded-full translate-y-1/3 translate-x-1/4"></div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 relative z-10">
                <div className="col-span-1 md:col-span-1 lg:col-span-1">
                    <h2 className="text-3xl font-bold mb-6">Megamart</h2>
                    <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <MessageCircle size={20} className="mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm">Whats App</p>
                                <p className="font-medium">+1 202-918-2132</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <Phone size={20} className="mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-sm">Call Us</p>
                                <p className="font-medium">+1 202-918-2132</p>
                            </div>
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg mt-6 mb-4">Download App</h3>
                    <div className="flex space-x-3">
                        <div className="bg-black text-white px-3 py-2 rounded-lg flex items-center space-x-2 cursor-pointer w-32 justify-center">
                            {/* Apple Logo placeholder */}
                            <div className="w-5 h-5 bg-white rounded-full"></div>
                            <div className="text-left">
                                <p className="text-[8px] uppercase leading-none">Download on the</p>
                                <p className="text-xs font-semibold leading-none">App Store</p>
                            </div>
                        </div>
                        <div className="bg-black text-white px-3 py-2 rounded-lg flex items-center space-x-2 cursor-pointer w-32 justify-center">
                            {/* Play Store Logo placeholder */}
                            <div className="w-5 h-5 bg-white rounded-sm"></div>
                            <div className="text-left">
                                <p className="text-[8px] uppercase leading-none">GET IT ON</p>
                                <p className="text-xs font-semibold leading-none">Google Play</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-1">
                    <h3 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-white inline-block">Most Popular Categories</h3>
                    <ul className="space-y-3">
                        {["Staples", "Beverages", "Personal Care", "Home Care", "Baby Care", "Vegetables & Fruits", "Snacks & Foods", "Dairy & Bakery"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="flex items-center space-x-2 hover:underline text-sm">
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    <span>{item}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-span-1 lg:col-span-2">
                    <h3 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-white inline-block">Customer Services</h3>
                    <ul className="space-y-3">
                        {["About Us", "Terms & Conditions", "FAQ", "Privacy Policy", "E-waste Policy", "Cancellation & Return Policy"].map((item) => (
                            <li key={item}>
                                <Link href="#" className="flex items-center space-x-2 hover:underline text-sm">
                                    <span className="w-1 h-1 bg-white rounded-full"></span>
                                    <span>{item}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-6 text-center text-sm border-t border-blue-400/30 relative z-10">
                <p>© 2022 All rights reserved. Reliance Retail Ltd.</p>
            </div>
        </footer>
    );
}
