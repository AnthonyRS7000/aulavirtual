import React from 'react';
import { FaUsers, FaChalkboardTeacher, FaBook, FaChartLine } from 'react-icons/fa';
import '../css/DashboardAdmin.css';

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
        <h1 className="dashboard-admin-title">Dashboard Administrativo</h1>
        <p className="dashboard-admin-subtitle">
          Bienvenido al panel de administración de la UDH
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="dashboard-admin-stats">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-header">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <span className={`stat-change ${stat.changeType}`}>
                {stat.change}
              </span>
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
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="quick-actions-grid">
          <button className="action-button">
            <FaUsers className="action-icon" />
            <span>Gestionar Estudiantes</span>
          </button>
          <button className="action-button">
            <FaChalkboardTeacher className="action-icon" />
            <span>Gestionar Docentes</span>
          </button>
          <button className="action-button">
            <FaBook className="action-icon" />
            <span>Gestionar Cursos</span>
          </button>
          <button className="action-button">
            <FaChartLine className="action-icon" />
            <span>Ver Reportes</span>
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
