// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

type UserData = {
  full_name: string;
  role: string;
  image: string;
};

type AuthContextType = {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (payload: { token?: string; usuario?: any; datos_udh?: any; foto?: string; rol?: string }) => void;
  logout: () => void;
  clearStorage: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  clearStorage: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const buildFullName = (usuario: any, datos_udh: any) => {
    return (
      usuario?.full_name ||
      usuario?.nombre_completo ||
      datos_udh?.full_name ||
      datos_udh?.nombre_completo ||
      [usuario?.nombres || datos_udh?.nombres, usuario?.apellidos || datos_udh?.apellidos]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      usuario?.nombre ||
      datos_udh?.nombre ||
      "Estudiante"
    );
  };

  // 🔹 Cargar usuario desde localStorage al inicio (leer varias claves posibles)
  useEffect(() => {
    try {
      const storedFullName = localStorage.getItem("user_full_name");
      const storedRole = localStorage.getItem("user_role");
      const storedImage = localStorage.getItem("user_image");

      if (storedFullName && storedRole) {
        setUser({
          full_name: storedFullName,
          role: storedRole,
          image:
            storedImage ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(storedFullName)}&background=39B49E&color=fff`,
        });
        setIsAuthenticated(true);
        return;
      }

      const usuarioRaw = localStorage.getItem("usuario");
      const datosUdhRaw = localStorage.getItem("datos_udh");

      const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
      const datos_udh = datosUdhRaw ? JSON.parse(datosUdhRaw) : null;

      if (usuario || datos_udh) {
        const fullName = buildFullName(usuario, datos_udh);
        const role = localStorage.getItem("rol") || usuario?.rol || usuario?.role || datos_udh?.rol || "Estudiante";
        const image =
          localStorage.getItem("foto") ||
          usuario?.image ||
          usuario?.foto ||
          datos_udh?.image ||
          datos_udh?.foto ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=39B49E&color=fff`;

        setUser({ full_name: fullName, role, image });
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.warn("Error leyendo sesión desde localStorage:", err);
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Orígenes permitidos base
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://lmsback.sistemasudh.com",
    "https://lms.sistemasudh.com",
  ];

  try {
    if (typeof window !== "undefined" && window.location?.origin) {
      if (!allowedOrigins.includes(window.location.origin)) allowedOrigins.push(window.location.origin);
    }
  } catch (e) {
    // noop
  }

  // 🔹 Escuchar cambios de localStorage (storage event) para sincronizar sesión entre ventanas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      const keys = ["user_full_name", "user_role", "user_image", "usuario", "datos_udh", "foto", "rol", "auth_token"];
      if (!e.key || !keys.includes(e.key)) return;

      try {
        // Reconstruir usuario desde localStorage (misma lógica que en el mount)
        const storedFullName = localStorage.getItem("user_full_name");
        const storedRole = localStorage.getItem("user_role");
        const storedImage = localStorage.getItem("user_image");

        if (storedFullName && storedRole) {
          setUser({
            full_name: storedFullName,
            role: storedRole,
            image:
              storedImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(storedFullName)}&background=39B49E&color=fff`,
          });
          setIsAuthenticated(true);
          return;
        }

        const usuarioRaw = localStorage.getItem("usuario");
        const datosUdhRaw = localStorage.getItem("datos_udh");

        const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
        const datos_udh = datosUdhRaw ? JSON.parse(datosUdhRaw) : null;

        if (usuario || datos_udh) {
          const fullName = buildFullName(usuario, datos_udh);
          const role = localStorage.getItem("rol") || usuario?.rol || usuario?.role || datos_udh?.rol || "Estudiante";
          const image =
            localStorage.getItem("foto") ||
            usuario?.image ||
            usuario?.foto ||
            datos_udh?.image ||
            datos_udh?.foto ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=39B49E&color=fff`;

          setUser({ full_name: fullName, role, image });
          setIsAuthenticated(true);
          return;
        }

        // Si no hay datos, limpiar
        setUser(null);
        setIsAuthenticated(false);
      } catch (err) {
        console.warn("Error sincronizando storage:", err);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🔹 Escuchar mensajes de autenticación desde el proyecto principal
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.debug("[AuthContext] message event:", event.origin, event.data);

      const isLocalhost =
        typeof event.origin === "string" &&
        (event.origin.startsWith("http://localhost") || event.origin.startsWith("http://127.0.0.1"));

      const isAllowed = typeof event.origin === "string" && (allowedOrigins.includes(event.origin) || isLocalhost);

      if (!isAllowed) {
        console.warn("Origen no permitido en AuthContext:", event.origin);
        return;
      }

      const type = event.data?.type;
      const payload = event.data?.payload ?? event.data;

      if (type === "AUTH_PAYLOAD" || type === "google-auth-success" || type === "AUTH_SUCCESS") {
        login({
          token: payload?.token,
          usuario: payload?.usuario,
          datos_udh: payload?.datos_udh,
          foto: payload?.foto || payload?.image,
          rol: payload?.rol,
        });
        return;
      }

      if (payload && (payload.token || payload.usuario || payload.datos_udh)) {
        login({
          token: payload.token,
          usuario: payload.usuario,
          datos_udh: payload.datos_udh,
          foto: payload.foto || payload.image,
          rol: payload.rol,
        });
        return;
      }

      if (type === "LOGOUT") {
        logout();
      }
    };

    window.addEventListener("message", handleMessage);

    try {
      // Evitar leer opener.location.origin (causa SecurityError).
      // En su lugar enviar READY_FOR_TOKEN con targetOrigin '*' (o sustituir por un origin conocido).
      if (window.opener) {
        window.opener.postMessage({ type: "READY_FOR_TOKEN" }, "*");
      }
    } catch (err) {
      console.warn("No se pudo notificar opener:", err);
    }

    return () => window.removeEventListener("message", handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🔹 Login (guardar en localStorage)
  const login = (payload: { token?: string; usuario?: any; datos_udh?: any; foto?: string; rol?: string }) => {
    const { token, usuario, datos_udh, foto, rol } = payload;

    if (token) localStorage.setItem("auth_token", token);
    if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));
    if (datos_udh) localStorage.setItem("datos_udh", JSON.stringify(datos_udh));
    if (foto) localStorage.setItem("foto", foto);
    if (rol) localStorage.setItem("rol", rol);

    const fullName = buildFullName(usuario, datos_udh);
    const role = rol || usuario?.rol || usuario?.role || datos_udh?.rol || "Estudiante";
    const image =
      foto ||
      usuario?.image ||
      usuario?.foto ||
      datos_udh?.image ||
      datos_udh?.foto ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=39B49E&color=fff`;

    localStorage.setItem("user_full_name", fullName);
    localStorage.setItem("user_role", role);
    localStorage.setItem("user_image", image);

    setUser({ full_name: fullName, role, image });
    setIsAuthenticated(true);

    console.log("✅ Usuario autenticado:", { full_name: fullName, role });
  };

  // 🔹 Logout (borrar datos y notificar al proyecto principal)
  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("datos_udh");
    localStorage.removeItem("user_full_name");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_image");
    localStorage.removeItem("foto");
    localStorage.removeItem("rol");

    setUser(null);
    setIsAuthenticated(false);

    try {
      if (window.opener) {
        window.opener.postMessage({ type: "LOGOUT_CONFIRMED" }, allowedOrigins[0]);
      }
    } catch (err) {
      // ignore
    }

    console.log("🚪 Sesión cerrada");
  };

  const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, clearStorage }}>
      {children}
    </AuthContext.Provider>
  );
};