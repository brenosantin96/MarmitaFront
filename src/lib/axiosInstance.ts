import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND || "", // URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: process.env.NODE_ENV === 'production', // Ignora apenas em desenvolvimento
    }) // 10 segundos
});


export default axiosInstance;