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
export interface ConteoTareas {
  pendientes: number;
  entregadas: number;
  en_revision: number;
  calificadas: number;
}

export interface Evento {
  id: string;
  titulo: string;
  inicio: string;
  descripcion?: string;
}
export interface CursoBasico {
  id: string;
  nombre: string;
  codigo: string;
  seccion: string;
  docente: string;
  foto_docente: string | null;
  num_tareas: number;
  num_anuncios: number;
  link: string;
}

interface TareaPendientePorCurso {
  curso_id: string;
  nombre_curso: string;
  docente_id: string;
  docente: string;
  foto_docente: string;
  correo_docente: string;
  tareas_pendientes: {
    tarea_id: string;
    titulo: string;
    descripcion: string;
    fecha_entrega: string;
    estado: string;
    submission_id: string; // ← Asegúrate de que esto venga del backend
  }[];
}
export interface CursoDocente {
  id: string;
  nombre: string;
  codigo: string;
  seccion: string;
  link: string;
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

// Nuevo método
export async function getCursosBasicos(): Promise<CursoBasico[]> {
  return apiCall('/classroom/cursos-basicos');
}
export async function getTareasPendientes(): Promise<Tarea[]> {
  return apiCall('/classroom/tareas-pendientes');
}

export async function getConteoTareas(): Promise<ConteoTareas> {
  return apiCall('/classroom/tareas-contar');
}
export async function getTodasLasTareas(estado?: string): Promise<Tarea[]> {
  const endpoint = estado
    ? `/classroom/tareas?estado=${encodeURIComponent(estado)}`
    : '/classroom/tareas';
  return apiCall(endpoint);
}
// DOCENTE
export async function getCursosDocente(): Promise<CursoDocente[]> {
  return apiCall('/classroom/docente/cursos');
}