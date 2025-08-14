// src\app\api\lunchboxes\route.ts
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "https://localhost:7192"; // backend C#

// Configura o Axios para ignorar erros de certificado SSL em desenvolvimento
const axiosConfig = {
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Ignora apenas em desenvolvimento
    }),
};


export async function GET(request: Request) {

    try {
        //Lê o token salvo no cookie HTTP-only
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
        }

        //Chama o backend com o token no header
        const response = await axios.get(`${API_URL}/api/Lunchboxes`, {
            ...axiosConfig,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        //Retorna os dados
        return NextResponse.json(response.data, { status: 200 });
    }
    catch (error) {
        if(axios.isAxiosError(error)){
            console.error("Error:", error?.response?.data || error);
        } else {
            console.error("Error", error)
        }
        return NextResponse.json({ error: "Erro ao buscar marmitas" }, { status: 500 });
    }
}