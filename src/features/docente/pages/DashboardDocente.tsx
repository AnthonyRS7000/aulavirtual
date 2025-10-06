import { FaBook, FaUsers, FaTasks, FaChartBar, FaPlus, FaEye, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import '../css/DashboardDocente.css';

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  estudiantes: number;
  color: string;
}

export default function DashboardDocente() {
  const [fechaActual, setFechaActual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setFechaActual(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const cursos: Curso[] = [
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Programación Orientada a Objetos",
      estudiantes: 28,
      color: "#4F8A8B"
    },
    {
      id: 2,
      codigo: "IS-302", 
      nombre: "Base de Datos I",
      estudiantes: 25,
      color: "#F9A826"
    },
    {
      id: 3,
      codigo: "IS-303",
      nombre: "Estructura de Datos",
      estudiantes: 30,
      color: "#4ECDC4"
    }
  ];

  const estadisticas = {
    totalCursos: cursos.length,
    totalEstudiantes: cursos.reduce((sum, curso) => sum + curso.estudiantes, 0),
    tareasPorRevisar: 12,
    promedioGeneral: 16.5
  };

  return (
    <div className="dashboard-docente-clean">
      {/* Header Minimalista */}
      <div className="header-clean">
        <div>
          <h1>Panel Docente</h1>
        </div>
      </div>


      {/* Mis Cursos Simplificado */}
      <div className="section-clean">
        <div className="section-title">
          <h2>Mis Cursos</h2>
        </div>
        
        <div className="cursos-clean">
          {cursos.map(curso => (
            <div key={curso.id} className="curso-clean">
              <div className="curso-header" style={{ backgroundColor: curso.color }}>
                <span className="curso-codigo">{curso.codigo}</span>
                <button className="btn-view">
                  <FaEye />
                </button>
              </div>
              <div className="curso-body">
                <h3>{curso.nombre}</h3>
                <span className="estudiantes">{curso.estudiantes} estudiantes</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="actions-clean">
        <div className="action-item">
          <span>Gestionar Cursos</span>
          <FaArrowRight />
        </div>
        <div className="action-item">
          <span>Ver Calificaciones</span>
          <FaArrowRight />
        </div>
        <div className="action-item">
          <span>Crear Material</span>
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}