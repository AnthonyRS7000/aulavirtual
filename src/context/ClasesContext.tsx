import { createContext, useContext, useState, useEffect } from "react";
import { getHorario } from "../features/estudiante/services/horarioService";

const ClasesContext = createContext<any>(null);

export const ClasesProvider = ({ children }: { children: React.ReactNode }) => {
  const [clases, setClases] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHorario("2020210688", "2025-2");
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
      } catch (err) {
        console.error("Error cargando clases", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <ClasesContext.Provider value={{ clases, loading }}>
      {children}
    </ClasesContext.Provider>
  );
};

export const useClases = () => useContext(ClasesContext);
