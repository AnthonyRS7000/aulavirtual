import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ClasesProvider } from "./context/ClasesContext";
import Layout from "./components/Layout";
import HomeSelector from "./components/HomeSelector";

// Estudiante
import InicioEstudiante from "./features/estudiante/pages/InicioEstudiante";
import Clases from "./features/estudiante/pages/Clases";
import Tareas from "./features/estudiante/pages/Tareas";
import Perfil from "./features/estudiante/pages/Perfil";
import HorarioHoy from "./features/estudiante/pages/HorarioHoy";
import Notas from "./features/estudiante/pages/NotasResumen";
import Recursos from "./features/estudiante/pages/RecursosRecientes";
import AnunciosCurso from "./features/estudiante/pages/AnunciosCurso";
import ClaseDetalle from "./features/estudiante/components/ClaseDetalle";
import CalendarioAgenda from "./features/estudiante/pages/CalendarioAgenda";

// Docente
import DashboardDocente from "./features/docente/pages/DashboardDocente";
import GestionCursos from "./features/docente/pages/GestionCursos";
import GestionEstudiantes from "./features/docente/pages/GestionEstudiantes";

function App() {
  return (
    <Router>
      <ClasesProvider>
        <Routes>
          {/* Selector inicial */}
          <Route path="/" element={<HomeSelector />} />

          {/* Estudiante */}
          <Route element={<Layout userCase="estudiante" />}>
            <Route path="/estudiante/inicio" element={<InicioEstudiante />} />
            <Route path="/estudiante/clases" element={<Clases />} />
            <Route path="/estudiante/clases/:id" element={<ClaseDetalle />} />
            <Route path="/estudiante/tareas" element={<Tareas />} />
            <Route path="/estudiante/perfil" element={<Perfil />} />
            <Route path="/estudiante/horario" element={<HorarioHoy />} />
            <Route path="/estudiante/notas" element={<Notas />} />
            <Route path="/estudiante/recursos" element={<Recursos />} />
            <Route path="/estudiante/anuncios" element={<AnunciosCurso />} />
            <Route path="/estudiante/calendario" element={<CalendarioAgenda />} />
          </Route>

          {/* Docente */}
          <Route element={<Layout userCase="docente" />}>
            <Route path="/docente/dashboard" element={<DashboardDocente />} />
            <Route path="/docente/cursos" element={<GestionCursos />} />
            <Route path="/docente/estudiantes" element={<GestionEstudiantes />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ClasesProvider>
    </Router>
  );
}

export default App;
