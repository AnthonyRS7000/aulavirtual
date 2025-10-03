import { useState } from 'react';
import { 
  FaTimes, 
  FaUpload, 
  FaVideo, 
  FaLink, 
  FaFileAlt, 
  FaCalendarAlt, 
  FaClock,
  FaTrash,
  FaDownload
} from 'react-icons/fa';
import './ModalesDocente.css';

interface Props {
  modalActivo: 'crear' | 'editar' | 'material' | 'tarea' | 'anuncio' | null;
  onCerrar: () => void;
  onGuardar: (datos: any) => void;
}

interface FormularioCurso {
  codigo: string;
  nombre: string;
  descripcion: string;
  ciclo: string;
  creditos: number;
}

interface FormularioMaterial {
  titulo: string;
  tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
  archivo?: File;
  enlace?: string;
}

interface FormularioTarea {
  titulo: string;
  descripcion: string;
  instrucciones: string;
  fechaLimite: string;
  horaLimite: string;
  puntuacion: number;
  permitirEntregaTardia: boolean;
  archivosAdjuntos: File[];
  enlaces: string[];
  tipoEvaluacion: 'tarea' | 'examen' | 'proyecto';
}

interface FormularioAnuncio {
  titulo: string;
  contenido: string;
  fijado: boolean;
  archivosAdjuntos: File[];
}

