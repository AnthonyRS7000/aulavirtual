import { useState } from 'react';
import { FaBook, FaClock, FaTasks, FaChartLine, FaCalendarCheck, FaBell } from 'react-icons/fa';
import '../css/Dashboard.css';

interface EstadisticasGenerales {
  clasesHoy: number;
  tareasPendientes: number;
  promedioGeneral: number;
  asistenciaPromedio: number;
  creditosActuales: number;
  notificacionesPendientes: number;
}

interface TareaProxima {
  id: number;
  titulo: string;
  materia: string;
  fechaEntrega: string;
  prioridad: 'alta' | 'media' | 'baja';
}

interface ClaseProxima {
  id: number;
  materia: string;
  profesor: string;
  hora: string;
  aula: string;
  modalidad: 'presencial' | 'virtual';
}

interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  tipo: 'academico' | 'administrativo' | 'evento';
}

const estadisticasData: EstadisticasGenerales = {
  clasesHoy: 4,
  tareasPendientes: 6,
  promedioGeneral: 16.8,
  asistenciaPromedio: 92.5,
  creditosActuales: 22,
  notificacionesPendientes: 8
};

const tareasProximasData: TareaProxima[] = [
  {
    id: 1,
    titulo: "Ensayo sobre IA",
    materia: "Tecnologías Emergentes",
    fechaEntrega: "2024-01-20",
    prioridad: "alta"
  },
  {
    id: 2,
    titulo: "Proyecto Base de Datos",
    materia: "Base de Datos II",
    fechaEntrega: "2024-01-22",
    prioridad: "alta"
  },
  {
    id: 3,
    titulo: "Ejercicios Cálculo",
    materia: "Cálculo Integral",
    fechaEntrega: "2024-01-25",
    prioridad: "media"
  }
];

const clasesProximasData: ClaseProxima[] = [
  {
    id: 1,
    materia: "Desarrollo de Software III",
    profesor: "Dr. Carlos Mendoza",
    hora: "14:00 - 16:00",
    aula: "Lab A-201",
    modalidad: "presencial"
  },
  {
    id: 2,
    materia: "Inteligencia Artificial",
    profesor: "Dra. María González",
    hora: "16:00 - 18:00",
    aula: "Aula Virtual",
    modalidad: "virtual"
  }
];

const anunciosData: Anuncio[] = [
  {
    id: 1,
    titulo: "Inicio de Periodo de Exámenes Parciales",
    contenido: "Los exámenes parciales comenzarán el 15 de febrero. Revisar el cronograma en la plataforma.",
    fecha: "2024-01-18",
    tipo: "academico"
  },
  {
    id: 2,
    titulo: "Mantenimiento del Sistema",
    contenido: "El sistema estará en mantenimiento el sábado 20 de enero de 2:00 AM a 6:00 AM.",
    fecha: "2024-01-17",
    tipo: "administrativo"
  },
  {
    id: 3,
    titulo: "Conferencia de Inteligencia Artificial",
    contenido: "Únete a la conferencia magistral sobre IA aplicada en la industria. Auditorio principal.",
    fecha: "2024-01-16",
    tipo: "evento"
  }
];

