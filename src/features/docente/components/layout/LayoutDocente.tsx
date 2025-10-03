import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarDocente from './SidebarDocente';
import TopbarDocente from './TopbarDocente';
import './LayoutDocente.css';

export const LayoutDocente = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Detectar cambios de tema
  useEffect(() => {
    const detectTheme = () => {
      const isDark = document.documentElement.classList.contains('dark') ||
                     document.documentElement.classList.contains('dark-theme');
      setIsDarkMode(isDark);
    };

    detectTheme();

    const observer = new MutationObserver(() => {
      detectTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`layout-docente ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* TopbarDocente */}
      <TopbarDocente 
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="layout-content">
        {/* SidebarDocente */}
        <SidebarDocente 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={handleSidebarToggle}
        />
        
        {/* Contenido principal */}
        <main 
          className={`main-content ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'} ${isDarkMode ? 'dark-theme' : ''}`}
        >
          <div className={`content-wrapper ${isDarkMode ? 'dark-theme' : ''}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default LayoutDocente;