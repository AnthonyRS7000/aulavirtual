// Declaraciones globales para TypeScript

declare global {
  interface Window {
    __INITIAL_THEME__?: {
      theme: 'light' | 'dark';
      isDark: boolean;
    };
  }
}

export {};
