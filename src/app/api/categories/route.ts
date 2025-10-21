//src\app\api\categories\route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};


export async function GET(request: Request) {
  try {
   
    // Chama backend com token
    const response = await axios.get(`${API_URL}/api/Categories`, {
      ...axiosConfig,
      withCredentials: true
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }
}

export async function POST(request: Request) {

  try {

    const { name } = await request.json();

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "O campo 'name' é obrigatório" },
        { status: 400 }
      );
    }

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const response = await axios.post(
      `${API_URL}/api/Categories`, { name }, // body da request
      {
        ...axiosConfig,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return NextResponse.json(response.data, { status: 200 });

  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }

}