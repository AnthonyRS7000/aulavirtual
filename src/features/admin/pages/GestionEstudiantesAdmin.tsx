import { useState, useMemo } from 'react';
import {
  FaUsers,
  FaSearch,
  FaEye,
  FaEnvelope,
  FaGraduationCap,
  FaCheckCircle,
  FaChartBar,
  FaBook,
  FaUserGraduate,
  FaTrophy,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFileExport,
  FaPhone,
  FaTimesCircle,
  FaClock,
  FaChevronRight,
  FaUniversity,
  FaTimes,
  FaIdCard,
  FaMapMarkerAlt
} from 'react-icons/fa';
import '../css/GestionEstudiantesAdmin.css';
import { 
  estudiantes as estudiantesData, 
  facultades, 
  programas,
  type Estudiante,
  type Facultad,
  type ProgramaAcademico 
} from './ListaEstudiantes';

interface Programa {
  id: number;
  nombre: string;
  facultadId: number;
  color: string;
  ciclosDisponibles: string[];
}

export default function GestionEstudiantesAdmin() {
  const [busqueda, setBusqueda] = useState('');
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<number>(0);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<number>(0);
  const [cicloSeleccionado, setCicloSeleccionado] = useState<string>('todos');
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>('todos');
  const [estudiantes] = useState<Estudiante[]>(estudiantesData);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Programas filtrados por facultad
  const programasFiltrados = useMemo(() => {
    if (facultadSeleccionada === 0) return [];
    return programas.filter(p => p.facultadId === facultadSeleccionada);
  }, [facultadSeleccionada, programas]);

  // Ciclos disponibles según el programa seleccionado (dinámico basado en estudiantes)
  const ciclosDisponibles = useMemo(() => {
    if (programaSeleccionado === 0) return [];
    
    // Obtener ciclos únicos de los estudiantes del programa seleccionado
    const ciclosUnicos = Array.from(
      new Set(
        estudiantes
          .filter(e => e.programaId === programaSeleccionado)
          .map(e => e.ciclo)
      )
    );
    
    // Ordenar ciclos en formato romano (I, II, III, IV, V, VI, VII, VIII, IX, X)
    const ordenRomano: { [key: string]: number } = {
      'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5,
      'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10
    };
    
    return ciclosUnicos.sort((a, b) => (ordenRomano[a] || 0) - (ordenRomano[b] || 0));
  }, [programaSeleccionado, estudiantes]);

  // Filtrado de estudiantes
  const estudiantesFiltrados = useMemo(() => {
    return estudiantes.filter((estudiante) => {
      const coincideBusqueda =
        estudiante.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
        estudiante.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
        estudiante.codigo.includes(busqueda) ||
        estudiante.email.toLowerCase().includes(busqueda.toLowerCase());

      const coincideFacultad = facultadSeleccionada === 0 || estudiante.facultadId === facultadSeleccionada;
      const coincidePrograma = programaSeleccionado === 0 || estudiante.programaId === programaSeleccionado;
      const coincideCiclo = cicloSeleccionado === 'todos' || estudiante.ciclo === cicloSeleccionado;
      const coincideEstado = estadoSeleccionado === 'todos' || estudiante.estado === estadoSeleccionado;

      return coincideBusqueda && coincideFacultad && coincidePrograma && coincideCiclo && coincideEstado;
    });
  }, [estudiantes, busqueda, facultadSeleccionada, programaSeleccionado, cicloSeleccionado, estadoSeleccionado]);

  // Agrupar estudiantes por programa
  const estudiantesAgrupados = useMemo(() => {
    return estudiantesFiltrados.sort((a, b) => {
      if (a.programaId !== b.programaId) return a.programaId - b.programaId;
      return a.apellidos.localeCompare(b.apellidos);
    });
  }, [estudiantesFiltrados]);

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const total = estudiantesFiltrados.length;
    const activos = estudiantesFiltrados.filter(e => e.estado === 'activo').length;
    const promedio = total > 0 
      ? (estudiantesFiltrados.reduce((acc, e) => acc + e.promedio, 0) / total).toFixed(1) 
      : '0.0';
    const asistenciaPromedio = total > 0 
      ? Math.round(estudiantesFiltrados.reduce((acc, e) => acc + e.asistencia, 0) / total) 
      : 0;

    return { total, activos, promedio, asistenciaPromedio };
  }, [estudiantesFiltrados]);

  const getColorPrograma = (programaId: number) => {
    const programa = programas.find(p => p.id === programaId);
    return programa?.color || '#2EBAA0';
  };

  const getProgramaNombre = (programaId: number) => {
    const programa = programas.find(p => p.id === programaId);
    return programa?.nombre || 'Desconocido';
  };

  const getFacultadNombre = (facultadId: number) => {
    const facultad = facultades.find(f => f.id === facultadId);
    return facultad?.nombre || 'Desconocida';
  };

  // Reset cascada de filtros
  const handleFacultadChange = (facultadId: number) => {
    setFacultadSeleccionada(facultadId);
    setProgramaSeleccionado(0);
    setCicloSeleccionado('todos');
  };

  const handleProgramaChange = (programaId: number) => {
    setProgramaSeleccionado(programaId);
    setCicloSeleccionado('todos');
  };

  const handleVerEstudiante = (estudiante: Estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setEstudianteSeleccionado(null);
  };

  return (
    <div className="estudiantes-admin-page">
      <div className="estudiantes-admin-header">
        <div className="header-info">
          <h1 className="page-title">
            <FaUserGraduate className="title-icon" />
            Gestión de Estudiantes
          </h1>
          <p className="page-subtitle">
            Administra, monitorea y gestiona todos los estudiantes de la institución
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-action-secondary">
            <FaFileExport />
            <span>Exportar</span>
          </button>
          <button className="btn-action-primary">
            <FaPlus />
            <span>Nuevo Estudiante</span>
          </button>
        </div>
      </div>

      {/* Filtro nivel 1: Facultades */}
      <div className="filter-section">
        <div className="filter-header">
          <FaUniversity className="filter-header-icon" />
          <h3 className="filter-title">1. Selecciona una Facultad</h3>
          {facultadSeleccionada !== 0 && (
            <button 
              className="btn-reset-filter"
              onClick={() => handleFacultadChange(0)}
            >
              Limpiar
            </button>
          )}
        </div>
        <div className="facultades-grid">
          {facultades.map((facultad) => {
            const countEstudiantes = estudiantes.filter(e => e.facultadId === facultad.id).length;
            return (
              <button
                key={facultad.id}
                className={`facultad-card ${facultadSeleccionada === facultad.id ? 'active' : ''}`}
                style={{
                  '--facultad-color': facultad.color
                } as React.CSSProperties}
                onClick={() => handleFacultadChange(facultad.id)}
              >
                <div className="facultad-icon">{facultad.icon}</div>
                <div className="facultad-info">
                  <span className="facultad-nombre">{facultad.nombre}</span>
                  <span className="facultad-count">{countEstudiantes} estudiantes</span>
                </div>
                {facultadSeleccionada === facultad.id && (
                  <FaCheckCircle className="facultad-check" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro nivel 2: Programas Académicos (solo si hay facultad seleccionada) */}
      {facultadSeleccionada !== 0 && (
        <div className="filter-section">
          <div className="filter-header">
            <FaGraduationCap className="filter-header-icon" />
            <h3 className="filter-title">
              2. Selecciona un Programa Académico
              <span className="filter-subtitle">
                ({programasFiltrados.length} programas disponibles)
              </span>
            </h3>
            {programaSeleccionado !== 0 && (
              <button 
                className="btn-reset-filter"
                onClick={() => handleProgramaChange(0)}
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="programas-grid">
            {programasFiltrados.map((programa) => {
              const countEstudiantes = estudiantes.filter(e => e.programaId === programa.id).length;
              return (
                <button
                  key={programa.id}
                  className={`programa-card ${programaSeleccionado === programa.id ? 'active' : ''}`}
                  style={{
                    '--programa-color': programa.color
                  } as React.CSSProperties}
                  onClick={() => handleProgramaChange(programa.id)}
                >
                  <div className="programa-bar"></div>
                  <div className="programa-content">
                    <span className="programa-nombre">{programa.nombre}</span>
                    <span className="programa-count">{countEstudiantes} estudiantes</span>
                  </div>
                  {programaSeleccionado === programa.id && (
                    <FaCheckCircle className="programa-check" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filtro nivel 3: Ciclos (solo si hay programa seleccionado) */}
      {programaSeleccionado !== 0 && (
        <div className="filter-section">
          <div className="filter-header">
            <FaBook className="filter-header-icon" />
            <h3 className="filter-title">
              3. Filtra por Ciclo Académico
              <span className="filter-subtitle">
                (opcional)
              </span>
            </h3>
            {cicloSeleccionado !== 'todos' && (
              <button 
                className="btn-reset-filter"
                onClick={() => setCicloSeleccionado('todos')}
              >
                Ver todos
              </button>
            )}
          </div>
          <div className="ciclos-grid">
            {ciclosDisponibles.map((ciclo: string) => {
              const countEstudiantes = estudiantes.filter(
                e => e.programaId === programaSeleccionado && e.ciclo === ciclo
              ).length;
              return (
                <button
                  key={ciclo}
                  className={`ciclo-btn ${cicloSeleccionado === ciclo ? 'active' : ''}`}
                  onClick={() => setCicloSeleccionado(ciclo)}
                  disabled={countEstudiantes === 0}
                >
                  <span className="ciclo-roman">{ciclo}</span>
                  <span className="ciclo-count">{countEstudiantes}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filtro de estado (siempre visible si hay programa seleccionado) */}
      {programaSeleccionado !== 0 && (
        <div className="estado-filter">
          <button
            className={`estado-btn ${estadoSeleccionado === 'todos' ? 'active' : ''}`}
            onClick={() => setEstadoSeleccionado('todos')}
          >
            <FaUsers />
            Todos
          </button>
          <button
            className={`estado-btn activo ${estadoSeleccionado === 'activo' ? 'active' : ''}`}
            onClick={() => setEstadoSeleccionado('activo')}
          >
            <FaCheckCircle />
            Activos
          </button>
          <button
            className={`estado-btn inactivo ${estadoSeleccionado === 'inactivo' ? 'active' : ''}`}
            onClick={() => setEstadoSeleccionado('inactivo')}
          >
            <FaClock />
            Inactivos
          </button>
          <button
            className={`estado-btn suspendido ${estadoSeleccionado === 'suspendido' ? 'active' : ''}`}
            onClick={() => setEstadoSeleccionado('suspendido')}
          >
            <FaTimesCircle />
            Suspendidos
          </button>
        </div>
      )}

      {/* Estadísticas (solo si hay programa seleccionado) */}
      {programaSeleccionado !== 0 && (
        <div className="stats-grid-admin">
          <div className="stat-card-admin">
            <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <FaUsers />
            </div>
            <div className="stat-content-admin">
              <div className="stat-value-admin">{estadisticas.total}</div>
              <div className="stat-label-admin">Total Estudiantes</div>
            </div>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <FaCheckCircle />
            </div>
            <div className="stat-content-admin">
              <div className="stat-value-admin">{estadisticas.activos}</div>
              <div className="stat-label-admin">Activos</div>
            </div>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <FaTrophy />
            </div>
            <div className="stat-content-admin">
              <div className="stat-value-admin">{estadisticas.promedio}</div>
              <div className="stat-label-admin">Promedio General</div>
            </div>
          </div>

          <div className="stat-card-admin">
            <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
              <FaChartBar />
            </div>
            <div className="stat-content-admin">
              <div className="stat-value-admin">{estadisticas.asistenciaPromedio}%</div>
              <div className="stat-label-admin">Asistencia Promedio</div>
            </div>
          </div>
        </div>
      )}

      {/* Búsqueda (solo si hay programa seleccionado) */}
      {programaSeleccionado !== 0 && (
        <div className="search-container-admin">
          <FaSearch className="search-icon-admin" />
          <input
            type="text"
            className="search-input-admin"
            placeholder="Buscar por nombre, código o email..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      )}

      {/* Lista de estudiantes */}
      {programaSeleccionado === 0 ? (
        <div className="no-selection-message">
          <FaGraduationCap className="no-selection-icon" />
          <h3 className="no-selection-title">Selecciona un programa académico</h3>
          <p className="no-selection-text">
            Elige una facultad y luego un programa académico para ver la lista de estudiantes
          </p>
        </div>
      ) : estudiantesAgrupados.length === 0 ? (
        <div className="no-results-admin">
          <FaUserGraduate className="no-results-icon-admin" />
          <p className="no-results-text-admin">No se encontraron estudiantes</p>
          <p className="no-results-hint-admin">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="estudiantes-list-admin">
          {estudiantesAgrupados.map((estudiante) => {
            const programa = programas.find(p => p.id === estudiante.programaId);
            const colorPrograma = programa?.color || '#2EBAA0';

            return (
              <div
                key={estudiante.id}
                className="estudiante-card-admin"
                style={{
                  '--programa-color': colorPrograma
                } as React.CSSProperties}
              >
                <div className="estudiante-main-info">
                  <div
                    className="estudiante-avatar-admin"
                    style={{ background: `linear-gradient(135deg, ${colorPrograma} 0%, ${colorPrograma}dd 100%)` }}
                  >
                    <FaUserGraduate />
                  </div>
                  <div className="estudiante-details-admin">
                    <div className="estudiante-nombre-completo">
                      <span className={`estado-indicator ${estudiante.estado}`}></span>
                      {estudiante.nombres} {estudiante.apellidos}
                    </div>
                    <div className="estudiante-email">
                      <FaEnvelope />
                      {estudiante.email}
                    </div>
                  </div>
                </div>

                <div className="estudiante-acciones">
                  <button 
                    className="btn-accion view"
                    onClick={() => handleVerEstudiante(estudiante)}
                    title="Ver detalles"
                  >
                    <FaEye />
                  </button>
                  <button className="btn-accion edit" title="Editar estudiante">
                    <FaEdit />
                  </button>
                  <button className="btn-accion message" title="Enviar mensaje">
                    <FaEnvelope />
                  </button>
                  <button className="btn-accion delete" title="Eliminar estudiante">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de detalles */}
      {mostrarModal && estudianteSeleccionado && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <FaUserGraduate />
                Detalles del Estudiante
              </h2>
              <button className="modal-close-btn" onClick={handleCerrarModal}>
                <FaTimes />
              </button>
            </div>

            <div 
              className="modal-body"
              style={{
                '--programa-color': getColorPrograma(estudianteSeleccionado.programaId)
              } as React.CSSProperties}
            >
              {/* Header con foto y nombre */}
              <div className="modal-student-header">
                <div
                  className="modal-avatar"
                  style={{ 
                    background: `linear-gradient(135deg, ${getColorPrograma(estudianteSeleccionado.programaId)} 0%, ${getColorPrograma(estudianteSeleccionado.programaId)}dd 100%)` 
                  }}
                >
                  <FaUserGraduate />
                </div>
                <div className="modal-student-info">
                  <h3 className="modal-student-name">
                    <span className={`estado-indicator ${estudianteSeleccionado.estado}`}></span>
                    {estudianteSeleccionado.nombres} {estudianteSeleccionado.apellidos}
                  </h3>
                  <p className="modal-student-codigo">
                    Código: {estudianteSeleccionado.codigo}
                  </p>
                </div>
                <div className={`estado-badge ${estudianteSeleccionado.estado}`}>
                  {estudianteSeleccionado.estado === 'activo' && <FaCheckCircle />}
                  {estudianteSeleccionado.estado === 'inactivo' && <FaClock />}
                  {estudianteSeleccionado.estado === 'suspendido' && <FaTimesCircle />}
                  {estudianteSeleccionado.estado.charAt(0).toUpperCase() + estudianteSeleccionado.estado.slice(1)}
                </div>
              </div>

              {/* Información académica */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <FaGraduationCap />
                  Información Académica
                </h4>
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <div className="modal-info-label">Facultad</div>
                    <div className="modal-info-value">
                      <FaUniversity />
                      {getFacultadNombre(estudianteSeleccionado.facultadId)}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Programa Académico</div>
                    <div className="modal-info-value">
                      <FaGraduationCap />
                      {getProgramaNombre(estudianteSeleccionado.programaId)}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Ciclo Actual</div>
                    <div className="modal-info-value">
                      <FaBook />
                      Ciclo {estudianteSeleccionado.ciclo}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Última Actividad</div>
                    <div className="modal-info-value">
                      <FaClock />
                      {estudianteSeleccionado.ultimaActividad}
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas de rendimiento */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <FaChartBar />
                  Rendimiento Académico
                </h4>
                <div className="modal-stats-grid">
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaTrophy />
                    </div>
                    <div className="modal-stat-value">
                      {estudianteSeleccionado.promedio.toFixed(1)}
                    </div>
                    <div className="modal-stat-label">Promedio</div>
                  </div>
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaCheckCircle />
                    </div>
                    <div className="modal-stat-value">
                      {estudianteSeleccionado.asistencia}%
                    </div>
                    <div className="modal-stat-label">Asistencia</div>
                  </div>
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaBook />
                    </div>
                    <div className="modal-stat-value">
                      {estudianteSeleccionado.tareasEntregadas}/{estudianteSeleccionado.tareasTotal}
                    </div>
                    <div className="modal-stat-label">Tareas</div>
                  </div>
                </div>
              </div>

              {/* Información de contacto */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <FaEnvelope />
                  Información de Contacto
                </h4>
                <div className="modal-info-grid">
                  <div className="modal-info-item">
                    <div className="modal-info-label">Correo Electrónico</div>
                    <div className="modal-info-value">
                      <FaEnvelope />
                      {estudianteSeleccionado.email}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Teléfono</div>
                    <div className="modal-info-value">
                      <FaPhone />
                      {estudianteSeleccionado.telefono}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-btn modal-btn-secondary" onClick={handleCerrarModal}>
                <FaTimes />
                Cerrar
              </button>
              <button className="modal-btn modal-btn-primary">
                <FaEdit />
                Editar Información
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
