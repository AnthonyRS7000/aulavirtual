import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../components/ThemeToggle';
import './Topbar.css';

interface TopbarProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Mock user data - EXACTO COMO UDH
/* const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  email: 'armando.estudiante@udh.edu.pe',
  role: 'estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
}; */

export default function Topbar({ onToggleSidebar, isSidebarOpen }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <div className="topbar-container">
        {/* Lado izquierdo */}
        <div className="topbar-left">
          {/* Si se usa sidebar colapsable, muestra botón */}
          {!isSidebarOpen && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="topbar-toggle"
              title="Abrir barra lateral"
            >
              <Bars3Icon style={{ width: '1.5rem', height: '1.5rem' }} />
            </button>
          )}

          <h1 className="topbar-title">Aula Virtual - Estudiante</h1>
        </div>

        {/* Lado derecho */}
        <div className="topbar-right">
          <button className="topbar-notification" title="Notificaciones">
            <BellIcon style={{ width: '1.25rem', height: '1.25rem' }} />
            <span className="notification-dot"></span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
