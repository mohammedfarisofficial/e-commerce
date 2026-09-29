"use client";

import React from "react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { HeroSection } from "../components/hero-section";
import { ProductSection } from "../components/product-section";
import { CategorySection } from "../components/category-section";
import { BrandsSection } from "../components/brands-section";
import { DailyEssentialsSection } from "../components/daily-essentials-section";

export function HomePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Header />
            <main className="grow w-full max-w-[1440px] mx-auto">
                <HeroSection />
                <ProductSection />
                <CategorySection />
                <BrandsSection />
                <DailyEssentialsSection />
            </main>
            <Footer />
        </div>
    );
}
