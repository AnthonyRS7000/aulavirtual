import '../css/HorarioHoy.css';

interface Curso {
  codigo: string;
  curso: string;
  ciclo: number;
  seccion: string;
  lunes?: string;
  martes?: string;
  miercoles?: string;
  jueves?: string;
  viernes?: string;
  sabado?: string;
  domingo?: string;
}

export default function HorarioHoy() {
  const horario: Curso[] = [
    {
      codigo: "062101011",
      curso: "LENGUAJE I",
      ciclo: 1,
      seccion: "A",
      lunes: "08:00-10:00 P6-506 Presencial",
      martes: "08:00-10:00 P6-506 Presencial",
      miercoles: "10:00-12:00 P6-506 Presencial",
      jueves: "10:00-12:00 P6-506 Presencial",
      viernes: "08:00-10:00 P6-506 Presencial",
      sabado: "08:00-10:00 P6-506 Presencial",
      domingo: "",
    },
    {
      codigo: "062101021",
      curso: "MATEMÁTICA BÁSICA I",
      ciclo: 1,
      seccion: "A",
      lunes: "08:00-10:00 P6-506 Presencial",
      martes: "08:00-10:00 P6-506 Presencial",
      miercoles: "10:00-12:00 P6-506 Presencial",
      jueves: "10:00-12:00 P6-506 Presencial",
      viernes: "08:00-10:00 P6-506 Presencial",
      sabado: "08:00-10:00 P6-506 Presencial",
      domingo: "",
    },
    {
      codigo: "062101031",
      curso: "MÉTODOS Y TÉCNICAS DE ESTUDIO",
      ciclo: 1,
      seccion: "A",
      lunes: "10:00-12:00 P6-506 Presencial",
      martes: "10:00-12:00 P6-506 Presencial",
      miercoles: "08:00-10:00 P6-506 Presencial",
      jueves: "08:00-10:00 P6-506 Presencial",
      viernes: "10:00-12:00 P6-506 Presencial",
      sabado: "10:00-12:00 P6-506 Presencial",
      domingo: "",
    },
    {
      codigo: "2021210351",
      curso: "FUNDAMENTOS DE CIENCIA DE DATOS",
      ciclo: 9,
      seccion: "A",
      lunes: "",
      martes: "16:15-17:45 P2-305 Presencial",
      miercoles: "",
      jueves: "16:15-17:45 P2-305 Presencial",
      viernes: "",
      sabado: "",
      domingo: "",
    },
  ];

  return (
    <div className="horario-hoy-container">
      <h1>Mi Horario</h1>
      <table className="horario-tabla">
        <thead>
          <tr>
            <th>CÓDIGO</th>
            <th>CURSO</th>
            <th>CICLO</th>
            <th>SECCIÓN</th>
            <th>LUNES</th>
            <th>MARTES</th>
            <th>MIÉRCOLES</th>
            <th>JUEVES</th>
            <th>VIERNES</th>
            <th>SÁBADO</th>
            <th>DOMINGO</th>
          </tr>
        </thead>
        <tbody>
          {horario.map((fila, index) => (
            <tr key={index}>
              <td>{fila.codigo}</td>
              <td>{fila.curso}</td>
              <td>{fila.ciclo}</td>
              <td>{fila.seccion}</td>
              <td>{fila.lunes || ""}</td>
              <td>{fila.martes || ""}</td>
              <td>{fila.miercoles || ""}</td>
              <td>{fila.jueves || ""}</td>
              <td>{fila.viernes || ""}</td>
              <td>{fila.sabado || ""}</td>
              <td>{fila.domingo || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}