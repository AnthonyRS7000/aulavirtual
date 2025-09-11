import React from 'react';
import Layout from '../../../components/Layout';
import ClaseCard from '../components/ClaseCard';
import TareaCard from '../components/TareaCard';
// Puedes agregar otros componentes como NotasResumen, HorarioHoy, etc.

export default function InicioEstudiante() {
  const cursos = [
    { id: 1, nombre: 'Programación I', docente: 'Ing. Ríos', color: '#3ec5ad' },
    { id: 2, nombre: 'Física I', docente: 'Lic. Castro', color: '#2e7caa' },
    { id: 3, nombre: 'Ética Profesional', docente: 'Dra. Morales', color: '#e3a00a' },
  ];

  const tareas = [
    { id: 1, titulo: 'Ensayo sobre ética profesional', curso: 'Ética Profesional', fechaEntrega: '2025-09-14' },
    { id: 2, titulo: 'Cuestionario 2', curso: 'Programación I', fechaEntrega: '2025-09-15' },
  ];

  return (
    <Layout>
      <div className="inicio-estudiante-container">
        <h2 className="titulo-bienvenida">👋 ¡Hola, Armando!</h2>
        <p className="subtitulo">Estas son tus actividades más importantes del día.</p>

        <div className="contenido-grid-pc">
          <div className="columna-pc">
            <section className="seccion">
              <h3 className="seccion-titulo">📚 Cursos activos</h3>
              <div className="cursos-grid">
                {cursos.map((curso) => (
                  <ClaseCard key={curso.id} curso={curso} />
                ))}
              </div>
            </section>
          </div>

          <div className="columna-pc">
            <section className="seccion">
              <h3 className="seccion-titulo">📝 Tareas y evaluaciones pendientes</h3>
              <div className="tareas-lista">
                {tareas.map((tarea) => (
                  <TareaCard key={tarea.id} tarea={tarea} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
