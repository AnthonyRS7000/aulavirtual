import { useState } from 'react';
import CursoCard from './CursoCard';
import EventoBanner from './EventoBanner';
import CalendarioAgenda from './CalendarioAgenda';
import StreamActividades from '../components/StreamActividades';
import '../css/CursoCard.css';
import '../css/EventoBanner.css';
import '../css/CalendarioAgenda.css';
import '../css/StreamActividades.css';
import '../css/inicioEstudiante.css';

export default function InicioEstudiante() {
  const [pestanaActiva, setPestanaActiva] = useState<'cursos' | 'stream'>('cursos');

  // Datos ficticios que replican la imagen
  const cursosData = [
    {
      titulo: "EVALUACIÓN DE PROYECTOS",
      bloque: "BLOQUE: FC-SMVIBS-SP08C01N",
      codigo: "PRE-GRADO",
      periodo: "2025-02",
      profesor: {
        nombre: "DACIO LUIS",
        apellidos: "DURAN CARDENAS",
        email: "dacio.duran@usil.pe",
        foto: "https://ui-avatars.com/api/?name=Dacio+Duran&background=c53030&color=fff"
      },
      horarios: [
        { dia: "MIÉRCOLES", hora: "21:00 - 22:40", color: "#ECC138" },
        { dia: "VIERNES", hora: "21:00 - 22:40", color: "#ECC138" }
      ],
      estadisticas: {
        silabo: true,
        matriculados: 25,
        notas: true,
        inasistencia: "0%"
      },
      color: "#ECC138",
      favorito: true
    },
    {
      titulo: "PLANEAMIENTO Y GESTIÓN ESTRATÉGICA",
      bloque: "BLOQUE: FC-SMVADM-SP09B01N",
      codigo: "PRE-GRADO",
      periodo: "2025-02",
      profesor: {
        nombre: "ULISES FIDEL",
        apellidos: "PERLA CAMACHO",
        email: "ulises.perla@usil.pe",
        foto: "https://ui-avatars.com/api/?name=Ulises+Perla&background=059669&color=fff"
      },
      horarios: [
        { dia: "MARTES", hora: "19:00 - 22:40", color: "#5A9E8D" },
        { dia: "JUEVES", hora: "19:00 - 20:40", color: "#5A9E8D" }
      ],
      estadisticas: {
        silabo: true,
        matriculados: 28,
        notas: true,
        inasistencia: "0%"
      },
      color: "#5A9E8D",
      favorito: true
    }
  ];

  const eventosAgenda = [
    {
      hora: "9:00pm - 10:40pm",
      titulo: "EVALUACIÓN DE PROYECTOS",
      codigo: "C1X135",
      tipo: "clase" as const
    }
  ];

  return (
    <div className="inicio-estudiante">
      {/* Navegación por pestañas */}
      <div className="pestanas-navegacion">
        <button 
          className={`pestana ${pestanaActiva === 'cursos' ? 'activa' : ''}`}
          onClick={() => setPestanaActiva('cursos')}
        >
          📚 Mis Cursos
        </button>
        <button 
          className={`pestana ${pestanaActiva === 'stream' ? 'activa' : ''}`}
          onClick={() => setPestanaActiva('stream')}
        >
          📡 Stream de Actividades
        </button>
      </div>

      {/* Contenido según pestaña activa */}
      {pestanaActiva === 'cursos' ? (
        <div className="dashboard-grid">
          {/* Columna izquierda - Cursos */}
          <div className="cursos-section">
            {cursosData.map((curso, index) => (
              <CursoCard key={index} {...curso} />
            ))}
          </div>

          {/* Columna derecha - Banner y Calendario */}
          <div className="sidebar-section">
            <EventoBanner
              titulo="V CONGRESO INTERNACIONAL DE INVESTIGACIÓN EN COMUNICACIÓN Y SOCIEDAD POSTDIGITAL:"
              subtitulo="CRÍTICAS A LA POSTVERDAD Y LOS DESÓRDENES INFORMATIVOS"
              fecha="23 Y 24 de octubre"
              ubicacion="CAMPUS USIL GRAN ALMIRANTE MIGUEL GRAU"
              imagen="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop"
              enlaceInscripcion="https://inscripcion.udh.edu.pe"
            />
            
            <CalendarioAgenda
            />
          </div>
        </div>
      ) : (
        <div className="stream-container">
          <StreamActividades />
        </div>
      )}
    </div>
  );
}
