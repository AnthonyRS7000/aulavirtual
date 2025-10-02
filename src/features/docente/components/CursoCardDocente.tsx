import { FaEdit, FaTrash, FaArrowRight, FaUsers, FaBook } from 'react-icons/fa';
import './CursoCardDocente.css';

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  ciclo: string;
  creditos: number;
  estudiantes: number;
  estado: 'activo' | 'inactivo' | 'archivado';
  fechaCreacion: string;
  ultimaActividad: string;
  codigoAcceso: string;
}

interface Props {
  curso: Curso;
  onEntrar: (id: number) => void;
  onEditar: (id: number) => void;
  onEliminar: (id: number) => void;
}

export const CursoCardDocente = ({ curso, onEntrar, onEditar, onEliminar }: Props) => {
  return (
    <div className="curso-card">
      {/* Header */}
      <div className="curso-header-card">
        <div className="curso-titulo">
          <h3>{curso.nombre}</h3>
          <span className="curso-codigo">{curso.codigo}</span>
        </div>
        <div className="curso-estado">
          <span className={`estado-badge ${curso.estado}`}>
            {curso.estado}
          </span>
        </div>
      </div>

      {/* Descripción */}
      <div className="curso-descripcion">
        <p>{curso.descripcion}</p>
      </div>

      {/* Estadísticas */}
      <div className="curso-stats-simple">
        <div className="stat-simple">
          <span className="stat-numero">{curso.estudiantes}</span>
          <span className="stat-label">estudiantes</span>
        </div>
        <div className="stat-simple">
          <span className="stat-numero">{curso.creditos}</span>
          <span className="stat-label">créditos</span>
        </div>
        <span className="stat-ciclo">{curso.ciclo}</span>
      </div>

      {/* Footer */}
      <div className="curso-footer">
        <div className="ultima-actividad">
          <small>{curso.ultimaActividad}</small>
        </div>
        <div className="curso-acciones">
          <button 
            className="btn-accion"
            onClick={(e) => {
              e.stopPropagation();
              onEditar(curso.id);
            }}
            title="Editar curso"
          >
            <FaEdit />
          </button>
          <button 
            className="btn-accion danger"
            onClick={(e) => {
              e.stopPropagation();
              onEliminar(curso.id);
            }}
            title="Eliminar curso"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* ✅ BOTÓN PRINCIPAL PARA ENTRAR - ESTE ES EL IMPORTANTE */}
      <button 
        className="btn-entrar-curso"
        onClick={() => onEntrar(curso.id)}
      >
        <FaArrowRight />
        Entrar al Curso
      </button>
    </div>
  );
};