// src/api/classroom.ts
export interface Curso {
  id: string;
  nombre: string;
  seccion: string;
}

export interface Tarea {
  id: string;
  titulo: string;
  estado: string;
  fecha_entrega?: string;
}

export interface Evento {
  id: string;
  titulo: string;
  inicio: string;
  descripcion?: string;
}

const apiBase = import.meta.env.VITE_API_URL;

async function apiCall<T>(endpoint: string): Promise<T> {
  const token = localStorage.getItem('auth_token');
  if (!token) throw new Error('Token no disponible. Debes estar autenticado.');

  const response = await fetch(`${apiBase}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    let errorText = `Error ${response.status}`;
    try {
      const errorData = await response.json();
      errorText = errorData.error || errorData.message || errorText;
    } catch {}
    throw new Error(errorText);
  }

  return response.json();
}

// Endpoints específicos
export async function getCursos(): Promise<{ cursos: Curso[] }> {
  return apiCall('/classroom/cursos');
}

export async function getTareas(courseId: string): Promise<{ tareas: Tarea[] }> {
  return apiCall(`/classroom/cursos/${courseId}/tareas`);
}

export async function getEventos(): Promise<{ eventos: Evento[] }> {
  return apiCall('/calendar/eventos');
}

/**
 * Devuelve { perfil?, cursos }
 * Intenta llamar a /classroom/datos-completos si existe en el backend,
 * si no, hace fallback a getCursos() y a /classroom/perfil cuando esté disponible.
 */
export async function getDatosCompletos(): Promise<{ perfil?: any; cursos: any[] }> {
  try {
    const resp: any = await apiCall('/classroom/datos-completos');
    return {
      perfil: resp.perfil ?? resp.data?.perfil ?? resp.user ?? resp.userInfo,
      cursos: resp.cursos ?? resp.courses ?? resp.data?.cursos ?? resp.data?.courses ?? []
    };
  } catch (err) {
    // fallback: pedir cursos y opcionalmente perfil
    try {
      const cursosResp: any = await getCursos();
      let perfil: any = undefined;
      try {
        const p: any = await apiCall('/classroom/perfil');
        perfil = p.perfil ?? p;
      } catch {
        // perfil no disponible
      }
      return { perfil, cursos: cursosResp.cursos ?? cursosResp.courses ?? cursosResp.data ?? [] };
    } catch (e) {
      throw e;
    }
  }
}
