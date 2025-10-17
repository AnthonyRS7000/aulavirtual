import { FaVideo, FaEllipsisV, FaBook, FaClipboardList, FaEnvelope, FaCalendarAlt, FaGoogleDrive } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Curso {
  id: string;
  nombre: string;
  profesor?: string; // <-- ahora opcional
  profesorEmail?: string | null;
  seccion?: string | null;
  descripcion?: string | null;
  enlace_meet?: string | null;
  tareas?: any[];
  anuncios?: any[];
}

interface ClaseCardProps {
  curso: Curso;
}

export default function ClaseCard({ curso }: ClaseCardProps) {
  const navigate = useNavigate();

  const profesorDisplay = curso.profesor ?? 'Sin profesor';

  // Iniciales para avatar
  const iniciales = curso.nombre
    ? curso.nombre.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()
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
      aria-label={`${curso.nombre} - ${profesorDisplay}`}
    >
      {/* Header */}
      <div className="card-banner">
        <div className="banner-text">
          <h3 className="banner-title">{curso.nombre}</h3>
          <p className="banner-sub">{profesorDisplay} {curso.seccion ? `· ${curso.seccion}` : ''}</p>

        </div>
        <div className="avatar" aria-hidden>
          <div className="avatar-inner" title={profesorDisplay}>
            {iniciales}
          </div>
        </div>
      </div>

      {/* Cuerpo */}
      <div className="card-body">
        <div className="info-line">
          <FaBook /> <span>{curso.tareas?.length || 0} tareas</span>
        </div>
        <div className="info-line">
          <FaClipboardList /> <span>{curso.anuncios?.length || 0} anuncios</span>
        </div>
      </div>

      {/* Footer */}
      <div className="card-footer">
        <div className="footer-right">
          {/* --- Google Meet --- */}
          <a
            className="meet-btn"
            href={curso.enlace_meet ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            title={curso.enlace_meet ? "Entrar a la clase virtual" : "No hay enlace de Meet"}
            onClick={(e) => e.stopPropagation()}
            aria-disabled={!curso.enlace_meet}
          >
            <FaVideo />
          </a>

          {/* --- Gmail --- */}
          <a
            className="gmail-btn"
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir Gmail"
            onClick={(e) => e.stopPropagation()}
          >
            <FaEnvelope />
          </a>

          {/* --- Google Drive --- */}
          <a
            className="drive-btn"
            href="https://drive.google.com/drive/my-drive"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir Google Drive"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGoogleDrive />
          </a>

          {/* --- Google Calendar --- */}
          <a
            className="calendar-btn"
            href="https://calendar.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir Google Calendar"
            onClick={(e) => e.stopPropagation()}
          >
            <FaCalendarAlt />
          </a>

          {/* --- Menú de opciones --- */}
          <button
            className="dots-btn"
            title="Más acciones"
            onClick={(e) => e.stopPropagation()}
            type="button"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>
    </article>
  );
}
