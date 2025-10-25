import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SsoReceiver() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const parseJsonSafe = (s: string) => {
      try { return JSON.parse(s); } catch { return null; }
    };

    const tryDecode = (raw: string) => {
      if (!raw) return null;

      // 1) JSON directo
      let p = parseJsonSafe(raw);
      if (p) return p;

      // 2) intentar decodeURI (caso %3D etc) y parsear JSON
      let decodedURI = raw;
      try { decodedURI = decodeURIComponent(raw); } catch {}

      p = parseJsonSafe(decodedURI);
      if (p) return p;

      // 3) intentar base64 sobre decodedURI -> JSON
      try {
        const dec = atob(decodedURI);
        p = parseJsonSafe(dec);
        if (p) return p;
      } catch {}

      // 4) fallback: intentar base64 sobre raw directo
      try {
        const dec2 = atob(raw);
        p = parseJsonSafe(dec2);
        if (p) return p;
      } catch {}

      return null;
    };

    const parseAndLogin = (payload: any) => {
      if (!payload) return;
      const { token, google_token, usuario, foto, rol, datos_udh } = payload;
      if (!token || !usuario) {
        console.error("Payload incompleto:", { token: !!token, usuario: !!usuario });
        return;
      }

      localStorage.setItem("auth_token", token);
      if (google_token) localStorage.setItem("google_token", google_token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      if (foto) localStorage.setItem("foto", foto);
      if (rol) localStorage.setItem("rol", rol);
      if (datos_udh) localStorage.setItem("datos_udh", JSON.stringify(datos_udh));

      login(token, usuario);

      try {
        const ch = new BroadcastChannel("auth_channel");
        ch.postMessage({ type: "login", payload: { token, google_token, usuario, foto, rol, datos_udh } });
        ch.close();
      } catch (e) { /* no-op */ }

      const roleLower = (rol || usuario?.rol || "estudiante").toLowerCase();
      let targetPath = "/estudiante/inicio";
      switch (roleLower) {
        case "docente": targetPath = "/docente/inicio"; break;
        case "admin": targetPath = "/admin"; break;
        case "estudiante":
        default: targetPath = "/estudiante/inicio"; break;
      }

      window.history.replaceState({}, document.title, targetPath);
      navigate(targetPath, { replace: true });
    };

    // 1) localStorage
    const stored = localStorage.getItem("auth_payload");
    if (stored) {
      const p = tryDecode(stored);
      if (p) { parseAndLogin(p); return; }
    }

    // 2) hash
    const hash = window.location.hash?.substring(1);
    if (hash) {
      const p = tryDecode(hash);
      if (p) { parseAndLogin(p); return; }
    }

    // 3) query string ?auth_payload=
    const queryPayload = new URLSearchParams(window.location.search).get("auth_payload");
    if (queryPayload) {
      const p = tryDecode(queryPayload);
      if (p) { parseAndLogin(p); return; }
    }

    // 4) postMessage
    const onMessage = (e: MessageEvent) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "https://lms.sistemasudh.com",
        "https://lmsback.sistemasudh.com"
      ];
      if (!allowedOrigins.includes(e.origin)) return;
      const data = e.data?.payload ?? e.data;
      if (!data) return;
      parseAndLogin(data);
    };
    window.addEventListener("message", onMessage);

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
  text: { marginTop: "1rem", fontSize: "1.2rem", fontWeight: 500 },
  subtext: { marginTop: "0.5rem", fontSize: "0.9rem", color: "#666" },
};