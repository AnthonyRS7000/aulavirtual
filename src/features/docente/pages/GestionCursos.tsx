import '../css/GestionCursos.css';
import { useEffect, useState } from 'react';
import { getCursosDocente } from '../../../api/classroom';

interface Curso {
  id: string;
  codigo: string;
  nombre: string;
  seccion: string;
  link: string;
}

const LibraryIcon = () => (
  <svg
    aria-hidden="true"
    className="curso-card__library-icon"
    fill="none"
    height="52"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="52"
  >
    <path d="m16 6 4 14" />
    <path d="M12 6v14" />
    <path d="M8 8v12" />
    <path d="M4 4v16" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    aria-hidden="true"
    className="curso-card__meta-icon"
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="M8 7V3" />
    <path d="M16 7V3" />
    <rect height="14" rx="2" ry="2" width="18" x="3" y="5" />
    <path d="M3 11h18" />
  </svg>
);

const BookIcon = () => (
  <svg
    aria-hidden="true"
    className="curso-card__meta-icon"
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 7H20V17" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    className="curso-card__arrow-icon"
    fill="currentColor"
    height="14"
    viewBox="0 0 16 16"
    width="14"
  >
    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
  </svg>
);

export default function GestionCursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarCursos() {
      try {
        const data = await getCursosDocente();
        setCursos(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <main className="gestion-cursos-page">
      <div className="mensajeria-docente-header">
        <h1 className="mensajeria-docente-titulo">Mis Cursos</h1>
        <p className="mensajeria-docente-subtitulo">
          Estos son tus cursos asignados. Cada clase es una nueva oportunidad para inspirar, guiar y transformar el aprendizaje.
        </p>
      </div>

      <div className="gestion-cursos-wrapper">
        <div className="gestion-cursos-panel">
          {loading ? (
            <div className="gestion-cursos-empty">
              <h3>Cargando cursos...</h3>
            </div>
          ) : cursos.length === 0 ? (
            <div className="gestion-cursos-empty">
              <h3>No tienes sílabos asignados</h3>
              <p>Cuando la coordinación te asigne cursos, aparecerán aquí automáticamente.</p>
            </div>
          ) : (
            <section className="gestion-cursos-grid">
              {cursos.map((curso) => (
                <article className="curso-card" key={curso.id}>
                  <div className="curso-card__header">
                    <LibraryIcon />
                  </div>

                  <div className="curso-card__body">
                    <span className="curso-card__codigo">{curso.codigo}</span>
                    <h3 className="curso-card__titulo">{curso.nombre}</h3>

                    <div className="curso-card__meta">
                      <div className="curso-card__meta-item">
                        <CalendarIcon />
                        <span>Sección: {curso.seccion}</span>
                      </div>
                      <div className="curso-card__meta-item">
                        <BookIcon />
                        <a
                          href={curso.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ir al curso
                        </a>
                      </div>
                    </div>
                  </div>

                  <footer className="curso-card__footer">
                    <a
                      href={curso.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="curso-card__cta"
                    >
                      <span>Ver en Classroom</span>
                      <ArrowIcon />
                    </a>
                  </footer>
                </article>
              ))}
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
