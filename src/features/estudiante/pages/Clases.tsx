import { useEffect, useState } from 'react';
import { getCursosBasicos } from '@/api/classroom';
import ClaseCard from '../components/ClaseCard';
import TituloPage from '../../../components/pages/TituloPage';
import { FaBook } from 'react-icons/fa';
import '../css/Clases.css';
import CursoCardSkeleton from './CursoCardSkeleton';

export default function Clases() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  let mounted = true;
  setLoading(true);

  getCursosBasicos()
    .then((resp: any) => {
      if (!mounted) return;
      setCursos(resp);
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

  return () => {
    mounted = false;
  };
}, []);


  return (
    <div className="clases-page">
      <TituloPage titulo="Mis Clases" />

      {loading ? (
        <div className="clases-lista">
         <div className="clases-grid">
          <CursoCardSkeleton count={3} />
          </div>
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
