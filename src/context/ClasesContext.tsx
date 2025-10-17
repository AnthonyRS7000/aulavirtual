import { createContext, useContext, useState, useEffect } from "react";
import { getHorario } from "../features/estudiante/services/horarioService";

interface ClaseFront {
  id: string;
  nombre: string;
  codigo: string;
  docente: string;
  horario: string;
  modalidad: string;
  aulas: string[];
  estudiantes: number;
  creditos: number;
  semestre: string;
  descripcion: string;
  color: string;
}

interface Estadisticas {
  activas: number;
  totalCreditos: number;
}

interface ClasesContextType {
  clases: ClaseFront[];
  loading: boolean;
  estadisticas: Estadisticas;
}

const ClasesContext = createContext<ClasesContextType | null>(null);

export const ClasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [clases, setClases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({ activas: 0, totalCreditos: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos_udh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        const codigoAlumno = datos_udh.codigo;
        
        if (!codigoAlumno) {
          console.warn("No se encontró código de alumno en localStorage");
          setLoading(false);
          return;
        }

        const data = await getHorario(codigoAlumno, "2025-2");
        
        if (!data || !Array.isArray(data)) {
          console.warn("No se recibió data de horario o no es un array");
          setClases([]);
          setLoading(false);
          return;
        }

        const mapped = data.map((c: any) => {
          const dias = [c.lunes, c.martes, c.miercoles, c.jueves, c.viernes, c.sabado, c.domingo]
            .filter(Boolean);

          return {
            id: c.codigo_curso.trim(),
            nombre: c.nombre_curso,
            codigo: c.codigo_curso.trim(),
            docente: c.docente,
            horario: dias.map((d: string) => d.split("->")[0].trim()).join(" | "),
            modalidad: "presencial",
            aulas: dias.map((d: string) => d.match(/->(.*) Presencial/)?.[1]?.trim() || "Aula"),
            estudiantes: Math.floor(Math.random() * 30) + 20,
            creditos: c.creditos,
            semestre: "2025-2",
            descripcion: `Clase de ${c.nombre_curso} sección ${c.seccion}`,
            color: "#4c7c74"
          };
        });
        setClases(mapped);
      setEstadisticas({
        activas: mapped.length,
        totalCreditos: data.reduce((acc: number, c: any) => acc + c.creditos, 0),
      });

    } catch (err) {
      console.error("Error cargando clases:", err);
      // Si el endpoint no existe (404), simplemente dejamos clases vacías
      setClases([]);
      setEstadisticas({ activas: 0, totalCreditos: 0 });
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <ClasesContext.Provider value={{ clases, loading,  estadisticas }}>
      {children}
    </ClasesContext.Provider>
  );
};

export const useClases = () => {
  const context = useContext(ClasesContext);
  if (!context) {
    throw new Error("useClases debe usarse dentro de ClasesProvider");
  }
  return context;
};
