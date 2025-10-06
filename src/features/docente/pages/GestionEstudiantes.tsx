import { FaUsers, FaSearch, FaPlus, FaEye, FaEdit, FaTrash, FaGraduationCap, FaCheckCircle, FaChartBar } from 'react-icons/fa';
import { useState } from 'react';
import '../css/GestionEstudiantes.css';

interface Estudiante {
  id: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  carrera: string;
  promedio: number;
  estado: 'activo' | 'inactivo';
}

export default function GestionEstudiantes() {
  const [busqueda, setBusqueda] = useState('');
  
  const [estudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      codigo: "202121001",
      nombres: "Ana María",
      apellidos: "García",
      email: "ana.garcia@udh.edu.pe",
      carrera: "Ing. Sistemas",
      promedio: 16.8,
      estado: 'activo'
    },
    {
      id: 2,
      codigo: "202121002", 
      nombres: "Carlos",
      apellidos: "López",
      email: "carlos.lopez@udh.edu.pe",
      carrera: "Ing. Sistemas",
      promedio: 15.2,
      estado: 'activo'
    },
    {
      id: 3,
      codigo: "202121003",
      nombres: "María José",
      apellidos: "Fernández",
      email: "maria.fernandez@udh.edu.pe",
      carrera: "Administración",
      promedio: 17.5,
      estado: 'activo'
    },
    {
      id: 4,
      codigo: "202021004",
      nombres: "Jorge Luis",
      apellidos: "Martínez",
      email: "jorge.martinez@udh.edu.pe",
      carrera: "Ing. Civil",
      promedio: 14.8,
      estado: 'inactivo'
    }
  ]);

  const estudiantesFiltrados = estudiantes.filter(estudiante =>
    estudiante.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    estudiante.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
    estudiante.codigo.includes(busqueda)
  );

  const estadisticas = {
    total: estudiantes.length,
    activos: estudiantes.filter(e => e.estado === 'activo').length,
    promedio: (estudiantes.reduce((acc, e) => acc + e.promedio, 0) / estudiantes.length).toFixed(1)
  };

  return (
    <div className="estudiantes-clean">
      {/* Header Simple */}
      <div className="header-clean">
        <div>
          <h1>Estudiantes</h1>
        </div>
      </div>

      {/* Búsqueda Simple */}
      <div className="search-clean">
        <FaSearch />
        <input
          type="text"
          placeholder="Buscar estudiante..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Lista de Estudiantes */}
      <div className="estudiantes-list">
        {estudiantesFiltrados.map(estudiante => (
          <div key={estudiante.id} className="estudiante-card">
            <div className="estudiante-avatar">
              <FaGraduationCap />
            </div>
            
            <div className="estudiante-info">
              <h3>{estudiante.nombres} {estudiante.apellidos}</h3>
              <p className="codigo">{estudiante.codigo}</p>
              <p className="carrera">{estudiante.carrera}</p>
            </div>
            
            <div className="estudiante-stats">
              <span className="promedio">{estudiante.promedio}</span>
              <span className={`estado ${estudiante.estado}`}>
                {estudiante.estado}
              </span>
            </div>
            
            <div className="estudiante-actions">
              <button className="btn-action">
                <FaEye />
              </button>
              <button className="btn-action">
                <FaEdit />
              </button>
              <button className="btn-action danger">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {estudiantesFiltrados.length === 0 && (
        <div className="no-results">
          <p>No se encontraron estudiantes</p>
        </div>
      )}
    </div>
  );
}