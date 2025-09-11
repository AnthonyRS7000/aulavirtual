import React from 'react';

export default function TareaCard({ tarea }: { tarea: any }) {
  return (
    <div style={{
      backgroundColor: '#f9f9f9',
      border: '1px solid #ccc',
      padding: '1rem',
      borderRadius: '8px'
    }}>
      <h4>{tarea.titulo}</h4>
      <p>Curso: {tarea.curso}</p>
      <p>Entrega: {tarea.fechaEntrega}</p>
    </div>
  );
}
