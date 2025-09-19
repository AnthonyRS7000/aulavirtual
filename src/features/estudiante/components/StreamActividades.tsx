import { useState } from 'react';
import { FaRegClock, FaFileAlt, FaBullhorn, FaComment, FaCalendarAlt } from 'react-icons/fa';
import ComentariosList from './ComentariosList';
import '../css/ComentariosList.css';

interface ActividadStream {
  id: string;
  tipo: 'anuncio' | 'tarea' | 'clase' | 'calificacion';
  titulo: string;
  descripcion: string;
  curso: string;
  profesor: string;
  fecha: string;
  hora: string;
  fechaLimite?: string;
  estado?: 'pendiente' | 'entregada' | 'calificada';
  calificacion?: number;
  comentarios?: number;
  prioridad?: 'alta' | 'media' | 'baja';
}

interface Comentario {
  id: string;
  autor: {
    nombre: string;
    rol: 'estudiante' | 'profesor';
    avatar: string;
  };
  contenido: string;
  fechaCreacion: string;
  likes: number;
  respuestas?: Comentario[];
  esLikeado: boolean;
}

export default function StreamActividades() {
  const [filtroActivo, setFiltroActivo] = useState<'todos' | 'anuncios' | 'tareas' | 'clases'>('todos');
  const [actividadExpandida, setActividadExpandida] = useState<string | null>(null);
  const [comentariosPorActividad, setComentariosPorActividad] = useState<{[key: string]: Comentario[]}>({});

  // Datos de ejemplo del stream de actividades
  const actividades: ActividadStream[] = [
    {
      id: '1',
      tipo: 'anuncio',
      titulo: 'Nuevo material de estudio disponible',
      descripcion: 'Se ha subido el material de la Unidad 3: Análisis Financiero. Por favor revisen los documentos antes de la próxima clase.',
      curso: 'EVALUACIÓN DE PROYECTOS',
      profesor: 'DACIO LUIS DURAN CARDENAS',
      fecha: '19 Sep 2025',
      hora: '14:30',
      comentarios: 5
    },
    {
      id: '2',
      tipo: 'tarea',
      titulo: 'Proyecto Final - Evaluación de Inversión',
      descripcion: 'Desarrollar un análisis completo de viabilidad económica para un proyecto de inversión. Incluir VAN, TIR y análisis de sensibilidad.',
      curso: 'EVALUACIÓN DE PROYECTOS',
      profesor: 'DACIO LUIS DURAN CARDENAS',
      fecha: '18 Sep 2025',
      hora: '21:00',
      fechaLimite: '25 Sep 2025',
      estado: 'pendiente',
      prioridad: 'alta',
      comentarios: 12
    },
    {
      id: '3',
      tipo: 'clase',
      titulo: 'Clase Virtual: Estrategias de Marketing Digital',
      descripcion: 'Revisaremos las principales estrategias de marketing digital y casos de éxito en empresas peruanas.',
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      profesor: 'ULISES FIDEL PERLA CAMACHO',
      fecha: '19 Sep 2025',
      hora: '19:00',
      comentarios: 2
    },
    {
      id: '4',
      tipo: 'calificacion',
      titulo: 'Calificación disponible: Examen Parcial',
      descripcion: 'Ya está disponible la calificación de su examen parcial. Puede revisar los comentarios del docente.',
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      profesor: 'ULISES FIDEL PERLA CAMACHO',
      fecha: '17 Sep 2025',
      hora: '16:45',
      estado: 'calificada',
      calificacion: 17,
      comentarios: 1
    }
  ];

  const filtrarActividades = () => {
    if (filtroActivo === 'todos') return actividades;
    return actividades.filter(actividad => {
      if (filtroActivo === 'anuncios') return actividad.tipo === 'anuncio';
      if (filtroActivo === 'tareas') return actividad.tipo === 'tarea';
      if (filtroActivo === 'clases') return actividad.tipo === 'clase';
      return true;
    });
  };

  const manejarAgregarComentario = (actividadId: string, contenido: string, padreId?: string) => {
    const nuevoComentario: Comentario = {
      id: Date.now().toString(),
      autor: {
        nombre: 'ARMANDO ROJAS LUNA',
        rol: 'estudiante',
        avatar: 'https://ui-avatars.com/api/?name=Armando+Rojas&background=39B49E&color=fff'
      },
      contenido,
      fechaCreacion: new Date().toISOString(),
      likes: 0,
      esLikeado: false,
      respuestas: []
    };

    setComentariosPorActividad(prev => {
      const comentariosActuales = prev[actividadId] || [];
      
      if (padreId) {
        // Es una respuesta
        const comentariosActualizados = comentariosActuales.map(comentario => {
          if (comentario.id === padreId) {
            return {
              ...comentario,
              respuestas: [...(comentario.respuestas || []), nuevoComentario]
            };
          }
          return comentario;
        });
        return { ...prev, [actividadId]: comentariosActualizados };
      } else {
        // Es un comentario nuevo
        return { ...prev, [actividadId]: [...comentariosActuales, nuevoComentario] };
      }
    });
  };

  const manejarLike = (actividadId: string, comentarioId: string) => {
    setComentariosPorActividad(prev => {
      const comentariosActuales = prev[actividadId] || [];
      const comentariosActualizados = comentariosActuales.map(comentario => {
        if (comentario.id === comentarioId) {
          return {
            ...comentario,
            esLikeado: !comentario.esLikeado,
            likes: comentario.esLikeado ? comentario.likes - 1 : comentario.likes + 1
          };
        }
        return comentario;
      });
      return { ...prev, [actividadId]: comentariosActualizados };
    });
  };

  const toggleExpansionActividad = (actividadId: string) => {
    setActividadExpandida(actividadExpandida === actividadId ? null : actividadId);
  };

  const getIconoTipo = (tipo: ActividadStream['tipo']) => {
    switch (tipo) {
      case 'anuncio': return <FaBullhorn className="actividad-icono anuncio" />;
      case 'tarea': return <FaFileAlt className="actividad-icono tarea" />;
      case 'clase': return <FaCalendarAlt className="actividad-icono clase" />;
      case 'calificacion': return <FaRegClock className="actividad-icono calificacion" />;
    }
  };

  const getColorPrioridad = (prioridad?: string) => {
    switch (prioridad) {
      case 'alta': return '#dc2626';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="stream-actividades">
      {/* Header con filtros */}
      <div className="stream-header">
        <h2>Actividades Recientes</h2>
        <div className="stream-filtros">
          <button 
            className={`filtro-btn ${filtroActivo === 'todos' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('todos')}
          >
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'anuncios' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('anuncios')}
          >
            Anuncios
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'tareas' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('tareas')}
          >
            Tareas
          </button>
          <button 
            className={`filtro-btn ${filtroActivo === 'clases' ? 'activo' : ''}`}
            onClick={() => setFiltroActivo('clases')}
          >
            Clases
          </button>
        </div>
      </div>

      {/* Lista de actividades */}
      <div className="stream-lista">
        {filtrarActividades().map((actividad) => (
          <div key={actividad.id} className={`actividad-card ${actividad.tipo}`}>
            {/* Header de la actividad */}
            <div className="actividad-header">
              <div className="actividad-info">
                {getIconoTipo(actividad.tipo)}
                <div className="actividad-meta">
                  <h3 className="actividad-titulo">{actividad.titulo}</h3>
                  <p className="actividad-curso">{actividad.curso}</p>
                  <p className="actividad-profesor">Por: {actividad.profesor}</p>
                </div>
              </div>
              <div className="actividad-tiempo">
                <span className="actividad-fecha">{actividad.fecha}</span>
                <span className="actividad-hora">{actividad.hora}</span>
                {actividad.prioridad && (
                  <span 
                    className="actividad-prioridad"
                    style={{ backgroundColor: getColorPrioridad(actividad.prioridad) }}
                  >
                    {actividad.prioridad.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            {/* Contenido de la actividad */}
            <div className="actividad-contenido">
              <p className="actividad-descripcion">{actividad.descripcion}</p>
              
              {/* Información específica por tipo */}
              {actividad.tipo === 'tarea' && actividad.fechaLimite && (
                <div className="tarea-info">
                  <div className="fecha-limite">
                    <FaRegClock />
                    <span>Fecha límite: {actividad.fechaLimite}</span>
                  </div>
                  <div className={`estado-entrega ${actividad.estado}`}>
                    {actividad.estado === 'pendiente' ? '⏳ Pendiente' : 
                     actividad.estado === 'entregada' ? '✅ Entregada' : '📝 Calificada'}
                  </div>
                </div>
              )}

              {actividad.tipo === 'calificacion' && actividad.calificacion && (
                <div className="calificacion-info">
                  <div className="nota-obtenida">
                    <span className="nota">{actividad.calificacion}/20</span>
                    <span className="texto">Calificación obtenida</span>
                  </div>
                </div>
              )}
            </div>

            {/* Footer con acciones */}
            <div className="actividad-footer">
              <div className="actividad-stats">
                {actividad.comentarios && actividad.comentarios > 0 && (
                  <span className="comentarios-count">
                    <FaComment />
                    {actividad.comentarios} comentarios
                  </span>
                )}
              </div>
              <div className="actividad-acciones">
                {actividad.tipo === 'tarea' && actividad.estado === 'pendiente' && (
                  <button className="btn-entrega">Entregar</button>
                )}
                <button 
                  className="btn-comentar"
                  onClick={() => toggleExpansionActividad(actividad.id)}
                >
                  Comentar
                </button>
                <button className="btn-ver-mas">Ver más</button>
              </div>
            </div>

            {/* Sección de comentarios expandible */}
            {actividadExpandida === actividad.id && (
              <div className="comentarios-expandidos">
                <ComentariosList
                  comentarios={comentariosPorActividad[actividad.id] || []}
                  onAgregarComentario={(contenido, padreId) => manejarAgregarComentario(actividad.id, contenido, padreId)}
                  onLike={(comentarioId) => manejarLike(actividad.id, comentarioId)}
                  placeholder={`Comentar sobre "${actividad.titulo}"...`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}