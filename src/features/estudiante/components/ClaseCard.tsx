import { FaClock, FaMapMarkerAlt, FaUsers, FaVideo, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Clase {
  codigo_curso: string;
  nombre_curso: string;
  seccion: string;
  ciclo: number;
  creditos: number;
  docente: string;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
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

const linkMeet = 'https://meet.google.com/lookup/example-link';

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
      </div>
    </div>
  );
}
