// src/api/auth.ts o src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

type AuthContextType = {
  isAuthenticated: boolean;
  user: any | null;
  rol: string;
  login: (token: string, usuario: any) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  rol: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [rol, setRol] = useState("");

  useEffect(() => {
    // ✅ Restaurar sesión si existe en localStorage
    const token = localStorage.getItem("auth_token");
    const usuario = localStorage.getItem("usuario");
    const storedRol = localStorage.getItem("rol");

    if (token && usuario) {
      setIsAuthenticated(true);
      setUser(JSON.parse(usuario));
      setRol(storedRol || "");
    }
  }, []);

  const login = (token: string, usuario: any) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUser(usuario);
    setIsAuthenticated(true);
    setRol(usuario?.rol || "");
    // establecer header global para axios
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, rol, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
