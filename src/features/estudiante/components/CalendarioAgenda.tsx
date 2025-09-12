import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface EventoAgenda {
  hora: string;
  titulo: string;
  codigo?: string;
  tipo: 'evento' | 'clase';
}

interface CalendarioAgendaProps {
  fechaActual: string;
  eventos: EventoAgenda[];
}

export default function CalendarioAgenda({
  fechaActual,
  eventos
}: CalendarioAgendaProps) {
  return (
    <div className="calendario-agenda">
      {/* Header del calendario */}
      <div className="calendario-header">
        <div className="fecha-navegacion">
          <button className="nav-btn">
            <FaChevronLeft />
          </button>
          <div className="fecha-actual">
            <span className="fecha-hoy">Hoy</span>
            <h3 className="fecha-completa">{fechaActual}</h3>
          </div>
          <button className="nav-btn">
            <FaChevronRight />
          </button>
        </div>
        
        <div className="dia-semana">
          <span className="dia-link">viernes</span>
        </div>
      </div>

      {/* Lista de eventos */}
      <div className="agenda-lista">
        {eventos.map((evento, index) => (
          <div key={index} className={`agenda-item ${evento.tipo}`}>
            <div className="evento-hora">
              {evento.hora}
            </div>
            <div className="evento-info">
              <div className="evento-indicador"></div>
              <div className="evento-detalles">
                <h4 className="evento-titulo">{evento.titulo}</h4>
                {evento.codigo && (
                  <span className="evento-codigo">{evento.codigo}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}