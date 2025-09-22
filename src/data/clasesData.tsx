// src/data/clasesData.ts
export interface Clase {
  id: number;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  aula: string;
  modalidad: 'presencial' | 'virtual' | 'hibrida';
  estudiantes: number;
  color: string;
  estado: 'activa' | 'finalizada' | 'cancelada';
  descripcion: string;
  proximaClase?: string;
  creditos: number;
  semestre: string;
}

export const clasesData: Clase[] = [
  {
    id: 1,
    nombre: "Desarrollo de Software III",
    codigo: "IS301",
    docente: "Dr. Carlos Mendoza",
    horario: "Lunes, Miércoles 14:00-16:00",
    aula: "Lab A-201",
    modalidad: "presencial",
    estudiantes: 28,
    color: "#0066cc",
    estado: "activa",
    descripcion: "Metodologías ágiles, patrones de diseño y arquitecturas modernas.",
    proximaClase: "Lun, 22 Ene 14:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 2,
    nombre: "Inteligencia Artificial",
    codigo: "IS402",
    docente: "Dra. María González",
    horario: "Martes, Jueves 16:00-18:00",
    aula: "Aula Virtual",
    modalidad: "virtual",
    estudiantes: 35,
    color: "#059669",
    estado: "activa",
    descripcion: "Algoritmos de IA, machine learning y redes neuronales aplicadas.",
    proximaClase: "Mar, 23 Ene 16:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 3,
    nombre: "Base de Datos Avanzadas",
    codigo: "IS304",
    docente: "Ing. Roberto Silva",
    horario: "Viernes 09:00-13:00",
    aula: "Lab B-102",
    modalidad: "presencial",
    estudiantes: 25,
    color: "#f59e0b",
    estado: "activa",
    descripcion: "Optimización de consultas, data warehousing y bases de datos NoSQL.",
    proximaClase: "Vie, 26 Ene 09:00",
    creditos: 5,
    semestre: "2024-I"
  },
  {
    id: 4,
    nombre: "Gestión de Proyectos TI",
    codigo: "IS350",
    docente: "MBA Ana Torres",
    horario: "Sábados 08:00-12:00",
    aula: "Aula C-301 / Virtual",
    modalidad: "presencial",
    estudiantes: 32,
    color: "#8b5cf6",
    estado: "activa",
    descripcion: "Metodologías de gestión, liderazgo de equipos y gestión de riesgos en TI.",
    proximaClase: "Sáb, 27 Ene 08:00",
    creditos: 3,
    semestre: "2024-I"
  },
  {
    id: 5,
    nombre: "Matemática Computacional",
    codigo: "MAT205",
    docente: "Dr. Luis Ramírez",
    horario: "Lunes, Miércoles 10:00-12:00",
    aula: "Aula A-105",
    modalidad: "presencial",
    estudiantes: 40,
    color: "#ef4444",
    estado: "activa",
    descripcion: "Algoritmos numéricos, optimización y métodos computacionales avanzados.",
    proximaClase: "Lun, 22 Ene 10:00",
    creditos: 4,
    semestre: "2024-I"
  },
  {
    id: 6,
    nombre: "Ética Profesional",
    codigo: "HUM102",
    docente: "Lic. Patricia Vega",
    horario: "Jueves 18:00-20:00",
    aula: "Aula B-204",
    modalidad: "presencial",
    estudiantes: 45,
    color: "#6b7280",
    estado: "finalizada",
    descripcion: "Principios éticos en la práctica profesional y responsabilidad social.",
    creditos: 2,
    semestre: "2023-II"
  }
];