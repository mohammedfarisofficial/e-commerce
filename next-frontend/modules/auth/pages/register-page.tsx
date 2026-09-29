"use client";

import React, { useState } from "react";
import { Header } from "@/modules/main/components/header";
import { Footer } from "@/modules/main/components/footer";
import Link from "next/link";
import { Eye, EyeOff, User, Lock, Mail } from "lucide-react";
import { useUser } from "@/modules/user/contexts/user-context";
import { apiFetch } from "@/config/request";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
    const { setUser } = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState<RegisterFormData>({ name: "", email: "", password: "" });
    const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
    const [apiError, setApiError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof RegisterFormData]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError("");
        setErrors({});

        const result = registerSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach(issue => {
                formattedErrors[issue.path[0] as string] = issue.message;
            });
            setErrors(formattedErrors);
            return;
        }

        try {
            const apiRes = await apiFetch<any>("/auth/register", {
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
                    window.location.href = "/";
                } else {
                    setApiError("Session creation failed");
                }
            }
        } catch (err: any) {
            setApiError(err.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
            <Header />

            <main className="grow flex items-center justify-center p-4 py-12">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-row-reverse">
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#008ECC] p-12 text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-100 h-100 bg-white opacity-10 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
                        <div className="absolute bottom-0 right-0 w-75 h-75 bg-white opacity-10 rounded-full translate-y-1/3 translate-x-1/3"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl font-bold mb-4">Join Us Today!</h2>
                            <p className="text-blue-100 text-lg">
                                Create an account to access exclusive offers and manage your orders easily.
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h2>
                        <p className="text-gray-500 mb-8">Please enter your details to create an account.</p>

                        {apiError && (
                            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                                {apiError}
                            </div>
                        )}

                        <form onSubmit={handleRegister} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`w-full pl-10 pr-3 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-[#008ECC]/20 focus:border-[#008ECC]'} focus:outline-hidden focus:ring-2 transition bg-[#F8F9FA]`}
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                            </div>

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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className={`w-full pl-10 pr-10 py-3 rounded-xl border ${errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 focus:ring-[#008ECC]/20 focus:border-[#008ECC]'} focus:outline-hidden focus:ring-2 transition bg-[#F8F9FA]`}
                                        placeholder="Create a password"
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
                                    id="terms"
                                    type="checkbox"
                                    className="h-4 w-4 text-[#008ECC] focus:ring-[#008ECC] border-gray-300 rounded"
                                />
                                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                    I agree to the <Link href="#" className="text-[#008ECC] hover:underline">Terms & Conditions</Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#008ECC] text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-blue-600 transition shadow-lg shadow-blue-200 mt-6"
                            >
                                Sign Up
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-[#008ECC] hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
