import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PerfilDocente.css';

const PerfilDocente = () => {
  const [userData, setUserData] = useState<any>(null);
  const [docenteData, setDocenteData] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Datos simulados del docente - En producción estos vendrán de la API
    const usuarioSimulado = {
      nombres: 'Aldo Fernando',
      apellidos: 'Ramírez García',
      email: 'aldo.ramirez@udh.edu.pe',
      foto: null
    };

    const datosDocenteSimulado = {
      codigo: 'D00123456',
      documento: '43521876',
      dni: '43521876',
      facultad: 'FACULTAD DE INGENIERÍA',
      departamento: 'DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS',
      especialidad: 'Ingeniería de Software',
      categoria: 'Docente Ordinario - Asociado',
      regimen: 'Dedicación Exclusiva',
      telefono: '962123456',
      celular: '962123456',
      sedalu: 1, // 1 = Huánuco, 2 = Tingo María
      grado_academico: 'Doctor en Ingeniería de Sistemas',
      email_personal: 'aldo.ramirez@gmail.com'
    };

    // En producción, estos datos vendrán del localStorage o API
    // const usuario = JSON.parse(localStorage.getItem('usuario_docente') || '{}');
    // const datosDocente = JSON.parse(localStorage.getItem('datos_docente') || '{}');

    setUserData(usuarioSimulado);
    setDocenteData(datosDocenteSimulado);
    
    // Inicializar foto si existe
    const foto = usuarioSimulado?.foto || null;
    if (foto) setPhoto(foto);
    
    // Inicializar número telefónico si existe
    if (datosDocenteSimulado && (datosDocenteSimulado.telefono || datosDocenteSimulado.celular)) {
      setPhoneNumber(datosDocenteSimulado.telefono || datosDocenteSimulado.celular);
    }
  }, []);

  const navigate = useNavigate();

  if (!userData || !docenteData) return <div>Cargando...</div>;

  // Maneja selección de archivo, valida tipo/tamaño y genera preview con URL
  const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError(null);
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    
    // Validar tamaño (2MB)
    const maxBytes = 2 * 1024 * 1024;
    if (file.size > maxBytes) {
      setPhotoError('El archivo excede el tamaño máximo de 2 MB.');
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    
    // Validar tipo
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) {
      setPhotoError('Formato no soportado. Usa JPG o PNG.');
      setPhotoFile(null);
      setPhotoPreview(null);
      return;
    }
    
    // Generar preview
    const url = URL.createObjectURL(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(url);
  };

  const handlePhoneSubmit = () => {
    // Validación simple: mínimo 6 dígitos
    const cleaned = (phoneNumber || '').trim();
    if (!cleaned || cleaned.length < 6) {
      setSaveMessage('Ingrese un número válido');
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    // Evitar guardar si es el mismo
    if (docenteData && (docenteData.telefono === cleaned || docenteData.celular === cleaned)) {
      setSaveMessage('El número ingresado es el mismo que el actual');
      setTimeout(() => setSaveMessage(null), 3000);
      return;
    }

    // Actualizar estado local (en producción se enviaría a la API)
    const datos = { ...(docenteData || {}), telefono: cleaned, celular: cleaned };
    try {
      // localStorage.setItem('datos_docente', JSON.stringify(datos));
      setDocenteData(datos);
      setSaveMessage('Número actualizado');
      setTimeout(() => setSaveMessage(null), 3000);
      console.log('Número actualizado:', cleaned);
    } catch (err) {
      console.error(err);
      setSaveMessage('Error al guardar');
      setTimeout(() => setSaveMessage(null), 3000);
    }
  };

  // Derivar apellido paterno/materno de userData.apellidos de forma robusta
  const apellidosArray = (userData?.apellidos || '').split(' ').filter(Boolean);
  const apellido_paterno = apellidosArray.length > 0 ? apellidosArray[0] : '';
  const apellido_materno = apellidosArray.length > 1 ? apellidosArray.slice(1).join(' ') : '';

  return (
    <div className="profile-docente-container">
      <div className="profile-docente-root">
        <h1 className="profile-docente-title">Mi Perfil Docente</h1>
      </div>

      {/* Contenido principal del perfil */}
      <div className="profile-docente-content">
        <div className="profile-docente-form-container">
          <div className="profile-docente-card">

          {/* Fila 1: Nombres y Apellido Paterno */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Nombres</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={userData.nombres || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Apellido Paterno</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={apellido_paterno || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 2: Apellido Materno y DNI */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Apellido Materno</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={apellido_materno || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">DNI</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.documento || docenteData.dni || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 3: Facultad y Departamento Académico */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Facultad</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.facultad || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Departamento Académico</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.departamento || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 4: Especialidad y Categoría */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Especialidad</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.especialidad || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Categoría</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.categoria || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 5: Régimen y Grado Académico */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Régimen</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.regimen || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Grado Académico</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.grado_academico || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 6: Código y Correo Institucional */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Código Docente</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.codigo || ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Correo Institucional</label>
              <input 
                type="email" 
                className="profile-docente-form-input" 
                value={userData.email || ""}
                readOnly
              />
            </div>
          </div>

          {/* Fila 7: Sede y Número Celular */}
          <div className="profile-docente-form-row">
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">Sede</label>
              <input 
                type="text" 
                className="profile-docente-form-input" 
                value={docenteData.sedalu === 1 ? "HUÁNUCO" : docenteData.sedalu === 2 ? "TINGO MARÍA" : ""}
                readOnly
              />
            </div>
            <div className="profile-docente-form-group">
              <label className="profile-docente-form-label">
                Número Celular <span className="required-asterisk">*</span>
              </label>
              <input 
                type="tel" 
                className="profile-docente-form-input editable" 
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                onBlur={handlePhoneSubmit}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handlePhoneSubmit()}
              />
              <div className="profile-docente-help-text">
                Puedes modificar este campo
              </div>
              <div className="profile-docente-save-row">
                <button 
                  className="profile-docente-save-btn" 
                  onClick={handlePhoneSubmit} 
                  disabled={phoneNumber === (docenteData && (docenteData.telefono || docenteData.celular))}
                >
                  Actualizar
                </button>
                <div className="profile-docente-save-note">{saveMessage}</div>
              </div>
            </div>
          </div>

          {/* Modal para subir foto */}
          {photoModalOpen && (
            <div className="modal-overlay" role="dialog" aria-modal="true">
              <div className="photo-modal">
                <div className="photo-modal-header">
                  <h3>Cargar Fotografía</h3>
                  <button className="close-modal" onClick={() => { setPhotoModalOpen(false); setPhotoPreview(null); }}>×</button>
                </div>
                <div className="photo-modal-body">
                  <div className="photo-preview">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" />
                    ) : photo ? (
                      <img src={photo} alt="Foto actual" />
                    ) : (
                      <div className="photo-placeholder">Vista previa</div>
                    )}
                  </div>
                  <div className="photo-controls">
                    <input type="file" accept="image/*" onChange={onPhotoSelected} />
                    <div className="photo-hint">Selecciona una imagen desde tu dispositivo. Recomendado: 3:4, rostro centrado.</div>
                    {photoError && <div className="photo-error">{photoError}</div>}
                    <div className="photo-actions">
                      <button className="btn-primary" onClick={() => {
                        if (!photoFile) return;
                        // Simular subida (en producción se enviaría a la API)
                        console.log('Subiendo foto', photoFile);
                        if (photoPreview) URL.revokeObjectURL(photoPreview);
                        setPhotoPreview(null);
                        setPhotoFile(null);
                        setPhotoModalOpen(false);
                      }} disabled={!photoFile}>Guardar</button>
                      <button className="btn-secondary" onClick={() => { 
                        if (photoPreview) URL.revokeObjectURL(photoPreview); 
                        setPhotoModalOpen(false); 
                        setPhotoPreview(null); 
                        setPhotoFile(null); 
                        setPhotoError(null); 
                      }}>Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default PerfilDocente;
