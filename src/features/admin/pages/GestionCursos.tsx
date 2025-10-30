import React, { useState, useMemo } from "react";
import "../css/GestionCursos.css";
import {
  FaBook,
  FaUniversity,
  FaGraduationCap,
  FaPlus,
  FaFileExport,
  FaEdit,
  FaTrash,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Interfaces
interface Facultad {
  id: number;
  nombre: string;
  icono: string;
  color: string;
}

interface Programa {
  id: number;
  nombre: string;
  facultadId: number;
}

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  horasTeoria: number;
  horasPractica: number;
  ciclo: number;
  facultadId: number;
  programaId: number;
  activo: boolean;
}

// Datos de facultades
const facultades: Facultad[] = [
  {
    id: 1,
    nombre: "Ciencias Empresariales",
    icono: "🏛",
    color: "#3b82f6",
  },
  {
    id: 2,
    nombre: "Derecho y Ciencias Políticas",
    icono: "⚖️",
    color: "#8b5cf6",
  },
  {
    id: 3,
    nombre: "Ingeniería",
    icono: "🖥",
    color: "#10b981",
  },
  {
    id: 4,
    nombre: "Ciencias de la Salud",
    icono: "🧠",
    color: "#ef4444",
  },
  {
    id: 5,
    nombre: "Educación",
    icono: "📚",
    color: "#f59e0b",
  },
];

// Datos de programas académicos
const programas: Programa[] = [
  // Ciencias Empresariales
  { id: 1, nombre: "Administración de Empresas", facultadId: 1 },
  { id: 2, nombre: "Contabilidad y Finanzas", facultadId: 1 },
  { id: 3, nombre: "Marketing y Negocios Internacionales", facultadId: 1 },
  { id: 4, nombre: "Turismo, Hotelería y Gastronomía", facultadId: 1 },
  
  // Derecho
  { id: 5, nombre: "Derecho y Ciencias Políticas", facultadId: 2 },
  
  // Ingeniería
  { id: 6, nombre: "Ingeniería de Sistemas e Informática", facultadId: 3 },
  { id: 7, nombre: "Ingeniería Civil", facultadId: 3 },
  { id: 8, nombre: "Ingeniería Ambiental", facultadId: 3 },
  { id: 9, nombre: "Arquitectura", facultadId: 3 },
  
  // Ciencias de la Salud
  { id: 10, nombre: "Enfermería", facultadId: 4 },
  { id: 11, nombre: "Obstetricia", facultadId: 4 },
  { id: 12, nombre: "Odontología", facultadId: 4 },
  { id: 13, nombre: "Psicología", facultadId: 4 },
  
  // Educación
  { id: 14, nombre: "Educación Básica: Inicial y Primaria", facultadId: 5 },
];

// Función para convertir números a romanos
const numeroARomano = (num: number): string => {
  const valores = [10, 9, 5, 4, 1];
  const simbolos = ['X', 'IX', 'V', 'IV', 'I'];
  let resultado = '';
  
  for (let i = 0; i < valores.length; i++) {
    while (num >= valores[i]) {
      resultado += simbolos[i];
      num -= valores[i];
    }
  }
  
  return resultado;
};

