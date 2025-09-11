import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Toggle simple entre light y dark
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative z-10 flex items-center justify-center overflow-hidden focus:outline-none transition-all duration-200 hover:scale-105"
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%', // Forzar círculo perfecto como Copiloto
        background: document.documentElement.classList.contains('dark') 
          ? 'linear-gradient(135deg, #374151 0%, #111827 100%)'
          : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: document.documentElement.classList.contains('dark')
          ? '1px solid #4b5563'
          : '1px solid #d1d5db',
        boxShadow: document.documentElement.classList.contains('dark')
          ? '0 2px 8px rgba(0, 0, 0, 0.3)'
          : '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#111827'
      }}
      title={`Cambiar a tema ${theme === 'light' ? 'oscuro' : 'claro'}`}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: '100%'
      }}>
      </div>
    </button>
  );
}


