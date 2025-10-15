import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/VerHorario.css";
import TituloPage from "../../../../components/pages/TituloPage";
import DatosNoEncontrados from "../../../../components/pages/DatosNoEncontrados";
import Loading from "../../../../components/pages/Loading";
import Tablas from "../../../../components/pages/Tablas";
import Card from "../../../../components/pages/Card";
import ButtonPrincipal from "../../../../components/pages/ButtonPrincipal";
import { CalendarDateRangeIcon, EyeIcon } from "@heroicons/react/24/outline";

const VerHorario: React.FC = () => {
  const [ciclo, setCiclo] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Datos simulados
  const horariosSimulados = [
    {
      codigo: "062101011",
      curso: "LENGUAJE I",
      docente: "Juan Pérez",
      seccion: "A",
      ciclo: "1",
      lunes: "08:00-10:00 P6-506 Presencial",
      martes: "",
      miercoles: "10:00-12:00 P6-506 Presencial",
      jueves: "",
      viernes: "08:00-10:00 P6-506 Presencial",
      sabado: "",
      domingo: "",
    },
    {
      codigo: "062101021",
      curso: "MATEMÁTICA BÁSICA I",
      docente: "María López",
      seccion: "A",
      ciclo: "1",
      lunes: "",
      martes: "08:00-10:00 P6-506 Presencial",
      miercoles: "",
      jueves: "10:00-12:00 P6-506 Presencial",
      viernes: "",
      sabado: "08:00-10:00 P6-506 Presencial",
      domingo: "",
    },
    {
      codigo: "062101031",
      curso: "MÉTODOS Y TÉCNICAS DE ESTUDIO",
      docente: "Carlos García",
      seccion: "A",
      ciclo: "1",
      lunes: "10:00-12:00 P6-506 Presencial",
      martes: "",
      miercoles: "",
      jueves: "08:00-10:00 P6-506 Presencial",
      viernes: "",
      sabado: "",
      domingo: "",
    },
  ];

  // Filtrar horarios por ciclo
  const horariosFiltrados = horariosSimulados.filter(
    (horario) => horario.ciclo === ciclo
  );

  const headersHorario = ["CÓDIGO", "CURSO", "SECCIÓN", "CICLO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO"];

  const rowsHorario = horariosFiltrados.map((horario) => [
    horario.codigo,
    horario.curso,
    horario.seccion,
    horario.ciclo,
    horario.lunes,
    horario.martes,
    horario.miercoles,
    horario.jueves,
    horario.viernes,
    horario.sabado,
    horario.domingo,
  ]);

  

  return (
    <div className="ver-horario-container">
      <TituloPage titulo="Ver Horarios" />
      
      <Card>
        <div className="ver-horario-filters">
          <div className="filter-group">
            <label htmlFor="ciclo-select">Filtrar por Ciclo:</label>
            <select
              id="ciclo-select"
              value={ciclo}
              onChange={(e) => setCiclo(e.target.value)}
              className="ver-horario-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <ButtonPrincipal
              icon={<CalendarDateRangeIcon />}
              text="Mi Horario"
              onClick={() => navigate("/estudiante/mi-horario")}
          />
        </div>
        {loading ? (
          <Loading />
        ) : error ? (
          <DatosNoEncontrados />
        ) : (
          <Tablas headers={headersHorario} rows={rowsHorario} />
        )}
      </Card>
    </div>
  );
};

export default VerHorario;