export default function Dashboard() {
  const [estadisticas] = useState<EstadisticasGenerales>(estadisticasData);
  const [tareasProximas] = useState<TareaProxima[]>(tareasProximasData);
  const [clasesProximas] = useState<ClaseProxima[]>(clasesProximasData);
  const [anuncios] = useState<Anuncio[]>(anunciosData);

  const obtenerColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const obtenerColorTipoAnuncio = (tipo: string) => {
    switch (tipo) {
      case 'academico': return '#0066cc';
      case 'administrativo': return '#8b5cf6';
      case 'evento': return '#059669';
      default: return '#6b7280';
    }
  };

  const calcularDiasRestantes = (fechaEntrega: string) => {
    const hoy = new Date();
    const entrega = new Date(fechaEntrega);
    const diferencia = entrega.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>¡Bienvenida, María Fernanda!</h1>
          <p>Aquí tienes un resumen de tu actividad académica</p>
        </div>
        <div className="fecha-actual">
          <span>{new Date().toLocaleDateString('es-ES', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Estadísticas Generales */}
      <div className="estadisticas-generales">
        <div className="stat-card clases-hoy">
          <div className="stat-icon">
            <FaBook />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.clasesHoy}</span>
            <span className="stat-label">Clases Hoy</span>
          </div>
        </div>

        <div className="stat-card tareas-pendientes">
          <div className="stat-icon">
            <FaTasks />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.tareasPendientes}</span>
            <span className="stat-label">Tareas Pendientes</span>
          </div>
        </div>

        <div className="stat-card promedio">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.promedioGeneral}</span>
            <span className="stat-label">Promedio General</span>
          </div>
        </div>

        <div className="stat-card asistencia">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.asistenciaPromedio}%</span>
            <span className="stat-label">Asistencia</span>
          </div>
        </div>

        <div className="stat-card creditos">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.creditosActuales}</span>
            <span className="stat-label">Créditos Actuales</span>
          </div>
        </div>

        <div className="stat-card notificaciones">
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-content">
            <span className="stat-number">{estadisticas.notificacionesPendientes}</span>
            <span className="stat-label">Notificaciones</span>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Tareas Próximas */}
        <div className="dashboard-section tareas-proximas">
          <div className="section-header">
            <h2>Tareas Próximas</h2>
            <a href="/tareas" className="ver-todo">Ver todas</a>
          </div>
          
          <div className="tareas-lista">
            {tareasProximas.map(tarea => (
              <div key={tarea.id} className="tarea-item">
                <div className="tarea-info">
                  <h4>{tarea.titulo}</h4>
                  <p>{tarea.materia}</p>
                </div>
                <div className="tarea-meta">
                  <span 
                    className="prioridad-badge"
                    style={{ backgroundColor: obtenerColorPrioridad(tarea.prioridad) }}
                  >
                    {tarea.prioridad}
                  </span>
                  <span className="fecha-entrega">
                    {calcularDiasRestantes(tarea.fechaEntrega)} días
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clases de Hoy */}
        <div className="dashboard-section clases-hoy">
          <div className="section-header">
            <h2>Clases de Hoy</h2>
            <a href="/clases" className="ver-todo">Ver horario</a>
          </div>
          
          <div className="clases-lista">
            {clasesProximas.map(clase => (
              <div key={clase.id} className="clase-item">
                <div className="clase-tiempo">
                  <span className="hora">{clase.hora}</span>
                </div>
                <div className="clase-info">
                  <h4>{clase.materia}</h4>
                  <p>{clase.profesor}</p>
                  <span className="aula">{clase.aula}</span>
                </div>
                <div className="modalidad-badge">
                  <span className={`badge ${clase.modalidad}`}>
                    {clase.modalidad}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Anuncios Recientes */}
        <div className="dashboard-section anuncios">
          <div className="section-header">
            <h2>Anuncios Recientes</h2>
            <a href="/anuncios" className="ver-todo">Ver todos</a>
          </div>
          
          <div className="anuncios-lista">
            {anuncios.map(anuncio => (
              <div key={anuncio.id} className="anuncio-item">
                <div 
                  className="tipo-indicator"
                  style={{ backgroundColor: obtenerColorTipoAnuncio(anuncio.tipo) }}
                ></div>
                <div className="anuncio-content">
                  <h4>{anuncio.titulo}</h4>
                  <p>{anuncio.contenido}</p>
                  <span className="anuncio-fecha">
                    {new Date(anuncio.fecha).toLocaleDateString('es-ES')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos Rápidos */}
        <div className="dashboard-section accesos-rapidos">
          <div className="section-header">
            <h2>Accesos Rápidos</h2>
          </div>
          
          <div className="accesos-grid">
            <a href="/clases" className="acceso-item">
              <FaBook className="acceso-icon" />
              <span>Mis Clases</span>
            </a>
            
            <a href="/tareas" className="acceso-item">
              <FaTasks className="acceso-icon" />
              <span>Tareas</span>
            </a>
            
            <a href="/perfil" className="acceso-item">
              <FaChartLine className="acceso-icon" />
              <span>Mi Perfil</span>
            </a>
            
            <a href="/calendario" className="acceso-item">
              <FaCalendarCheck className="acceso-icon" />
              <span>Calendario</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
