import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

// Importar los nuevos componentes
import CursoCardDocente from '../components/CursoCardDocente';
import { CursoDetalle } from '../components/CursoDetalleDocente';
import { ModalesDocente } from '../components/ModalesDocente';
import { TareaDetalle } from '../components/TareaDetalle';
import { AnuncioDetalle } from '../components/AnuncioDetalle';

// Importar estilos
import '../css/GestionCursos.css';

// Interfaces (mantener las que ya tienes)
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

interface Material {
  id: number;
  titulo: string;
  tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
  fechaSubida: string;
  descargas: number;
  cursoId: number; // Agregar para relacionar con curso
}

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  puntuacion: number;
  entregas: number;
  totalEstudiantes: number;
  estado: 'publicada' | 'borrador' | 'cerrada';
  cursoId: number; // Agregar para relacionar con curso
}

interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
  fijado: boolean;
  cursoId: number; // Agregar para relacionar con curso
}

// Función para asignar colores según el nombre del curso
function getColorByCurso(nombre: string): string {
  // Puedes personalizar los colores según el nombre
  if (nombre.toLowerCase().includes('objetos')) return '#4F8A8B';
  if (nombre.toLowerCase().includes('base de datos')) return '#F9A826';
  // Color por defecto
  return '#6C63FF';
}

export default function GestionCursos() {
  // Estados principales - ✅ CORREGIDO: Solo una declaración
  const [vistaActual, setVistaActual] = useState<'lista' | 'detalle' | 'tarea-detalle' | 'anuncio-detalle'>('lista');
  const [cursoSeleccionado, setCursoSeleccionado] = useState<number | null>(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<number | null>(null);
  const [anuncioSeleccionado, setAnuncioSeleccionado] = useState<number | null>(null);
  const [modalActivo, setModalActivo] = useState<'crear' | 'editar' | 'material' | 'tarea' | 'anuncio' | null>(null);

  // Estados de datos
  const [cursos, setCursos] = useState<Curso[]>([
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

  const [materiales, setMateriales] = useState<Material[]>([
    {
      id: 1,
      titulo: "Introducción a POO - Slides",
      tipo: 'presentacion',
      fechaSubida: "2025-01-20",
      descargas: 24,
      cursoId: 1
    },
    {
      id: 2,
      titulo: "Tutorial Java Básico",
      tipo: 'video',
      fechaSubida: "2025-01-18",
      descargas: 18,
      cursoId: 1
    }
  ]);

  const [tareas, setTareas] = useState<Tarea[]>([
    {
      id: 1,
      titulo: "Ejercicios de Herencia",
      descripcion: "Implementar clases con herencia en Java. Crear una jerarquía de clases que demuestre los conceptos de herencia, polimorfismo y encapsulación.",
      fechaLimite: "2025-02-15",
      puntuacion: 20,
      entregas: 15,
      totalEstudiantes: 28,
      estado: 'publicada',
      cursoId: 1
    },
    {
      id: 2,
      titulo: "Mapas de valor (2)",
      descripcion: "Crear mapas de valor para diferentes tipos de clientes de una aplicación empresarial.",
      fechaLimite: "2025-02-20",
      puntuacion: 15,
      entregas: 8,
      totalEstudiantes: 28,
      estado: 'publicada',
      cursoId: 1
    }
  ]);

  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: 1,
      titulo: "Examen Parcial - Fecha Confirmada",
      contenido: "El examen parcial se realizará el 15 de febrero. Revisar los temas del syllabus.\n\nTemas a estudiar:\n- Conceptos básicos de POO\n- Herencia y Polimorfismo\n- Encapsulación\n- Abstracción\n\nEl examen será presencial en el aula 101.",
      fecha: "2025-01-22",
      fijado: true,
      cursoId: 1
    }
  ]);

  // ✅ NUEVAS FUNCIONES para navegación
  // Funciones para entrar a tareas y anuncios
  const entrarTarea = (tareaId: number) => {
    setTareaSeleccionada(tareaId);
    setVistaActual('tarea-detalle');
  };

  const entrarAnuncio = (anuncioId: number) => {
    setAnuncioSeleccionado(anuncioId);
    setVistaActual('anuncio-detalle');
  };

  const volverDetalleCurso = () => {
    setVistaActual('detalle');
    setTareaSeleccionada(null);
    setAnuncioSeleccionado(null);
  };

  // Funciones para manejar cursos
  const entrarCurso = (id: number) => {
    setCursoSeleccionado(id);
    setVistaActual('detalle');
  };


  const eliminarCurso = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este curso? Esta acción no se puede deshacer.')) {
      setCursos(cursos.filter(curso => curso.id !== id));
      // También eliminar materiales, tareas y anuncios relacionados
      setMateriales(materiales.filter(material => material.cursoId !== id));
      setTareas(tareas.filter(tarea => tarea.cursoId !== id));
      setAnuncios(anuncios.filter(anuncio => anuncio.cursoId !== id));
    }
  };

  

  // Vista lista de cursos
  return (
    <div className="gestion-cursos-usil">
      <div className="cursos-container">

        {/* Header principal */}
        <div className="cursos-header">
          <div className="header-content">
            <h1> Gestion de Cursos</h1>
          </div>
        </div>

        {/* Grid de cursos */}
        <div className="cursos-grid">
          {cursos.map((curso) => (
            <CursoCardDocente
              key={curso.id}
              {...curso}
              color={getColorByCurso(curso.nombre)} // Función para asignar colores
              onEntrarCurso={entrarCurso}
            />
          ))}

        </div>

        {/* Mensaje si no hay cursos */}
        {cursos.length === 0 && (
          <div className="empty-state">
            <h3>No tienes cursos creados</h3>
            
          </div>
        )}
      </div>

     
    </div>
  );
}