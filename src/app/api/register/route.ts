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

