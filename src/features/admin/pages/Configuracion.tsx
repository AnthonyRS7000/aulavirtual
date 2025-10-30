import { useState } from 'react';
import {
  FaCog,
  FaPalette,
  FaUniversity,
  FaKey,
  FaEnvelope,
  FaPlug,
  FaDatabase,
  FaUsers,
  FaChartBar,
  FaHeadset,
  FaSave,
  FaUndo,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaImage,
  FaFont,
  FaShieldAlt,
  FaGoogle,
  FaVideo,
  FaCreditCard,
  FaFingerprint,
  FaServer,
  FaTrash,
  FaDownload,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import TituloPage from '../../../components/pages/TituloPage';
import '../css/Configuracion.css';

type TabType = 'general' | 'academico' | 'integraciones' | 'visual' | 'seguridad' | 'soporte';

interface ConfigGeneral {
  nombreInstitucional: string;
  lemaInstitucional: string;
  anoAcademicoActivo: string;
  zonaHoraria: string;
  formatoFecha: string;
}

interface ConfigAcademica {
  periodoInicio: string;
  periodoFin: string;
  matriculaEnLinea: boolean;
  porcentajePracticas: number;
  porcentajeExamenes: number;
  porcentajeTareas: number;
}

interface ConfigIntegraciones {
  googleClassroom: { habilitado: boolean; clientId: string; clientSecret: string };
  zoom: { habilitado: boolean; apiKey: string; apiSecret: string };
  hikvision: { habilitado: boolean; ipServer: string; puerto: string };
  mercadoPago: { habilitado: boolean; publicKey: string; accessToken: string };
}

export default function Configuracion() {
  const [tabActiva, setTabActiva] = useState<TabType>('general');
  const [guardando, setGuardando] = useState(false);

  // Estados de configuración
  const [configGeneral, setConfigGeneral] = useState<ConfigGeneral>({
    nombreInstitucional: 'Universidad de Huánuco - LMS UDH',
    lemaInstitucional: 'Excelencia Académica y Compromiso Social',
    anoAcademicoActivo: '2025-1',
    zonaHoraria: 'America/Lima',
    formatoFecha: 'DD/MM/YYYY'
  });

  const [configAcademica, setConfigAcademica] = useState<ConfigAcademica>({
    periodoInicio: '2025-03-01',
    periodoFin: '2025-07-31',
    matriculaEnLinea: true,
    porcentajePracticas: 30,
    porcentajeExamenes: 50,
    porcentajeTareas: 20
  });

  const [temaSeleccionado, setTemaSeleccionado] = useState<'claro' | 'oscuro' | 'auto'>('auto');
  const [colorPrimario, setColorPrimario] = useState('#2EBAA0');
  const [colorSecundario, setColorSecundario] = useState('#667eea');

  const [configIntegraciones, setConfigIntegraciones] = useState<ConfigIntegraciones>({
    googleClassroom: { habilitado: true, clientId: '', clientSecret: '' },
    zoom: { habilitado: false, apiKey: '', apiSecret: '' },
    hikvision: { habilitado: false, ipServer: '', puerto: '8000' },
    mercadoPago: { habilitado: false, publicKey: '', accessToken: '' }
  });

  const tabs = [
    { id: 'general' as TabType, label: 'General', icon: <FaCog /> },
    { id: 'academico' as TabType, label: 'Académico', icon: <FaUniversity /> },
    { id: 'integraciones' as TabType, label: 'Integraciones', icon: <FaPlug /> },
    { id: 'visual' as TabType, label: 'Visual', icon: <FaPalette /> },
    { id: 'seguridad' as TabType, label: 'Seguridad', icon: <FaShieldAlt /> },
    { id: 'soporte' as TabType, label: 'Soporte', icon: <FaHeadset /> }
  ];

  const handleGuardarGeneral = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert('Configuración general guardada correctamente');
    }, 1000);
  };

  const handleGuardarAcademico = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert('Configuración académica guardada correctamente');
    }, 1000);
  };

  const handleGuardarVisual = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert('Configuración visual guardada correctamente');
    }, 1000);
  };

  const handleGuardarIntegraciones = () => {
    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      alert('Integraciones guardadas correctamente');
    }, 1000);
  };

  const handleBackup = () => {
    alert('Generando backup de la base de datos...');
  };

  const handleLimpiarCache = () => {
    if (confirm('¿Estás seguro de limpiar el caché del sistema?')) {
      alert('Caché limpiado correctamente');
    }
  };

  return (
    <div className="configuracion-admin-page">
      {/* Header */}
      <div className="configuracion-admin-header">
        <TituloPage
          titulo="⚙️ Configuración del Sistema"
          subtitle="Gestiona los parámetros y ajustes generales de la plataforma"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="config-tabs-container">
        <div className="config-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`config-tab ${tabActiva === tab.id ? 'active' : ''}`}
              onClick={() => setTabActiva(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="config-content">
        
        {/* TAB: GENERAL */}
        {tabActiva === 'general' && (
          <div className="config-section">
            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaUniversity />
                  Parámetros Generales del Sistema
                </h3>
              </div>
              <div className="config-card-body">
                <div className="config-form-grid">
                  <div className="config-form-group">
                    <label className="config-label">Nombre Institucional</label>
                    <input
                      type="text"
                      className="config-input"
                      value={configGeneral.nombreInstitucional}
                      onChange={(e) => setConfigGeneral({ ...configGeneral, nombreInstitucional: e.target.value })}
                      placeholder="Universidad de Huánuco"
                    />
                  </div>

                  <div className="config-form-group">
                    <label className="config-label">Año Académico Activo</label>
                    <select
                      className="config-select"
                      value={configGeneral.anoAcademicoActivo}
                      onChange={(e) => setConfigGeneral({ ...configGeneral, anoAcademicoActivo: e.target.value })}
                    >
                      <option value="2025-1">2025-I</option>
                      <option value="2025-2">2025-II</option>
                      <option value="2024-2">2024-II</option>
                    </select>
                  </div>

                  <div className="config-form-group full-width">
                    <label className="config-label">Lema Institucional</label>
                    <input
                      type="text"
                      className="config-input"
                      value={configGeneral.lemaInstitucional}
                      onChange={(e) => setConfigGeneral({ ...configGeneral, lemaInstitucional: e.target.value })}
                      placeholder="Excelencia Académica y Compromiso Social"
                    />
                  </div>

                  <div className="config-form-group">
                    <label className="config-label">
                      <FaGlobe />
                      Zona Horaria
                    </label>
                    <select
                      className="config-select"
                      value={configGeneral.zonaHoraria}
                      onChange={(e) => setConfigGeneral({ ...configGeneral, zonaHoraria: e.target.value })}
                    >
                      <option value="America/Lima">América/Lima (UTC-5)</option>
                      <option value="America/New_York">América/Nueva York (UTC-5)</option>
                      <option value="America/Mexico_City">América/Ciudad de México (UTC-6)</option>
                      <option value="Europe/Madrid">Europa/Madrid (UTC+1)</option>
                    </select>
                  </div>

                  <div className="config-form-group">
                    <label className="config-label">
                      <FaClock />
                      Formato de Fecha
                    </label>
                    <select
                      className="config-select"
                      value={configGeneral.formatoFecha}
                      onChange={(e) => setConfigGeneral({ ...configGeneral, formatoFecha: e.target.value })}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="config-form-actions">
                  <button className="btn-config-secondary">
                    <FaUndo />
                    Restablecer
                  </button>
                  <button className="btn-config-primary" onClick={handleGuardarGeneral} disabled={guardando}>
                    <FaSave />
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </div>

            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaImage />
                  Identidad Visual
                </h3>
              </div>
              <div className="config-card-body">
                <div className="config-logo-section">
                  <div className="logo-upload-card">
                    <div className="logo-preview">
                      <FaImage />
                      <span>Logo Principal</span>
                    </div>
                    <button className="btn-upload">Subir Logo</button>
                  </div>
                  <div className="logo-upload-card">
                    <div className="logo-preview dark">
                      <FaImage />
                      <span>Logo Oscuro</span>
                    </div>
                    <button className="btn-upload">Subir Logo</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ACADÉMICO */}
        {tabActiva === 'academico' && (
          <div className="config-section">
            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaCalendarAlt />
                  Periodo Académico
                </h3>
              </div>
              <div className="config-card-body">
                <div className="config-form-grid">
                  <div className="config-form-group">
                    <label className="config-label">Fecha de Inicio</label>
                    <input
                      type="date"
                      className="config-input"
                      value={configAcademica.periodoInicio}
                      onChange={(e) => setConfigAcademica({ ...configAcademica, periodoInicio: e.target.value })}
                    />
                  </div>

                  <div className="config-form-group">
                    <label className="config-label">Fecha de Fin</label>
                    <input
                      type="date"
                      className="config-input"
                      value={configAcademica.periodoFin}
                      onChange={(e) => setConfigAcademica({ ...configAcademica, periodoFin: e.target.value })}
                    />
                  </div>

                  <div className="config-form-group full-width">
                    <label className="config-checkbox-label">
                      <input
                        type="checkbox"
                        checked={configAcademica.matriculaEnLinea}
                        onChange={(e) => setConfigAcademica({ ...configAcademica, matriculaEnLinea: e.target.checked })}
                      />
                      <span>Habilitar matrícula en línea</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaChartBar />
                  Criterios de Evaluación
                </h3>
              </div>
              <div className="config-card-body">
                <div className="evaluacion-sliders">
                  <div className="slider-group">
                    <label className="slider-label">
                      Prácticas: <strong>{configAcademica.porcentajePracticas}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={configAcademica.porcentajePracticas}
                      onChange={(e) => setConfigAcademica({ ...configAcademica, porcentajePracticas: Number(e.target.value) })}
                      className="config-slider"
                    />
                  </div>

                  <div className="slider-group">
                    <label className="slider-label">
                      Exámenes: <strong>{configAcademica.porcentajeExamenes}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={configAcademica.porcentajeExamenes}
                      onChange={(e) => setConfigAcademica({ ...configAcademica, porcentajeExamenes: Number(e.target.value) })}
                      className="config-slider"
                    />
                  </div>

                  <div className="slider-group">
                    <label className="slider-label">
                      Tareas: <strong>{configAcademica.porcentajeTareas}%</strong>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={configAcademica.porcentajeTareas}
                      onChange={(e) => setConfigAcademica({ ...configAcademica, porcentajeTareas: Number(e.target.value) })}
                      className="config-slider"
                    />
                  </div>

                  <div className="total-porcentaje">
                    Total: <strong>{configAcademica.porcentajePracticas + configAcademica.porcentajeExamenes + configAcademica.porcentajeTareas}%</strong>
                    {(configAcademica.porcentajePracticas + configAcademica.porcentajeExamenes + configAcademica.porcentajeTareas) !== 100 && (
                      <span className="warning-text">
                        <FaExclamationTriangle />
                        Debe sumar 100%
                      </span>
                    )}
                  </div>
                </div>

                <div className="config-form-actions">
                  <button className="btn-config-secondary">
                    <FaUndo />
                    Restablecer
                  </button>
                  <button className="btn-config-primary" onClick={handleGuardarAcademico} disabled={guardando}>
                    <FaSave />
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: INTEGRACIONES */}
        {tabActiva === 'integraciones' && (
          <div className="config-section">
            <div className="integraciones-grid">
              {/* Google Classroom */}
              <div className="config-card integracion-card">
                <div className="config-card-header">
                  <div className="integracion-header-content">
                    <div className="integracion-icon google">
                      <FaGoogle />
                    </div>
                    <div>
                      <h3 className="config-card-title">Google Classroom</h3>
                      <p className="integracion-descripcion">Sincronización con Google Classroom API</p>
                    </div>
                  </div>
                  <div className={`estado-badge ${configIntegraciones.googleClassroom.habilitado ? 'activo' : 'inactivo'}`}>
                    {configIntegraciones.googleClassroom.habilitado ? (
                      <>
                        <FaCheckCircle />
                        Activo
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Inactivo
                      </>
                    )}
                  </div>
                </div>
                <div className="config-card-body">
                  <div className="config-form-group">
                    <label className="config-checkbox-label">
                      <input
                        type="checkbox"
                        checked={configIntegraciones.googleClassroom.habilitado}
                        onChange={(e) => setConfigIntegraciones({
                          ...configIntegraciones,
                          googleClassroom: { ...configIntegraciones.googleClassroom, habilitado: e.target.checked }
                        })}
                      />
                      <span>Habilitar integración</span>
                    </label>
                  </div>
                  {configIntegraciones.googleClassroom.habilitado && (
                    <>
                      <div className="config-form-group">
                        <label className="config-label">Client ID</label>
                        <input
                          type="text"
                          className="config-input"
                          value={configIntegraciones.googleClassroom.clientId}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            googleClassroom: { ...configIntegraciones.googleClassroom, clientId: e.target.value }
                          })}
                          placeholder="tu-client-id.apps.googleusercontent.com"
                        />
                      </div>
                      <div className="config-form-group">
                        <label className="config-label">Client Secret</label>
                        <input
                          type="password"
                          className="config-input"
                          value={configIntegraciones.googleClassroom.clientSecret}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            googleClassroom: { ...configIntegraciones.googleClassroom, clientSecret: e.target.value }
                          })}
                          placeholder="••••••••••••••••"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Zoom */}
              <div className="config-card integracion-card">
                <div className="config-card-header">
                  <div className="integracion-header-content">
                    <div className="integracion-icon zoom">
                      <FaVideo />
                    </div>
                    <div>
                      <h3 className="config-card-title">Zoom</h3>
                      <p className="integracion-descripcion">Videoconferencias integradas</p>
                    </div>
                  </div>
                  <div className={`estado-badge ${configIntegraciones.zoom.habilitado ? 'activo' : 'inactivo'}`}>
                    {configIntegraciones.zoom.habilitado ? (
                      <>
                        <FaCheckCircle />
                        Activo
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Inactivo
                      </>
                    )}
                  </div>
                </div>
                <div className="config-card-body">
                  <div className="config-form-group">
                    <label className="config-checkbox-label">
                      <input
                        type="checkbox"
                        checked={configIntegraciones.zoom.habilitado}
                        onChange={(e) => setConfigIntegraciones({
                          ...configIntegraciones,
                          zoom: { ...configIntegraciones.zoom, habilitado: e.target.checked }
                        })}
                      />
                      <span>Habilitar integración</span>
                    </label>
                  </div>
                  {configIntegraciones.zoom.habilitado && (
                    <>
                      <div className="config-form-group">
                        <label className="config-label">API Key</label>
                        <input
                          type="text"
                          className="config-input"
                          value={configIntegraciones.zoom.apiKey}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            zoom: { ...configIntegraciones.zoom, apiKey: e.target.value }
                          })}
                          placeholder="zoom-api-key"
                        />
                      </div>
                      <div className="config-form-group">
                        <label className="config-label">API Secret</label>
                        <input
                          type="password"
                          className="config-input"
                          value={configIntegraciones.zoom.apiSecret}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            zoom: { ...configIntegraciones.zoom, apiSecret: e.target.value }
                          })}
                          placeholder="••••••••••••••••"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Hikvision */}
              <div className="config-card integracion-card">
                <div className="config-card-header">
                  <div className="integracion-header-content">
                    <div className="integracion-icon hikvision">
                      <FaFingerprint />
                    </div>
                    <div>
                      <h3 className="config-card-title">Hikvision</h3>
                      <p className="integracion-descripcion">Control de asistencia biométrica</p>
                    </div>
                  </div>
                  <div className={`estado-badge ${configIntegraciones.hikvision.habilitado ? 'activo' : 'inactivo'}`}>
                    {configIntegraciones.hikvision.habilitado ? (
                      <>
                        <FaCheckCircle />
                        Activo
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Inactivo
                      </>
                    )}
                  </div>
                </div>
                <div className="config-card-body">
                  <div className="config-form-group">
                    <label className="config-checkbox-label">
                      <input
                        type="checkbox"
                        checked={configIntegraciones.hikvision.habilitado}
                        onChange={(e) => setConfigIntegraciones({
                          ...configIntegraciones,
                          hikvision: { ...configIntegraciones.hikvision, habilitado: e.target.checked }
                        })}
                      />
                      <span>Habilitar integración</span>
                    </label>
                  </div>
                  {configIntegraciones.hikvision.habilitado && (
                    <>
                      <div className="config-form-group">
                        <label className="config-label">IP del Servidor</label>
                        <input
                          type="text"
                          className="config-input"
                          value={configIntegraciones.hikvision.ipServer}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            hikvision: { ...configIntegraciones.hikvision, ipServer: e.target.value }
                          })}
                          placeholder="192.168.1.100"
                        />
                      </div>
                      <div className="config-form-group">
                        <label className="config-label">Puerto</label>
                        <input
                          type="text"
                          className="config-input"
                          value={configIntegraciones.hikvision.puerto}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            hikvision: { ...configIntegraciones.hikvision, puerto: e.target.value }
                          })}
                          placeholder="8000"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Mercado Pago */}
              <div className="config-card integracion-card">
                <div className="config-card-header">
                  <div className="integracion-header-content">
                    <div className="integracion-icon mercadopago">
                      <FaCreditCard />
                    </div>
                    <div>
                      <h3 className="config-card-title">Mercado Pago</h3>
                      <p className="integracion-descripcion">Pagos en línea institucionales</p>
                    </div>
                  </div>
                  <div className={`estado-badge ${configIntegraciones.mercadoPago.habilitado ? 'activo' : 'inactivo'}`}>
                    {configIntegraciones.mercadoPago.habilitado ? (
                      <>
                        <FaCheckCircle />
                        Activo
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Inactivo
                      </>
                    )}
                  </div>
                </div>
                <div className="config-card-body">
                  <div className="config-form-group">
                    <label className="config-checkbox-label">
                      <input
                        type="checkbox"
                        checked={configIntegraciones.mercadoPago.habilitado}
                        onChange={(e) => setConfigIntegraciones({
                          ...configIntegraciones,
                          mercadoPago: { ...configIntegraciones.mercadoPago, habilitado: e.target.checked }
                        })}
                      />
                      <span>Habilitar integración</span>
                    </label>
                  </div>
                  {configIntegraciones.mercadoPago.habilitado && (
                    <>
                      <div className="config-form-group">
                        <label className="config-label">Public Key</label>
                        <input
                          type="text"
                          className="config-input"
                          value={configIntegraciones.mercadoPago.publicKey}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            mercadoPago: { ...configIntegraciones.mercadoPago, publicKey: e.target.value }
                          })}
                          placeholder="TEST-xxxxxx-xxxxxx-xxxxxx"
                        />
                      </div>
                      <div className="config-form-group">
                        <label className="config-label">Access Token</label>
                        <input
                          type="password"
                          className="config-input"
                          value={configIntegraciones.mercadoPago.accessToken}
                          onChange={(e) => setConfigIntegraciones({
                            ...configIntegraciones,
                            mercadoPago: { ...configIntegraciones.mercadoPago, accessToken: e.target.value }
                          })}
                          placeholder="••••••••••••••••"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="config-form-actions-center">
              <button className="btn-config-primary" onClick={handleGuardarIntegraciones} disabled={guardando}>
                <FaSave />
                {guardando ? 'Guardando...' : 'Guardar Todas las Integraciones'}
              </button>
            </div>
          </div>
        )}

        {/* TAB: VISUAL */}
        {tabActiva === 'visual' && (
          <div className="config-section">
            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaPalette />
                  Tema y Apariencia
                </h3>
              </div>
              <div className="config-card-body">
                <div className="tema-selector">
                  <label className="config-label">Tema del Sistema</label>
                  <div className="tema-opciones">
                    <button
                      className={`tema-opcion ${temaSeleccionado === 'claro' ? 'active' : ''}`}
                      onClick={() => setTemaSeleccionado('claro')}
                    >
                      ☀️ Claro
                    </button>
                    <button
                      className={`tema-opcion ${temaSeleccionado === 'oscuro' ? 'active' : ''}`}
                      onClick={() => setTemaSeleccionado('oscuro')}
                    >
                      🌙 Oscuro
                    </button>
                    <button
                      className={`tema-opcion ${temaSeleccionado === 'auto' ? 'active' : ''}`}
                      onClick={() => setTemaSeleccionado('auto')}
                    >
                      🔄 Auto
                    </button>
                  </div>
                </div>

                <div className="colores-institucionales">
                  <label className="config-label">Colores Institucionales</label>
                  <div className="color-pickers">
                    <div className="color-picker-group">
                      <label>Color Primario</label>
                      <div className="color-picker-input">
                        <input
                          type="color"
                          value={colorPrimario}
                          onChange={(e) => setColorPrimario(e.target.value)}
                        />
                        <span className="color-hex">{colorPrimario}</span>
                      </div>
                    </div>
                    <div className="color-picker-group">
                      <label>Color Secundario</label>
                      <div className="color-picker-input">
                        <input
                          type="color"
                          value={colorSecundario}
                          onChange={(e) => setColorSecundario(e.target.value)}
                        />
                        <span className="color-hex">{colorSecundario}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="config-form-group">
                  <label className="config-label">
                    <FaFont />
                    Tipografía
                  </label>
                  <select className="config-select">
                    <option value="poppins">Poppins (Recomendado)</option>
                    <option value="roboto">Roboto</option>
                    <option value="inter">Inter</option>
                    <option value="nunito">Nunito</option>
                  </select>
                </div>

                <div className="config-form-actions">
                  <button className="btn-config-secondary">
                    <FaUndo />
                    Restablecer
                  </button>
                  <button className="btn-config-primary" onClick={handleGuardarVisual} disabled={guardando}>
                    <FaSave />
                    {guardando ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SEGURIDAD */}
        {tabActiva === 'seguridad' && (
          <div className="config-section">
            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaDatabase />
                  Respaldo y Mantenimiento
                </h3>
              </div>
              <div className="config-card-body">
                <div className="mantenimiento-actions">
                  <button className="mantenimiento-btn backup" onClick={handleBackup}>
                    <FaDownload />
                    <div className="btn-content">
                      <span className="btn-title">Backup de Base de Datos</span>
                      <span className="btn-description">Descargar copia de seguridad</span>
                    </div>
                  </button>

                  <button className="mantenimiento-btn cache" onClick={handleLimpiarCache}>
                    <FaTrash />
                    <div className="btn-content">
                      <span className="btn-title">Limpiar Caché</span>
                      <span className="btn-description">Eliminar archivos temporales</span>
                    </div>
                  </button>

                  <button className="mantenimiento-btn sync">
                    <FaSync />
                    <div className="btn-content">
                      <span className="btn-title">Sincronizar Sistema</span>
                      <span className="btn-description">Actualizar datos externos</span>
                    </div>
                  </button>
                </div>

                <div className="estado-servidor">
                  <h4 className="subsection-title">
                    <FaServer />
                    Estado del Servidor
                  </h4>
                  <div className="servidor-stats">
                    <div className="stat-item">
                      <span className="stat-label">CPU</span>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{ width: '45%', backgroundColor: '#10b981' }}></div>
                      </div>
                      <span className="stat-value">45%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Memoria</span>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{ width: '68%', backgroundColor: '#f59e0b' }}></div>
                      </div>
                      <span className="stat-value">68%</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Disco</span>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{ width: '32%', backgroundColor: '#3b82f6' }}></div>
                      </div>
                      <span className="stat-value">32%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaUsers />
                  Auditoría del Sistema
                </h3>
              </div>
              <div className="config-card-body">
                <div className="auditoria-info">
                  <div className="info-item">
                    <span className="info-label">Administradores Activos:</span>
                    <span className="info-value">3</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Sesiones Abiertas:</span>
                    <span className="info-value">12</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Última Actividad:</span>
                    <span className="info-value">Hace 5 minutos</span>
                  </div>
                </div>
                <button className="btn-config-danger">
                  Cerrar Todas las Sesiones
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SOPORTE */}
        {tabActiva === 'soporte' && (
          <div className="config-section">
            <div className="config-card">
              <div className="config-card-header">
                <h3 className="config-card-title">
                  <FaHeadset />
                  Centro de Soporte
                </h3>
              </div>
              <div className="config-card-body">
                <div className="config-form-group">
                  <label className="config-label">
                    <FaEnvelope />
                    Correo de Soporte
                  </label>
                  <input
                    type="email"
                    className="config-input"
                    placeholder="soporte@udh.edu.pe"
                  />
                </div>

                <div className="estado-integraciones-resumen">
                  <h4 className="subsection-title">Estado de Integraciones</h4>
                  <div className="integraciones-status-list">
                    <div className="status-item">
                      <FaGoogle className="status-icon" />
                      <span>Google Classroom</span>
                      <span className="status-badge activo">
                        <FaCheckCircle />
                        Operativo
                      </span>
                    </div>
                    <div className="status-item">
                      <FaVideo className="status-icon" />
                      <span>Zoom</span>
                      <span className="status-badge inactivo">
                        <FaTimesCircle />
                        Deshabilitado
                      </span>
                    </div>
                    <div className="status-item">
                      <FaFingerprint className="status-icon" />
                      <span>Hikvision</span>
                      <span className="status-badge inactivo">
                        <FaTimesCircle />
                        Deshabilitado
                      </span>
                    </div>
                    <div className="status-item">
                      <FaCreditCard className="status-icon" />
                      <span>Mercado Pago</span>
                      <span className="status-badge inactivo">
                        <FaTimesCircle />
                        Deshabilitado
                      </span>
                    </div>
                  </div>
                </div>

                <div className="contacto-soporte">
                  <h4 className="subsection-title">Contactar Soporte Técnico</h4>
                  <textarea
                    className="config-textarea"
                    rows={5}
                    placeholder="Describe el problema o consulta..."
                  ></textarea>
                  <button className="btn-config-primary">
                    <FaEnvelope />
                    Enviar Mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
