import { FaUsers, FaSearch, FaEye, FaEnvelope, FaGraduationCap, FaCheckCircle, FaChartBar, FaBook, FaUserGraduate, FaTrophy, FaClock } from 'react-icons/fa';
import { useState } from 'react';
import TituloPage from '../../../components/pages/TituloPage';
import '../css/GestionEstudiantes.css';

interface Estudiante {
  id: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  cursoId: number;
  promedio: number;
  asistencia: number;
  tareasEntregadas: number;
  tareasTotal: number;
  ultimaActividad: string;
  estado: 'activo' | 'inactivo';
}

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  color: string;
}

export default function GestionEstudiantes() {
  const [busqueda, setBusqueda] = useState('');
  const [cursoSeleccionado, setCursoSeleccionado] = useState<number>(0); // 0 = todos
  
  const cursos: Curso[] = [
    { id: 1, codigo: '062108052', nombre: 'Seminarios de Tesis I', color: '#3B82F6' },
    { id: 2, codigo: '062110052', nombre: 'Seminario de Tesis III', color: '#8B5CF6' },
    { id: 3, codigo: '062110072', nombre: 'Trabajo de Investigación', color: '#EC4899' }
  ];
  
  const [estudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      codigo: "202121001",
      nombres: "Ana María",
      apellidos: "García López",
      email: "ana.garcia@udh.edu.pe",
      cursoId: 1,
      promedio: 16.8,
      asistencia: 95,
      tareasEntregadas: 8,
      tareasTotal: 10,
      ultimaActividad: "Hace 2 horas",
      estado: 'activo'
    },
    {
      id: 2,
      codigo: "202121002", 
      nombres: "Carlos",
      apellidos: "López Martínez",
      email: "carlos.lopez@udh.edu.pe",
      cursoId: 1,
      promedio: 15.2,
      asistencia: 88,
      tareasEntregadas: 7,
      tareasTotal: 10,
      ultimaActividad: "Hace 1 día",
      estado: 'activo'
    },
    {
      id: 3,
      codigo: "202121003",
      nombres: "María José",
      apellidos: "Fernández Silva",
      email: "maria.fernandez@udh.edu.pe",
      cursoId: 2,
      promedio: 17.5,
      asistencia: 98,
      tareasEntregadas: 9,
      tareasTotal: 10,
      ultimaActividad: "Hace 30 min",
      estado: 'activo'
    },
    {
      id: 4,
      codigo: "202021004",
      nombres: "Jorge Luis",
      apellidos: "Martínez Rojas",
      email: "jorge.martinez@udh.edu.pe",
      cursoId: 2,
      promedio: 14.8,
      asistencia: 75,
      tareasEntregadas: 6,
      tareasTotal: 10,
      ultimaActividad: "Hace 3 días",
      estado: 'activo'
    },
    {
      id: 5,
      codigo: "202121005",
      nombres: "Lucía",
      apellidos: "Ramírez Torres",
      email: "lucia.ramirez@udh.edu.pe",
      cursoId: 3,
      promedio: 18.2,
      asistencia: 100,
      tareasEntregadas: 10,
      tareasTotal: 10,
      ultimaActividad: "Hace 1 hora",
      estado: 'activo'
    },
    {
      id: 6,
      codigo: "202121006",
      nombres: "Pedro",
      apellidos: "González Díaz",
      email: "pedro.gonzalez@udh.edu.pe",
      cursoId: 3,
      promedio: 16.0,
      asistencia: 92,
      tareasEntregadas: 8,
      tareasTotal: 10,
      ultimaActividad: "Hace 5 horas",
      estado: 'activo'
    },
    {
      id: 7,
      codigo: "202121007",
      nombres: "Sofía",
      apellidos: "Mendoza Cruz",
      email: "sofia.mendoza@udh.edu.pe",
      cursoId: 1,
      promedio: 15.8,
      asistencia: 90,
      tareasEntregadas: 7,
      tareasTotal: 10,
      ultimaActividad: "Hace 2 días",
      estado: 'activo'
    },
    {
      id: 8,
      codigo: "202121008",
      nombres: "Diego",
      apellidos: "Vargas Pérez",
      email: "diego.vargas@udh.edu.pe",
      cursoId: 2,
      promedio: 13.5,
      asistencia: 70,
      tareasEntregadas: 5,
      tareasTotal: 10,
      ultimaActividad: "Hace 1 semana",
      estado: 'inactivo'
    }
  ]);

  // Filtrar estudiantes por curso y búsqueda
  const estudiantesFiltrados = estudiantes.filter(estudiante => {
    const coincideBusqueda = 
      estudiante.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.codigo.includes(busqueda) ||
      estudiante.email.toLowerCase().includes(busqueda.toLowerCase());
    
    const coincideCurso = cursoSeleccionado === 0 || estudiante.cursoId === cursoSeleccionado;
    
    return coincideBusqueda && coincideCurso;
  });

  // Agrupar estudiantes por curso cuando se selecciona "Todos los Cursos"
  const estudiantesAgrupados = cursoSeleccionado === 0 
    ? estudiantesFiltrados.sort((a, b) => {
        // Primero ordenar por cursoId
        if (a.cursoId !== b.cursoId) {
          return a.cursoId - b.cursoId;
        }
        // Dentro del mismo curso, ordenar alfabéticamente por apellido
        return a.apellidos.localeCompare(b.apellidos);
      })
    : estudiantesFiltrados.sort((a, b) => a.apellidos.localeCompare(b.apellidos));

  // Calcular estadísticas por curso
  const calcularEstadisticas = (cursoId: number) => {
    const estudiantesCurso = cursoId === 0 
      ? estudiantes 
      : estudiantes.filter(e => e.cursoId === cursoId);
    
    const total = estudiantesCurso.length;
    const activos = estudiantesCurso.filter(e => e.estado === 'activo').length;
    const promedio = total > 0 
      ? (estudiantesCurso.reduce((acc, e) => acc + e.promedio, 0) / total).toFixed(1)
      : '0.0';
    const asistenciaPromedio = total > 0
      ? Math.round(estudiantesCurso.reduce((acc, e) => acc + e.asistencia, 0) / total)
      : 0;
    
    return { total, activos, promedio, asistenciaPromedio };
  };

  const estadisticas = calcularEstadisticas(cursoSeleccionado);

  // Obtener color del curso
  const getColorCurso = (cursoId: number) => {
    const curso = cursos.find(c => c.id === cursoId);
    return curso?.color || '#2EBAA0';
  };

  return (
    <div className="estudiantes-page">
      {/* Título */}
      <TituloPage titulo="Gestión de Estudiantes" />
      <p className="page-subtitle">Administra y monitorea el progreso de tus estudiantes por curso</p>

      {/* Filtros por Curso */}
      <div className="cursos-filter">
        <button
          className={`curso-pill ${cursoSeleccionado === 0 ? 'active' : ''}`}
          onClick={() => setCursoSeleccionado(0)}
        >
          <FaBook />
          <span>Todos los Cursos</span>
          <span className="badge">{estudiantes.length}</span>
        </button>
        {cursos.map(curso => {
          const count = estudiantes.filter(e => e.cursoId === curso.id).length;
          return (
            <button
              key={curso.id}
              className={`curso-pill ${cursoSeleccionado === curso.id ? 'active' : ''}`}
              onClick={() => setCursoSeleccionado(curso.id)}
              style={{ '--curso-color': curso.color } as React.CSSProperties}
            >
              <FaGraduationCap />
              <span>{curso.nombre}</span>
              <span className="badge">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <FaUsers />
          </div>
          <div className="stat-content">
            <span className="stat-value">{estadisticas.total}</span>
            <span className="stat-label">Estudiantes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <FaCheckCircle />
          </div>
          <div className="stat-content">
            <span className="stat-value">{estadisticas.activos}</span>
            <span className="stat-label">Activos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <FaTrophy />
          </div>
          <div className="stat-content">
            <span className="stat-value">{estadisticas.promedio}</span>
            <span className="stat-label">Promedio</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
            <FaChartBar />
          </div>
          <div className="stat-content">
            <span className="stat-value">{estadisticas.asistenciaPromedio}%</span>
            <span className="stat-label">Asistencia</span>
          </div>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar por nombre, código o email..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Lista de Estudiantes - Vista Compacta */}
      <div className="estudiantes-table-container">
        <div className="estudiantes-table">
          {/* Header de la tabla */}
          <div className="table-header">
            <div className="th-estudiante">Estudiante</div>
            <div className="th-codigo">Código</div>
            <div className="th-promedio">Promedio</div>
            <div className="th-asistencia">Asistencia</div>
            <div className="th-tareas">Tareas</div>
            <div className="th-acciones">Acción</div>
          </div>

          {/* Filas de estudiantes */}
          <div className="table-body">
            {estudiantesAgrupados.map((estudiante, index) => {
              // Detectar cambio de curso para mostrar separador
              const esNuevoCurso = cursoSeleccionado === 0 && index > 0 && 
                estudiantesAgrupados[index - 1].cursoId !== estudiante.cursoId;
              
              const cursoActual = cursos.find(c => c.id === estudiante.cursoId);

              return (
                <div key={estudiante.id}>
                  {/* Separador de curso */}
                  {esNuevoCurso && (
                    <div 
                      className="curso-separator"
                      style={{ '--curso-color': getColorCurso(estudiante.cursoId) } as React.CSSProperties}
                    >
                      <div className="curso-separator-line"></div>
                      <div className="curso-separator-badge">
                        <FaBook />
                        <span>{cursoActual?.nombre}</span>
                        <span className="curso-count">
                          {estudiantesAgrupados.filter(e => e.cursoId === estudiante.cursoId).length} estudiantes
                        </span>
                      </div>
                      <div className="curso-separator-line"></div>
                    </div>
                  )}

                  {/* Primera fila del curso - mostrar nombre del curso */}
                  {index === 0 && cursoSeleccionado === 0 && (
                    <div 
                      className="curso-separator first"
                      style={{ '--curso-color': getColorCurso(estudiante.cursoId) } as React.CSSProperties}
                    >
                      <div className="curso-separator-line"></div>
                      <div className="curso-separator-badge">
                        <FaBook />
                        <span>{cursoActual?.nombre}</span>
                        <span className="curso-count">
                          {estudiantesAgrupados.filter(e => e.cursoId === estudiante.cursoId).length} estudiantes
                        </span>
                      </div>
                      <div className="curso-separator-line"></div>
                    </div>
                  )}

                  {/* Fila del estudiante */}
                  <div 
                    className="estudiante-row"
                    style={{ '--curso-color': getColorCurso(estudiante.cursoId) } as React.CSSProperties}
                  >
                    {/* Estudiante Info */}
                    <div className="td-estudiante">
                      <div className="estudiante-avatar-small">
                        <FaUserGraduate />
                      </div>
                      <div className="estudiante-info-compact">
                        <span className="nombre-completo">{estudiante.nombres} {estudiante.apellidos}</span>
                        <span className="email-small">{estudiante.email}</span>
                      </div>
                      <span className={`estado-dot ${estudiante.estado}`} title={estudiante.estado}></span>
                    </div>

                    {/* Código */}
                    <div className="td-codigo">
                      <span className="codigo-badge">{estudiante.codigo}</span>
                    </div>

                    {/* Promedio */}
                    <div className="td-promedio">
                      <div className="metric-box">
                        <FaTrophy className="metric-icon" />
                        <span className="metric-value">{estudiante.promedio}</span>
                      </div>
                    </div>

                    {/* Asistencia */}
                    <div className="td-asistencia">
                      <div className="metric-box">
                        <FaCheckCircle className="metric-icon" />
                        <span className="metric-value">{estudiante.asistencia}%</span>
                      </div>
                    </div>

                    {/* Tareas */}
                    <div className="td-tareas">
                      <div className="metric-box">
                        <FaBook className="metric-icon" />
                        <span className="metric-value">{estudiante.tareasEntregadas}/{estudiante.tareasTotal}</span>
                      </div>
                    </div>

                    {/* Acción */}
                    <div className="td-acciones">
                      <button className="btn-mensaje" title="Enviar mensaje">
                        <FaEnvelope />
                        <span>Mensaje</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sin resultados */}
      {estudiantesAgrupados.length === 0 && (
        <div className="no-results">
          <FaUserGraduate className="no-results-icon" />
          <p className="no-results-text">No se encontraron estudiantes</p>
          <p className="no-results-hint">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}