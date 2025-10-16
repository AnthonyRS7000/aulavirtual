export interface RawTeacher {
  name?: string;
  email?: string;
  userId?: string;
}

export interface RawCourseWork {
  id?: string;
  title?: string;
  description?: string;
  state?: string;
  submissionState?: string;
  [key: string]: any;
}

export interface RawAnnouncement {
  id?: string;
  text?: string;
  creationTime?: string;
  updateTime?: string;
}

export interface RawCourse {
  id: string;
  name?: string;
  section?: string;
  descriptionHeading?: string;
  room?: string;
  ownerId?: string;
  teachers?: RawTeacher[];
  courseWork?: RawCourseWork[];
  announcements?: RawAnnouncement[];
  [key: string]: any;
}

export async function fetchMyCourses(opts?: { token?: string; baseUrl?: string }) {
  const envBase = typeof import.meta !== 'undefined' ? (import.meta.env.VITE_API_URL ?? '') : '';
  const baseRaw = (opts?.baseUrl ?? envBase ?? 'http://127.0.0.1:8000').toString();
  const base = baseRaw.replace(/\/api\/?$/i, '').replace(/\/$/i, '');
  const url = `${base}/api/google/classroom/courses`;

  const headers: Record<string, string> = { Accept: 'application/json' };

  const fetchOptions: RequestInit = {
    method: 'GET',
    headers,
  };

  if (opts?.token) {
    headers['Authorization'] = `Bearer ${opts.token}`;
    fetchOptions.credentials = 'same-origin';
  } else {
    fetchOptions.credentials = 'include'; // para Sanctum
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    const txt = await res.text().catch(() => null);
    const msg = `HTTP ${res.status}: ${txt ?? ''}`;
    throw new Error(msg);
  }

  const payload = await res.json();
  return (payload.courses ?? []) as RawCourse[];
}

export async function getDatosCompletos(opts?: { token?: string; baseUrl?: string }) {
  return fetchMyCourses(opts);
}
