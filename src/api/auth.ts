import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  rol: string;
  image?: string | null;
}

// Para sincronización entre ventanas
const channel = new BroadcastChannel('auth_channel');

// Normaliza distintos formatos guardados en localStorage al shape User
function normalizeStoredUser(raw: any): User | null {
  if (!raw) return null;
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return {
    id: raw.id ?? raw.user_id ?? 0,
    nombres: raw.nombres ?? raw.name ?? raw.first_name ?? '',
    apellidos: raw.apellidos ?? raw.last_name ?? '',
    email: raw.email ?? raw.mail ?? '',
    rol: raw.rol ?? raw.role ?? '',
    image: raw.image ?? raw.foto ?? raw.picture ?? null,
  };
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  
  // Inicializar desde localStorage
  useEffect(() => {
    console.log('[useAuth] init - reading multiple storage keys');
    // buscar token en varias keys posibles
    const savedToken = localStorage.getItem('auth_token');
    const altToken = localStorage.getItem('token') || localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user_data');
    const altUser = localStorage.getItem('usuario') || localStorage.getItem('user') || localStorage.getItem('datos_udh');
    const finalToken = savedToken || altToken;
    const finalUserRaw = savedUser || altUser;
    const normalized = normalizeStoredUser(finalUserRaw);
    if (finalToken && normalized) {
      setToken(finalToken);
      setUser(normalized);
      axios.defaults.headers.common['Authorization'] = `Bearer ${finalToken}`;
      console.log('[useAuth] restored user from storage', normalized);
    } else {
      console.log('[useAuth] no stored auth found');
    }

    // Escuchar otros frontends
    channel.onmessage = (event) => {
      if (event.data.type === 'LOGIN') {
        const t = event.data.token;
        const u = event.data.user;
        const normalizedU = normalizeStoredUser(u) ?? u;
        setToken(t);
        setUser(normalizedU);
        localStorage.setItem('auth_token', t);
        localStorage.setItem('user_data', JSON.stringify(normalizedU));
        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`;
      } else if (event.data.type === 'LOGOUT') {
        setToken(null);
        setUser(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        delete axios.defaults.headers.common['Authorization'];
      }
    };
  }, []);

  const login = (token: string, user: User) => {
    const normalized = normalizeStoredUser(user) ?? user;
    setToken(token);
    setUser(normalized);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(normalized));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    channel.postMessage({ type: 'LOGIN', token, user: normalized });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    delete axios.defaults.headers.common['Authorization'];
    channel.postMessage({ type: 'LOGOUT' });
  };

  return { user, token, login, logout };
}
