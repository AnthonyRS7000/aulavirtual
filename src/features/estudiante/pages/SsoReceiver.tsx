import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function SsoReceiver() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    console.log("🔹 Iniciando SSO Receiver...");

    const parseAndLogin = (payload: any) => {
      if (!payload) return;
      const { token, usuario, foto, rol, datos_udh } = payload;

      if (!token || !usuario) return;

      localStorage.setItem("auth_token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));
      if (foto) localStorage.setItem("foto", foto);
      if (rol) localStorage.setItem("rol", rol);
      if (datos_udh) localStorage.setItem("datos_udh", JSON.stringify(datos_udh));

      login(token, usuario);

      try {
        const ch = new BroadcastChannel("auth_channel");
        ch.postMessage({ type: "login", payload });
        ch.close();
      } catch (e) {}

      navigate("/estudiante/inicio", { replace: true });
    };

    const stored = localStorage.getItem("auth_payload");
    if (stored) {
      try {
        const p = JSON.parse(stored);
        console.log("✅ Datos recuperados de localStorage:", p);
        parseAndLogin(p);
        return;
      } catch (e) {
        console.warn("Error parseando auth_payload:", e);
      }
    }

    const hash = window.location.hash.substring(1);
    if (hash) {
      try {
        const decoded = JSON.parse(atob(hash));
        console.log("✅ Datos recibidos desde hash:", decoded);
        parseAndLogin(decoded);
        return;
      } catch (e) {
        console.warn("Error parseando hash:", e);
      }
    }

    const onMessage = (e: MessageEvent) => {
      const data = e.data?.payload ?? e.data;
      if (!data) return;
      console.log("✅ Datos recibidos por postMessage:", data);
      parseAndLogin(data);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [login, navigate]);

  return <div style={{ padding: "2rem", textAlign: "center" }}>Procesando SSO...</div>;
}
