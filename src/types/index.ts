// Tipos para autenticación
export interface Curso {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  ciclo: string;
  creditos: number;
  estudiantes: number;
  estado: 'activo' | 'inactivo' | 'archivado';
  fechaCreacion: string;
  ultimaActividad: string;
  codigoAcceso: string;
}

export interface Material {
  id: number;
  titulo: string;
  tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
  fechaSubida: string;
  descargas: number;
  cursoId: number;
}

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  puntuacion: number;
  entregas: number;
  totalEstudiantes: number;
  estado: 'publicada' | 'borrador' | 'cerrada';
  cursoId: number;
}

export interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fijado: boolean;
  cursoId: number;
}
export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  image?: string;
  is_jury?: boolean;
}

export type UserRole = 'estudiante' | 'docente' | 'administrativo' | 'escuela';

// Tipos para navegación
export interface Submenu {
  name: string;
  label: string;
  path: string;
  namecount?: string;
}

export interface Section {
  name: string;
  label: string;
  isOpen: boolean;
  icon: React.ComponentType<any>;
  submenus: Submenu[];
}

// Tipos para sidebar
export interface SidebarState {
  isOpen: boolean;
  isMobile: boolean;
}

// Tipos para counts/notificaciones
export interface Counts {
  pending_solicitudes?: number;
  pending_reviews_thesis?: number;
  pending_reviews_informe?: number;
  pending_offices_adviser?: number;
  pending_offices_thesis_approve?: number;
  [key: string]: number | undefined;
}
