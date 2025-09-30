import { useState } from 'react';
import CursoCard from './CursoCard';
import EventoBanner from './EventoBanner';
import CalendarioAgenda from './CalendarioAgenda';
import '../css/CursoCard.css';
import '../css/EventoBanner.css';
import '../css/CalendarioAgenda.css';
import '../css/inicioEstudiante.css';

export default function InicioEstudiante() {
  const [pestanaActiva, setPestanaActiva] = useState<'cursos' | 'stream'>('cursos');


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
      </div>

      {/* Contenido según pestaña activa */}
        <div className="dashboard-grid">

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
            
            <CalendarioAgenda />
        </div>
      </div>
    </div>
  );
}
