import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

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
  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
          {/* Botón toggle sidebar - SOLO visible cuando sidebar está cerrado */}
          {!isSidebarOpen && (
            <button
              onClick={onToggleSidebar}
              className="topbar-toggle"
              title="Abrir barra lateral"
            >
              <Bars3Icon style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>
          )}
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          {/* Notificaciones */}
          <button className="topbar-notification" title="Notificaciones">
            <BellIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            <span className="notification-dot"></span>
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
    </header>
  );
}
