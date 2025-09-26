import { FaBook, FaUsers, FaTasks, FaChartBar, FaPlus, FaEye, FaEdit, FaCalendarAlt, FaBell, FaFileAlt, FaGraduationCap, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import '../css/DashboardDocente.css';

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  ciclo: string;
  estudiantes: number;
  tareasPendientes: number;
  ultimaActividad: string;
}

interface TareaPendiente {
  id: number;
  titulo: string;
  curso: string;
  fechaLimite: string;
  entregas: number;
  totalEstudiantes: number;
  urgente: boolean;
}

interface Alerta {
  id: number;
  tipo: 'urgente' | 'info' | 'exito';
  titulo: string;
  mensaje: string;
  fecha: string;
}

export default function DashboardDocente() {
  const [fechaActual, setFechaActual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaActual(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Datos simulados
  const cursos: Curso[] = [
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Programación Orientada a Objetos",
      ciclo: "2025-2",
      estudiantes: 28,
      tareasPendientes: 3,
      ultimaActividad: "Hace 2 horas"
    },
    {
      id: 2,
      codigo: "IS-302", 
      nombre: "Base de Datos I",
      ciclo: "2025-2",
      estudiantes: 25,
      tareasPendientes: 1,
      ultimaActividad: "Hace 1 día"
    },
    {
      id: 3,
      codigo: "IS-303",
      nombre: "Estructura de Datos y Algoritmos",
      ciclo: "2025-2", 
      estudiantes: 30,
      tareasPendientes: 2,
      ultimaActividad: "Hace 3 horas"
    }
  ];

  const tareasPendientes: TareaPendiente[] = [
    {
      id: 1,
      titulo: "Examen Parcial - POO",
      curso: "Programación Orientada a Objetos",
      fechaLimite: "2025-01-15",
      entregas: 18,
      totalEstudiantes: 28,
      urgente: true
    },
    {
      id: 2,
      titulo: "Proyecto Final - Base de Datos",
      curso: "Base de Datos I", 
      fechaLimite: "2025-01-20",
      entregas: 20,
      totalEstudiantes: 25,
      urgente: false
    }
  ];

  const alertas: Alerta[] = [
    {
      id: 1,
      tipo: 'urgente',
      titulo: 'Entrega próxima a vencer',
      mensaje: 'El examen parcial de POO vence en 2 días',
      fecha: '2025-01-13'
    },
    {
      id: 2,
      tipo: 'info',
      titulo: 'Nueva funcionalidad disponible',
      mensaje: 'Ya puedes crear rúbricas personalizadas',
      fecha: '2025-01-12'
    }
  ];

  const estadisticas = {
    totalCursos: cursos.length,
    totalEstudiantes: cursos.reduce((sum, curso) => sum + curso.estudiantes, 0),
    tareasPorRevisar: tareasPendientes.reduce((sum, tarea) => sum + tarea.entregas, 0),
    promedioGeneral: 16.5
  };

  const accesosRapidos = [
    { icono: FaPlus, titulo: 'Crear Tarea', accion: () => console.log('Crear tarea') },
    { icono: FaUsers, titulo: 'Mis Estudiantes', accion: () => console.log('Ver estudiantes') },
    { icono: FaFileAlt, titulo: 'Materiales', accion: () => console.log('Subir material') },
    { icono: FaChartBar, titulo: 'Calificaciones', accion: () => console.log('Ver calificaciones') },
    { icono: FaBell, titulo: 'Anuncios', accion: () => console.log('Crear anuncio') },
    { icono: FaCalendarAlt, titulo: 'Calendario', accion: () => console.log('Ver calendario') }
  ];

  return (
    <div className="dashboard-docente-usil">
      <div className="dashboard-container">
        {/* Header minimalista */}
        <div className="header-docente">
          <div className="header-content">
            <h1>Panel Docente</h1>
            <p>Gestiona tus cursos y estudiantes de manera eficiente</p>
          </div>
          <div className="fecha-widget">
            <FaClock className="clock-icon" />
            <span>{fechaActual.toLocaleDateString('es-ES', { 
              weekday: 'long',
              day: 'numeric', 
              month: 'long',
              year: 'numeric'
            })}</span>
          </div>
        </div>

        {/* Estadísticas simples */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaBook />
            </div>
            <div className="stat-content">
              <span className="stat-number">{estadisticas.totalCursos}</span>
              <span className="stat-label">Cursos Activos</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers />
            </div>
            <div className="stat-content">
              <span className="stat-number">{estadisticas.totalEstudiantes}</span>
              <span className="stat-label">Estudiantes</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaTasks />
            </div>
            <div className="stat-content">
              <span className="stat-number">{estadisticas.tareasPorRevisar}</span>
              <span className="stat-label">Por Revisar</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartBar />
            </div>
            <div className="stat-content">
              <span className="stat-number">{estadisticas.promedioGeneral}</span>
              <span className="stat-label">Promedio General</span>
            </div>
          </div>
        </div>

        {/* Grid principal */}
        <div className="main-grid">
          {/* Mis Cursos */}
          <div className="section-card">
            <div className="section-header">
              <h2>Mis Cursos</h2>
              <button className="btn-crear">
                <FaPlus />
                Crear Curso
              </button>
            </div>
            
            <div className="cursos-list">
              {cursos.map(curso => (
                <div key={curso.id} className="curso-item">
                  <div className="curso-info">
                    <div className="curso-titulo">
                      <h3>{curso.nombre}</h3>
                      <span className="curso-codigo">{curso.codigo}</span>
                    </div>
                    <div className="curso-stats">
                      <span><FaUsers className="mini-icon" /> {curso.estudiantes} estudiantes</span>
                      <span><FaTasks className="mini-icon" /> {curso.tareasPendientes} tareas pendientes</span>
                      <span><FaClock className="mini-icon" /> {curso.ultimaActividad}</span>
                    </div>
                  </div>
                  <div className="curso-actions">
                    <button className="btn-accion" title="Ver curso">
                      <FaEye />
                    </button>
                    <button className="btn-accion" title="Editar">
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tareas por Revisar */}
          <div className="section-card">
            <div className="section-header">
              <h2>Tareas por Revisar</h2>
              <span className="badge-count">{tareasPendientes.length}</span>
            </div>
            
            <div className="tareas-list">
              {tareasPendientes.map(tarea => (
                <div key={tarea.id} className={`tarea-item ${tarea.urgente ? 'urgente' : ''}`}>
                  <div className="tarea-info">
                    <h4>{tarea.titulo}</h4>
                    <p className="tarea-curso">{tarea.curso}</p>
                    <div className="tarea-detalles">
                      <span>Vence: {new Date(tarea.fechaLimite).toLocaleDateString('es-ES')}</span>
                      <span>{tarea.entregas}/{tarea.totalEstudiantes} entregas</span>
                    </div>
                  </div>
                  <div className="progreso-circular">
                    <div className="progreso-valor">
                      {Math.round((tarea.entregas / tarea.totalEstudiantes) * 100)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accesos rápidos */}
        <div className="section-card accesos-section">
          <div className="section-header">
            <h2>Accesos Rápidos</h2>
          </div>
          
          <div className="accesos-grid">
            {accesosRapidos.map((acceso, index) => (
              <div key={index} className="acceso-item" onClick={acceso.accion}>
                <acceso.icono className="acceso-icon" />
                <span>{acceso.titulo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas y Notificaciones */}
        <div className="section-card alertas-section">
          <div className="section-header">
            <h2>Alertas y Notificaciones</h2>
          </div>
          
          <div className="alertas-list">
            {alertas.map(alerta => (
              <div key={alerta.id} className={`alerta-item ${alerta.tipo}`}>
                <div className="alerta-icon">
                  {alerta.tipo === 'urgente' ? <FaExclamationTriangle /> : 
                   alerta.tipo === 'exito' ? <FaCheckCircle /> : <FaBell />}
                </div>
                <div className="alerta-content">
                  <h4>{alerta.titulo}</h4>
                  <p>{alerta.mensaje}</p>
                  <span className="alerta-fecha">{alerta.fecha}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}