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

    const cookieStore = cookies();
    (await cookieStore).delete({name: "token", path : "/", httpOnly : true});
    return NextResponse.json({ success: true });

}