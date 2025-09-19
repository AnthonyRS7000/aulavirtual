import { FaGraduationCap, FaTrophy, FaChartLine, FaExclamationTriangle, FaAward, FaCalculator, FaCertificate } from 'react-icons/fa';
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
    <div className="notas-resumen">
      <div className="notas-header">
        <div className="header-content">
          <div className="header-info">
            <FaGraduationCap className="header-icon" />
            <h1>Resumen de Notas</h1>
          </div>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="estadisticas-principales">
        <div className="stat-card promedio">
          <div className="stat-icon">
            <FaCalculator />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{promedioGeneral.toFixed(1)}</span>
            <span className="stat-label">Promedio General</span>
          </div>
        </div>
        
        <div className="stat-card creditos">
          <div className="stat-icon">
            <FaCertificate />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{creditosAprobados}/{totalCreditos}</span>
            <span className="stat-label">Créditos Aprobados</span>
          </div>
        </div>
        
        <div className="stat-card rendimiento">
          <div className="stat-icon">
            <FaAward />
          </div>
          <div className="stat-content">
            <span className="stat-valor">{Math.round((creditosAprobados/totalCreditos)*100)}%</span>
            <span className="stat-label">Rendimiento</span>
          </div>
        </div>
      </div>

      <div className="notas-lista">
        {notas.map((nota) => (
          <div key={nota.id} className={`nota-card ${nota.estado}`}>
            <div className="nota-header">
              <div className="materia-info">
                <h3 className="materia-nombre">{nota.materia}</h3>
                <span className="codigo-materia">{nota.codigo}</span>
              </div>
              <div className="estado-container">
                {obtenerIconoEstado(nota.estado)}
              </div>
            </div>
            
            <div className="nota-contenido">
              <div className="nota-detalles">
                <div className="creditos-info">
                  <span className="creditos-label">Créditos:</span>
                  <span className="creditos-valor">{nota.creditos}</span>
                </div>
                <div className="estado-info">
                  <span className="estado-label">Estado:</span>
                  <span className={`estado-valor ${nota.estado}`}>
                    {nota.estado === 'aprobado' ? 'Aprobado' : 
                     nota.estado === 'desaprobado' ? 'Desaprobado' : 'Pendiente'}
                  </span>
                </div>
              </div>
              
              <div className="nota-display">
                <span className={`nota-numero ${nota.estado}`}>
                  {nota.estado === 'pendiente' ? '--' : nota.nota}
                </span>
                <span className="nota-escala">/20</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="notas-footer">
        <div className="leyenda-card">
          <h3 className="leyenda-titulo">Leyenda de Estados</h3>
          <div className="leyenda-grid">
            <div className="leyenda-item aprobado">
              <div className="leyenda-icon">
                <FaTrophy />
              </div>
              <div className="leyenda-info">
                <span className="leyenda-label">Aprobado</span>
                <span className="leyenda-desc">Nota ≥ 14</span>
              </div>
            </div>
            <div className="leyenda-item desaprobado">
              <div className="leyenda-icon">
                <FaExclamationTriangle />
              </div>
              <div className="leyenda-info">
                <span className="leyenda-label">Desaprobado</span>
                <span className="leyenda-desc">Nota &lt; 14</span>
              </div>
            </div>
            <div className="leyenda-item pendiente">
              <div className="leyenda-icon">
                <FaChartLine />
              </div>
              <div className="leyenda-info">
                <span className="leyenda-label">Pendiente</span>
                <span className="leyenda-desc">Por evaluar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}