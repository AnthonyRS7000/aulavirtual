import { useEffect, useState } from 'react';
import ClaseCard from '../components/ClaseCard';
import { useClases } from '../../../context/ClasesContext';
import {getHorario} from "../services/horarioService";
import { FaFilter, FaSearch, FaCalendarAlt, FaBook, FaClock } from 'react-icons/fa';
import '../css/Clases.css';

export default function Clases() {
  const { clases, loading, estadisticas } = useClases();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [filtroModalidad, setFiltroModalidad] = useState("todas");
  const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

  if (loading) return <p>Cargando...</p>;

const clasesVisibles = clases.filter(c =>
  c.nombre.toLowerCase().includes(busqueda.toLowerCase())
);

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
