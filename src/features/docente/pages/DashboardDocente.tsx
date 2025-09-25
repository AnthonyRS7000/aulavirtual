import React, { useState } from 'react';
import { 
  AcademicCapIcon, 
  UserGroupIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon,
  PlusIcon,
  BookOpenIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import '../css/DashboardDocente.css';

interface Curso {
  id: number;
  nombre: string;
  codigo: string;
  estudiantes: number;
  tareasPendientes: number;
  proximaClase: string;
  color: string;
}

interface TareaPendiente {
  id: number;
  titulo: string;
  curso: string;
  fechaLimite: string;
  entregadas: number;
  total: number;
}

const DashboardDocente: React.FC = () => {
  const [cursosActivos] = useState<Curso[]>([
    {
      id: 1,
      nombre: 'Evaluación de Proyectos',
      codigo: 'FC-SMVIBS-SP08C01N',
      estudiantes: 45,
      tareasPendientes: 3,
      proximaClase: '2025-09-26 14:00',
      color: '#e74c3c'
    },
    {
      id: 2,
      nombre: 'Planeamiento y Gestión Estratégica',
      codigo: 'FC-SMVADM-SP09B01N',
      estudiantes: 38,
      tareasPendientes: 2,
      proximaClase: '2025-09-27 10:00',
      color: '#27ae60'
    },
    {
      id: 3,
      nombre: 'Investigación de Mercados',
      codigo: 'FC-SMVMKT-SP07A01N',
      estudiantes: 32,
      tareasPendientes: 1,
      proximaClase: '2025-09-28 16:00',
      color: '#3498db'
    }
  ]);

  const [tareasPendientes] = useState<TareaPendiente[]>([
    {
      id: 1,
      titulo: 'Análisis de Viabilidad Económica',
      curso: 'Evaluación de Proyectos',
      fechaLimite: '2025-09-30',
      entregadas: 35,
      total: 45
    },
    {
      id: 2,
      titulo: 'Plan Estratégico Empresarial',
      curso: 'Planeamiento y Gestión Estratégica',
      fechaLimite: '2025-10-02',
      entregadas: 28,
      total: 38
    }
  ]);

  const estadisticas = {
    cursosActivos: cursosActivos.length,
    totalEstudiantes: cursosActivos.reduce((sum, curso) => sum + curso.estudiantes, 0),
    tareasPorRevisar: tareasPendientes.reduce((sum, tarea) => sum + tarea.entregadas, 0),
    proximasClases: cursosActivos.filter(curso => 
      new Date(curso.proximaClase) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
    ).length
  };

  return (
    <div className="dashboard-docente">
      <div className="dashboard-container">
        
        {/* Header de Bienvenida */}
        <div className="header-bienvenida-docente">
          <div className="bienvenida-content">
            <h1 className="titulo-bienvenida-docente">¡Bienvenido, Prof. García!</h1>
            <p className="subtitulo-docente">Panel de Control - Docente</p>
          </div>
          <div className="fecha-hora-docente">
            <span>{new Date().toLocaleDateString('es-ES', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Estadísticas Rápidas */}
        <div className="estadisticas-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <BookOpenIcon />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.cursosActivos}</h3>
              <p>Cursos Activos</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <UserGroupIcon />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.totalEstudiantes}</h3>
              <p>Total Estudiantes</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <ClipboardDocumentListIcon />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.tareasPorRevisar}</h3>
              <p>Tareas por Revisar</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <ClockIcon />
            </div>
            <div className="stat-content">
              <h3>{estadisticas.proximasClases}</h3>
              <p>Clases Hoy</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          
          {/* Mis Cursos */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Mis Cursos</h2>
              <button className="btn-crear">
                <PlusIcon />
                Crear Curso
              </button>
            </div>
            
            <div className="cursos-grid">
              {cursosActivos.map(curso => (
                <div key={curso.id} className="curso-card-docente" style={{ borderLeftColor: curso.color }}>
                  <div className="curso-header">
                    <h3>{curso.nombre}</h3>
                    <span className="curso-codigo">{curso.codigo}</span>
                  </div>
                  
                  <div className="curso-stats">
                    <div className="stat-item">
                      <UserGroupIcon className="icon-small" />
                      <span>{curso.estudiantes} estudiantes</span>
                    </div>
                    
                    <div className="stat-item">
                      <ClipboardDocumentListIcon className="icon-small" />
                      <span>{curso.tareasPendientes} tareas pendientes</span>
                    </div>
                    
                    <div className="stat-item">
                      <ClockIcon className="icon-small" />
                      <span>Próxima: {new Date(curso.proximaClase).toLocaleString('es-ES')}</span>
                    </div>
                  </div>
                  
                  <div className="curso-actions">
                    <button className="btn-secundario">Ver Detalles</button>
                    <button className="btn-primario">Gestionar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas Pendientes de Revisión */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Tareas Pendientes de Revisión</h2>
              <button className="btn-crear">
                <PlusIcon />
                Nueva Tarea
              </button>
            </div>
            
            <div className="tareas-pendientes-list">
              {tareasPendientes.map(tarea => (
                <div key={tarea.id} className="tarea-pendiente-card">
                  <div className="tarea-info">
                    <h4>{tarea.titulo}</h4>
                    <p className="tarea-curso">{tarea.curso}</p>
                    <p className="tarea-fecha">Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString('es-ES')}</p>
                  </div>
                  
                  <div className="tarea-progreso">
                    <div className="progreso-bar">
                      <div 
                        className="progreso-fill" 
                        style={{ width: `${(tarea.entregadas / tarea.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="progreso-text">
                      {tarea.entregadas}/{tarea.total} entregadas
                    </span>
                  </div>
                  
                  <div className="tarea-actions">
                    <button className="btn-revisar">
                      Revisar ({tarea.entregadas})
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accesos Rápidos */}
          <div className="dashboard-section accesos-rapidos">
            <h2>Accesos Rápidos</h2>
            
            <div className="accesos-grid">
              <button className="acceso-card">
                <AcademicCapIcon />
                <span>Gestionar Cursos</span>
              </button>
              
              <button className="acceso-card">
                <UserGroupIcon />
                <span>Ver Estudiantes</span>
              </button>
              
              <button className="acceso-card">
                <ClipboardDocumentListIcon />
                <span>Crear Tarea</span>
              </button>
              
              <button className="acceso-card">
                <ChartBarIcon />
                <span>Calificaciones</span>
              </button>
            </div>
          </div>

          {/* Alertas y Notificaciones */}
          <div className="dashboard-section alertas-section">
            <h2>Alertas y Recordatorios</h2>
            
            <div className="alertas-list">
              <div className="alerta-item urgente">
                <ExclamationTriangleIcon />
                <div>
                  <h4>Fecha límite próxima</h4>
                  <p>La tarea "Análisis de Viabilidad Económica" vence mañana</p>
                </div>
              </div>
              
              <div className="alerta-item info">
                <ClockIcon />
                <div>
                  <h4>Clase programada</h4>
                  <p>Evaluación de Proyectos - Mañana a las 14:00</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardDocente;