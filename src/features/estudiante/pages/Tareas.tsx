import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import TareaCard from './TareaCard';
import TareaCardSkeleton from './TareaCardSkeleton';
import { FaSearch } from 'react-icons/fa';
import '../css/Tareas.css';
import TituloPage from '../../../components/pages/TituloPage';
import { getConteoTareas, getTodasLasTareas } from '../../../api/classroom';

export interface ConteoTareas {
  pendientes: number;
  entregadas: number;
  en_revision: number;
  calificadas: number;
}

interface ArchivoEntrega {
  id: string;
  nombre: string;
  tipo?: 'drive' | 'link' | 'youtube' | 'form' | string;
  url?: string;
  link?: string;
  drive_id?: string;
  tamaño?: number;
  tamano?: number;
  size_bytes?: number;
  fechaSubida?: string;
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia?: string;
  profesor?: string;
  fechaEntrega?: string | null;
  fechaPublicacion?: string | null;
  estado: 'pendiente' | 'entregada' | 'revision' | 'calificada';
  nota?: number;
  comentarios?: string;
  archivosEntregados?: ArchivoEntrega[];
  tipoEntrega: 'archivo' | 'texto' | 'enlace';
  formatosPermitidos?: string[];
  tamanosMaximo?: number;
  permitirEntregaTardia?: boolean;
  link_tarea?: string;
}

