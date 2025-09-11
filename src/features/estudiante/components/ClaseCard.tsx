import React from 'react';

export default function ClaseCard({ curso }: { curso: any }) {
  return (
    <div style={{
      backgroundColor: curso.color,
      padding: '1rem',
      borderRadius: '8px',
      color: '#fff'
    }}>
      <h4>{curso.nombre}</h4>
      <p>{curso.docente}</p>
    </div>
  );
}
