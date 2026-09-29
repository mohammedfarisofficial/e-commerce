const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

interface RequestOptions extends RequestInit {
    useToken?: boolean;
}

export const apiFetch = async <T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> => {
    const { useToken = true, ...customConfig } = options;
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...customConfig.headers,
    };

    if (useToken && typeof window !== "undefined") {
        try {
            const sessionRes = await fetch("/api/session");
            const sessionData = await sessionRes.json();
            if (sessionData.success && sessionData.session?.token) {
                (headers as Record<string, string>)["Authorization"] = `Bearer ${sessionData.session.token}`;
            }
        } catch {
            // No session available
        }
    }

    let config: RequestInit = { ...customConfig, headers };
    let response = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;

    try {
        data = await response.json();
    } catch {
        data = { message: "Internal server error" };
    }

    if (!response.ok) {
        if (response.status === 401 && useToken && typeof window !== "undefined") {
            try {
                const sessionRes = await fetch("/api/session");
                const sessionData = await sessionRes.json();

                if (sessionData.success && sessionData.session?.refreshToken) {
                    const refreshRes = await fetch(`${BASE_URL}/auth/refresh`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ refreshToken: sessionData.session.refreshToken }),
                    });

                    if (refreshRes.ok) {
                        const refreshData = await refreshRes.json();
                        const newAccessToken = refreshData.data?.accessToken;
                        const newRefreshToken = refreshData.data?.refreshToken || sessionData.session.refreshToken;

                        await fetch("/api/session", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                action: "SET",
                                payload: {
                                    ...sessionData.session,
                                    token: newAccessToken,
                                    refreshToken: newRefreshToken,
                                },
                            }),
                        });

                        (headers as Record<string, string>)["Authorization"] = `Bearer ${newAccessToken}`;
                        config = { ...config, headers };

                        response = await fetch(`${BASE_URL}${endpoint}`, config);
                        data = await response.json();

                        if (response.ok) return data;
                    } else {
                        throw new Error("Refresh token expired");
                    }
                } else {
                    throw new Error("No refresh token available");
                }
            } catch (err: any) {
                if (err.message === "Refresh token expired") {
                    await fetch("/api/session", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ action: "CLEAR" }),
                    });
                    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
                        window.location.href = "/login";
                    }
                }
                throw new Error(err.message || "Session expired. Please login again.");
            }
        }
        throw new Error(data.message || "Something went wrong");
    }

    return data;
};
