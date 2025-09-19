import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaCamera, FaBook, FaTrophy, FaCertificate } from 'react-icons/fa';
import '../css/Perfil.css';

interface EstudianteInfo {
  nombre: string;
  apellidos: string;
  codigo: string;
  carrera: string;
  semestre: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaNacimiento: string;
  foto: string;
  promedioGeneral: number;
  creditosAprobados: number;
  creditosTotal: number;
}

interface RendimientoAcademico {
  semestre: string;
  creditos: number;
  promedio: number;
  materias: number;
}

const estudianteData: EstudianteInfo = {
  nombre: "María Fernanda",
  apellidos: "González Rodríguez",
  codigo: "2020115089",
  carrera: "Ingeniería de Sistemas",
  semestre: "VIII",
  email: "maria.gonzalez@udh.edu.pe",
  telefono: "+51 962 345 678",
  direccion: "Jr. Hermilio Valdizán 871, Huánuco",
  fechaNacimiento: "15/03/2002",
  foto: "/api/placeholder/150/150",
  promedioGeneral: 16.8,
  creditosAprobados: 180,
  creditosTotal: 220
};

const rendimientoData: RendimientoAcademico[] = [
  { semestre: "2024-I", creditos: 22, promedio: 17.2, materias: 6 },
  { semestre: "2023-II", creditos: 24, promedio: 16.8, materias: 6 },
  { semestre: "2023-I", creditos: 26, promedio: 16.5, materias: 7 },
  { semestre: "2022-II", creditos: 28, promedio: 16.9, materias: 7 },
  { semestre: "2022-I", creditos: 25, promedio: 16.3, materias: 6 },
  { semestre: "2021-II", creditos: 27, promedio: 16.1, materias: 7 },
];

export default function Perfil() {
  const [estudiante] = useState<EstudianteInfo>(estudianteData);
  const [modoEdicion, setModoEdicion] = useState(false);

  const porcentajeProgreso = (estudiante.creditosAprobados / estudiante.creditosTotal) * 100;

  const obtenerColorPromedio = (promedio: number) => {
    if (promedio >= 17) return '#059669';
    if (promedio >= 14) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="perfil-page">
      <div className="perfil-header">
        <h1>Mi Perfil</h1>
        <p>Información personal y rendimiento académico</p>
      </div>

      <div className="perfil-contenido">
        {/* Información Personal */}
        <div className="perfil-section info-personal">
          <div className="section-header">
            <h2>Información Personal</h2>
            <button 
              className="btn-editar"
              onClick={() => setModoEdicion(!modoEdicion)}
            >
              <FaEdit /> {modoEdicion ? 'Guardar' : 'Editar'}
            </button>
          </div>

          <div className="info-contenido">
            <div className="foto-section">
              <div className="foto-container">
                <img src={estudiante.foto} alt="Foto de perfil" className="foto-perfil" />
                <button className="btn-cambiar-foto">
                  <FaCamera />
                </button>
              </div>
              <div className="info-basica">
                <h3>{estudiante.nombre} {estudiante.apellidos}</h3>
                <p className="codigo-estudiante">Código: {estudiante.codigo}</p>
                <p className="carrera">{estudiante.carrera} - {estudiante.semestre} Semestre</p>
              </div>
            </div>

            <div className="datos-contacto">
              <div className="dato-item">
                <FaEnvelope className="dato-icon" />
                <div>
                  <label>Email Institucional</label>
                  <span>{estudiante.email}</span>
                </div>
              </div>

              <div className="dato-item">
                <FaPhone className="dato-icon" />
                <div>
                  <label>Teléfono</label>
                  <span>{estudiante.telefono}</span>
                </div>
              </div>

              <div className="dato-item">
                <FaMapMarkerAlt className="dato-icon" />
                <div>
                  <label>Dirección</label>
                  <span>{estudiante.direccion}</span>
                </div>
              </div>

              <div className="dato-item">
                <FaCalendarAlt className="dato-icon" />
                <div>
                  <label>Fecha de Nacimiento</label>
                  <span>{estudiante.fechaNacimiento}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rendimiento Académico */}
        <div className="perfil-section rendimiento-academico">
          <div className="section-header">
            <h2>Rendimiento Académico</h2>
          </div>

          <div className="stats-resumen">
            <div className="stat-card promedio">
              <div className="stat-icon-container">
                <FaTrophy className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-number" style={{ color: obtenerColorPromedio(estudiante.promedioGeneral) }}>
                  {estudiante.promedioGeneral}
                </span>
                <span className="stat-label">Promedio General</span>
              </div>
            </div>

            <div className="stat-card creditos">
              <div className="stat-icon-container">
                <FaBook className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-number">
                  {estudiante.creditosAprobados}/{estudiante.creditosTotal}
                </span>
                <span className="stat-label">Créditos</span>
              </div>
            </div>

            <div className="stat-card progreso">
              <div className="stat-icon-container">
                <FaCertificate className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-number">{Math.round(porcentajeProgreso)}%</span>
                <span className="stat-label">Progreso</span>
              </div>
            </div>
          </div>

          <div className="progreso-carrera">
            <h3>Progreso de Carrera</h3>
            <div className="progreso-bar">
              <div 
                className="progreso-fill"
                style={{ width: `${porcentajeProgreso}%` }}
              ></div>
            </div>
            <p>{estudiante.creditosAprobados} de {estudiante.creditosTotal} créditos completados</p>
          </div>
        </div>

        {/* Historial por Semestre */}
        <div className="perfil-section historial-semestres">
          <div className="section-header">
            <h2>Historial por Semestre</h2>
          </div>

          <div className="semestres-lista">
            {rendimientoData.map((semestre, index) => (
              <div key={index} className="semestre-card">
                <div className="semestre-header">
                  <h4>{semestre.semestre}</h4>
                  <span 
                    className="promedio-badge"
                    style={{ backgroundColor: obtenerColorPromedio(semestre.promedio) }}
                  >
                    {semestre.promedio}
                  </span>
                </div>
                
                <div className="semestre-stats">
                  <div className="stat-item">
                    <span className="stat-value">{semestre.creditos}</span>
                    <span className="stat-name">Créditos</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{semestre.materias}</span>
                    <span className="stat-name">Materias</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}