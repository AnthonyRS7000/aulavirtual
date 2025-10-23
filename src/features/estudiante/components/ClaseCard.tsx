import { FaVideo, FaEllipsisV, FaBook, FaClipboardList, FaEnvelope, FaCalendarAlt, FaGoogleDrive } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ClaseCard.css';

interface Curso {
  id: string;
  nombre: string;
  codigo: string;
  seccion: string;
  docente: string;
  foto_docente: string | null;
  num_tareas: number;
  num_anuncios: number;
  link: string;
}

export default function ClaseCard({ curso }: { curso: Curso }) {
  const navigate = useNavigate();

  const iniciales = curso.docente
    ? curso.docente.split(' ').slice(0, 2).map(p => p[0]).join('').toUpperCase()
    : 'PR';

  return (
    <article
      className="clase-card-min"
      role="button"
      tabIndex={0}
      onClick={() => window.open(curso.link, '_blank')}
      aria-label={`${curso.nombre} - ${curso.docente}`}
    >
      <div className="card-banner">
        <div className="banner-text">
          <h3 className="banner-title">{curso.nombre}</h3>
          <p className="banner-sub">{curso.docente} {curso.seccion ? `· ${curso.seccion}` : ''}</p>
        </div>
          <div className="avatar" aria-hidden>
          {curso.foto_docente ? (
            <img
              src={
                curso.foto_docente.startsWith('//')
                  ? `https:${curso.foto_docente}`
                  : curso.foto_docente
              }
              alt={curso.docente}
              className="avatar-img"
            />
          ) : (
            <div className="avatar-inner">{iniciales}</div>
          )}
        </div>
      </div>

      <div className="card-body">
        <div className="info-line">
          <FaBook /> <span>{curso.num_tareas} tareas</span>
        </div>
        <div className="info-line">
          <FaClipboardList /> <span>{curso.num_anuncios} anuncios</span>
        </div>
      </div>

      {/* Footer */} 
      <div className="card-footer"> 
        <div className="footer-right"> 
          {/* --- Google Meet --- */} 
          <a className="meet-btn" 
           href="https://meet.google.com/"
          target="_blank" rel="noopener noreferrer" 
          title= "Entrar a la clase virtual" 
          onClick={(e) => e.stopPropagation()} 
      > 
          <FaVideo /> </a> 
          {/* --- Gmail --- */}
           <a className="gmail-btn"
            href="https://mail.google.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            title="Abrir Gmail" onClick={(e) => e.stopPropagation()} >
            <FaEnvelope /> 
            </a>
             {/* --- Google Drive --- */} 
             <a className="drive-btn" 
             href="https://drive.google.com/drive/my-drive" 
             target="_blank" 
             rel="noopener noreferrer" 
             title="Abrir Google Drive" 
             onClick={(e) => e.stopPropagation()} > 
             <FaGoogleDrive /> </a> 
             {/* --- Google Calendar --- */} 
             <a className="calendar-btn" 
             href="https://calendar.google.com/"
              target="_blank" rel="noopener noreferrer"
               title="Abrir Google Calendar" 
               onClick={(e) => e.stopPropagation()} > 
               <FaCalendarAlt /> </a> 
               {/* --- Menú de opciones --- */} 
               <button className="dots-btn" 
               title="Más acciones" 
               onClick={(e) => e.stopPropagation()} 
               type="button" > <FaEllipsisV /> 
               </button> 
               </div>
                </div>
    </article>
  );
}
