import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import '../components/ClaseDetalle.css';

// 🔹 Mismo tipo que en Clases.tsx
interface Clase {
  id: string;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  creditos: number;
  semestre: string;
  descripcion: string;
  modalidad: string;
  estado: string;
  color: string;
  aulas?: string[];
}

export default function ClaseDetalle() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'recursos' | 'tareas' | 'notas' | 'asistencia' | 'anuncios'>('recursos');

  // 🔹 Clases "mockeadas" (idénticas a Clases.tsx)
  const clases: Clase[] = [
    {
      id: "1",
      nombre: "Programación Web",
      codigo: "INF-301",
      docente: "Ing. Juan Pérez",
      horario: "Lun y Mié 10:00 - 12:00",
      creditos: 4,
      semestre: "2025-2",
      descripcion: "Curso orientado al desarrollo de aplicaciones web modernas.",
      modalidad: "virtual",
      estado: "activa",
      color: "#4CAF50",
      aulas: ["Aula Virtual 1"]
    },
    {
      id: "2",
      nombre: "Base de Datos",
      codigo: "INF-210",
      docente: "MSc. Rosa Gómez",
      horario: "Mar y Jue 14:00 - 16:00",
      creditos: 3,
      semestre: "2025-2",
      descripcion: "Fundamentos y práctica de modelado y gestión de bases de datos.",
      modalidad: "presencial",
      estado: "activa",
      color: "#2196F3",
      aulas: ["Laboratorio 2"]
    },
    {
      id: "3",
      nombre: "Matemática Discreta",
      codigo: "MAT-110",
      docente: "Dr. Carlos Ruiz",
      horario: "Vie 08:00 - 11:00",
      creditos: 3,
      semestre: "2024-2",
      descripcion: "Curso archivado para fundamentos de lógica matemática y estructuras discretas.",
      modalidad: "hibrida",
      estado: "archivada",
      color: "#9C27B0",
      aulas: ["Aula 305", "Aula Virtual 3"]
    }
  ];

  const clase = clases.find(c => c.id === id);

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
            {clase.aulas.map((aula, i) => (
              <li key={i}>{aula}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="clase-descripcion">
        <p>{clase.descripcion}</p>
      </div>

      {/* 🔹 Tabs */}
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

      {/* 🔹 Estudiantes */}
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
