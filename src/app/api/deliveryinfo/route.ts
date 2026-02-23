import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL =
  process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192";

// Ignora erro SSL apenas em dev
const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};

/**
 * GET DeliveryInfo by CartId
 * /api/DeliveryInfoes/by-cart/{cartId}
 */
export async function GET(
  request: Request,
  context: { params: { cartId: string } }
) {
  const { cartId } = context.params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const tenantId = cookieStore.get("tenantId")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Sessão expirada. Faça login novamente." },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get(
      `${API_URL}/api/DeliveryInfoes/by-cart/${cartId}`,
      {
        ...axiosConfig,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Tenant-Id": tenantId ?? "",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Se backend retornou 401 (token expirado)
      if (error.response?.status === 401) {
        cookieStore.delete("token");

        return NextResponse.json(
          { error: "Sessão expirada. Faça login novamente." },
          { status: 401 }
        );
      }

      console.error(
        "DeliveryInfo GET error:",
        error.response?.data || error.message
      );

      return NextResponse.json(
        error.response?.data || { error: "Erro na API" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("DeliveryInfo GET error:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

/**
 * POST Create / Update DeliveryInfo
 * /api/DeliveryInfoes
 */
export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const tenantId = cookieStore.get("tenantId")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Sessão expirada. Faça login novamente." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const response = await axios.post(
      `${API_URL}/api/DeliveryInfoes`,
      body,
      {
        ...axiosConfig,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Tenant-Id": tenantId ?? "",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // TOKEN EXPIRADO
      if (error.response?.status === 401) {
        cookieStore.delete("token");

        return NextResponse.json(
          { error: "Sessão expirada. Faça login novamente." },
          { status: 401 }
        );
      }

      console.error(
        "DeliveryInfo POST error:",
        error.response?.data || error.message
      );

      return NextResponse.json(
        error.response?.data || { error: "Erro na API" },
        { status: error.response?.status || 500 }
      );
    }

    console.error("DeliveryInfo POST error:", error);

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}