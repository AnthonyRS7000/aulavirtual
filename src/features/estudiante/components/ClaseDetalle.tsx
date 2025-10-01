import { Link } from 'react-router-dom';
import './ClaseDetalle.css';
import { useEffect, useRef, useState } from 'react';

export default function ClaseDetalle() {
  const [activeTab, setActiveTab] = useState<'tablon' | 'trabajo' | 'personas'>('tablon');

  // Simulación de fetching y cache local (reemplazar por React Query o fetch real)
  type Post = { id: string; title: string; date: string; icon?: string };
  type Tarea = { id: string; title: string; due?: string; estado?: string };
  type Persona = { id: string; nombre: string; rol: string };

  const mockData = useRef({
    tablon: null as null | Post[],
    trabajo: null as null | Tarea[],
    personas: null as null | Persona[],
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Post[] | Tarea[] | Persona[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Helper para seleccionar pestaña limpiando el estado previo
  const selectTab = (tab: 'tablon' | 'trabajo' | 'personas') => {
    setData(null);
    setError(null);
    setActiveTab(tab);
  };

  // Mock fetcher con delay
  function fetchTab(tab: 'tablon' | 'trabajo' | 'personas'): Promise<Post[] | Tarea[] | Persona[]> {
    return new Promise<Post[] | Tarea[] | Persona[]>((resolve) => {
      setTimeout(() => {
        if (tab === 'tablon') {
          resolve([
            { id: 'p1', title: 'Juan Peréz ha publicado nuevo material: SYLABUS', date: '8 sept', icon: '📄' },
            { id: 'p2', title: 'Recordatorio: Evaluación parcial el próximo lunes', date: 'hace 2 días', icon: '📢' },
          ] as Post[]);
        } else if (tab === 'trabajo') {
          resolve([
            { id: 't1', title: 'Tarea 1: Lectura Cap. 3', due: '15 sept', estado: 'Pendiente' },
            { id: 't2', title: 'Entrega: Proyecto final (grupo)', due: '30 sept', estado: 'En revisión' },
          ] as Tarea[]);
        } else {
          resolve([
            { id: 'u1', nombre: 'Germán Lenin Espinoza', rol: 'Docente' },
            { id: 'u2', nombre: 'María López', rol: 'Estudiante' },
            { id: 'u3', nombre: 'Carlos Ruiz', rol: 'Estudiante' },
          ] as Persona[]);
        }
      }, 500 + Math.random() * 400); // 500-900ms
    });
  }

  // carga de datos con cache simple
  useEffect(() => {
    let mounted = true;
    setError(null);
    async function load() {
      setLoading(true);
      // si ya lo tenemos en cache, usarlo
      const cached = mockData.current[activeTab];
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      try {
        const res = await fetchTab(activeTab);
        if (!mounted) return;
        mockData.current[activeTab] = res as any;
        setData(res as any);
      } catch (err) {
        if (!mounted) return;
        setError('Error cargando datos');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [activeTab]);

  // prefetch helper
  const prefetch = (tab: 'tablon' | 'trabajo' | 'personas') => {
    if (mockData.current[tab]) return;
    fetchTab(tab).then((res) => { mockData.current[tab] = res as any; }).catch(() => {});
  };

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
                onClick={() => selectTab('tablon')}
                onMouseEnter={() => prefetch('tablon')}
                className={activeTab === 'tablon' ? 'active' : ''}
              >
                Tablón
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'trabajo'}
                onClick={() => selectTab('trabajo')}
                onMouseEnter={() => prefetch('trabajo')}
                className={activeTab === 'trabajo' ? 'active' : ''}
              >
                Trabajo de clase
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'personas'}
                onClick={() => selectTab('personas')}
                onMouseEnter={() => prefetch('personas')}
                className={activeTab === 'personas' ? 'active' : ''}
              >
                Personas
              </button>
            </div>
            {/* Contenido por pestaña - mostramos loading, error o data */}
            {loading && (
              <div className="feed-post" style={{ justifyContent: 'center' }}>Cargando...</div>
            )}

            {error && (
              <div className="feed-post" style={{ justifyContent: 'center', color: 'var(--text)' }}>{error}</div>
            )}

            {!loading && !error && data && activeTab === 'tablon' && (
              (data as Post[]).map((p) => (
                <div key={p.id} className="feed-post">
                  <div className="feed-icon">{p.icon}</div>
                  <div className="feed-body">
                    <div className="feed-title">{p.title}</div>
                    <div className="feed-meta">{p.date}</div>
                  </div>
                  <div className="feed-actions">⋮</div>
                </div>
              ))
            )}

            {!loading && !error && data && activeTab === 'trabajo' && (
                (data as Tarea[]).map((t) => (
                <div key={t.id} className="feed-post">
                  <div className="feed-icon">📝</div>
                  <div className="feed-body">
                    <div className="feed-title">{t.title}</div>
                    <div className="feed-meta">{t.due} • {t.estado}</div>
                  </div>
                </div>
              ))
            )}

            {!loading && !error && data && activeTab === 'personas' && (
              ((data as Persona[]).length === 0) ? (
                <div className="feed-post" style={{ justifyContent: 'center' }}>Sin resultados</div>
              ) : (
                (data as Persona[]).map((u) => (
                  <div key={u.id} className="feed-post">
                    <div className="feed-icon">{u.nombre.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
                    <div className="feed-body">
                      <div className="feed-title">{u.nombre}</div>
                      <div className="feed-meta">{u.rol}</div>
                    </div>
                  </div>
                ))
              )
            )}

            {/* Fallback: si no hay loading, no error y tampoco data, indicar vacío */}
            {!loading && !error && !data && (
              <div className="feed-post" style={{ justifyContent: 'center' }}>Sin resultados</div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
