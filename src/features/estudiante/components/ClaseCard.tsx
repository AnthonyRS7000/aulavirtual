import { FaClock, FaMapMarkerAlt, FaUsers, FaVideo, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Clase {
  id: number;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  aula: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
  estudiantes: number;
  color: string;
  estado: 'activa' | 'finalizada' | 'cancelada';
  descripcion: string;
  proximaClase?: string;
}

interface ClaseCardProps {
  curso: Clase;
}

export default function ClaseCard({ curso }: ClaseCardProps) {
  const navigate = useNavigate();
  
  const obtenerIconoModalidad = (modalidad: string) => {
    switch (modalidad) {
      case 'virtual': return <FaVideo className="modalidad-icon" />;
      case 'presencial': return <FaMapMarkerAlt className="modalidad-icon" />;
      case 'hibrida': return <FaBook className="modalidad-icon" />;
      default: return <FaBook className="modalidad-icon" />;
    }
  };

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'activa': return '#10b981';
      case 'finalizada': return '#6b7280';
      case 'cancelada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div 
      className="clase-card" 
      style={{ borderLeftColor: curso.color }}
      onClick={() => navigate(`/estudiante/clases/${curso.id}`)} // 👉 al hacer click en toda la tarjeta
    >
      <div className="clase-header">
        <div className="clase-info">
          <h4 className="clase-nombre">{curso.nombre}</h4>
          <p className="clase-codigo">{curso.codigo}</p>
        </div>
        <div className="clase-estado">
          <span 
            className="estado-indicator"
            style={{ backgroundColor: obtenerColorEstado(curso.estado) }}
          >
            {curso.estado}
          </span>
        </div>
      </div>

      <div className="clase-docente">
        <strong>Prof. {curso.docente}</strong>
      </div>

      <div className="clase-descripcion">
        <p>{curso.descripcion}</p>
      </div>

      <div className="clase-detalles">
        <div className="detalle-item">
          <FaClock className="detalle-icon" />
          <span>{curso.horario}</span>
        </div>
        
        <div className="detalle-item">
          {obtenerIconoModalidad(curso.modalidad)}
          <span>
            {curso.modalidad === 'presencial' ? curso.aula : 
             curso.modalidad === 'virtual' ? 'Aula Virtual' : 
             `${curso.aula} / Virtual`}
          </span>
        </div>
        
        <div className="detalle-item">
          <FaUsers className="detalle-icon" />
          <span>{curso.estudiantes} estudiantes</span>
        </div>
      </div>

      {curso.proximaClase && (
        <div className="proxima-clase">
          <span className="proxima-label">Próxima clase:</span>
          <span className="proxima-fecha">{curso.proximaClase}</span>
        </div>
      )}

      <div className="clase-acciones">
        <button 
          className="btn-ver-clase"
          onClick={(e) => {
            e.stopPropagation(); // evita que dispare el click de la tarjeta
            navigate(`/estudiante/clases/${curso.id}`);
          }}
        >
          Ver Clases
        </button>
        <button className="btn-recursos">Recursos</button>
        <button className="btn-asistencia">Asistencia</button>
      </div>
    </div>
  );
}
