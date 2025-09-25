import React, { useState } from 'react';
import { 
  UserGroupIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  PencilIcon,
  EyeIcon,
  EnvelopeIcon,
  PhoneIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import '../css/GestionEstudiantes.css';

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  fechaIngreso: string;
  curso: string;
  estado: 'activo' | 'inactivo' | 'graduado' | 'suspendido';
  promedio: number;
  tareasCompletadas: number;
  totalTareas: number;
  avatar: string;
  ultimaActividad: string;
}

const GestionEstudiantes: React.FC = () => {
  const [estudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      nombre: 'María',
      apellido: 'González',
      email: 'maria.gonzalez@udh.edu.pe',
      telefono: '+51 987 654 321',
      fechaNacimiento: '1999-03-15',
      fechaIngreso: '2023-08-15',
      curso: 'Evaluación de Proyectos',
      estado: 'activo',
      promedio: 18.5,
      tareasCompletadas: 7,
      totalTareas: 8,
      avatar: 'MG',
      ultimaActividad: '2025-01-15T10:30:00'
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Rodríguez',
      email: 'carlos.rodriguez@udh.edu.pe',
      telefono: '+51 912 345 678',
      fechaNacimiento: '1998-07-22',
      fechaIngreso: '2023-08-20',
      curso: 'Planeamiento Estratégico',
      estado: 'activo',
      promedio: 16.8,
      tareasCompletadas: 5,
      totalTareas: 6,
      avatar: 'CR',
      ultimaActividad: '2025-01-14T16:45:00'
    },
    {
      id: 3,
      nombre: 'Ana',
      apellido: 'Martínez',
      email: 'ana.martinez@udh.edu.pe',
      telefono: '+51 956 789 012',
      fechaNacimiento: '2000-01-10',
      fechaIngreso: '2023-07-10',
      curso: 'Investigación de Mercados',
      estado: 'graduado',
      promedio: 19.2,
      tareasCompletadas: 10,
      totalTareas: 10,
      avatar: 'AM',
      ultimaActividad: '2025-01-10T09:20:00'
    },
    {
      id: 4,
      nombre: 'Luis',
      apellido: 'Pérez',
      email: 'luis.perez@udh.edu.pe',
      telefono: '+51 934 567 890',
      fechaNacimiento: '1999-11-05',
      fechaIngreso: '2023-08-15',
      curso: 'Evaluación de Proyectos',
      estado: 'inactivo',
      promedio: 14.2,
      tareasCompletadas: 3,
      totalTareas: 8,
      avatar: 'LP',
      ultimaActividad: '2025-01-05T14:10:00'
    }
  ]);

  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'todos' | 'activo' | 'inactivo' | 'graduado' | 'suspendido'>('todos');
  const [filtroCurso, setFiltroCurso] = useState('todos');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [vistaActual, setVistaActual] = useState<'tabla' | 'tarjetas'>('tabla');

  const cursosUnicos = Array.from(new Set(estudiantes.map(e => e.curso)));

  const estudiantesFiltrados = estudiantes.filter(estudiante => {
    const coincideBusqueda = 
      estudiante.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.email.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideEstado = filtroEstado === 'todos' || estudiante.estado === filtroEstado;
    const coincideCurso = filtroCurso === 'todos' || estudiante.curso === filtroCurso;
    
    return coincideBusqueda && coincideEstado && coincideCurso;
  });

  const abrirDetalleEstudiante = (estudiante: Estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEstudianteSeleccionado(null);
  };

  const getEstadoBadge = (estado: string) => {
    const clases = {
      activo: 'estado-activo',
      inactivo: 'estado-inactivo',
      graduado: 'estado-graduado',
      suspendido: 'estado-suspendido'
    };
    return clases[estado as keyof typeof clases] || 'estado-inactivo';
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const calcularDiasDesdeActividad = (fecha: string) => {
    const hoy = new Date();
    const ultimaActividad = new Date(fecha);
    const diferencia = Math.floor((hoy.getTime() - ultimaActividad.getTime()) / (1000 * 3600 * 24));
    return diferencia;
  };

  return (
    <div className="gestion-estudiantes">
      <div className="estudiantes-container">
        
        {/* Header */}
        <div className="header-estudiantes">
          <div>
            <h1 className="titulo-estudiantes">Gestión de Estudiantes</h1>
            <p className="subtitulo-estudiantes">Administra y supervisa el progreso de tus estudiantes</p>
          </div>
          <div className="header-acciones">
            <button className="btn-exportar">
              <DocumentArrowDownIcon />
              Exportar
            </button>
            <button className="btn-agregar-estudiante">
              <UserPlusIcon />
              Agregar Estudiante
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="estadisticas-estudiantes">
          <div className="stat-estudiante">
            <UserGroupIcon />
            <div>
              <h3>{estudiantes.length}</h3>
              <p>Total Estudiantes</p>
            </div>
          </div>
          <div className="stat-estudiante">
            <AcademicCapIcon />
            <div>
              <h3>{estudiantes.filter(e => e.estado === 'activo').length}</h3>
              <p>Estudiantes Activos</p>
            </div>
          </div>
          <div className="stat-estudiante">
            <AcademicCapIcon />
            <div>
              <h3>{estudiantes.filter(e => e.estado === 'graduado').length}</h3>
              <p>Graduados</p>
            </div>
          </div>
          <div className="stat-estudiante">
            <CalendarDaysIcon />
            <div>
              <h3>{estudiantes.reduce((sum, e) => sum + e.promedio, 0) / estudiantes.length || 0}</h3>
              <p>Promedio General</p>
            </div>
          </div>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="filtros-estudiantes">
          <div className="filtros-izquierda">
            <div className="busqueda-estudiantes">
              <MagnifyingGlassIcon />
              <input
                type="text"
                placeholder="Buscar estudiante por nombre o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            
            <select 
              value={filtroEstado} 
              onChange={(e) => setFiltroEstado(e.target.value as any)}
              className="select-filtro"
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
              <option value="graduado">Graduados</option>
              <option value="suspendido">Suspendidos</option>
            </select>
            
            <select 
              value={filtroCurso} 
              onChange={(e) => setFiltroCurso(e.target.value)}
              className="select-filtro"
            >
              <option value="todos">Todos los cursos</option>
              {cursosUnicos.map(curso => (
                <option key={curso} value={curso}>{curso}</option>
              ))}
            </select>
          </div>
          
          <div className="vista-toggle">
            <button 
              className={vistaActual === 'tabla' ? 'activo' : ''}
              onClick={() => setVistaActual('tabla')}
            >
              Tabla
            </button>
            <button 
              className={vistaActual === 'tarjetas' ? 'activo' : ''}
              onClick={() => setVistaActual('tarjetas')}
            >
              Tarjetas
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="resultados-info">
          <p>Mostrando {estudiantesFiltrados.length} de {estudiantes.length} estudiantes</p>
        </div>

        {/* Vista de Tabla */}
        {vistaActual === 'tabla' && (
          <div className="tabla-estudiantes">
            <div className="tabla-container">
              <table>
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Email</th>
                    <th>Curso</th>
                    <th>Estado</th>
                    <th>Promedio</th>
                    <th>Progreso</th>
                    <th>Última Actividad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {estudiantesFiltrados.map(estudiante => (
                    <tr key={estudiante.id}>
                      <td>
                        <div className="estudiante-info">
                          <div className="avatar">{estudiante.avatar}</div>
                          <div>
                            <div className="nombre">{estudiante.nombre} {estudiante.apellido}</div>
                            <div className="telefono">{estudiante.telefono}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="email-cell">
                          <EnvelopeIcon />
                          {estudiante.email}
                        </div>
                      </td>
                      <td>{estudiante.curso}</td>
                      <td>
                        <span className={`estado-badge ${getEstadoBadge(estudiante.estado)}`}>
                          {estudiante.estado.charAt(0).toUpperCase() + estudiante.estado.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className="promedio-cell">
                          <span className="promedio-numero">{estudiante.promedio.toFixed(1)}</span>
                        </div>
                      </td>
                      <td>
                        <div className="progreso-cell">
                          <div className="progreso-bar">
                            <div 
                              className="progreso-fill"
                              style={{ width: `${(estudiante.tareasCompletadas / estudiante.totalTareas) * 100}%` }}
                            />
                          </div>
                          <span>{estudiante.tareasCompletadas}/{estudiante.totalTareas}</span>
                        </div>
                      </td>
                      <td>
                        <div className="actividad-cell">
                          <span>Hace {calcularDiasDesdeActividad(estudiante.ultimaActividad)} días</span>
                        </div>
                      </td>
                      <td>
                        <div className="acciones-cell">
                          <button 
                            className="btn-accion-tabla"
                            onClick={() => abrirDetalleEstudiante(estudiante)}
                            title="Ver detalles"
                          >
                            <EyeIcon />
                          </button>
                          <button className="btn-accion-tabla" title="Editar">
                            <PencilIcon />
                          </button>
                          <button className="btn-accion-tabla" title="Enviar mensaje">
                            <EnvelopeIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Vista de Tarjetas */}
        {vistaActual === 'tarjetas' && (
          <div className="tarjetas-estudiantes">
            {estudiantesFiltrados.map(estudiante => (
              <div key={estudiante.id} className="tarjeta-estudiante">
                <div className="tarjeta-header">
                  <div className="avatar-grande">{estudiante.avatar}</div>
                  <div className="estudiante-nombre">
                    <h3>{estudiante.nombre} {estudiante.apellido}</h3>
                    <p>{estudiante.email}</p>
                    <span className={`estado-badge ${getEstadoBadge(estudiante.estado)}`}>
                      {estudiante.estado.charAt(0).toUpperCase() + estudiante.estado.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="tarjeta-info">
                  <div className="info-item">
                    <AcademicCapIcon />
                    <span>{estudiante.curso}</span>
                  </div>
                  <div className="info-item">
                    <PhoneIcon />
                    <span>{estudiante.telefono}</span>
                  </div>
                  <div className="info-item">
                    <CalendarDaysIcon />
                    <span>Ingresó: {formatearFecha(estudiante.fechaIngreso)}</span>
                  </div>
                </div>
                
                <div className="tarjeta-estadisticas">
                  <div className="stat-tarjeta">
                    <span className="stat-valor">{estudiante.promedio.toFixed(1)}</span>
                    <span className="stat-label">Promedio</span>
                  </div>
                  <div className="stat-tarjeta">
                    <span className="stat-valor">{estudiante.tareasCompletadas}/{estudiante.totalTareas}</span>
                    <span className="stat-label">Tareas</span>
                  </div>
                  <div className="stat-tarjeta">
                    <span className="stat-valor">{calcularDiasDesdeActividad(estudiante.ultimaActividad)}d</span>
                    <span className="stat-label">Última actividad</span>
                  </div>
                </div>
                
                <div className="tarjeta-acciones">
                  <button 
                    className="btn-ver-detalle"
                    onClick={() => abrirDetalleEstudiante(estudiante)}
                  >
                    Ver Perfil
                  </button>
                  <button className="btn-enviar-mensaje">
                    <EnvelopeIcon />
                    Mensaje
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {estudiantesFiltrados.length === 0 && (
          <div className="sin-resultados">
            <UserGroupIcon />
            <h3>No se encontraron estudiantes</h3>
            <p>Ajusta los filtros o términos de búsqueda para ver más resultados.</p>
          </div>
        )}
      </div>

      {/* Modal de Detalle */}
      {mostrarModal && estudianteSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-detalle" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-detalle">
              <div className="estudiante-header-modal">
                <div className="avatar-modal">{estudianteSeleccionado.avatar}</div>
                <div>
                  <h2>{estudianteSeleccionado.nombre} {estudianteSeleccionado.apellido}</h2>
                  <p>{estudianteSeleccionado.email}</p>
                  <span className={`estado-badge ${getEstadoBadge(estudianteSeleccionado.estado)}`}>
                    {estudianteSeleccionado.estado.charAt(0).toUpperCase() + estudianteSeleccionado.estado.slice(1)}
                  </span>
                </div>
              </div>
              <button className="btn-cerrar" onClick={cerrarModal}>×</button>
            </div>
            
            <div className="modal-contenido">
              <div className="detalle-seccion">
                <h3>Información Personal</h3>
                <div className="info-grid">
                  <div className="info-campo">
                    <label>Teléfono:</label>
                    <span>{estudianteSeleccionado.telefono}</span>
                  </div>
                  <div className="info-campo">
                    <label>Fecha de Nacimiento:</label>
                    <span>{formatearFecha(estudianteSeleccionado.fechaNacimiento)}</span>
                  </div>
                  <div className="info-campo">
                    <label>Fecha de Ingreso:</label>
                    <span>{formatearFecha(estudianteSeleccionado.fechaIngreso)}</span>
                  </div>
                  <div className="info-campo">
                    <label>Curso Actual:</label>
                    <span>{estudianteSeleccionado.curso}</span>
                  </div>
                </div>
              </div>
              
              <div className="detalle-seccion">
                <h3>Rendimiento Académico</h3>
                <div className="rendimiento-grid">
                  <div className="rendimiento-item">
                    <div className="rendimiento-numero">{estudianteSeleccionado.promedio.toFixed(1)}</div>
                    <div className="rendimiento-label">Promedio General</div>
                  </div>
                  <div className="rendimiento-item">
                    <div className="rendimiento-numero">{estudianteSeleccionado.tareasCompletadas}</div>
                    <div className="rendimiento-label">Tareas Completadas</div>
                  </div>
                  <div className="rendimiento-item">
                    <div className="rendimiento-numero">{Math.round((estudianteSeleccionado.tareasCompletadas / estudianteSeleccionado.totalTareas) * 100)}%</div>
                    <div className="rendimiento-label">Porcentaje Completado</div>
                  </div>
                </div>
              </div>
              
              <div className="detalle-acciones">
                <button className="btn-editar-estudiante">
                  <PencilIcon />
                  Editar Información
                </button>
                <button className="btn-mensaje-estudiante">
                  <EnvelopeIcon />
                  Enviar Mensaje
                </button>
                <button className="btn-ver-progreso">
                  <AcademicCapIcon />
                  Ver Progreso Detallado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionEstudiantes;