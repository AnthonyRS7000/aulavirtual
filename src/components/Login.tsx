import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    const origin = window.location.origin;
    const state = btoa(JSON.stringify({ origin }));
    const backendUrl = "http://127.0.0.1:8000/api/google/redirect";

    const popup = window.open(
      `${backendUrl}?state=${state}`,
      "_blank",
      "width=500,height=600"
    );

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== origin) return;

      if (event.data.type === "google-auth-success") {
        const { token, usuario } = event.data;
        login(token, usuario);
        popup?.close();
        window.removeEventListener("message", handleMessage);
      }

      if (event.data.type === "google-auth-error") {
        alert("❌ Error: " + event.data.message);
        popup?.close();
        window.removeEventListener("message", handleMessage);
      }
    };

    window.addEventListener("message", handleMessage);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <p>Accede con tu cuenta de Google</p>

        <button className="google-button" onClick={handleGoogleLogin}>
          <FcGoogle size={24} className="google-icon" />
          <span>Iniciar sesión con Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
