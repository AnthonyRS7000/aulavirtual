// src/components/PerfilDropdown.tsx
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './PerfilDropdown.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PerfilDropdown({ isOpen, onClose }: Props) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Cerrar al hacer clic fuera
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
  }, [isOpen]);

  const cerrarSesion = () => {
    // Aquí tu lógica de logout
    console.log('Cerrando sesión...');
    navigate('/login');
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="perfil-dropdown">
      <Link to="/estudiante/perfil" className="dropdown-item" onClick={onClose}>👤 Mi perfil</Link>
      <button onClick={cerrarSesion} className="dropdown-item">🚪 Cerrar sesión</button>
    </div>
  );
}
