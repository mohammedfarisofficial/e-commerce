"use client";

import { ReactNode } from "react";
import { UserProvider } from "@/modules/user/contexts/user-context";
import { CartProvider } from "@/modules/user/contexts/cart-context";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <UserProvider>
            <CartProvider>
                {children}
                <Toaster position="bottom-center" />
            </CartProvider>
        </UserProvider>
    );
}
