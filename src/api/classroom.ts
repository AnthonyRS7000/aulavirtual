export interface RawTeacher { name?: string; email?: string; userId?: string; }
export interface RawCourseWork { id?: string; title?: string; description?: string; state?: string; submissionState?: string; [key: string]: any }
export interface RawAnnouncement { id?: string; text?: string; creationTime?: string; updateTime?: string }
export interface RawCourse {
  id: string;
  name?: string;
  teachers?: RawTeacher[];
  courseWork?: RawCourseWork[];
  announcements?: RawAnnouncement[];
  [key: string]: any;
}

export async function fetchMyCourses(opts?: { token?: string, baseUrl?: string }) {
  // baseRaw puede venir por opts o por VITE_API_URL; normalizar para evitar duplicar /api
  const envBase = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_API_URL ?? '') : '';
  const baseRaw = (opts?.baseUrl ?? envBase ?? 'http://127.0.0.1:8000').toString();

  // eliminar sufijo '/api' y cualquier '/' final
  const base = baseRaw.replace(/\/api\/?$/i, '').replace(/\/$/i, '');

  const url = `${base}/api/google/classroom/courses`;

  const headers: Record<string,string> = { 'Accept': 'application/json' };

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers
  };

  if (opts?.token) {
    headers['Authorization'] = `Bearer ${opts.token}`;
    // cuando se usa Bearer token normalmente NO se usan cookies
    fetchOptions.credentials = 'same-origin';
  } else {
    // si tu backend usa Sanctum con cookie (SPA), enviar credenciales
    fetchOptions.credentials = 'include';
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    let msg = `HTTP ${res.status}`;
    try {
      const j = txt ? JSON.parse(txt) : null;
      msg = j?.error ? (typeof j.error === 'string' ? j.error : JSON.stringify(j.error)) : txt ?? msg;
    } catch (e) { msg = txt ?? msg; }
    throw new Error(msg);
  }

  const payload = await res.json();
  return (payload.courses ?? []) as RawCourse[];
}

// nuevo alias/export compatible con import esperado en tu componente
export async function getDatosCompletos(opts?: { token?: string, baseUrl?: string }) {
  return fetchMyCourses(opts);
}