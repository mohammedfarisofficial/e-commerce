"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from "react";
import { cartReducer, initialState, CartState, CartAction } from "../reducers/cart-reducer";
import { apiFetch } from "@/config/request";

interface CartContextType {
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
    addToCart: (productId: string, name: string, price: number, image: string) => Promise<void>;
    updateQuantity: (productId: string, quantity: number) => Promise<void>;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    checkout: () => Promise<{ success: boolean; message?: string }>;
    fetchCart: () => Promise<void>;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const [loading, setLoading] = React.useState(false);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiFetch<any>("/orders/cart");
            if (data?.data) {
                dispatch({
                    type: "SET_CART",
                    payload: {
                        items: data.data.items.map((item: any) => ({
                            id: item.productId,
                            name: item.name,
                            slug: item.slug,
                            price: item.price,
                            originalPrice: item.originalPrice,
                            image: item.image,
                            quantity: item.quantity,
                            stock: item.stock,
                        })),
                        total: data.data.total,
                    },
                });
            }
        } catch {
            // User is not logged in or cart is empty
        } finally {
            setLoading(false);
        }
    }, []);

    const addToCart = useCallback(async (productId: string, name: string, price: number, image: string) => {
        try {
            await apiFetch<any>("/orders/cart/add", {
                method: "POST",
                body: JSON.stringify({ productId, quantity: 1, price }),
            });
            await fetchCart();
        } catch {
            // Silently handle error
        }
    }, [fetchCart]);

    const updateQuantity = useCallback(async (productId: string, quantity: number) => {
        try {
            await apiFetch<any>(`/orders/cart/${productId}`, {
                method: "PATCH",
                body: JSON.stringify({ quantity }),
            });
            await fetchCart();
        } catch {
            // Silently handle error
        }
    }, [fetchCart]);

    const removeFromCart = useCallback(async (productId: string) => {
        try {
            await apiFetch<any>(`/orders/cart/${productId}`, { method: "DELETE" });
            await fetchCart();
        } catch {
            // Silently handle error
        }
    }, [fetchCart]);

    const clearCart = useCallback(async () => {
        try {
            await apiFetch<any>("/orders/cart", { method: "DELETE" });
            dispatch({ type: "CLEAR_CART" });
        } catch {
            // Silently handle error
        }
    }, []);

    const checkout = useCallback(async () => {
        try {
            const data = await apiFetch<any>("/orders/cart/checkout", { method: "POST" });
            await fetchCart();
            return { success: true, message: data.message };
        } catch (error: any) {
            await fetchCart(); // Refresh cart to show out of stock items
            return { success: false, message: error.message };
        }
    }, [fetchCart]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <CartContext.Provider value={{ state, dispatch, addToCart, updateQuantity, removeFromCart, clearCart, checkout, fetchCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
