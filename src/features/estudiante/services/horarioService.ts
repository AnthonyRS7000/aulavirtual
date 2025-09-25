import api from "../../../lib/axios";

export const getHorario = async (codigoAlumno: string, semestre: string) => {
  const response = await api.get(`/horario/${codigoAlumno}/${semestre}`);
  return response.data.data; // solo los cursos
};