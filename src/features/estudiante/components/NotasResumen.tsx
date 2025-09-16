import { FaGraduationCap, FaTrophy, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

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

  const obtenerColorNota = (nota: number, estado: string) => {
    if (estado === 'pendiente') return '#6b7280';
    if (nota >= 17) return '#10b981';
    if (nota >= 14) return '#f59e0b';
    return '#ef4444';
  };

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
        <h3>
          <FaGraduationCap className="header-icon" />
          Resumen de Notas
        </h3>
        <div className="estadisticas-generales">
          <div className="stat">
            <span className="stat-valor">{promedioGeneral.toFixed(1)}</span>
            <span className="stat-label">Promedio</span>
          </div>
          <div className="stat">
            <span className="stat-valor">{creditosAprobados}/{totalCreditos}</span>
            <span className="stat-label">Créditos</span>
          </div>
        </div>
      </div>

      <div className="notas-lista">
        {notas.map((nota) => (
          <div key={nota.id} className={`nota-item ${nota.estado}`}>
            <div className="nota-info">
              <div className="materia-header">
                <h4 className="materia-nombre">{nota.materia}</h4>
                {obtenerIconoEstado(nota.estado)}
              </div>
              <span className="codigo-materia">{nota.codigo}</span>
              <div className="creditos-info">
                <span className="creditos">{nota.creditos} créditos</span>
              </div>
            </div>
            
            <div className="nota-valor">
              <span 
                className={`nota-numero ${nota.estado}`}
                style={{ color: obtenerColorNota(nota.nota, nota.estado) }}
              >
                {nota.estado === 'pendiente' ? '--' : nota.nota}
              </span>
              <span className="nota-escala">/20</span>
            </div>
          </div>
        ))}
      </div>

      <div className="notas-footer">
        <div className="leyenda">
          <div className="leyenda-item">
            <div className="color-indicator aprobado"></div>
            <span>Aprobado (≥14)</span>
          </div>
          <div className="leyenda-item">
            <div className="color-indicator desaprobado"></div>
            <span>Desaprobado (&lt;14)</span>
          </div>
          <div className="leyenda-item">
            <div className="color-indicator pendiente"></div>
            <span>Pendiente</span>
          </div>
        </div>
      </div>
    </div>
  );
}