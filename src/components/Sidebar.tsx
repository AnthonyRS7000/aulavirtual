import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { FaHome, FaUser, FaBook, FaGraduationCap, FaCog, FaClipboardList, FaClock, FaChalkboardTeacher, FaRobot, FaTv } from 'react-icons/fa';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${theme}`}>
      <div className="sidebar-logo">
        <div className="logo-container">
          <img src="/logo-udh-png.png" alt="UDH Logo" className="logo-image" />
        </div>
      </div>
      <hr className="sidebar-separator" />
      <nav>
        <ul className="menu-list">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/" title="Inicio">
              <FaHome className="sidebar-icon" />
              <span className="sidebar-text">Inicio</span>
            </Link>
          </li>
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard" title="Panel">
              <FaClipboardList className="sidebar-icon" />
              <span className="sidebar-text">Panel</span>
            </Link>
          </li>
          <li className={location.pathname === '/clases' ? 'active' : ''}>
            <Link to="/clases" title="Clases">
              <FaChalkboardTeacher className="sidebar-icon" />
              <span className="sidebar-text">Clases</span>
            </Link>
          </li>
          <li className={location.pathname === '/horario' ? 'active' : ''}>
            <Link to="/horario" title="Horario">
              <FaClock className="sidebar-icon" />
              <span className="sidebar-text">Horario</span>
            </Link>
          </li>
          <li className={location.pathname === '/recursos' ? 'active' : ''}>
            <Link to="/recursos" title="Recursos">
              <FaBook className="sidebar-icon" />
              <span className="sidebar-text">Recursos</span>
            </Link>
          </li>
          <li className={location.pathname === '/notas' ? 'active' : ''}>
            <Link to="/notas" title="Notas">
              <FaGraduationCap className="sidebar-icon" />
              <span className="sidebar-text">Notas</span>
            </Link>
          </li>
          <li className={location.pathname === '/perfil' ? 'active' : ''}>
            <Link to="/perfil" title="Perfil">
              <FaUser className="sidebar-icon" />
              <span className="sidebar-text">Perfil</span>
            </Link>
          </li>
          <li className={location.pathname === '/configuracion' ? 'active' : ''}>
            <Link to="/configuracion" title="Configuración">
              <FaCog className="sidebar-icon" />
              <span className="sidebar-text">Configuración</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-bottom">
        <Link to="/ai" title="Asistente IA">
          <FaRobot className="sidebar-icon ai-icon" />
        </Link>
        <Link to="/tv" title="Aula Virtual TV">
          <FaTv className="sidebar-icon tv-icon" />
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
