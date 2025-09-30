import React from "react";
import "../css/Tablas.css";

interface TablasProps {
  headers: string[]; // Encabezados de la tabla
  rows: any[][];
  //rows: Array<Array<string | JSX.Element>>; // Filas de la tabla
  //className?: string; // Clase adicional para estilos personalizados
}

const Tablas: React.FC<TablasProps> = ({ headers, rows }) => {
  return (
    <div className="tabla-container">
      <table className="tabla">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Tablas);