import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ClasesProvider } from "./context/ClasesContext";
import Layout from "./components/Layout";
import LayoutDocente from './features/docente/components/layout/LayoutDocente';
import LayoutAdmin from './features/admin/components/layout/LayoutAdmin';
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
import GestionCursosDocente from "./features/docente/pages/GestionCursos";
import GestionEstudiantes from "./features/docente/pages/GestionEstudiantes";
import MensajeriaDocente from "./features/docente/pages/MensajeriaDocente";
import BibliotecaDocente from "./features/docente/pages/BibliotecaDocente";
import HorarioDocente from "./features/docente/pages/HorarioDocente";
import CarpetaDigital from "./features/docente/pages/CarpetaDigital";
import PerfilDocente from "./features/docente/pages/PerfilDocente";

// Admin
import DashboardAdmin from "./features/admin/pages/DashboardAdmin";
import GestionEstudiantesAdmin from "./features/admin/pages/GestionEstudiantesAdmin";
import GestionDocentesAdmin from "./features/admin/pages/GestionDocentesAdmin";
import SubirAnuncios from "./features/admin/pages/SubirAnuncios";
import SoporteClassroom from "./features/admin/pages/SoporteClassroom";
import GestionCursosAdmin from "./features/admin/pages/GestionCursos";
import PerfilAdmin from "./features/admin/pages/PerfilAdmin";

function App() {
  return (
    <Router>
      <ClasesProvider>
        <Routes>
          <Route path="/" element={<HomeSelector />} />
          <Route path="/sso/receive" element={<SsoReceiver />} />

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

          <Route element={<LayoutDocente />}>
            <Route path="/docente/dashboard" element={<DashboardDocente />} />
            <Route path="/docente/cursos" element={<GestionCursosDocente />} />
            <Route path="/docente/horario" element={<HorarioDocente />} />
            <Route path="/docente/estudiantes" element={<GestionEstudiantes />} />
            <Route path="/docente/biblioteca" element={<BibliotecaDocente />} />
            <Route path="/docente/mensajeria" element={<MensajeriaDocente />} />
            <Route path="/docente/carpeta-digital" element={<CarpetaDigital />} />
            <Route path="/docente/perfil" element={<PerfilDocente />} />
            <Route path="/docente/notas/parciales" element={<div>Notas Parciales</div>} />
            <Route path="/docente/notas/finales" element={<div>Notas Finales</div>} />
            <Route path="/docente/notas/reportes" element={<div>Reportes</div>} />
          </Route>

          <Route element={<LayoutAdmin />}>
            <Route path="/admin/dashboard" element={<DashboardAdmin />} />
            <Route path="/admin/estudiantes" element={<GestionEstudiantesAdmin />} />
            <Route path="/admin/docentes" element={<GestionDocentesAdmin />} />
            <Route path="/admin/cursos" element={<GestionCursosAdmin />} />
            <Route path="/admin/anuncios" element={<SubirAnuncios />} />
            <Route path="/admin/soporte-classroom" element={<SoporteClassroom />} />
            <Route path="/admin/perfil" element={<PerfilAdmin />} />
            <Route path="/admin/reportes" element={<div>Reportes</div>} />
            <Route path="/admin/configuracion" element={<div>Configuración</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ClasesProvider>
    </Router>
  );
}

export default App;
