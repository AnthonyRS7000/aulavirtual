import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InicioEstudiante from './features/estudiante/pages/InicioEstudiante';
import Dashboard from './features/estudiante/pages/Dashboard';
import Clases from './features/estudiante/pages/Clases';
import Tareas from './features/estudiante/pages/Tareas';
import Perfil from './features/estudiante/pages/Perfil';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<InicioEstudiante />} />
          <Route path="/estudiante/inicio" element={<InicioEstudiante />} />
          <Route path="/estudiante/dashboard" element={<Dashboard />} />
          <Route path="/estudiante/clases" element={<Clases />} />
          <Route path="/estudiante/tareas" element={<Tareas />} />
          <Route path="/estudiante/perfil" element={<Perfil />} />
          {/* Rutas originales para compatibilidad */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clases" element={<Clases />} />
          <Route path="/tareas" element={<Tareas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/horario" element={<div className="card">Horario</div>} />
          <Route path="/recursos" element={<div className="card">Recursos</div>} />
          <Route path="/notas" element={<div className="card">Notas</div>} />
          <Route path="/configuracion" element={<div className="card">Configuración</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;