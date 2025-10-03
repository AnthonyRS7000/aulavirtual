import { useState } from 'react';
import TareaCard from './TareaCard';
import { FaFilter, FaSearch, FaPlus, FaCalendarAlt} from 'react-icons/fa';
import '../css/Tareas.css';
import TituloPage from '../../../components/pages/TituloPage';

interface ArchivoEntrega {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  fechaSubida: string;
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  materia: string;
  profesor: string;
  fechaEntrega: string;
  fechaPublicacion: string;
  estado: 'pendiente' | 'entregada' | 'revision' | 'calificada';
  // prioridad eliminada por petición de diseño
  nota?: number;
  comentarios?: string;
  archivosEntregados?: ArchivoEntrega[];
  tipoEntrega: 'archivo' | 'texto' | 'enlace';
  formatosPermitidos?: string[];
  tamanosMaximo?: number; // en MB
  permitirEntregaTardia?: boolean;
}

const tareasData: Tarea[] = [
  {
    id: 1,
    titulo: "Ensayo sobre Inteligencia Artificial",
    descripcion: "Desarrollar un ensayo de 2000 palabras sobre el impacto de la Inteligencia Artificial en la sociedad moderna, incluyendo aspectos éticos y tecnológicos. Desarrollar un ensayo de 2000 palabras sobre el impacto de la Inteligencia Artificial en la sociedad moderna, incluyendo aspectos éticos y tecnológicos.",
    materia: "Tecnologías Emergentes",
    profesor: "Dr. Carlos Mendoza",
    fechaEntrega: "2024-01-20",
    fechaPublicacion: "2024-01-05",
    estado: "pendiente",
    
    tipoEntrega: "archivo",
    formatosPermitidos: [".pdf", ".docx"],
    tamanosMaximo: 10,
    permitirEntregaTardia: false
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
    
    tipoEntrega: "archivo",
    formatosPermitidos: [".sql", ".pdf", ".zip"],
    tamanosMaximo: 50,
    permitirEntregaTardia: true,
    archivosEntregados: [
      {
        id: "1",
        nombre: "proyecto_bd_hospital.sql",
        tipo: "application/sql",
        tamaño: 15.2,
        fechaSubida: "2024-01-24 18:30"
      },
      {
        id: "2", 
        nombre: "documentacion.pdf",
        tipo: "application/pdf",
        tamaño: 8.5,
        fechaSubida: "2024-01-24 18:35"
      }
    ]
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
    
    tipoEntrega: "archivo",
    formatosPermitidos: [".py", ".pdf", ".zip"],
    tamanosMaximo: 25,
    permitirEntregaTardia: true
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
    
    nota: 18,
    comentarios: "Excelente trabajo, muy detallado el análisis. Mejorar la conclusión.",
    tipoEntrega: "archivo",
    formatosPermitidos: [".pdf", ".docx"],
    tamanosMaximo: 20,
    permitirEntregaTardia: false,
    archivosEntregados: [
      {
        id: "3",
        nombre: "reporte_practica_final.pdf",
        tipo: "application/pdf",
        tamaño: 12.8,
        fechaSubida: "2024-01-14 22:15"
      }
    ]
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
    
    tipoEntrega: "texto",
    permitirEntregaTardia: true
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
    
    tipoEntrega: "enlace",
    permitirEntregaTardia: true,
    archivosEntregados: [
      {
        id: "4",
        nombre: "enlace_github_proyecto.txt",
        tipo: "text/plain",
        tamaño: 0.1,
        fechaSubida: "2024-02-04 16:20"
      }
    ]
  }
];

export default function Tareas() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasData);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  const tareasFiltradas = tareas.filter(tarea => {
    const cumpleBusqueda = tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          tarea.materia.toLowerCase().includes(busqueda.toLowerCase()) ||
                          tarea.profesor.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'todas' || tarea.estado === filtroEstado;
  return cumpleBusqueda && cumpleEstado;
  });

  const contadores = {
    pendientes: tareas.filter(t => t.estado === 'pendiente').length,
    entregadas: tareas.filter(t => t.estado === 'entregada').length,
    revision: tareas.filter(t => t.estado === 'revision').length,
    calificadas: tareas.filter(t => t.estado === 'calificada').length
  };

  return (
    <div className="tareas-page">

          <TituloPage titulo="Mis Tareas" />

          <p className="page-subtitle">Gestiona y sigue el progreso de tus asignaciones académicas</p>
      
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

          {/* prioridad removida: no mostrar select */}
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
