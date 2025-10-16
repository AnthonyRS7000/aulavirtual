import React, { useEffect, useState } from 'react';
import ClaseCard from './ClaseCard';
import { fetchMyCourses, RawCourse } from '../../../api/classroom';

interface Curso {
  id: string;
  nombre: string;
  profesor: string;
  enlace_meet?: string | null;
  tareas?: any[];
  anuncios?: any[];
}

export default function CursosList() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // obtener token si lo guardas en localStorage (ajusta la key si usas otra)
    const token = localStorage.getItem('auth_token') || localStorage.getItem('token') || undefined;

    fetchMyCourses({ token })
      .then((raw: RawCourse[]) => {
        if (!mounted) return;
        const mapped = raw.map<Curso>((rc) => {
          const profesores = rc.teachers?.map(t => t.name).filter(Boolean) ?? [];
          // tareas: usar courseWork y filtrar las pendientes (ejemplo)
          const tareas = (rc.courseWork ?? []).map((cw: any) => cw).filter((cw: any) => {
            // considerar pendiente si no hay submission o submissionState indica no entregado
            const state = cw.submissionState ?? null;
            const published = cw.state ? cw.state === 'PUBLISHED' : true;
            const pendiente = !state || state === 'NO_SUBMISSION' || (state !== 'TURNED_IN' && state !== 'RETURNED');
            return published && pendiente;
          });
          const anuncios = rc.announcements ?? [];

          // intentar extraer enlace de meet (Google Classroom no siempre lo expone). Se deja null si no hay.
          const enlace_meet = null;

          return {
            id: rc.id,
            nombre: rc.name ?? 'Curso',
            profesor: profesores[0] ?? profesores.join(', ') ?? 'Sin profesor',
            enlace_meet,
            tareas,
            anuncios
          };
        });

        setCursos(mapped);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error(err);
        setError(err.message || 'Error al obtener cursos');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  if (loading) return <div>Cargando cursos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (cursos.length === 0) return <div>No se encontraron cursos.</div>;

  return (
    <section className="grid-cursos">
      {cursos.map(c => (
        <ClaseCard key={c.id} curso={c} />
      ))}
    </section>
  );
}