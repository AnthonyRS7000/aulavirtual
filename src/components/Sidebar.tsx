import { useState, useEffect } from 'react';
import FlechaIcon from '../assets/flecha.svg';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Iconos de navegación - usar los que tengas disponibles
import { FaHome, FaClipboardList, FaChalkboardTeacher, FaTasks, FaUser, FaBullhorn, FaCalendarAlt } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

// Mock user data - EXACTO COMO UDH
const mockUser = {
  full_name: 'ARMANDO ROJAS LUNA',
  role: 'Estudiante',
  image: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff',
};

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

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

  // Secciones de navegación - Componentes del estudiante sin desglosar
  const sections = [
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
    { name: 'notas', 
      label: 'Notas', 
      icon: FaClipboardList, 
      path: '/estudiante/notas' },
    { name: 'recursos', 
      label: 'Recursos', 
      icon: FaTasks, 
      path: '/estudiante/recursos' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Determinar la clase del sidebar según el tamaño de pantalla y tema
  const sidebarClass = `${isDesktop ? 'admin-sidebar-desktop' : 'admin-sidebar'} ${currentTheme === 'dark' ? 'theme-dark' : 'theme-light'}`;

  return (
    <>
      {/* Backdrop para móviles */}
      {!isDesktop && (
        <div
          className={`admin-sidebar-backdrop ${isOpen ? '' : 'hidden'}`}
          onClick={onClose}
        />
      )}

      {/* Botón de colapsar */}
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


      {/* Sidebar */}
      <div className={`${sidebarClass} ${isOpen ? '' : 'collapsed'}`}>
        {/* Información del usuario - DISEÑO COPILOTO */}
        <div className="user-info-copiloto">
          <div className="user-avatar-copiloto">
            <img
              src={mockUser.image}
              alt={mockUser.full_name}
              className="user-avatar-image"
            />
          </div>
          <div className="user-info-text">
            <div className="user-name-copiloto">
              {mockUser.full_name}
            </div>
            <div className="user-role-copiloto">
              {mockUser.role}
            </div>
          </div>
        </div>

        {/* Navegación - DISEÑO COPILOTO */}
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
