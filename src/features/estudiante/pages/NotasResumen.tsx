import { FaTrophy, FaChartLine, FaExclamationTriangle, FaCalculator, FaCertificate, FaAward } from 'react-icons/fa';
import '../css/NotasResumen.css';

interface NotaCurso {
  id: number;
  materia: string;
  codigo: string;
  nota: number;
  creditos: number;
  estado: 'aprobado' | 'desaprobado' | 'pendiente';
}

export default function NotasResumen() {
  const notas: NotaCurso[] = [
    {
      id: 1,
      materia: "EVALUACIÓN DE PROYECTOS",
      codigo: "FC-SMVIBS-SP08C01N",
      nota: 18,
      creditos: 4,
      estado: "aprobado"
    },
    {
      id: 2,
      materia: "PLANEAMIENTO Y GESTIÓN ESTRATÉGICA", 
      codigo: "FC-SMVADM-SP09B01N",
      nota: 16,
      creditos: 3,
      estado: "aprobado"
    },
    {
      id: 3,
      materia: "METODOLOGÍA DE LA INVESTIGACIÓN",
      codigo: "FC-SMMET-SP10A01N",
      nota: 14,
      creditos: 3,
      estado: "aprobado"
    },
    {
      id: 4,
      materia: "ESTADÍSTICA APLICADA",
      codigo: "FC-SMEST-SP11B01N",
      nota: 12,
      creditos: 4,
      estado: "desaprobado"
    },
    {
      id: 5,
      materia: "ÉTICA PROFESIONAL",
      codigo: "FC-SMET-SP12C01N",
      nota: 0,
      creditos: 2,
      estado: "pendiente"
    }
  ];

  const promedioGeneral = notas
    .filter(nota => nota.estado !== 'pendiente')
    .reduce((acc, nota) => acc + nota.nota, 0) / 
    notas.filter(nota => nota.estado !== 'pendiente').length;

  const creditosAprobados = notas
    .filter(nota => nota.estado === 'aprobado')
    .reduce((acc, nota) => acc + nota.creditos, 0);

  const totalCreditos = notas.reduce((acc, nota) => acc + nota.creditos, 0);

  const obtenerIconoEstado = (estado: string) => {
    switch (estado) {
      case 'aprobado': return <FaTrophy className="estado-icon aprobado" />;
      case 'desaprobado': return <FaExclamationTriangle className="estado-icon desaprobado" />;
      case 'pendiente': return <FaChartLine className="estado-icon pendiente" />;
      default: return null;
    }
  };

  return (
    <div className="notas-resumen-usil">
      {/* Header simple */}
      <div className="header-simple">
        <h1>Resumen de Notas</h1>
      </div>

      {/* Estadísticas principales */}
      <div className="estadisticas-principales">
        <div className="estadistica-card">
          <div className="stat-icon">
            <FaCalculator />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{promedioGeneral.toFixed(1)}</span>
            <span className="stat-label">Promedio General</span>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="stat-icon">
            <FaCertificate />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{creditosAprobados}/{totalCreditos}</span>
            <span className="stat-label">Créditos Aprobados</span>
          </div>
        </div>
        
        <div className="estadistica-card">
          <div className="stat-icon">
            <FaAward />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{Math.round((creditosAprobados/totalCreditos)*100)}%</span>
            <span className="stat-label">Rendimiento</span>
          </div>
        </div>
      </div>

      {/* Tabla de notas */}
      <div className="tabla-notas-container">
        <div className="tabla-header">
          <h2>Registro de Calificaciones - Periodo 2025-02</h2>
        </div>
        
        <div className="tabla-notas">
          <div className="tabla-head">
            <div className="col-materia">Materia</div>
            <div className="col-codigo">Código</div>
            <div className="col-creditos">Créditos</div>
            <div className="col-nota">Nota</div>
            <div className="col-estado">Estado</div>
          </div>
          
          {notas.map((nota) => (
            <div key={nota.id} className={`tabla-row ${nota.estado}`}>
              <div className="col-materia">
                <div className="materia-nombre">{nota.materia}</div>
              </div>
              <div className="col-codigo">
                <span className="codigo-texto">{nota.codigo}</span>
              </div>
              <div className="col-creditos">
                <span className="creditos-numero">{nota.creditos}</span>
              </div>
              <div className="col-nota">
                <div className="nota-display">
                  <span className={`nota-valor ${nota.estado}`}>
                    {nota.estado === 'pendiente' ? '--' : nota.nota}
                  </span>
                  <span className="nota-base">/20</span>
                </div>
              </div>
              <div className="col-estado">
                <div className={`estado-badge ${nota.estado}`}>
                  <div className="estado-icon-badge">
                    {obtenerIconoEstado(nota.estado)}
                  </div>
                  <span className="estado-texto">
                    {nota.estado === 'aprobado' ? 'Aprobado' : 
                     nota.estado === 'desaprobado' ? 'Desaprobado' : 'Pendiente'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leyenda */}
      <div className="leyenda-simple">
        <div className="leyenda-titulo">Escala de Calificación</div>
        <div className="leyenda-items">
          <div className="leyenda-item aprobado">
            {obtenerIconoEstado('aprobado')}
            <span>Aprobado (≥ 14)</span>
          </div>
          <div className="leyenda-item desaprobado">
            {obtenerIconoEstado('desaprobado')}
            <span>Desaprobado (&lt; 14)</span>
          </div>
          <div className="leyenda-item pendiente">
            {obtenerIconoEstado('pendiente')}
            <span>Pendiente (Por evaluar)</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-simple">
        <p>© 2025-2018 UNIVERSIDAD DE HUÁNUCO</p>
      </div>
    </div>
  );
}