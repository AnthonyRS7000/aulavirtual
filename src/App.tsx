import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar'; // si tienes
import InicioEstudiante from './features/estudiante/pages/InicioEstudiante'; // ajusta la ruta si es necesario
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="main-content">
          <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Routes>
            <Route path="/" element={<InicioEstudiante />} />
            {/* Puedes añadir más rutas aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;