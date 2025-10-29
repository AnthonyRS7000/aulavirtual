import React, { useState } from 'react';
import { FaBullhorn, FaUpload, FaPaperclip, FaTimes, FaSave, FaEye, FaTrash, FaEdit, FaCalendarAlt, FaUser } from 'react-icons/fa';
import '../css/SubirAnuncios.css';

interface ArchivoAdjunto {
  id: string;
  nombre: string;
  tipo: string;
  tamaño: number;
  url?: string;
}

interface Anuncio {
  id: string;
  titulo: string;
  contenido: string;
  autor: {
    nombre: string;
    rol: 'profesor' | 'administrativo';
  };
  facultades: string[];
  programas: string[];
  fechaPublicacion: string;
  archivosAdjuntos: ArchivoAdjunto[];
  estadoPublicacion: 'borrador' | 'publicado';
}

export default function SubirAnuncios() {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [facultadesSeleccionadas, setFacultadesSeleccionadas] = useState<string[]>([]);
  const [programasSeleccionados, setProgramasSeleccionados] = useState<string[]>([]);
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<ArchivoAdjunto[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [anuncioEditando, setAnuncioEditando] = useState<string | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState(false);

  // Datos simulados
  const [anunciosGuardados, setAnunciosGuardados] = useState<Anuncio[]>([
    {
      id: '1',
      titulo: 'Inicio del Semestre Académico 2025-I',
      contenido: 'Estimados estudiantes, les informamos que el inicio del semestre académico 2025-I será el próximo lunes 10 de marzo. Por favor revisen sus horarios en el sistema.',
      autor: {
        nombre: 'Administración UDH',
        rol: 'administrativo'
      },
      facultades: ['Todas'],
      programas: ['Todos'],
      fechaPublicacion: '2025-01-15T10:00:00Z',
      archivosAdjuntos: [],
      estadoPublicacion: 'publicado'
    },
    {
      id: '2',
      titulo: 'Actualización del Sistema de Matrícula',
      contenido: 'El sistema de matrícula estará en mantenimiento el día sábado 20 de enero de 8:00 AM a 2:00 PM. Durante este periodo no se podrán realizar inscripciones.',
      autor: {
        nombre: 'Oficina de Sistemas',
        rol: 'administrativo'
      },
      facultades: ['Ciencias Empresariales'],
      programas: ['Administración de Empresas'],
      fechaPublicacion: '2025-01-14T14:30:00Z',
      archivosAdjuntos: [],
      estadoPublicacion: 'publicado'
    }
  ]);

  const facultades = ['Todas', 'Ciencias Empresariales', 'Ingeniería', 'Ciencias de la Salud', 'Derecho'];
  const programas = ['Todos', 'Administración de Empresas', 'Contabilidad', 'Marketing', 'Turismo'];

  const handleAgregarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = e.target.files;
    if (archivos) {
      const nuevosArchivos: ArchivoAdjunto[] = Array.from(archivos).map(archivo => ({
        id: Date.now().toString() + Math.random(),
        nombre: archivo.name,
        tipo: archivo.type,
        tamaño: archivo.size,
        url: URL.createObjectURL(archivo)
      }));
      setArchivosAdjuntos([...archivosAdjuntos, ...nuevosArchivos]);
    }
  };

  const handleEliminarArchivo = (id: string) => {
    setArchivosAdjuntos(archivosAdjuntos.filter(a => a.id !== id));
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

  const handleGuardarBorrador = () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Por favor completa el título y contenido del anuncio');
      return;
    }

    const nuevoAnuncio: Anuncio = {
      id: anuncioEditando || Date.now().toString(),
      titulo,
      contenido,
      autor: {
        nombre: 'Administración UDH',
        rol: 'administrativo'
      },
      facultades: facultadesSeleccionadas,
      programas: programasSeleccionados,
      fechaPublicacion: new Date().toISOString(),
      archivosAdjuntos,
      estadoPublicacion: 'borrador'
    };

    if (anuncioEditando) {
      setAnunciosGuardados(anunciosGuardados.map(a => a.id === anuncioEditando ? nuevoAnuncio : a));
    } else {
      setAnunciosGuardados([nuevoAnuncio, ...anunciosGuardados]);
    }

    limpiarFormulario();
    alert('Anuncio guardado como borrador');
  };

  const handlePublicar = () => {
    if (!titulo.trim() || !contenido.trim()) {
      alert('Por favor completa el título y contenido del anuncio');
      return;
    }

    const nuevoAnuncio: Anuncio = {
      id: anuncioEditando || Date.now().toString(),
      titulo,
      contenido,
      autor: {
        nombre: 'Administración UDH',
        rol: 'administrativo'
      },
      facultades: facultadesSeleccionadas,
      programas: programasSeleccionados,
      fechaPublicacion: new Date().toISOString(),
      archivosAdjuntos,
      estadoPublicacion: 'publicado'
    };

    if (anuncioEditando) {
      setAnunciosGuardados(anunciosGuardados.map(a => a.id === anuncioEditando ? nuevoAnuncio : a));
    } else {
      setAnunciosGuardados([nuevoAnuncio, ...anunciosGuardados]);
    }

    limpiarFormulario();
    alert('Anuncio publicado exitosamente');
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setContenido('');
    setFacultadesSeleccionadas([]);
    setProgramasSeleccionados([]);
    setArchivosAdjuntos([]);
    setModoEdicion(false);
    setAnuncioEditando(null);
    setVistaPrevia(false);
  };

  const handleEditarAnuncio = (anuncio: Anuncio) => {
    setTitulo(anuncio.titulo);
    setContenido(anuncio.contenido);
    setFacultadesSeleccionadas(anuncio.facultades);
    setProgramasSeleccionados(anuncio.programas);
    setArchivosAdjuntos(anuncio.archivosAdjuntos);
    setModoEdicion(true);
    setAnuncioEditando(anuncio.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEliminarAnuncio = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este anuncio?')) {
      setAnunciosGuardados(anunciosGuardados.filter(a => a.id !== id));
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
      {/* Header */}
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

      {/* Formulario de Anuncio */}
      <div className="anuncio-form-card">
        <h2 className="form-section-title">Información del Anuncio</h2>
        
        {/* Título */}
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

        {/* Contenido */}
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

        {/* Destinatarios */}
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

        {/* Archivos Adjuntos */}
        <h2 className="form-section-title">Archivos Adjuntos (Opcional)</h2>
        
        <div className="form-group">
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

        {/* Botones de Acción */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-action btn-secondary"
            onClick={() => setVistaPrevia(!vistaPrevia)}
          >
            <FaEye />
            {vistaPrevia ? 'Ocultar Vista Previa' : 'Vista Previa'}
          </button>
          
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
              className="btn-action btn-draft"
              onClick={handleGuardarBorrador}
            >
              <FaSave />
              Guardar Borrador
            </button>
            <button
              type="button"
              className="btn-action btn-publish"
              onClick={handlePublicar}
            >
              <FaUpload />
              Publicar Anuncio
            </button>
          </div>
        </div>

        {/* Vista Previa */}
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
              <p className="preview-contenido">{contenido || 'Contenido del anuncio...'}</p>
              
              {archivosAdjuntos.length > 0 && (
                <div className="preview-archivos">
                  <h4>Archivos adjuntos:</h4>
                  {archivosAdjuntos.map(archivo => (
                    <div key={archivo.id} className="preview-archivo">
                      📎 {archivo.nombre}
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

      {/* Lista de Anuncios Guardados */}
      <div className="anuncios-guardados-section">
        <h2 className="section-title">Anuncios Publicados y Borradores</h2>
        
        {anunciosGuardados.length === 0 ? (
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
                    <span className={`estado-badge ${anuncio.estadoPublicacion}`}>
                      {anuncio.estadoPublicacion === 'publicado' ? 'Publicado' : 'Borrador'}
                    </span>
                  </div>
                  <div className="anuncio-guardado-acciones">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEditarAnuncio(anuncio)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleEliminarAnuncio(anuncio.id)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <p className="anuncio-guardado-contenido">
                  {anuncio.contenido.substring(0, 150)}
                  {anuncio.contenido.length > 150 && '...'}
                </p>
                
                <div className="anuncio-guardado-meta">
                  <span className="meta-item">
                    <FaCalendarAlt />
                    {formatearFecha(anuncio.fechaPublicacion)}
                  </span>
                  <span className="meta-item">
                    📁 {anuncio.archivosAdjuntos.length} archivo(s)
                  </span>
                  <span className="meta-item">
                    👥 {anuncio.facultades.join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
