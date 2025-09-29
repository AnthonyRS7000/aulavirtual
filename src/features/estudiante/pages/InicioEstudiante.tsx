import { useState, useEffect } from 'react';
import CursoCard from './CursoCard';
import EventoBanner from './EventoBanner';
import CalendarioAgenda from './CalendarioAgenda';
import '../css/CursoCard.css';
import '../css/EventoBanner.css';
import '../css/CalendarioAgenda.css';
import '../css/inicioEstudiante.css';

const eventosDocente = [
  {
    titulo: "V CONGRESO INTERNACIONAL DE INVESTIGACIÓN EN COMUNICACIÓN Y SOCIEDAD POSTDIGITAL:",
    subtitulo: "CRÍTICAS A LA POSTVERDAD Y LOS DESÓRDENES INFORMATIVOS",
    fecha: "23 Y 24 de octubre",
    ubicacion: "CAMPUS USIL GRAN ALMIRANTE MIGUEL GRAU",
    imagen: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    enlaceInscripcion: "https://inscripcion.udh.edu.pe"
  },
  {
    titulo: "CHARLA DE OPORTUNIDADES INTERNACIONALES",
    subtitulo: "Conoce los convenios de la UDH con universidades extranjeras",
    fecha: "15 de noviembre",
    ubicacion: "Auditorio Central",
    imagen: "https://images.unsplash.com/photo-1503424886300-4e58350f7111?w=400&h=300&fit=crop",
    enlaceInscripcion: "https://udh.edu.pe/charla-internacional"
  },
  {
    titulo: "EXPOSICIÓN DE PROYECTOS INNOVADORES 2025",
    subtitulo: "Estudiantes de último ciclo presentan sus soluciones digitales",
    fecha: "5 de diciembre",
    ubicacion: "Sala Innovación UDH",
    imagen: "https://images.unsplash.com/photo-1581093588401-79a11881860b?w=400&h=300&fit=crop"
  }
];

// Datos de cursos ficticios
const cursosData = [
  { id: 1, nombre: 'Matemática I', docente: 'Ing. Castro', creditos: 4 },
  { id: 2, nombre: 'Programación', docente: 'Lic. Romero', creditos: 3 },
  { id: 3, nombre: 'Redes', docente: 'MSc. Hernández', creditos: 3 },
];

export default function InicioEstudiante() {
  const [pestanaActiva, setPestanaActiva] = useState<'cursos' | 'stream'>('cursos');
  const [indiceEvento, setIndiceEvento] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceEvento((prev) => (prev + 1) % eventosDocente.length);
    }, 10000); // cada 10 segundos

    return () => clearInterval(intervalo);
  }, []);

  const eventoActual = eventosDocente[indiceEvento];

  return (
    <div className="inicio-estudiante">
      <div className="pestanas-navegacion">
        <button
          className={`pestana ${pestanaActiva === 'cursos' ? 'activa' : ''}`}
          onClick={() => setPestanaActiva('cursos')}
        >
          Mis Cursos
        </button>
      </div>

      {pestanaActiva === 'cursos' && (
        <div className="dashboard-grid">
          <div className="cursos-section">
            {cursosData.map((curso, index) => (
              <CursoCard key={index} {...curso} />
            ))}
          </div>

          <div className="sidebar-section">
            <EventoBanner {...eventoActual} />
            <CalendarioAgenda />
          </div>
        </div>
      )}
    </div>
  );
}
