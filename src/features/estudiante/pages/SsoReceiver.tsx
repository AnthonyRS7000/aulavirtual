import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SsoReceiver() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    // Función para parsear el payload y hacer login
    const parseAndLogin = (payload: any) => {
      if (!payload) return;

      const { token, google_token, usuario, foto, rol, datos_udh } = payload;

      if (!token || !usuario) {
        console.error("Payload incompleto:", { token: !!token, usuario: !!usuario });
        return;
      }

      // Guardar tokens y datos en localStorage
      localStorage.setItem("auth_token", token);
      if (google_token) localStorage.setItem("google_token", google_token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      if (foto) localStorage.setItem("foto", foto);
      if (rol) localStorage.setItem("rol", rol);
      if (datos_udh) localStorage.setItem("datos_udh", JSON.stringify(datos_udh));

      // Login en contexto
      login(token, usuario);

      // Notificar a otras pestañas mediante BroadcastChannel
      try {
        const ch = new BroadcastChannel("auth_channel");
        ch.postMessage({ type: "login", payload: { token, google_token, usuario, foto, rol, datos_udh } });
        ch.close();
      } catch (e) {
        console.warn("BroadcastChannel no disponible:", e);
      }

      // Redirigir según rol
      const rolLower = (rol || usuario?.rol || "estudiante").toLowerCase();
      let targetPath = "/inicio"; // ruta por defecto
      switch (rolLower) {
        case "estudiante":
          targetPath = "/estudiante/inicio";
          break;
        case "docente":
          targetPath = "/docente/inicio";
          break;
        case "admin":
          targetPath = "/admin/inicio";
          break;
      }

      // Limpiar URL y navegar
      window.history.replaceState({}, document.title, targetPath);
      navigate(targetPath, { replace: true });
    };

    // 1️⃣ Verificar localStorage
    const stored = localStorage.getItem("auth_payload");
    if (stored) {
      try {
        const p = JSON.parse(stored);
        parseAndLogin(p);
        return;
      } catch (e) {
        console.warn("Error parseando auth_payload:", e);
      }
    }

    // 2️⃣ Verificar hash en URL
    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        parseAndLogin(decoded);
        return;
      } catch (e) {
        console.warn("Error parseando hash:", e);
      }
    }

    // 3️⃣ Verificar query string
const queryPayload = new URLSearchParams(window.location.search).get("auth_payload");
if (queryPayload) {
  try {
    const decodedStr = decodeURIComponent(queryPayload); // ✅ decodifica caracteres %3D, %2F, etc.
    const decoded = JSON.parse(atob(decodedStr));        // ✅ convierte base64 a JSON
    parseAndLogin(decoded);
    return;
  } catch (e) {
    console.warn("Error parseando query auth_payload:", e);
  }
}

    // 4️⃣ Escuchar postMessage
    const onMessage = (e: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://lms.sistemasudh.com",
        "https://lmsback.sistemasudh.com"
      ];
      if (!allowedOrigins.includes(e.origin)) return;

      const data = e.data?.payload ?? e.data;
      if (!data) return;

      parseAndLogin(data);
    };
    window.addEventListener("message", onMessage);

    // 5️⃣ Redirigir a login si no se encontró SSO
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
