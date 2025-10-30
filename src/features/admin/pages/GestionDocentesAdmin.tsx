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
  FaUserTie,
  FaChalkboardTeacher,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFileExport,
  FaPhone,
  FaTimesCircle,
  FaClock,
  FaUniversity,
  FaTimes,
  FaIdCard,
  FaAward,
  FaUserGraduate,
  FaBriefcase,
  FaChevronRight
} from 'react-icons/fa';
import '../css/GestionDocentesAdmin.css';
import { 
  docentes as docentesData,
  type Docente
} from './ListaDocentes';
import {
  facultades,
  programas,
  type Facultad,
  type ProgramaAcademico
} from './ListaEstudiantes';

export default function GestionDocentesAdmin() {
  const [busqueda, setBusqueda] = useState('');
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<number>(0);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<number>(0);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string>('todos');
  const [gradoSeleccionado, setGradoSeleccionado] = useState<string>('todos');
  const [docentes] = useState<Docente[]>(docentesData);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<Docente | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  // Programas filtrados por facultad
  const programasFiltrados = useMemo(() => {
    if (facultadSeleccionada === 0) return [];
    return programas.filter(p => p.facultadId === facultadSeleccionada);
  }, [facultadSeleccionada]);

  // Filtrado de docentes
  const docentesFiltrados = useMemo(() => {
    return docentes.filter((docente) => {
      const coincideBusqueda =
        docente.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
        docente.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
        docente.codigo.includes(busqueda) ||
        docente.email.toLowerCase().includes(busqueda.toLowerCase()) ||
        docente.especialidad.toLowerCase().includes(busqueda.toLowerCase());

      const coincideFacultad = facultadSeleccionada === 0 || docente.facultadId === facultadSeleccionada;
      const coincidePrograma = programaSeleccionado === 0 || docente.programaId === programaSeleccionado;
      const coincideEstado = estadoSeleccionado === 'todos' || docente.estado === estadoSeleccionado;
      const coincideGrado = gradoSeleccionado === 'todos' || docente.gradoAcademico === gradoSeleccionado;

      return coincideBusqueda && coincideFacultad && coincidePrograma && coincideEstado && coincideGrado;
    });
  }, [docentes, busqueda, facultadSeleccionada, programaSeleccionado, estadoSeleccionado, gradoSeleccionado]);

  // Agrupar docentes por programa
  const docentesAgrupados = useMemo(() => {
    return docentesFiltrados.sort((a, b) => {
      if (a.programaId !== b.programaId) return a.programaId - b.programaId;
      return a.apellidos.localeCompare(b.apellidos);
    });
  }, [docentesFiltrados]);

  // Calcular estadísticas
  const estadisticas = useMemo(() => {
    const total = docentesFiltrados.length;
    const activos = docentesFiltrados.filter(d => d.estado === 'activo').length;
    const totalCursos = docentesFiltrados.reduce((acc, d) => acc + d.cursosActivos, 0);
    const totalEstudiantes = docentesFiltrados.reduce((acc, d) => acc + d.totalEstudiantes, 0);
    const experienciaPromedio = total > 0 
      ? Math.round(docentesFiltrados.reduce((acc, d) => acc + d.añosExperiencia, 0) / total)
      : 0;

    return { total, activos, totalCursos, totalEstudiantes, experienciaPromedio };
  }, [docentesFiltrados]);

  const getColorPrograma = (programaId: number) => {
    const programa = programas.find(p => p.id === programaId);
    const facultad = facultades.find(f => f.id === programa?.facultadId);
    return facultad?.color || '#2EBAA0';
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
  };

  const handleVerDocente = (docente: Docente) => {
    setDocenteSeleccionado(docente);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setDocenteSeleccionado(null);
  };

  return (
    <div className="docentes-admin-page">
      <div className="docentes-admin-header">
        <div className="header-info">
          <h1 className="page-title">
            <FaChalkboardTeacher className="title-icon" />
            Gestión de Docentes
          </h1>
          <p className="page-subtitle">
            Administra y gestiona el personal docente de la institución
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-action-secondary">
            <FaFileExport />
            <span>Exportar</span>
          </button>
          <button className="btn-action-primary">
            <FaPlus />
            <span>Nuevo Docente</span>
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
            const countDocentes = docentes.filter(d => d.facultadId === facultad.id).length;
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
                  <h4 className="facultad-nombre">{facultad.nombre}</h4>
                  <span className="facultad-count">{countDocentes} docentes</span>
                </div>
                {facultadSeleccionada === facultad.id && (
                  <FaCheckCircle className="facultad-check" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro nivel 2: Programas Académicos */}
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
                onClick={() => setProgramaSeleccionado(0)}
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="programas-grid">
            {programasFiltrados.map((programa) => {
              const countDocentes = docentes.filter(d => d.programaId === programa.id).length;
              return (
                <button
                  key={programa.id}
                  className={`programa-card ${programaSeleccionado === programa.id ? 'active' : ''}`}
                  onClick={() => setProgramaSeleccionado(programa.id)}
                >
                  <div className="programa-content">
                    <h4 className="programa-nombre">{programa.nombre}</h4>
                    <span className="programa-count">{countDocentes} docentes</span>
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

      {/* Filtros adicionales: Estado y Grado Académico */}
      {programaSeleccionado !== 0 && (
        <>
          <div className="filter-section-inline">
            <div className="filter-group">
              <label className="filter-label">
                <FaCheckCircle className="filter-label-icon" />
                Estado del Docente
              </label>
              <div className="select-wrapper">
                
                <select 
                  className="filter-select"
                  value={estadoSeleccionado}
                  onChange={(e) => setEstadoSeleccionado(e.target.value as any)}
                >
                  <option value="todos">Todos los estados</option>
                  <option value="activo">✓ Activos</option>
                  <option value="inactivo">○ Inactivos</option>
                  <option value="licencia">⊗ En Licencia</option>
                </select>
                <FaChevronRight className="select-arrow" />
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                <FaAward className="filter-label-icon" />
                Grado Académico
              </label>
              <div className="select-wrapper">
                
                <select 
                  className="filter-select"
                  value={gradoSeleccionado}
                  onChange={(e) => setGradoSeleccionado(e.target.value as any)}
                >
                  <option value="todos">Todos los grados</option>
                  <option value="Doctor">🎓 Doctor</option>
                  <option value="Magíster">📚 Magíster</option>
                  <option value="Licenciado">📖 Licenciado</option>
                </select>
                <FaChevronRight className="select-arrow" />
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="stats-grid-admin">
            <div className="stat-card-admin">
              <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <FaUserTie />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.total}</div>
                <div className="stat-label-admin">Total Docentes</div>
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
                <FaBook />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.totalCursos}</div>
                <div className="stat-label-admin">Cursos Activos</div>
              </div>
            </div>

            <div className="stat-card-admin">
              <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                <FaUserGraduate />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.totalEstudiantes}</div>
                <div className="stat-label-admin">Total Estudiantes</div>
              </div>
            </div>

            <div className="stat-card-admin">
              <div className="stat-icon-admin" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                <FaChartBar />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.experienciaPromedio}</div>
                <div className="stat-label-admin">Años de Experiencia (promedio)</div>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="search-container-admin">
            <input
              type="text"
              className="search-input-admin"
              placeholder="Buscar por nombre, código, email o especialidad..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Lista de docentes */}
      {programaSeleccionado === 0 ? (
        <div className="no-selection-message">
          <FaGraduationCap className="no-selection-icon" />
          <h3 className="no-selection-title">Selecciona un programa académico</h3>
          <p className="no-selection-text">
            Elige una facultad y luego un programa académico para ver la lista de docentes
          </p>
        </div>
      ) : docentesAgrupados.length === 0 ? (
        <div className="no-results-admin">
          <FaUserTie className="no-results-icon-admin" />
          <p className="no-results-text-admin">No se encontraron docentes</p>
          <p className="no-results-hint-admin">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="docentes-list-admin">
          {docentesAgrupados.map((docente) => {
            return (
              <div
                key={docente.id}
                className="docente-card-admin"
              >
                <div className="docente-main-info">
                  <div className="docente-avatar-admin">
                    <FaUserTie />
                  </div>
                  <div className="docente-details-admin">
                    <div className="docente-nombre-completo">
                      <span>{docente.apellidos}, {docente.nombres}</span>
                      <span className={`estado-indicator ${docente.estado}`}></span>
                    </div>
                    <div className="docente-email">
                      <FaEnvelope />
                      {docente.email}
                    </div>
                  </div>
                </div>

                <div className="docente-acciones">
                  <button 
                    className="btn-accion view"
                    onClick={() => handleVerDocente(docente)}
                    title="Ver detalles"
                  >
                    <FaEye />
                  </button>
                  <button className="btn-accion edit" title="Editar docente">
                    <FaEdit />
                  </button>
                  <button className="btn-accion message" title="Enviar mensaje">
                    <FaEnvelope />
                  </button>
                  <button className="btn-accion delete" title="Eliminar docente">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de detalles */}
      {mostrarModal && docenteSeleccionado && (
        <div className="modal-overlay" onClick={handleCerrarModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                <FaUserTie />
                Detalles del Docente
              </h2>
              <button className="modal-close-btn" onClick={handleCerrarModal}>
                <FaTimes />
              </button>
            </div>

            <div 
              className="modal-body"
              style={{
                '--programa-color': getColorPrograma(docenteSeleccionado.programaId)
              } as React.CSSProperties}
            >
              {/* Header con foto y nombre */}
              <div className="modal-docente-header">
                <div
                  className="modal-avatar"
                  style={{ 
                    background: `linear-gradient(135deg, ${getColorPrograma(docenteSeleccionado.programaId)} 0%, ${getColorPrograma(docenteSeleccionado.programaId)}dd 100%)` 
                  }}
                >
                  <FaUserTie />
                </div>
                <div className="modal-docente-info">
                  <h3 className="modal-docente-name">
                    {docenteSeleccionado.apellidos}, {docenteSeleccionado.nombres}
                  </h3>
                  <p className="modal-docente-codigo">
                    Código: {docenteSeleccionado.codigo}
                  </p>
                </div>
                <div className={`estado-badge ${docenteSeleccionado.estado}`}>
                  {docenteSeleccionado.estado === 'activo' && <FaCheckCircle />}
                  {docenteSeleccionado.estado === 'inactivo' && <FaClock />}
                  {docenteSeleccionado.estado === 'licencia' && <FaTimesCircle />}
                  {docenteSeleccionado.estado.charAt(0).toUpperCase() + docenteSeleccionado.estado.slice(1)}
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
                      {getFacultadNombre(docenteSeleccionado.facultadId)}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Programa</div>
                    <div className="modal-info-value">
                      <FaGraduationCap />
                      {getProgramaNombre(docenteSeleccionado.programaId)}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Especialidad</div>
                    <div className="modal-info-value">
                      <FaBook />
                      {docenteSeleccionado.especialidad}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Grado Académico</div>
                    <div className="modal-info-value">
                      <FaAward />
                      {docenteSeleccionado.gradoAcademico}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Tipo de Contrato</div>
                    <div className="modal-info-value">
                      <FaBriefcase />
                      {docenteSeleccionado.tipoContrato}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Años de Experiencia</div>
                    <div className="modal-info-value">
                      <FaChartBar />
                      {docenteSeleccionado.añosExperiencia} años
                    </div>
                  </div>
                </div>
              </div>

              {/* Estadísticas de carga académica */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <FaChartBar />
                  Carga Académica
                </h4>
                <div className="modal-stats-grid">
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaBook />
                    </div>
                    <div className="modal-stat-content">
                      <div className="modal-stat-value">{docenteSeleccionado.cursosActivos}</div>
                      <div className="modal-stat-label">Cursos Activos</div>
                    </div>
                  </div>
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaUsers />
                    </div>
                    <div className="modal-stat-content">
                      <div className="modal-stat-value">{docenteSeleccionado.totalEstudiantes}</div>
                      <div className="modal-stat-label">Total Estudiantes</div>
                    </div>
                  </div>
                  <div className="modal-stat-card">
                    <div className="modal-stat-icon">
                      <FaClock />
                    </div>
                    <div className="modal-stat-content">
                      <div className="modal-stat-value">{docenteSeleccionado.horasSemanales}h</div>
                      <div className="modal-stat-label">Horas Semanales</div>
                    </div>
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
                    <div className="modal-info-label">Email Institucional</div>
                    <div className="modal-info-value">
                      <FaEnvelope />
                      {docenteSeleccionado.email}
                    </div>
                  </div>
                  <div className="modal-info-item">
                    <div className="modal-info-label">Teléfono</div>
                    <div className="modal-info-value">
                      <FaPhone />
                      {docenteSeleccionado.telefono}
                    </div>
                  </div>
                </div>
              </div>

              {/* Última actividad */}
              <div className="modal-section">
                <h4 className="modal-section-title">
                  <FaClock />
                  Actividad Reciente
                </h4>
                <div className="modal-info-item">
                  <div className="modal-info-label">Última Actividad</div>
                  <div className="modal-info-value">
                    <FaClock />
                    {new Date(docenteSeleccionado.ultimaActividad).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
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
