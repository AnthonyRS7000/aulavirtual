import { useState, useEffect } from 'react';
import { EnvelopeIcon, PaperAirplaneIcon, UserIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import '../css/Mensajeria.css';
import { getTareasPendientes } from '../../../api/classroom';
import TituloPage from '../../../components/pages/TituloPage';
import Card from '../../../components/pages/Card';

// Define la interfaz según la respuesta real del backend
interface TareaPendientePorCurso {
  curso_id: string;
  nombre_curso: string;
  docente_id: string;
  docente: string;
  foto_docente:string;
  correo_docente: string;
  tareas_pendientes: {
    tarea_id: string;
    titulo: string;
    descripcion: string;
    fecha_entrega: string;
    estado: string;
    submission_id: string; // Agrega submission_id aquí
  }[];
}

const Mensajeria = () => {
  const [tareasPendientes, setTareasPendientes] = useState<TareaPendientePorCurso[]>([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<{nombre: string, email: string, curso: string} | null>(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<any>(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [loadingDocentes, setLoadingDocentes] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    setLoadingDocentes(true);
    getTareasPendientes()
      .then((data: any) => setTareasPendientes(data))
      .catch(() => setTareasPendientes([]))
      .finally(() => setLoadingDocentes(false));
  }, []);

  const abrirGmail = (docente: {nombre: string, email: string, curso: string}) => {
    const asuntoEncoded = encodeURIComponent(asunto || `Consulta sobre ${docente.curso}`);
    const cuerpoEncoded = encodeURIComponent(mensaje || '');
    const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${docente.email}&su=${asuntoEncoded}&body=${cuerpoEncoded}`;
    window.open(mailtoUrl, '_blank');
  };

  const enviarMensajeRapido = (docente: {nombre: string, email: string, curso: string}) => {
    setDocenteSeleccionado(docente);
    setAsunto(`Consulta sobre ${docente.curso}`);
  };

const seleccionarTarea = (item: any) => {
  // Normalizar identificadores por si vienen con nombres distintos
  const cursoId = item.curso_id ?? item.course_id ?? item.cursoId ?? item.courseId ?? item.id_curso ?? item.id ?? null;
  const tareaId = item.tarea_id ?? item.id ?? item.taskId ?? null;
  const submissionId = item.submission_id ?? item.submissionId ?? item.submission ?? null;

  const normalized = {
    ...item,
    curso_id: cursoId,
    tarea_id: tareaId,
    submission_id: submissionId,
  };

  console.log('Tarea seleccionada (normalizada):', normalized);

  const nombreDocente = item.docente ?? item.nombre_docente ?? '';
  const emailDocente = item.email ?? item.correo_docente ?? item.correo ?? '';
  const nombreCurso = item.curso ?? item.nombre_curso ?? '';

  setDocenteSeleccionado({ nombre: nombreDocente, email: emailDocente, curso: nombreCurso });
  setTareaSeleccionada(normalized);
  setAsunto(`Consulta sobre ${item.tareaTitulo ?? item.titulo ?? ''}`);
};
  // Aplana las tareas pendientes para mostrar una card por tarea
  const tareasDocentes = tareasPendientes.flatMap(curso => {
    const cursoId = curso.curso_id ;
    return curso.tareas_pendientes.map(tarea => ({
      foto: curso.foto_docente,
      docente: curso.docente,
      email: curso.correo_docente,
      curso: curso.nombre_curso,
      tareaTitulo: tarea.titulo,
      tareaDescripcion: tarea.descripcion,
      tareaFecha: tarea.fecha_entrega,
      tareaEstado: tarea.estado,
      curso_id: cursoId,
      tarea_id: tarea.tarea_id,
      submission_id: tarea.submission_id ,
    }));
  });


  return (
    <div className="mensajeria-container">
      <TituloPage titulo="Mensajería" />

      <div className="mensajeria-content">
        {/* Sección izquierda: Cards de tareas por docente */}
        <div className="mensajeria-sidebar">
          <Card>
            <div className="sidebar-header">
              <h3 className="sidebar-titulo">Tareas y Docentes</h3>
              <span className="badge-contador">{tareasDocentes.length}</span>
            </div>
            <div className="docentes-lista">
              {loadingDocentes ? (
               <div className="loader-container">
                  <div className="loader"></div>
                  <p className="loader-text">Cargando Tareas...</p>
                </div>
              ) : tareasDocentes.length === 0 ? (
                <div className="no-docentes">No hay tareas pendientes.</div>
              ) : (
                tareasDocentes.map((item, index) => (
                  <div
                    key={index}
                    className={`docente-item ${tareaSeleccionada?.tarea_id === item.tarea_id ? 'active' : ''}`}
                    onClick={() => seleccionarTarea(item)} // <-- Cambia esto
                  >
                    <div className="docente-avatar">
                      {item.foto ? (
                        <img src={item.foto} alt={item.docente} className="foto-docente" />
                      ) : (
                        <UserIcon className="input-icon" />
                      )}
                    </div>
                    <div className="docente-info">
                      <p className="docente-nombre">{item.docente}</p>
                      <p className="docente-curso">{item.curso}</p>
                      <p className="docente-tarea"><b>{item.tareaTitulo}</b></p>
                      <p className="docente-tarea-desc">{item.tareaDescripcion}</p>
                      <p className="docente-tarea-fecha">Entrega: {item.tareaFecha} </p>
                    </div>
                    <div className="docente-accion">
                      <button
                        className="btn-mensaje-rapido"
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirGmail({ nombre: item.docente, email: item.email, curso: item.curso });
                        }}
                        title="Enviar mensaje vía Gmail"
                      >
                        <PaperAirplaneIcon className="icon-mensaje" />
                      </button>
                    </div>
                  </div>
                ))
              )}
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
               ¿Cómo funciona?
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
