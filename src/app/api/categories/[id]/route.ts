// src\app\api\categories\[id]\route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};


export async function DELETE(
    request: Request, 
    context: { params: Promise <{ id: string }> }) {

    const { id } = await context.params 
    
    try {
        // Lê o token salvo no cookie HTTP-only
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Faz a chamada para o backend
        const response = await axios.delete(
            `${API_URL}/api/categories/${id}`,

            {
                ...axiosConfig,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return new NextResponse(null, { status: 204 });


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

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    // Lê o token salvo no cookie HTTP-only
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Lê o corpo JSON enviado (por ex: { "name": "Nova Categoria" })
    const body = await request.json();

    // Faz a chamada para o backend
    const response = await axios.put(
      `${API_URL}/api/categories/${id}`,
      body,
      {
        ...axiosConfig,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    // Retorna sucesso conforme resposta do backend
    if ([200, 201, 204].includes(response.status)) {
      return NextResponse.json(
        { success: true, data: response.data },
        { status: response.status === 204 ? 200 : response.status }
      );
    }

    // Caso algo inesperado ocorra
    return NextResponse.json(
      { error: "Ocorreu um erro ao atualizar a categoria" },
      { status: response.status }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro na requisição:", error.response?.data || error.message);
    } else {
      console.error("Erro desconhecido:", error);
    }

    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}