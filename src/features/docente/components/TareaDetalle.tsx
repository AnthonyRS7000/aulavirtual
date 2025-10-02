import { FaArrowLeft, FaCalendarAlt, FaClock, FaUsers, FaFileAlt, FaCheck } from 'react-icons/fa';
import './TareaDetalle.css';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  puntuacion: number;
  entregas: number;
  totalEstudiantes: number;
  estado: 'publicada' | 'borrador' | 'cerrada';
  cursoId: number;
}

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
}

interface Props {
  tarea: Tarea;
  curso: Curso;
  onVolver: () => void;
}

export const TareaDetalle = ({ tarea, curso, onVolver }: Props) => {
  const porcentajeEntregas = Math.round((tarea.entregas / tarea.totalEstudiantes) * 100);
  
  return (
    <div className="tarea-detalle-container">
      {/* Header */}
      <div className="tarea-header">
        <div className="tarea-header-content">
          <button 
            className="btn-volver-tarea"
            onClick={onVolver}
          >
            <FaArrowLeft />
          </button>
          
          <div className="tarea-info">
            <div className="curso-breadcrumb">
              <span>{curso.codigo} - {curso.nombre}</span>
            </div>
            <h1 className="tarea-titulo">{tarea.titulo}</h1>
            <div className="tarea-meta">
              <span className={`estado-badge ${tarea.estado}`}>
                {tarea.estado}
              </span>
              <span className="puntuacion">
                <FaFileAlt /> {tarea.puntuacion} puntos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="tarea-content">
        <div className="tarea-main">
          
          {/* Descripción */}
          <div className="tarea-descripcion-card">
            <h2>Descripción de la tarea</h2>
            <p>{tarea.descripcion}</p>
          </div>

          {/* Información adicional */}
          <div className="tarea-info-card">
            <h3>Instrucciones adicionales</h3>
            <ul>
              <li>Formato de entrega: PDF o documento de Word</li>
              <li>Máximo 10 páginas</li>
              <li>Incluir referencias bibliográficas</li>
              <li>Subir archivo antes de la fecha límite</li>
            </ul>
          </div>

          {/* Lista de entregas */}
          <div className="entregas-card">
            <h3>Entregas de estudiantes</h3>
            <div className="entregas-stats">
              <div className="stat">
                <FaCheck className="stat-icon entregado" />
                <span>{tarea.entregas} entregadas</span>
              </div>
              <div className="stat">
                <FaClock className="stat-icon pendiente" />
                <span>{tarea.totalEstudiantes - tarea.entregas} pendientes</span>
              </div>
              <div className="progreso-bar">
                <div 
                  className="progreso-fill" 
                  style={{ width: `${porcentajeEntregas}%` }}
                ></div>
              </div>
              <span className="progreso-texto">{porcentajeEntregas}% completado</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="tarea-sidebar">
          <div className="fecha-limite-card">
            <h3>
              <FaCalendarAlt />
              Fecha límite
            </h3>
            <div className="fecha-limite">
              {new Date(tarea.fechaLimite).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <div className="tiempo-restante">
              Faltan 3 días
            </div>
          </div>

          <div className="acciones-card">
            <h3>Acciones del docente</h3>
            <button className="btn-accion-tarea">
              <FaUsers />
              Ver todas las entregas
            </button>
            <button className="btn-accion-tarea">
              <FaFileAlt />
              Calificar entregas
            </button>
            <button className="btn-accion-tarea">
              <FaCalendarAlt />
              Extender fecha límite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};