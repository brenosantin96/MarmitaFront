//src\app\api\me\route.ts

import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

export async function GET(request: Request) {
    try {
        const token = (await cookies()).get("token")?.value;
        const tenantId = (await cookies()).get("tenantId")?.value;

        if (!token) {
            return NextResponse.json({ user: null }, { status: 401 });
        }

        // Chama backend para validar token e pegar user
        const response = await axios.get(`${API_URL}/api/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`
            },
            httpsAgent: new (require("https").Agent)({
                rejectUnauthorized: process.env.NODE_ENV === "production",
            }),
        });

        return NextResponse.json({ user: response.data });
    } catch (err) {
        return NextResponse.json({ user: null }, { status: 401 });
    }
}
