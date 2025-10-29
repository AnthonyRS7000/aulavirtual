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
} from "@heroicons/react/24/outline";

const SoporteClassroom = () => {
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
      <TituloPage 
        titulo="Soporte Google Classroom" 
        subtitle="Herramientas administrativas para gestión de cursos y accesos"
      />

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

      <div className="soporte-classroom-grid">
        {/* Card 1: Agregar estudiante irregular */}
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
              Agregar Estudiante
            </button>
          </div>
        </Card>

        {/* Card 2: Gestionar enlaces Meet */}
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
              Guardar Enlace
            </button>
          </div>
        </Card>

        {/* Card 3: Sincronizar cursos */}
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
              Iniciar Sincronización
            </button>
            <p className="soporte-note">
              ⚠️ Este proceso puede tomar varios minutos dependiendo de la cantidad de cursos.
            </p>
          </div>
        </Card>

        {/* Card 4: Restablecer accesos */}
        <Card>
          <div className="soporte-card-header">
            <KeyIcon className="soporte-card-icon" />
            <h3>Restablecer Acceso</h3>
          </div>
          <p className="soporte-card-description">
            Restablece el acceso a Classroom para un usuario que tiene problemas de autenticación.
          </p>
          <div className="soporte-form">
            <div className="soporte-form-group">
              <label htmlFor="email-restablecer">Email Institucional</label>
              <input
                id="email-restablecer"
                type="email"
                value={emailRestablecer}
                onChange={(e) => setEmailRestablecer(e.target.value)}
                placeholder="ejemplo@udh.edu.pe"
                className="soporte-input"
              />
            </div>
            <button className="soporte-btn-secondary" onClick={handleRestablecerAcceso}>
              Restablecer Acceso
            </button>
          </div>
        </Card>

        {/* Card 5: Configurar permisos docentes */}
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
              Aplicar Permisos
            </button>
          </div>
        </Card>

        {/* Card 6: Logs de actividad */}
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
            </div>
            <button className="soporte-btn-secondary">
              Ver Historial Completo
            </button>
          </div>
        </Card>
      </div>

      {/* Sección de ayuda rápida */}
      <Card>
        <div className="soporte-ayuda">
          <h4>📖 Guía Rápida de Uso</h4>
          <ul>
            <li><strong>Estudiante Irregular:</strong> Usa esta opción cuando un estudiante se matriculó tarde y necesita acceso inmediato al curso.</li>
            <li><strong>Enlaces Meet:</strong> Configura el enlace principal de Meet que aparecerá en el curso de Classroom.</li>
            <li><strong>Sincronización:</strong> Ejecuta al inicio de cada semestre para crear automáticamente los cursos en Classroom.</li>
            <li><strong>Restablecer Acceso:</strong> Soluciona problemas de autenticación recreando las credenciales del usuario.</li>
            <li><strong>Permisos:</strong> Ajusta qué puede hacer un docente en su curso (crear tareas, calificar, solo ver, etc.).</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default SoporteClassroom;
