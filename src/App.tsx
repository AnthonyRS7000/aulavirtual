import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ClasesProvider } from "./context/ClasesContext";
import Layout from "./components/Layout";
import LayoutDocente from './features/docente/components/layout/LayoutDocente'; // ✅ Tu layout separado
import HomeSelector from "./components/HomeSelector";
// Estudiante
import InicioEstudiante from "./features/estudiante/pages/InicioEstudiante";
import Clases from "./features/estudiante/pages/Clases";
import Tareas from "./features/estudiante/pages/Tareas";
import Perfil from "./features/estudiante/pages/Perfil";
import HorarioHoy from "./features/estudiante/pages/HorarioHoy";
import MiHorario from "./features/estudiante/pages/MiHorario";
import Notas from "./features/estudiante/pages/NotasResumen";
import Mensajeria from "./features/estudiante/pages/Mensajeria";
import Biblioteca from "./features/estudiante/pages/Biblioteca";
import AnunciosCurso from "./features/estudiante/pages/AnunciosCurso";
import ClaseDetalle from "./features/estudiante/components/ClaseDetalle";
import SsoReceiver from "./features/estudiante/pages/SsoReceiver";
// Docente
import DashboardDocente from "./features/docente/pages/DashboardDocente";
import GestionCursos from "./features/docente/pages/GestionCursos";
import GestionEstudiantes from "./features/docente/pages/GestionEstudiantes";
import MensajeriaDocente from "./features/docente/pages/MensajeriaDocente";

function App() {
  return (
    <Router>
      <ClasesProvider>
        <Routes>
          {/* Selector inicial */}
          <Route path="/" element={<HomeSelector />} />
          <Route path="/sso/receive" element={<SsoReceiver />} />
          {/* ESTUDIANTE - Usa Layout.tsx (solo para estudiantes) */}
          <Route element={<Layout userCase="estudiante" />}>
            <Route path="/estudiante/inicio" element={<InicioEstudiante />} />
            <Route path="/estudiante/clases" element={<Clases />} />
            <Route path="/estudiante/clases/:id" element={<ClaseDetalle />} />
            <Route path="/estudiante/tareas" element={<Tareas />} />
            <Route path="/estudiante/perfil" element={<Perfil />} />
            <Route path="/estudiante/horario" element={<HorarioHoy />} />
            <Route path="/estudiante/mi-horario" element={<MiHorario />} />
            <Route path="/estudiante/notas" element={<Notas />} />
            <Route path="/estudiante/mensajeria" element={<Mensajeria />} />
            <Route path="/estudiante/biblioteca" element={<Biblioteca />} />
            <Route path="/estudiante/anuncios" element={<AnunciosCurso />} />
          
          </Route>

          {/* DOCENTE - Usa LayoutDocente.tsx ✅ (tu layout independiente) */}
          <Route element={<LayoutDocente />}>
            <Route path="/docente/dashboard" element={<DashboardDocente />} />
            <Route path="/docente/cursos" element={<GestionCursos />} />
            <Route path="/docente/estudiantes" element={<GestionEstudiantes />} />
            <Route path="/docente/mensajeria" element={<MensajeriaDocente />} />
            
            
            
            {/* Submenús si los tienes configurados */}
            <Route path="/docente/notas/parciales" element={<div>Notas Parciales</div>} />
            <Route path="/docente/notas/finales" element={<div>Notas Finales</div>} />
            <Route path="/docente/notas/reportes" element={<div>Reportes</div>} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ClasesProvider>
    </Router>
  );
}

export default App;