import { FaClock, FaMapMarkerAlt, FaChalkboardTeacher } from 'react-icons/fa';

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

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'pendiente': return '#f59e0b';
      case 'en-curso': return '#10b981';
      case 'completada': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="horario-hoy">
      <div className="horario-header">
        <h3>
          <FaClock className="header-icon" />
          Horario de Hoy
        </h3>
        <span className="fecha-hoy">
          {new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      <div className="clases-lista">
        {clasesHoy.map((clase) => (
          <div 
            key={clase.id} 
            className={`clase-item ${clase.estado}`}
            style={{ borderLeftColor: obtenerColorEstado(clase.estado) }}
          >
            <div className="clase-tiempo">
              <span className="hora">{clase.hora}</span>
              <span 
                className="estado-badge"
                style={{ backgroundColor: obtenerColorEstado(clase.estado) }}
              >
                {clase.estado}
              </span>
            </div>
            
            <div className="clase-info">
              <h4 className="materia-nombre">{clase.materia}</h4>
              <div className="clase-detalles">
                <span className="profesor">
                  <FaChalkboardTeacher className="detail-icon" />
                  {clase.profesor}
                </span>
                <span className="aula">
                  <FaMapMarkerAlt className="detail-icon" />
                  {clase.aula}
                </span>
              </div>
            </div>

            <div className="clase-tipo">
              <span className={`tipo-badge ${clase.tipo}`}>
                {clase.tipo === 'virtual' ? '💻' : '🏫'} {clase.tipo}
              </span>
            </div>
          </div>
        ))}
      </div>

      {clasesHoy.length === 0 && (
        <div className="sin-clases">
          <p>No tienes clases programadas para hoy</p>
        </div>
      )}
    </div>
  );
}