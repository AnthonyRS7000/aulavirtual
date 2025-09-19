import { FaUsers, FaFileAlt, FaClock, FaStar } from 'react-icons/fa';

interface ProfesorData {
  nombre: string;
  apellidos: string;
  email: string;
  foto: string;
}

interface HorarioData {
  dia: string;
  hora: string;
  color: string;
}

interface CursoCardProps {
  titulo: string;
  bloque: string;
  codigo: string;
  periodo: string;
  profesor: ProfesorData;
  horarios: HorarioData[];
  estadisticas: {
    silabo: boolean;
    matriculados: number;
    notas: boolean;
    inasistencia: string;
  };
  color: string;
  favorito?: boolean;
}

export default function CursoCard({ 
  titulo, 
  bloque, 
  codigo, 
  periodo, 
  profesor, 
  horarios, 
  estadisticas, 
  color,
  favorito = false 
}: CursoCardProps) {
  return (
    <div className="curso-card">
      {/* Header del curso */}
      <div className="curso-header" style={{ backgroundColor: color }}>
        <div className="curso-info">
          <h3 className="curso-titulo">{titulo}</h3>
          <p className="curso-bloque">{bloque}</p>
        </div>
        <div className="curso-meta">
          <span className="curso-codigo">({codigo}) {periodo}</span>
          {favorito && (
            <FaStar className="estrella-favorito" />
          )}
        </div>
      </div>

      {/* Información del profesor */}
      <div className="profesor-info">
        <div className="profesor-avatar">
          <img src={profesor.foto} alt={`${profesor.nombre} ${profesor.apellidos}`} />
        </div>
        <div className="profesor-datos">
          <h4 className="profesor-nombre">
            {profesor.apellidos}, {profesor.nombre}
          </h4>
          <p className="profesor-email">📧 {profesor.email}</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="curso-contenido">
        {/* Estadísticas */}
        <div className="curso-estadisticas">
          <div className="estadistica">
            <FaFileAlt className="stat-icon" />
            <span>Sílabo</span>
          </div>
          <div className="estadistica">
            <FaUsers className="stat-icon" />
            <span>Matriculados</span>
          </div>
          <div className="estadistica">
            <FaFileAlt className="stat-icon" />
            <span>Notas</span>
          </div>
          <div className="estadistica">
            <FaClock className="stat-icon" />
            <span>Inasistencia</span>
            <span className="inasistencia-badge">{estadisticas.inasistencia}</span>
          </div>
        </div>

        {/* Horarios */}
        <div className="curso-horarios">
          {horarios.map((horario, index) => (
            <div 
              key={index} 
              className="horario-item" 
              style={{ backgroundColor: horario.color }}
            >
              <span className="horario-dia">{horario.dia}</span>
              <span className="horario-hora">{horario.hora}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}