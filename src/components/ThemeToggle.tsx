import { useTheme } from '../hooks/useTheme';
import { IoSunny, IoMoon } from 'react-icons/io5';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={`Tema actual: ${theme === 'dark' ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      aria-label={`Tema actual: ${theme === 'dark' ? 'Oscuro' : 'Claro'} - Click para cambiar`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '44px',
        minHeight: '44px',
        background: 'rgba(255, 255, 255, 0.1)',
        border: '2px solid rgba(52, 152, 219, 0.5)',
        borderRadius: '12px',
        color: '#ffffff',
        cursor: 'pointer'
      }}
    >
      {theme === 'dark' ? (
        <IoMoon 
          className="theme-icon" 
          style={{ 
            width: '24px', 
            height: '24px', 
            color: '#e2e8f0'
          }} 
        />
      ) : (
        <IoSunny 
          className="theme-icon" 
          style={{ 
            width: '24px', 
            height: '24px', 
            color: '#fbbf24'
          }} 
        />
      )}
    </button>
  );
}


