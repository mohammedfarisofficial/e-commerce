"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiFetch } from "@/config/request";

interface User {
    id: string;
    name: string;
    email: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch("/api/session");
                const data = await res.json();

                if (data.success && data.session) {
                    const token = data.session.token;

                    try {
                        const apiRes = await apiFetch<any>("/users/get-user", {
                            headers: { Authorization: `Bearer ${token}` },
                        });

                        if (apiRes?.data?.user) {
                            setUser({
                                id: apiRes.data.user.id || apiRes.data.user._id,
                                name: apiRes.data.user.name,
                                email: apiRes.data.user.email,
                            });
                        } else {
                            setUser(data.session.user);
                        }
                    } catch {
                        setUser(data.session.user);
                    }
                }
            } catch {
                // No session
            } finally {
                setIsLoading(false);
            }
        };

        fetchSession();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
