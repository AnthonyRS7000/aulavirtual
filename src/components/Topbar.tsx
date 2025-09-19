import { useState } from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import NotificacionesDropdown from './NotificacionesDropdown';
import './NotificacionesDropdown.css';

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Mock user data - EXACTO COMO UDH
const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  email: 'armando.estudiante@udh.edu.pe',
  role: 'estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
};

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false);
  const [tieneNotificacionesNoLeidas] = useState(true);

  const toggleNotificaciones = () => {
    setNotificacionesAbiertas(!notificacionesAbiertas);
  };

  const cerrarNotificaciones = () => {
    setNotificacionesAbiertas(false);
  };

  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          {/* Notificaciones */}
          <button 
            className={`topbar-notification ${notificacionesAbiertas ? 'active' : ''}`}
            onClick={toggleNotificaciones}
            title="Notificaciones"
          >
            <BellIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            {tieneNotificacionesNoLeidas && (
              <span className="notification-dot"></span>
            )}
          </button>

          {/* Selector de tema */}
          <ThemeToggle />

          {/* Usuario */}
          <div className="topbar-user">
            <div className="topbar-user-avatar">
              <img
                src={mockUser.image}
                alt={mockUser.full_name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <span className="topbar-user-name">
              {mockUser.full_name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Dropdown de notificaciones */}
      <NotificacionesDropdown 
        isOpen={notificacionesAbiertas}
        onClose={cerrarNotificaciones}
      />
    </header>
  );
}
