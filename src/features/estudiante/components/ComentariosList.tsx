import { useState } from 'react';
import { FaComment, FaReply, FaHeart, FaUser, FaClock, FaEllipsisV } from 'react-icons/fa';

interface Comentario {
  id: string;
  autor: {
    nombre: string;
    rol: 'estudiante' | 'profesor';
    avatar: string;
  };
  contenido: string;
  fechaCreacion: string;
  likes: number;
  respuestas?: Comentario[];
  esLikeado: boolean;
}

interface ComentariosListProps {
  comentarios: Comentario[];
  onAgregarComentario: (contenido: string, padreId?: string) => void;
  onLike: (comentarioId: string) => void;
  permitirComentarios?: boolean;
  placeholder?: string;
}

export default function ComentariosList({ 
  comentarios, 
  onAgregarComentario, 
  onLike,
  permitirComentarios = true,
  placeholder = "Escribe un comentario..."
}: ComentariosListProps) {
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [respuestaActiva, setRespuestaActiva] = useState<string | null>(null);
  const [respuestaTexto, setRespuestaTexto] = useState('');

  const manejarEnviarComentario = () => {
    if (nuevoComentario.trim()) {
      onAgregarComentario(nuevoComentario);
      setNuevoComentario('');
    }
  };

  const manejarEnviarRespuesta = (padreId: string) => {
    if (respuestaTexto.trim()) {
      onAgregarComentario(respuestaTexto, padreId);
      setRespuestaTexto('');
      setRespuestaActiva(null);
    }
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    const diferencia = ahora.getTime() - fechaObj.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias} días`;
    return fechaObj.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const ComentarioItem = ({ comentario, esRespuesta = false }: { comentario: Comentario; esRespuesta?: boolean }) => (
    <div className={`comentario-item ${esRespuesta ? 'respuesta' : ''}`}>
      <div className="comentario-avatar">
        <img src={comentario.autor.avatar} alt={comentario.autor.nombre} />
        {comentario.autor.rol === 'profesor' && (
          <span className="badge-profesor">Prof</span>
        )}
      </div>
      
      <div className="comentario-contenido">
        <div className="comentario-header">
          <div className="autor-info">
            <span className="autor-nombre">{comentario.autor.nombre}</span>
            <span className="comentario-fecha">
              <FaClock />
              {formatearFecha(comentario.fechaCreacion)}
            </span>
          </div>
          <button className="btn-opciones">
            <FaEllipsisV />
          </button>
        </div>
        
        <p className="comentario-texto">{comentario.contenido}</p>
        
        <div className="comentario-acciones">
          <button 
            className={`btn-like ${comentario.esLikeado ? 'liked' : ''}`}
            onClick={() => onLike(comentario.id)}
          >
            <FaHeart />
            {comentario.likes > 0 && <span>{comentario.likes}</span>}
          </button>
          
          {!esRespuesta && (
            <button 
              className="btn-responder"
              onClick={() => setRespuestaActiva(respuestaActiva === comentario.id ? null : comentario.id)}
            >
              <FaReply />
              Responder
            </button>
          )}
        </div>
        
        {respuestaActiva === comentario.id && (
          <div className="respuesta-form">
            <div className="input-respuesta">
              <FaUser className="user-icon" />
              <input
                type="text"
                value={respuestaTexto}
                onChange={(e) => setRespuestaTexto(e.target.value)}
                placeholder="Escribe una respuesta..."
                onKeyPress={(e) => e.key === 'Enter' && manejarEnviarRespuesta(comentario.id)}
              />
              <button 
                className="btn-enviar-respuesta"
                onClick={() => manejarEnviarRespuesta(comentario.id)}
                disabled={!respuestaTexto.trim()}
              >
                Enviar
              </button>
            </div>
          </div>
        )}
        
        {comentario.respuestas && comentario.respuestas.length > 0 && (
          <div className="respuestas-lista">
            {comentario.respuestas.map((respuesta) => (
              <ComentarioItem key={respuesta.id} comentario={respuesta} esRespuesta={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="comentarios-container">
      <div className="comentarios-header">
        <FaComment />
        <h4>Comentarios ({comentarios.length})</h4>
      </div>
      
      {permitirComentarios && (
        <div className="comentario-form">
          <div className="form-input">
            <FaUser className="user-icon" />
            <input
              type="text"
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              placeholder={placeholder}
              onKeyPress={(e) => e.key === 'Enter' && manejarEnviarComentario()}
            />
            <button 
              className="btn-enviar"
              onClick={manejarEnviarComentario}
              disabled={!nuevoComentario.trim()}
            >
              Comentar
            </button>
          </div>
        </div>
      )}
      
      <div className="comentarios-lista">
        {comentarios.length === 0 ? (
          <div className="sin-comentarios">
            <FaComment className="icon-empty" />
            <p>No hay comentarios aún</p>
            {permitirComentarios && <p className="hint">¡Sé el primero en comentar!</p>}
          </div>
        ) : (
          comentarios.map((comentario) => (
            <ComentarioItem key={comentario.id} comentario={comentario} />
          ))
        )}
      </div>
    </div>
  );
}