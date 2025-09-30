import { FaVideo, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Clase {
  id: string;
  codigo: string;
  nombre: string;
  docente: string;
  horario?: string;
  modalidad?: string;
  aulas?: string[];
  estudiantes?: number;
  descripcion?: string;
  color?: string;
  linkMeet?: string;
}

interface ClaseCardProps {
  curso: Clase;
}

export default function ClaseCard({ curso }: ClaseCardProps) {
  const navigate = useNavigate();

  // Generar iniciales para avatar si no hay imagen
  const iniciales = curso.nombre
    ? curso.nombre.split(' ').slice(0,2).map(s=>s[0]).join('').toUpperCase()
    : 'CL';

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      navigate(`/estudiante/clases/${curso.id}`);
    }
  };

  return (
    <article
      className="clase-card-min"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/estudiante/clases/${curso.id}`)}
      onKeyDown={handleKey}
      style={{ borderLeftColor: curso.color || 'var(--accent-cyan)'}}
      aria-label={`${curso.nombre} - ${curso.docente}`}
    >
      <div className="card-banner" style={{ background: curso.color || '' }}>
        <div className="banner-text">
          <h3 className="banner-title" title={curso.nombre}>{curso.nombre}</h3>
          <p className="banner-sub">{curso.docente}</p>
        </div>

        {/* avatar superpuesto en la esquina derecha (sale del banner) */}
        <div className="avatar" aria-hidden>{iniciales}</div>
      </div>

      <div className="card-body">
        <div className="card-middle">
          {/* espacio para contenido secundario: descripción, horario, etc. */}
        </div>
      </div>

      {/* l linea divisoria y footer con el botn (meet centrado, tres puntos a la derecha) */}
      <div className="card-divider" aria-hidden />
      <div className="card-footer">
        <div className="footer-left" aria-hidden />

        <div className="footer-right">
          {/* Mostrar el icono de video y el botón de acciones juntos a la derecha (placeholder cuando no hay enlace) */}
          { (curso.modalidad === 'virtual' || curso.linkMeet) ? (
            <a
              className="meet-btn"
              href={curso.linkMeet || '#'}
              onClick={(e)=> { e.stopPropagation(); }}
              target="_blank"
              rel="noopener noreferrer"
              title="Entrar a la clase virtual"
              aria-label="Entrar a la clase virtual"
            >
              <FaVideo />
            </a>
          ) : (
            <button className="meet-btn placeholder" aria-hidden title="Sin enlace" onClick={(e)=> e.stopPropagation()}>
              <FaVideo />
            </button>
          )}

          <button
            className="dots-btn"
            aria-label="Más acciones"
            title="Más acciones"
            onClick={(e) => { e.stopPropagation(); /* abrir menu placeholder */ }}
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </article>
  );
}
