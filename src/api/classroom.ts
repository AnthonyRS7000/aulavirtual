import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// ✅ Configurar axios globalmente para enviar cookies
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // 🔥 importante para mantener sesión con Laravel
});

export const googleLogin = async () => {
  window.location.href = `${API_URL}/google/login`;
};

// 🔄 Se recomienda usar POST o GET según tu backend
export const googleCallback = async (code: string) => {
  const response = await api.get(`/google/callback`, {
    params: { code },
  });
  return response.data;
};

export const getDatosCompletos = async () => {
  const response = await api.get(`/google/datos-completos`);
  return response.data;
};
