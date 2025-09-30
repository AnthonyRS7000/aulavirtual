import React from "react";
import "../css/TituloPage.css";

interface TituloPageProps {
  titulo: string; // Prop para personalizar el título
}

const TituloPage: React.FC<TituloPageProps> = ({ titulo }) => {
  return (
    <div className="titulo-page-container">
      <h1 className="titulo-page">{titulo}</h1>
    </div>
  );
};

export default TituloPage;