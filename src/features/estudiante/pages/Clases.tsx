import { useState } from 'react';
import ClaseCard from '../components/ClaseCard';
import { clasesData } from '../../../data/clasesData';
import { FaFilter, FaSearch, FaCalendarAlt, FaBook, FaClock } from 'react-icons/fa';
import '../css/Clases.css';

interface Clase {
  id: number;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  aula: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
  estudiantes: number;
  color: string;
  estado: 'activa' | 'finalizada' | 'cancelada';
  descripcion: string;
  proximaClase?: string;
  creditos: number;
  semestre: string;
  linkMeet?: string;
}


export default function Clases() {
  const [clases] = useState<Clase[]>(clasesData);
  const [filtroEstado, setFiltroEstado] = useState<string>('todas');
  const [filtroModalidad, setFiltroModalidad] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');

   const [mostrarArchivadas, setMostrarArchivadas] = useState(false);

  const clasesFiltradas = clases.filter(clase => {
    const cumpleBusqueda = clase.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          clase.docente.toLowerCase().includes(busqueda.toLowerCase());
    
    const cumpleEstado = filtroEstado === 'todas' || clase.estado === filtroEstado;
    const cumpleModalidad = filtroModalidad === 'todas' || clase.modalidad === filtroModalidad;
    
    return cumpleBusqueda && cumpleEstado && cumpleModalidad;
  });

   const clasesVisibles = clasesFiltradas.filter(
    c => mostrarArchivadas ? c.estado === 'finalizada' : c.estado === 'activa'
  );

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
