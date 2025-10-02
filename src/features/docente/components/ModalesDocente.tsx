import { useState } from 'react';
import { FaTimes, FaUpload, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './ModalesDocente.css';

interface Props {
  modalActivo: 'crear' | 'editar' | 'material' | 'tarea' | 'anuncio' | null;
  onCerrar: () => void;
  onGuardar?: (datos: any) => void;
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

export const ModalesDocente = ({ modalActivo, onCerrar, onGuardar }: Props) => {
  // Estados para cada formulario
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

  // Función para cerrar modal y limpiar formularios
  const cerrarModal = () => {
    // Limpiar formularios
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
    
    onCerrar();
  };

  // Funciones para guardar cada tipo
  const guardarCurso = () => {
    if (!formularioCurso.nombre || !formularioCurso.codigo) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    
    console.log('Guardando curso:', formularioCurso);
    onGuardar?.(formularioCurso);
    cerrarModal();
  };

  const guardarMaterial = () => {
    if (!formularioMaterial.titulo) {
      alert('Por favor ingresa un título para el material');
      return;
    }

    console.log('Guardando material:', formularioMaterial);
    onGuardar?.(formularioMaterial);
    cerrarModal();
  };

  const guardarTarea = () => {
    if (!formularioTarea.titulo || !formularioTarea.fechaLimite) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    console.log('Guardando tarea:', formularioTarea);
    onGuardar?.(formularioTarea);
    cerrarModal();
  };

  const guardarAnuncio = () => {
    if (!formularioAnuncio.titulo || !formularioAnuncio.contenido) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    console.log('Guardando anuncio:', formularioAnuncio);
    onGuardar?.(formularioAnuncio);
    cerrarModal();
  };

  const manejarArchivoMaterial = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setFormularioMaterial({
        ...formularioMaterial,
        archivo: archivo
      });
    }
  };

  if (!modalActivo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        
        {/* Modal Crear/Editar Curso */}
        {(modalActivo === 'crear' || modalActivo === 'editar') && (
          <>
            <div className="modal-header">
              <h2>{modalActivo === 'crear' ? 'Crear Nuevo Curso' : 'Editar Curso'}</h2>
              <button className="btn-cerrar" onClick={cerrarModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nombre del Curso *</label>
                <input
                  type="text"
                  value={formularioCurso.nombre}
                  onChange={(e) => setFormularioCurso({...formularioCurso, nombre: e.target.value})}
                  placeholder="Ej: Programación Orientada a Objetos"
                />
              </div>

              <div className="form-group">
                <label>Código del Curso *</label>
                <input
                  type="text"
                  value={formularioCurso.codigo}
                  onChange={(e) => setFormularioCurso({...formularioCurso, codigo: e.target.value})}
                  placeholder="Ej: IS-301"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formularioCurso.descripcion}
                  onChange={(e) => setFormularioCurso({...formularioCurso, descripcion: e.target.value})}
                  placeholder="Describe brevemente el curso..."
                  rows={3}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Créditos</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formularioCurso.creditos}
                    onChange={(e) => setFormularioCurso({...formularioCurso, creditos: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>Ciclo Académico</label>
                  <select
                    value={formularioCurso.ciclo}
                    onChange={(e) => setFormularioCurso({...formularioCurso, ciclo: e.target.value})}
                  >
                    <option value="2025-1">2025-1</option>
                    <option value="2025-2">2025-2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarCurso}>
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
              <div className="form-group">
                <label>Título del Material *</label>
                <input
                  type="text"
                  value={formularioMaterial.titulo}
                  onChange={(e) => setFormularioMaterial({...formularioMaterial, titulo: e.target.value})}
                  placeholder="Ej: Slides Introducción a POO"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Material</label>
                <select
                  value={formularioMaterial.tipo}
                  onChange={(e) => setFormularioMaterial({...formularioMaterial, tipo: e.target.value as any})}
                >
                  <option value="documento">📄 Documento</option>
                  <option value="presentacion">📊 Presentación</option>
                  <option value="video">🎥 Video</option>
                  <option value="enlace">🔗 Enlace Web</option>
                </select>
              </div>

              {formularioMaterial.tipo === 'enlace' ? (
                <div className="form-group">
                  <label>URL del Enlace</label>
                  <input
                    type="url"
                    value={formularioMaterial.url || ''}
                    onChange={(e) => setFormularioMaterial({...formularioMaterial, url: e.target.value})}
                    placeholder="https://..."
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label>Archivo</label>
                  <div className="upload-area">
                    <input
                      type="file"
                      onChange={manejarArchivoMaterial}
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi"
                    />
                    <div className="upload-info">
                      <FaUpload />
                      <span>Click para seleccionar archivo</span>
                      <small>PDF, DOC, PPT, MP4 - Máx. 50MB</small>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formularioMaterial.descripcion}
                  onChange={(e) => setFormularioMaterial({...formularioMaterial, descripcion: e.target.value})}
                  placeholder="Descripción opcional del material..."
                  rows={2}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarMaterial}>
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
              <div className="form-group">
                <label>Título de la Tarea *</label>
                <input
                  type="text"
                  value={formularioTarea.titulo}
                  onChange={(e) => setFormularioTarea({...formularioTarea, titulo: e.target.value})}
                  placeholder="Ej: Ejercicios de Herencia"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Evaluación</label>
                <select
                  value={formularioTarea.tipo}
                  onChange={(e) => setFormularioTarea({...formularioTarea, tipo: e.target.value as any})}
                >
                  <option value="tarea">📝 Tarea</option>
                  <option value="examen">📋 Examen</option>
                  <option value="proyecto">🎯 Proyecto</option>
                </select>
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formularioTarea.descripcion}
                  onChange={(e) => setFormularioTarea({...formularioTarea, descripcion: e.target.value})}
                  placeholder="Descripción breve de la tarea..."
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label>Instrucciones Detalladas</label>
                <textarea
                  value={formularioTarea.instrucciones}
                  onChange={(e) => setFormularioTarea({...formularioTarea, instrucciones: e.target.value})}
                  placeholder="Instrucciones paso a paso para completar la tarea..."
                  rows={4}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Límite *</label>
                  <div className="date-input">
                    <FaCalendarAlt />
                    <input
                      type="date"
                      value={formularioTarea.fechaLimite}
                      onChange={(e) => setFormularioTarea({...formularioTarea, fechaLimite: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Hora Límite</label>
                  <div className="time-input">
                    <FaClock />
                    <input
                      type="time"
                      value={formularioTarea.horaLimite}
                      onChange={(e) => setFormularioTarea({...formularioTarea, horaLimite: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Puntuación Total</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formularioTarea.puntuacion}
                    onChange={(e) => setFormularioTarea({...formularioTarea, puntuacion: parseInt(e.target.value)})}
                  />
                </div>

                <div className="form-group">
                  <label>Intentos Permitidos</label>
                  <select
                    value={formularioTarea.intentos}
                    onChange={(e) => setFormularioTarea({...formularioTarea, intentos: parseInt(e.target.value)})}
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
                Crear Tarea
              </button>
            </div>
          </>
        )}

        {/* Modal Crear Anuncio */}
        {modalActivo === 'anuncio' && (
          <>
            <div className="modal-header">
              <h2>Crear Nuevo Anuncio</h2>
              <button className="btn-cerrar" onClick={cerrarModal}>
                <FaTimes />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Título del Anuncio *</label>
                <input
                  type="text"
                  value={formularioAnuncio.titulo}
                  onChange={(e) => setFormularioAnuncio({...formularioAnuncio, titulo: e.target.value})}
                  placeholder="Ej: Examen Parcial - Fecha Confirmada"
                />
              </div>

              <div className="form-group">
                <label>Contenido del Anuncio *</label>
                <textarea
                  value={formularioAnuncio.contenido}
                  onChange={(e) => setFormularioAnuncio({...formularioAnuncio, contenido: e.target.value})}
                  placeholder="Escribe tu anuncio aquí..."
                  rows={5}
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formularioAnuncio.fijado}
                    onChange={(e) => setFormularioAnuncio({...formularioAnuncio, fijado: e.target.checked})}
                  />
                  📌 Fijar anuncio (aparecerá destacado)
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formularioAnuncio.notificarEmail}
                    onChange={(e) => setFormularioAnuncio({...formularioAnuncio, notificarEmail: e.target.checked})}
                  />
                  📧 Notificar por email a estudiantes
                </label>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={cerrarModal}>
                Cancelar
              </button>
              <button className="btn-guardar" onClick={guardarAnuncio}>
                Publicar Anuncio
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
};