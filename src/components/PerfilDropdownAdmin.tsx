// src/components/PerfilDropdownAdmin.tsx
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

import './PerfilDropdownAdmin.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
  
export default function PerfilDropdownAdmin({ isOpen, onClose }: Props) {
  const dropdownRef = useRef(null);
  const { theme } = useTheme();
  const { logout } = useAuth();
  // Hacemos la detección más robusta: si el hook indica dark O el <html> tiene la clase 'dark'
  // además observamos cambios en el atributo `class` para reaccionar cuando otro componente
  // (ej. Topbar) modifica directamente document.documentElement.className
  const [isDarkState, setIsDarkState] = useState<boolean>(
    theme === 'dark' || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
  );

  useEffect(() => {
    // Mantener sincronizado con el valor del hook
    if (theme === 'dark') setIsDarkState(true);
    if (theme === 'light') setIsDarkState(false);
  }, [theme]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const hasDark = root.classList.contains('dark');
      setIsDarkState(hasDark);
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const isDark = isDarkState;

  const frontendBase = import.meta.env.VITE_FRONTEND_URL;
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const cerrarSesion = () => {
    // Limpiar localStorage
    logout();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = `${frontendBase}/login`;
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={`perfil-dropdown-admin ${isDark ? 'dark' : ''}`}>
      <Link to="/admin/perfil" className="dropdown-item-admin" onClick={onClose}>
        <HiOutlineUser
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Mi perfil
      </Link>
      <button onClick={cerrarSesion} className="dropdown-item-admin">
        <HiOutlineLogout
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Cerrar sesión
      </button>
    </div>
  );
}
