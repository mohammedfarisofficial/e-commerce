"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Truck, Tag, Search, Menu, User, ShoppingCart, ChevronDown, List } from "lucide-react";
import { useUser } from "@/modules/user/contexts/user-context";
import { useCart } from "@/modules/user/contexts/cart-context";

export function Header() {
    const { user } = useUser();
    const { state } = useCart();

    const categories = [
        { name: "Groceries", active: true },
        { name: "Premium Fruits", active: false },
        { name: "Home & Kitchen", active: false },
        { name: "Fashion", active: false },
        { name: "Electronics", active: false },
        { name: "Beauty", active: false },
        { name: "Home Improvement", active: false },
        { name: "Sports, Toys & Luggage", active: false },
    ];

    return (
        <header className="w-full">
            <div className="bg-[#f5f5f5] text-gray-500 text-xs py-2 px-4 md:px-8 flex justify-between items-center border-b border-gray-200">
                <div>Welcome to worldwide Megamart!</div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <MapPin size={14} className="text-[#008ECC]" />
                        <span>Deliver to <span className="font-medium text-gray-700">423651</span></span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <Truck size={14} className="text-[#008ECC]" />
                        <span>Track your order</span>
                    </div>
                    <div className="flex items-center space-x-1 cursor-pointer">
                        <Tag size={14} className="text-[#008ECC]" />
                        <span>All Offers</span>
                    </div>
                </div>
            </div>

            <div className="bg-white py-4 px-4 md:px-8 flex items-center justify-between gap-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                    <button className="p-2 bg-[#F3F9FB] rounded-lg text-[#008ECC]">
                        <Menu size={24} />
                    </button>
                    <Link href="/" className="text-2xl font-bold text-[#008ECC] tracking-tight">
                        Megamart
                    </Link>
                </div>

                <div className="flex-1 max-w-2xl px-8 hidden md:block">
                    <div className="relative flex items-center w-full h-12 rounded-lg bg-[#F3F9FB] overflow-hidden">
                        <div className="grid place-items-center h-full w-12 text-[#008ECC]">
                            <Search size={20} />
                        </div>
                        <input
                            className="peer h-full w-full outline-hidden text-sm text-gray-700 pr-2 bg-transparent"
                            type="text"
                            id="search"
                            placeholder="Search essentials, groceries and more..."
                        />
                        <button className="grid place-items-center h-full w-12 text-[#008ECC] hover:bg-gray-100 transition">
                            <List size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <span className="flex items-center space-x-2 text-gray-700 font-medium">
                            <User size={20} className="text-[#008ECC]" />
                            <span className="hidden sm:inline">{user.name}</span>
                        </span>
                    ) : (
                        <Link href="/login" className="flex items-center space-x-2 text-gray-700 hover:text-[#008ECC] transition cursor-pointer font-medium">
                            <User size={20} className="text-[#008ECC]" />
                            <span className="hidden sm:inline">Sign Up/Sign In</span>
                        </Link>
                    )}
                    <div className="h-6 w-px bg-gray-300 hidden sm:block" />
                    <Link
                        href={user ? "/cart" : "/login?redirect=/cart"}
                        className="flex items-center space-x-2 text-gray-700 hover:text-[#008ECC] transition cursor-pointer font-medium relative"
                    >
                        <ShoppingCart size={20} className="text-[#008ECC]" />
                        <span className="hidden sm:inline">Cart</span>
                        {state.items.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#008ECC] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {state.items.length}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            <div className="bg-white py-3 px-4 md:px-8 flex space-x-3 overflow-x-auto border-b border-gray-100 scrollbar-hide">
                {categories.map((cat, idx) => (
                    <button
                        key={idx}
                        className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${cat.active
                                ? "bg-[#008ECC] text-white"
                                : "bg-[#F3F9FB] text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        <span>{cat.name}</span>
                        <ChevronDown size={14} className={cat.active ? "text-white" : "text-gray-500"} />
                    </button>
                ))}
            </div>
        </header>
    );
}
