import { FaCalendarAlt, FaClock, FaExclamationTriangle, FaCheckCircle, FaEdit } from 'react-icons/fa';
import './TareaCard.css';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  profesor: string;
  fechaEntrega: string;
  fechaPublicacion: string;
  estado: 'pendiente' | 'entregada' | 'revision' | 'calificada';
  prioridad: 'alta' | 'media' | 'baja';
  nota?: number;
  comentarios?: string;
}

interface TareaCardProps {
  tarea: Tarea;
}

export default function TareaCard({ tarea }: TareaCardProps) {
  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente': return '#f59e0b';
      case 'entregada': return '#3b82f6';
      case 'revision': return '#8b5cf6';
      case 'calificada': return '#10b981';
      default: return '#6b7280';
    }
  };

  const obtenerColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const obtenerIconoEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente': return <FaClock className="estado-icon" />;
      case 'entregada': return <FaCheckCircle className="estado-icon" />;
      case 'revision': return <FaEdit className="estado-icon" />;
      case 'calificada': return <FaCheckCircle className="estado-icon" />;
      default: return <FaClock className="estado-icon" />;
    }
  };

  const calcularDiasRestantes = (fechaEntrega: string) => {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
  };

  const diasRestantes = calcularDiasRestantes(tarea.fechaEntrega);

  return (
    <div className="tarea-card">
      <div className="tarea-header">
        <div className="tarea-estado">
          <span 
            className="estado-badge"
            style={{ backgroundColor: obtenerColorEstado(tarea.estado) }}
          >
            {obtenerIconoEstado(tarea.estado)}
            {tarea.estado}
          </span>
          <span 
            className="prioridad-badge"
            style={{ backgroundColor: obtenerColorPrioridad(tarea.prioridad) }}
          >
            {tarea.prioridad}
          </span>
        </div>
        
        {diasRestantes >= 0 && tarea.estado === 'pendiente' && (
          <div className="tiempo-restante">
            {diasRestantes === 0 && (
              <span className="urgente">
                <FaExclamationTriangle /> ¡Vence hoy!
              </span>
            )}
            {diasRestantes === 1 && (
              <span className="proximo">Vence mañana</span>
            )}
            {diasRestantes > 1 && (
              <span className="normal">{diasRestantes} días restantes</span>
            )}
          </div>
        )}
      </div>

      <div className="tarea-contenido">
        <h4 className="tarea-titulo">{tarea.titulo}</h4>
        <p className="tarea-descripcion">{tarea.descripcion}</p>
        
        <div className="tarea-meta">
          <div className="materia-info">
            <strong>{tarea.materia}</strong>
            <span className="profesor">Prof. {tarea.profesor}</span>
          </div>
          
          <div className="fechas-info">
            <div className="fecha-item">
              <FaCalendarAlt className="fecha-icon" />
              <span>Entrega: {new Date(tarea.fechaEntrega).toLocaleDateString('es-ES')}</span>
            </div>
            <div className="fecha-item">
              <span>Publicado: {new Date(tarea.fechaPublicacion).toLocaleDateString('es-ES')}</span>
            </div>
          </div>
        </div>

        {tarea.nota && (
          <div className="nota-tarea">
            <span className="nota-label">Calificación:</span>
            <span className="nota-valor">{tarea.nota}/20</span>
          </div>
        )}

        {tarea.comentarios && (
          <div className="comentarios-tarea">
            <span className="comentarios-label">Comentarios del profesor:</span>
            <p className="comentarios-texto">{tarea.comentarios}</p>
          </div>
        )}
      </div>

      <div className="tarea-acciones">
        {tarea.estado === 'pendiente' && (
          <button className="btn-entregar">Entregar Tarea</button>
        )}
        {tarea.estado === 'entregada' && (
          <button className="btn-ver">Ver Entrega</button>
        )}
        {tarea.estado === 'calificada' && (
          <button className="btn-ver">Ver Calificación</button>
        )}
        <button className="btn-detalles">Ver Detalles</button>
      </div>
    </div>
  );
}
