import { useEffect, useState } from 'react';
import ClaseCard from '../components/ClaseCard';
import {getHorario} from "../services/horarioService";
import { FaFilter, FaSearch, FaCalendarAlt, FaBook, FaClock } from 'react-icons/fa';
import '../css/Clases.css';

interface ClaseAPI {
  codigo_curso: string;
  nombre_curso: string;
  seccion: string;
  ciclo: number;
  creditos: number;
  docente: string;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
}

interface ClaseFront {
  id: string;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  modalidad: string;
  aula: string;
  estudiantes: number;
  proximaClase?: string;
  linkMeet?: string;
  descripcion?: string;
  color?: string;
}

export default function Clases() {
  const [clases, setClases] = useState<ClaseFront[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({ activas: 0, totalCreditos: 0 });

  const [busqueda, setBusqueda] = useState("");
const [filtroEstado, setFiltroEstado] = useState("todas");
const [filtroModalidad, setFiltroModalidad] = useState("todas");
const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

const clasesVisibles = clases.filter(c =>
  c.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getHorario("2020210688", "2025-2");

      const mapped = data.map((c: any) => {
        const dias = [c.lunes, c.martes, c.miercoles, c.jueves, c.viernes, c.sabado, c.domingo]
    .filter(Boolean);

  return {
    id: c.codigo_curso.trim(),
    nombre: c.nombre_curso,
    codigo: c.codigo_curso.trim(),
    docente: c.docente,
    horario: dias.map((d: string) => d.split("->")[0].trim()).join(" | "), // día + hora
    modalidad: "presencial",
    aulas: dias.map((d: string) => d.match(/->(.*) Presencial/)?.[1]?.trim() || "Aula"), // array de salones
    estudiantes: Math.floor(Math.random() * 30) + 20,
    creditos: c.creditos,
    semestre: "2025-2",
    descripcion: `Clase de ${c.nombre_curso} sección ${c.seccion}`,
    color: "#4c7c74"
  };
});

      setClases(mapped);
    setEstadisticas({
        activas: mapped.length,
        totalCreditos: data.reduce((acc: number, c: any) => acc + c.creditos, 0),
      });

    } catch (error) {
      console.error("Error cargando horario", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

const Clases = () => {
  const { clases, loading } = useClases();

  if (loading) return <div>Cargando clases...</div>;

  return (
    <div>
      {clases.map((c) => (
        <div key={c.id}>
          <h3>{c.nombre}</h3>
          <p>{c.horario}</p>
        </div>
      ))}
    </div>
  );
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
            <div>
              <span className="stat-number">{estadisticas.activas}</span>
              <span className="stat-label">Activas</span>
            </div>
          </div>
          <div className="quick-stat">
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
              <option value="todas" disabled hidden>Todos los estados</option>
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

        <div className="toggle-archivadas">
    <button 
      onClick={() => setMostrarArchivadas(false)} 
      className={!mostrarArchivadas ? 'active' : ''}
    >
      Clases Activas
    </button>
    <button 
      onClick={() => setMostrarArchivadas(true)} 
      className={mostrarArchivadas ? 'active' : ''}
    >
      Archivadas
    </button>
  </div>

      <div className="clases-lista">
  {clasesVisibles.length > 0 ? (
    <div className="clases-grid">
      {clasesVisibles.map(clase => (
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
