import { useState } from 'react';
import TareaCard from '../components/TareaCard';
import { FaFilter, FaSearch, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import '../css/Tareas.css';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  profesor: string;
  fechaEntrega: string;
  fechaPublicacion: string;
  estado: 'pendiente' | 'entregada' | 'revision' | 'calificada';
  prioridad: 'alta' | 'media' | 'baja';
  nota?: number;
  comentarios?: string;
}

const tareasData: Tarea[] = [
  {
    id: 1,
    titulo: "Ensayo sobre Inteligencia Artificial",
    descripcion: "Desarrollar un ensayo de 2000 palabras sobre el impacto de la Inteligencia Artificial en la sociedad moderna, incluyendo aspectos éticos y tecnológicos.",
    materia: "Tecnologías Emergentes",
    profesor: "Dr. Carlos Mendoza",
    fechaEntrega: "2024-01-20",
    fechaPublicacion: "2024-01-05",
    estado: "pendiente",
    prioridad: "alta"
  },
  {
    id: 2,
    titulo: "Proyecto de Base de Datos",
    descripcion: "Diseñar e implementar una base de datos para un sistema de gestión hospitalaria con al menos 10 tablas relacionadas.",
    materia: "Base de Datos II",
    profesor: "Ing. María González",
    fechaEntrega: "2024-01-25",
    fechaPublicacion: "2024-01-10",
    estado: "entregada",
    prioridad: "alta"
  },
  {
    id: 3,
    titulo: "Análisis de Algoritmos de Ordenamiento",
    descripcion: "Comparar la eficiencia de diferentes algoritmos de ordenamiento implementándolos en Python y analizando su complejidad temporal.",
    materia: "Algoritmos y Estructuras de Datos",
    profesor: "Dr. Roberto Silva",
    fechaEntrega: "2024-01-30",
    fechaPublicacion: "2024-01-12",
    estado: "pendiente",
    prioridad: "media"
  },
  {
    id: 4,
    titulo: "Reporte de Práctica Profesional",
    descripcion: "Elaborar un reporte detallado de las actividades realizadas durante la práctica profesional en la empresa asignada.",
    materia: "Práctica Profesional",
    profesor: "Lic. Ana Torres",
    fechaEntrega: "2024-01-15",
    fechaPublicacion: "2024-01-01",
    estado: "calificada",
    prioridad: "alta",
    nota: 18,
    comentarios: "Excelente trabajo, muy detallado el análisis. Mejorar la conclusión."
  },
  {
    id: 5,
    titulo: "Ejercicios de Cálculo Integral",
    descripcion: "Resolver los ejercicios del capítulo 8 del libro de texto, problemas 1-15 y 20-25.",
    materia: "Cálculo Integral",
    profesor: "Dr. Luis Ramírez",
    fechaEntrega: "2024-01-22",
    fechaPublicacion: "2024-01-14",
    estado: "pendiente",
    prioridad: "baja"
  },
  {
    id: 6,
    titulo: "Proyecto de Desarrollo Web",
    descripcion: "Crear una aplicación web completa usando React y Node.js que incluya autenticación de usuarios y CRUD básico.",
    materia: "Desarrollo Web",
    profesor: "Ing. Patricia Vega",
    fechaEntrega: "2024-02-05",
    fechaPublicacion: "2024-01-15",
    estado: "revision",
    prioridad: "alta"
  }
];

export default function Tareas() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasData);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [filtroPrioridad, setFiltroPrioridad] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  const tareasFiltradas = tareas.filter(tarea => {
    const cumpleBusqueda = tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          tarea.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
                          tarea.profesor.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'todas' || tarea.estado === filtroEstado;
    const cumplePrioridad = filtroPrioridad === 'todas' || tarea.prioridad === filtroPrioridad;
    
    return cumpleBusqueda && cumpleEstado && cumplePrioridad;
  });

  const contadores = {
    pendientes: tareas.filter(t => t.estado === 'pendiente').length,
    entregadas: tareas.filter(t => t.estado === 'entregada').length,
    revision: tareas.filter(t => t.estado === 'revision').length,
    calificadas: tareas.filter(t => t.estado === 'calificada').length
  };

  return (
    <div className="tareas-page">
      <div className="tareas-header">
        <div className="header-content">
          <h1>Mis Tareas</h1>
          <p>Gestiona y sigue el progreso de tus asignaciones académicas</p>
        </div>
        <button className="btn-nueva-tarea">
          <FaPlus /> Nueva Consulta
        </button>
      </div>

      <div className="tareas-stats">
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
      </div>

      <div className="tareas-filtros">
        <div className="filtros-busqueda">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar tareas..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </div>

        <div className="filtros-dropdown">
          <div className="filter-group">
            <FaFilter className="filter-icon" />
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todas">Todos los estados</option>
              <option value="pendiente">Pendientes</option>
              <option value="entregada">Entregadas</option>
              <option value="revision">En Revisión</option>
              <option value="calificada">Calificadas</option>
            </select>
          </div>

          <div className="filter-group">
            <FaCalendarAlt className="filter-icon" />
            <select
              value={filtroPrioridad}
              onChange={(e) => setFiltroPrioridad(e.target.value)}
            >
              <option value="todas">Todas las prioridades</option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tareas-lista">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map(tarea => (
            <TareaCard key={tarea.id} tarea={tarea} />
          ))
        ) : (
          <div className="no-tareas">
            <p>No se encontraron tareas que coincidan con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
