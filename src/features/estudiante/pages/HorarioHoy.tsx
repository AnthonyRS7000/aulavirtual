import { FaClock, FaMapMarkerAlt, FaChalkboardTeacher } from 'react-icons/fa';
import '../css/HorarioHoy.css';

interface ClaseHoy {
  id: number;
  materia: string;
  profesor: string;
  hora: string;
  aula: string;
  tipo: 'presencial' | 'virtual';
  estado: 'pendiente' | 'en-curso' | 'completada';
}

export default function HorarioHoy() {
  const clasesHoy: ClaseHoy[] = [
    {
      id: 1,
      materia: "EVALUACIÓN DE PROYECTOS",
      profesor: "Dacio Luis Durán Cárdenas",
      hora: "21:00 - 22:40",
      aula: "Aula Virtual",
      tipo: "virtual",
      estado: "pendiente"
    },
    {
      id: 2,
      materia: "PLANEAMIENTO Y GESTIÓN ESTRATÉGICA",
      profesor: "Ulises Fidel Perla Camacho",
      hora: "19:00 - 20:40",
      aula: "Lab 205",
      tipo: "presencial",
      estado: "completada"
    },
    {
      id: 3,
      materia: "METODOLOGÍA DE LA INVESTIGACIÓN",
      profesor: "Ana María Rojas Vega",
      hora: "16:00 - 17:40",
      aula: "Aula 301",
      tipo: "presencial",
      estado: "completada"
    }
  ];

  return (
    <div className="horario-hoy">
      <div className="horario-header">
        <div className="header-content">
          <div className="header-info">
            <FaClock className="header-icon" />
            <h1>Horario de Hoy</h1>
          </div>
          <span className="fecha-hoy">
            {new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      <div className="clases-lista">
        {clasesHoy.map((clase) => (
          <div 
            key={clase.id} 
            className={`clase-card ${clase.estado}`}
          >
            <div className="clase-header">
              <div className="clase-tiempo">
                <span className="hora">{clase.hora}</span>
                <span className={`estado-badge ${clase.estado}`}>
                  {clase.estado === 'pendiente' ? '⏳' : clase.estado === 'en-curso' ? '🔴' : '✅'}
                  {clase.estado}
                </span>
              </div>
              <div className="clase-tipo">
                <span className={`tipo-badge ${clase.tipo}`}>
                  {clase.tipo === 'virtual' ? '💻' : '🏫'} {clase.tipo}
                </span>
              </div>
            </div>
            
            <div className="clase-contenido">
              <h3 className="materia-nombre">{clase.materia}</h3>
              <div className="clase-detalles">
                <div className="profesor">
                  <FaChalkboardTeacher className="detail-icon" />
                  <span>{clase.profesor}</span>
                </div>
                <div className="aula">
                  <FaMapMarkerAlt className="detail-icon" />
                  <span>{clase.aula}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clasesHoy.length === 0 && (
        <div className="sin-clases">
          <FaClock className="icon-empty" />
          <p>No tienes clases programadas para hoy</p>
          <span className="hint">Disfruta tu día libre de clases</span>
        </div>
      )}
    </div>
  );
}