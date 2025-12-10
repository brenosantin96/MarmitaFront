// src/lib/axiosInstance.ts

import axios from "axios";
import https from "https";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "https://localhost:7192",
  httpsAgent: new https.Agent({
    rejectUnauthorized: process.env.NODE_ENV === "production",
  }),
  withCredentials: true
});

// Adiciona Tenant ID automaticamente
api.interceptors.request.use((config) => {
  const tenantId = typeof window !== "undefined" 
    ? localStorage.getItem("tenantId") 
    : null;

  if (tenantId) config.headers["X-Tenant-Id"] = tenantId;

  return config;
});

export default api;
