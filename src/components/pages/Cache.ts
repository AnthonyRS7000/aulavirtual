// Sistema de caché simple para almacenar datos temporalmente
interface CacheItem {
  data: any;
  timestamp: number;
  expirationMinutes: number;
}

class CacheService {
  private cache: Map<string, CacheItem> = new Map();

  /**
   * Almacena datos en el caché
   * @param key - Clave única para identificar los datos
   * @param data - Datos a almacenar
   * @param expirationMinutes - Tiempo de expiración en minutos
   */
  set(key: string, data: any, expirationMinutes: number = 10): void {
    const item: CacheItem = {
      data,
      timestamp: Date.now(),
      expirationMinutes,
    };
    this.cache.set(key, item);
  }

  /**
   * Recupera datos del caché si no han expirado
   * @param key - Clave de los datos a recuperar
   * @returns Los datos si existen y no han expirado, null en caso contrario
   */
  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }

    const now = Date.now();
    const expirationTime = item.timestamp + item.expirationMinutes * 60 * 1000;

    if (now > expirationTime) {
      // El caché ha expirado, eliminarlo
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  /**
   * Elimina una entrada específica del caché
   * @param key - Clave de los datos a eliminar
   */
  delete(key: string): void {
    this.cache.delete(key);
  }

  /**
   * Limpia todo el caché
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Verifica si una clave existe en el caché y no ha expirado
   * @param key - Clave a verificar
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

// Exportar instancia única del servicio de caché
export const cache = new CacheService();
