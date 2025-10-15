import React from "react";
import "../css/TituloPage.css";

interface TituloPageProps {
  titulo: string; // Prop para personalizar el título
  subtitle?: string | React.ReactNode; // Subtítulo opcional (texto simple o nodo React)
}

const TituloPage: React.FC<TituloPageProps> = ({ titulo, subtitle }) => {
  return (
    <div className="titulo-page-container">
      <h1 className="titulo-page">{titulo}</h1>
      {subtitle && (
        <div className="page-subtitle" aria-hidden>{subtitle}</div>
      )}
    </div>
  );
};

export default TituloPage;