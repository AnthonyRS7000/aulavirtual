import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import logoUDH from '../../../../assets/UDH.webp';
import logoUDHLight from '../../../../assets/UDHlight.png';
import pdfIcon from '../../../../components/icons/pdf.svg';
import calendarioIcon from '../../../../components/icons/calendario.svg';
import PerfilDropdownDocente from '../../../../components/PerfilDropdownDocente';
import './TopbarDocente.css';

interface TopbarDocenteProps {
  onSidebarToggle?: () => void;
  sidebarOpen?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void; 
}

export default function TopbarDocente(props: TopbarDocenteProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(props.isDarkMode);
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);
  const [avatar, setAvatar] = useState<string>('/UDH 1.png');
  const [nombreCompleto, setNombreCompleto] = useState<string>('Docente');

  // --- Obtener usuario desde localStorage ---
  useEffect(() => {
    try {
      const storedUsuario = localStorage.getItem('usuario');
      const fotoLocal = localStorage.getItem('foto');
      if (storedUsuario) {
        const parsed = JSON.parse(storedUsuario);
        setUsuario(parsed);

        // Nombre
        const nombre =
          parsed.nombres && parsed.apellidos
            ? `${parsed.nombres} ${parsed.apellidos}`
            : parsed.name || 'Docente';
        setNombreCompleto(nombre);

        // Foto
        setAvatar(parsed.foto || parsed.avatar || fotoLocal || '/UDH 1.png');
      } else if (fotoLocal) {
        setAvatar(fotoLocal);
      }
    } catch (error) {
      console.error('Error al leer datos del usuario:', error);
    }
  }, []);

  // --- Manejo de tema (oscuro/claro) ---
  const toggleTheme = () => {
    const newTheme = isDarkTheme ? 'light' : 'dark';
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
      document.documentElement.className = savedTheme;
    }
  }, []);

  return (
    <header className="topbar-docente">
      {/* Sección izquierda - Logo */}
      <div className="topbar-left">
        <div className="topbar-logo">
          <img
            src={isDarkTheme ? logoUDH : logoUDHLight}
            alt="Universidad de Huánuco"
            className="logo-image"
          />
        </div>
      </div>

      {/* Centro vacío (puedes poner buscador o título si quieres) */}
      <div className="topbar-center"></div>

      {/* Sección derecha */}
      <div className="topbar-right">
        {/* Botón Calendario */}
        <div className="relative group">
          <button className="nav-btn calendario-btn">
            <img src={calendarioIcon} alt="Calendario" className="calendario-icon" />
            <span className="btn-text">Calendario</span>
            <span className="nav-badge">¡Ver!</span>
          </button>
        </div>

        {/* Botón Guía */}
        <div className="relative group">
          <button className="nav-btn guia-btn">
            <img src={pdfIcon} alt="PDF" className="guia-icon" />
            <span className="btn-text">Guía</span>
            <span className="nav-badge">¡Ver!</span>
          </button>
        </div>

        {/* Toggle tema */}
        <label className="theme-toggle">
          <input
            type="checkbox"
            className="theme-checkbox"
            checked={isDarkTheme}
            onChange={toggleTheme}
          />
          <div className="theme-slider"></div>
          <FaSun className="sun-icon" />
          <FaMoon className="moon-icon" />
        </label>

        {/* Avatar del usuario */}
        <div
          className="user-avatar"
          title={`${nombreCompleto} - Docente`}
          onClick={() => setPerfilOpen(!perfilOpen)}
          style={{ cursor: 'pointer' }}
        >
          <img src={avatar} alt="Avatar de usuario" className="avatar-img" />
        </div>

        {/* Dropdown de perfil */}
        <PerfilDropdownDocente
          isOpen={perfilOpen}
          onClose={() => setPerfilOpen(false)}
        />
      </div>
    </header>
  );
}
