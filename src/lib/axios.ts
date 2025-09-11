import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // usa lo que pusiste en .env
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;