const pickFirst = (obj: any, keys: string[], fallback: any = undefined) => {
  if (!obj) return fallback;
  for (const k of keys) {
    const v = obj[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return fallback;
};

const mapApiToTarea = (item: any): Tarea => {
  const rawFiles = item.archivos ?? item.files ?? item.attachments ?? item.submission_files ?? [];

  const normalizeFile = (f: any, idx: number) => {
    const id = pickFirst(f, ['id', 'fileId', 'drive_id', 'driveId', 'submission_id', 'submissionId'], idx);
    const nombre = pickFirst(f, ['titulo', 'nombre', 'name', 'title', 'filename'], 'Archivo');
    const url = pickFirst(f, ['url', 'link', 'alternateLink', 'downloadUrl', 'webViewLink', 'webContentLink'], undefined);
    const driveId = pickFirst(f, ['drive_id', 'driveId'], undefined);

    const sizeMbField = pickFirst(f, ['tamaño', 'tamano', 'size_mb', 'sizeMb'], undefined);
    const sizeBytesField = pickFirst(f, ['size_bytes', 'sizeBytes', 'bytes'], undefined);
    let sizeMb: number | string | undefined;

    const fechaSubida = pickFirst(f, ['fechaSubida', 'submitted_at', 'uploaded_at', 'fecha_subida'], '');

    return {
      id: String(id),
      nombre,
      tipo: pickFirst(f, ['tipo', 'type', 'mimeType', 'mime_type'], 'file'),
      url,
      link: url,
      drive_id: driveId,
      tamaño: sizeMb,
      tamano: sizeMb,
      size_bytes: typeof sizeBytesField === 'number' ? sizeBytesField : (sizeBytesField ? Number(sizeBytesField) : undefined),
      fechaSubida
    } as ArchivoEntrega;
  };

  const archivosEntregados: ArchivoEntrega[] = (rawFiles as any[]).map((f: any, idx: number) => normalizeFile(f, idx));

  const rawEstado = (item.estado ?? '').toString().toLowerCase();
  const estado: Tarea['estado'] =
    rawEstado.includes('entreg') ? 'entregada' :
    rawEstado.includes('revision') || rawEstado.includes('returned') ? 'revision' :
    rawEstado.includes('calific') || rawEstado.includes('graded') ? 'calificada' :
    'pendiente';

  const tareaId = Number(pickFirst(item, ['tarea_id', 'id', 'tareaId'], 0)) || 0;
  const titulo = pickFirst(item, ['titulo', 'title'], 'Sin título');
  const descripcion = pickFirst(item, ['descripcion', 'description'], '');
  const materia = pickFirst(item, ['curso_nombre', 'nombre_curso', 'materia'], '');
  const profesor = pickFirst(item, ['docente', 'profesor', 'correo_docente'], '');
  const fechaEntrega = pickFirst(item, ['fecha_entrega', 'fechaEntrega'], null);
  const fechaPublicacion = pickFirst(item, ['fecha_publicacion', 'fechaPublicacion', 'creationTime'], null);
  const notaRaw = pickFirst(item, ['nota', 'grade', 'calificacion'], undefined);
  const nota = notaRaw !== undefined && notaRaw !== null ? Number(notaRaw) : undefined;
  const comentarios = pickFirst(item, ['comentarios', 'feedback', 'observaciones'], '');

  const linkTarea = pickFirst(item, ['link', 'url', 'classroomUrl', 'htmlUrl', 'alternateLink', 'task_url', 'taskLink', 'link_tarea'], undefined);

  return {
    id: tareaId,
    titulo,
    descripcion,
    materia,
    profesor,
    fechaEntrega,
    fechaPublicacion,
    estado,
    nota,
    comentarios,
    archivosEntregados,
    tipoEntrega: 'archivo',
    link_tarea: typeof linkTarea === 'string' && linkTarea.trim() ? linkTarea.trim() : undefined
  };
};

export default function Tareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  const [displayedTareas, setDisplayedTareas] = useState<Tarea[]>([]);
  const [itemsToShow, setItemsToShow] = useState(15);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement | null>(null);

  const [conteo, setConteo] = useState<ConteoTareas | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Refs para mantener valores estables y evitar recrear observers en bucle
  const loadingMoreRef = useRef<boolean>(false);
  const hasMoreRef = useRef<boolean>(true);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchTareas = async (estado?: string) => {
    setLoadingTasks(true);
    try {
      const res = await getTodasLasTareas(estado && estado !== 'todas' ? estado : undefined);
      const mapped = (res as any[]).map(mapApiToTarea);
      setTareas(mapped);
      setItemsToShow(15);
      setError(null);
    } catch (err) {
      console.error('Error cargando tareas:', err);
      setError('No se pudo cargar la lista de tareas.');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // Inicializar con valores por defecto para no bloquear
    setConteo({
      pendientes: 0,
      entregadas: 0,
      en_revision: 0,
      calificadas: 0
    });

    Promise.all([getConteoTareas(), getTodasLasTareas()])
      .then(([cnt, tareasApi]) => {
        if (!mounted) return;
        setConteo(cnt);
        setTareas((tareasApi as any[]).map(mapApiToTarea));
      })
      .catch((err) => {
        console.error('Error carga inicial tareas/conteo:', err);
        if (mounted) {
          setError('Error cargando datos desde el servidor.');
          // Mantener valores por defecto en caso de error
          setConteo({
            pendientes: 0,
            entregadas: 0,
            en_revision: 0,
            calificadas: 0
          });
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const handleFiltroEstadoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const estado = e.target.value;
    setFiltroEstado(estado);
    fetchTareas(estado === 'todas' ? undefined : estado);
  };

  const tareasFiltradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return tareas.filter(tarea => {
      const cumpleBusqueda = !q || tarea.titulo.toLowerCase().includes(q) ||
        (tarea.materia && tarea.materia.toLowerCase().includes(q)) ||
        (tarea.profesor && tarea.profesor.toLowerCase().includes(q));
      const cumpleEstado = filtroEstado === 'todas' || tarea.estado === filtroEstado;
      return cumpleBusqueda && cumpleEstado;
    });
  }, [tareas, busqueda, filtroEstado]);

  // Actualiza la lista mostrada y el estado/ref de "hasMore" en un único efecto
  useEffect(() => {
    const newDisplayed = tareasFiltradas.slice(0, itemsToShow);
    setDisplayedTareas(newDisplayed);
    const more = itemsToShow < tareasFiltradas.length;
    setHasMore(more);
    hasMoreRef.current = more;
  }, [tareasFiltradas, itemsToShow]);

  const loadMore = useCallback(() => {
    if (loadingMoreRef.current || !hasMoreRef.current) return;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    setTimeout(() => {
      setItemsToShow(prev => prev + 15);
      loadingMoreRef.current = false;
      setLoadingMore(false);
    }, 400);
  }, []); // función estable (no depende de estado directo)

  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    // crear observer y guardarlo para poder desconectarlo correctamente
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMoreRef.current && !loadingMoreRef.current) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(currentTarget);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [loadMore]);
 
  // Valores por defecto mientras carga
  const contadores = conteo ? {
    pendientes: conteo.pendientes,
    entregadas: conteo.entregadas,
    revision: conteo.en_revision,
    calificadas: conteo.calificadas
  } : {
    pendientes: 0,
    entregadas: 0,
    revision: 0,
    calificadas: 0
  };
 
  return (
    <div className="tareas-page">
      <TituloPage titulo="Mis Tareas" />
      <p className="page-subtitle">Gestiona y sigue el progreso de tus asignaciones académicas</p>

      {/* Estadísticas - siempre visibles */}
      <div className="tareas-stats">
        {loading ? (
          // Skeleton para stats durante carga inicial
          [1, 2, 3, 4].map(i => (
            <div key={i} className="stat-card" style={{ opacity: 0.6 }}>
              <div className="skeleton" style={{ height: 32, width: 60, marginBottom: 8 }} />
              <div className="skeleton" style={{ height: 16, width: 80 }} />
            </div>
          ))
        ) : (
          <>
            <div className="stat-card pendientes">
              <span className="stat-number">{contadores.pendientes}</span>
              <span className="stat-label">Pendientes</span>
            </div>
            <div className="stat-card entregadas">
              <span className="stat-number">{contadores.entregadas}</span>
              <span className="stat-label">Entregadas</span>
            </div>
            <div className="stat-card revision">
              <span className="stat-number">{contadores.revision}</span>
              <span className="stat-label">En Revisión</span>
            </div>
            <div className="stat-card calificadas">
              <span className="stat-number">{contadores.calificadas}</span>
              <span className="stat-label">Calificadas</span>
            </div>
          </>
        )}
      </div>

      {/* Filtros - siempre activos */}
      <div className="tareas-filtros">
        <div className="filtros-busqueda">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div className="filtros-dropdown">
          <div className="filter-group">
            <select
              value={filtroEstado}
              onChange={handleFiltroEstadoChange}
              disabled={loading}
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="entregada">Entregadas</option>
              <option value="revision">En Revisión</option>
              <option value="calificada">Calificadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de tareas */}
      <div className="tareas-lista">
        {error && !loading && (
          <div className="error-message" style={{ padding: 20, textAlign: 'center', color: 'var(--error-color, #c00)' }}>
            {error}
          </div>
        )}

        {loading || loadingTasks ? (
          // Skeleton durante carga inicial o cambio de filtro
          <TareaCardSkeleton count={6} />
        ) : displayedTareas.length > 0 ? (
          <>
            {displayedTareas.map(tarea => (
              <TareaCard key={String(tarea.id)} tarea={tarea as any} />
            ))}

            <div ref={observerTarget} style={{ height: 20, width: '100%' }} />

            {loadingMore && (
              <div className="loader-container" style={{ padding: 20, textAlign: 'center' }}>
                <TareaCardSkeleton count={3} />
              </div>
            )}

            {tareasFiltradas.length > 15 && (
              <div className="tareas-progress">
                Mostrando {displayedTareas.length} de {tareasFiltradas.length} tareas
              </div>
            )}
          </>
        ) : (
          <div className="no-tareas">
            <p>No se encontraron tareas que coincidan con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}