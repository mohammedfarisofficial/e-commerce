import { LoginPage } from "@/modules/auth/pages/login-page";
import { Suspense } from "react";

export default function LoginPageRoute() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">Loading...</div>}>
            <LoginPage />
        </Suspense>
    );
}