import { useEffect, useState } from 'react';
import { getDatosCompletos } from '@/api/classroom';
import ClaseCard from '../components/ClaseCard';
import TituloPage from '../../../components/pages/TituloPage';
import { FaBook } from 'react-icons/fa';
import '../css/Clases.css';

export default function Clases() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [perfil, setPerfil] = useState<any>(null);

  useEffect(() => {
    getDatosCompletos()
      .then((data) => {
        setPerfil(data.perfil);
        setCursos(data.cursos);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="clases-page">
      <TituloPage titulo="Mis Clases" />

      {perfil && (
        <div className="perfil-header">
          <img src={perfil.foto} alt={perfil.nombre} className="perfil-foto" />
          <div>
            <h2>{perfil.nombre}</h2>
            <p>{perfil.email}</p>
          </div>
        </div>
      )}

      <div className="clases-lista">
        {cursos.length > 0 ? (
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
    </div>
  );
}
