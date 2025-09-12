interface EventoBannerProps {
  titulo: string;
  subtitulo: string;
  fecha: string;
  ubicacion: string;
  imagen: string;
  enlaceInscripcion?: string;
}

export default function EventoBanner({
  titulo,
  subtitulo,
  imagen,
  enlaceInscripcion
}: EventoBannerProps) {
  return (
    <div className="evento-banner">
      <div className="evento-contenido">
        <div className="evento-logo">
          <img src="/logo-udh-png.png" alt="UDH Logo" />
          <span className="evento-universidad">
            Ciencias Empresariales
          </span>
        </div>
        
        <div className="evento-info">
          <h2 className="evento-titulo">{titulo}</h2>
          <p className="evento-subtitulo">{subtitulo}</p>
          
          <div className="evento-detalles">
            <div className="evento-fecha">
              <span className="fecha-dia">23 Y 24</span>
              <span className="fecha-mes">de octubre</span>
            </div>
            
            <div className="evento-ubicacion">
              <span className="ubicacion-icono">📍</span>
              <div>
                <p className="ubicacion-campus">CAMPUS USIL</p>
                <p className="ubicacion-detalle">GRAN ALMIRANTE MIGUEL GRAU</p>
                <p className="ubicacion-auditorio">Auditorio Luis Bedoya Reyes</p>
              </div>
            </div>
          </div>
          
          {enlaceInscripcion && (
            <button className="evento-inscripcion">
              Inscríbete AQUÍ
            </button>
          )}
        </div>
        
        <div className="evento-imagen">
          <img src={imagen} alt={titulo} />
        </div>
      </div>
      
      <div className="evento-indicadores">
        <span className="indicador"></span>
        <span className="indicador activo"></span>
        <span className="indicador"></span>
        <span className="indicador"></span>
      </div>
    </div>
  );
}