// src/app/api/login/route.ts
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192"; // backend C#

const axiosConfig = {
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
};

export async function POST(request: Request) {
  try {

    const { email, password } = await request.json();
    const tenantId = (await cookies()).get("tenantId")?.value;

    // Chamada ao backend
    const response = await axios.post(`${API_URL}/api/users/login`,
      { email, password },
      {
        ...axiosConfig,
        headers: {
          "Content-Type": "application/json",
          "X-Tenant-Id": `${tenantId ? tenantId.toString() : ""}`
        },
      });

    const { token, user } = response.data;

    if (!token) {
      return NextResponse.json({ error: "No token received" }, { status: 401 });
    }

    // Cria a resposta e seta cookie HTTP-only
    const res = NextResponse.json({ success: true, user }, { status: 200 });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
      sameSite: "lax", // permite envio do cookie em requests de frontend
    });

    return res;


  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}


/* 

Explicação do fluxo do token HTTP-only:

1 - O token é retornado pelo backend C# no login e enviado para o navegador via:
   res.cookies.set("token", token, { httpOnly: true, ... });
   - Isso gera um header HTTP `Set-Cookie` no response.
   - O cookie fica armazenado localmente **no navegador** e não é acessível via JS por ser HTTP-only.

2 - Quando o navegador faz requests futuras para o Next.js (ex: /api/lunchboxes), ele envia automaticamente o cookie armazenado.

3 - No Next.js:
   - `cookies().get("token")` **lê apenas os cookies que vieram no request atual que chegou ao servidor Next.js**.
   - Ou seja, ele não “pega diretamente do navegador”; se o request não enviar o cookie (como em um fetch interno no servidor), será `undefined`.

4 -  Para usar token em Server Components ou fetch interno autenticado:
   - Pegue os cookies do browser no Server Component:
     const cookieHeader = headers().get("cookie");
   - Envie no header da requisição para o endpoint:
     fetch('/api/lunchboxes', { headers: { cookie: cookieHeader || "" } });
   - No route handler, extraia o token do header:
     const token = request.headers.get("cookie")?.split(";").find(c => c.trim().startsWith("token="))?.split("=")[1];
   - Agora você pode usar esse token para chamadas autenticadas ao backend.

  Resumo: 
- Client Components enviam cookies automaticamente, facilitando autenticação.
- Server Components exigem repasse manual do cookie do navegador se você quiser usar HTTP-only tokens.

*/
