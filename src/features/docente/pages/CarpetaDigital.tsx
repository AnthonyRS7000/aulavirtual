import '../css/CarpetaDigital.css';

const docenteInfo = {
  nombre: 'Aldo Enrique Ramirez Chaupis',
  saludo: 'Bienvenido, ALDO ENRIQUE RAMIREZ CHAUPIS',
  avatar: 'https://i.pravatar.cc/160?img=52'
};

// Iconos contextuales (usando stroke="currentColor" para respetar color CSS)
const CheckIcon = () => (
  <svg
    aria-hidden="true"
    className="carpeta-digital__check-icon"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const PdfIcon = () => (
  <svg
    aria-hidden="true"
    className="carpeta-digital__pdf-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M16 13h-4v-2" />
  </svg>
);

const QRIcon = () => (
  <svg
    aria-hidden="true"
    className="carpeta-digital__qr-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    {/* esquinas grandes */}
    <rect x="2" y="2" width="6" height="6" rx="1.2" />
    <rect x="16" y="2" width="6" height="6" rx="1.2" />
    <rect x="2" y="16" width="6" height="6" rx="1.2" />
    <rect x="16" y="16" width="6" height="6" rx="1.2" />

    {/* bloques internos para simular un QR más realista */}
    <rect x="9" y="4" width="2" height="2" />
    <rect x="12" y="4" width="1" height="1" />
    <rect x="14" y="5" width="1" height="1" />
    <rect x="11" y="7" width="2" height="2" />
    <rect x="15" y="7" width="1" height="1" />
    <rect x="8" y="10" width="1" height="1" />
    <rect x="10" y="11" width="2" height="2" />
    <rect x="13" y="12" width="1" height="1" />
    <rect x="16" y="12" width="1" height="1" />
    <rect x="9" y="14" width="1" height="1" />
    <rect x="12" y="15" width="2" height="2" />
    <rect x="15" y="16" width="1" height="1" />
  </svg>
);

const ClipboardIcon = () => (
  <svg
    aria-hidden="true"
    className="carpeta-digital__clipboard-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 4h-1.5a1.5 1.5 0 0 0-3 0H10" />
    <rect x="4" y="7" width="16" height="13" rx="2" />
    <path d="M8 11h8" />
    <path d="M8 15h8" />
  </svg>
);

const PeopleIcon = () => (
  <svg
    aria-hidden="true"
    className="carpeta-digital__people-icon"
    fill="none"
    height="20"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="20"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const handleRedirectToCarpeta = () => {
  window.location.href = 'https://carpeta.sistemasudh.com/dashboard';
};

export default function CarpetaDigital() {
  return (
    <main className="carpeta-digital-page">
      <div className="carpeta-digital-wrapper">
        <div className="carpeta-digital-panel">
          
          <section className="carpeta-digital-header">
            <h1>{docenteInfo.saludo}</h1>
          </section>

          <section className="carpeta-digital-content">
            <div className="carpeta-digital-intro">
              <h2 className="carpeta-digital-intro__title">📂 Portal Docente</h2>
              <p className="carpeta-digital-intro__description">
                El sistema ha sido diseñado para optimizar su labor docente. Aquí podrá:
              </p>
            </div>

            <ul className="carpeta-digital-features">
              <li className="carpeta-digital-features__item">
                <ClipboardIcon />
                <span>Completar y gestionar el sílabo de sus cursos</span>
              </li>
              <li className="carpeta-digital-features__item">
                <PdfIcon />
                <span>Generar y descargar PDFs con formato institucional</span>
              </li>
              <li className="carpeta-digital-features__item">
                <QRIcon />
                <span>Verificar la entrega del sílabo a los estudiantes</span>
              </li>
              <li className="carpeta-digital-features__item">
                <CheckIcon />
                <span>Supervisar el avance de temas por sesión con el delegado</span>
              </li>
              <li className="carpeta-digital-features__item">
                <PeopleIcon />
                <span>Asignar uno o dos delegados por sección/curso desde la lista de estudiantes</span>
              </li>
            </ul>

            <div className="carpeta-digital-cta-container">
              <button 
                className="carpeta-digital-cta"
                onClick={handleRedirectToCarpeta}
                type="button"
              >
                <span className="carpeta-digital-cta__img" aria-hidden="true" />
                <span className="carpeta-digital-cta__text">Comenzar</span>
              </button>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
