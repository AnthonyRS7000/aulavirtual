import React, { useEffect, useState } from 'react';
import ClaseCard from './ClaseCard';
import { getCursos } from '../../../api/classroom';
import '../css/Clases.css';

interface Curso {
  id: string;
  nombre: string;
  profesor?: string;
  profesorEmail?: string | null;
  seccion?: string | null;
  descripcion?: string | null;
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

    const loadCursos = async () => {
      try {
        const resp: any = await getCursos();
        if (!mounted) return;
        const raw = resp.cursos ?? resp.data ?? resp.courses ?? [];
        const iniciales: Curso[] = (raw ?? []).map((rc: any) => ({
          id: rc.id,
          nombre: rc.nombre ?? rc.name ?? 'Curso',
          profesor: rc.profesor ?? rc.teacher ?? 'Sin profesor',
          seccion: rc.seccion ?? rc.section ?? null,
          enlace_meet: rc.enlace_meet ?? rc.meetLink ?? null,
          tareas: rc.tareas ?? rc.courseWork ?? [],
          anuncios: rc.anuncios ?? rc.announcements ?? [],
          descripcion: rc.descripcion ?? rc.description ?? null,
        }));
        setCursos(iniciales);
      } catch (err: any) {
        console.error('Error cargando cursos', err);
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
