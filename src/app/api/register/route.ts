// app/api/register/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

export async function POST(request: Request) {

  const { name, email, password, isAdmin } = await request.json();
  const tenantId = (await cookies()).get("tenantId")?.value;

  try {
    const response = await axios.post(
      `${API_URL}/api/users/register`,
      { name, email, password, isAdmin },
      {
        httpsAgent: new (require('https').Agent)({
          rejectUnauthorized: process.env.NODE_ENV === 'production',
        }),
        headers: {
          "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`
        }
      }
    );

    return NextResponse.json(response.data, { status: 201 });
  } catch (error: any) {
    console.error("ROUTE HANDLER: Erro no registro:", error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data || "ROUTE HANDLER Erro ao registrar usuário" },
      { status: error?.response?.status || 500 }
    );
  }
}



/* export async function POST(request: Request) {

    const { name, email, password, isAdmin } = await request.json();

    try {
        const response = await axios.post(`${API_URL}/users/register`, { name, email, password, isAdmin }, axiosConfig);
        if (response.data && response.data.token) {

            const token = response.data.token;

            // Define um cookie HTTP seguro para o token
            (await cookies()).set("token", token, {
                httpOnly: true,   // Impede acesso no frontend
                secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
                maxAge: 60 * 60 * 24 * 7,  // Expira em 7 dias
                path: "/",
            });


            return NextResponse.json({ token }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No token received" }, { status: 401 });
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Invalid crededntials" }, { status: 401 });
    }
} */