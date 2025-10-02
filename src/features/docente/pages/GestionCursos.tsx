import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

// Importar los nuevos componentes
import { CursoCardDocente } from '../components/CursoCardDocente';
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

  const editarCurso = (id: number) => {
    setCursoSeleccionado(id);
    setModalActivo('editar');
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

  const volverLista = () => {
    setVistaActual('lista');
    setCursoSeleccionado(null);
    setTareaSeleccionada(null);
    setAnuncioSeleccionado(null);
  };

  const abrirModal = (tipo: 'crear' | 'material' | 'tarea' | 'anuncio') => {
    setModalActivo(tipo);
  };

  const cerrarModal = () => {
    setModalActivo(null);
    setCursoSeleccionado(null);
  };

  // Función para guardar datos según el tipo
  const guardarDatos = (datos: any) => {
    if (modalActivo === 'crear') {
      // Crear nuevo curso
      const nuevoCurso: Curso = {
        id: Date.now(),
        codigo: datos.codigo,
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        ciclo: datos.ciclo,
        creditos: datos.creditos,
        estudiantes: 0,
        estado: 'activo',
        fechaCreacion: new Date().toISOString().split('T')[0],
        ultimaActividad: 'Recién creado',
        codigoAcceso: datos.codigo.toUpperCase() + '2025'
      };
      setCursos([...cursos, nuevoCurso]);
      
    } else if (modalActivo === 'editar' && cursoSeleccionado) {
      // Editar curso existente
      setCursos(cursos.map(curso => 
        curso.id === cursoSeleccionado 
          ? { ...curso, ...datos }
          : curso
      ));
      
    } else if (modalActivo === 'material' && cursoSeleccionado) {
      // Agregar nuevo material
      const nuevoMaterial: Material = {
        id: Date.now(),
        titulo: datos.titulo,
        tipo: datos.tipo,
        fechaSubida: new Date().toISOString().split('T')[0],
        descargas: 0,
        cursoId: cursoSeleccionado
      };
      setMateriales([...materiales, nuevoMaterial]);
      
    } else if (modalActivo === 'tarea' && cursoSeleccionado) {
      // Agregar nueva tarea
      const nuevaTarea: Tarea = {
        id: Date.now(),
        titulo: datos.titulo,
        descripcion: datos.descripcion,
        fechaLimite: datos.fechaLimite,
        puntuacion: datos.puntuacion,
        entregas: 0,
        totalEstudiantes: cursos.find(c => c.id === cursoSeleccionado)?.estudiantes || 0,
        estado: 'publicada',
        cursoId: cursoSeleccionado
      };
      setTareas([...tareas, nuevaTarea]);
      
    } else if (modalActivo === 'anuncio' && cursoSeleccionado) {
      // Agregar nuevo anuncio
      const nuevoAnuncio: Anuncio = {
        id: Date.now(),
        titulo: datos.titulo,
        contenido: datos.contenido,
        fecha: new Date().toISOString().split('T')[0],
        fijado: datos.fijado,
        cursoId: cursoSeleccionado
      };
      setAnuncios([...anuncios, nuevoAnuncio]);
    }
    
    cerrarModal();
  };

  // ✅ NUEVAS VISTAS - Vista detalle de tarea
  if (vistaActual === 'tarea-detalle' && tareaSeleccionada && cursoSeleccionado) {
    const tarea = tareas.find(t => t.id === tareaSeleccionada);
    const curso = cursos.find(c => c.id === cursoSeleccionado);
    
    if (!tarea || !curso) {
      setVistaActual('detalle');
      return null;
    }

    return (
      <TareaDetalle 
        tarea={tarea}
        curso={curso}
        onVolver={volverDetalleCurso}
      />
    );
  }

  // ✅ NUEVAS VISTAS - Vista detalle de anuncio
  if (vistaActual === 'anuncio-detalle' && anuncioSeleccionado && cursoSeleccionado) {
    const anuncio = anuncios.find(a => a.id === anuncioSeleccionado);
    const curso = cursos.find(c => c.id === cursoSeleccionado);
    
    if (!anuncio || !curso) {
      setVistaActual('detalle');
      return null;
    }

    return (
      <AnuncioDetalle 
        anuncio={anuncio}
        curso={curso}
        onVolver={volverDetalleCurso}
      />
    );
  }

  // Si está en vista detalle, mostrar CursoDetalle
  if (vistaActual === 'detalle' && cursoSeleccionado) {
    const curso = cursos.find(c => c.id === cursoSeleccionado);
    if (!curso) {
      // Si no encuentra el curso, volver a la lista
      setVistaActual('lista');
      setCursoSeleccionado(null);
      return null;
    }

    return (
      <>
        <CursoDetalle 
          curso={curso}
          onVolver={volverLista}
          onAbrirModal={abrirModal}
          onEntrarTarea={entrarTarea}      // ✅ Nueva función
          onEntrarAnuncio={entrarAnuncio}  // ✅ Nueva función
          // Pasar datos filtrados por curso
          materiales={materiales.filter(m => m.cursoId === curso.id)}
          tareas={tareas.filter(t => t.cursoId === curso.id)}
          anuncios={anuncios.filter(a => a.cursoId === curso.id)}
        />
        
        {/* Modal para crear material/tarea/anuncio */}
        <ModalesDocente
          modalActivo={modalActivo}
          onCerrar={cerrarModal}
          onGuardar={guardarDatos}
        />
      </>
    );
  }

  // Vista lista de cursos
  return (
    <div className="gestion-cursos-usil">
      <div className="cursos-container">
        
        {/* Header principal */}
        <div className="cursos-header">
          <div className="header-content">
            <h1>Gestión de Cursos</h1>
            <p>Administra todos tus cursos desde un solo lugar</p>
          </div>
          <button 
            className="btn-crear-principal" 
            onClick={() => abrirModal('crear')}
          >
            <FaPlus />
            Crear Nuevo Curso
          </button>
        </div>

        {/* Grid de cursos */}
        <div className="cursos-grid">
          {cursos.map(curso => (
            <CursoCardDocente
              key={curso.id}
              curso={curso}
              onEntrar={entrarCurso}
              onEditar={editarCurso}
              onEliminar={eliminarCurso}
            />
          ))}

          {/* Card para crear nuevo curso */}
          <div 
            className="curso-card crear-card" 
            onClick={() => abrirModal('crear')}
          >
            <div className="crear-content">
              <FaPlus className="crear-icon" />
              <h3>Crear Nuevo Curso</h3>
              <p>Configura un nuevo curso para tus estudiantes</p>
            </div>
          </div>
        </div>

        {/* Mensaje si no hay cursos */}
        {cursos.length === 0 && (
          <div className="empty-state">
            <h3>No tienes cursos creados</h3>
            <p>Crea tu primer curso para comenzar</p>
            <button 
              className="btn-crear-principal" 
              onClick={() => abrirModal('crear')}
            >
              <FaPlus />
              Crear Mi Primer Curso
            </button>
          </div>
        )}
      </div>

      {/* Modal para crear/editar curso */}
      <ModalesDocente
        modalActivo={modalActivo}
        onCerrar={cerrarModal}
        onGuardar={guardarDatos}
      />
    </div>
  );
}