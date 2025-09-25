import { FaClock, FaMapMarkerAlt, FaUsers, FaVideo, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Clase {
  id: string;
  codigo: string;
  nombre: string;
  docente: string;
  horario: string;
  modalidad: string;
  aulas: string[];
  estudiantes: number;
  creditos: number;
  semestre: string;
  descripcion: string;
  color: string;
  linkMeet?: string;
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

  return (
    <div 
      className="clase-card" 
      style={{ borderLeftColor: curso.color }}
      onClick={() => navigate(`/estudiante/clases/${curso.id}`)}
    >
      <div className="clase-header">
        <div className="clase-info">
          <h4 className="clase-nombre">{curso.nombre}</h4>
          <p className="clase-codigo">{curso.codigo}</p>
        </div>
        {(curso.modalidad === "virtual" || curso.linkMeet) && (
          <a
            href={curso.linkMeet || "https://meet.google.com/lookup/example-link"} 
            target="_blank"
            rel="noopener noreferrer"
            className="estado-indicator"
            style={{ backgroundColor: '#10b981' }}
            title="Entrar a la clase virtual"
          >
            <FaVideo />
          </a>
        )}
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
          <span>{curso.modalidad === 'presencial' ? 'Presencial' : 'Virtual'}</span>
        </div>
        <div className="detalle-item">
          <FaUsers className="detalle-icon" />
          <span>{curso.estudiantes} estudiantes</span>
        </div>
      </div>

      {/* 🔹 Lista de salones */}
      {curso.aulas && curso.aulas.length > 0 && (
        <div className="clase-aulas">
          <strong>Salones:</strong>
          <ul>
            {curso.aulas.map((aula: string, i: number) => (
              <li key={i}>{aula}</li>
            ))}
          </ul>
        </div>
      )}

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
            e.stopPropagation();
            navigate(`/estudiante/clases/${curso.id}`);
          }}
        >
          Ver Clases
        </button>
      </div>
    </div>
  );
}
