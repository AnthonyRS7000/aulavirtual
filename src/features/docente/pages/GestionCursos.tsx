import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  EyeIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import '../css/GestionCursos.css';

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  estudiantes: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'inactivo' | 'finalizado';
  color: string;
  tareas: number;
  clases: number;
}

const GestionCursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: 1,
      nombre: 'Evaluación de Proyectos',
      codigo: 'FC-SMVIBS-SP08C01N',
      descripcion: 'Curso enfocado en técnicas de evaluación económica y financiera de proyectos de inversión.',
      estudiantes: 45,
      fechaInicio: '2025-08-15',
      fechaFin: '2025-12-15',
      estado: 'activo',
      color: '#e74c3c',
      tareas: 8,
      clases: 32
    },
    {
      id: 2,
      nombre: 'Planeamiento y Gestión Estratégica',
      codigo: 'FC-SMVADM-SP09B01N',
      descripcion: 'Desarrollo de competencias en planificación estratégica empresarial.',
      estudiantes: 38,
      fechaInicio: '2025-08-20',
      fechaFin: '2025-12-20',
      estado: 'activo',
      color: '#27ae60',
      tareas: 6,
      clases: 28
    },
    {
      id: 3,
      nombre: 'Investigación de Mercados',
      codigo: 'FC-SMVMKT-SP07A01N',
      descripcion: 'Metodologías y técnicas para la investigación de mercados y comportamiento del consumidor.',
      estudiantes: 32,
      fechaInicio: '2025-07-10',
      fechaFin: '2025-11-10',
      estado: 'finalizado',
      color: '#3498db',
      tareas: 10,
      clases: 36
    }
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [cursoEditando, setCursoEditando] = useState<Curso | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo' | 'finalizado'>('todos');

  const cursosFiltrados = cursos.filter(curso => 
    filtroEstado === 'todos' || curso.estado === filtroEstado
  );

  const abrirModalCrear = () => {
    setCursoEditando(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (curso: Curso) => {
    setCursoEditando(curso);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setCursoEditando(null);
  };

  const eliminarCurso = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      setCursos(cursos.filter(curso => curso.id !== id));
    }
  };

  const getEstadoBadge = (estado: string) => {
    const clases = {
      activo: 'estado-activo',
      inactivo: 'estado-inactivo',
      finalizado: 'estado-finalizado'
    };
    return clases[estado as keyof typeof clases] || 'estado-inactivo';
  };

  return (
    <div className="gestion-cursos">
      <div className="gestion-container">
        
        {/* Header */}
        <div className="header-gestion">
          <div>
            <h1 className="titulo-gestion">Gestión de Cursos</h1>
            <p className="subtitulo-gestion">Administra tus cursos y contenidos académicos</p>
          </div>
          <button className="btn-crear-curso" onClick={abrirModalCrear}>
            <PlusIcon />
            Crear Nuevo Curso
          </button>
        </div>

        {/* Estadísticas */}
        <div className="estadisticas-cursos">
          <div className="stat-item">
            <AcademicCapIcon />
            <div>
              <h3>{cursos.length}</h3>
              <p>Total Cursos</p>
            </div>
          </div>
          <div className="stat-item">
            <AcademicCapIcon />
            <div>
              <h3>{cursos.filter(c => c.estado === 'activo').length}</h3>
              <p>Cursos Activos</p>
            </div>
          </div>
          <div className="stat-item">
            <UserGroupIcon />
            <div>
              <h3>{cursos.reduce((sum, c) => sum + c.estudiantes, 0)}</h3>
              <p>Total Estudiantes</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros-cursos">
          <div className="filtros-grupo">
            <label>Filtrar por estado:</label>
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value as any)}
              className="select-filtro"
            >
              <option value="todos">Todos los cursos</option>
              <option value="activo">Cursos activos</option>
              <option value="inactivo">Cursos inactivos</option>
              <option value="finalizado">Cursos finalizados</option>
            </select>
          </div>
        </div>

        {/* Grid de Cursos */}
        <div className="cursos-grid-gestion">
          {cursosFiltrados.map(curso => (
            <div key={curso.id} className="curso-card-gestion">
              <div className="curso-header-gestion" style={{ borderLeftColor: curso.color }}>
                <div className="curso-info-principal">
                  <h3>{curso.nombre}</h3>
                  <p className="curso-codigo-gestion">{curso.codigo}</p>
                  <span className={`estado-badge ${getEstadoBadge(curso.estado)}`}>
                    {curso.estado.charAt(0).toUpperCase() + curso.estado.slice(1)}
                  </span>
                </div>
                
                <div className="curso-acciones">
                  <button className="btn-accion" title="Ver detalles">
                    <EyeIcon />
                  </button>
                  <button className="btn-accion" onClick={() => abrirModalEditar(curso)} title="Editar">
                    <PencilIcon />
                  </button>
                  <button className="btn-accion" title="Configuración">
                    <Cog6ToothIcon />
                  </button>
                  <button 
                    className="btn-accion peligro" 
                    onClick={() => eliminarCurso(curso.id)}
                    title="Eliminar"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>

              <div className="curso-descripcion">
                <p>{curso.descripcion}</p>
              </div>

              <div className="curso-estadisticas">
                <div className="stat-curso">
                  <UserGroupIcon />
                  <span>{curso.estudiantes} estudiantes</span>
                </div>
                <div className="stat-curso">
                  <ClipboardDocumentListIcon />
                  <span>{curso.tareas} tareas</span>
                </div>
                <div className="stat-curso">
                  <CalendarDaysIcon />
                  <span>{curso.clases} clases</span>
                </div>
              </div>

              <div className="curso-fechas">
                <div className="fecha-item">
                  <span className="fecha-label">Inicio:</span>
                  <span>{new Date(curso.fechaInicio).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="fecha-item">
                  <span className="fecha-label">Fin:</span>
                  <span>{new Date(curso.fechaFin).toLocaleDateString('es-ES')}</span>
                </div>
              </div>

              <div className="curso-acciones-principales">
                <button className="btn-gestionar">
                  Gestionar Curso
                </button>
                <button className="btn-ver-estudiantes">
                  Ver Estudiantes
                </button>
              </div>
            </div>
          ))}
        </div>

        {cursosFiltrados.length === 0 && (
          <div className="sin-cursos">
            <AcademicCapIcon />
            <h3>No hay cursos</h3>
            <p>No se encontraron cursos con los filtros seleccionados.</p>
            <button className="btn-crear-curso" onClick={abrirModalCrear}>
              <PlusIcon />
              Crear tu primer curso
            </button>
          </div>
        )}

      </div>

      {/* Modal para crear/editar curso */}
      {mostrarModal && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{cursoEditando ? 'Editar Curso' : 'Crear Nuevo Curso'}</h2>
              <button className="btn-cerrar" onClick={cerrarModal}>×</button>
            </div>
            
            <form className="form-curso">
              <div className="form-grupo">
                <label>Nombre del curso</label>
                <input 
                  type="text" 
                  placeholder="Ej: Evaluación de Proyectos"
                  defaultValue={cursoEditando?.nombre || ''}
                />
              </div>
              
              <div className="form-grupo">
                <label>Código del curso</label>
                <input 
                  type="text" 
                  placeholder="Ej: FC-SMVIBS-SP08C01N"
                  defaultValue={cursoEditando?.codigo || ''}
                />
              </div>
              
              <div className="form-grupo">
                <label>Descripción</label>
                <textarea 
                  placeholder="Descripción del curso..."
                  defaultValue={cursoEditando?.descripcion || ''}
                  rows={4}
                />
              </div>
              
              <div className="form-fila">
                <div className="form-grupo">
                  <label>Fecha de inicio</label>
                  <input 
                    type="date"
                    defaultValue={cursoEditando?.fechaInicio || ''}
                  />
                </div>
                <div className="form-grupo">
                  <label>Fecha de fin</label>
                  <input 
                    type="date"
                    defaultValue={cursoEditando?.fechaFin || ''}
                  />
                </div>
              </div>
              
              <div className="form-grupo">
                <label>Color del curso</label>
                <input 
                  type="color"
                  defaultValue={cursoEditando?.color || '#3498db'}
                />
              </div>
              
              <div className="modal-acciones">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {cursoEditando ? 'Actualizar' : 'Crear'} Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionCursos;