import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

// ✅ Definimos la interfaz directamente
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onClose, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${theme}`}>
      <nav>
        <ul className="menu-list">
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">Inicio</Link>
          </li>
          {/* <li className={location.pathname === '/perfil' ? 'active' : ''}>
            <Link to="/perfil">Mi perfil</Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
