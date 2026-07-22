// src\app\api\kits\route.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
    httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: process.env.NODE_ENV === "production",
    }),
};

export async function GET() {
    try {

        const token = (await cookies()).get("token")?.value;
        const tenantId = (await cookies()).get("tenantId")?.value;

        const response = await axios.get(`${API_URL}/api/Kits`, {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Tenant-Id": tenantId ?? ""
            }
        });

        return NextResponse.json(response.data);

    } catch (error: any) {

        console.log(error.response?.data);
        console.log(error.response?.status);
        console.log(error.message);

        return NextResponse.json(
            error.response?.data ?? { error: error.message },
            { status: error.response?.status ?? 500 }
        );
    }
}