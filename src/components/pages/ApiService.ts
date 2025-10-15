import api from "../../lib/axios";

/**
 * Servicio para realizar llamadas a la API
 */
export class ApiService {
  /**
   * Realiza una petición GET
   * @param endpoint - Ruta del endpoint (ej: '/estudiantes/notas')
   * @param params - Parámetros opcionales de la consulta
   */
  static async get(endpoint: string, params?: Record<string, any>) {
    try {
      const response = await api.get(endpoint, { params });
      return {
        data: response.data,
        status: "success",
      };
    } catch (error: any) {
      console.error(`Error en GET ${endpoint}:`, error);
      return {
        data: null,
        status: "error",
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Realiza una petición POST
   * @param endpoint - Ruta del endpoint
   * @param data - Datos a enviar
   */
  static async post(endpoint: string, data: any) {
    try {
      const response = await api.post(endpoint, data);
      return {
        data: response.data,
        status: "success",
      };
    } catch (error: any) {
      console.error(`Error en POST ${endpoint}:`, error);
      return {
        data: null,
        status: "error",
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Realiza una petición PUT
   * @param endpoint - Ruta del endpoint
   * @param data - Datos a actualizar
   */
  static async put(endpoint: string, data: any) {
    try {
      const response = await api.put(endpoint, data);
      return {
        data: response.data,
        status: "success",
      };
    } catch (error: any) {
      console.error(`Error en PUT ${endpoint}:`, error);
      return {
        data: null,
        status: "error",
        error: error.response?.data?.message || error.message,
      };
    }
  }

  /**
   * Realiza una petición DELETE
   * @param endpoint - Ruta del endpoint
   */
  static async delete(endpoint: string) {
    try {
      const response = await api.delete(endpoint);
      return {
        data: response.data,
        status: "success",
      };
    } catch (error: any) {
      console.error(`Error en DELETE ${endpoint}:`, error);
      return {
        data: null,
        status: "error",
        error: error.response?.data?.message || error.message,
      };
    }
  }
}
