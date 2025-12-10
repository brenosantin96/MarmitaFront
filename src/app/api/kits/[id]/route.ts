// src\app\api\kits\[id]\route.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
    httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: process.env.NODE_ENV === "production",
    }),
};

export async function GET(request: Request, context: { params: { id: string } }) {

    const params = context.params;
    const id = params.id;

    // Pega o cookie enviado pelo browser
    const token = (await cookies()).get("token")?.value;
    const tenantId = (await cookies()).get("tenantId")?.value;

    if (!token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Chama backend com token
    const response = await axios.get(`${API_URL}/api/Kits/${id}`, 
        {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${token}`,
                "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`

            },
            withCredentials: true
        }
    )

    if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        return NextResponse.json({ error: "Ocorreu um erro" }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: response.data });

}