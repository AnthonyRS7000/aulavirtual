import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEdit, FaCamera } from 'react-icons/fa';
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

export default function Perfil() {
  const [estudiante] = useState<EstudianteInfo>(estudianteData);
  const [modoEdicion, setModoEdicion] = useState(false);


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

        {/* Rendimiento Académico e Historial eliminados por petición */}

      </div>
    </div>
  );
}