import { useState, useMemo } from 'react';
import type { ReactElement } from 'react';
import {
  FaChartLine,
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaGraduationCap,
  FaFileDownload,
  FaFilter,
  FaCalendarAlt,
  FaTrophy,
  FaChartBar,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUniversity,
  FaFileExcel,
  FaFilePdf,
  FaPrint
} from 'react-icons/fa';
import TituloPage from '../../../components/pages/TituloPage';
import '../css/Reportes.css';

interface ReporteData {
  id: string;
  tipo: 'estudiantes' | 'docentes' | 'cursos' | 'rendimiento';
  titulo: string;
  descripcion: string;
  icon: ReactElement;
  color: string;
  datosRecientes: number;
}

export default function Reportes() {
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState<string>('2025-1');
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<string>('todas');
  const [tipoReporteSeleccionado, setTipoReporteSeleccionado] = useState<string>('general');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Datos de periodos académicos
  const periodos = [
    { id: '2025-1', nombre: '2025-I' },
    { id: '2024-2', nombre: '2024-II' },
    { id: '2024-1', nombre: '2024-I' },
    { id: '2023-2', nombre: '2023-II' }
  ];

  // Facultades
  const facultades = [
    { id: 'todas', nombre: 'Todas las Facultades' },
    { id: 'empresariales', nombre: 'Ciencias Empresariales' },
    { id: 'ingenieria', nombre: 'Ingeniería' },
    { id: 'salud', nombre: 'Ciencias de la Salud' },
    { id: 'derecho', nombre: 'Derecho y Ciencias Políticas' },
    { id: 'educacion', nombre: 'Educación' }
  ];

  // Tipos de reportes disponibles
  const reportesDisponibles: ReporteData[] = [
    {
      id: 'estudiantes',
      tipo: 'estudiantes',
      titulo: 'Reporte de Estudiantes',
      descripcion: 'Matrícula, asistencia y rendimiento académico',
      icon: <FaUsers />,
      color: '#3b82f6',
      datosRecientes: 2458
    },
    {
      id: 'docentes',
      tipo: 'docentes',
      titulo: 'Reporte de Docentes',
      descripcion: 'Carga académica, evaluaciones y desempeño',
      icon: <FaChalkboardTeacher />,
      color: '#10b981',
      datosRecientes: 156
    },
    {
      id: 'cursos',
      tipo: 'cursos',
      titulo: 'Reporte de Cursos',
      descripcion: 'Cursos activos, inscritos y estadísticas',
      icon: <FaBook />,
      color: '#f59e0b',
      datosRecientes: 342
    },
    {
      id: 'rendimiento',
      tipo: 'rendimiento',
      titulo: 'Reporte de Rendimiento',
      descripcion: 'Promedios, aprobación y deserción',
      icon: <FaTrophy />,
      color: '#8b5cf6',
      datosRecientes: 87
    }
  ];

  // Estadísticas generales
  const estadisticasGenerales = useMemo(() => {
    return {
      totalEstudiantes: 2458,
      totalDocentes: 156,
      cursosActivos: 342,
      tasaAprobacion: 87.5,
      tasaAsistencia: 92.3,
      tasaDesercion: 4.2,
      promedioGeneral: 14.8,
      estudiantesActivos: 2340,
      estudiantesInactivos: 118,
      docentesActivos: 148,
      docentesInactivos: 8
    };
  }, [periodoSeleccionado, facultadSeleccionada]);

  // Datos de rendimiento por facultad
  const rendimientoPorFacultad = [
    { nombre: 'C. Empresariales', estudiantes: 680, promedio: 15.2, aprobacion: 89, color: '#3b82f6' },
    { nombre: 'Ingeniería', estudiantes: 520, promedio: 14.8, aprobacion: 85, color: '#10b981' },
    { nombre: 'C. de la Salud', estudiantes: 450, promedio: 15.5, aprobacion: 91, color: '#ef4444' },
    { nombre: 'Derecho', estudiantes: 380, promedio: 14.2, aprobacion: 83, color: '#8b5cf6' },
    { nombre: 'Educación', estudiantes: 428, promedio: 15.0, aprobacion: 88, color: '#f59e0b' }
  ];

  const handleExportarExcel = () => {
    alert('Exportando reporte a Excel...');
    // TODO: Implementar exportación real
  };

  const handleExportarPDF = () => {
    alert('Exportando reporte a PDF...');
    // TODO: Implementar exportación real
  };

  const handleImprimir = () => {
    window.print();
  };

  const handleGenerarReporte = (tipoReporte: string) => {
    setTipoReporteSeleccionado(tipoReporte);
    alert(`Generando reporte de ${tipoReporte}...`);
    // TODO: Implementar generación de reporte
  };

  return (
    <div className="reportes-admin-page">
      {/* Header */}
      <div className="reportes-admin-header">
        <TituloPage
          titulo="📊 Reportes y Estadísticas"
          subtitle="Analiza y genera reportes académicos detallados de la institución"
        />
      </div>

      {/* Filtros y Controles */}
      <div className="reportes-filtros-card">
        <div className="filtros-header">
          <h3 className="filtros-title">
            <FaFilter />
            Filtros de Reporte
          </h3>
          <button
            className="btn-toggle-filtros"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>

        {mostrarFiltros && (
          <div className="filtros-content">
            <div className="filtro-group">
              <label className="filtro-label">
                <FaCalendarAlt />
                Periodo Académico
              </label>
              <select
                className="filtro-select"
                value={periodoSeleccionado}
                onChange={(e) => setPeriodoSeleccionado(e.target.value)}
              >
                {periodos.map(periodo => (
                  <option key={periodo.id} value={periodo.id}>
                    {periodo.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="filtro-group">
              <label className="filtro-label">
                <FaUniversity />
                Facultad
              </label>
              <select
                className="filtro-select"
                value={facultadSeleccionada}
                onChange={(e) => setFacultadSeleccionada(e.target.value)}
              >
                {facultades.map(facultad => (
                  <option key={facultad.id} value={facultad.id}>
                    {facultad.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="filtros-acciones">
              <button className="btn-filtro btn-aplicar">
                <FaFilter />
                Aplicar Filtros
              </button>
              <button className="btn-filtro btn-limpiar">
                Limpiar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas Principales */}
      <div className="estadisticas-grid">
        <div className="stat-card-reporte">
          <div className="stat-icon-reporte" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <FaUsers />
          </div>
          <div className="stat-content-reporte">
            <div className="stat-label-reporte">Total Estudiantes</div>
            <div className="stat-value-reporte">{estadisticasGenerales.totalEstudiantes.toLocaleString()}</div>
            <div className="stat-detalle-reporte">
              <span className="stat-badge activo">{estadisticasGenerales.estudiantesActivos} Activos</span>
              <span className="stat-badge inactivo">{estadisticasGenerales.estudiantesInactivos} Inactivos</span>
            </div>
          </div>
        </div>

        <div className="stat-card-reporte">
          <div className="stat-icon-reporte" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <FaChalkboardTeacher />
          </div>
          <div className="stat-content-reporte">
            <div className="stat-label-reporte">Total Docentes</div>
            <div className="stat-value-reporte">{estadisticasGenerales.totalDocentes}</div>
            <div className="stat-detalle-reporte">
              <span className="stat-badge activo">{estadisticasGenerales.docentesActivos} Activos</span>
              <span className="stat-badge inactivo">{estadisticasGenerales.docentesInactivos} Inactivos</span>
            </div>
          </div>
        </div>

        <div className="stat-card-reporte">
          <div className="stat-icon-reporte" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
            <FaTrophy />
          </div>
          <div className="stat-content-reporte">
            <div className="stat-label-reporte">Promedio General</div>
            <div className="stat-value-reporte">{estadisticasGenerales.promedioGeneral}</div>
            <div className="stat-detalle-reporte">
              <span className="stat-badge aprobacion">{estadisticasGenerales.tasaAprobacion}% Aprobación</span>
            </div>
          </div>
        </div>

        <div className="stat-card-reporte">
          <div className="stat-icon-reporte" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
            <FaChartBar />
          </div>
          <div className="stat-content-reporte">
            <div className="stat-label-reporte">Asistencia Promedio</div>
            <div className="stat-value-reporte">{estadisticasGenerales.tasaAsistencia}%</div>
            <div className="stat-detalle-reporte">
              <span className="stat-badge desercion">{estadisticasGenerales.tasaDesercion}% Deserción</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tipos de Reportes Disponibles */}
      <div className="reportes-disponibles-section">
        <h2 className="section-title">Reportes Disponibles</h2>
        <div className="reportes-grid">
          {reportesDisponibles.map(reporte => (
            <div key={reporte.id} className="reporte-card">
              <div className="reporte-icon" style={{ backgroundColor: `${reporte.color}20`, color: reporte.color }}>
                {reporte.icon}
              </div>
              <div className="reporte-info">
                <h3 className="reporte-titulo">{reporte.titulo}</h3>
                <p className="reporte-descripcion">{reporte.descripcion}</p>
                <div className="reporte-stats">
                  <span className="reporte-dato">{reporte.datosRecientes.toLocaleString()} registros</span>
                </div>
              </div>
              <button
                className="btn-generar-reporte"
                onClick={() => handleGenerarReporte(reporte.tipo)}
              >
                <FaChartLine />
                Generar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rendimiento por Facultad */}
      <div className="rendimiento-facultades-section">
        <h2 className="section-title">Rendimiento por Facultad</h2>
        <div className="rendimiento-tabla">
          <table className="tabla-rendimiento">
            <thead>
              <tr>
                <th>Facultad</th>
                <th>Estudiantes</th>
                <th>Promedio</th>
                <th>Aprobación</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {rendimientoPorFacultad.map((facultad, index) => (
                <tr key={index}>
                  <td>
                    <div className="facultad-cell">
                      <div className="facultad-indicator" style={{ backgroundColor: facultad.color }}></div>
                      {facultad.nombre}
                    </div>
                  </td>
                  <td className="td-center">{facultad.estudiantes}</td>
                  <td className="td-center">
                    <span className={`promedio-badge ${facultad.promedio >= 14 ? 'alto' : 'medio'}`}>
                      {facultad.promedio.toFixed(1)}
                    </span>
                  </td>
                  <td className="td-center">
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${facultad.aprobacion}%`, backgroundColor: facultad.color }}
                      ></div>
                      <span className="progress-text">{facultad.aprobacion}%</span>
                    </div>
                  </td>
                  <td className="td-center">
                    {facultad.aprobacion >= 85 ? (
                      <FaCheckCircle className="icon-estado excelente" />
                    ) : facultad.aprobacion >= 75 ? (
                      <FaClock className="icon-estado regular" />
                    ) : (
                      <FaTimesCircle className="icon-estado bajo" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Botones de Acción Flotantes */}
      <div className="floating-actions">
        <button
          className="floating-btn floating-btn-secondary"
          onClick={handleImprimir}
          title="Imprimir reporte"
        >
          <FaPrint />
          <span>Imprimir</span>
        </button>
        <button
          className="floating-btn floating-btn-secondary"
          onClick={handleExportarPDF}
          title="Exportar a PDF"
        >
          <FaFilePdf />
          <span>PDF</span>
        </button>
        <button
          className="floating-btn floating-btn-primary"
          onClick={handleExportarExcel}
          title="Exportar a Excel"
        >
          <FaFileExcel />
          <span>Excel</span>
        </button>
      </div>
    </div>
  );
}
