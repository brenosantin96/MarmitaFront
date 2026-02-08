// src\app\api\address\route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

// Configura o Axios para ignorar erros de certificado SSL em desenvolvimento
const axiosConfig = {
    httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: process.env.NODE_ENV === "production", // Ignora apenas em desenvolvimento
    }),
};

export async function GET(request: Request) {
  try {

    const tenantId = (await cookies()).get("tenantId")?.value;

    console.log("TENANTID: ", tenantId)

    // Chama backend com token
    const response = await axios.get(`${API_URL}/api/Addresses`, {
      ...axiosConfig,
      withCredentials: true,
      headers: {
        "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`
      }
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar endereços:", err);
    return NextResponse.json({ error: "Erro ao buscar endereços" }, { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        // Lê o token salvo no cookie HTTP-only
        const token = (await cookies()).get("token")?.value;
        const tenantId = (await cookies()).get("tenantId")?.value;

        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Lê o corpo da requisição enviada pelo frontend
        const body = await request.json();

        // Faz a chamada para o backend
        const response = await axios.post(
            `${API_URL}/api/Addresses`,
            body,
            {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`
                },
            }
        );
        // Retorna o carrinho atualizado
        return NextResponse.json(response.data, { status: 200 });

    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error("Error:", error.response?.data || error.message);
        } else {
            console.error("Error:", error);
        }

        return NextResponse.json(
            { error: "Erro ao tentar salvar novo endereço" },
            { status: 500 }
        );
    }
}
