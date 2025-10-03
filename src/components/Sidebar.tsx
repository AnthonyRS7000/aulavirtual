import { useState, useEffect } from 'react';
import FlechaIcon from '../assets/flecha.svg';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Iconos de navegación (heroicons wrappers)
import {
  IconUniversidad,
  IconAcademico,
  IconServicio,
  IconProyecto,
  IconInforme,
  IconEjecucion,
  IconTitulacion,
} from './icons/LmsIcons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

// Datos únicamente del estudiante
const getEstudianteData = () => {
  return {
    full_name: 'ARMANDO ROJAS LUNA',
    role: 'Estudiante',
    image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
  };
};

// Secciones únicamente para estudiantes
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
      name: 'recursos',
      label: 'Recursos',
      icon: IconServicio,
      path: '/estudiante/recursos'
    }
  ];
};

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const userData = getEstudianteData();
  const sections = getEstudianteSections();

  // Detectar cambios de tema
  useEffect(() => {
    const detectTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    detectTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Clases CSS únicamente para estudiantes
  const sidebarClass = `${isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar'} ${currentTheme === 'dark' ? 'theme-dark' : 'theme-light'} estudiante-mode`;

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
          // En pantallas desktop colapsamos a icons, en mobile cerramos (overlay)
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
        {/* Información del estudiante */}
        <div className="user-info-copiloto">
          <div className="user-avatar-copiloto">
            <img
              src={userData.image}
              alt={userData.full_name}
              className="user-avatar-image"
            />
          </div>
          <div className="user-info-text">
            <div className="user-name-copiloto">
              {userData.full_name}
            </div>
            <div className="user-role-copiloto">
              {userData.role}
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
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}