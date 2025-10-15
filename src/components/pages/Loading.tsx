import React from "react";
import "../css/Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Cargando datos...</p>
    </div>
  );
};

export default Loading;