// Datos de cursos de prueba
const cursosData: Curso[] = [
  // Ingeniería de Sistemas
  { id: 1, codigo: "062110052", nombre: "Programación Web I", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 5, facultadId: 3, programaId: 6, activo: true },
  { id: 2, codigo: "062110045", nombre: "Base de Datos I", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 4, facultadId: 3, programaId: 6, activo: true },
  { id: 3, codigo: "062110038", nombre: "Estructura de Datos", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 3, facultadId: 3, programaId: 6, activo: true },
  { id: 4, codigo: "062110020", nombre: "Algoritmos y Programación", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 2, facultadId: 3, programaId: 6, activo: true },
  { id: 5, codigo: "062110060", nombre: "Desarrollo de Aplicaciones Móviles", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 6, facultadId: 3, programaId: 6, activo: true },
  
  // Ingeniería Civil
  { id: 6, codigo: "063210015", nombre: "Cálculo Diferencial", creditos: 4, horasTeoria: 3, horasPractica: 2, ciclo: 1, facultadId: 3, programaId: 7, activo: true },
  { id: 7, codigo: "063210022", nombre: "Física I", creditos: 4, horasTeoria: 3, horasPractica: 2, ciclo: 2, facultadId: 3, programaId: 7, activo: true },
  { id: 8, codigo: "063210035", nombre: "Mecánica de Suelos", creditos: 5, horasTeoria: 3, horasPractica: 4, ciclo: 4, facultadId: 3, programaId: 7, activo: true },
  { id: 9, codigo: "063210048", nombre: "Estructuras de Concreto", creditos: 5, horasTeoria: 3, horasPractica: 4, ciclo: 6, facultadId: 3, programaId: 7, activo: true },
  
  // Enfermería
  { id: 10, codigo: "064110025", nombre: "Anatomía Humana", creditos: 5, horasTeoria: 3, horasPractica: 4, ciclo: 1, facultadId: 4, programaId: 10, activo: true },
  { id: 11, codigo: "064110032", nombre: "Fisiología Humana", creditos: 5, horasTeoria: 3, horasPractica: 4, ciclo: 2, facultadId: 4, programaId: 10, activo: true },
  { id: 12, codigo: "064110045", nombre: "Enfermería Médico Quirúrgica", creditos: 6, horasTeoria: 3, horasPractica: 6, ciclo: 5, facultadId: 4, programaId: 10, activo: true },
  { id: 13, codigo: "064110058", nombre: "Cuidados Intensivos", creditos: 5, horasTeoria: 2, horasPractica: 6, ciclo: 7, facultadId: 4, programaId: 10, activo: true },
  
  // Administración
  { id: 14, codigo: "065210033", nombre: "Contabilidad General", creditos: 3, horasTeoria: 2, horasPractica: 2, ciclo: 2, facultadId: 1, programaId: 1, activo: true },
  { id: 15, codigo: "065210025", nombre: "Fundamentos de Administración", creditos: 3, horasTeoria: 2, horasPractica: 2, ciclo: 1, facultadId: 1, programaId: 1, activo: true },
  { id: 16, codigo: "065210040", nombre: "Marketing Estratégico", creditos: 4, horasTeoria: 3, horasPractica: 2, ciclo: 4, facultadId: 1, programaId: 1, activo: true },
  { id: 17, codigo: "065210055", nombre: "Gestión de Recursos Humanos", creditos: 4, horasTeoria: 3, horasPractica: 2, ciclo: 6, facultadId: 1, programaId: 1, activo: true },
  
  // Derecho
  { id: 18, codigo: "066110018", nombre: "Derecho Constitucional", creditos: 4, horasTeoria: 4, horasPractica: 0, ciclo: 3, facultadId: 2, programaId: 5, activo: true },
  { id: 19, codigo: "066110025", nombre: "Derecho Civil I", creditos: 4, horasTeoria: 4, horasPractica: 0, ciclo: 2, facultadId: 2, programaId: 5, activo: true },
  { id: 20, codigo: "066110033", nombre: "Derecho Penal I", creditos: 4, horasTeoria: 4, horasPractica: 0, ciclo: 4, facultadId: 2, programaId: 5, activo: true },
  
  // Educación
  { id: 21, codigo: "067110012", nombre: "Didáctica General", creditos: 3, horasTeoria: 2, horasPractica: 2, ciclo: 2, facultadId: 5, programaId: 14, activo: true },
  { id: 22, codigo: "067110020", nombre: "Psicología del Desarrollo", creditos: 3, horasTeoria: 2, horasPractica: 2, ciclo: 3, facultadId: 5, programaId: 14, activo: true },
  { id: 23, codigo: "067110035", nombre: "Estrategias de Enseñanza", creditos: 4, horasTeoria: 2, horasPractica: 4, ciclo: 5, facultadId: 5, programaId: 14, activo: false },
  
  // Psicología
  { id: 24, codigo: "064210015", nombre: "Psicología General", creditos: 3, horasTeoria: 3, horasPractica: 0, ciclo: 1, facultadId: 4, programaId: 13, activo: true },
  { id: 25, codigo: "064210028", nombre: "Neuropsicología", creditos: 4, horasTeoria: 3, horasPractica: 2, ciclo: 4, facultadId: 4, programaId: 13, activo: true },
];

