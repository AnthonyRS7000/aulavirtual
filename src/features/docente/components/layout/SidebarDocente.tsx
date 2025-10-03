import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FlechaIcon from '../../../../assets/flecha.svg';
import './SidebarDocente.css';

// Iconos exactos del diseño
import { 
  FaTh,
  FaFileAlt,
  FaUserFriends,
  FaClipboardCheck,
  FaChartLine,
  FaCalculator,
  FaGraduationCap
} from 'react-icons/fa';

interface SidebarDocenteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

// Datos del docente
const getDocenteData = () => {
  return {
    full_name: 'ALDO ENRIQUE RAMIREZ CHAUPIS',
    role: 'Docente',
    department: 'Ing. de Sistemas',
    image: 'https://ui-avatars.com/api/?name=Aldo+Ramirez&background=2EBAA0&color=fff&size=80',
  };
};

// Secciones del menú con diseño limpio y uniforme
const getDocenteSections = () => {
  return [
    {
      name: 'panel',
      label: 'Panel',
      icon: FaTh,
      path: '/docente/dashboard',
    },
    {
      name: 'cursos',
      label: 'Cursos',
      icon: FaFileAlt,
      path: '/docente/cursos',
    },
    {
      name: 'estudiantes',
      label: 'Estudiantes',
      icon: FaUserFriends,
      path: '/docente/estudiantes',
    },
    
 
  ];
};

export default function SidebarDocente({ isOpen, onClose, onToggle }: SidebarDocenteProps) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const userData = getDocenteData();
  const sections = getDocenteSections();

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

  // Clases CSS limpias
  const sidebarClass = `sidebar-docente ${isOpen ? 'sidebar-open' : 'sidebar-collapsed'} ${currentTheme}`;

  return (
    <>
      {/* Backdrop para móvil */}
      {!isDesktop && isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
        />
      )}

      {/* Botón de colapso */}
      {isDesktop && (
        <button
          onClick={onToggle}
          className="sidebar-toggle-btn"
          style={{
            left: isOpen ? '304px' : '64px',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <img src={FlechaIcon} alt="Toggle" className="toggle-icon" />
        </button>
      )}

      {/* Sidebar principal */}
      <aside className={sidebarClass}>
        
        {/* Header del docente */}
        <div className="sidebar-header">
          <div className="user-avatar">
            <img
              src={userData.image}
              alt={userData.full_name}
              className="avatar-img"
            />
          </div>
          <div className="user-info">
            <h3 className="user-name">{userData.full_name}</h3>
            <p className="user-role">{userData.role}</p>
            <p className="user-department">{userData.department}</p>
          </div>
        </div>

        {/* Navegación */}
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <Link
              key={section.name}
              to={section.path}
              className={`nav-item ${isActive(section.path) ? 'active' : ''}`}
              onClick={() => !isDesktop && onClose()}
              title={section.label}
            >
              <section.icon className="nav-icon" />
              <span className="nav-label">{section.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}