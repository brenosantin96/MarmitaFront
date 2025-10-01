// src/app/api/carts/route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "https://localhost:7192"; // backend C#

// Configura o Axios para ignorar erros de certificado SSL em desenvolvimento
const axiosConfig = {
    httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: process.env.NODE_ENV === "production", // Ignora apenas em desenvolvimento
    }),
};

export async function GET(request: Request, context: { params: { id: string } }) {

    console.log("Context: ", context) //Context:  { params: undefined }
    const { id } = context.params //Porque params esta undefined?

    try {
        // Lê o token salvo no cookie HTTP-only
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }
        // Faz a chamada para o backend
        const response = await axios.get(
            `${API_URL}/api/Carts/GetCartByUserId/${id}`,

            {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
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
            { error: "Erro no servidor" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        // Lê o token salvo no cookie HTTP-only
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Lê o corpo da requisição enviada pelo frontend
        const body = await request.json();

        // Faz a chamada para o backend
        const response = await axios.post(
            `${API_URL}/api/carts/add`,
            body,
            {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
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
            { error: "Erro ao adicionar item no carrinho" },
            { status: 500 }
        );
    }
}