export default function GestionCursos() {
  const [facultadSeleccionada, setFacultadSeleccionada] = useState<number>(0);
  const [programaSeleccionado, setProgramaSeleccionado] = useState<number>(0);
  const [cicloSeleccionado, setCicloSeleccionado] = useState<number>(0);
  const [busqueda, setBusqueda] = useState("");
  const [cursos] = useState<Curso[]>(cursosData);

  // Programas filtrados por facultad
  const programasFiltrados = useMemo(() => {
    if (facultadSeleccionada === 0) return [];
    return programas.filter((p) => p.facultadId === facultadSeleccionada);
  }, [facultadSeleccionada]);

  // Ciclos disponibles según el programa seleccionado
  const ciclosDisponibles = useMemo(() => {
    if (programaSeleccionado === 0) return [];
    
    // Obtener ciclos únicos de los cursos del programa seleccionado
    const ciclosUnicos = Array.from(
      new Set(
        cursos
          .filter(c => c.programaId === programaSeleccionado)
          .map(c => c.ciclo)
      )
    );
    
    // Ordenar ciclos en números romanos
    return ciclosUnicos.sort((a, b) => a - b);
  }, [programaSeleccionado, cursos]);

  // Cursos filtrados
  const cursosFiltrados = useMemo(() => {
    return cursos.filter((curso) => {
      const coincideBusqueda =
        curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        curso.codigo.toLowerCase().includes(busqueda.toLowerCase());

      const coincideFacultad =
        facultadSeleccionada === 0 || curso.facultadId === facultadSeleccionada;
      const coincidePrograma =
        programaSeleccionado === 0 || curso.programaId === programaSeleccionado;
      const coincideCiclo =
        cicloSeleccionado === 0 || curso.ciclo === cicloSeleccionado;

      return coincideBusqueda && coincideFacultad && coincidePrograma && coincideCiclo;
    });
  }, [cursos, busqueda, facultadSeleccionada, programaSeleccionado, cicloSeleccionado]);

  // Estadísticas
  const estadisticas = useMemo(() => {
    const total = cursosFiltrados.length;
    const activos = cursosFiltrados.filter((c) => c.activo).length;
    const creditosTotales = cursosFiltrados.reduce((acc, c) => acc + c.creditos, 0);
    const horasTotales = cursosFiltrados.reduce(
      (acc, c) => acc + c.horasTeoria + c.horasPractica,
      0
    );

    return { total, activos, creditosTotales, horasTotales };
  }, [cursosFiltrados]);

  const getFacultadNombre = (facultadId: number) => {
    const facultad = facultades.find((f) => f.id === facultadId);
    return facultad?.nombre || "Desconocida";
  };

  const getProgramaNombre = (programaId: number) => {
    const programa = programas.find((p) => p.id === programaId);
    return programa?.nombre || "Desconocido";
  };

  const handleFacultadChange = (facultadId: number) => {
    setFacultadSeleccionada(facultadId);
    setProgramaSeleccionado(0);
    setCicloSeleccionado(0);
  };

  const handleEliminarCurso = (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este curso?")) {
      console.log("Eliminando curso:", id);
      // TODO: Implementar lógica de eliminación
    }
  };

  return (
    <div className="cursos-admin-page">
      {/* Header */}
      <div className="cursos-admin-header">
        <div className="header-info">
          <h1 className="page-title">
            <FaBook className="title-icon" />
            Gestión de Cursos
          </h1>
          <p className="page-subtitle">
            Administra los cursos académicos por facultad y programa
          </p>
        </div>
        <div className="header-actions">
          <button className="btn-action-secondary">
            <FaFileExport />
            <span>Exportar</span>
          </button>
          <button className="btn-action-primary">
            <FaPlus />
            <span>Nuevo Curso</span>
          </button>
        </div>
      </div>

      {/* Filtro nivel 1: Facultades */}
      <div className="filter-section">
        <div className="filter-header">
          <FaUniversity className="filter-header-icon" />
          <h3 className="filter-title">1. Selecciona una Facultad</h3>
          {facultadSeleccionada !== 0 && (
            <button
              className="btn-reset-filter"
              onClick={() => handleFacultadChange(0)}
            >
              Limpiar
            </button>
          )}
        </div>
        <div className="facultades-grid">
          {facultades.map((facultad) => {
            const countCursos = cursos.filter(
              (c) => c.facultadId === facultad.id
            ).length;
            return (
              <div
                key={facultad.id}
                className={`facultad-card ${
                  facultadSeleccionada === facultad.id ? "active" : ""
                }`}
                onClick={() => handleFacultadChange(facultad.id)}
              >
                <div className="facultad-icon">{facultad.icono}</div>
                <div className="facultad-info">
                  <h4 className="facultad-nombre">{facultad.nombre}</h4>
                  <span className="facultad-count">{countCursos} cursos</span>
                </div>
                {facultadSeleccionada === facultad.id && (
                  <div className="facultad-check">
                    <FaCheckCircle />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtro nivel 2: Programas Académicos */}
      {facultadSeleccionada !== 0 && (
        <div className="filter-section">
          <div className="filter-header">
            <FaGraduationCap className="filter-header-icon" />
            <h3 className="filter-title">
              2. Selecciona un Programa Académico
              <span className="filter-subtitle">
                ({programasFiltrados.length} programas disponibles)
              </span>
            </h3>
            {programaSeleccionado !== 0 && (
              <button
                className="btn-reset-filter"
                onClick={() => setProgramaSeleccionado(0)}
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="programas-grid">
            {programasFiltrados.map((programa) => {
              const countCursos = cursos.filter(
                (c) => c.programaId === programa.id
              ).length;
              const facultad = facultades.find(
                (f) => f.id === programa.facultadId
              );
              return (
                <div
                  key={programa.id}
                  className={`programa-card ${
                    programaSeleccionado === programa.id ? "active" : ""
                  }`}
                  onClick={() => setProgramaSeleccionado(programa.id)}
                >
                  <div
                    className="programa-bar"
                    style={{ backgroundColor: facultad?.color }}
                  ></div>
                  <div className="programa-content">
                    <h4 className="programa-nombre">{programa.nombre}</h4>
                    <span className="programa-count">{countCursos} cursos</span>
                  </div>
                  {programaSeleccionado === programa.id && (
                    <div className="programa-check">
                      <FaCheckCircle />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filtro nivel 3: Ciclos Académicos */}
      {programaSeleccionado !== 0 && ciclosDisponibles.length > 0 && (
        <div className="filter-section">
          <div className="filter-header">
            <FaBook className="filter-header-icon" />
            <h3 className="filter-title">
              3. Filtra por Ciclo Académico
              <span className="filter-subtitle">
                (opcional)
              </span>
            </h3>
            {cicloSeleccionado !== 0 && (
              <button
                className="btn-reset-filter"
                onClick={() => setCicloSeleccionado(0)}
              >
                Ver todos
              </button>
            )}
          </div>
          <div className="ciclos-grid">
            {ciclosDisponibles.map((ciclo: number) => {
              const countCursos = cursos.filter(
                c => c.programaId === programaSeleccionado && c.ciclo === ciclo
              ).length;
              return (
                <button
                  key={ciclo}
                  className={`ciclo-btn ${cicloSeleccionado === ciclo ? 'active' : ''}`}
                  onClick={() => setCicloSeleccionado(ciclo)}
                  disabled={countCursos === 0}
                >
                  <span className="ciclo-roman">{numeroARomano(ciclo)}</span>
                  <span className="ciclo-count">{countCursos}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Estadísticas y búsqueda */}
      {programaSeleccionado !== 0 && (
        <>
          {/* Estadísticas */}
          <div className="stats-grid-admin">
            <div className="stat-card-admin">
              <div
                className="stat-icon-admin"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <FaBook />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.total}</div>
                <div className="stat-label-admin">Total Cursos</div>
              </div>
            </div>

            <div className="stat-card-admin">
              <div
                className="stat-icon-admin"
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                }}
              >
                <FaCheckCircle />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.activos}</div>
                <div className="stat-label-admin">Cursos Activos</div>
              </div>
            </div>

            <div className="stat-card-admin">
              <div
                className="stat-icon-admin"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                }}
              >
                <FaGraduationCap />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.creditosTotales}</div>
                <div className="stat-label-admin">Créditos Totales</div>
              </div>
            </div>

            <div className="stat-card-admin">
              <div
                className="stat-icon-admin"
                style={{
                  background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                }}
              >
                <FaBook />
              </div>
              <div className="stat-content-admin">
                <div className="stat-value-admin">{estadisticas.horasTotales}</div>
                <div className="stat-label-admin">Horas Totales</div>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="search-container-admin">
            <input
              type="text"
              className="search-input-admin"
              placeholder="Buscar por nombre o código del curso..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
        </>
      )}

      {/* Lista de cursos */}
      {programaSeleccionado === 0 ? (
        <div className="no-selection-message">
          <FaGraduationCap className="no-selection-icon" />
          <h3 className="no-selection-title">Selecciona un programa académico</h3>
          <p className="no-selection-text">
            Elige una facultad y luego un programa académico para ver la lista de
            cursos
          </p>
        </div>
      ) : cursosFiltrados.length === 0 ? (
        <div className="no-results-admin">
          <FaBook className="no-results-icon-admin" />
          <p className="no-results-text-admin">No se encontraron cursos</p>
          <p className="no-results-hint-admin">
            Intenta ajustar los filtros o términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="cursos-list-admin">
          {cursosFiltrados.map((curso) => {
            return (
              <div key={curso.id} className="curso-card-admin">
                <div className="curso-main-info">
                  <div className="curso-codigo-badge">{curso.codigo}</div>
                  <div className="curso-details-admin">
                    <h3 className="curso-nombre">{curso.nombre}</h3>
                    <div className="curso-meta">
                      <span className="curso-meta-item">
                        <FaGraduationCap />
                        {getProgramaNombre(curso.programaId)}
                      </span>
                      <span className="curso-meta-item">
                        Ciclo {curso.ciclo}
                      </span>
                      <span className="curso-meta-item">
                        {curso.creditos} créditos
                      </span>
                      <span className="curso-meta-item">
                        {curso.horasTeoria}h Teoría / {curso.horasPractica}h Práctica
                      </span>
                    </div>
                  </div>
                </div>

                <div className="curso-acciones">
                  <span
                    className={`estado-badge-curso ${
                      curso.activo ? "activo" : "inactivo"
                    }`}
                  >
                    {curso.activo ? (
                      <>
                        <FaCheckCircle /> Activo
                      </>
                    ) : (
                      <>
                        <FaTimesCircle /> Inactivo
                      </>
                    )}
                  </span>
                  <button className="btn-accion view" title="Ver detalles">
                    <FaEye />
                  </button>
                  <button className="btn-accion edit" title="Editar">
                    <FaEdit />
                  </button>
                  <button
                    className="btn-accion delete"
                    title="Eliminar"
                    onClick={() => handleEliminarCurso(curso.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
