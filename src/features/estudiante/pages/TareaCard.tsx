import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaExclamationTriangle, FaCheckCircle, FaEdit, FaUpload, FaFile, FaTrash, FaEye } from 'react-icons/fa';
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
  const [mostrarEntrega, setMostrarEntrega] = useState(false);
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);

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

  const manejarSeleccionArchivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = evento.target.files?.[0];
    if (archivo) {
      // Validar tamaño
      if (tarea.tamanosMaximo && archivo.size > tarea.tamanosMaximo * 1024 * 1024) {
        alert(`El archivo es demasiado grande. Máximo permitido: ${tarea.tamanosMaximo}MB`);
        return;
      }
      
      // Validar formato
      if (tarea.formatosPermitidos) {
        const extension = '.' + archivo.name.split('.').pop()?.toLowerCase();
        if (!tarea.formatosPermitidos.includes(extension)) {
          alert(`Formato no permitido. Formatos válidos: ${tarea.formatosPermitidos.join(', ')}`);
          return;
        }
      }
      
      setArchivoSeleccionado(archivo);
    }
  };

  const manejarEntrega = () => {
    if (tarea.tipoEntrega === 'archivo' && !archivoSeleccionado) {
      alert('Por favor selecciona un archivo para entregar');
      return;
    }
    
    // Aquí iría la lógica para enviar el archivo al servidor
    console.log('Entregando tarea:', tarea.id, archivoSeleccionado);
    alert('Tarea entregada exitosamente');
    setMostrarEntrega(false);
    setArchivoSeleccionado(null);
  };

  const esFechaVencida = () => {
    const fechaActual = new Date();
    const fechaEntrega = new Date(tarea.fechaEntrega);
    return fechaActual > fechaEntrega;
  };

  const diasRestantes = Math.ceil((new Date(tarea.fechaEntrega).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <div className="tarea-card">
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
        
        
        <h4 className="tarea-titulo">{tarea.titulo}</h4>
        <p className="tarea-descripcion">{tarea.descripcion}</p>
        

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
                  <input
                    type="file"
                    id={`file-${tarea.id}`}
                    onChange={manejarSeleccionArchivo}
                    style={{ display: 'none' }}
                    accept={tarea.formatosPermitidos?.join(',')}
                  />
                  <label htmlFor={`file-${tarea.id}`} className="upload-button">
                    <FaUpload />
                    {archivoSeleccionado ? archivoSeleccionado.name : 'Seleccionar archivo'}
                  </label>
                  
                  {archivoSeleccionado && (
                    <div className="archivo-seleccionado">
                      <FaFile className="file-icon" />
                      <span className="file-name">{archivoSeleccionado.name}</span>
                      <span className="file-size">({formatearTamaño(archivoSeleccionado.size)})</span>
                      <button 
                        className="btn-remove-file"
                        onClick={() => setArchivoSeleccionado(null)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
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
        {tarea.estado === 'pendiente' && (
          <>
            <button 
              className="btn-entregar"
              onClick={manejarEntrega}
              disabled={tarea.tipoEntrega === 'archivo' && !archivoSeleccionado}
            >
              Entregar Tarea
            </button>
            {!mostrarEntrega && (
              <button 
                className="btn-preparar"
                onClick={() => setMostrarEntrega(true)}
              >
                Preparar Entrega
              </button>
            )}
          </>
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