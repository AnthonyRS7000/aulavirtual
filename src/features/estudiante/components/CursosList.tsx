import React, { useEffect, useState } from 'react';
import ClaseCard from './ClaseCard';
import { getCursosBasicos } from '../../../api/classroom';
import '../css/Clases.css';



export default function CursosList() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  let mounted = true;

  const loadCursos = async () => {
    try {
      const data = await getCursosBasicos(); // ✅ nuevo endpoint
      if (!mounted) return;
      setCursos(data);
    } catch (err: any) {
      console.error('Error cargando cursos básicos', err);
      if (!mounted) return;
      setError(err.message || 'Error al obtener cursos');
    } finally {
      if (!mounted) return;
      setLoading(false);
    }
  };

  loadCursos();
  return () => { mounted = false; };
}, []);


  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!cursos.length) return <div>No se encontraron cursos.</div>;

  return (
    <div className="clases-page">
      <section className="grid-cursos">
        {cursos.map(c => (
          <ClaseCard key={c.id} curso={c} />
        ))}
      </section>
    </div>
  );
}
