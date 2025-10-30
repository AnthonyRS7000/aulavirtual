import React, { useState, useEffect } from 'react';
import { FaBullhorn, FaUpload, FaPaperclip, FaTimes, FaSave, FaEye, FaTrash, FaEdit, FaCalendarAlt, FaUser } from 'react-icons/fa';
import '../css/SubirAnuncios.css';
import { createAnuncio, getAnuncios, updateAnuncio, deleteAnuncio } from '../../../api/anuncio';

interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  url?: string;
  file?: File;
}

interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: string;
  imagen?: string | null;
  archivo_adjunto?: string | null;
  link_redireccion?: string | null;
  created_at?: string;
  updated_at?: string;
}

export default function SubirAnuncios() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState<string[]>([]);
  const [programasSeleccionados, setProgramasSeleccionados] = useState<string[]>([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([]);
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  const [linkRedireccion, setLinkRedireccion] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false);
  const [anuncioEditando, setAnuncioEditando] = useState<number | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState(false);
  const [anunciosGuardados, setAnunciosGuardados] = useState<Anuncio[]>([]);
  const [cargando, setCargando] = useState(false);

  const facultades = ['Todas', 'Ciencias Empresariales', 'Ingeniería', 'Ciencias de la Salud', 'Derecho'];
  const programas = ['Todos', 'Administración de Empresas', 'Contabilidad', 'Marketing', 'Turismo'];
  const apiBase = import.meta.env.VITE_API_URL;

  useEffect(() => {
    cargarAnuncios();
  }, []);

  const cargarAnuncios = async () => {
    setCargando(true);
    try {
      const datos = await getAnuncios();
      // Validar que datos sea un array
      if (Array.isArray(datos)) {
        setAnunciosGuardados(datos);
      } else {
        console.warn('Los datos recibidos no son un array:', datos);
        setAnunciosGuardados([]);
      }
    } catch (err) {
      console.error('Error al cargar anuncios:', err);
      setAnunciosGuardados([]);
    } finally {
      setCargando(false);
    }
  };

  const handleAgregarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = e.target.files;
    if (!archivos) return;

    const nuevosArchivos: ArchivoAdjunto[] = Array.from(archivos).map(archivo => ({
      id: `${Date.now()}-${Math.random()}`,
      nombre: archivo.name,
      tipo: archivo.type,
      tamaño: archivo.size,
      url: URL.createObjectURL(archivo),
      file: archivo
    }));
    setArchivosAdjuntos(prev => [...prev, ...nuevosArchivos]);
  };

  const handleAgregarImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imagenPreview) {
      try { URL.revokeObjectURL(imagenPreview); } catch {}
    }
    setImagenFile(file);
    setImagenPreview(URL.createObjectURL(file));
  };

  const handleEliminarArchivo = (id: string) => {
    const archivo = archivosAdjuntos.find(x => x.id === id);
    if (archivo?.url) {
      try { URL.revokeObjectURL(archivo.url); } catch {}
    }
    setArchivosAdjuntos(prev => prev.filter(a => a.id !== id));
  };

  const handleEliminarImagen = () => {
    if (imagenPreview) {
      try { URL.revokeObjectURL(imagenPreview); } catch {}
    }
    setImagenFile(null);
    setImagenPreview(null);
  };

  const handleToggleFacultad = (facultad: string) => {
    if (facultad === 'Todas') {
      setFacultadesSeleccionadas(['Todas']);
      setProgramasSeleccionados(['Todos']);
    } else {
      const nuevas = facultadesSeleccionadas.includes(facultad)
        ? facultadesSeleccionadas.filter(f => f !== facultad && f !== 'Todas')
        : [...facultadesSeleccionadas.filter(f => f !== 'Todas'), facultad];
      setFacultadesSeleccionadas(nuevas.length === 0 ? ['Todas'] : nuevas);
    }
  };

  const handleTogglePrograma = (programa: string) => {
    if (programa === 'Todos') {
      setProgramasSeleccionados(['Todos']);
    } else {
      const nuevos = programasSeleccionados.includes(programa)
        ? programasSeleccionados.filter(p => p !== programa && p !== 'Todos')
        : [...programasSeleccionados.filter(p => p !== 'Todos'), programa];
      setProgramasSeleccionados(nuevos.length === 0 ? ['Todos'] : nuevos);
    }
  };

  const construirFormData = (estado: string) => {
    const form = new FormData();
    form.append('titulo', titulo);
    form.append('descripcion', contenido);
    form.append('fecha', new Date().toISOString());
    form.append('tipo', estado);

    if (imagenFile) {
      form.append('imagen', imagenFile);
    }

    if (linkRedireccion.trim()) {
      form.append('link_redireccion', linkRedireccion);
    }

    archivosAdjuntos.forEach((archivo) => {
      if (archivo.file) {
        form.append('archivo_adjunto', archivo.file);
      }
    });

    return form;
  };

  const handleGuardarBorrador = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Por favor completa el título y contenido del anuncio');
      return;
    }

    setCargando(true);
    try {
      const form = construirFormData('borrador');

      if (modoEdicion && anuncioEditando !== null) {
        await updateAnuncio(anuncioEditando, form);
        alert('Borrador actualizado exitosamente');
      } else {
        await createAnuncio(form);
        alert('Anuncio guardado como borrador');
      }

      limpiarFormulario();
      await cargarAnuncios();
    } catch (err: any) {
      console.error(err);
      alert('Error al guardar borrador: ' + (err?.message || String(err)));
    } finally {
      setCargando(false);
    }
  };

  const handlePublicar = async () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Por favor completa el título y contenido del anuncio');
      return;
    }

    setCargando(true);
    try {
      const form = construirFormData('publicado');

      if (modoEdicion && anuncioEditando !== null) {
        await updateAnuncio(anuncioEditando, form);
        alert('Anuncio actualizado y publicado exitosamente');
      } else {
        await createAnuncio(form);
        alert('Anuncio publicado exitosamente');
      }

      limpiarFormulario();
      await cargarAnuncios();
    } catch (err: any) {
      console.error(err);
      alert('Error al publicar anuncio: ' + (err?.message || String(err)));
    } finally {
      setCargando(false);
    }
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setContenido('');
    setFacultadesSeleccionadas([]);
    setProgramasSeleccionados([]);
    setArchivosAdjuntos([]);
    setImagenFile(null);
    setImagenPreview(null);
    setLinkRedireccion('');
    setModoEdicion(false);
    setAnuncioEditando(null);
    setVistaPrevia(false);
  };

  const handleEditarAnuncio = (anuncio: Anuncio) => {
    setTitulo(anuncio.titulo);
    setContenido(anuncio.descripcion);
    setLinkRedireccion(anuncio.link_redireccion || '');
    setModoEdicion(true);
    setAnuncioEditando(anuncio.id);

    if (anuncio.imagen) {
      setImagenPreview(anuncio.imagen);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminarAnuncio = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;

    setCargando(true);
    try {
      await deleteAnuncio(id);
      alert('Anuncio eliminado exitosamente');
      await cargarAnuncios();
    } catch (err: any) {
      console.error(err);
      alert('Error al eliminar anuncio: ' + (err?.message || String(err)));
    } finally {
      setCargando(false);
    }
  };

  const formatearFecha = (fecha: string) => {
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatearTamaño = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="subir-anuncios-page">
      <div className="anuncios-admin-header">
        <div className="header-info">
          <h1 className="page-title">
            <FaBullhorn className="title-icon" />
            {modoEdicion ? 'Editar Anuncio' : 'Publicar Anuncio'}
          </h1>
          <p className="page-subtitle">
            Crea y gestiona anuncios para estudiantes y docentes
          </p>
        </div>
      </div>

      <div className="anuncio-form-card">
        <h2 className="form-section-title">Información del Anuncio</h2>
        
        <div className="form-group">
          <label className="form-label">
            Título del Anuncio <span className="required">*</span>
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Ej: Importante: Inicio del Semestre Académico"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            maxLength={150}
          />
          <span className="char-counter">{titulo.length}/150</span>
        </div>

        <div className="form-group">
          <label className="form-label">
            Contenido del Anuncio <span className="required">*</span>
          </label>
          <textarea
            className="form-textarea"
            placeholder="Escribe el contenido completo del anuncio..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows={8}
          />
          <span className="char-counter">{contenido.length} caracteres</span>
        </div>

        <h2 className="form-section-title">Destinatarios</h2>
        
        <div className="form-group">
          <label className="form-label">Facultades</label>
          <div className="checkbox-grid">
            {facultades.map(facultad => (
              <label key={facultad} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={facultadesSeleccionadas.includes(facultad)}
                  onChange={() => handleToggleFacultad(facultad)}
                />
                <span>{facultad}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Programas Académicos</label>
          <div className="checkbox-grid">
            {programas.map(programa => (
              <label key={programa} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={programasSeleccionados.includes(programa)}
                  onChange={() => handleTogglePrograma(programa)}
                />
                <span>{programa}</span>
              </label>
            ))}
          </div>
        </div>

        <h2 className="form-section-title">Contenido Multimedia</h2>

        <div className="form-group">
          <label className="form-label">Imagen Destacada (opcional)</label>
          <label className="file-upload-area">
            <input
              type="file"
              accept="image/*"
              onChange={handleAgregarImagen}
              style={{ display: 'none' }}
            />
            <FaUpload className="upload-icon" />
            <span className="upload-text">Subir imagen destacada</span>
            <span className="upload-hint">JPG/PNG (recomendado 1200x600)</span>
          </label>

          {imagenPreview && (
            <div className="imagen-preview-row">
              <img src={imagenPreview} alt="preview" className="imagen-preview" />
              <button type="button" className="btn-eliminar-archivo" onClick={handleEliminarImagen}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Link de Redirección (opcional)</label>
          <input
            type="url"
            className="form-input"
            placeholder="https://ejemplo.com/mas-info"
            value={linkRedireccion}
            onChange={(e) => setLinkRedireccion(e.target.value)}
          />
          <span className="upload-hint">Si agregas un link, los usuarios podrán acceder desde el anuncio</span>
        </div>

        <div className="form-group">
          <label className="form-label">Archivos Adjuntos (opcional)</label>
          <label className="file-upload-area">
            <input
              type="file"
              multiple
              onChange={handleAgregarArchivo}
              style={{ display: 'none' }}
            />
            <FaPaperclip className="upload-icon" />
            <span className="upload-text">Haz clic o arrastra archivos aquí</span>
            <span className="upload-hint">PDF, Word, Excel, imágenes (máx. 10MB por archivo)</span>
          </label>

          {archivosAdjuntos.length > 0 && (
            <div className="archivos-lista">
              {archivosAdjuntos.map(archivo => (
                <div key={archivo.id} className="archivo-item">
                  <div className="archivo-info">
                    <FaPaperclip className="archivo-icon" />
                    <div className="archivo-detalles">
                      <span className="archivo-nombre">{archivo.nombre}</span>
                      <span className="archivo-tamaño">{formatearTamaño(archivo.tamaño)}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-eliminar-archivo"
                    onClick={() => handleEliminarArchivo(archivo.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="form-actions">
          
          <div className="form-actions-right">
            {modoEdicion && (
              <button
                type="button"
                className="btn-action btn-cancel"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>
            )}
           
            <button
              type="button"
              className="btn-action btn-publish"
              onClick={handlePublicar}
              disabled={cargando}
            >
              <FaUpload />
              {cargando ? 'Publicando...' : 'Publicar Anuncio'}
            </button>
          </div>
        </div>

        {vistaPrevia && (
          <div className="vista-previa-container">
            <h3 className="vista-previa-title">Vista Previa del Anuncio</h3>
            <div className="anuncio-preview">
              <div className="preview-header">
                <div className="preview-autor">
                  <FaUser className="preview-avatar" />
                  <div>
                    <h4>Administración UDH</h4>
                    <span>Administrativo</span>
                  </div>
                </div>
                <span className="preview-fecha">
                  <FaCalendarAlt />
                  {formatearFecha(new Date().toISOString())}
                </span>
              </div>
              
              <h2 className="preview-titulo">{titulo || 'Título del anuncio'}</h2>
              
              {imagenPreview && (
                <div className="preview-imagen">
                  <img src={imagenPreview} alt="Vista previa" />
                </div>
              )}
              
              <p className="preview-contenido">{contenido || 'Contenido del anuncio...'}</p>
              
              {linkRedireccion && (
                <div className="preview-link">
                  <strong>🔗 Link:</strong>
                  <a href={linkRedireccion} target="_blank" rel="noopener noreferrer">
                    {linkRedireccion}
                  </a>
                </div>
              )}
              
              {archivosAdjuntos.length > 0 && (
                <div className="preview-archivos">
                  <h4>📎 Archivos adjuntos:</h4>
                  {archivosAdjuntos.map(archivo => (
                    <div key={archivo.id} className="preview-archivo">
                      {archivo.nombre}
                    </div>
                  ))}
                </div>
              )}

              <div className="preview-destinatarios">
                <span><strong>Facultades:</strong> {facultadesSeleccionadas.join(', ') || 'Ninguna'}</span>
                <span><strong>Programas:</strong> {programasSeleccionados.join(', ') || 'Ninguno'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="anuncios-guardados-section">
        <h2 className="section-title">Anuncios Publicados</h2>
        
        {cargando ? (
          <div className="sin-anuncios">
            <p>Cargando anuncios...</p>
          </div>
        ) : anunciosGuardados.length === 0 ? (
          <div className="sin-anuncios">
            <FaBullhorn className="icon-empty" />
            <p>No hay anuncios guardados</p>
          </div>
        ) : (
          <div className="anuncios-guardados-lista">
            {anunciosGuardados.map(anuncio => (
              <div key={anuncio.id} className="anuncio-guardado-card">
                <div className="anuncio-guardado-header">
                  <div className="anuncio-guardado-info">
                    <h3>{anuncio.titulo}</h3>
                    <span className={`estado-badge ${anuncio.tipo}`}>
                      {anuncio.tipo === 'publicado' ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                  <div className="anuncio-guardado-acciones">
                    <button
                      className="btn-icon-a btn-edit"
                      onClick={() => handleEditarAnuncio(anuncio)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon-a btn-delete"
                      onClick={() => handleEliminarAnuncio(anuncio.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                {anuncio.imagen && (
                  <img src={anuncio.imagen} alt={anuncio.titulo} className="anuncio-guardado-imagen" />
                )}
                
                <p className="anuncio-guardado-contenido">
                  {anuncio.descripcion.substring(0, 150)}
                  {anuncio.descripcion.length > 150 && '...'}
                </p>
                
                <div className="anuncio-guardado-meta">
                  <span className="meta-item">
                    <FaCalendarAlt />
                    {formatearFecha(anuncio.fecha)}
                  </span>
                  {anuncio.archivo_adjunto && (
                    <span className="meta-item">
                      📎 Archivo adjunto
                    </span>
                  )}
                  {anuncio.link_redireccion && (
                    <span className="meta-item">
                      🔗 Con enlace
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}