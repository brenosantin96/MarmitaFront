// src/app/api/tenant/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const hostname = searchParams.get("hostname");

    if (!hostname) {
      return NextResponse.json(
        { error: "Hostname é obrigatório" },
        { status: 400 }
      );
    }

    // Chama o backend para resolver tenantId
    const response = await axios.get(`${API_URL}/api/tenants/resolve?hostname=${hostname}`);

    const { tenantId, tenantName } = response.data;

    // Cria resposta e seta cookie com tenantId
    const res = NextResponse.json({ tenantId, tenantName }, { status: 200 });

    res.cookies.set("tenantId", tenantId.toString(), {
      httpOnly: false, // pode ser false, já que o frontend precisa ler
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax",
    });

    console.log(res.cookies);

    return res;

  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao resolver tenant", detail: err.message },
      { status: 500 }
    );
  }
}
