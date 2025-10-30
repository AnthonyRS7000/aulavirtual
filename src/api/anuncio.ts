export interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  tipo: string;
  imagen?: string | null;
  archivo_adjunto?: string | null;
  link_redireccion?: string | null;
  created_at?: string;
  updated_at?: string;
}

const apiBase = import.meta.env.VITE_API_URL.replace(/\/$/, ""); // elimina la última barra si la hay

async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("auth_token");
  if (!token) throw new Error("Token no disponible. Debes estar autenticado.");

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${apiBase}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      ...(options.body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }),
      ...options.headers,
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


/**
 * Obtener todos los anuncios
 */
export async function getAnuncios(): Promise<Anuncio[]> {
  return apiCall("/anuncios");
}

/**
 * Obtener un anuncio específico por ID
 */
export async function getAnuncio(id: number): Promise<Anuncio> {
  return apiCall(`/anuncios/${id}`);
}

/**
 * Crear un nuevo anuncio
 */
export async function createAnuncio(data: FormData | Partial<Anuncio>): Promise<Anuncio> {
  const isFormData = data instanceof FormData;
  return apiCall("/anuncios", {
    method: "POST",
    body: isFormData ? data : JSON.stringify(data),
  });
}


/**
 * Actualizar un anuncio existente
 */
export async function updateAnuncio(id: number, data: FormData | Partial<Anuncio>): Promise<Anuncio> {
  const isFormData = data instanceof FormData;
  return apiCall(`/anuncios/${id}`, {
    method: "PUT",
    body: isFormData ? data : JSON.stringify(data),
  });
}

/**
 * Eliminar un anuncio
 */
export async function deleteAnuncio(id: number): Promise<{ message: string }> {
  return apiCall(`/anuncios/${id}`, {
    method: "DELETE",
  });
}
