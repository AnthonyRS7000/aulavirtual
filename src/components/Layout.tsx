import { useState, type ReactNode } from "react";
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  userCase?: 'estudiante' | 'docente';
}

export default function Layout({ children, userCase = 'estudiante' }: LayoutProps) {
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
        <Topbar onToggleSidebar={toggleSidebar}
          isSidebarOpen={sidebarOpen}
          userCase={userCase} />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
