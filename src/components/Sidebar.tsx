import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // ajustar ruta si hace falta
import FlechaIcon from '../assets/flecha.svg';
import './Sidebar.css';

import {
  IconUniversidad,
  IconAcademico,
  IconServicio,
  IconProyecto,
  IconInforme,
  IconEjecucion,
  IconTitulacion,
  IconMensajeria,
} from './icons/LmsIcons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}


// Secciones para estudiantes
const getEstudianteSections = () => {
  return [
    {
      name: 'inicio',
      label: 'Inicio',
      icon: IconUniversidad,
      path: '/estudiante/inicio',
    },
    {
      name: 'clases',
      label: 'Clases',
      icon: IconAcademico,
      path: '/estudiante/clases',
    },
    {
      name: 'tareas',
      label: 'Tareas',
      icon: IconProyecto,
      path: '/estudiante/tareas',
    },
    {
      name: 'anuncios',
      label: 'Anuncios',
      icon: IconInforme,
      path: '/estudiante/anuncios',
    },
    {
      name: 'horario',
      label: 'Horario',
      icon: IconEjecucion,
      path: '/estudiante/horario',
    },
    {
      name: 'notas',
      label: 'Notas',
      icon: IconTitulacion,
      path: '/estudiante/notas'
    },
    {
      name: 'mensajeria',
      label: 'Mensajería',
      icon: IconMensajeria,
      path: '/estudiante/mensajeria'
    },
    {
      name: 'biblioteca',
      label: 'Biblioteca',
      icon: IconServicio,
      path: '/estudiante/biblioteca'
    },
  ];
};

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [unreadAnuncios, setUnreadAnuncios] = useState<number>(0);

  const { user, isAuthenticated } = useAuth();

  // Normalizar nombre y foto desde distintos posibles shapes del "user"
  const userFullName = (() => {
    if (!user) return undefined;
    if (user.full_name) return user.full_name;
    const nombres = user.nombres ?? user.first_name ?? '';
    const apellidos = user.apellidos ?? user.last_name ?? '';
    const combined = `${(nombres || '').trim()} ${(apellidos || '').trim()}`.trim();
    if (combined) return combined;
    if (user.name) return user.name;
    if (user.email) return String(user.email).split('@')[0];
    return undefined;
  })();

  const userImageUrl = (() => {
    if (!user) return null;
    const candidates = [
      user.image,
      user.foto,
      user.google_avatar,
      user.picture,
      (() => {
        const f = localStorage.getItem('foto');
        return f && f !== 'null' && f !== 'undefined' ? f : null;
      })(),
    ];
    const valid = candidates.find(u => !!u && u !== 'null' && u !== 'undefined');
    return valid ?? null;
  })();

;

  const userData = {
    full_name: userFullName ?? 'Usuario',
    role: user?.role ?? user?.rol ?? 'Estudiante',
    image: userImageUrl ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(userFullName ?? 'Estudiante')}&background=39B49E&color=fff`,
  };

  const sections = getEstudianteSections();
  
  // Preparar nombre mostrado: solo el primer nombre y los apellidos (últimos 1-2 tokens)
  const fullName = typeof userData.full_name === 'string' ? userData.full_name.trim() : '';
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const nombreVisible = nameParts.length > 0 ? nameParts[0] : fullName || 'Estudiante';
  let apellidosVisible = '';
  if (nameParts.length >= 2) {
    // tomar los últimos 1 o 2 tokens como apellidos
    const last = nameParts.slice(-2);
    apellidosVisible = last.join(' ');
  }

  // Leer contador de anuncios no leídos desde localStorage y reaccionar a cambios
  useEffect(() => {
    const readCount = () => {
      const v = parseInt(localStorage.getItem('anuncios_no_leidos') || '0', 10);
      setUnreadAnuncios(isNaN(v) ? 0 : v);
    };

    readCount();
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'anuncios_no_leidos') readCount();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

 
  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const sidebarClass = `${isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar'} estudiante-mode`;

  return (
    <>
      {!isDesktop && (
        <div
          className={`admin-sidebar-backdrop ${isOpen ? '' : 'hidden'}`}
          onClick={onClose}
        />
      )}

      <button
        onClick={() => {
          if (isDesktop) onToggle();
          else onClose();
        }}
        className="sidebar-collapse-button"
        title="Colapsar sidebar"
        style={{
          left: isOpen ? '220px' : '60px',
          transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
        }}
      >
        <img
          src={FlechaIcon}
          alt="Flecha"
          className="flecha-icon"
        />
      </button>

      <div id="app-sidebar" className={`${sidebarClass} ${isOpen ? '' : 'collapsed'}`}>
          <div className="user-info-copiloto">
          {/* Avatar del usuario */}
          <div className="user-avatar-copiloto">
            <img
              src={userData.image}
              alt={userData.full_name}
              className="user-avatar-image"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.full_name || 'Estudiante')}&background=39B49E&color=fff`;
                if (img.src !== fallback) img.src = fallback;
              }}
              style={{ width: 48, height: 48, objectFit: 'cover' }}
            />
          </div>

          {/* Información del usuario */}
          <div className="user-info-text">
            <div className="user-name-copiloto">
              {userData.full_name}
            </div>
            <div className="user-role-copiloto">
              {userData.role}
            </div>
            {/* Indicador de estado de sesión */}
            <div 
              className="session-status"
              style={{
                fontSize: '11px',
                color: isAuthenticated ? '#10b981' : '#ef4444',
                marginTop: '4px',
              }}
            >
              {isAuthenticated ? '● En línea' : '● Sin sesión'}
            </div>
          </div>
        </div>

        {/* Navegación del estudiante */}
        <div className="nav-container-copiloto">
          {sections.map((section) => (
            <div key={section.name} className="nav-section-copiloto">
              <Link
                to={section.path}
                className={`nav-section-header-copiloto ${isActive(section.path) ? 'active' : ''}`}
                onClick={() => !isDesktop && onClose()}
              >
                <div className="nav-section-content-copiloto">
                  <section.icon className="nav-section-icon-copiloto" />
                  <span className="nav-section-label-copiloto">{section.label}</span>
                  {section.name === 'anuncios' && unreadAnuncios > 0 && (
                    <span className="nav-unread-badge" aria-hidden>{unreadAnuncios}</span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
