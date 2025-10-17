import { useTheme } from '../hooks/useTheme';
import iconoSol from '../assets/temaClaro.svg';
import iconoLuna from '../assets/temaOscuro.svg';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // 🎨 Estilos coherentes con .topbar-aula-btn
  const baseStyles: React.CSSProperties = {
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    outline: 'none',
    boxSizing: 'border-box',
    padding: 0,
  };

  const lightStyles: React.CSSProperties = {
    background: 'rgba(0, 0, 0, 0.05)',
    border: '1.3px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
    color: '#111827',
  };

  const darkStyles: React.CSSProperties = {
    background: 'linear-gradient(135deg, #374151 0%, #111827 100%)',
    border: '1.3px solid #4b5563',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
    color: '#e6eef3',
  };

  const hoverLight = {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
  };

  const hoverDark = {
    background: 'linear-gradient(135deg, #3b4753 0%, #0f1720 100%)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 15px rgba(2, 6, 23, 0.5)',
  };

  return (
    <button
      onClick={toggleTheme}
      title={`Tema actual: ${isDark ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      aria-label={`Tema actual: ${isDark ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      className="theme-toggle-btn"
      style={{
        ...baseStyles,
        ...(isDark ? darkStyles : lightStyles),
      }}
      onMouseEnter={e =>
        Object.assign(e.currentTarget.style, isDark ? hoverDark : hoverLight)
      }
      onMouseLeave={e =>
        Object.assign(e.currentTarget.style, isDark ? darkStyles : lightStyles)
      }
      onFocus={e =>
        (e.currentTarget.style.boxShadow =
          '0 0 0 3px rgba(241, 204, 122, 0.1), 0 4px 10px rgba(16, 24, 40, 0.15)')
      }
      onBlur={e =>
        Object.assign(e.currentTarget.style, isDark ? darkStyles : lightStyles)
      }
    >
      <img
        src={isDark ? iconoLuna : iconoSol}
        alt={isDark ? 'Modo Oscuro' : 'Modo Claro'}
        style={{
          width: '20px',
          height: '20px',
          objectFit: 'contain',
          filter: isDark ? 'invert(0.9)' : 'none',
          transition: 'transform 0.3s ease',
        }}
      />
    </button>
  );
}
