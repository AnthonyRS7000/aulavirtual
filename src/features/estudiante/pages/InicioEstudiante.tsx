import CursoCard from '../components/CursoCard';
import EventoBanner from '../components/EventoBanner';
import CalendarioAgenda from '../components/CalendarioAgenda';
import '../components/CursoCard.css';
import '../components/EventoBanner.css';
import '../components/CalendarioAgenda.css';
import '../css/dashboard.css';

export default function InicioEstudiante() {
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
        { dia: "MIÉRCOLES", hora: "21:00 - 22:40", color: "#6b7280" },
        { dia: "VIERNES", hora: "21:00 - 22:40", color: "#10b981" }
      ],
      estadisticas: {
        silabo: true,
        matriculados: 25,
        notas: true,
        inasistencia: "0%"
      },
      color: "#dc2626",
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
        { dia: "MARTES", hora: "19:00 - 22:40", color: "#6b7280" },
        { dia: "JUEVES", hora: "19:00 - 20:40", color: "#6b7280" }
      ],
      estadisticas: {
        silabo: true,
        matriculados: 28,
        notas: true,
        inasistencia: "0%"
      },
      color: "#059669",
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
            fechaActual="12 DE SEPTIEMBRE DE 2025"
            eventos={eventosAgenda}
          />
        </div>
      </div>
    </div>
  );
}
