import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logoUDH from '../../../../assets/UDH.webp';
import logoUDHLight from '../../../../assets/UDHlight.png';
import './TopbarAdmin.css';

interface TopbarAdminProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void; 
}

export default function TopbarAdmin(props: TopbarAdminProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(props.isDarkMode);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    if (!isDarkTheme) {
      document.documentElement.className = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.className = 'light';
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.className = savedTheme;
    }
  }, []);

  return (
    <header className="topbar-admin">
      {/* Sección izquierda - Solo logo */}
      <div className="topbar-left">
        <div className="topbar-logo">
          <img
            src={isDarkTheme ? logoUDH : logoUDHLight}
            alt="Universidad de Huánuco"
            className="logo-image"
          />
        </div>
      </div>

      {/* Sección central - vacía */}
      <div className="topbar-center">
      </div>

      {/* Sección derecha */}
      <div className="topbar-right">
        {/* Toggle tema personalizado */}
        <label className="theme-toggle">
          <input 
            type="checkbox" 
            className="theme-checkbox"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <div className="theme-slider"></div>
          
          {/* Iconos del sol y luna */}
          <FaSun className="sun-icon" />
          <FaMoon className="moon-icon" />
        </label>

        {/* Avatar del usuario administrador */}
        <div 
          className="user-avatar" 
          title="Administrador"
          style={{ cursor: 'pointer' }}
        >
          <div className="avatar-placeholder">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
