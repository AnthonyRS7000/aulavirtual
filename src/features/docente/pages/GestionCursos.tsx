import { FaPlus, FaEye, FaEdit, FaTrash, FaUsers, FaTasks, FaFileAlt, FaBell, FaCalendarAlt, FaChartBar, FaDownload, FaCopy, FaShare, FaCog, FaUpload, FaVideo, FaLink, FaClipboard, FaTimes, FaSave } from 'react-icons/fa';
import { useState } from 'react';
import '../css/GestionCursos.css';

interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  ciclo: string;
  creditos: number;
  estudiantes: number;
  estado: 'activo' | 'inactivo' | 'archivado';
  fechaCreacion: string;
  ultimaActividad: string;
  codigoAcceso: string;
}

interface Material {
  id: number;
  titulo: string;
  tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
  fechaSubida: string;
  descargas: number;
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  puntuacion: number;
  entregas: number;
  totalEstudiantes: number;
  estado: 'publicada' | 'borrador' | 'cerrada';
}

interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fijado: boolean;
}

interface FormularioCurso {
  nombre: string;
  codigo: string;
  descripcion: string;
  creditos: number;
  ciclo: string;
}

interface FormularioMaterial {
  titulo: string;
  tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
  archivo?: File;
  url?: string;
  descripcion: string;
}

interface FormularioTarea {
  titulo: string;
  descripcion: string;
  instrucciones: string;
  fechaLimite: string;
  horaLimite: string;
  puntuacion: number;
  intentos: number;
  tipo: 'tarea' | 'examen' | 'proyecto';
}

interface FormularioAnuncio {
  titulo: string;
  contenido: string;
  fijado: boolean;
  notificarEmail: boolean;
}

