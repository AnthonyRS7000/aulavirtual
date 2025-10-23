import React from 'react';
import '../css/Skeleton.css';

interface Props {
  count?: number;
}

export default function CursoCardSkeleton({ count = 3 }: Props) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}  className="tarea-card skeleton-card" aria-hidden>
          {/* Header (mismo DOM que CursoCard) */}
          <div className="curso-header skeleton-header" style={{ padding: 0 }}>
            <div className="curso-info" style={{ padding: 12, flex: 1 }}>
              <div className="skeleton skeleton-title" style={{ height: 20, width: '65%' }} />
              <div className="skeleton skeleton-subtitle" style={{ height: 12, width: '40%', marginTop: 8 }} />
            </div>
            <div className="curso-meta" style={{ padding: 12 }}>
              <div className="skeleton skeleton-badge" style={{ height: 28, width: 110 }} />
            </div>
          </div>

          {/* Profesor */}
          <div className="profesor-info" style={{ display: 'flex', gap: 12, padding: '12px 16px' }}>
            <div className="profesor-avatar">
              <div className="skeleton skeleton-circle" style={{ height: 56, width: 56 }} />
            </div>
            <div className="profesor-datos" style={{ flex: 1 }}>
              <div className="skeleton skeleton-text" style={{ height: 14, width: '55%' }} />
              <div className="skeleton skeleton-text-sm" style={{ height: 12, width: '45%', marginTop: 8 }} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}