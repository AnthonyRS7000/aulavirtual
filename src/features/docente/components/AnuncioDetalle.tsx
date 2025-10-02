import { FaArrowLeft, FaCalendarAlt, FaThumbtack, FaEdit, FaTrash } from 'react-icons/fa';
import './AnuncioDetalle.css';

interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fijado: boolean;
  cursoId: number;
}

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
}

interface Props {
  anuncio: Anuncio;
  curso: Curso;
  onVolver: () => void;
}

export const AnuncioDetalle = ({ anuncio, curso, onVolver }: Props) => {
  return (
    <div className="anuncio-detalle-container">
      {/* Header */}
      <div className="anuncio-header">
        <div className="anuncio-header-content">
          <button 
            className="btn-volver-anuncio"
            onClick={onVolver}
          >
            <FaArrowLeft />
          </button>
          
          <div className="anuncio-info">
            <div className="curso-breadcrumb">
              <span>{curso.codigo} - {curso.nombre}</span>
            </div>
            <h1 className="anuncio-titulo">{anuncio.titulo}</h1>
            <div className="anuncio-meta">
              {anuncio.fijado && (
                <span className="fijado-badge">
                  <FaThumbtack /> Fijado
                </span>
              )}
              <span className="fecha-publicacion">
                <FaCalendarAlt /> 
                {new Date(anuncio.fecha).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <div className="anuncio-acciones">
            <button className="btn-accion-anuncio">
              <FaEdit />
            </button>
            <button className="btn-accion-anuncio danger">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="anuncio-content">
        <div className="anuncio-main">
          <div className="anuncio-contenido-card">
            <div className="contenido-texto">
              {anuncio.contenido.split('\n').map((parrafo, index) => (
                <p key={index}>{parrafo}</p>
              ))}
            </div>
          </div>

          {/* Información adicional si es necesaria */}
          <div className="anuncio-info-adicional">
            <h3>Información del anuncio</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Publicado:</strong>
                <span>{new Date(anuncio.fecha).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="info-item">
                <strong>Estado:</strong>
                <span>{anuncio.fijado ? 'Fijado' : 'Normal'}</span>
              </div>
              <div className="info-item">
                <strong>Visibilidad:</strong>
                <span>Todos los estudiantes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};