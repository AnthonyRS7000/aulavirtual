import { useState, useEffect } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon, UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import '../css/MensajeriaDocente.css';

interface Estudiante {
  nombre: string;
  email: string;
  curso: string;
  codigo: string;
  imagen?: string;
}

const MensajeriaDocente = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    // Simulación de carga de estudiantes desde localStorage o API
    const estudiantesSimulados: Estudiante[] = [
      {
        nombre: 'Ana María González Pérez',
        email: 'ana.gonzalez@udh.edu.pe',
        curso: 'SEMINARIOS DE TESIS I',
        codigo: '062108052',
        imagen: 'https://ui-avatars.com/api/?name=Ana+Gonzalez&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Carlos Eduardo Ramírez Torres',
        email: 'carlos.ramirez@udh.edu.pe',
        curso: 'SEMINARIOS DE TESIS I',
        codigo: '062108052',
        imagen: 'https://ui-avatars.com/api/?name=Carlos+Ramirez&background=2b9a8f&color=fff'
      },
      {
        nombre: 'María Fernanda López Silva',
        email: 'maria.lopez@udh.edu.pe',
        curso: 'SEMINARIO DE TESIS III',
        codigo: '062110052',
        imagen: 'https://ui-avatars.com/api/?name=Maria+Lopez&background=2b9a8f&color=fff'
      },
      {
        nombre: 'José Luis Martínez Campos',
        email: 'jose.martinez@udh.edu.pe',
        curso: 'SEMINARIO DE TESIS III',
        codigo: '062110052',
        imagen: 'https://ui-avatars.com/api/?name=Jose+Martinez&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Patricia Alejandra Vega Rojas',
        email: 'patricia.vega@udh.edu.pe',
        curso: 'TRABAJO DE INVESTIGACIÓN',
        codigo: '062110072',
        imagen: 'https://ui-avatars.com/api/?name=Patricia+Vega&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Roberto Carlos Díaz Mendoza',
        email: 'roberto.diaz@udh.edu.pe',
        curso: 'TRABAJO DE INVESTIGACIÓN',
        codigo: '062110072',
        imagen: 'https://ui-avatars.com/api/?name=Roberto+Diaz&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Lucía Isabel Fernández Cruz',
        email: 'lucia.fernandez@udh.edu.pe',
        curso: 'SEMINARIOS DE TESIS I',
        codigo: '062108052',
        imagen: 'https://ui-avatars.com/api/?name=Lucia+Fernandez&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Miguel Ángel Sánchez Ortiz',
        email: 'miguel.sanchez@udh.edu.pe',
        curso: 'SEMINARIO DE TESIS III',
        codigo: '062110052',
        imagen: 'https://ui-avatars.com/api/?name=Miguel+Sanchez&background=2b9a8f&color=fff'
      }
    ];
    setEstudiantes(estudiantesSimulados);
  }, []);

  const abrirGmail = (estudiante: Estudiante) => {
    const asuntoEncoded = encodeURIComponent(asunto || `Mensaje del curso ${estudiante.curso}`);
    const cuerpoEncoded = encodeURIComponent(mensaje || '');
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${estudiante.email}&su=${asuntoEncoded}&body=${cuerpoEncoded}`;
    window.open(mailtoUrl, '_blank');
  };

  const enviarMensajeRapido = (estudiante: Estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setAsunto(`Mensaje del curso ${estudiante.curso}`);
  };

  const estudiantesFiltrados = estudiantes.filter(est => 
    est.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    est.curso.toLowerCase().includes(filtro.toLowerCase()) ||
    est.codigo.toLowerCase().includes(filtro.toLowerCase())
  );

  // Agrupar estudiantes por curso
  const estudiantesPorCurso = estudiantesFiltrados.reduce((acc, est) => {
    if (!acc[est.curso]) {
      acc[est.curso] = [];
    }
    acc[est.curso].push(est);
    return acc;
  }, {} as Record<string, Estudiante[]>);

  return (
    <div className="mensajeria-docente-container">
      <div className="mensajeria-docente-header">
        <h1 className="mensajeria-docente-titulo">Mensajería</h1>
        <p className="mensajeria-docente-subtitulo">
          Comunícate con tus estudiantes de forma rápida y directa
        </p>
      </div>

      <div className="mensajeria-docente-content">
        {/* Sección izquierda: Lista de estudiantes */}
        <div className="mensajeria-docente-sidebar">
          <div className="mensajeria-docente-card">
            <div className="sidebar-header-docente">
              <div className="sidebar-title-group">
                <h3 className="sidebar-titulo-docente">Mis Estudiantes</h3>
                <span className="badge-contador-docente">{estudiantes.length}</span>
              </div>
              
              {/* Buscador */}
              <div className="search-container-docente">
                <input
                  type="text"
                  placeholder="Buscar estudiante o curso..."
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="search-input-docente"
                />
              </div>
            </div>
            
            <div className="estudiantes-lista-docente">
              {Object.keys(estudiantesPorCurso).length === 0 ? (
                <div className="no-resultados-docente">
                  <p>No se encontraron estudiantes</p>
                </div>
              ) : (
                Object.entries(estudiantesPorCurso).map(([curso, ests]) => (
                  <div key={curso} className="curso-grupo-docente">
                    <div className="curso-grupo-header">
                      <h4>{curso}</h4>
                      <span className="curso-grupo-count">{ests.length}</span>
                    </div>
                    {ests.map((estudiante, index) => (
                      <div
                        key={index}
                        className={`estudiante-item-docente ${estudianteSeleccionado?.email === estudiante.email ? 'active' : ''}`}
                        onClick={() => enviarMensajeRapido(estudiante)}
                      >
                        <div className="estudiante-avatar-docente">
                          <img src={estudiante.imagen} alt={estudiante.nombre} />
                        </div>
                        <div className="estudiante-info-docente">
                          <p className="estudiante-nombre-docente">{estudiante.nombre}</p>
                          <p className="estudiante-email-docente">{estudiante.email}</p>
                        </div>
                        <div className="estudiante-accion-docente">
                          <button
                            className="btn-mensaje-rapido-docente"
                            onClick={(e) => {
                              e.stopPropagation();
                              abrirGmail(estudiante);
                            }}
                            title="Enviar mensaje vía Gmail"
                          >
                            <PaperAirplaneIcon className="icon-mensaje-docente" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Sección derecha: Formulario de mensaje */}
        <div className="mensajeria-docente-main">
          <div className="mensajeria-docente-card">
            <div className="mensaje-header-docente">
              <EnvelopeIcon className="mensaje-icon-docente" />
              <h3 className="mensaje-titulo-docente">
                {estudianteSeleccionado 
                  ? `Mensaje para ${estudianteSeleccionado.nombre}` 
                  : 'Selecciona un estudiante'}
              </h3>
            </div>

            {estudianteSeleccionado ? (
              <div className="mensaje-form-docente">
                <div className="form-group-docente">
                  <label htmlFor="destinatario">Destinatario</label>
                  <div className="input-con-icono-docente">
                    <UserIcon className="input-icon-docente" />
                    <input
                      type="text"
                      id="destinatario"
                      value={`${estudianteSeleccionado.nombre} <${estudianteSeleccionado.email}>`}
                      disabled
                      className="input-destinatario-docente"
                    />
                  </div>
                </div>

                <div className="form-group-docente">
                  <label htmlFor="curso">Curso</label>
                  <input
                    type="text"
                    id="curso"
                    value={`${estudianteSeleccionado.curso} (${estudianteSeleccionado.codigo})`}
                    disabled
                    className="input-curso-docente"
                  />
                </div>

                <div className="form-group-docente">
                  <label htmlFor="asunto">Asunto</label>
                  <input
                    type="text"
                    id="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Escribe el asunto de tu mensaje"
                    className="input-asunto-docente"
                  />
                </div>

                <div className="form-group-docente">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="textarea-mensaje-docente"
                    rows={10}
                  />
                </div>

                <div className="form-acciones-docente">
                  <button
                    className="btn-enviar-gmail-docente"
                    onClick={() => abrirGmail(estudianteSeleccionado)}
                  >
                    <EnvelopeIcon className="btn-icon-docente" />
                    Abrir en Gmail
                  </button>
                  <button
                    className="btn-limpiar-docente"
                    onClick={() => {
                      setAsunto('');
                      setMensaje('');
                    }}
                  >
                    Limpiar
                  </button>
                </div>
              </div>
            ) : (
              <div className="mensaje-placeholder-docente">
                <AcademicCapIcon className="placeholder-icon-docente" />
                <p className="placeholder-texto-docente">
                  Selecciona un estudiante de la lista para enviar un mensaje
                </p>
                <p className="placeholder-subtexto-docente">
                  Tu mensaje se abrirá en Gmail para ser enviado
                </p>
              </div>
            )}
          </div>

          {/* Card informativo */}
          <div className="info-card-docente">
            <div className="info-header-docente">
              📧 ¿Cómo funciona?
            </div>
            <div className="info-body-docente">
              <ul>
                <li>
                  <strong>Selecciona un estudiante</strong> de la lista para comenzar
                </li>
                <li>
                  <strong>Busca por nombre, curso o código</strong> usando el campo de búsqueda
                </li>
                <li>
                  <strong>Escribe tu mensaje</strong> con el asunto y contenido
                </li>
                <li>
                  <strong>Haz clic en "Abrir en Gmail"</strong> para enviar tu mensaje directamente
                </li>
                <li>
                  Tu mensaje se abrirá en <strong>Gmail</strong> con todos los datos prellenados
                </li>
              </ul>
              <p className="info-nota-docente">
                💡 <strong>Nota:</strong> Asegúrate de tener sesión iniciada en Gmail en tu navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MensajeriaDocente;
