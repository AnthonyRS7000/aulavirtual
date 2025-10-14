import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaCheckCircle, FaEdit, FaFile, FaEye } from 'react-icons/fa';
import '../css/TareaCard.css';

interface ArchivoEntrega {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  fechaSubida: string;
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  profesor: string;
  fechaEntrega: string;
  fechaPublicacion: string;
  estado: 'pendiente' | 'entregada' | 'revision' | 'calificada';
  nota?: number;
  comentarios?: string;
  archivosEntregados?: ArchivoEntrega[];
  tipoEntrega: 'archivo' | 'texto' | 'enlace';
  formatosPermitidos?: string[];
  tamanosMaximo?: number;
  permitirEntregaTardia?: boolean;
}

interface TareaCardProps {
  tarea: Tarea;
}

export default function TareaCard({ tarea }: TareaCardProps) {
  const navigate = useNavigate();

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente': return 'var(--pantone-saffron)';
      case 'entregada': return 'var(--pantone-zomp)';
      case 'revision': return 'var(--pantone-zomp-light)';
      case 'calificada': return 'var(--udh-success)';
      default: return 'var(--text-secondary)';
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

  

    const formatearTamaño = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Nota: la lógica de subida/entrega se realiza en la vista de detalles.

  const esFechaVencida = () => {
    const fechaActual = new Date();
    const fechaEntrega = new Date(tarea.fechaEntrega);
    return fechaActual > fechaEntrega;
  };

  const diasRestantes = Math.ceil((new Date(tarea.fechaEntrega).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className={`tarea-card ${tarea.archivosEntregados && tarea.archivosEntregados.length > 0 ? 'has-entregas' : ''}`}>
      <div className="tarea-header">
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
      </div>

      <div className="tarea-contenido">
        
        
        <div className="tarea-texto">
          <div className="tarea-texto-principal">
            <h4 className="tarea-titulo">{tarea.titulo}</h4>
            <p className="tarea-descripcion">{tarea.descripcion}</p>
          </div>

          {tarea.nota && (
            <div className="nota-tarea">
              <span className="nota-valor">{tarea.nota}/20</span>
            </div>
          )}
        </div>

        {tarea.comentarios && (
          <div className="comentarios-tarea">
            <span className="comentarios-label">Comentarios del profesor:</span>
            <p className="comentarios-texto">{tarea.comentarios}</p>
          </div>
        )}

        {/* Sección de entrega de archivos */}
        {tarea.estado === 'pendiente' && (
          <div className="seccion-entrega">
            <div className="entrega-header">
              <h5>Entrega de Tarea</h5>
              <span className="tipo-entrega">Tipo: {tarea.tipoEntrega}</span>
            </div>
            
            {tarea.tipoEntrega === 'archivo' && (
              <div className="entrega-archivo">
                <div className="info-entrega">
                  {tarea.formatosPermitidos && (
                    <p className="formatos-info">
                      📎 Formatos permitidos: {tarea.formatosPermitidos.join(', ')}
                    </p>
                  )}
                  {tarea.tamanosMaximo && (
                    <p className="tamaño-info">
                      📏 Tamaño máximo: {tarea.tamanosMaximo}MB
                    </p>
                  )}
                </div>
                
                <div className="upload-area">
                  </div>
              </div>
            )}

            {esFechaVencida() && !tarea.permitirEntregaTardia && (
              <div className="entrega-vencida">
                ⚠️ La fecha de entrega ha pasado y no se permiten entregas tardías.
              </div>
            )}

            {esFechaVencida() && tarea.permitirEntregaTardia && (
              <div className="entrega-tardia">
                ⚠️ Esta entrega será marcada como tardía.
              </div>
            )}
          </div>
        )}

        {/* Archivos entregados */}
        {tarea.archivosEntregados && tarea.archivosEntregados.length > 0 && (
          <div className="archivos-entregados">
            <h5>Archivos Entregados</h5>
            {tarea.archivosEntregados.map((archivo) => (
              <div key={archivo.id} className="archivo-entregado">
                <FaFile className="file-icon" />
                <div className="archivo-info">
                  <span className="archivo-nombre">{archivo.nombre}</span>
                  <span className="archivo-detalles">
                    {formatearTamaño(archivo.tamaño * 1024 * 1024)} • {archivo.fechaSubida}
                  </span>
                </div>
                <button className="btn-ver-archivo">
                  <FaEye />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tarea-acciones">
        
        <button className="btn-detalles" onClick={() => navigate(`/estudiante/tareas/${tarea.id}`)}>Ver Detalles</button>
      </div>
    </div>
  );
}