// marmita_front\src\app\api\login\route.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "https://localhost:7192"; // backend C#

// Configura o Axios para ignorar erros de certificado SSL em desenvolvimento
const axiosConfig = {
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Ignora apenas em desenvolvimento
    }),
};


export async function POST(request: Request) {

    const { email, password } = await request.json();

    try {
        const response = await axios.post(`${API_URL}/api/users/login`, { email, password }, axiosConfig);
        if (response.data && response.data.token) {

            const token = response.data.token;

            // Define um cookie HTTP seguro para o token
            (await cookies()).set("token", token, {
                httpOnly: true,   // Impede acesso no frontend
                secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
                maxAge: 60 * 60 * 24 * 7,  // Expira em 7 dias
                path: "/",
            });


            //sem necessidade de enviar token no json de resposta.
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ error: "No token received" }, { status: 401 });
        }
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
}