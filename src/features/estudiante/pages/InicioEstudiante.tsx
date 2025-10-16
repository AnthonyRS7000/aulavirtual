import { useState } from 'react';
import TituloPage from '../../../components/pages/TituloPage';
import CursoCard from './CursoCard';
import '../css/CursoCard.css';
import '../css/inicioEstudiante.css';
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

export default function InicioEstudiante() {

  return (
    <div className="inicio-estudiante">
      {/* Título estilizado */}
      <TituloPage titulo="📚 Inicio" />

      <p className="page-subtitle">Bienvenido(a) al Aula Virtual UDH.</p>
      <p className="page-subtitle">Tu espacio digital para aprender, colaborar y crecer académicamente.</p>
     

      {/* Contenido: Grid principal y columna secundaria */}
      
        <div className="cursos-section">
          {/* Welcome card removed per user request */}

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
              <a className="servicio-card" href="/estudiante/mensajeria" aria-label="Mensajería interna">
                <IconMensajeria className="servicio-svg" />
                <span>Mensajería</span>
              </a>
              <a className="servicio-card" href="/biblioteca" target="_blank" rel="noreferrer" aria-label="Biblioteca">
                <IconBiblioteca className="servicio-svg" />
                <span>Biblioteca</span>
              </a>
            </div>
          </div>

          {/* Aquí podrías dejar espacio para otros widgets: cursos, tareas recientes, etc. */}
        </div>
      </div>

  );
}
