import '../css/Skeleton.css';

interface TareaCardSkeletonProps {
  count?: number;
}

export const TareaCardSkeleton = ({ count = 1 }: TareaCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="tarea-card skeleton-card">
          {/* Header con título y estado */}
          <div className="skeleton-header">
            <div className="skeleton-title-section">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-subtitle" />
            </div>
            <div className="skeleton skeleton-badge" />
          </div>

          {/* Contenido */}
          <div className="skeleton-content">
            <div className="skeleton skeleton-text skeleton-text-full" />
            <div className="skeleton skeleton-text skeleton-text-medium" />
            <div className="skeleton skeleton-text skeleton-text-short" />
          </div>

          {/* Footer con metadata */}
          <div className="skeleton-footer">
            <div className="skeleton-meta-group">
              <div className="skeleton skeleton-icon" />
              <div className="skeleton skeleton-meta-text" />
            </div>
            <div className="skeleton-meta-group">
              <div className="skeleton skeleton-icon" />
              <div className="skeleton skeleton-meta-text" />
            </div>
          </div>

          {/* Botón de acción */}
          <div className="skeleton-actions">
            <div className="skeleton skeleton-button" />
          </div>
        </div>
      ))}
    </>
  );
};

export default TareaCardSkeleton;