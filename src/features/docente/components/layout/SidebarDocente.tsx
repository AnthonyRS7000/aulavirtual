import { Link, useLocation } from 'react-router-dom';
import { 
  FaTh,
  FaBookOpen,
  FaUsers,
  FaChevronRight,
  FaEnvelope,
} from 'react-icons/fa';
import './SidebarDocente.css';

interface SidebarDocenteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  isDarkMode?: boolean;
}

const menuItems = [
  {
    id: 'panel',
    label: 'Panel',
    icon: FaTh,
    path: '/docente/dashboard'
  },
  {
    id: 'cursos',
    label: 'Cursos',
    icon: FaBookOpen,
    path: '/docente/cursos'
  },
  {
    id: 'estudiantes',
    label: 'Estudiantes',
    icon: FaUsers,
    path: '/docente/estudiantes'
  },
  {
    id: 'mensajeria',
    label: 'Mensajería',
    icon: FaEnvelope,
    path: '/docente/mensajeria'
  },
  
];

export default function SidebarDocente({ 
  isOpen, 
  onClose, 
  onToggle, 
  isDarkMode = false
}: SidebarDocenteProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Backdrop para móvil */}
      <div 
        className={`sidebar-backdrop ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar principal */}
      <aside className={`sidebar-docente ${isOpen ? 'expanded' : 'collapsed'} ${isDarkMode ? 'dark' : 'light'}`}>
        
        {/* Botón toggle flotante */}
        <button 
          className="toggle-btn-float"
          onClick={onToggle}
        >
          <FaChevronRight className={`chevron ${isOpen ? 'rotated' : ''}`} />
        </button>

        {/* Contenido del sidebar */}
        <div className="sidebar-content">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                >
                  {/* Fondo hover/activo */}
                  <div className="nav-bg"></div>
                  
                  {/* Indicador lateral activo */}
                  {isActive(item.path) && <div className="active-indicator"></div>}
                  
                  {/* Icono */}
                  <div className="nav-icon-container">
                    <item.icon className="nav-icon" />
                  </div>
                  
                  {/* Etiqueta */}
                  <div className="nav-label-container">
                    <span className="nav-label">{item.label}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}