// src/components/PerfilDropdown.tsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';

import './PerfilDropdown.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PerfilDropdown({ isOpen, onClose }: Props) {
  const dropdownRef = useRef(null);
  const { theme } = useTheme();
  const { logout } = useAuth();
  const isDark = theme === 'dark';

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
    // Limpiar localStorage de 5174
    logout();
    localStorage.clear();
    sessionStorage.clear();
    
    // Redirigir directamente a 5173/login
    // El usuario debe limpiar manualmente 5173 o 5173 debe validar al cargar
    window.location.href = 'http://localhost:5173/login';
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className={`perfil-dropdown ${isDark ? 'dark' : ''}`}>
      <Link to="/estudiante/perfil" className="dropdown-item" onClick={onClose}>
        <HiOutlineUser
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Mi perfil
      </Link>
      <button onClick={cerrarSesion} className="dropdown-item">
        <HiOutlineLogout
          style={{ marginRight: '8px', width: '20px', height: '20px', color: isDark ? '#f8fafc' : '#0f172a' }}
        />
        Cerrar sesión
      </button>
    </div>
  );
}