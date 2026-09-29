"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/modules/main/components/header";
import { Footer } from "@/modules/main/components/footer";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useUser } from "@/modules/user/contexts/user-context";
import { useCart } from "@/modules/user/contexts/cart-context";
import { apiFetch } from "@/config/request";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
    const { setUser } = useUser();
    const { fetchCart } = useCart();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
    const [apiError, setApiError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof LoginFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");
        setErrors({});

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        try {
            const apiRes = await apiFetch<any>("/auth/login", {
                method: "POST",
                body: JSON.stringify(formData)
            });

            if (apiRes && apiRes.data && apiRes.data.user) {
                const userData = {
                    id: apiRes.data.user.id || apiRes.data.user._id,
                    name: apiRes.data.user.name,
                    email: apiRes.data.user.email
                };

                const sessionRes = await fetch("/api/session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "SET",
                        payload: {
                            user: userData,
                            token: apiRes.data.accessToken,
                            refreshToken: apiRes.data.refreshToken
                        }
                    })
                });

                const sessionData = await sessionRes.json();
                if (sessionData.success) {
                    setUser(userData);
                    await fetchCart();
                    window.location.href = redirectTo;
                } else {
                    setApiError("Session creation failed");
                }
            }
        } catch (err: any) {
            setApiError(err.message || "Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
            <Header />

            <main className="grow flex items-center justify-center p-4 py-12">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex">
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#008ECC] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-100 h-100 bg-white opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-75 h-75 bg-white opacity-10 rounded-full translate-y-1/3 -translate-x-1/3"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                            <p className="text-blue-100 text-lg">
                                Discover the best deals online and shop your favorite products with Megamart.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign In</h2>
                        <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

                        {apiError && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`w-full pl-10 pr-3 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-[#008ECC]/20 focus:border-[#008ECC]'} focus:outline-hidden focus:ring-2 transition bg-[#F8F9FA]`}
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <Link href="#" className="text-sm font-medium text-[#008ECC] hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-[#008ECC]/20 focus:border-[#008ECC]'} focus:outline-hidden focus:ring-2 transition bg-[#F8F9FA]`}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </div>
                                </div>
                                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                            </div>

                            <div className="flex items-center mt-4">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#008ECC] focus:ring-[#008ECC] border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#008ECC] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-200 mt-6"
                            >
                                Sign In
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link href="/register" className="font-semibold text-[#008ECC] hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
