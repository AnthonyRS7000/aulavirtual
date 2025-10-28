import { useNavigate } from "react-router-dom";

export default function HomeSelector() {
  const navigate = useNavigate();

  const handleSelect = (role: "estudiante" | "docente" | "admin") => {
    if (role === "estudiante") {
      navigate("/estudiante/inicio");
    } else if (role === "docente") {
      navigate("/docente/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "5rem", textAlign: "center" }}>
      <h2>Selecciona tu rol</h2>
      <button onClick={() => handleSelect("estudiante")} style={{ padding: "10px 20px" }}>
        Ingresar como Estudiante
      </button>
      <button onClick={() => handleSelect("docente")} style={{ padding: "10px 20px" }}>
        Ingresar como Docente
      </button>
      <button onClick={() => handleSelect("admin")} style={{ padding: "10px 20px" }}>
        Ingresar como Administrador
      </button>
    </div>
  );
}
