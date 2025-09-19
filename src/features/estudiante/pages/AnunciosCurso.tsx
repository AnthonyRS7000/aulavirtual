import { useState } from 'react';
import { FaBullhorn, FaEye, FaEyeSlash, FaCalendarAlt, FaSearch, FaFilter } from 'react-icons/fa';
import ComentariosList from '../components/ComentariosList';
import '../css/ComentariosList.css';
import '../css/AnunciosCurso.css';

interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  autor: {
    nombre: string;
    rol: 'profesor' | 'administrativo';
    avatar: string;
  };
  curso: string;
  fechaPublicacion: string;
  fechaModificacion?: string;
  prioridad: 'alta' | 'media' | 'baja';
  leido: boolean;
  archivosAdjuntos?: {
    nombre: string;
    url: string;
    tipo: string;
  }[];
  comentariosCount: number;
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

export default function AnunciosCurso() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: '1',
      titulo: 'Nuevo material de estudio disponible - Unidad 3',
      contenido: 'Estimados estudiantes, se ha subido el material de la Unidad 3: Análisis Financiero. El material incluye diapositivas, lecturas complementarias y ejercicios prácticos. Por favor revisen los documentos antes de la próxima clase del miércoles. Cualquier duda pueden consultarla en los comentarios de este anuncio.',
      autor: {
        nombre: 'DACIO LUIS DURAN CARDENAS',
        rol: 'profesor',
        avatar: 'https://ui-avatars.com/api/?name=Dacio+Duran&background=c53030&color=fff'
      },
      curso: 'EVALUACIÓN DE PROYECTOS',
      fechaPublicacion: '2025-09-19T14:30:00Z',
      prioridad: 'media',
      leido: false,
      archivosAdjuntos: [
        {
          nombre: 'Unidad_3_Analisis_Financiero.pdf',
          url: '#',
          tipo: 'application/pdf'
        },
        {
          nombre: 'Ejercicios_Practicos_U3.xlsx',
          url: '#',
          tipo: 'application/vnd.ms-excel'
        }
      ],
      comentariosCount: 5
    },
    {
      id: '2',
      titulo: 'Cambio de modalidad para la próxima clase',
      contenido: 'Debido a dificultades técnicas en el aula virtual, la clase del viernes 22 de septiembre se realizará de manera presencial en el Aula 301. La hora se mantiene de 21:00 a 22:40. Por favor confirmen su asistencia.',
      autor: {
        nombre: 'DACIO LUIS DURAN CARDENAS',
        rol: 'profesor',
        avatar: 'https://ui-avatars.com/api/?name=Dacio+Duran&background=c53030&color=fff'
      },
      curso: 'EVALUACIÓN DE PROYECTOS',
      fechaPublicacion: '2025-09-18T16:45:00Z',
      prioridad: 'alta',
      leido: true,
      comentariosCount: 12
    },
    {
      id: '3',
      titulo: 'Extensión de fecha para entrega del Proyecto Final',
      contenido: 'Considerando las consultas recibidas y la complejidad del proyecto final, se extiende la fecha de entrega hasta el 30 de septiembre a las 23:59. Recuerden que el proyecto debe incluir todos los componentes mencionados en el sílabo.',
      autor: {
        nombre: 'ULISES FIDEL PERLA CAMACHO',
        rol: 'profesor',
        avatar: 'https://ui-avatars.com/api/?name=Ulises+Perla&background=059669&color=fff'
      },
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      fechaPublicacion: '2025-09-17T12:20:00Z',
      fechaModificacion: '2025-09-17T15:30:00Z',
      prioridad: 'alta',
      leido: true,
      comentariosCount: 8
    },
    {
      id: '4',
      titulo: 'Invitación a conferencia: "Tendencias en Gestión Estratégica 2025"',
      contenido: 'Los invito a participar en la conferencia virtual "Tendencias en Gestión Estratégica 2025" que se realizará el 25 de septiembre a las 18:00. La conferencia cuenta con ponentes internacionales y otorga certificado de participación. El enlace se enviará por correo.',
      autor: {
        nombre: 'ULISES FIDEL PERLA CAMACHO',
        rol: 'profesor',
        avatar: 'https://ui-avatars.com/api/?name=Ulises+Perla&background=059669&color=fff'
      },
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      fechaPublicacion: '2025-09-16T09:15:00Z',
      prioridad: 'baja',
      leido: false,
      comentariosCount: 3
    }
  ]);

  const [filtro, setFiltro] = useState<'todos' | 'no-leidos' | 'prioritarios'>('todos');
  const [busqueda, setBusqueda] = useState('');
  const [anuncioExpandido, setAnuncioExpandido] = useState<string | null>(null);
  const [comentariosPorAnuncio, setComentariosPorAnuncio] = useState<{[key: string]: Comentario[]}>({});

  const anunciosFiltrados = anuncios.filter(anuncio => {
    const cumpleBusqueda = anuncio.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          anuncio.contenido.toLowerCase().includes(busqueda.toLowerCase()) ||
                          anuncio.autor.nombre.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleFiltro = filtro === 'todos' || 
                        (filtro === 'no-leidos' && !anuncio.leido) ||
                        (filtro === 'prioritarios' && anuncio.prioridad === 'alta');
    
    return cumpleBusqueda && cumpleFiltro;
  });

  const marcarComoLeido = (id: string) => {
    setAnuncios(prev => 
      prev.map(anuncio => 
        anuncio.id === id ? { ...anuncio, leido: true } : anuncio
      )
    );
  };

  const toggleExpansion = (id: string) => {
    if (anuncioExpandido === id) {
      setAnuncioExpandido(null);
    } else {
      setAnuncioExpandido(id);
      marcarComoLeido(id);
    }
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getColorPrioridad = (prioridad: string) => {
    switch (prioridad) {
      case 'alta': return '#dc2626';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const manejarAgregarComentario = (anuncioId: string, contenido: string, padreId?: string) => {
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

    setComentariosPorAnuncio(prev => {
      const comentariosActuales = prev[anuncioId] || [];
      
      if (padreId) {
        const comentariosActualizados = comentariosActuales.map(comentario => {
          if (comentario.id === padreId) {
            return {
              ...comentario,
              respuestas: [...(comentario.respuestas || []), nuevoComentario]
            };
          }
          return comentario;
        });
        return { ...prev, [anuncioId]: comentariosActualizados };
      } else {
        return { ...prev, [anuncioId]: [...comentariosActuales, nuevoComentario] };
      }
    });

    // Actualizar contador de comentarios
    setAnuncios(prev => 
      prev.map(anuncio => 
        anuncio.id === anuncioId 
          ? { ...anuncio, comentariosCount: anuncio.comentariosCount + 1 }
          : anuncio
      )
    );
  };

  const manejarLike = (anuncioId: string, comentarioId: string) => {
    setComentariosPorAnuncio(prev => {
      const comentariosActuales = prev[anuncioId] || [];
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
      return { ...prev, [anuncioId]: comentariosActualizados };
    });
  };

  const anunciosNoLeidos = anuncios.filter(a => !a.leido).length;

  return (
    <div className="anuncios-curso">
      {/* Header */}
      <div className="anuncios-header">
        <div className="header-info">
          <FaBullhorn className="header-icon" />
          <div>
            <h1>Anuncios del Curso</h1>
            <p>{anunciosNoLeidos} anuncios no leídos</p>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="anuncios-controles">
        <div className="busqueda">
          <FaSearch className="search-icon" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar anuncios..."
          />
        </div>
        
        <div className="filtros">
          <FaFilter className="filter-icon" />
          <select value={filtro} onChange={(e) => setFiltro(e.target.value as any)}>
            <option value="todos">Todos ({anuncios.length})</option>
            <option value="no-leidos">No leídos ({anunciosNoLeidos})</option>
            <option value="prioritarios">Prioritarios ({anuncios.filter(a => a.prioridad === 'alta').length})</option>
          </select>
        </div>
      </div>

      {/* Lista de anuncios */}
      <div className="anuncios-lista">
        {anunciosFiltrados.length === 0 ? (
          <div className="sin-anuncios">
            <FaBullhorn className="icon-empty" />
            <p>No se encontraron anuncios</p>
            <span className="hint">
              {busqueda ? 'Intenta con otros términos de búsqueda' : 'No hay anuncios disponibles'}
            </span>
          </div>
        ) : (
          anunciosFiltrados.map((anuncio) => (
            <div 
              key={anuncio.id} 
              className={`anuncio-card ${!anuncio.leido ? 'no-leido' : ''}`}
            >
              {/* Header del anuncio */}
              <div className="anuncio-header">
                <div className="anuncio-info">
                  <div className="autor-info">
                    <img src={anuncio.autor.avatar} alt={anuncio.autor.nombre} className="autor-avatar" />
                    <div className="autor-detalles">
                      <h3 className="autor-nombre">{anuncio.autor.nombre}</h3>
                      <span className="autor-rol">{anuncio.autor.rol === 'profesor' ? 'Profesor' : 'Administrativo'}</span>
                    </div>
                  </div>
                  <div className="anuncio-meta">
                    <span className="curso-badge">{anuncio.curso}</span>
                    <div className="fecha-info">
                      <FaCalendarAlt />
                      <span>{formatearFecha(anuncio.fechaPublicacion)}</span>
                      {anuncio.fechaModificacion && (
                        <span className="modificado">(editado)</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="anuncio-controles-header">
                  <span 
                    className="prioridad-badge"
                    style={{ backgroundColor: getColorPrioridad(anuncio.prioridad) }}
                  >
                    {anuncio.prioridad.toUpperCase()}
                  </span>
                  <button
                    className="btn-leido"
                    onClick={(e) => {
                      e.stopPropagation();
                      marcarComoLeido(anuncio.id);
                    }}
                    title={anuncio.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                  >
                    {anuncio.leido ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </div>

              {/* Título y contenido */}
              <div className="anuncio-contenido" onClick={() => toggleExpansion(anuncio.id)}>
                <h2 className="anuncio-titulo">{anuncio.titulo}</h2>
                <p className={`anuncio-texto ${anuncioExpandido === anuncio.id ? 'expandido' : ''}`}>
                  {anuncio.contenido}
                </p>
                
                {!anuncio.leido && <span className="indicador-no-leido">NUEVO</span>}
              </div>

              {/* Archivos adjuntos */}
              {anuncio.archivosAdjuntos && anuncio.archivosAdjuntos.length > 0 && (
                <div className="archivos-adjuntos">
                  <h4>Archivos adjuntos:</h4>
                  {anuncio.archivosAdjuntos.map((archivo, index) => (
                    <a key={index} href={archivo.url} className="archivo-link">
                      📎 {archivo.nombre}
                    </a>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="anuncio-footer">
                <span className="comentarios-info">
                  💬 {anuncio.comentariosCount} comentarios
                </span>
                <button 
                  className="btn-comentarios"
                  onClick={() => toggleExpansion(anuncio.id)}
                >
                  {anuncioExpandido === anuncio.id ? 'Ocultar comentarios' : 'Ver comentarios'}
                </button>
              </div>

              {/* Comentarios expandidos */}
              {anuncioExpandido === anuncio.id && (
                <div className="comentarios-seccion">
                  <ComentariosList
                    comentarios={comentariosPorAnuncio[anuncio.id] || []}
                    onAgregarComentario={(contenido, padreId) => manejarAgregarComentario(anuncio.id, contenido, padreId)}
                    onLike={(comentarioId) => manejarLike(anuncio.id, comentarioId)}
                    placeholder={`Comentar sobre "${anuncio.titulo}"...`}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}