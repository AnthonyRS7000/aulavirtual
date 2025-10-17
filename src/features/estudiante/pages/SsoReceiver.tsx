import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SsoReceiver() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const parseAndLogin = (payload: any) => {
      if (!payload) return;
      
      const { token, google_token, usuario, foto, rol, datos_udh } = payload;

      if (!token || !usuario) {
        console.error("Payload incompleto:", { token: !!token, usuario: !!usuario });
        return;
      }

      // Guardar tokens
      localStorage.setItem("auth_token", token);
      
      // Guardar google_token si está disponible (crítico para Google Classroom)
      if (google_token) {
        localStorage.setItem("google_token", google_token);
        console.log("✅ google_token guardado");
      }

      // Guardar datos del usuario
      localStorage.setItem("usuario", JSON.stringify(usuario));
      
      if (foto) {
        localStorage.setItem("foto", foto);
      }
      
      if (rol) {
        localStorage.setItem("rol", rol);
      }
      
      if (datos_udh) {
        localStorage.setItem("datos_udh", JSON.stringify(datos_udh));
      }

      console.log("✅ Datos SSO guardados en localStorage");

      // Llamar función de login del contexto
      login(token, usuario);

      // Notificar a otras pestañas (BroadcastChannel)
      try {
        const ch = new BroadcastChannel("auth_channel");
        ch.postMessage({ 
          type: "login", 
          payload: { token, google_token, usuario, foto, rol, datos_udh } 
        });
        ch.close();
      } catch (e) {
        console.warn("BroadcastChannel no disponible:", e);
      }

      // Limpiar hash de la URL
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirigir según rol
      const rolLower = (rol || usuario?.rol || "estudiante").toLowerCase();
      
      switch (rolLower) {
        case "estudiante":
          navigate("/estudiante/inicio", { replace: true });
          break;
        case "docente":
          navigate("/docente/inicio", { replace: true });
          break;
        case "admin":
          navigate("/admin/inicio", { replace: true });
          break;
        default:
          navigate("/inicio", { replace: true });
      }
    };

    // Prioridad 1: Verificar localStorage (sesión anterior)
    const stored = localStorage.getItem("auth_payload");
    if (stored) {
      try {
        const p = JSON.parse(stored);
        console.log("📦 Usando datos de localStorage");
        parseAndLogin(p);
        return;
      } catch (e) {
        console.warn("Error parseando auth_payload:", e);
      }
    }

    // Prioridad 2: Verificar hash en URL (SSO desde otro dominio)
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        console.log("🔐 Decodificando datos del hash...");
        const decoded = JSON.parse(atob(hash));
        parseAndLogin(decoded);
        return;
      } catch (e) {
        console.warn("Error parseando hash:", e);
      }
    }

    // Prioridad 3: Escuchar postMessage (comunicación entre ventanas)
    const onMessage = (e: MessageEvent) => {
      // Validar origen si es necesario
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lms.sistemasudh.com",
        "https://lmsback.sistemasudh.com"
      ];

      if (!allowedOrigins.includes(e.origin)) {
        console.warn("Origen no permitido:", e.origin);
        return;
      }

      const data = e.data?.payload ?? e.data;
      if (!data) return;
      
      console.log("📨 Datos recibidos por postMessage");
      parseAndLogin(data);
    };

    window.addEventListener("message", onMessage);

    // Si no encontró datos, redirigir a login
    const timer = setTimeout(() => {
      console.warn("No se encontraron datos SSO, redirigiendo a login...");
      navigate("/login", { replace: true });
    }, 3000);

    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, [login, navigate]);

  return (
    <div style={styles.container}>
      <style>
        {`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}
      </style>

      <div style={styles.spinner}></div>
      <p style={styles.text}>Procesando inicio de sesión...</p>
      <p style={styles.subtext}>Por favor espera...</p>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f9fafb 0%, #e5e7eb 100%)",
    color: "#333",
    fontFamily: "system-ui, sans-serif",
  },
  spinner: {
    width: "60px",
    height: "60px",
    border: "6px solid #ddd",
    borderTop: "6px solid #2b9a8f",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  text: {
    marginTop: "1rem",
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  subtext: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#666",
  },
};