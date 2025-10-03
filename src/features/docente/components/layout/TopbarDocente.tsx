import { FaCalendarAlt, FaBook, FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import './TopbarDocente.css';

interface TopbarDocenteProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
}

export default function TopbarDocente(props: TopbarDocenteProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    
    // Cambiar el tema en el documento
    if (!isDarkTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  };

  // Cargar tema desde localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  return (
    <header className="topbar-docente">
      {/* Sección izquierda - Solo logo */}
      <div className="topbar-left">
        {/* Logo UDH */}
        <div className="topbar-logo">
          <div className="logo-shield">UDH</div>
          <span className="logo-text">Aula Virtual</span>
        </div>
      </div>

      {/* Sección central - vacía */}
      <div className="topbar-center"></div>

      {/* Sección derecha */}
      <div className="topbar-right">
        {/* Botón Calendario */}
        <button className="nav-btn calendario-btn">
          <span className="nav-badge">¡Ver!</span>
          <FaCalendarAlt className="btn-icon" />
          <span className="btn-text">Calendario</span>
        </button>
        
        {/* Botón Guía */}
        <button className="nav-btn guia-btn">
          <span className="nav-badge">¡Ver!</span>
          <FaBook className="btn-icon" />
          <span className="btn-text">Guía</span>
        </button>

        {/* Toggle tema (sol/luna) */}
        <button 
          className="control-btn theme-toggle" 
          onClick={toggleTheme}
          title={isDarkTheme ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
        >
          {isDarkTheme ? <FaSun /> : <FaMoon />}
        </button>

        {/* Avatar del usuario */}
        <div className="user-avatar" title="Aldo Ramirez - Docente">
          <img 
            src="https://ui-avatars.com/api/?name=Aldo+Ramirez&background=2EBAA0&color=fff&size=40" 
            alt="Aldo Ramirez" 
            className="avatar-img"
          />
        </div>
      </div>
    </header>
  );
}