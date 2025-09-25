import axios from "axios";

const api = axios.create({
  baseURL: "https://lmsback.sistemasudh.com/api", // tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // o donde lo estés guardando
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
