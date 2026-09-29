import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    
    if (session) {
        try {
            return NextResponse.json({ success: true, session: JSON.parse(session) });
        } catch (error) {
            return NextResponse.json({ success: false, session: null });
        }
    }
    
    return NextResponse.json({ success: true, session: null });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, payload } = body;
        
        const cookieStore = await cookies();
        
        if (action === "SET") {
            cookieStore.set("session", JSON.stringify(payload), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                path: "/",
                maxAge: 7 * 24 * 60 * 60, // 7 days
            });
            return NextResponse.json({ success: true });
        } else if (action === "CLEAR") {
            cookieStore.delete("session");
            return NextResponse.json({ success: true });
        }
        
        return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
