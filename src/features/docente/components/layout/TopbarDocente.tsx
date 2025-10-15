import { FaCalendarAlt, FaBook, FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logoUDH from '../../../../assets/UDH.webp';
import './TopbarDocente.css';

interface TopbarDocenteProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void; 
}

export default function TopbarDocente(props: TopbarDocenteProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(props.isDarkMode);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);

    if (!isDarkTheme) {
      document.documentElement.className = 'dark';  // Cambiar a clase
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.className = 'light'; // Cambiar a clase
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.className = savedTheme; // Cambiar a clase
    }
  }, []);

  return (
    <header className="topbar-docente">
      {/* Sección izquierda - Solo logo */}
      <div className="topbar-left">
        {/* Logo UDH */}
        <div className="topbar-logo">
          <img
            src={logoUDH}
            alt="Universidad de Huánuco"
            className="logo-image"
          />
          
        </div>
      </div>

      {/* Sección central - vacía */}
      <div className="topbar-center"></div>

      {/* Sección derecha */}
      <div className="topbar-right">
        {/* Botón Calendario */}
        <div className="relative group">
          <button className="nav-btn calendario-btn">
            <span className="btn-text">Calendario</span>
            <span className="nav-badge">¡Ver!</span>
          </button>
        </div>

        {/* Botón Guía */}
        <div className="relative group">
          <button className="nav-btn guia-btn">
            <span className="btn-text">Guía</span>
            <span className="nav-badge">¡Ver!</span>
          </button>
          
        </div>

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

        {/* Avatar del usuario */}
        <div className="user-avatar" title="Aldo Ramirez - Docente">
          <img
            src="/unnamed.png"
            alt="Avatar de usuario"
            className="avatar-img"
          />
        </div>
      </div>
    </header>
  );
}