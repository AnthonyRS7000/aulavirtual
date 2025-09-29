import { FaBook, FaFilePdf, FaVideo, FaLink, FaDownload, FaClock, FaFolder, FaEye, FaShare } from 'react-icons/fa';
import '../css/RecursosRecientes.css';

interface Recurso {
  id: number;
  titulo: string;
  tipo: 'pdf' | 'video' | 'enlace' | 'presentacion';
  materia: string;
  profesor: string;
  fechaSubida: string;
  tamaño?: string;
  url: string;
}

export default function RecursosRecientes() {
  const recursos: Recurso[] = [
    {
      id: 1,
      titulo: "Guía de Evaluación Financiera de Proyectos",
      tipo: "pdf",
      materia: "EVALUACIÓN DE PROYECTOS",
      profesor: "Dacio Luis Durán Cárdenas",
      fechaSubida: "2025-09-10",
      tamaño: "2.5 MB",
      url: "#"
    },
    {
      id: 2,
      titulo: "Videoconferencia: Análisis FODA Estratégico",
      tipo: "video",
      materia: "PLANEAMIENTO Y GESTIÓN ESTRATÉGICA",
      profesor: "Ulises Fidel Perla Camacho",
      fechaSubida: "2025-09-09",
      tamaño: "45 min",
      url: "#"
    },
    {
      id: 3,
      titulo: "Plantilla de Plan de Negocios",
      tipo: "presentacion",
      materia: "EVALUACIÓN DE PROYECTOS",
      profesor: "Dacio Luis Durán Cárdenas",
      fechaSubida: "2025-09-08",
      tamaño: "1.8 MB",
      url: "#"
    },
    {
      id: 4,
      titulo: "Artículo: Tendencias en Gestión Estratégica 2025",
      tipo: "enlace",
      materia: "PLANEAMIENTO Y GESTIÓN ESTRATÉGICA",
      profesor: "Ulises Fidel Perla Camacho",
      fechaSubida: "2025-09-07",
      url: "#"
    },
    {
      id: 5,
      titulo: "Manual de Metodología de Investigación",
      tipo: "pdf",
      materia: "METODOLOGÍA DE LA INVESTIGACIÓN",
      profesor: "Ana María Rojas Vega",
      fechaSubida: "2025-09-06",
      tamaño: "4.2 MB",
      url: "#"
    }
  ];

  const obtenerIconoTipo = (tipo: string) => {
    switch (tipo) {
      case 'pdf': return <FaFilePdf className="tipo-icon pdf" />;
      case 'video': return <FaVideo className="tipo-icon video" />;
      case 'enlace': return <FaLink className="tipo-icon enlace" />;
      case 'presentacion': return <FaBook className="tipo-icon presentacion" />;
      default: return <FaBook className="tipo-icon" />;
    }
  };

  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha);
    const ahora = new Date();
    const diferencia = ahora.getTime() - date.getTime();
    const dias = Math.floor(diferencia / (1000 * 3600 * 24));
    
    if (dias === 0) return 'Hoy';
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    return date.toLocaleDateString('es-ES');
  };

  return (
    <div className="recursos-recientes">
      <div className="recursos-header">
        <div className="header-content">
          <div className="header-info">
            <h1>Recursos Recientes</h1>
          </div>
          <div className="header-actions">
            <button className="ver-todos-btn">
              <FaEye className="btn-icon" />
              Ver todos
            </button>
          </div>
        </div>
      </div>

      <div className="recursos-lista">
        {recursos.map((recurso) => (
          <div key={recurso.id} className={`recurso-card tipo-${recurso.tipo}`}>
            <div className="recurso-header">
              <div className="recurso-icono">
                {obtenerIconoTipo(recurso.tipo)}
              </div>
              <div className="recurso-meta-header">
                <span className="tipo-badge">
                  {recurso.tipo === 'pdf' ? 'PDF' : 
                   recurso.tipo === 'video' ? 'Video' : 
                   recurso.tipo === 'enlace' ? 'Enlace' : 'Presentación'}
                </span>
                {recurso.tamaño && (
                  <span className="tamaño-badge">{recurso.tamaño}</span>
                )}
              </div>
            </div>
            
            <div className="recurso-contenido">
              <h3 className="recurso-titulo">{recurso.titulo}</h3>
              <div className="recurso-info">
                <div className="materia-info">
                  <span className="materia">{recurso.materia}</span>
                  <span className="profesor">👨‍🏫 {recurso.profesor}</span>
                </div>
                <div className="fecha-info">
                  <FaClock className="detail-icon" />
                  <span className="fecha">{formatearFecha(recurso.fechaSubida)}</span>
                </div>
              </div>
            </div>

            <div className="recurso-acciones">
              <button 
                className="accion-btn preview-btn"
                title="Vista previa"
                onClick={() => console.log('Vista previa:', recurso.titulo)}
              >
                <FaEye />
              </button>
              <button 
                className="accion-btn share-btn"
                title="Compartir"
                onClick={() => console.log('Compartir:', recurso.titulo)}
              >
                <FaShare />
              </button>
              <button 
                className="accion-btn download-btn"
                title="Descargar recurso"
                onClick={() => window.open(recurso.url, '_blank')}
              >
                <FaDownload />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="recursos-footer">
        <div className="estadisticas-card">
          <div className="stat-item">
            <div className="stat-icon">
              <FaFolder />
            </div>
            <div className="stat-content">
              <span className="stat-numero">{recursos.length}</span>
              <span className="stat-label">Total recursos</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-content">
              <span className="stat-numero">3</span>
              <span className="stat-label">Esta semana</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaDownload />
            </div>
            <div className="stat-content">
              <span className="stat-numero">{recursos.filter(r => r.tipo === 'pdf').length}</span>
              <span className="stat-label">Documentos PDF</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}