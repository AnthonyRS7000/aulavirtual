import { Link } from 'react-router-dom';
import './ClaseDetalle.css';
import { useState } from 'react';

export default function ClaseDetalle() {
  const [activeTab, setActiveTab] = useState<'tablon' | 'trabajo' | 'personas'>('tablon');

  // Datos mock mínimos para mostrar la vista
  const curso = {
    nombre: 'DERECHO INFORMÁTICO Y ÉTICA PROFESIONAL',
    codigo: 'INF-206',
    docente: 'Juan Peréz',
    bannerImage: '/public/vite.svg' // fallback, el CSS usará un gradiente
  };

  return (
    <div className="clase-detalle-viewport">

      <main className="clase-main">
        <section className="clase-banner">
          <div className="banner-media">
            <div className="banner-overlay" />
            <div className="banner-content">
              <h1 className="curso-nombre">{curso.nombre}</h1>
              <div className="curso-meta">
              </div>
            </div>
            {/* Avatar del docente en la esquina derecha del banner */}
            <div className="banner-avatar" aria-hidden>
              {/* Si tuvieras una URL real la usarías en <img src=...> */}
              <div className="banner-avatar-img">JP</div>
            </div>
          </div>
        </section>

        <section className="clase-body">
          <aside className="clase-sidebar">
            <div className="card detalles-curso">
              <h4>Detalles</h4>
              <p><strong>Docente:</strong> {curso.docente}</p>
              <p><strong>Código:</strong> {curso.codigo}</p>
            </div>
          </aside>

          <section className="clase-feed">
            {/* Pestañas ahora dentro de la columna del feed para que compartan el mismo ancho */}
            <div className="clase-tabs" role="tablist" aria-label="Secciones del curso">
              <button
                role="tab"
                aria-selected={activeTab === 'tablon'}
                className={activeTab === 'tablon' ? 'active' : ''}
                onClick={() => setActiveTab('tablon')}
              >
                Tablón
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'trabajo'}
                className={activeTab === 'trabajo' ? 'active' : ''}
                onClick={() => setActiveTab('trabajo')}
              >
                Trabajo de clase
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'personas'}
                className={activeTab === 'personas' ? 'active' : ''}
                onClick={() => setActiveTab('personas')}
              >
                Personas
              </button>
            </div>

            <div className="feed-post crear-post">
              <div className="avatar">G</div>
              <input placeholder="Anuncia algo a tu clase" />
            </div>

            <div className="feed-post">
              <div className="feed-icon">📄</div>
              <div className="feed-body">
                <div className="feed-title">Juan Peréz ha publicado nuevo material: SYLABUS</div>
                <div className="feed-meta">8 sept</div>
              </div>
              <div className="feed-actions">⋮</div>
            </div>

            <div className="feed-post">
              <div className="feed-icon">📢</div>
              <div className="feed-body">
                <div className="feed-title">Recordatorio: Evaluación parcial el próximo lunes</div>
                <div className="feed-meta">hace 2 días</div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
