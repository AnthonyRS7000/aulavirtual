import React, { useState } from "react";
import TituloPage from "../../../components/pages/TituloPage";
import Card from "../../../components/pages/Card";
import "../css/SoporteClassroom.css";
import {
  UserPlusIcon,
  VideoCameraIcon,
  ArrowPathIcon,
  KeyIcon,
  ShieldCheckIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  Cog6ToothIcon,
  AcademicCapIcon,
  LinkIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";

type TabType = 'estudiantes' | 'cursos' | 'meet' | 'sincronizacion' | 'permisos' | 'logs';

const SoporteClassroom = () => {
  const [tabActiva, setTabActiva] = useState<TabType>('estudiantes');
  // Estados para agregar estudiante
  const [codigoEstudiante, setCodigoEstudiante] = useState("");
  const [codigoCurso, setCodigoCurso] = useState("");
  const [seccionCurso, setSeccionCurso] = useState("");

  // Estados para enlaces Meet
  const [cursoMeet, setCursoMeet] = useState("");
  const [enlaceMeet, setEnlaceMeet] = useState("");

  // Estados para sincronización
  const [semestreSincronizar, setSemestreSincronizar] = useState("");

  // Estados para restablecer accesos
  const [emailRestablecer, setEmailRestablecer] = useState("");

  // Estados para permisos
  const [emailDocente, setEmailDocente] = useState("");
  const [permisoTipo, setPermisoTipo] = useState("editor");

  // Estados de alertas
  const [alerta, setAlerta] = useState<{tipo: 'exito' | 'error' | null; mensaje: string}>({
    tipo: null,
    mensaje: ""
  });

  const mostrarAlerta = (tipo: 'exito' | 'error', mensaje: string) => {
    setAlerta({ tipo, mensaje });
    setTimeout(() => setAlerta({ tipo: null, mensaje: "" }), 5000);
  };

  const tabs = [
    { id: 'estudiantes' as TabType, label: 'Estudiantes', icon: <UserGroupIcon /> },
    { id: 'cursos' as TabType, label: 'Cursos', icon: <BookOpenIcon /> },
    { id: 'meet' as TabType, label: 'Enlaces Meet', icon: <VideoCameraIcon /> },
    { id: 'sincronizacion' as TabType, label: 'Sincronización', icon: <ArrowPathIcon /> },
    { id: 'permisos' as TabType, label: 'Permisos', icon: <ShieldCheckIcon /> },
    { id: 'logs' as TabType, label: 'Actividad', icon: <ClipboardDocumentListIcon /> }
  ];

  // Función para agregar estudiante a curso
  const handleAgregarEstudiante = async () => {
    if (!codigoEstudiante || !codigoCurso) {
      mostrarAlerta('error', 'Por favor completa todos los campos requeridos');
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await ApiService.post('/classroom/agregar-estudiante', {
      //   codigoEstudiante,
      //   codigoCurso,
      //   seccion: seccionCurso
      // });

      // Simulación
      console.log('Agregando estudiante:', { codigoEstudiante, codigoCurso, seccionCurso });
      mostrarAlerta('exito', `Estudiante ${codigoEstudiante} agregado al curso ${codigoCurso} correctamente`);
      
      // Limpiar formulario
      setCodigoEstudiante("");
      setCodigoCurso("");
      setSeccionCurso("");
    } catch (error) {
      mostrarAlerta('error', 'Error al agregar estudiante. Intenta nuevamente.');
    }
  };

  // Función para configurar enlace Meet
  const handleConfigurarMeet = async () => {
    if (!cursoMeet || !enlaceMeet) {
      mostrarAlerta('error', 'Por favor completa el código de curso y el enlace Meet');
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await ApiService.post('/classroom/configurar-meet', {
      //   codigoCurso: cursoMeet,
      //   enlaceMeet
      // });

      console.log('Configurando Meet:', { cursoMeet, enlaceMeet });
      mostrarAlerta('exito', `Enlace Meet configurado para el curso ${cursoMeet}`);
      
      setCursoMeet("");
      setEnlaceMeet("");
    } catch (error) {
      mostrarAlerta('error', 'Error al configurar enlace Meet');
    }
  };

  // Función para sincronizar cursos
  const handleSincronizarCursos = async () => {
    if (!semestreSincronizar) {
      mostrarAlerta('error', 'Por favor ingresa el semestre a sincronizar');
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await ApiService.post('/classroom/sincronizar', { semestre: semestreSincronizar });

      console.log('Sincronizando cursos del semestre:', semestreSincronizar);
      mostrarAlerta('exito', `Sincronización iniciada para el semestre ${semestreSincronizar}`);
      
      setSemestreSincronizar("");
    } catch (error) {
      mostrarAlerta('error', 'Error al sincronizar cursos');
    }
  };

  // Función para restablecer accesos
  const handleRestablecerAcceso = async () => {
    if (!emailRestablecer) {
      mostrarAlerta('error', 'Por favor ingresa un email');
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await ApiService.post('/classroom/restablecer-acceso', { email: emailRestablecer });

      console.log('Restableciendo acceso para:', emailRestablecer);
      mostrarAlerta('exito', `Acceso restablecido para ${emailRestablecer}`);
      
      setEmailRestablecer("");
    } catch (error) {
      mostrarAlerta('error', 'Error al restablecer acceso');
    }
  };

  // Función para configurar permisos
  const handleConfigurarPermisos = async () => {
    if (!emailDocente) {
      mostrarAlerta('error', 'Por favor ingresa el email del docente');
      return;
    }

    try {
      // TODO: Implementar llamada a API
      // await ApiService.post('/classroom/configurar-permisos', {
      //   email: emailDocente,
      //   permiso: permisoTipo
      // });

      console.log('Configurando permisos:', { emailDocente, permisoTipo });
      mostrarAlerta('exito', `Permisos de ${permisoTipo} asignados a ${emailDocente}`);
      
      setEmailDocente("");
    } catch (error) {
      mostrarAlerta('error', 'Error al configurar permisos');
    }
  };

  return (
    <div className="soporte-classroom-container">
      {/* Header */}
      <div className="soporte-classroom-header">
        <TituloPage 
          titulo="🔧 Soporte Google Classroom" 
          subtitle="Herramientas administrativas para gestión de cursos y accesos"
        />
      </div>

      {/* Alerta global */}
      {alerta.tipo && (
        <div className={`soporte-alerta soporte-alerta-${alerta.tipo}`}>
          {alerta.tipo === 'exito' ? (
            <CheckCircleIcon className="soporte-alerta-icon" />
          ) : (
            <ExclamationCircleIcon className="soporte-alerta-icon" />
          )}
          <span>{alerta.mensaje}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="soporte-tabs-container">
        <div className="soporte-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`soporte-tab ${tabActiva === tab.id ? 'active' : ''}`}
              onClick={() => setTabActiva(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="soporte-content">
        
        {/* TAB: ESTUDIANTES */}
        {tabActiva === 'estudiantes' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <UserPlusIcon className="soporte-card-icon" />
                <h3>Agregar Estudiante Irregular</h3>
              </div>
              <p className="soporte-card-description">
                Inscribe estudiantes que se matricularon de forma irregular o tardía a un curso específico.
              </p>
              <div className="soporte-form">
                <div className="soporte-form-group">
                  <label htmlFor="codigo-estudiante">Código del Estudiante</label>
                  <input
                    id="codigo-estudiante"
                    type="text"
                    value={codigoEstudiante}
                    onChange={(e) => setCodigoEstudiante(e.target.value)}
                    placeholder="Ej: 2021001234"
                    className="soporte-input"
                  />
                </div>
                <div className="soporte-form-group">
                  <label htmlFor="codigo-curso">Código del Curso</label>
                  <input
                    id="codigo-curso"
                    type="text"
                    value={codigoCurso}
                    onChange={(e) => setCodigoCurso(e.target.value)}
                    placeholder="Ej: 062110052"
                    className="soporte-input"
                  />
                </div>
                <div className="soporte-form-group">
                  <label htmlFor="seccion-curso">Sección (Opcional)</label>
                  <input
                    id="seccion-curso"
                    type="text"
                    value={seccionCurso}
                    onChange={(e) => setSeccionCurso(e.target.value)}
                    placeholder="Ej: A"
                    className="soporte-input"
                  />
                </div>
                <button className="soporte-btn-primary" onClick={handleAgregarEstudiante}>
                  <UserPlusIcon className="btn-icon" />
                  Agregar Estudiante
                </button>
              </div>
            </Card>

            <Card>
              <div className="soporte-card-header">
                <KeyIcon className="soporte-card-icon" />
                <h3>Restablecer Acceso de Estudiante</h3>
              </div>
              <p className="soporte-card-description">
                Restablece el acceso a Classroom para un estudiante que tiene problemas de autenticación.
              </p>
              <div className="soporte-form">
                <div className="soporte-form-group">
                  <label htmlFor="email-restablecer-estudiante">Email Institucional</label>
                  <input
                    id="email-restablecer-estudiante"
                    type="email"
                    value={emailRestablecer}
                    onChange={(e) => setEmailRestablecer(e.target.value)}
                    placeholder="estudiante@udh.edu.pe"
                    className="soporte-input"
                  />
                </div>
                <button className="soporte-btn-secondary" onClick={handleRestablecerAcceso}>
                  <KeyIcon className="btn-icon" />
                  Restablecer Acceso
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* TAB: CURSOS */}
        {tabActiva === 'cursos' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <BookOpenIcon className="soporte-card-icon" />
                <h3>Gestión de Cursos</h3>
              </div>
              <p className="soporte-card-description">
                Administra y configura los cursos de Google Classroom sincronizados con el sistema.
              </p>
              <div className="soporte-info-box">
                <div className="info-item">
                  <span className="info-label">Cursos Activos:</span>
                  <span className="info-value">342</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Cursos Archivados:</span>
                  <span className="info-value">128</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Última Sincronización:</span>
                  <span className="info-value">Hace 2 horas</span>
                </div>
              </div>
              <button className="soporte-btn-secondary">
                <BookOpenIcon className="btn-icon" />
                Ver Todos los Cursos
              </button>
            </Card>
          </div>
        )}

        {/* TAB: ENLACES MEET */}
        {tabActiva === 'meet' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <VideoCameraIcon className="soporte-card-icon" />
                <h3>Configurar Enlace Meet</h3>
              </div>
              <p className="soporte-card-description">
                Asigna o actualiza el enlace de Google Meet para las clases virtuales de un curso.
              </p>
              <div className="soporte-form">
                <div className="soporte-form-group">
                  <label htmlFor="curso-meet">Código del Curso</label>
                  <input
                    id="curso-meet"
                    type="text"
                    value={cursoMeet}
                    onChange={(e) => setCursoMeet(e.target.value)}
                    placeholder="Ej: 062110052"
                    className="soporte-input"
                  />
                </div>
                <div className="soporte-form-group">
                  <label htmlFor="enlace-meet">Enlace de Google Meet</label>
                  <input
                    id="enlace-meet"
                    type="url"
                    value={enlaceMeet}
                    onChange={(e) => setEnlaceMeet(e.target.value)}
                    placeholder="https://meet.google.com/xxx-xxxx-xxx"
                    className="soporte-input"
                  />
                </div>
                <button className="soporte-btn-primary" onClick={handleConfigurarMeet}>
                  <VideoCameraIcon className="btn-icon" />
                  Guardar Enlace
                </button>
              </div>
            </Card>

            <Card>
              <div className="soporte-card-header">
                <LinkIcon className="soporte-card-icon" />
                <h3>Enlaces Configurados</h3>
              </div>
              <p className="soporte-card-description">
                Lista de cursos con enlaces de Google Meet configurados.
              </p>
              <div className="soporte-enlaces-list">
                <div className="enlace-item">
                  <div className="enlace-info">
                    <strong>Programación I</strong>
                    <span className="enlace-codigo">062110052</span>
                  </div>
                  <button className="btn-enlace-edit">Editar</button>
                </div>
                <div className="enlace-item">
                  <div className="enlace-info">
                    <strong>Base de Datos</strong>
                    <span className="enlace-codigo">062108052</span>
                  </div>
                  <button className="btn-enlace-edit">Editar</button>
                </div>
                <div className="enlace-item">
                  <div className="enlace-info">
                    <strong>Redes I</strong>
                    <span className="enlace-codigo">062112052</span>
                  </div>
                  <button className="btn-enlace-edit">Editar</button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB: SINCRONIZACIÓN */}
        {tabActiva === 'sincronizacion' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <ArrowPathIcon className="soporte-card-icon" />
                <h3>Sincronizar Cursos</h3>
              </div>
              <p className="soporte-card-description">
                Sincroniza los cursos del sistema académico con Google Classroom para un semestre específico.
              </p>
              <div className="soporte-form">
                <div className="soporte-form-group">
                  <label htmlFor="semestre-sincronizar">Semestre</label>
                  <input
                    id="semestre-sincronizar"
                    type="text"
                    value={semestreSincronizar}
                    onChange={(e) => setSemestreSincronizar(e.target.value)}
                    placeholder="Ej: 2025-2"
                    className="soporte-input"
                  />
                </div>
                <button className="soporte-btn-primary" onClick={handleSincronizarCursos}>
                  <ArrowPathIcon className="btn-icon" />
                  Iniciar Sincronización
                </button>
                <p className="soporte-note">
                  ⚠️ Este proceso puede tomar varios minutos dependiendo de la cantidad de cursos.
                </p>
              </div>
            </Card>

            <Card>
              <div className="soporte-card-header">
                <ChartBarIcon className="soporte-card-icon" />
                <h3>Historial de Sincronizaciones</h3>
              </div>
              <p className="soporte-card-description">
                Consulta el estado de las sincronizaciones realizadas anteriormente.
              </p>
              <div className="soporte-sincronizacion-list">
                <div className="sync-item">
                  <div className="sync-info">
                    <strong>2025-I</strong>
                    <span className="sync-date">15 de Marzo, 2025</span>
                  </div>
                  <span className="sync-status completado">
                    <CheckCircleIcon className="status-icon" />
                    Completado
                  </span>
                </div>
                <div className="sync-item">
                  <div className="sync-info">
                    <strong>2024-II</strong>
                    <span className="sync-date">10 de Agosto, 2024</span>
                  </div>
                  <span className="sync-status completado">
                    <CheckCircleIcon className="status-icon" />
                    Completado
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* TAB: PERMISOS */}
        {tabActiva === 'permisos' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <ShieldCheckIcon className="soporte-card-icon" />
                <h3>Permisos de Docente</h3>
              </div>
              <p className="soporte-card-description">
                Asigna o modifica los permisos de un docente en sus cursos de Classroom.
              </p>
              <div className="soporte-form">
                <div className="soporte-form-group">
                  <label htmlFor="email-docente">Email del Docente</label>
                  <input
                    id="email-docente"
                    type="email"
                    value={emailDocente}
                    onChange={(e) => setEmailDocente(e.target.value)}
                    placeholder="docente@udh.edu.pe"
                    className="soporte-input"
                  />
                </div>
                <div className="soporte-form-group">
                  <label htmlFor="permiso-tipo">Tipo de Permiso</label>
                  <select
                    id="permiso-tipo"
                    value={permisoTipo}
                    onChange={(e) => setPermisoTipo(e.target.value)}
                    className="soporte-select"
                  >
                    <option value="owner">Propietario (Owner)</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Visualizador</option>
                  </select>
                </div>
                <button className="soporte-btn-primary" onClick={handleConfigurarPermisos}>
                  <ShieldCheckIcon className="btn-icon" />
                  Aplicar Permisos
                </button>
              </div>
            </Card>

            <Card>
              <div className="soporte-ayuda">
                <h4>📖 Tipos de Permisos</h4>
                <ul>
                  <li><strong>Propietario (Owner):</strong> Control total del curso. Puede agregar/remover docentes, eliminar el curso.</li>
                  <li><strong>Editor:</strong> Puede crear tareas, calificar, publicar anuncios y gestionar estudiantes.</li>
                  <li><strong>Visualizador:</strong> Solo puede ver el contenido del curso, sin permisos de edición.</li>
                </ul>
              </div>
            </Card>
          </div>
        )}

        {/* TAB: LOGS */}
        {tabActiva === 'logs' && (
          <div className="soporte-section">
            <Card>
              <div className="soporte-card-header">
                <ClipboardDocumentListIcon className="soporte-card-icon" />
                <h3>Logs de Actividad</h3>
              </div>
              <p className="soporte-card-description">
                Consulta el historial de acciones realizadas en el sistema de soporte Classroom.
              </p>
              <div className="soporte-form">
                <div className="soporte-logs-preview">
                  <div className="soporte-log-item">
                    <span className="soporte-log-time">10:30 AM</span>
                    <span className="soporte-log-action">Estudiante 2021001234 agregado a curso 062110052</span>
                  </div>
                  <div className="soporte-log-item">
                    <span className="soporte-log-time">09:15 AM</span>
                    <span className="soporte-log-action">Enlace Meet actualizado para curso 062108052</span>
                  </div>
                  <div className="soporte-log-item">
                    <span className="soporte-log-time">08:45 AM</span>
                    <span className="soporte-log-action">Sincronización completada para semestre 2025-2</span>
                  </div>
                  <div className="soporte-log-item">
                    <span className="soporte-log-time">08:20 AM</span>
                    <span className="soporte-log-action">Permisos de editor asignados a docente@udh.edu.pe</span>
                  </div>
                  <div className="soporte-log-item">
                    <span className="soporte-log-time">07:55 AM</span>
                    <span className="soporte-log-action">Acceso restablecido para estudiante@udh.edu.pe</span>
                  </div>
                </div>
                <button className="soporte-btn-secondary">
                  <ClipboardDocumentListIcon className="btn-icon" />
                  Ver Historial Completo
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SoporteClassroom;
