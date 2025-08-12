import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // URL base da sua API
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 segundos
});


/* 
// Interceptor para requisições
axiosInstance.interceptors.request.use(
  (config) => {
    // Exemplo: adicionar token JWT se existir
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respostas
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro retornado pelo servidor
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Nenhuma resposta do servidor
      return Promise.reject({ message: "Sem resposta do servidor." });
    } else {
      // Erro na configuração da requisição
      return Promise.reject({ message: error.message });
    }
  }
); */

export default axiosInstance;