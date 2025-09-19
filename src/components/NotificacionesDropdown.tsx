import { useState, useRef, useEffect } from 'react';
import { FaBell, FaTimes, FaEye, FaTrash, FaClock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'tarea' | 'anuncio' | 'calificacion' | 'recordatorio' | 'sistema';
  fechaCreacion: string;
  leida: boolean;
  prioridad: 'alta' | 'media' | 'baja';
  enlace?: string;
  curso?: string;
}

interface NotificacionesDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificacionesDropdown({ isOpen, onClose }: NotificacionesDropdownProps) {
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: '1',
      titulo: 'Nueva tarea asignada',
      mensaje: 'Se ha asignado una nueva tarea en EVALUACIÓN DE PROYECTOS: "Proyecto Final - Evaluación de Inversión"',
      tipo: 'tarea',
      fechaCreacion: '2025-09-19T14:30:00Z',
      leida: false,
      prioridad: 'alta',
      curso: 'EVALUACIÓN DE PROYECTOS',
      enlace: '/estudiante/tareas'
    },
    {
      id: '2',
      titulo: 'Calificación disponible',
      mensaje: 'Ya está disponible la calificación de tu examen parcial en PLANEAMIENTO Y GESTIÓN ESTRATÉGICA (17/20)',
      tipo: 'calificacion',
      fechaCreacion: '2025-09-19T10:15:00Z',
      leida: false,
      prioridad: 'media',
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      enlace: '/estudiante/tareas'
    },
    {
      id: '3',
      titulo: 'Recordatorio de clase',
      mensaje: 'Tu clase "Estrategias de Marketing Digital" comienza en 30 minutos',
      tipo: 'recordatorio',
      fechaCreacion: '2025-09-19T18:30:00Z',
      leida: true,
      prioridad: 'alta',
      curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
      enlace: '/estudiante/clases'
    },
    {
      id: '4',
      titulo: 'Nuevo anuncio del profesor',
      mensaje: 'DACIO LUIS DURAN CARDENAS ha publicado nuevo material de estudio para la Unidad 3',
      tipo: 'anuncio',
      fechaCreacion: '2025-09-19T08:45:00Z',
      leida: true,
      prioridad: 'media',
      curso: 'EVALUACIÓN DE PROYECTOS'
    },
    {
      id: '5',
      titulo: 'Mantenimiento programado',
      mensaje: 'El sistema estará en mantenimiento el sábado de 2:00 AM a 6:00 AM',
      tipo: 'sistema',
      fechaCreacion: '2025-09-18T16:00:00Z',
      leida: false,
      prioridad: 'baja'
    }
  ]);

  const [filtro, setFiltro] = useState<'todas' | 'no-leidas'>('todas');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const notificacionesFiltradas = notificaciones.filter(notif => 
    filtro === 'todas' || !notif.leida
  );

  const notificacionesNoLeidas = notificaciones.filter(notif => !notif.leida).length;

  const marcarComoLeida = (id: string) => {
    setNotificaciones(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, leida: true } : notif
      )
    );
  };

  const marcarTodasComoLeidas = () => {
    setNotificaciones(prev => 
      prev.map(notif => ({ ...notif, leida: true }))
    );
  };

  const eliminarNotificacion = (id: string) => {
    setNotificaciones(prev => prev.filter(notif => notif.id !== id));
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    const diferencia = ahora.getTime() - fechaObj.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias} días`;
    return fechaObj.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const getIconoTipo = (tipo: Notificacion['tipo']) => {
    switch (tipo) {
      case 'tarea': return <FaExclamationCircle className="notif-icon tarea" />;
      case 'anuncio': return <FaBell className="notif-icon anuncio" />;
      case 'calificacion': return <FaCheckCircle className="notif-icon calificacion" />;
      case 'recordatorio': return <FaClock className="notif-icon recordatorio" />;
      case 'sistema': return <FaExclamationCircle className="notif-icon sistema" />;
      default: return <FaBell className="notif-icon" />;
    }
  };

  const getColorPrioridad = (prioridad: Notificacion['prioridad']) => {
    switch (prioridad) {
      case 'alta': return '#dc2626';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="notificaciones-overlay">
      <div className="notificaciones-dropdown" ref={dropdownRef}>
        {/* Header */}
        <div className="notificaciones-header">
          <div className="header-info">
            <h3>Notificaciones</h3>
            {notificacionesNoLeidas > 0 && (
              <span className="badge-count">{notificacionesNoLeidas}</span>
            )}
          </div>
          <button className="btn-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Filtros y acciones */}
        <div className="notificaciones-controles">
          <div className="filtros">
            <button 
              className={`filtro-btn ${filtro === 'todas' ? 'activo' : ''}`}
              onClick={() => setFiltro('todas')}
            >
              Todas
            </button>
            <button 
              className={`filtro-btn ${filtro === 'no-leidas' ? 'activo' : ''}`}
              onClick={() => setFiltro('no-leidas')}
            >
              No leídas ({notificacionesNoLeidas})
            </button>
          </div>
          
          {notificacionesNoLeidas > 0 && (
            <button 
              className="btn-marcar-todas"
              onClick={marcarTodasComoLeidas}
            >
              <FaEye />
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Lista de notificaciones */}
        <div className="notificaciones-lista">
          {notificacionesFiltradas.length === 0 ? (
            <div className="sin-notificaciones">
              <FaBell className="icon-empty" />
              <p>No hay notificaciones</p>
              <span className="hint">
                {filtro === 'no-leidas' 
                  ? 'Todas las notificaciones han sido leídas' 
                  : 'Te notificaremos cuando haya actividad nueva'
                }
              </span>
            </div>
          ) : (
            notificacionesFiltradas.map((notificacion) => (
              <div 
                key={notificacion.id} 
                className={`notificacion-item ${!notificacion.leida ? 'no-leida' : ''}`}
                onClick={() => !notificacion.leida && marcarComoLeida(notificacion.id)}
              >
                {/* Indicador de prioridad */}
                <div 
                  className="prioridad-indicator"
                  style={{ backgroundColor: getColorPrioridad(notificacion.prioridad) }}
                />
                
                {/* Contenido */}
                <div className="notificacion-contenido">
                  <div className="notif-header">
                    {getIconoTipo(notificacion.tipo)}
                    <div className="notif-meta">
                      <h4 className="notif-titulo">{notificacion.titulo}</h4>
                      <span className="notif-fecha">
                        {formatearFecha(notificacion.fechaCreacion)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="notif-mensaje">{notificacion.mensaje}</p>
                  
                  {notificacion.curso && (
                    <span className="notif-curso">{notificacion.curso}</span>
                  )}
                </div>

                {/* Acciones */}
                <div className="notificacion-acciones">
                  {!notificacion.leida && (
                    <button 
                      className="btn-marcar-leida"
                      onClick={(e) => {
                        e.stopPropagation();
                        marcarComoLeida(notificacion.id);
                      }}
                      title="Marcar como leída"
                    >
                      <FaEye />
                    </button>
                  )}
                  <button 
                    className="btn-eliminar"
                    onClick={(e) => {
                      e.stopPropagation();
                      eliminarNotificacion(notificacion.id);
                    }}
                    title="Eliminar notificación"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notificacionesFiltradas.length > 0 && (
          <div className="notificaciones-footer">
            <button className="btn-ver-todas">
              Ver todas las notificaciones
            </button>
          </div>
        )}
      </div>
    </div>
  );
}