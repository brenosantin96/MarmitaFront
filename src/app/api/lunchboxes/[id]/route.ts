// src/app/api/lunchboxes/[id]/route.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "https://localhost:7192"; // backend C#

const axiosConfig = {
    httpsAgent: new (require("https").Agent)({
        rejectUnauthorized: process.env.NODE_ENV === "production",
    }),
};

export async function PUT(request: Request, context: { params: { id: string } }) {

  const params = context.params;
  const id = params.id;

    // Pega o cookie enviado pelo browser
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const formData = await request.formData();
    console.log("FORM DATA: ", formData)

    // Chama backend com token
    const response = await axios.put(`${API_URL}/api/LunchboxesWithImage/${id}`, formData,
        {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        }
    )

    if (response.status !== 201 && response.status !== 200 && response.status !== 204) {
        return NextResponse.json({ error: "Ocorreu um erro" }, { status: response.status });
    }

    return NextResponse.json({ success: true, data: response.data });

}