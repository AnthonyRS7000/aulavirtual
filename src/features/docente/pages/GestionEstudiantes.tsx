import { FaPlus, FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaDownload, FaUpload, FaUserPlus, FaEnvelope, FaPhone, FaGraduationCap, FaCalendarAlt, FaChartBar, FaTimes, FaSave, FaFileExcel, FaFilePdf, FaBook, FaClipboard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useState } from 'react';
import '../css/GestionEstudiantes.css';

interface Estudiante {
  id: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  ciclo: string;
  carrera: string;
  promedio: number;
  creditos: number;
  estado: 'activo' | 'inactivo' | 'suspendido' | 'egresado';
  fechaIngreso: string;
  ultimaActividad: string;
  cursosMatriculados: number;
  avatar?: string;
}

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  creditos: number;
  promedio: number;
  asistencia: number;
  estado: 'cursando' | 'aprobado' | 'desaprobado' | 'retirado';
}

interface FormularioEstudiante {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  codigo: string;
  carrera: string;
  ciclo: string;
}

export default function GestionEstudiantes() {
  const [vistaActual, setVistaActual] = useState<'lista' | 'detalle'>('lista');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<number | null>(null);
  const [modalActivo, setModalActivo] = useState<'crear' | 'editar' | 'importar' | 'enviar-email' | null>(null);
  const [pestañaActiva, setPestañaActiva] = useState<'general' | 'cursos' | 'calificaciones' | 'asistencia'>('general');

  // Estados de filtros y búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [filtroCarrera, setFiltroCarrera] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroCiclo, setFiltroCiclo] = useState('todos');

  // Estados para formularios
  const [formularioEstudiante, setFormularioEstudiante] = useState<FormularioEstudiante>({
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    codigo: '',
    carrera: 'Ingeniería de Sistemas',
    ciclo: 'I'
  });

  const [emailData, setEmailData] = useState({
    asunto: '',
    mensaje: '',
    destinatarios: [] as number[],
    enviarATodos: false
  });

  // Datos simulados
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([
    {
      id: 1,
      codigo: "202121001",
      nombres: "Ana María",
      apellidos: "García Rodríguez",
      email: "ana.garcia@udh.edu.pe",
      telefono: "+51 987654321",
      fechaNacimiento: "2003-05-15",
      ciclo: "VI",
      carrera: "Ingeniería de Sistemas",
      promedio: 16.8,
      creditos: 120,
      estado: 'activo',
      fechaIngreso: "2021-03-15",
      ultimaActividad: "Hace 2 horas",
      cursosMatriculados: 6
    },
    {
      id: 2,
      codigo: "202121002",
      nombres: "Carlos Eduardo",
      apellidos: "López Mendoza",
      email: "carlos.lopez@udh.edu.pe",
      telefono: "+51 987654322",
      fechaNacimiento: "2002-08-22",
      ciclo: "VI",
      carrera: "Ingeniería de Sistemas",
      promedio: 15.2,
      creditos: 115,
      estado: 'activo',
      fechaIngreso: "2021-03-15",
      ultimaActividad: "Hace 1 día",
      cursosMatriculados: 6
    },
    {
      id: 3,
      codigo: "202121003",
      nombres: "María José",
      apellidos: "Fernández Torres",
      email: "maria.fernandez@udh.edu.pe",
      telefono: "+51 987654323",
      fechaNacimiento: "2003-01-10",
      ciclo: "V",
      carrera: "Administración",
      promedio: 17.5,
      creditos: 100,
      estado: 'activo',
      fechaIngreso: "2021-08-20",
      ultimaActividad: "Hace 3 horas",
      cursosMatriculados: 5
    },
    {
      id: 4,
      codigo: "202021004",
      nombres: "Jorge Luis",
      apellidos: "Martínez Silva",
      email: "jorge.martinez@udh.edu.pe",
      telefono: "+51 987654324",
      fechaNacimiento: "2001-11-05",
      ciclo: "VIII",
      carrera: "Ingeniería Civil",
      promedio: 14.8,
      creditos: 160,
      estado: 'activo',
      fechaIngreso: "2020-03-10",
      ultimaActividad: "Hace 5 días",
      cursosMatriculados: 7
    }
  ]);

  const cursosEstudiante: Curso[] = [
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Programación Orientada a Objetos",
      creditos: 4,
      promedio: 17.2,
      asistencia: 92,
      estado: 'cursando'
    },
    {
      id: 2,
      codigo: "IS-302",
      nombre: "Base de Datos I",
      creditos: 3,
      promedio: 16.8,
      asistencia: 88,
      estado: 'cursando'
    },
    {
      id: 3,
      codigo: "IS-303",
      nombre: "Análisis y Diseño de Sistemas",
      creditos: 4,
      promedio: 15.5,
      asistencia: 95,
      estado: 'cursando'
    }
  ];

  // Funciones de utilidad
  const obtenerEstadoBadgeClass = (estado: string) => {
    switch (estado) {
      case 'activo': return 'success';
      case 'inactivo': return 'warning';
      case 'suspendido': return 'danger';
      case 'egresado': return 'info';
      default: return 'secondary';
    }
  };

  const obtenerEstadoCursoClass = (estado: string) => {
    switch (estado) {
      case 'cursando': return 'primary';
      case 'aprobado': return 'success';
      case 'desaprobado': return 'danger';
      case 'retirado': return 'warning';
      default: return 'secondary';
    }
  };

  const calcularEdad = (fechaNacimiento: string) => {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    return edad;
  };

  // Funciones de filtrado
  const estudiantesFiltrados = estudiantes.filter(estudiante => {
    const coincideBusqueda = 
      estudiante.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
      estudiante.codigo.includes(busqueda) ||
      estudiante.email.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCarrera = filtroCarrera === 'todas' || estudiante.carrera === filtroCarrera;
    const coincideEstado = filtroEstado === 'todos' || estudiante.estado === filtroEstado;
    const coincideCiclo = filtroCiclo === 'todos' || estudiante.ciclo === filtroCiclo;

    return coincideBusqueda && coincideCarrera && coincideEstado && coincideCiclo;
  });

  // Funciones CRUD
  const crearEstudiante = () => {
    setModalActivo('crear');
  };

  const editarEstudiante = (id: number) => {
    const estudiante = estudiantes.find(e => e.id === id);
    if (estudiante) {
      setFormularioEstudiante({
        nombres: estudiante.nombres,
        apellidos: estudiante.apellidos,
        email: estudiante.email,
        telefono: estudiante.telefono,
        fechaNacimiento: estudiante.fechaNacimiento,
        codigo: estudiante.codigo,
        carrera: estudiante.carrera,
        ciclo: estudiante.ciclo
      });
      setEstudianteSeleccionado(id);
      setModalActivo('editar');
    }
  };

  const verDetalleEstudiante = (id: number) => {
    setEstudianteSeleccionado(id);
    setVistaActual('detalle');
    setPestañaActiva('general');
  };

  const eliminarEstudiante = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      setEstudiantes(estudiantes.filter(e => e.id !== id));
    }
  };

  const cerrarModal = () => {
    setModalActivo(null);
    setFormularioEstudiante({
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      fechaNacimiento: '',
      codigo: '',
      carrera: 'Ingeniería de Sistemas',
      ciclo: 'I'
    });
    setEmailData({
      asunto: '',
      mensaje: '',
      destinatarios: [],
      enviarATodos: false
    });
  };

  const guardarEstudiante = () => {
    if (!formularioEstudiante.nombres || !formularioEstudiante.apellidos || !formularioEstudiante.email) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    if (modalActivo === 'crear') {
      const nuevoEstudiante: Estudiante = {
        id: Date.now(),
        ...formularioEstudiante,
        promedio: 0,
        creditos: 0,
        estado: 'activo',
        fechaIngreso: new Date().toISOString().split('T')[0],
        ultimaActividad: 'Recién registrado',
        cursosMatriculados: 0
      };
      setEstudiantes([...estudiantes, nuevoEstudiante]);
    } else if (modalActivo === 'editar' && estudianteSeleccionado) {
      setEstudiantes(estudiantes.map(e => 
        e.id === estudianteSeleccionado 
          ? { ...e, ...formularioEstudiante }
          : e
      ));
    }

    cerrarModal();
  };

  const exportarDatos = (formato: 'excel' | 'pdf') => {
    console.log(`Exportando datos en formato ${formato}`);
    // Implementar lógica de exportación
  };

  const enviarEmail = () => {
    if (!emailData.asunto || !emailData.mensaje) {
      alert('Por favor completa el asunto y mensaje');
      return;
    }

    console.log('Enviando email:', emailData);
    cerrarModal();
  };

  // Componente Modal
  const renderModal = () => {
    if (!modalActivo) return null;

    return (
      <div className="modal-overlay" onClick={cerrarModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          
          {/* Modal Crear/Editar Estudiante */}
          {(modalActivo === 'crear' || modalActivo === 'editar') && (
            <>
              <div className="modal-header">
                <h2>
                  {modalActivo === 'crear' ? 'Registrar Nuevo Estudiante' : 'Editar Estudiante'}
                </h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombres *</label>
                    <input
                      type="text"
                      value={formularioEstudiante.nombres}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        nombres: e.target.value
                      })}
                      placeholder="Nombres del estudiante"
                    />
                  </div>

                  <div className="form-group">
                    <label>Apellidos *</label>
                    <input
                      type="text"
                      value={formularioEstudiante.apellidos}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        apellidos: e.target.value
                      })}
                      placeholder="Apellidos del estudiante"
                    />
                  </div>

                  <div className="form-group">
                    <label>Código de Estudiante *</label>
                    <input
                      type="text"
                      value={formularioEstudiante.codigo}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        codigo: e.target.value
                      })}
                      placeholder="Ej: 202121001"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Institucional *</label>
                    <input
                      type="email"
                      value={formularioEstudiante.email}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        email: e.target.value
                      })}
                      placeholder="estudiante@udh.edu.pe"
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono</label>
                    <input
                      type="tel"
                      value={formularioEstudiante.telefono}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        telefono: e.target.value
                      })}
                      placeholder="+51 987654321"
                    />
                  </div>

                  <div className="form-group">
                    <label>Fecha de Nacimiento</label>
                    <input
                      type="date"
                      value={formularioEstudiante.fechaNacimiento}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        fechaNacimiento: e.target.value
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Carrera</label>
                    <select
                      value={formularioEstudiante.carrera}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        carrera: e.target.value
                      })}
                    >
                      <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
                      <option value="Ingeniería Civil">Ingeniería Civil</option>
                      <option value="Administración">Administración</option>
                      <option value="Contabilidad">Contabilidad</option>
                      <option value="Derecho">Derecho</option>
                      <option value="Psicología">Psicología</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Ciclo Académico</label>
                    <select
                      value={formularioEstudiante.ciclo}
                      onChange={(e) => setFormularioEstudiante({
                        ...formularioEstudiante,
                        ciclo: e.target.value
                      })}
                    >
                      {Array.from({ length: 10 }, (_, i) => (
                        <option key={i} value={`${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i]}`}>
                          {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][i]} Ciclo
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={guardarEstudiante}>
                  <FaSave />
                  {modalActivo === 'crear' ? 'Registrar Estudiante' : 'Guardar Cambios'}
                </button>
              </div>
            </>
          )}

          {/* Modal Enviar Email */}
          {modalActivo === 'enviar-email' && (
            <>
              <div className="modal-header">
                <h2>Enviar Email a Estudiantes</h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>
                      <input
                        type="checkbox"
                        checked={emailData.enviarATodos}
                        onChange={(e) => setEmailData({
                          ...emailData,
                          enviarATodos: e.target.checked
                        })}
                      />
                      Enviar a todos los estudiantes filtrados ({estudiantesFiltrados.length})
                    </label>
                  </div>

                  <div className="form-group full-width">
                    <label>Asunto *</label>
                    <input
                      type="text"
                      value={emailData.asunto}
                      onChange={(e) => setEmailData({
                        ...emailData,
                        asunto: e.target.value
                      })}
                      placeholder="Asunto del mensaje"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Mensaje *</label>
                    <textarea
                      value={emailData.mensaje}
                      onChange={(e) => setEmailData({
                        ...emailData,
                        mensaje: e.target.value
                      })}
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={enviarEmail}>
                  <FaEnvelope />
                  Enviar Email
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  // Vista detalle del estudiante
  if (vistaActual === 'detalle' && estudianteSeleccionado) {
    const estudiante = estudiantes.find(e => e.id === estudianteSeleccionado)!;
    
    return (
      <div className="gestion-estudiantes-usil">
        <div className="estudiante-detalle">
          {/* Header del estudiante */}
          <div className="estudiante-header">
            <div className="estudiante-info">
              <button 
                className="btn-volver"
                onClick={() => setVistaActual('lista')}
              >
                ← Volver a Estudiantes
              </button>
              
              <div className="estudiante-perfil">
                <div className="avatar">
                  <FaGraduationCap />
                </div>
                <div className="info">
                  <h1>{estudiante.nombres} {estudiante.apellidos}</h1>
                  <div className="meta">
                    <span className="codigo">{estudiante.codigo}</span>
                    <span className="carrera">{estudiante.carrera}</span>
                    <span className={`estado-badge ${obtenerEstadoBadgeClass(estudiante.estado)}`}>
                      {estudiante.estado}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="estudiante-acciones">
              <button className="btn-accion" onClick={() => editarEstudiante(estudiante.id)}>
                <FaEdit />
                Editar
              </button>
              <button className="btn-accion" onClick={() => setModalActivo('enviar-email')}>
                <FaEnvelope />
                Enviar Email
              </button>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <div className="pestañas-nav">
            {[
              { key: 'general', label: 'Información General', icon: FaEye },
              { key: 'cursos', label: 'Cursos', icon: FaBook },
              { key: 'calificaciones', label: 'Calificaciones', icon: FaClipboard },
              { key: 'asistencia', label: 'Asistencia', icon: FaCheckCircle }
            ].map(pestaña => (
              <button
                key={pestaña.key}
                className={`pestaña ${pestañaActiva === pestaña.key ? 'activa' : ''}`}
                onClick={() => setPestañaActiva(pestaña.key as any)}
              >
                <pestaña.icon />
                {pestaña.label}
              </button>
            ))}
          </div>

          {/* Contenido de pestañas */}
          <div className="pestaña-contenido">
            {pestañaActiva === 'general' && (
              <div className="general-content">
                <div className="info-cards">
                  <div className="info-card">
                    <h3>Información Personal</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Email:</label>
                        <span>{estudiante.email}</span>
                      </div>
                      <div className="info-item">
                        <label>Teléfono:</label>
                        <span>{estudiante.telefono}</span>
                      </div>
                      <div className="info-item">
                        <label>Edad:</label>
                        <span>{calcularEdad(estudiante.fechaNacimiento)} años</span>
                      </div>
                      <div className="info-item">
                        <label>Fecha de Nacimiento:</label>
                        <span>{new Date(estudiante.fechaNacimiento).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3>Información Académica</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Carrera:</label>
                        <span>{estudiante.carrera}</span>
                      </div>
                      <div className="info-item">
                        <label>Ciclo Actual:</label>
                        <span>{estudiante.ciclo}</span>
                      </div>
                      <div className="info-item">
                        <label>Créditos Acumulados:</label>
                        <span>{estudiante.creditos}</span>
                      </div>
                      <div className="info-item">
                        <label>Promedio General:</label>
                        <span className="promedio">{estudiante.promedio.toFixed(1)}</span>
                      </div>
                      <div className="info-item">
                        <label>Fecha de Ingreso:</label>
                        <span>{new Date(estudiante.fechaIngreso).toLocaleDateString()}</span>
                      </div>
                      <div className="info-item">
                        <label>Última Actividad:</label>
                        <span>{estudiante.ultimaActividad}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="stats-estudiante">
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaBook />
                    </div>
                    <div className="stat-info">
                      <span className="stat-numero">{estudiante.cursosMatriculados}</span>
                      <span className="stat-label">Cursos Matriculados</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaChartBar />
                    </div>
                    <div className="stat-info">
                      <span className="stat-numero">{estudiante.promedio.toFixed(1)}</span>
                      <span className="stat-label">Promedio Ponderado</span>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">
                      <FaGraduationCap />
                    </div>
                    <div className="stat-info">
                      <span className="stat-numero">{estudiante.creditos}</span>
                      <span className="stat-label">Créditos Acumulados</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pestañaActiva === 'cursos' && (
              <div className="cursos-content">
                <h3>Cursos Matriculados - Ciclo Actual</h3>
                <div className="cursos-estudiante">
                  {cursosEstudiante.map(curso => (
                    <div key={curso.id} className="curso-estudiante-card">
                      <div className="curso-info">
                        <h4>{curso.nombre}</h4>
                        <span className="codigo">{curso.codigo}</span>
                        <div className="curso-stats">
                          <span>Créditos: {curso.creditos}</span>
                          <span>Promedio: {curso.promedio.toFixed(1)}</span>
                          <span>Asistencia: {curso.asistencia}%</span>
                        </div>
                      </div>
                      <div className="curso-estado">
                        <span className={`estado-badge ${obtenerEstadoCursoClass(curso.estado)}`}>
                          {curso.estado}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'calificaciones' && (
              <div className="calificaciones-content">
                <h3>Historial de Calificaciones</h3>
                <div className="calificaciones-tabla">
                  <div className="tabla-header">
                    <span>Curso</span>
                    <span>Parcial</span>
                    <span>Final</span>
                    <span>Promedio</span>
                    <span>Estado</span>
                  </div>
                  {cursosEstudiante.map(curso => (
                    <div key={curso.id} className="tabla-row">
                      <span>{curso.nombre}</span>
                      <span>16.5</span>
                      <span>17.8</span>
                      <span className="promedio">{curso.promedio.toFixed(1)}</span>
                      <span className={`estado-badge ${obtenerEstadoCursoClass(curso.estado)}`}>
                        {curso.estado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'asistencia' && (
              <div className="asistencia-content">
                <h3>Registro de Asistencia</h3>
                <div className="asistencia-resumen">
                  {cursosEstudiante.map(curso => (
                    <div key={curso.id} className="asistencia-card">
                      <h4>{curso.nombre}</h4>
                      <div className="asistencia-stats">
                        <div className="asistencia-porcentaje">
                          <span className="numero">{curso.asistencia}%</span>
                          <span className="label">Asistencia</span>
                        </div>
                        <div className="asistencia-bar">
                          <div 
                            className="asistencia-fill"
                            style={{ width: `${curso.asistencia}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modales en vista detalle */}
        {renderModal()}
      </div>
    );
  }

  // Vista lista de estudiantes
  return (
    <div className="gestion-estudiantes-usil">
      <div className="estudiantes-container">
        {/* Header */}
        <div className="estudiantes-header">
          <div className="header-content">
            <h1>Gestión de Estudiantes</h1>
            <p>Administra la información de todos los estudiantes</p>
          </div>
          <div className="header-acciones">
            <button className="btn-secundario" onClick={() => exportarDatos('excel')}>
              <FaFileExcel />
              Exportar Excel
            </button>
            <button className="btn-secundario" onClick={() => exportarDatos('pdf')}>
              <FaFilePdf />
              Exportar PDF
            </button>
            <button className="btn-crear-principal" onClick={crearEstudiante}>
              <FaUserPlus />
              Nuevo Estudiante
            </button>
          </div>
        </div>

        {/* Filtros y búsqueda */}
        <div className="filtros-container">
          <div className="busqueda">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, código, email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          
          <div className="filtros">
            <select
              value={filtroCarrera}
              onChange={(e) => setFiltroCarrera(e.target.value)}
            >
              <option value="todas">Todas las carreras</option>
              <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
              <option value="Ingeniería Civil">Ingeniería Civil</option>
              <option value="Administración">Administración</option>
              <option value="Contabilidad">Contabilidad</option>
              <option value="Derecho">Derecho</option>
            </select>

            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="todos">Todos los estados</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
              <option value="suspendido">Suspendidos</option>
              <option value="egresado">Egresados</option>
            </select>

            <select
              value={filtroCiclo}
              onChange={(e) => setFiltroCiclo(e.target.value)}
            >
              <option value="todos">Todos los ciclos</option>
              {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'].map(ciclo => (
                <option key={ciclo} value={ciclo}>{ciclo} Ciclo</option>
              ))}
            </select>

            <button className="btn-email" onClick={() => setModalActivo('enviar-email')}>
              <FaEnvelope />
              Enviar Email
            </button>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="stats-rapidas">
          <div className="stat-item">
            <div className="stat-icon">
              <FaGraduationCap />
            </div>
            <div>
              <span className="stat-numero">{estudiantes.length}</span>
              <span className="stat-label">Total Estudiantes</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon success">
              <FaCheckCircle />
            </div>
            <div>
              <span className="stat-numero">{estudiantes.filter(e => e.estado === 'activo').length}</span>
              <span className="stat-label">Activos</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon info">
              <FaChartBar />
            </div>
            <div>
              <span className="stat-numero">{(estudiantes.reduce((acc, e) => acc + e.promedio, 0) / estudiantes.length).toFixed(1)}</span>
              <span className="stat-label">Promedio General</span>
            </div>
          </div>
        </div>

        {/* Tabla de estudiantes */}
        <div className="estudiantes-tabla">
          <div className="tabla-header">
            <span>Estudiante</span>
            <span>Código</span>
            <span>Carrera</span>
            <span>Ciclo</span>
            <span>Promedio</span>
            <span>Estado</span>
            <span>Última Actividad</span>
            <span>Acciones</span>
          </div>
          
          {estudiantesFiltrados.map(estudiante => (
            <div key={estudiante.id} className="tabla-row">
              <div className="estudiante-info">
                <div className="avatar-small">
                  <FaGraduationCap />
                </div>
                <div>
                  <span className="nombre">{estudiante.nombres} {estudiante.apellidos}</span>
                  <small className="email">{estudiante.email}</small>
                </div>
              </div>
              <span className="codigo">{estudiante.codigo}</span>
              <span>{estudiante.carrera}</span>
              <span>{estudiante.ciclo}</span>
              <span className="promedio">{estudiante.promedio.toFixed(1)}</span>
              <span className={`estado-badge ${obtenerEstadoBadgeClass(estudiante.estado)}`}>
                {estudiante.estado}
              </span>
              <span className="ultima-actividad">{estudiante.ultimaActividad}</span>
              <div className="row-acciones">
                <button 
                  className="btn-accion"
                  onClick={() => verDetalleEstudiante(estudiante.id)}
                  title="Ver detalles"
                >
                  <FaEye />
                </button>
                <button 
                  className="btn-accion"
                  onClick={() => editarEstudiante(estudiante.id)}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                <button 
                  className="btn-accion danger"
                  onClick={() => eliminarEstudiante(estudiante.id)}
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {estudiantesFiltrados.length === 0 && (
          <div className="no-resultados">
            <p>No se encontraron estudiantes con los filtros aplicados</p>
          </div>
        )}
      </div>

      {/* Modales en vista lista */}
      {renderModal()}
    </div>
  );
}