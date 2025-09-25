// src/features/estudiante/pages/ClaseDetalle.tsx
import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useClases } from '../../../context/ClasesContext';
import '../components/ClaseDetalle.css';

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
}

export default function ClaseDetalle() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'recursos' | 'tareas' | 'notas' | 'asistencia' | 'anuncios'>('recursos');

  // ⚡ Aquí deberías traer la info desde tu backend o contexto global
const { clases, loading } = useClases();
if (loading) {
  return <p>Cargando clase...</p>;
}

const clase = clases.find((c: any) => c.id === id);



  if (!clase) {
  return (
    <div className="clase-no-encontrada">
      <p>⚠️ Clase no encontrada</p>
      <Link to="/estudiante/clases">Volver a mis clases</Link>
    </div>
  );
}


  return (
    <div className="clase-detalle">
        <div className="clase-banner" style={{ backgroundColor: clase.color }}>
        <h1>{clase.nombre}</h1>
        <span className="codigo">{clase.codigo}</span>
      </div>
      <header className="clase-header">
        <div className="clase-info-left">
          <p><strong>Docente:</strong> {clase.docente}</p>
          <p><strong>Horario:</strong> {clase.horario}</p>
        </div>
        <div className="clase-info-right">
          <p><strong>Créditos:</strong> {clase.creditos}</p>
          <p><strong>Semestre:</strong> {clase.semestre}</p>
        </div>
      </header>

      {clase.aulas && clase.aulas.length > 0 && (
        <div className="clase-aulas">
          <strong>Salones:</strong>
          <ul>
            {clase.aulas.map((aula: string, i: number) => (
              <li key={i}>{aula}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="clase-descripcion">
        <p>{clase.descripcion}</p>
      </div>

      <section className="clase-tabs">
        <nav>
          {['recursos', 'tareas', 'notas', 'asistencia', 'anuncios'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab as any)}
            >
              {tab === 'recursos' && '📚 Recursos'}
              {tab === 'tareas' && '📝 Tareas'}
              {tab === 'notas' && '🎯 Notas'}
              {tab === 'asistencia' && '✅ Asistencia'}
              {tab === 'anuncios' && '📢 Anuncios'}
            </button>
          ))}
        </nav>
      </section>

      {/* 🔹 Contenido dinámico */}
      <section className="clase-contenido">
        {activeTab === 'recursos' && <p>📚 Aquí van los recursos subidos por el docente.</p>}
        {activeTab === 'tareas' && <p>📝 Lista de tareas, entregas y fechas límite.</p>}
        {activeTab === 'notas' && <p>🎯 Calificaciones y retroalimentación.</p>}
        {activeTab === 'asistencia' && <p>✅ Registro de asistencia por clase.</p>}
        {activeTab === 'anuncios' && <p>📢 Comunicados y novedades de la clase.</p>}
      </section>

      <section className="clase-estudiantes">
        <h2>Lista de Estudiantes</h2>
        <ul>
          <li><span className="avatar">A</span> Ana Torres <span className="email">2020210688@udh.edu.pe</span></li>
          <li><span className="avatar">L</span> Luis Ramírez <span className="email">2020210689@udh.edu.pe</span></li>
          <li><span className="avatar">P</span> Patricia Vega <span className="email">2020210690@udh.edu.pe</span></li>
        </ul>
      </section>
    </div>
  );
}
