import { useTheme } from '../hooks/useTheme';
import iconoSol from '../assets/temaClaro.svg';
import iconoLuna from '../assets/temaOscuro.svg';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
  const iconColor = isDark ? '#e2e8f0' : '#0f172a';

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={`Tema actual: ${theme === 'dark' ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      aria-label={`Tema actual: ${theme === 'dark' ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      style={{
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: isDark ? '0 4px 15px rgba(0, 0, 0, 0.2)' : '0 4px 10px rgba(0,0,0,0.1)',
        outline: 'none',
        boxSizing: 'border-box',
        padding: 0,
      }}
    >
      <img
        src={isDark ? iconoLuna : iconoSol}
        alt={isDark ? 'Modo Oscuro' : 'Modo Claro'}
        style={{
          width: '20px',
          height: '20px',
          objectFit: 'contain',
          filter: isDark ? 'invert(1)' : 'none', 
        }}
      />
    </button>
  );
}


