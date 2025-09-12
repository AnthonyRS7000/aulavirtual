import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import InicioEstudiante from './features/estudiante/pages/InicioEstudiante';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<InicioEstudiante />} />
          <Route path="/dashboard" element={<InicioEstudiante />} />
          <Route path="/clases" element={<div className="card">Clases</div>} />
          <Route path="/horario" element={<div className="card">Horario</div>} />
          <Route path="/recursos" element={<div className="card">Recursos</div>} />
          <Route path="/notas" element={<div className="card">Notas</div>} />
          <Route path="/perfil" element={<div className="card">Perfil</div>} />
          <Route path="/configuracion" element={<div className="card">Configuración</div>} />
          <Route path="/ai" element={<div className="card">Asistente IA</div>} />
          <Route path="/tv" element={<div className="card">Aula Virtual TV</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;