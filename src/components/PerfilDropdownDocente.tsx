// src/components/PerfilDropdownDocente.tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

import './PerfilDropdownDocente.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
  
export default function PerfilDropdownDocente({ isOpen, onClose }: Props) {
  const dropdownRef = useRef(null);
  const { theme } = useTheme();
  const { logout } = useAuth();
  const isDark = theme === 'dark';

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
    <div ref={dropdownRef} className={`perfil-dropdown-docente ${isDark ? 'dark' : ''}`}>
      <Link to="/docente/perfil" className="dropdown-item-docente" onClick={onClose}>
        <HiOutlineUser
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Mi perfil
      </Link>
      <button onClick={cerrarSesion} className="dropdown-item-docente">
        <HiOutlineLogout
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Cerrar sesión
      </button>
    </div>
  );
}
