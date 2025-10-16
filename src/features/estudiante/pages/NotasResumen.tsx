import React from "react";
import "../css/NotasResumen.css";
import NotaParcial from "../../../components/pages/NotaParcial";
import HistorialAcademico from "../../../components/pages/HistorialAcademico";

const NotasResumen: React.FC = () => {
    return (
        <div className="notas-resumen-container">
            {/* Componente NotaParcial - Sección de Notas Parciales */}
            <NotaParcial />

            {/* Componente HistorialAcademico - Sección de Historial Académico */}
            <HistorialAcademico />
        </div>
    );
};

export default NotasResumen;
