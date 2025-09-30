import { useState } from 'react';
import ClaseCard from '../components/ClaseCard';
import { FaFilter, FaSearch, FaBook } from 'react-icons/fa';
import '../css/Clases.css';

interface Clase {
  id: string;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  creditos: number;
  semestre: string;
  descripcion: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
  estado: 'activa' | 'archivada';
  color: string;
  aulas?: string[];
}

export default function Clases() {
  // 🔹 Clases de ejemplo
  const [clases] = useState<Clase[]>([
    {
      id: "1",
      nombre: "Programación Web",
      codigo: "INF-301",
      docente: "Ing. Juan Pérez",
      horario: "Lun y Mié 10:00 - 12:00",
      creditos: 4,
      semestre: "2025-2",
      descripcion: "Curso orientado al desarrollo de aplicaciones web modernas.",
      modalidad: "virtual",
      estado: "activa",
      color: "#4CAF50",
      aulas: ["Aula Virtual 1"]
    },
    {
      id: "2",
      nombre: "Base de Datos",
      codigo: "INF-210",
      docente: "MSc. Rosa Gómez",
      horario: "Mar y Jue 14:00 - 16:00",
      creditos: 3,
      semestre: "2025-2",
      descripcion: "Fundamentos y práctica de modelado y gestión de bases de datos.",
      modalidad: "presencial",
      estado: "activa",
      color: "#2196F3",
      aulas: ["Laboratorio 2"]
    },
    {
      id: "3",
      nombre: "Matemática Discreta",
      codigo: "MAT-110",
      docente: "Dr. Carlos Ruiz",
      horario: "Vie 08:00 - 11:00",
      creditos: 3,
      semestre: "2024-2",
      descripcion: "Curso archivado para fundamentos de lógica matemática y estructuras discretas.",
      modalidad: "hibrida",
      estado: "archivada",
      color: "#9C27B0",
      aulas: ["Aula 305", "Aula Virtual 3"]
    }
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroModalidad, setFiltroModalidad] = useState("todas");
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

  // 🔹 Filtros
  const clasesFiltradas = clases.filter(c => {
    const coincideBusqueda = c.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado =
      filtroEstado === "todas" || c.estado === filtroEstado;
    const coincideModalidad =
      filtroModalidad === "todas" || c.modalidad === filtroModalidad;
    const coincideArchivadas = mostrarArchivadas
      ? c.estado === "archivada"
      : c.estado === "activa";

    return coincideBusqueda && coincideEstado && coincideModalidad && coincideArchivadas;
  });

  return (
    <div className="clases-page">
      <div className="clases-header">
        <div className="header-content">
          <h1>Mis Clases</h1>
          <p>Gestiona tus cursos y consulta la información académica</p>
        </div>
        <div className="header-stats">
          <div className="quick-stat">
            <span className="stat-number">
              {clases.filter(c => c.estado === "activa").length}
            </span>
            <span className="stat-label">Activas</span>
          </div>
          <div className="quick-stat">
            <span className="stat-number">
              {clases.reduce((acc, c) => acc + c.creditos, 0)}
            </span>
            <span className="stat-label">Créditos</span>
          </div>
        </div>
      </div>

      {/* 🔹 Filtros */}
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
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="todas">Todos los estados</option>
            <option value="activa">Activas</option>
            <option value="archivada">Archivadas</option>
          </select>

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

      {/* 🔹 Toggle activas / archivadas */}
      <div className="toggle-archivadas">
        <button
          onClick={() => setMostrarArchivadas(false)}
          className={!mostrarArchivadas ? "active" : ""}
        >
          Clases Activas
        </button>
        <button
          onClick={() => setMostrarArchivadas(true)}
          className={mostrarArchivadas ? "active" : ""}
        >
          Archivadas
        </button>
      </div>

      {/* 🔹 Lista de clases */}
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
