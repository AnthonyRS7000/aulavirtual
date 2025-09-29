import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Páginas de estudiante
import InicioEstudiante from './features/estudiante/pages/InicioEstudiante';
import Clases from './features/estudiante/pages/Clases';
import Tareas from './features/estudiante/pages/Tareas';
import Perfil from './features/estudiante/pages/Perfil';
import HorarioHoy from './features/estudiante/pages/HorarioHoy';
import Notas from './features/estudiante/pages/NotasResumen';
import Recursos from './features/estudiante/pages/RecursosRecientes';
import AnunciosCurso from './features/estudiante/pages/AnunciosCurso';
import ClaseDetalle from './features/estudiante/components/ClaseDetalle';
import CalendarioAgenda from './features/estudiante/pages/CalendarioAgenda';

// Páginas de docente - NUEVAS IMPORTACIONES
import DashboardDocente from './features/docente/pages/DashboardDocente';
import GestionCursos from './features/docente/pages/GestionCursos';
import GestionEstudiantes from './features/docente/pages/GestionEstudiantes';

import { ClasesProvider } from './context/ClasesContext';
import './App.css';
import './components/ThemeOverrides.css';


function App() {
  const getCurrentCase = (): 'estudiante' | 'docente' => {
    return 'docente';
  };
  const currentCase = getCurrentCase();

  return (
    <Router>
      <ClasesProvider>
      <Layout userCase={currentCase}>
        <Routes>
          {currentCase === 'estudiante' && (
            <>
              <Route path="/" element={<Navigate to="/estudiante/inicio" replace />} />
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
              <Route path="/docente/*" element={<Navigate to="/estudiante/inicio" replace />} />
              <Route path="*" element={<Navigate to="/estudiante/inicio" replace />} />
            </>
          )}

            {currentCase === 'docente' && (
              <>
                <Route path="/" element={<Navigate to="/docente/dashboard" replace />} />
                
                <Route path="/docente/dashboard" element={<DashboardDocente />} />
                <Route path="/docente/cursos" element={<GestionCursos />} />
                <Route path="/docente/estudiantes" element={<GestionEstudiantes />} />
                
                <Route path="/estudiante/*" element={<Navigate to="/docente/dashboard" replace />} />
                
                <Route path="/dashboard" element={<Navigate to="/docente/dashboard" replace />} />
                <Route path="/cursos" element={<Navigate to="/docente/cursos" replace />} />
                <Route path="/estudiantes" element={<Navigate to="/docente/estudiantes" replace />} />
                
                {/* Catch-all para docente */}
                <Route path="*" element={<Navigate to="/docente/dashboard" replace />} />
            </>
          )}
          
          
        </Routes>
      </Layout>
      </ClasesProvider>
    </Router>
  );
}


export default App;