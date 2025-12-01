// src/app/api/loginGoogle/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    console.log("CODE RECEBIDO DO FRONT: ", code);

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 });
    }

    console.log("teste de console.log") // aqui sim chega

    // Chama backend C# para trocar code por tokens e gerar JWT interno
    const response = await axios.post(
      `${API_URL}/api/users/google-login`,
      {
        code,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "http://localhost:3000"   // o mesmo do Google Console
      },
      {
        ...axiosConfig,
        headers: { "X-Tenant-Id": 2 }
      }
    );


    console.log("RESPONSE dps de enviar tenanTId-2: ", response) //ja nao chega aqui...

    const { token, user } = response.data;

    if (!token) {
      return NextResponse.json({ error: "No token received from backend" }, { status: 401 });
    }

    // Cria a resposta e seta cookie HTTP-only
    const res = NextResponse.json({ success: true, user }, { status: 200 });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
    });

    console.log("TOKEN JWT INTERNO GERADO PELO BACKEND C#: ", token);

    return res;
  } catch (err) {
    console.error("Google login error:", err);
    return NextResponse.json({ error: "Invalid Google login" }, { status: 401 });
  }
}
