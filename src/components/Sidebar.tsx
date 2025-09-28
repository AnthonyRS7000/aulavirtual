import { useState, useEffect } from 'react';
import FlechaIcon from '../assets/flecha.svg';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Iconos de navegación
import { 
  FaHome, 
  FaClipboardList, 
  FaChalkboardTeacher, 
  FaTasks, 
  FaBullhorn, 
  FaCalendarAlt,
  FaBook,
  FaUsers
} from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  userCase?: 'estudiante' | 'docente';
}

// Mock user data - EXACTO COMO UDH
const getUserData = (userCase: 'estudiante' | 'docente') => {
  if (userCase === 'docente') {
    return {
      full_name: 'DR. CARLOS MENDOZA SILVA',
      role: 'Docente',
      department: 'Ing. de Sistemas',
      image: 'https://ui-avatars.com/api/?name=Carlos+Mendoza&background=4A9B8E&color=fff',
    };
  }
  
  return {
    full_name: 'ARMANDO ROJAS LUNA',
    role: 'Estudiante',
    image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
  };
};

// Obtener secciones según el case
const getSections = (userCase: 'estudiante' | 'docente') => {
  if (userCase === 'docente') {
    return [
      {
        name: 'dashboard',
        label: 'Dashboard',
        icon: FaHome,
        path: '/docente/dashboard',
      },
      {
        name: 'cursos',
        label: 'Mis Cursos',
        icon: FaBook,
        path: '/docente/cursos',
      },
      {
        name: 'estudiantes',
        label: 'Estudiantes',
        icon: FaUsers,
        path: '/docente/estudiantes',
      }
    ];
  }

  return [
    {
      name: 'inicio',
      label: 'Inicio',
      icon: FaHome,
      path: '/estudiante/inicio',
    },
    {
      name: 'clases',
      label: 'Clases',
      icon: FaChalkboardTeacher,
      path: '/estudiante/clases',
    },
    {
      name: 'tareas',
      label: 'Tareas',
      icon: FaTasks,
      path: '/estudiante/tareas',
    },
    {
      name: 'anuncios',
      label: 'Anuncios',
      icon: FaBullhorn,
      path: '/estudiante/anuncios',
    },
    {
      name: 'horario',
      label: 'Horario',
      icon: FaCalendarAlt,
      path: '/estudiante/horario',
    },
    {
      name: 'notas',
      label: 'Notas',
      icon: FaClipboardList,
      path: '/estudiante/notas'
    },
    {
      name: 'recursos',
      label: 'Recursos',
      icon: FaTasks,
      path: '/estudiante/recursos'
    }
  ];
};

export default function Sidebar({ isOpen, onClose, onToggle, userCase = 'estudiante' }: SidebarProps) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const userData = getUserData(userCase);
  const sections = getSections(userCase);

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

  const sidebarClass = `${isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar'} ${currentTheme === 'dark' ? 'theme-dark' : 'theme-light'} ${userCase === 'docente' ? 'docente-mode' : 'estudiante-mode'}`;

  return (
    <>
      {!isDesktop && (
        <div
          className={`admin-sidebar-backdrop ${isOpen ? '' : 'hidden'}`}
          onClick={onClose}
        />
      )}

      <button
        onClick={onToggle}
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

      <div className={`${sidebarClass} ${isOpen ? '' : 'collapsed'}`}>
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
            {userCase === 'docente' && 'department' in userData && (
              <div className="user-department-copiloto">
                {userData.department}
              </div>
            )}
          </div>
        </div>

        <div className="nav-container-copiloto">
          {userCase === 'docente' && (
            <div className="nav-group-title">Gestión Docente</div>
          )}
          
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