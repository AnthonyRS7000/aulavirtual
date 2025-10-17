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

  const { user } = useAuth();

  // Normalizar nombre y avatar desde distintos shapes posibles de "user"
  const displayName = (() => {
    if (!user) return undefined;
    if (user.full_name) return user.full_name;
    if (user.name) return user.name;
    const nombres = user.nombres ?? user.first_name ?? '';
    const apellidos = user.apellidos ?? user.last_name ?? '';
    const combined = `${(nombres || '').trim()} ${(apellidos || '').trim()}`.trim();
    if (combined) return combined;
    if (user.email) return user.email.split('@')[0];
    return undefined;
  })();

  const displayImage = (() => {
    if (!user) return undefined;
    const candidates = [
      user.image,
      user.foto,
      user.google_avatar,
      user.picture,
      // fallback a localStorage (evita la cadena "null")
      (() => {
        const f = localStorage.getItem('foto');
        return f && f !== 'null' && f !== 'undefined' ? f : null;
      })(),
    ];
    const valid = candidates.find(u => !!u && u !== 'null' && u !== 'undefined');
    return typeof valid === 'string' ? valid : undefined;
  })();
 
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName ?? 'Usuario')}&background=39B49E&color=fff`;
  const avatarSrc = displayImage ?? fallbackAvatar;

  
  const userData = user
    ? { full_name: displayName ?? 'Usuario', image: avatarSrc }
    : getUserData(userCase);

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
            type="button"
          >
            <Bars3Icon style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        <div className="topbar-right">
        <a
          className="topbar-aula-btn"
          title="Aula Virtual"
          aria-label="Abrir Aula Virtual"
          href={`${import.meta.env.VITE_FRONTEND_URL}/estudiante`}
          rel="noopener noreferrer"
        >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="12" rx="2" ry="2"></rect>
              <path d="M8 20h8"></path>
              <path d="M12 16v4"></path>
            </svg>
            <span className="topbar-aula-label">LMS UDH</span>
          </a>

          {/* Notificaciones */}
          <button 
            className={`topbar-notification ${notificacionesAbiertas ? 'active' : ''}`}
            onClick={toggleNotificaciones}
            title="Notificaciones"
            type="button"
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
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  if (img.src !== fallbackAvatar) img.src = fallbackAvatar;
                }}
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