import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

interface LayoutProps {
  userCase?: 'estudiante' | 'docente';
}

export default function Layout({ userCase = 'estudiante' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={toggleSidebar}
        userCase={userCase}
      />

      {/* Main content area */}
      <div className={`admin-main-content ${sidebarOpen ? '' : 'collapsed'}`}>
        <Topbar
          onToggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
          userCase={userCase}
        />
        <main className="admin-content">
          {/* 👇 Aquí se renderizan las rutas hijas */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
