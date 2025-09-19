import { useState } from 'react';
import ClaseCard from '../components/ClaseCard';
import { FaFilter, FaSearch, FaCalendarAlt, FaBook, FaClock } from 'react-icons/fa';
import '../css/Clases.css';

interface Clase {
  id: number;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  aula: string;
  modalidad: 'presencial' | 'virtual' ;
  estudiantes: number;
  color: string;
  estado: 'activa' | 'finalizada' | 'cancelada';
  descripcion: string;
  proximaClase?: string;
  creditos: number;
  semestre: string;
}

const clasesData: Clase[] = [
  {
    id: 1,
    nombre: "Desarrollo de Software III",
    codigo: "IS301",
    docente: "Dr. Carlos Mendoza",
    horario: "Lunes, Miércoles 14:00-16:00",
    aula: "Lab A-201",
    modalidad: "presencial",
    estudiantes: 28,
    color: "#0066cc",
    estado: "activa",
    descripcion: "Metodologías ágiles, patrones de diseño y arquitecturas de software modernas.",
    proximaClase: "Lun, 22 Ene 14:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 2,
    nombre: "Inteligencia Artificial",
    codigo: "IS402",
    docente: "Dra. María González",
    horario: "Martes, Jueves 16:00-18:00",
    aula: "Aula Virtual",
    modalidad: "virtual",
    estudiantes: 35,
    color: "#059669",
    estado: "activa",
    descripcion: "Algoritmos de IA, machine learning y redes neuronales aplicadas.",
    proximaClase: "Mar, 23 Ene 16:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 3,
    nombre: "Base de Datos Avanzadas",
    codigo: "IS304",
    docente: "Ing. Roberto Silva",
    horario: "Viernes 09:00-13:00",
    aula: "Lab B-102",
    modalidad: "presencial",
    estudiantes: 25,
    color: "#f59e0b",
    estado: "activa",
    descripcion: "Optimización de consultas, data warehousing y bases de datos NoSQL.",
    proximaClase: "Vie, 26 Ene 09:00",
    creditos: 5,
    semestre: "2024-I"
  },
  {
    id: 4,
    nombre: "Gestión de Proyectos TI",
    codigo: "IS350",
    docente: "MBA Ana Torres",
    horario: "Sábados 08:00-12:00",
    aula: "Aula C-301 / Virtual",
    modalidad: "presencial",
    estudiantes: 32,
    color: "#8b5cf6",
    estado: "activa",
    descripcion: "Metodologías de gestión, liderazgo de equipos y gestión de riesgos en TI.",
    proximaClase: "Sáb, 27 Ene 08:00",
    creditos: 3,
    semestre: "2024-I"
  },
  {
    id: 5,
    nombre: "Matemática Computacional",
    codigo: "MAT205",
    docente: "Dr. Luis Ramírez",
    horario: "Lunes, Miércoles 10:00-12:00",
    aula: "Aula A-105",
    modalidad: "presencial",
    estudiantes: 40,
    color: "#ef4444",
    estado: "activa",
    descripcion: "Algoritmos numéricos, optimización y métodos computacionales avanzados.",
    proximaClase: "Lun, 22 Ene 10:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 6,
    nombre: "Ética Profesional",
    codigo: "HUM102",
    docente: "Lic. Patricia Vega",
    horario: "Jueves 18:00-20:00",
    aula: "Aula B-204",
    modalidad: "presencial",
    estudiantes: 45,
    color: "#6b7280",
    estado: "finalizada",
    descripcion: "Principios éticos en la práctica profesional y responsabilidad social.",
    creditos: 2,
    semestre: "2023-II"
  }
];

export default function Clases() {
  const [clases] = useState<Clase[]>(clasesData);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [filtroModalidad, setFiltroModalidad] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

  const clasesFiltradas = clases.filter(clase => {
    const cumpleBusqueda = clase.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.docente.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'todas' || clase.estado === filtroEstado;
    const cumpleModalidad = filtroModalidad === 'todas' || clase.modalidad === filtroModalidad;
    
    return cumpleBusqueda && cumpleEstado && cumpleModalidad;
  });

  const estadisticas = {
    totalClases: clases.length,
    activas: clases.filter(c => c.estado === 'activa').length,
    presenciales: clases.filter(c => c.modalidad === 'presencial').length,
    virtuales: clases.filter(c => c.modalidad === 'virtual').length,
    totalCreditos: clases.filter(c => c.estado === 'activa').reduce((sum, c) => sum + c.creditos, 0)
  };

  return (
    <div className="clases-page">
      <div className="clases-header">
        <div className="header-content">
          <h1>Mis Clases</h1>
          <p>Gestiona tus cursos y consulta la información académica</p>
        </div>
        <div className="header-stats">
          <div className="quick-stat">
            <FaBook className="stat-icon" />
            <div>
              <span className="stat-number">{estadisticas.activas}</span>
              <span className="stat-label">Activas</span>
            </div>
          </div>
          <div className="quick-stat">
            <FaClock className="stat-icon" />
            <div>
              <span className="stat-number">{estadisticas.totalCreditos}</span>
              <span className="stat-label">Créditos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="clases-filtros">
        <div className="filtros-busqueda">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar clases..."
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
              <option value="activa">Activas</option>
              <option value="finalizada">Finalizadas</option>
              <option value="cancelada">Canceladas</option>
            </select>
          </div>

          <div className="filter-group">
            <FaCalendarAlt className="filter-icon" />
            <select
              value={filtroModalidad}
              onChange={(e) => setFiltroModalidad(e.target.value)}
            >
              <option value="todas">Todas las modalidades</option>
              <option value="presencial">Presencial</option>
              <option value="virtual">Virtual</option>
              <option value="hibrida">Híbrida</option>
            </select>
          </div>
        </div>
      </div>

      <div className="clases-lista">
        {clasesFiltradas.length > 0 ? (
          <div className="clases-grid">
            {clasesFiltradas.map(clase => (
              <ClaseCard key={clase.id} curso={clase} />
            ))}
          </div>
        ) : (
          <div className="no-clases">
            <FaBook className="no-clases-icon" />
            <p>No se encontraron clases que coincidan con los filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
