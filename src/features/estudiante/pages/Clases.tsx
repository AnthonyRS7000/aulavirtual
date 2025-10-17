import { useEffect, useState } from 'react';
import { getCursos } from '@/api/classroom';
import ClaseCard from '../components/ClaseCard';
import TituloPage from '../../../components/pages/TituloPage';
import { FaBook } from 'react-icons/fa';
import '../css/Clases.css';

export default function Clases() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getCursos()
      .then((resp: any) => {
        if (!mounted) return;
        const raw = resp.cursos ?? resp.data ?? resp.courses ?? [];
        const mapped = (raw ?? []).map((rc: any) => ({
          id: rc.id,
          nombre: rc.nombre ?? rc.name ?? 'Curso',
          profesor: rc.profesor ?? rc.teacher ?? 'Sin profesor',
          seccion: rc.seccion ?? rc.section ?? null,
          enlace_meet: rc.enlace_meet ?? rc.meetLink ?? null,
          tareas: rc.tareas ?? rc.courseWork ?? [],
          anuncios: rc.anuncios ?? rc.announcements ?? [],
          descripcion: rc.descripcion ?? rc.description ?? null,
        }));
        setCursos(mapped);
      })
      .catch((err: any) => {
        console.error(err);
        if (!mounted) return;
        setError(err.message ?? 'Error al cargar cursos');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  return (
    <div className="clases-page">
      <TituloPage titulo="Mis Clases" />

      {loading ? (
        <div className="loader-container">
        <div className="loader"></div>
        <p className="loader-text">Cargando cursos...</p>
      </div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <div className="clases-lista">
          {((cursos ?? []).length > 0) ? (
            <div className="clases-grid">
              {cursos.map((curso) => (
                <ClaseCard key={curso.id} curso={curso} />
              ))}
            </div>
          ) : (
            <div className="no-clases">
              <FaBook className="no-clases-icon" />
              <p>No se encontraron clases disponibles.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
