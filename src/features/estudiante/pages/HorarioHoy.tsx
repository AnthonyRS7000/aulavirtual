import { FaClock, FaMapMarkerAlt, FaChalkboardTeacher, FaBuilding, FaCode, FaDatabase, FaNetworkWired, FaCalculator, FaUsers, FaBrain, FaLanguage, FaShieldAlt, FaMobileAlt, FaBullhorn, FaTools } from 'react-icons/fa';
import '../css/HorarioHoy.css';

interface ClaseSemana {
  id: number;
  codigo: string;
  dia: string;
  materia: string;
  profesor: string;
  hora: string;
  salon: string;
  pabellon: string;
  creditos: number;
  ciclo: number;
  estado: 'pendiente' | 'en-curso' | 'completada';
}

export default function HorarioHoy() {
  const horarioCompleto: ClaseSemana[] = [
    // FUNDAMENTOS DE CIENCIA DE DATOS
    {
      id: 1,
      codigo: "062106053",
      dia: "MARTES",
      materia: "FUNDAMENTOS DE CIENCIA DE DATOS",
      profesor: "Docente por asignar",
      hora: "16:15 - 17:45",
      salon: "P2-305",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 6,
      estado: "completada"
    },
    {
      id: 2,
      codigo: "062106053",
      dia: "JUEVES",
      materia: "FUNDAMENTOS DE CIENCIA DE DATOS",
      profesor: "Docente por asignar",
      hora: "16:15 - 17:45",
      salon: "P2-205",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 6,
      estado: "pendiente"
    },

    // HACKING ÉTICO
    {
      id: 3,
      codigo: "062109013",
      dia: "LUNES",
      materia: "HACKING ÉTICO",
      profesor: "Docente por asignar",
      hora: "11:00 - 12:30",
      salon: "P2-206",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "completada"
    },
    {
      id: 4,
      codigo: "062109013",
      dia: "MIÉRCOLES",
      materia: "HACKING ÉTICO",
      profesor: "Docente por asignar",
      hora: "11:00 - 12:30",
      salon: "P2-206",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "en-curso"
    },

    // EVALUACIÓN DE SOFTWARE
    {
      id: 5,
      codigo: "062109023",
      dia: "LUNES",
      materia: "EVALUACIÓN DE SOFTWARE",
      profesor: "Docente por asignar",
      hora: "18:30 - 20:00",
      salon: "P2-305",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "completada"
    },
    {
      id: 6,
      codigo: "062109023",
      dia: "JUEVES",
      materia: "EVALUACIÓN DE SOFTWARE",
      profesor: "Docente por asignar",
      hora: "17:45 - 19:15",
      salon: "P2-204",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "pendiente"
    },

    // INGENIERÍA DE LA INFORMACIÓN
    {
      id: 7,
      codigo: "062109043",
      dia: "LUNES",
      materia: "INGENIERÍA DE LA INFORMACIÓN",
      profesor: "Docente por asignar",
      hora: "08:45 - 10:15",
      salon: "P2-302",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "completada"
    },
    {
      id: 8,
      codigo: "062109043",
      dia: "MARTES",
      materia: "INGENIERÍA DE LA INFORMACIÓN",
      profesor: "Docente por asignar",
      hora: "09:30 - 11:00",
      salon: "P2-502",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 9,
      estado: "completada"
    },

    // DESARROLLO DE APLICACIONES MÓVILES
    {
      id: 9,
      codigo: "062109063",
      dia: "MARTES",
      materia: "DESARROLLO DE APLICACIONES MÓVILES",
      profesor: "Docente por asignar",
      hora: "18:30 - 20:45",
      salon: "P2-206",
      pabellon: "Pabellón 2",
      creditos: 4,
      ciclo: 9,
      estado: "completada"
    },
    {
      id: 10,
      codigo: "062109063",
      dia: "SÁBADO",
      materia: "DESARROLLO DE APLICACIONES MÓVILES",
      profesor: "Docente por asignar",
      hora: "11:45 - 14:00",
      salon: "P2-204",
      pabellon: "Pabellón 2",
      creditos: 4,
      ciclo: 9,
      estado: "pendiente"
    },

    // MARKETING DIGITAL
    {
      id: 11,
      codigo: "062113123",
      dia: "JUEVES",
      materia: "MARKETING DIGITAL",
      profesor: "Docente por asignar",
      hora: "08:00 - 09:30",
      salon: "P2-302",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 13,
      estado: "pendiente"
    },
    {
      id: 12,
      codigo: "062113123",
      dia: "VIERNES",
      materia: "MARKETING DIGITAL",
      profesor: "Docente por asignar",
      hora: "08:00 - 09:30",
      salon: "P2-202",
      pabellon: "Pabellón 2",
      creditos: 3,
      ciclo: 13,
      estado: "pendiente"
    },

    // TALLER DE ARTESANÍA Y MANUALIDADES
    {
      id: 13,
      codigo: "062114011",
      dia: "SÁBADO",
      materia: "TALLER DE ARTESANÍA Y MANUALIDADES",
      profesor: "Docente por asignar",
      hora: "17:45 - 20:00",
      salon: "P5-504",
      pabellon: "Pabellón 5",
      creditos: 0,
      ciclo: 14,
      estado: "pendiente"
    }
  ];

  const fechaHoy = new Date().toLocaleDateString('es-ES', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const obtenerIconoMateria = (materia: string) => {
    if (materia.includes('CIENCIA DE DATOS')) {
      return <FaDatabase className="materia-icon" />;
    } else if (materia.includes('HACKING')) {
      return <FaShieldAlt className="materia-icon" />;
    } else if (materia.includes('SOFTWARE')) {
      return <FaCode className="materia-icon" />;
    } else if (materia.includes('INFORMACIÓN')) {
      return <FaNetworkWired className="materia-icon" />;
    } else if (materia.includes('MÓVILES')) {
      return <FaMobileAlt className="materia-icon" />;
    } else if (materia.includes('MARKETING')) {
      return <FaBullhorn className="materia-icon" />;
    } else if (materia.includes('ARTESANÍA')) {
      return <FaTools className="materia-icon" />;
    }
    return <FaUsers className="materia-icon" />;
  };

  // Agrupar por días
  const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'];
  
  return (
    <div className="horario-hoy-usil">
      {/* Header simple */}
      <div className="header-simple">
        <h1>Mi Horario - Ingeniería de Sistemas</h1>
        <div className="fecha-actual">
          <FaClock className="fecha-icon" />
          <span>{fechaHoy}</span>
        </div>
      </div>

      {/* Información del estudiante */}
      <div className="info-estudiante">
        <div className="estudiante-badge">
          <span><strong>Código:</strong> 2021210351</span>
          <span><strong>Semestre:</strong> 2025-2</span>
          <span><strong>Sede:</strong> Huánuco</span>
          <span><strong>Créditos:</strong> 19/22</span>
        </div>
      </div>

      {/* Horario por días */}
      {diasSemana.map(dia => {
        const clasesDia = horarioCompleto.filter(clase => clase.dia === dia);
        
        if (clasesDia.length === 0) return null;
        
        return (
          <div key={dia} className="dia-container">
            <div className="dia-header">
              <h2>{dia}</h2>
              <span className="clases-count">{clasesDia.length} clase(s)</span>
            </div>

            <div className="clases-tabla">
              <div className="tabla-head">
                <div className="col-codigo">Código</div>
                <div className="col-hora">Hora</div>
                <div className="col-materia">Materia</div>
                <div className="col-salon">Salón</div>
                <div className="col-creditos">Créd.</div>
                <div className="col-estado">Estado</div>
              </div>

              {clasesDia.map((clase) => (
                <div key={clase.id} className={`clase-fila ${clase.estado}`}>
                  <div className="col-codigo">
                    <span className="codigo-texto">{clase.codigo}</span>
                  </div>
                  
                  <div className="col-hora">
                    <span className="hora-texto">{clase.hora}</span>
                  </div>
                  
                  <div className="col-materia">
                    <div className="materia-container">
                      {obtenerIconoMateria(clase.materia)}
                      <div className="materia-info">
                        <div className="materia-nombre">{clase.materia}</div>
                        <div className="ciclo-info">Ciclo {clase.ciclo}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-salon">
                    <div className="salon-info">
                      <FaMapMarkerAlt className="salon-icon" />
                      <div>
                        <div className="salon-numero">{clase.salon}</div>
                        <div className="pabellon-texto">{clase.pabellon}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-creditos">
                    <span className="creditos-numero">{clase.creditos}</span>
                  </div>
                  
                  <div className="col-estado">
                    <div className={`estado-badge ${clase.estado}`}>
                      <span className="estado-texto">
                        {clase.estado === 'pendiente' ? 'Pendiente' : 
                         clase.estado === 'en-curso' ? 'En Curso' : 'Completada'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Resumen semanal */}
      <div className="resumen-semanal">
        <div className="resumen-header">
          <h3>Resumen Académico</h3>
        </div>
        <div className="resumen-stats">
          <div className="stat-item">
            <span className="stat-label">Total de Materias:</span>
            <span className="stat-valor">{[...new Set(horarioCompleto.map(c => c.codigo))].length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total de Clases:</span>
            <span className="stat-valor">{horarioCompleto.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Créditos Totales:</span>
            <span className="stat-valor">{[...new Set(horarioCompleto.map(c => c.codigo))].reduce((sum, codigo) => {
              const clase = horarioCompleto.find(c => c.codigo === codigo);
              return sum + (clase?.creditos || 0);
            }, 0)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Días con Clases:</span>
            <span className="stat-valor">{diasSemana.filter(dia => 
              horarioCompleto.some(clase => clase.dia === dia)).length}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-simple">
        <p>© 2025-2018 UNIVERSIDAD DE HUÁNUCO - Facultad de Ingeniería</p>
      </div>
    </div>
  );
}