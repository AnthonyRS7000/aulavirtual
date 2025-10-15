import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import '../css/CalendarioAgenda.css';
interface EventoAgenda {
  id: string;
  hora: string;
  titulo: string;
  ubicacion?: string;
  descripcion?: string;
  tipo: 'evento' | 'clase' | 'reunion';
  color: string;
}

export default function CalendarioAgenda() {
  const [fechaActual, setFechaActual] = useState(new Date());
  const [eventos, setEventos] = useState<EventoAgenda[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar eventos de Google Calendar
  const cargarEventosGoogleCalendar = async () => {
    setCargando(true);
    setError(null);
    
    try {
      // Aquí irá la integración real con Google Calendar API
      // Por ahora, simulamos datos de ejemplo
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular carga
      
      const eventosEjemplo: EventoAgenda[] = [
        {
          id: '1',
          hora: '08:00 - 10:00',
          titulo: 'Desarrollo de Software III',
          ubicacion: 'Laboratorio A-201',
          descripcion: 'Clase sobre patrones de diseño',
          tipo: 'clase',
          color: '#3b82f6'
        },
        {
          id: '2',
          hora: '10:30 - 12:30',
          titulo: 'Inteligencia Artificial',
          ubicacion: 'Aula Virtual',
          descripcion: 'Algoritmos de machine learning',
          tipo: 'clase',
          color: '#10b981'
        },
        {
          id: '3',
          hora: '14:00 - 15:00',
          titulo: 'Reunión con Asesor de Tesis',
          ubicacion: 'Oficina 302',
          descripcion: 'Revisión del avance del proyecto',
          tipo: 'reunion',
          color: '#f59e0b'
        },
        {
          id: '4',
          hora: '16:00 - 18:00',
          titulo: 'Seminario de Investigación',
          ubicacion: 'Auditorio Principal',
          descripcion: 'Presentación de trabajos de investigación',
          tipo: 'evento',
          color: '#ef4444'
        }
      ];
      
      setEventos(eventosEjemplo);
    } catch (err) {
      setError('Error al cargar eventos del calendario');
      console.error('Error cargando eventos:', err);
    } finally {
      setCargando(false);
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    cargarEventosGoogleCalendar();
  }, [fechaActual]);

  // Navegación de fechas
  const navegarFecha = (direccion: 'anterior' | 'siguiente') => {
    const nuevaFecha = new Date(fechaActual);
    if (direccion === 'anterior') {
      nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    } else {
      nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    }
    setFechaActual(nuevaFecha);
  };

  const irAHoy = () => {
    setFechaActual(new Date());
  };

  // Formatear fecha
  const formatearFecha = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const obtenerDiaSemana = (fecha: Date) => {
    return fecha.toLocaleDateString('es-ES', { weekday: 'long' });
  };
  return (
    <div className="calendario-agenda">
      {/* Header del calendario */}
      <div className="calendario-header">
        <div className="fecha-navegacion">
          <button className="nav-btn" onClick={() => navegarFecha('anterior')}>
            <FaChevronLeft />
          </button>
          <div className="fecha-actual">
            <button className="fecha-hoy" onClick={irAHoy}>Hoy</button>
            <h3 className="fecha-completa">{formatearFecha(fechaActual)}</h3>
          </div>
          <button className="nav-btn" onClick={() => navegarFecha('siguiente')}>
            <FaChevronRight />
          </button>
        </div>
        
        <div className="dia-semana">
          <span className="dia-link">{obtenerDiaSemana(fechaActual)}</span>
        </div>
      </div>

      {/* Estado de carga */}
      {cargando && (
        <div className="carga-eventos">
          <FaSpinner className="spinner" />
          <p>Cargando eventos de Google Calendar...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="error-eventos">
          <FaCalendarAlt />
          <p>{error}</p>
          <button onClick={cargarEventosGoogleCalendar}>Reintentar</button>
        </div>
      )}

      {/* Lista de eventos */}
      {!cargando && !error && (
        <div className="agenda-lista">
          {eventos.length === 0 ? (
            <div className="sin-eventos">
              <FaCalendarAlt />
              <p>No hay eventos programados para esta fecha</p>
            </div>
          ) : (
            eventos.map((evento) => (
              <div key={evento.id} className={`agenda-item ${evento.tipo}`}>
                <div className="evento-hora">
                  {evento.hora}
                </div>
                <div className="evento-info">
                  <div 
                    className="evento-indicador"
                    style={{ backgroundColor: evento.color }}
                  ></div>
                  <div className="evento-detalles">
                    <h4 className="evento-titulo">{evento.titulo}</h4>
                    {evento.ubicacion && (
                      <div className="evento-ubicacion">
                        📍 {evento.ubicacion}
                      </div>
                    )}
                    {evento.descripcion && (
                      <div className="evento-descripcion">
                        {evento.descripcion}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Botón para sincronizar */}
      <div className="calendario-acciones">
        <button 
          className="btn-sincronizar"
          onClick={cargarEventosGoogleCalendar}
          disabled={cargando}
        >
          {cargando ? <FaSpinner className="spinner" /> : <FaCalendarAlt />}
          Sincronizar con Google Calendar
        </button>
      </div>
    </div>
  );
}