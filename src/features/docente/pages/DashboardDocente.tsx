import TituloPage from '../../../components/pages/TituloPage';
import '../css/DashboardDocente.css';
import {
  IconClassroom,
  IconDrive,
  IconMeet,
  IconCalendar,
  IconGmail,
  IconDocs,
  IconMensajeria,
  IconBiblioteca,
} from '../../../components/icons/LmsIcons';

export default function DashboardDocente() {
  return (
    <div className="dashboard-docente">
      {/* Título estilizado */}
      <TituloPage titulo="📊 Panel Docente" />

      <p className="page-subtitle">Bienvenido(a) al Panel de Gestión Docente.</p>
      <p className="page-subtitle">Tu espacio digital para enseñar, organizar y gestionar tus cursos de manera efectiva.</p>

      {/* Contenido: Grid de servicios */}
      <div className="cursos-section">
        {/* Grid de servicios: 4 por fila */}
        <div className="servicios-container">
          <div className="servicios-grid servicios-4">
            <a className="servicio-card" href="https://classroom.google.com" target="_blank" rel="noreferrer" aria-label="Google Classroom">
              <IconClassroom className="servicio-svg" />
              <span>Google Classroom</span>
            </a>
            <a className="servicio-card" href="https://drive.google.com" target="_blank" rel="noreferrer">
              <IconDrive className="servicio-svg" />
              <span>Google Drive</span>
            </a>
            <a className="servicio-card" href="https://meet.google.com" target="_blank" rel="noreferrer">
              <IconMeet className="servicio-svg" />
              <span>Google Meet</span>
            </a>
            <a className="servicio-card" href="https://calendar.google.com" target="_blank" rel="noreferrer">
              <IconCalendar className="servicio-svg" />
              <span>Google Calendar</span>
            </a>

            <a className="servicio-card" href="https://mail.google.com" target="_blank" rel="noreferrer" aria-label="Gmail">
              <IconGmail className="servicio-svg" />
              <span>Gmail</span>
            </a>
            <a className="servicio-card" href="https://docs.google.com" target="_blank" rel="noreferrer" aria-label="Google Docs">
              <IconDocs className="servicio-svg" />
              <span>Google Docs</span>
            </a>
            <a className="servicio-card" href="/docente/mensajeria" aria-label="Mensajería interna">
              <IconMensajeria className="servicio-svg" />
              <span>Mensajería</span>
            </a>
            <a className="servicio-card" href="/docente/biblioteca" aria-label="Biblioteca">
              <IconBiblioteca className="servicio-svg" />
              <span>Biblioteca</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
