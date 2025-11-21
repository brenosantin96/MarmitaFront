// src\app\api\address\pickupAddress\route.ts

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

    // Chama backend com token
    const response = await axios.get(`${API_URL}/api/Addresses/admin/all`, {
      ...axiosConfig,
      withCredentials: true
    });

    console.log("API_URL ADDRESSAPI: ", API_URL)

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error("Erro ao buscar endereços:", err);
    return NextResponse.json({ error: "Erro ao buscar endereços" }, { status: 500 });
  }
}

