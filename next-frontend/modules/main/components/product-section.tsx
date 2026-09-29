"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/modules/user/contexts/cart-context";
import { useUser } from "@/modules/user/contexts/user-context";
import { apiFetch } from "@/config/request";
import { ProductCardSkeleton } from "./product-card-skeleton";
import toast from "react-hot-toast";

export function ProductSection() {
    const { addToCart } = useCart();
    const { user } = useUser();
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const fetchProducts = async (pageToFetch: number) => {
        if (pageToFetch === 1) setLoading(true);
        else setLoadingMore(true);

        try {
            const data = await apiFetch<any>(`/products?page=${pageToFetch}&limit=10`);
            if (data?.data?.products) {
                const apiProducts = data.data.products.map((p: any) => ({
                    id: p._id,
                    name: p.name,
                    slug: p.slug,
                    brand: p.brand,
                    categorySlug: p.category?.slug || "mobile",
                    price: p.price,
                    originalPrice: p.originalPrice || p.price * 1.2,
                    discount: p.discount || 0,
                    image: p.images?.[0] || "https://via.placeholder.com/200x250?text=Product",
                }));

                if (pageToFetch === 1) {
                    setProducts(apiProducts);
                } else {
                    setProducts((prev) => [...prev, ...apiProducts]);
                }
                setHasMore(data.data.pagination?.hasMore || false);
            }
        } catch {
            // API unavailable
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchProducts(1);
    }, []);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage);
    };

    const handleAddToCart = async (product: any, e: React.MouseEvent) => {
        e.preventDefault();
        if (!user) {
            router.push("/login?redirect=/");
            return;
        }
        await addToCart(product.id, product.name, product.price, product.image);
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <section className="px-4 md:px-8 py-10">
            <div className="flex justify-between items-end border-b border-[#008ECC] pb-2 mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Grab the best deal on <span className="text-[#008ECC]">Smartphones</span>
                </h2>
                <Link href="#" className="flex items-center text-sm font-medium text-gray-600 hover:text-[#008ECC] transition">
                    View All <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                {loading
                    ? Array.from({ length: 10 }).map((_, i) => <ProductCardSkeleton key={i} />)
                    : products.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition group relative flex flex-col">
                            <div className="absolute top-0 right-0 bg-[#008ECC] text-white text-xs font-bold px-2 py-3 rounded-bl-xl z-10 flex flex-col items-center">
                                <span>{product.discount}%</span>
                                <span>OFF</span>
                            </div>

                            <div className="bg-[#F8F9FA] pt-6 pb-4 flex justify-center items-center h-48 relative overflow-hidden flex-shrink-0">
                                <div className="w-24 h-40 bg-gray-200 rounded-md relative shadow-md">
                                    <div className="absolute inset-1 bg-black rounded overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-80" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 flex flex-col grow">
                                <h3 className="font-semibold text-gray-800 text-sm mb-2 truncate group-hover:text-[#008ECC] transition">{product.name}</h3>
                                <div className="flex items-center space-x-2 mb-3 border-b border-gray-100 pb-3">
                                    <span className="font-bold text-gray-800">₹{product.price.toLocaleString("en-IN")}</span>
                                    <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="text-green-500 text-xs font-semibold">
                                        Save - ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                                    </div>
                                    <button
                                        onClick={(e) => handleAddToCart(product, e)}
                                        className="p-2 bg-[#F3F9FB] text-[#008ECC] hover:bg-[#008ECC] hover:text-white rounded-full transition cursor-pointer z-10 relative"
                                    >
                                        <ShoppingCart size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {hasMore && (
                <div className="flex justify-center">
                    <button
                        onClick={loadMore}
                        disabled={loadingMore}
                        className="px-8 py-3 bg-[#008ECC] text-white rounded-full font-medium hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                        {loadingMore ? "Loading..." : "View More"}
                    </button>
                </div>
            )}
        </section>
    );
}
