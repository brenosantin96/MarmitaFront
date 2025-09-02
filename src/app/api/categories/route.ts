//src\app\api\categories\route.ts

import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "https://localhost:7192"; // backend C#

const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};


export async function GET(request: Request) {
  try {
    // Pega o cookie enviado pelo browser
    const token = (await cookies()).get("token")?.value;
    console.log("TOKEN: ", token)

    if (!token) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Chama backend com token
    const response = await axios.get(`${API_URL}/api/Categories`, {
      ...axiosConfig,
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar categorias:", err);
    return NextResponse.json({ error: "Erro ao buscar categorias" }, { status: 500 });
  }
}