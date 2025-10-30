import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook, FaChartLine } from 'react-icons/fa';
import '../css/DashboardAdmin.css';
import TituloPage from '../../../components/pages/TituloPage';

// Importar imágenes de assets
import graduadoImg from '../../../assets/graduado.png';
import profesorImg from '../../../assets/profesor.png';
import cursoImg from '../../../assets/curso.png';
import anuncioImg from '../../../assets/anuncio.png';
import classroomImg from '../../../assets/classroom.png';
import reporteImg from '../../../assets/reporte.png';
import usuarioImg from '../../../assets/usuario.png';
import configuracionImg from '../../../assets/configuracion.png';

const DashboardAdmin: React.FC = () => {
  // Datos simulados para las estadísticas
  const stats = [
    {
      id: 1,
      title: 'Total Estudiantes',
      value: '2,458',
      icon: <FaUsers />,
      color: '#3b82f6',
      change: '+12%',
      changeType: 'positive'
    },
    {
      id: 2,
      title: 'Total Docentes',
      value: '156',
      icon: <FaChalkboardTeacher />,
      color: '#10b981',
      change: '+5%',
      changeType: 'positive'
    },
    {
      id: 3,
      title: 'Cursos Activos',
      value: '342',
      icon: <FaBook />,
      color: '#f59e0b',
      change: '+8%',
      changeType: 'positive'
    },
    {
      id: 4,
      title: 'Tasa de Aprobación',
      value: '87.5%',
      icon: <FaChartLine />,
      color: '#8b5cf6',
      change: '+2.3%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="dashboard-admin-container">
      {/* Header */}
      <div className="dashboard-admin-header">
        <TituloPage
          titulo={`📚 Dashboard Administrativo`}
          
        />
      </div>

      {/* Estadísticas principales */}
      <div className="dashboard-admin-stats">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="stat-card-body">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección de acciones rápidas */}
      <div className="dashboard-admin-quick-actions">
        <h2 className="section-title">Gestiones Rápidas</h2>
        <div className="quick-actions-grid">
          <button className="action-button">
            <img src={graduadoImg} alt="Estudiantes" className="action-icon" />
            <span>Estudiantes</span>
          </button>        
          <button className="action-button">
            <img src={cursoImg} alt="Cursos" className="action-icon" />
            <span>Cursos</span>
          </button>
          <button className="action-button">
            <img src={profesorImg} alt="Docentes" className="action-icon" />
            <span>Docentes</span>
          </button>
          <button className="action-button">
            <img src={anuncioImg} alt="Anuncio" className="action-icon" />
            <span>Anuncio</span>
          </button>
          <button className="action-button">
            <img src={classroomImg} alt="Soporte Classroom" className="action-icon" />
            <span>Soporte Classroom</span>
          </button>
          <button className="action-button">
            <img src={reporteImg} alt="Reportes" className="action-icon" />
            <span>Reportes</span>
          </button>
          <button className="action-button">
            <img src={usuarioImg} alt="Mi Perfil" className="action-icon" />
            <span>Mi Perfil</span>
          </button>
          <button className="action-button">
            <img src={configuracionImg} alt="Configuración" className="action-icon" />
            <span>Configuración</span>
          </button>
        </div>
      </div>

      {/* Información adicional */}
      <div className="dashboard-admin-info">
        <div className="info-card">
          <h3 className="info-card-title">Últimas Matrículas</h3>
          <p className="info-card-content">
            150 nuevos estudiantes matriculados este mes
          </p>
        </div>
        <div className="info-card">
          <h3 className="info-card-title">Cursos en Progreso</h3>
          <p className="info-card-content">
            342 cursos activos en el ciclo actual
          </p>
        </div>
        <div className="info-card">
          <h3 className="info-card-title">Eventos Próximos</h3>
          <p className="info-card-content">
            5 eventos académicos programados
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
