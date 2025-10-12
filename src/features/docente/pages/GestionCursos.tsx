import { useState } from 'react';
import CursoCardDocente from '../components/CursoCardDocente';
import '../css/GestionCursos.css';

// Interfaces principales
interface Curso {
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

// Función para asignar colores según el nombre del curso
function getColorByCurso(nombre: string): string {
  if (nombre.toLowerCase().includes('objetos')) return '#4F8A8B';
  if (nombre.toLowerCase().includes('base de datos')) return '#F9A826';
  return '#6C63FF'; // Color por defecto
}

export default function GestionCursos() {
  // Estados principales - SOLO los necesarios
  const [cursos] = useState<Curso[]>([
    {
      id: 1,
      codigo: "IS-301",
      nombre: "Programación Orientada a Objetos",
      descripcion: "Curso enfocado en los principios de la programación orientada a objetos utilizando Java",
      ciclo: "2025-2",
      creditos: 4,
      estudiantes: 28,
      estado: 'activo',
      fechaCreacion: "2025-01-15",
      ultimaActividad: "Hace 2 horas",
      codigoAcceso: "POO2025"
    },
    {
      id: 2,
      codigo: "IS-302",
      nombre: "Base de Datos I",
      descripcion: "Fundamentos de bases de datos relacionales y SQL",
      ciclo: "2025-2",
      creditos: 3,
      estudiantes: 25,
      estado: 'activo',
      fechaCreacion: "2025-01-15",
      ultimaActividad: "Hace 1 día",
      codigoAcceso: "BD2025"
    }
  ]);

  // Función para entrar a un curso (navegación por React Router)
  const entrarCurso = (id: number) => {
    console.log('Entrando al curso:', id);
    // Aquí podrías usar navigate('/docente/cursos/' + id) si usas React Router
    // O cambiar a una vista de detalle si manejas todo en el mismo componente
  };

  return (
    
      <div className="cursos-container">

        {/* Header principal */}
        <div className="cursos-header">
          <div className="header-content">
            <h1>Gestión de Cursos</h1>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <CursoCardDocente
              key={curso.id}
              {...curso}
              color={getColorByCurso(curso.nombre)}
              onEntrarCurso={entrarCurso}
            />
          ))}
        </div>

        {/* Mensaje si no hay cursos */}
        {cursos.length === 0 && (
          <div className="empty-state">
            <h3>No tienes cursos creados</h3>
            <p>Comienza creando tu primer curso</p>
          </div>
        )}
      </div>
    
  );
}