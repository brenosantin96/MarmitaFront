// src/app/api/deliveryinfo/route.ts

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
  const tenantId = (await cookies()).get("tenantId")?.value;

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

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
      console.error(
        "DeliveryInfo GET error:",
        error.response?.data || error.message
      );
    } else {
      console.error("DeliveryInfo GET error:", error);
    }

    return NextResponse.json(
      { error: "Erro ao buscar DeliveryInfo" },
      { status: 500 }
    );
  }
}

/**
 * POST Create / Update DeliveryInfo
 * /api/DeliveryInfoes
 */
export async function POST(request: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    const tenantId = (await cookies()).get("tenantId")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Não autenticado" },
        { status: 401 }
      );
    }

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
      console.error(
        "DeliveryInfo POST error:",
        error.response?.data || error.message
      );
    } else {
      console.error("DeliveryInfo POST error:", error);
    }

    return NextResponse.json(
      { error: "Erro ao salvar DeliveryInfo" },
      { status: 500 }
    );
  }
}
