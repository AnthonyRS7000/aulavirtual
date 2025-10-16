import { useState } from 'react';
import { BellIcon, Bars3Icon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import NotificacionesDropdown from './NotificacionesDropdown';
import PerfilDropdown from './PerfilDropdown';
import './NotificacionesDropdown.css';
import { useAuth } from '../context/AuthContext'; // <-- añadido

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  userCase?: 'estudiante' | 'docente';
}

// FUNCIÓN DINÁMICA - cambia según el userCase
const getUserData = (userCase: 'estudiante' | 'docente') => {
  if (userCase === 'docente') {
    return {
      full_name: 'DR. CARLOS MENDOZA SILVA',
      email: 'carlos.docente@udh.edu.pe',
      role: 'Docente',
      image: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=4A9B8E&color=fff',
    };
  }
  
  // Para estudiantes
  return {
    full_name: 'Usuario', 
    email: 'Usuario.estudiante@udh.edu.pe',
    role: 'Estudiante',
    image: 'https://ui-avatars.com/api/?name=Usuario&background=39B49E&color=fff',
  };
};

export default function Topbar({ onToggleSidebar, isSidebarOpen, userCase = 'estudiante' }: TopbarProps) {
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [tieneNotificacionesNoLeidas] = useState(true);
  const [perfilOpen, setPerfilOpen] = useState(false);

  // ✅ OBTENER datos desde contexto de autenticación si existe
  const { user } = useAuth();
  const userData = user ?? getUserData(userCase);

  const toggleNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
  };

  const cerrarNotificaciones = () => {
    setNotificacionesAbiertas(false);
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        <div className="topbar-left">
          {/* Botón hamburguesa: visible en mobile para abrir/ocultar el sidebar */}
          <button
            className="topbar-toggle"
            onClick={onToggleSidebar}
            aria-label={isSidebarOpen ? 'Cerrar menú lateral' : 'Abrir menú lateral'}
            aria-controls="app-sidebar"
            aria-expanded={isSidebarOpen}
          >
            <Bars3Icon style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        <div className="topbar-right">
          
          {/* Notificaciones */}
          <button 
            className={`topbar-notification ${notificacionesAbiertas ? 'active' : ''}`}
            onClick={toggleNotificaciones}
            title="Notificaciones"
          >
            <BellIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            {tieneNotificacionesNoLeidas && 
              <span className="notification-dot"></span>
            }
          </button>

          <ThemeToggle />

          {/* Usuario - ahora usa datos reales de sesión si existen */}
          <div className="topbar-user" onClick={() => setPerfilOpen(!perfilOpen)} style={{ cursor: 'pointer' }}>
            <div className="topbar-user-avatar">
              <img
                src={userData.image} 
                alt={userData.full_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span className="topbar-user-name">
              {(userData.full_name || '').split(' ')[0] || 'Usuario'}
            </span>
          </div>

          <PerfilDropdown isOpen={perfilOpen} onClose={() => setPerfilOpen(false)} />
        </div>
      </div>

      <NotificacionesDropdown 
        isOpen={notificacionesAbiertas}
        onClose={cerrarNotificaciones}
      />
    </header>
  );
}