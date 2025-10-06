import React from 'react';
import { FaUsers, FaFileAlt, FaClock, FaVideo, FaEllipsisV } from 'react-icons/fa';
import './CursoCardDocente.css';

interface CursoCardDocenteProps {
  id: number;
  codigo: string;
  nombre: string;
  ciclo: string;
  creditos: number;
  estudiantes: number;
  estado: 'activo' | 'inactivo' | 'archivado';
  fechaCreacion: string;
  ultimaActividad: string;
  color?: string;
  onEntrarCurso: (id: number) => void;
  onEditarCurso?: (id: number) => void;
  onEliminarCurso?: (id: number) => void;
}

export default function CursoCardDocente({
  id,
  codigo,
  nombre,
  ciclo,
  creditos,
  estudiantes,
  estado,
  fechaCreacion,
  ultimaActividad,
  color = '#2EBAA0',
  onEntrarCurso,
  onEditarCurso,
  onEliminarCurso
}: CursoCardDocenteProps) {
  
  const iniciales = nombre.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
  
  // Función para manejar el click del botón entrar
  const handleEntrarCurso = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Entrando al curso:', id); // Para debug
    onEntrarCurso(id);
  };

  // Función para el menú de opciones
  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Menu clicked for course:', id);
    // Aquí puedes agregar lógica para mostrar un dropdown
  };

  // Función para Meet
  const handleMeetClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Meet clicked for course:', id);
    // Aquí puedes agregar lógica para iniciar Meet
  };
  
  return (
    <div className="curso-card-docente">
      {/* Header/Banner */}
      <div className="curso-header-docente" style={{ background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)` }}>
        <div className="curso-info-docente">
          <h3 className="curso-titulo-docente">{nombre}</h3>
          <p className="curso-codigo-docente">{codigo}</p>
        </div>
        
        {/* Menú de opciones */}
        <div className="curso-menu-docente">
          <button 
            className="menu-btn-docente"
            onClick={handleMenuClick}
            type="button"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>

      {/* Avatar flotante */}
      <div className="curso-avatar-docente">
        <div className="avatar-circle-docente">
          {iniciales}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="curso-contenido-docente">
        <div className="curso-middle-docente">
          <div className="curso-descripcion-docente">
          </div>
          
          <div className="curso-stats-docente">
            <div className="stat-item-docente">
              <FaUsers className="stat-icon-docente" />
              <span className="stat-numero-docente">{estudiantes}</span>
              <span className="stat-label-docente">estudiantes</span>
            </div>
            <div className="stat-item-docente">
              <FaFileAlt className="stat-icon-docente" />
              <span className="stat-numero-docente">{creditos}</span>
              <span className="stat-label-docente">créditos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="card-divider"></div>

      {/* Footer con acciones */}
      <div className="curso-footer-docente">
        <div className="footer-left">
          <div className="curso-meta-docente">
            <span className={`estado-badge-docente estado-${estado}`}>
              {estado}
            </span>
            <span className="ciclo-docente">{ciclo}</span>
          </div>
        </div>
        
        <div className="footer-right">
          <button 
            className="btn-meet-docente"
            onClick={handleMeetClick}
            type="button"
            title="Iniciar Meet"
          >
            <FaVideo />
          </button>
          <button 
            className="btn-entrar-docente"
            onClick={handleEntrarCurso}
            type="button"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}