export const ModalesDocente = ({ modalActivo, onCerrar, onGuardar }: Props) => {
  // Estados para cada formulario
  const [formCurso, setFormCurso] = useState<FormularioCurso>({
    codigo: '',
    nombre: '',
    descripcion: '',
    ciclo: '2025-2',
    creditos: 3
  });

  const [formMaterial, setFormMaterial] = useState<FormularioMaterial>({
    titulo: '',
    tipo: 'documento'
  });

  const [formTarea, setFormTarea] = useState<FormularioTarea>({
    titulo: '',
    descripcion: '',
    instrucciones: '',
    fechaLimite: '',
    horaLimite: '23:59',
    puntuacion: 100,
    permitirEntregaTardia: false,
    archivosAdjuntos: [],
    enlaces: [],
    tipoEvaluacion: 'tarea'
  });

  const [formAnuncio, setFormAnuncio] = useState<FormularioAnuncio>({
    titulo: '',
    contenido: '',
    fijado: false,
    archivosAdjuntos: []
  });

  // Estado para manejar enlaces dinámicos
  const [nuevoEnlace, setNuevoEnlace] = useState('');

  const resetearFormularios = () => {
    setFormCurso({
      codigo: '',
      nombre: '',
      descripcion: '',
      ciclo: '2025-2',
      creditos: 3
    });
    setFormMaterial({
      titulo: '',
      tipo: 'documento'
    });
    setFormTarea({
      titulo: '',
      descripcion: '',
      instrucciones: '',
      fechaLimite: '',
      horaLimite: '23:59',
      puntuacion: 100,
      permitirEntregaTardia: false,
      archivosAdjuntos: [],
      enlaces: [],
      tipoEvaluacion: 'tarea'
    });
    setFormAnuncio({
      titulo: '',
      contenido: '',
      fijado: false,
      archivosAdjuntos: []
    });
    setNuevoEnlace('');
  };

  const handleCerrar = () => {
    resetearFormularios();
    onCerrar();
  };

  const handleGuardar = () => {
    let datos;
    
    switch (modalActivo) {
      case 'crear':
      case 'editar':
        datos = formCurso;
        break;
      case 'material':
        datos = formMaterial;
        break;
      case 'tarea':
        datos = formTarea;
        break;
      case 'anuncio':
        datos = formAnuncio;
        break;
      default:
        return;
    }
    
    onGuardar(datos);
    resetearFormularios();
  };

  // ✅ FUNCIONES PARA MANEJAR ARCHIVOS
  const handleArchivoTarea = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormTarea(prev => ({
      ...prev,
      archivosAdjuntos: [...prev.archivosAdjuntos, ...files]
    }));
  };

  const eliminarArchivoTarea = (index: number) => {
    setFormTarea(prev => ({
      ...prev,
      archivosAdjuntos: prev.archivosAdjuntos.filter((_, i) => i !== index)
    }));
  };

  const agregarEnlace = () => {
    if (nuevoEnlace.trim()) {
      setFormTarea(prev => ({
        ...prev,
        enlaces: [...prev.enlaces, nuevoEnlace.trim()]
      }));
      setNuevoEnlace('');
    }
  };

  const eliminarEnlace = (index: number) => {
    setFormTarea(prev => ({
      ...prev,
      enlaces: prev.enlaces.filter((_, i) => i !== index)
    }));
  };

  // ✅ FUNCIONES PARA MANEJAR ARCHIVOS DE ANUNCIO
  const handleArchivoAnuncio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormAnuncio(prev => ({
      ...prev,
      archivosAdjuntos: [...prev.archivosAdjuntos, ...files]
    }));
  };

  const eliminarArchivoAnuncio = (index: number) => {
    setFormAnuncio(prev => ({
      ...prev,
      archivosAdjuntos: prev.archivosAdjuntos.filter((_, i) => i !== index)
    }));
  };

  if (!modalActivo) return null;

  const obtenerTituloModal = () => {
    switch (modalActivo) {
      case 'crear': return 'Crear Nuevo Curso';
      case 'editar': return 'Editar Curso';
      case 'material': return 'Subir Material';
      case 'tarea': return 'Crear Nueva Tarea';
      case 'anuncio': return 'Crear Anuncio';
      default: return 'Modal';
    }
  };

  return (
    <div className="modal-overlay" onClick={handleCerrar}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header del modal */}
        <div className="modal-header">
          <h2>{obtenerTituloModal()}</h2>
          <button className="btn-cerrar" onClick={handleCerrar}>
            <FaTimes />
          </button>
        </div>

        {/* Body del modal */}
        <div className="modal-body">
          
          {/* ✅ FORMULARIO PARA CREAR TAREA MEJORADO */}
          {modalActivo === 'tarea' && (
            <>
              <div className="form-group">
                <label>Título de la Tarea *</label>
                <input
                  type="text"
                  value={formTarea.titulo}
                  onChange={(e) => setFormTarea({...formTarea, titulo: e.target.value})}
                  placeholder="Ej: Ejercicios de Herencia"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Evaluación</label>
                <select
                  value={formTarea.tipoEvaluacion}
                  onChange={(e) => setFormTarea({...formTarea, tipoEvaluacion: e.target.value as 'tarea' | 'examen' | 'proyecto'})}
                >
                  <option value="tarea">📝 Tarea</option>
                  <option value="examen">🎓 Examen</option>
                  <option value="proyecto">🚀 Proyecto</option>
                </select>
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formTarea.descripcion}
                  onChange={(e) => setFormTarea({...formTarea, descripcion: e.target.value})}
                  placeholder="Descripción breve de la tarea..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Instrucciones Detalladas</label>
                <textarea
                  value={formTarea.instrucciones}
                  onChange={(e) => setFormTarea({...formTarea, instrucciones: e.target.value})}
                  placeholder="Instrucciones paso a paso para completar la tarea..."
                  rows={4}
                />
              </div>

              {/* ✅ SECCIÓN DE ARCHIVOS ADJUNTOS */}
              <div className="form-group">
                <label>Archivos Adjuntos</label>
                <div className="upload-area">
                  <input
                    type="file"
                    multiple
                    onChange={handleArchivoTarea}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.png,.mp4,.mp3"
                  />
                  <div className="upload-info">
                    <FaUpload />
                    <span>Subir archivos de referencia</span>
                    <small>PDF, Word, PowerPoint, imágenes, videos</small>
                  </div>
                </div>

                {/* Lista de archivos adjuntos */}
                {formTarea.archivosAdjuntos.length > 0 && (
                  <div className="archivos-lista">
                    {formTarea.archivosAdjuntos.map((archivo, index) => (
                      <div key={index} className="archivo-item">
                        <FaFileAlt />
                        <span>{archivo.name}</span>
                        <button
                          type="button"
                          onClick={() => eliminarArchivoTarea(index)}
                          className="btn-eliminar-archivo"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ✅ SECCIÓN DE ENLACES */}
              <div className="form-group">
                <label>Enlaces de Referencia</label>
                <div className="enlace-input">
                  <input
                    type="url"
                    value={nuevoEnlace}
                    onChange={(e) => setNuevoEnlace(e.target.value)}
                    placeholder="https://ejemplo.com/recurso"
                  />
                  <button
                    type="button"
                    onClick={agregarEnlace}
                    className="btn-agregar-enlace"
                  >
                    <FaLink />
                  </button>
                </div>

                {/* Lista de enlaces */}
                {formTarea.enlaces.length > 0 && (
                  <div className="enlaces-lista">
                    {formTarea.enlaces.map((enlace, index) => (
                      <div key={index} className="enlace-item">
                        <FaLink />
                        <a href={enlace} target="_blank" rel="noopener noreferrer">
                          {enlace}
                        </a>
                        <button
                          type="button"
                          onClick={() => eliminarEnlace(index)}
                          className="btn-eliminar-enlace"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fecha y hora límite */}
              <div className="form-row">
                <div className="form-group">
                  <label>Fecha Límite *</label>
                  <div className="date-input">
                    <FaCalendarAlt />
                    <input
                      type="date"
                      value={formTarea.fechaLimite}
                      onChange={(e) => setFormTarea({...formTarea, fechaLimite: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Hora Límite</label>
                  <div className="time-input">
                    <FaClock />
                    <input
                      type="time"
                      value={formTarea.horaLimite}
                      onChange={(e) => setFormTarea({...formTarea, horaLimite: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Puntuación Máxima</label>
                  <input
                    type="number"
                    value={formTarea.puntuacion}
                    onChange={(e) => setFormTarea({...formTarea, puntuacion: parseInt(e.target.value)})}
                    min="1"
                    max="1000"
                  />
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formTarea.permitirEntregaTardia}
                    onChange={(e) => setFormTarea({...formTarea, permitirEntregaTardia: e.target.checked})}
                  />
                  Permitir entrega tardía
                </label>
              </div>
            </>
          )}

          {/* ✅ FORMULARIO PARA CREAR ANUNCIO MEJORADO */}
          {modalActivo === 'anuncio' && (
            <>
              <div className="form-group">
                <label>Título del Anuncio *</label>
                <input
                  type="text"
                  value={formAnuncio.titulo}
                  onChange={(e) => setFormAnuncio({...formAnuncio, titulo: e.target.value})}
                  placeholder="Ej: Examen Parcial - Fecha Confirmada"
                />
              </div>

              <div className="form-group">
                <label>Contenido</label>
                <textarea
                  value={formAnuncio.contenido}
                  onChange={(e) => setFormAnuncio({...formAnuncio, contenido: e.target.value})}
                  placeholder="Escribe el contenido de tu anuncio..."
                  rows={6}
                />
              </div>

              {/* ✅ ARCHIVOS PARA ANUNCIOS */}
              <div className="form-group">
                <label>Archivos Adjuntos (Opcional)</label>
                <div className="upload-area">
                  <input
                    type="file"
                    multiple
                    onChange={handleArchivoAnuncio}
                    accept=".pdf,.doc,.docx,.jpg,.png,.mp4"
                  />
                  <div className="upload-info">
                    <FaUpload />
                    <span>Subir archivos al anuncio</span>
                    <small>PDF, Word, imágenes, videos</small>
                  </div>
                </div>

                {/* Lista de archivos del anuncio */}
                {formAnuncio.archivosAdjuntos.length > 0 && (
                  <div className="archivos-lista">
                    {formAnuncio.archivosAdjuntos.map((archivo, index) => (
                      <div key={index} className="archivo-item">
                        <FaFileAlt />
                        <span>{archivo.name}</span>
                        <button
                          type="button"
                          onClick={() => eliminarArchivoAnuncio(index)}
                          className="btn-eliminar-archivo"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formAnuncio.fijado}
                    onChange={(e) => setFormAnuncio({...formAnuncio, fijado: e.target.checked})}
                  />
                  Fijar este anuncio
                </label>
              </div>
            </>
          )}

          {/* RESTO DE FORMULARIOS (curso y material) - mantener como estaban */}
          {(modalActivo === 'crear' || modalActivo === 'editar') && (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label>Código del Curso *</label>
                  <input
                    type="text"
                    value={formCurso.codigo}
                    onChange={(e) => setFormCurso({...formCurso, codigo: e.target.value})}
                    placeholder="Ej: IS-301"
                  />
                </div>
                <div className="form-group">
                  <label>Créditos</label>
                  <input
                    type="number"
                    value={formCurso.creditos}
                    onChange={(e) => setFormCurso({...formCurso, creditos: parseInt(e.target.value)})}
                    min="1"
                    max="6"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Nombre del Curso *</label>
                <input
                  type="text"
                  value={formCurso.nombre}
                  onChange={(e) => setFormCurso({...formCurso, nombre: e.target.value})}
                  placeholder="Ej: Programación Orientada a Objetos"
                />
              </div>

              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  value={formCurso.descripcion}
                  onChange={(e) => setFormCurso({...formCurso, descripcion: e.target.value})}
                  placeholder="Descripción del curso..."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Ciclo Académico</label>
                <select
                  value={formCurso.ciclo}
                  onChange={(e) => setFormCurso({...formCurso, ciclo: e.target.value})}
                >
                  <option value="2025-1">2025-1</option>
                  <option value="2025-2">2025-2</option>
                </select>
              </div>
            </>
          )}

          {modalActivo === 'material' && (
            <>
              <div className="form-group">
                <label>Título del Material *</label>
                <input
                  type="text"
                  value={formMaterial.titulo}
                  onChange={(e) => setFormMaterial({...formMaterial, titulo: e.target.value})}
                  placeholder="Ej: Introducción a POO - Slides"
                />
              </div>

              <div className="form-group">
                <label>Tipo de Material</label>
                <select
                  value={formMaterial.tipo}
                  onChange={(e) => setFormMaterial({...formMaterial, tipo: e.target.value as any})}
                >
                  <option value="documento">📄 Documento</option>
                  <option value="presentacion">📊 Presentación</option>
                  <option value="video">🎥 Video</option>
                  <option value="enlace">🔗 Enlace</option>
                </select>
              </div>

              {formMaterial.tipo !== 'enlace' ? (
                <div className="form-group">
                  <label>Subir Archivo</label>
                  <div className="upload-area">
                    <input
                      type="file"
                      onChange={(e) => setFormMaterial({...formMaterial, archivo: e.target.files?.[0]})}
                    />
                    <div className="upload-info">
                      <FaUpload />
                      <span>Seleccionar archivo</span>
                      <small>PDF, DOC, PPT, MP4, etc.</small>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="form-group">
                  <label>URL del Enlace</label>
                  <input
                    type="url"
                    value={formMaterial.enlace || ''}
                    onChange={(e) => setFormMaterial({...formMaterial, enlace: e.target.value})}
                    placeholder="https://ejemplo.com"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer del modal */}
        <div className="modal-footer">
          <button className="btn-cancelar" onClick={handleCerrar}>
            Cancelar
          </button>
          <button className="btn-guardar" onClick={handleGuardar}>
            {modalActivo === 'crear' ? 'Crear Curso' : 
             modalActivo === 'editar' ? 'Guardar Cambios' :
             modalActivo === 'tarea' ? 'Crear Tarea' :
             modalActivo === 'material' ? 'Subir Material' :
             'Publicar Anuncio'}
          </button>
        </div>
      </div>
    </div>
  );
};