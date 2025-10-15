import { useState, useEffect } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon, UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import '../css/Mensajeria.css';
import TituloPage from '../../../components/pages/TituloPage';
import Card from '../../../components/pages/Card';

interface Docente {
  nombre: string;
  email: string;
  curso: string;
  imagen?: string;
}

const Mensajeria = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<Docente | null>(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    // Simulación de carga de docentes desde localStorage o API
    const docentesSimulados: Docente[] = [
      {
        nombre: 'Dacio Luis Durán Cárdenas',
        email: 'dduran@udh.edu.pe',
        curso: 'EVALUACIÓN DE PROYECTOS',
        imagen: 'https://ui-avatars.com/api/?name=Dacio+Duran&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Ulises Fidel Perla Camacho',
        email: 'uperla@udh.edu.pe',
        curso: 'PLANEAMIENTO Y GESTIÓN ESTRATÉGICA',
        imagen: 'https://ui-avatars.com/api/?name=Ulises+Perla&background=2b9a8f&color=fff'
      },
      {
        nombre: 'Ana María Rojas Vega',
        email: 'arojas@udh.edu.pe',
        curso: 'METODOLOGÍA DE LA INVESTIGACIÓN',
        imagen: 'https://ui-avatars.com/api/?name=Ana+Rojas&background=2b9a8f&color=fff'
      }
    ];
    setDocentes(docentesSimulados);
  }, []);

  const abrirGmail = (docente: Docente) => {
    const asuntoEncoded = encodeURIComponent(asunto || `Consulta sobre ${docente.curso}`);
    const cuerpoEncoded = encodeURIComponent(mensaje || '');
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${docente.email}&su=${asuntoEncoded}&body=${cuerpoEncoded}`;
    window.open(mailtoUrl, '_blank');
  };

  const enviarMensajeRapido = (docente: Docente) => {
    setDocenteSeleccionado(docente);
    setAsunto(`Consulta sobre ${docente.curso}`);
  };

  return (
    <div className="mensajeria-container">
      <TituloPage titulo="Mensajería" />

      <div className="mensajeria-content">
        {/* Sección izquierda: Lista de docentes */}
        <div className="mensajeria-sidebar">
          <Card>
            <div className="sidebar-header">
              <h3 className="sidebar-titulo">Tus Docentes</h3>
              <span className="badge-contador">{docentes.length}</span>
            </div>
            
            <div className="docentes-lista">
              {docentes.map((docente, index) => (
                <div
                  key={index}
                  className={`docente-item ${docenteSeleccionado?.email === docente.email ? 'active' : ''}`}
                  onClick={() => enviarMensajeRapido(docente)}
                >
                  <div className="docente-avatar">
                    <img src={docente.imagen} alt={docente.nombre} />
                  </div>
                  <div className="docente-info">
                    <p className="docente-nombre">{docente.nombre}</p>
                    <p className="docente-curso">{docente.curso}</p>
                    <p className="docente-email">{docente.email}</p>
                  </div>
                  <div className="docente-accion">
                    <button
                      className="btn-mensaje-rapido"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirGmail(docente);
                      }}
                      title="Enviar mensaje vía Gmail"
                    >
                      <PaperAirplaneIcon className="icon-mensaje" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sección derecha: Formulario de mensaje */}
        <div className="mensajeria-main">
          <Card>
            <div className="mensaje-header">
              <EnvelopeIcon className="mensaje-icon" />
              <h3 className="mensaje-titulo">
                {docenteSeleccionado 
                  ? `Mensaje para ${docenteSeleccionado.nombre}` 
                  : 'Selecciona un docente'}
              </h3>
            </div>

            {docenteSeleccionado ? (
              <div className="mensaje-form">
                <div className="form-group">
                  <label htmlFor="destinatario">Destinatario</label>
                  <div className="input-con-icono">
                    <UserIcon className="input-icon" />
                    <input
                      type="text"
                      id="destinatario"
                      value={`${docenteSeleccionado.nombre} <${docenteSeleccionado.email}>`}
                      disabled
                      className="input-destinatario"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="asunto">Asunto</label>
                  <input
                    type="text"
                    id="asunto"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    placeholder="Escribe el asunto de tu mensaje"
                    className="input-asunto"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Escribe tu mensaje aquí..."
                    className="textarea-mensaje"
                    rows={10}
                  />
                </div>

                <div className="form-acciones">
                  <button
                    className="btn-enviar-gmail"
                    onClick={() => abrirGmail(docenteSeleccionado)}
                  >
                    <EnvelopeIcon className="btn-icon" />
                    Abrir en Gmail
                  </button>
                  <button
                    className="btn-limpiar"
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
              <div className="mensaje-placeholder">
                <AcademicCapIcon className="placeholder-icon" />
                <p className="placeholder-texto">
                  Selecciona un docente de la lista para enviar un mensaje
                </p>
                <p className="placeholder-subtexto">
                  Tu mensaje se abrirá en Gmail para ser enviado
                </p>
              </div>
            )}
          </Card>

          {/* Card informativo */}
          <div className="info-card">
            <div className="info-header">
              📧 ¿Cómo funciona?
            </div>
            <div className="info-body">
              <ul>
                <li>
                  <strong>Selecciona un docente</strong> de la lista para comenzar
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
              <p className="info-nota">
                💡 <strong>Nota:</strong> Asegúrate de tener sesión iniciada en Gmail en tu navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensajeria;
