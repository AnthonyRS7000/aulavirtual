import { useState, type ReactNode } from "react";
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen(prev => !prev);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} onClose={onClose} onToggle={onToggle} />
      <div className="main-content">
        <Topbar onToggleSidebar={onToggle} isSidebarOpen={isOpen} />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
