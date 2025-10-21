import '../css/GestionCursos.css';

type EstadoSilabo = 'registrado' | 'pendiente';

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  ciclo: string;
  creditos: number;
  estudiantes: number;
  gradientFrom: string;
  gradientTo: string;
}

const cursos: Curso[] = [
  {
    id: 62108052,
    codigo: '062108052',
    nombre: 'Seminarios de Tesis I',
    ciclo: '8',
    creditos: 3,
    estudiantes: 32,
    gradientFrom: 'rgba(219, 234, 254, 1)',
    gradientTo: 'rgba(191, 219, 254, 1)'
  },
  {
    id: 62110052,
    codigo: '062110052',
    nombre: 'Seminario de Tesis III',
    ciclo: '10',
    creditos: 3,
    estudiantes: 28,
    gradientFrom: 'rgba(219, 234, 254, 1)',
    gradientTo: 'rgba(199, 210, 254, 1)'
  },
  {
    id: 62110072,
    codigo: '062110072',
    nombre: 'Trabajo de Investigación',
    ciclo: '10',
    creditos: 3,
    estudiantes: 30,
    gradientFrom: 'rgba(191, 219, 254, 1)',
    gradientTo: 'rgba(165, 180, 252, 1)'
  }
];

const docenteInfo = {
  nombre: 'Aldo Enrique',
  saludo: '¡Bienvenido, ALDO ENRIQUE!',
  mensaje: 'Estos son tus cursos asignados. Cada clase es una nueva oportunidad para inspirar, guiar y transformar el aprendizaje.',
  avatar: 'https://i.pravatar.cc/160?img=52'
};

// estadoConfig removed — not tracking estado in cards anymore

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
  return (
    <main className="gestion-cursos-page">
      <div className="gestion-cursos-wrapper">
        <div className="gestion-cursos-panel">
        <section className="docente-banner">
          <div className="docente-banner__avatar">
            <img alt={`Avatar de ${docenteInfo.nombre}`} src={docenteInfo.avatar} />
          </div>
          <div className="docente-banner__content">
            <h2>{docenteInfo.saludo}</h2>
            <p>{docenteInfo.mensaje}</p>
          </div>
        </section>

        <section className="gestion-cursos-grid">
          {cursos.map((curso) => {
            return (
              <article className="curso-card" key={curso.id}>
                <div
                  className="curso-card__header"
                  style={{ backgroundImage: `linear-gradient(135deg, ${curso.gradientFrom}, ${curso.gradientTo})` }}
                >
                  <LibraryIcon />
                </div>

                <div className="curso-card__body">
                  <span className="curso-card__codigo">{curso.codigo}</span>
                  <h3 className="curso-card__titulo">{curso.nombre}</h3>

                  <div className="curso-card__meta">
                    <div className="curso-card__meta-item">
                      <CalendarIcon />
                      <span>Ciclo: {curso.ciclo}</span>
                    </div>
                    <div className="curso-card__meta-item">
                      <BookIcon />
                      <span>Créditos: {curso.creditos}</span>
                    </div>
                    {/* Estado removed */}
                  </div>
                </div>

                <footer className="curso-card__footer">
                  <button className="curso-card__cta" type="button">
                    <span>Ver Detalles</span>
                    <ArrowIcon />
                  </button>
                </footer>
              </article>
            );
          })}
        </section>

        {cursos.length === 0 && (
          <div className="gestion-cursos-empty">
            <h3>No tienes sílabos asignados</h3>
            <p>Cuando la coordinación te asigne cursos, aparecerán aquí automáticamente.</p>
          </div>
        )}
        </div>
      </div>
    </main>
  );
}