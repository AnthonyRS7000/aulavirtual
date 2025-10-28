import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from './SidebarAdmin';
import TopbarAdmin from './TopbarAdmin';
import './LayoutAdmin.css';

export const LayoutAdmin = () => {
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
    <div className={`layout-admin ${isDarkMode ? 'dark-theme' : ''}`}>
      {/* TopbarAdmin */}
      <TopbarAdmin 
        onSidebarToggle={handleSidebarToggle}
        sidebarOpen={sidebarOpen}
        isDarkMode={isDarkMode} 
        onToggleTheme={() => {
          setIsDarkMode(!isDarkMode);
          document.documentElement.classList.toggle('dark');
        }}
      />
      
      <div className="layout-content">
        {/* SidebarAdmin */}
        <SidebarAdmin 
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={handleSidebarToggle}
          isDarkMode={isDarkMode}
        />

        {/* Contenido principal */}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
