import { Link, useLocation } from 'react-router-dom';
import { 
  FaTh,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaChartBar,
  FaCog,
  FaChevronRight,
} from 'react-icons/fa';
import './SidebarAdmin.css';

interface SidebarAdminProps {
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
    path: '/admin/dashboard'
  },
  {
    id: 'estudiantes',
    label: 'Estudiantes',
    icon: FaUsers,
    path: '/admin/estudiantes'
  },
  {
    id: 'docentes',
    label: 'Docentes',
    icon: FaChalkboardTeacher,
    path: '/admin/docentes'
  },
  {
    id: 'cursos',
    label: 'Cursos',
    icon: FaBook,
    path: '/admin/cursos'
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: FaChartBar,
    path: '/admin/reportes'
  },
  {
    id: 'configuracion',
    label: 'Configuración',
    icon: FaCog,
    path: '/admin/configuracion'
  },
];

export default function SidebarAdmin({ 
  isOpen, 
  onClose, 
  onToggle, 
  isDarkMode = false
}: SidebarAdminProps) {
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
      <aside className={`sidebar-admin ${isOpen ? 'expanded' : 'collapsed'} ${isDarkMode ? 'dark' : 'light'}`}>
        
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
                  <div className="nav-bg"></div>
                  {isActive(item.path) && <div className="active-indicator"></div>}
                  
                  <div className="nav-icon-container">
                    <item.icon className="nav-icon" />
                  </div>
                  
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