export default function GestionCursos() {
  const [vistaActual, setVistaActual] = useState<'lista' | 'detalle'>('lista');
  const [cursoSeleccionado, setCursoSeleccionado] = useState<number | null>(null);
  const [modalActivo, setModalActivo] = useState<'crear' | 'editar' | 'material' | 'tarea' | 'anuncio' | null>(null);
  const [pestañaActiva, setPestañaActiva] = useState<'general' | 'materiales' | 'tareas' | 'anuncios' | 'estudiantes' | 'calificaciones'>('general');

  // Estados para formularios
  const [formularioCurso, setFormularioCurso] = useState<FormularioCurso>({
    nombre: '',
    codigo: '',
    descripcion: '',
    creditos: 3,
    ciclo: '2025-2'
  });

  const [formularioMaterial, setFormularioMaterial] = useState<FormularioMaterial>({
    titulo: '',
    tipo: 'documento',
    descripcion: ''
  });

  const [formularioTarea, setFormularioTarea] = useState<FormularioTarea>({
    titulo: '',
    descripcion: '',
    instrucciones: '',
    fechaLimite: '',
    horaLimite: '23:59',
    puntuacion: 20,
    intentos: 1,
    tipo: 'tarea'
  });

  const [formularioAnuncio, setFormularioAnuncio] = useState<FormularioAnuncio>({
    titulo: '',
    contenido: '',
    fijado: false,
    notificarEmail: true
  });

  // Datos simulados
  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Programación Orientada a Objetos",
      descripcion: "Curso enfocado en los principios de la programación orientada a objetos utilizando Java",
      ciclo: "2025-2",
      creditos: 4,
      estudiantes: 28,
      estado: 'activo',
      fechaCreacion: "2025-01-15",
      ultimaActividad: "Hace 2 horas",
      codigoAcceso: "POO2025"
    },
    {
      id: 2,
      codigo: "IS-302",
      nombre: "Base de Datos I",
      descripcion: "Fundamentos de bases de datos relacionales y SQL",
      ciclo: "2025-2",
      creditos: 3,
      estudiantes: 25,
      estado: 'activo',
      fechaCreacion: "2025-01-15",
      ultimaActividad: "Hace 1 día",
      codigoAcceso: "BD2025"
    }
  ]);

  const materiales: Material[] = [
    {
      id: 1,
      titulo: "Introducción a POO - Slides",
      tipo: 'presentacion',
      fechaSubida: "2025-01-20",
      descargas: 24
    },
    {
      id: 2,
      titulo: "Tutorial Java Básico",
      tipo: 'video',
      fechaSubida: "2025-01-18",
      descargas: 18
    }
  ];

  const tareas: Tarea[] = [
    {
      id: 1,
      titulo: "Ejercicios de Herencia",
      descripcion: "Implementar clases con herencia en Java",
      fechaLimite: "2025-01-25",
      puntuacion: 20,
      entregas: 15,
      totalEstudiantes: 28,
      estado: 'publicada'
    }
  ];

  const anuncios: Anuncio[] = [
    {
      id: 1,
      titulo: "Examen Parcial - Fecha Confirmada",
      contenido: "El examen parcial se realizará el 15 de febrero. Revisar los temas del syllabus.",
      fecha: "2025-01-22",
      fijado: true
    }
  ];

  const obtenerIconoMaterial = (tipo: string) => {
    switch (tipo) {
      case 'documento': return <FaFileAlt />;
      case 'video': return <FaVideo />;
      case 'enlace': return <FaLink />;
      case 'presentacion': return <FaClipboard />;
      default: return <FaFileAlt />;
    }
  };

  const crearCurso = () => {
    setModalActivo('crear');
  };

  const editarCurso = (id: number) => {
    setCursoSeleccionado(id);
    setModalActivo('editar');
  };

  const verDetalleCurso = (id: number) => {
    setCursoSeleccionado(id);
    setVistaActual('detalle');
    setPestañaActiva('general');
  };

  const eliminarCurso = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      setCursos(cursos.filter(curso => curso.id !== id));
    }
  };

  const cerrarModal = () => {
    setModalActivo(null);
    // Reset formularios
    setFormularioCurso({
      nombre: '',
      codigo: '',
      descripcion: '',
      creditos: 3,
      ciclo: '2025-2'
    });
    setFormularioMaterial({
      titulo: '',
      tipo: 'documento',
      descripcion: ''
    });
    setFormularioTarea({
      titulo: '',
      descripcion: '',
      instrucciones: '',
      fechaLimite: '',
      horaLimite: '23:59',
      puntuacion: 20,
      intentos: 1,
      tipo: 'tarea'
    });
    setFormularioAnuncio({
      titulo: '',
      contenido: '',
      fijado: false,
      notificarEmail: true
    });
  };

  const guardarCurso = () => {
    if (!formularioCurso.nombre || !formularioCurso.codigo) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    const nuevoCurso: Curso = {
      id: Date.now(),
      ...formularioCurso,
      estudiantes: 0,
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      ultimaActividad: 'Recién creado',
      codigoAcceso: formularioCurso.codigo.toUpperCase() + '2025'
    };

    setCursos([...cursos, nuevoCurso]);
    cerrarModal();
  };

  const guardarMaterial = () => {
    if (!formularioMaterial.titulo) {
      alert('Por favor ingresa un título para el material');
      return;
    }

    console.log('Material guardado:', formularioMaterial);
    cerrarModal();
  };

  const guardarTarea = () => {
    if (!formularioTarea.titulo || !formularioTarea.fechaLimite) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    console.log('Tarea guardada:', formularioTarea);
    cerrarModal();
  };

  const guardarAnuncio = () => {
    if (!formularioAnuncio.titulo || !formularioAnuncio.contenido) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    console.log('Anuncio guardado:', formularioAnuncio);
    cerrarModal();
  };

  // Componente Modal
  const renderModal = () => {
    if (!modalActivo) return null;

    return (
      <div className="modal-overlay" onClick={cerrarModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          
          {/* Modal Crear/Editar Curso */}
          {(modalActivo === 'crear' || modalActivo === 'editar') && (
            <>
              <div className="modal-header">
                <h2>
                  {modalActivo === 'crear' ? 'Crear Nuevo Curso' : 'Editar Curso'}
                </h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombre del Curso *</label>
                    <input
                      type="text"
                      value={formularioCurso.nombre}
                      onChange={(e) => setFormularioCurso({
                        ...formularioCurso,
                        nombre: e.target.value
                      })}
                      placeholder="Ej: Programación Orientada a Objetos"
                    />
                  </div>

                  <div className="form-group">
                    <label>Código del Curso *</label>
                    <input
                      type="text"
                      value={formularioCurso.codigo}
                      onChange={(e) => setFormularioCurso({
                        ...formularioCurso,
                        codigo: e.target.value.toUpperCase()
                      })}
                      placeholder="Ej: IS-301"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Descripción</label>
                    <textarea
                      value={formularioCurso.descripcion}
                      onChange={(e) => setFormularioCurso({
                        ...formularioCurso,
                        descripcion: e.target.value
                      })}
                      placeholder="Describe el contenido y objetivos del curso"
                      rows={4}
                    />
                  </div>

                  <div className="form-group">
                    <label>Créditos</label>
                    <select
                      value={formularioCurso.creditos}
                      onChange={(e) => setFormularioCurso({
                        ...formularioCurso,
                        creditos: parseInt(e.target.value)
                      })}
                    >
                      <option value={1}>1 crédito</option>
                      <option value={2}>2 créditos</option>
                      <option value={3}>3 créditos</option>
                      <option value={4}>4 créditos</option>
                      <option value={5}>5 créditos</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Ciclo Académico</label>
                    <select
                      value={formularioCurso.ciclo}
                      onChange={(e) => setFormularioCurso({
                        ...formularioCurso,
                        ciclo: e.target.value
                      })}
                    >
                      <option value="2025-1">2025-1</option>
                      <option value="2025-2">2025-2</option>
                      <option value="2025-3">2025-3</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={guardarCurso}>
                  <FaSave />
                  {modalActivo === 'crear' ? 'Crear Curso' : 'Guardar Cambios'}
                </button>
              </div>
            </>
          )}

          {/* Modal Subir Material */}
          {modalActivo === 'material' && (
            <>
              <div className="modal-header">
                <h2>Subir Material</h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Título del Material *</label>
                    <input
                      type="text"
                      value={formularioMaterial.titulo}
                      onChange={(e) => setFormularioMaterial({
                        ...formularioMaterial,
                        titulo: e.target.value
                      })}
                      placeholder="Ej: Introducción a POO - Clase 1"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Tipo de Material</label>
                    <div className="tipo-material-grid">
                      {[
                        { value: 'documento', label: 'Documento', icon: FaFileAlt },
                        { value: 'video', label: 'Video', icon: FaVideo },
                        { value: 'enlace', label: 'Enlace Web', icon: FaLink },
                        { value: 'presentacion', label: 'Presentación', icon: FaClipboard }
                      ].map(tipo => (
                        <div
                          key={tipo.value}
                          className={`tipo-option ${formularioMaterial.tipo === tipo.value ? 'selected' : ''}`}
                          onClick={() => setFormularioMaterial({
                            ...formularioMaterial,
                            tipo: tipo.value as any
                          })}
                        >
                          <tipo.icon />
                          <span>{tipo.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {formularioMaterial.tipo === 'enlace' ? (
                    <div className="form-group full-width">
                      <label>URL del Enlace</label>
                      <input
                        type="url"
                        value={formularioMaterial.url || ''}
                        onChange={(e) => setFormularioMaterial({
                          ...formularioMaterial,
                          url: e.target.value
                        })}
                        placeholder="https://ejemplo.com"
                      />
                    </div>
                  ) : (
                    <div className="form-group full-width">
                      <label>Subir Archivo</label>
                      <div className="upload-area">
                        <FaUpload />
                        <p>Arrastra tu archivo aquí o haz clic para seleccionar</p>
                        <input
                          type="file"
                          onChange={(e) => setFormularioMaterial({
                            ...formularioMaterial,
                            archivo: e.target.files?.[0]
                          })}
                          accept={
                            formularioMaterial.tipo === 'documento' ? '.pdf,.doc,.docx' :
                            formularioMaterial.tipo === 'video' ? '.mp4,.avi,.mov' :
                            '.ppt,.pptx,.pdf'
                          }
                        />
                      </div>
                    </div>
                  )}

                  <div className="form-group full-width">
                    <label>Descripción (Opcional)</label>
                    <textarea
                      value={formularioMaterial.descripcion}
                      onChange={(e) => setFormularioMaterial({
                        ...formularioMaterial,
                        descripcion: e.target.value
                      })}
                      placeholder="Breve descripción del material"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={guardarMaterial}>
                  <FaUpload />
                  Subir Material
                </button>
              </div>
            </>
          )}

          {/* Modal Crear Tarea */}
          {modalActivo === 'tarea' && (
            <>
              <div className="modal-header">
                <h2>Crear Nueva Tarea</h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Título de la Tarea *</label>
                    <input
                      type="text"
                      value={formularioTarea.titulo}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        titulo: e.target.value
                      })}
                      placeholder="Ej: Ejercicios de Herencia en Java"
                    />
                  </div>

                  <div className="form-group">
                    <label>Tipo de Evaluación</label>
                    <select
                      value={formularioTarea.tipo}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        tipo: e.target.value as any
                      })}
                    >
                      <option value="tarea">Tarea</option>
                      <option value="examen">Examen</option>
                      <option value="proyecto">Proyecto</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Puntuación</label>
                    <input
                      type="number"
                      value={formularioTarea.puntuacion}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        puntuacion: parseInt(e.target.value)
                      })}
                      min="1"
                      max="20"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Descripción *</label>
                    <textarea
                      value={formularioTarea.descripcion}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        descripcion: e.target.value
                      })}
                      placeholder="Descripción breve de la tarea"
                      rows={3}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Instrucciones Detalladas</label>
                    <textarea
                      value={formularioTarea.instrucciones}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        instrucciones: e.target.value
                      })}
                      placeholder="Instrucciones paso a paso para completar la tarea"
                      rows={5}
                    />
                  </div>

                  <div className="form-group">
                    <label>Fecha Límite *</label>
                    <input
                      type="date"
                      value={formularioTarea.fechaLimite}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        fechaLimite: e.target.value
                      })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Hora Límite</label>
                    <input
                      type="time"
                      value={formularioTarea.horaLimite}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        horaLimite: e.target.value
                      })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Intentos Permitidos</label>
                    <select
                      value={formularioTarea.intentos}
                      onChange={(e) => setFormularioTarea({
                        ...formularioTarea,
                        intentos: parseInt(e.target.value)
                      })}
                    >
                      <option value={1}>1 intento</option>
                      <option value={2}>2 intentos</option>
                      <option value={3}>3 intentos</option>
                      <option value={-1}>Intentos ilimitados</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={guardarTarea}>
                  <FaTasks />
                  Crear Tarea
                </button>
              </div>
            </>
          )}

          {/* Modal Crear Anuncio */}
          {modalActivo === 'anuncio' && (
            <>
              <div className="modal-header">
                <h2>Crear Anuncio</h2>
                <button className="btn-cerrar" onClick={cerrarModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Título del Anuncio *</label>
                    <input
                      type="text"
                      value={formularioAnuncio.titulo}
                      onChange={(e) => setFormularioAnuncio({
                        ...formularioAnuncio,
                        titulo: e.target.value
                      })}
                      placeholder="Ej: Cambio de horario para el examen parcial"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Contenido del Anuncio *</label>
                    <textarea
                      value={formularioAnuncio.contenido}
                      onChange={(e) => setFormularioAnuncio({
                        ...formularioAnuncio,
                        contenido: e.target.value
                      })}
                      placeholder="Escribe el contenido completo del anuncio"
                      rows={6}
                    />
                  </div>

                  <div className="form-group full-width">
                    <div className="checkbox-group">
                      <label className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formularioAnuncio.fijado}
                          onChange={(e) => setFormularioAnuncio({
                            ...formularioAnuncio,
                            fijado: e.target.checked
                          })}
                        />
                        <span>📌 Fijar anuncio al inicio</span>
                      </label>

                      <label className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={formularioAnuncio.notificarEmail}
                          onChange={(e) => setFormularioAnuncio({
                            ...formularioAnuncio,
                            notificarEmail: e.target.checked
                          })}
                        />
                        <span>📧 Notificar por email a estudiantes</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button className="btn-guardar" onClick={guardarAnuncio}>
                  <FaBell />
                  Publicar Anuncio
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  // Vista detalle del curso
  if (vistaActual === 'detalle' && cursoSeleccionado) {
    const curso = cursos.find(c => c.id === cursoSeleccionado)!;
    
    return (
      <div className="gestion-cursos-usil">
        <div className="curso-detalle">
          {/* Header del curso */}
          <div className="curso-header">
            <div className="curso-info">
              <button 
                className="btn-volver"
                onClick={() => setVistaActual('lista')}
              >
                ← Volver a Mis Cursos
              </button>
              <h1>{curso.nombre}</h1>
              <div className="curso-meta">
                <span className="codigo">{curso.codigo}</span>
                <span className="creditos">{curso.creditos} créditos</span>
                <span className="estudiantes">{curso.estudiantes} estudiantes</span>
              </div>
            </div>
            <div className="curso-acciones">
              <button className="btn-accion" title="Configuración">
                <FaCog />
              </button>
              <button className="btn-accion" title="Compartir">
                <FaShare />
              </button>
              <div className="codigo-acceso">
                <span>Código: <strong>{curso.codigoAcceso}</strong></span>
                <button className="btn-copiar" title="Copiar código">
                  <FaCopy />
                </button>
              </div>
            </div>
          </div>

          {/* Navegación por pestañas */}
          <div className="pestañas-nav">
            {[
              { key: 'general', label: 'General', icon: FaEye },
              { key: 'materiales', label: 'Materiales', icon: FaFileAlt },
              { key: 'tareas', label: 'Tareas', icon: FaTasks },
              { key: 'anuncios', label: 'Anuncios', icon: FaBell },
              { key: 'estudiantes', label: 'Estudiantes', icon: FaUsers },
              { key: 'calificaciones', label: 'Calificaciones', icon: FaChartBar }
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
                <div className="stats-rapidas">
                  <div className="stat-item">
                    <FaUsers className="stat-icon" />
                    <div>
                      <span className="stat-numero">{curso.estudiantes}</span>
                      <span className="stat-label">Estudiantes</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaTasks className="stat-icon" />
                    <div>
                      <span className="stat-numero">{tareas.length}</span>
                      <span className="stat-label">Tareas</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <FaFileAlt className="stat-icon" />
                    <div>
                      <span className="stat-numero">{materiales.length}</span>
                      <span className="stat-label">Materiales</span>
                    </div>
                  </div>
                </div>
                
                <div className="descripcion-curso">
                  <h3>Descripción del Curso</h3>
                  <p>{curso.descripcion}</p>
                </div>

                <div className="actividad-reciente">
                  <h3>Actividad Reciente</h3>
                  <div className="actividad-lista">
                    <div className="actividad-item">
                      <div className="actividad-icon">📝</div>
                      <div className="actividad-info">
                        <span>Nueva tarea publicada: "Ejercicios de Herencia"</span>
                        <small>Hace 2 horas</small>
                      </div>
                    </div>
                    <div className="actividad-item">
                      <div className="actividad-icon">📁</div>
                      <div className="actividad-info">
                        <span>Material subido: "Tutorial Java Básico"</span>
                        <small>Hace 1 día</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pestañaActiva === 'materiales' && (
              <div className="materiales-content">
                <div className="content-header">
                  <h3>Materiales del Curso</h3>
                  <button 
                    className="btn-crear"
                    onClick={() => setModalActivo('material')}
                  >
                    <FaPlus />
                    Subir Material
                  </button>
                </div>
                
                <div className="materiales-grid">
                  {materiales.map(material => (
                    <div key={material.id} className="material-card">
                      <div className="material-icon">
                        {obtenerIconoMaterial(material.tipo)}
                      </div>
                      <div className="material-info">
                        <h4>{material.titulo}</h4>
                        <div className="material-meta">
                          <span>Subido: {material.fechaSubida}</span>
                          <span>{material.descargas} descargas</span>
                        </div>
                      </div>
                      <div className="material-acciones">
                        <button className="btn-accion" title="Ver">
                          <FaEye />
                        </button>
                        <button className="btn-accion" title="Descargar">
                          <FaDownload />
                        </button>
                        <button className="btn-accion" title="Eliminar">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'tareas' && (
              <div className="tareas-content">
                <div className="content-header">
                  <h3>Tareas y Evaluaciones</h3>
                  <button 
                    className="btn-crear"
                    onClick={() => setModalActivo('tarea')}
                  >
                    <FaPlus />
                    Crear Tarea
                  </button>
                </div>
                
                <div className="tareas-lista">
                  {tareas.map(tarea => (
                    <div key={tarea.id} className="tarea-card">
                      <div className="tarea-info">
                        <h4>{tarea.titulo}</h4>
                        <p>{tarea.descripcion}</p>
                        <div className="tarea-meta">
                          <span>Vence: {tarea.fechaLimite}</span>
                          <span>Puntos: {tarea.puntuacion}</span>
                          <span className={`estado-badge ${tarea.estado}`}>
                            {tarea.estado}
                          </span>
                        </div>
                      </div>
                      <div className="tarea-progreso">
                        <div className="progreso-info">
                          <span>{tarea.entregas}/{tarea.totalEstudiantes}</span>
                          <small>entregas</small>
                        </div>
                        <div className="progreso-bar">
                          <div 
                            className="progreso-fill"
                            style={{ width: `${(tarea.entregas / tarea.totalEstudiantes) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="tarea-acciones">
                        <button className="btn-accion">
                          <FaEye />
                        </button>
                        <button className="btn-accion">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'anuncios' && (
              <div className="anuncios-content">
                <div className="content-header">
                  <h3>Anuncios</h3>
                  <button 
                    className="btn-crear"
                    onClick={() => setModalActivo('anuncio')}
                  >
                    <FaPlus />
                    Crear Anuncio
                  </button>
                </div>
                
                <div className="anuncios-lista">
                  {anuncios.map(anuncio => (
                    <div key={anuncio.id} className={`anuncio-card ${anuncio.fijado ? 'fijado' : ''}`}>
                      <div className="anuncio-header">
                        <h4>{anuncio.titulo}</h4>
                        <div className="anuncio-meta">
                          <span>{anuncio.fecha}</span>
                          {anuncio.fijado && <span className="fijado-badge">📌 Fijado</span>}
                        </div>
                      </div>
                      <p>{anuncio.contenido}</p>
                      <div className="anuncio-acciones">
                        <button className="btn-accion">
                          <FaEdit />
                        </button>
                        <button className="btn-accion">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'estudiantes' && (
              <div className="estudiantes-content">
                <div className="content-header">
                  <h3>Estudiantes Matriculados</h3>
                  <div className="estudiantes-acciones">
                    <button className="btn-crear">
                      <FaPlus />
                      Invitar Estudiantes
                    </button>
                    <button className="btn-accion">
                      <FaDownload />
                      Exportar Lista
                    </button>
                  </div>
                </div>
                
                <div className="estudiantes-tabla">
                  <div className="tabla-header">
                    <span>Estudiante</span>
                    <span>Código</span>
                    <span>Última Actividad</span>
                    <span>Promedio</span>
                    <span>Acciones</span>
                  </div>
                  {/* Lista de estudiantes simulada */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="tabla-row">
                      <span>Estudiante {i + 1}</span>
                      <span>202121035{i}</span>
                      <span>Hace {i + 1} días</span>
                      <span>{(15 + Math.random() * 3).toFixed(1)}</span>
                      <div className="row-acciones">
                        <button className="btn-accion">
                          <FaEye />
                        </button>
                        <button className="btn-accion">
                          <FaEdit />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pestañaActiva === 'calificaciones' && (
              <div className="calificaciones-content">
                <div className="content-header">
                  <h3>Libro de Calificaciones</h3>
                  <div className="calificaciones-acciones">
                    <button className="btn-crear">
                      <FaDownload />
                      Exportar Calificaciones
                    </button>
                    <button className="btn-accion">
                      <FaChartBar />
                      Estadísticas
                    </button>
                  </div>
                </div>
                
                <div className="calificaciones-resumen">
                  <div className="resumen-stat">
                    <span className="stat-numero">16.2</span>
                    <span className="stat-label">Promedio General</span>
                  </div>
                  <div className="resumen-stat">
                    <span className="stat-numero">85%</span>
                    <span className="stat-label">Aprobados</span>
                  </div>
                  <div className="resumen-stat">
                    <span className="stat-numero">3</span>
                    <span className="stat-label">Evaluaciones</span>
                  </div>
                </div>

                <div className="calificaciones-tabla">
                  <div className="tabla-header">
                    <span>Estudiante</span>
                    <span>Tarea 1</span>
                    <span>Tarea 2</span>
                    <span>Examen</span>
                    <span>Promedio</span>
                  </div>
                  {/* Tabla de calificaciones simulada */}
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="tabla-row">
                      <span>Estudiante {i + 1}</span>
                      <span>{(15 + Math.random() * 4).toFixed(1)}</span>
                      <span>{(14 + Math.random() * 5).toFixed(1)}</span>
                      <span>{(16 + Math.random() * 3).toFixed(1)}</span>
                      <span className="promedio">{(15 + Math.random() * 3).toFixed(1)}</span>
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

  // Vista lista de cursos
  return (
    <div className="gestion-cursos-usil">
      <div className="cursos-container">
        {/* Header */}
        <div className="cursos-header">
          <div className="header-content">
            <h1>Gestión de Cursos</h1>
            <p>Administra todos tus cursos desde un solo lugar</p>
          </div>
          <button className="btn-crear-principal" onClick={crearCurso}>
            <FaPlus />
            Crear Nuevo Curso
          </button>
        </div>

        {/* Lista de cursos */}
        <div className="cursos-grid">
          {cursos.map(curso => (
            <div key={curso.id} className="curso-card">
              <div className="curso-header-card">
                <div className="curso-titulo">
                  <h3>{curso.nombre}</h3>
                  <span className="curso-codigo">{curso.codigo}</span>
                </div>
                <div className="curso-estado">
                  <span className={`estado-badge ${curso.estado}`}>
                    {curso.estado}
                  </span>
                </div>
              </div>
              
              <div className="curso-descripcion">
                <p>{curso.descripcion}</p>
              </div>
              
              <div className="curso-stats">
                <div className="stat">
                  <FaUsers className="stat-icon" />
                  <span>{curso.estudiantes} estudiantes</span>
                </div>
                <div className="stat">
                  <FaCalendarAlt className="stat-icon" />
                  <span>Ciclo {curso.ciclo}</span>
                </div>
                <div className="stat">
                  <FaChartBar className="stat-icon" />
                  <span>{curso.creditos} créditos</span>
                </div>
              </div>
              
              <div className="curso-footer">
                <div className="ultima-actividad">
                  <small>Última actividad: {curso.ultimaActividad}</small>
                </div>
                <div className="curso-acciones">
                  <button 
                    className="btn-accion"
                    onClick={() => verDetalleCurso(curso.id)}
                    title="Ver curso"
                  >
                    <FaEye />
                  </button>
                  <button 
                    className="btn-accion"
                    onClick={() => editarCurso(curso.id)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-accion danger"
                    onClick={() => eliminarCurso(curso.id)}
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Card para crear nuevo curso */}
          <div className="curso-card crear-card" onClick={crearCurso}>
            <div className="crear-content">
              <FaPlus className="crear-icon" />
              <h3>Crear Nuevo Curso</h3>
              <p>Configura un nuevo curso para tus estudiantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modales en vista lista */}
      {renderModal()}
    </div>
  );
}