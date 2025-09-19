import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InicioEstudiante from './features/estudiante/pages/InicioEstudiante';
import Clases from './features/estudiante/pages/Clases';
import Tareas from './features/estudiante/pages/Tareas';
import Perfil from './features/estudiante/pages/Perfil';
import HorarioHoy from './features/estudiante/pages/HorarioHoy';
import Notas from './features/estudiante/pages/NotasResumen';
import Recursos from './features/estudiante/pages/RecursosRecientes';
import AnunciosCurso from './features/estudiante/pages/AnunciosCurso';
import './App.css';
import './components/ThemeOverrides.css';
import CalendarioAgenda from './features/estudiante/pages/CalendarioAgenda';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<InicioEstudiante />} />
          <Route path="/estudiante/inicio" element={<InicioEstudiante />} />
          <Route path="/estudiante/clases" element={<Clases />} />
          <Route path="/estudiante/tareas" element={<Tareas />} />
          <Route path="/estudiante/perfil" element={<Perfil />} />
          <Route path="/estudiante/anuncios" element={<AnunciosCurso />} />
          <Route path="/estudiante/horario" element={<HorarioHoy />} />
          <Route path="/estudiante/notas" element={<Notas />} />
          <Route path="/estudiante/recursos" element={<Recursos />} />
          <Route path="/estudiante/calendario" element={<CalendarioAgenda />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;