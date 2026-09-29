"use client";

import React from "react";

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col animate-pulse">
            <div className="bg-gray-200 h-48 w-full" />
            <div className="p-4 border-t border-gray-100 flex flex-col grow space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="flex items-center space-x-2 pb-3 border-b border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-3 bg-gray-100 rounded w-12" />
                </div>
                <div className="flex justify-between items-center mt-auto">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
}
