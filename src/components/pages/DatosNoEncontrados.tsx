import React from "react";
import { InboxIcon } from "@heroicons/react/24/outline";
import "../css/DatosNoEncontrados.css";

const DatosNoEncontrados: React.FC = () => {
  return (
    <div className="datos-no-encontrados-container">
      <InboxIcon className="datos-no-encontrados-icon" />
      <h3 className="datos-no-encontrados-titulo">No se encontraron datos</h3>
      <p className="datos-no-encontrados-texto">
        No hay información disponible para mostrar en este momento.
      </p>
    </div>
  );
};

export default DatosNoEncontrados;
