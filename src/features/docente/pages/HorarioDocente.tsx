import React, { useState, useEffect } from "react";
import "../css/HorarioDocente.css";
import DatosNoEncontrados from "../../../components/pages/DatosNoEncontrados";
import Loading from "../../../components/pages/Loading";
import Tablas from "../../../components/pages/Tablas";
import Titulo from "../../../components/pages/TituloPage";
import Card from "../../../components/pages/Card";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";
import { EyeIcon } from "@heroicons/react/24/outline";

const calcularSemestre = (): string => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;

    if (mes >= 1 && mes <= 3) {
        return `${año}-0`;
    } else if (mes >= 4 && mes <= 7) {
        return `${año}-1`;
    } else if (mes >= 8 && mes <= 11) {
        return `${año}-2`;
    } else {
        return `${año}-2`;
    }
};

interface HorarioRegistro {
    codigo_curso: string;
    nombre_curso: string;
    ciclo: string;
    creditos: string | number;
    seccion: string;
    lunes?: string;
    martes?: string;
    miercoles?: string;
    jueves?: string;
    viernes?: string;
    sabado?: string;
    domingo?: string;
}

// Datos de prueba simulados - Reemplazar con llamada a API real
const obtenerDatosPrueba = (): HorarioRegistro[] => {
    return [
        {
            codigo_curso: '062108052',
            nombre_curso: 'SEMINARIOS DE TESIS I',
            ciclo: '8',
            creditos: 3,
            seccion: 'A',
            lunes: 'Lunes:\n09:30-\n11:00->P2-\n302\nPresencial',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: '',
            sabado: 'Sabado:\n09:30-\n11:00->P2-\n303\nPresencial',
            domingo: ''
        },
        {
            codigo_curso: '062110052',
            nombre_curso: 'SEMINARIO DE TESIS III',
            ciclo: '10',
            creditos: 3,
            seccion: 'A',
            lunes: '',
            martes: 'Martes\n14:00-\n15:30->P2-\n202\nPresencial',
            miercoles: 'Miercoles:\n08:00-\n09:30->P2-\n201\nPresencial',
            jueves: '',
            viernes: '',
            sabado: '',
            domingo: ''
        },
        {
            codigo_curso: '062110072',
            nombre_curso: 'TRABAJO DE INVESTIGACIÓN',
            ciclo: '10',
            creditos: 3,
            seccion: 'B',
            lunes: '',
            martes: 'Martes\n09:30-\n11:00->P2-\n301\nPresencial',
            miercoles: '',
            jueves: '',
            viernes: 'Viernes:\n18:30-\n20:45-\n>P2-301\nPresencial',
            sabado: 'Sabado:\n12:30-\n14:00->P2-\n303\nPresencial',
            domingo: ''
        }
    ];
};

const HorarioDocente: React.FC = () => {
    const [horarioDocente, setHorarioDocente] = useState<HorarioRegistro[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [semestre, setSemestre] = useState(calcularSemestre());

    // Cargar datos automáticamente al montar el componente
    useEffect(() => {
        fetchHorario();
    }, []);

    // Función preparada para conectar con API real
    const fetchHorario = async () => {
        try {
            setLoading(true);
            setError(false);

            // TODO: Reemplazar con llamada a API real
            // Ejemplo de cómo sería la llamada:
            // const response = await ApiService.get(`/horario-docente?semestre=${semestre}`);
            // const horarioData = response.data;
            
            // Simulación de delay de red
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Usar datos de prueba por ahora
            const horarioData = obtenerDatosPrueba();
            
            if (!Array.isArray(horarioData) || horarioData.length === 0) {
                setError(true);
                setHorarioDocente([]);
                return;
            }

            setHorarioDocente(horarioData);
            setError(false);
        } catch (error) {
            console.error("Error al cargar horario del docente:", error);
            setError(true);
            setHorarioDocente([]);
        } finally {
            setLoading(false);
        }
    };

    const handleVerClick = () => {
        fetchHorario();
    };

    // Formatear contenido de cada día
    const formatoHorarioDia = (valor?: string) => {
        if (!valor || !valor.trim()) {
            return <span className="horario-docente-dia-empty"></span>;
        }

        const partes = valor
            .split(/\r?\n+/)
            .map((parte) => parte.trim())
            .filter(Boolean);

        return (
            <div className="horario-docente-dia">
                {partes.map((parte, idx) => (
                    <span key={idx}>{parte}</span>
                ))}
            </div>
        );
    };

    // Encabezados de la tabla
    const headers = [
        "CÓDIGO",
        "CURSO",
        "SECCIÓN",
        "CICLO",
        "LUNES",
        "MARTES",
        "MIÉRCOLES",
        "JUEVES",
        "VIERNES",
        "SÁBADO",
        "DOMINGO",
    ];

    const rows = horarioDocente.map((horario) => [
        horario.codigo_curso,
        horario.nombre_curso,
        horario.seccion,
        horario.ciclo,
        formatoHorarioDia(horario.lunes),
        formatoHorarioDia(horario.martes),
        formatoHorarioDia(horario.miercoles),
        formatoHorarioDia(horario.jueves),
        formatoHorarioDia(horario.viernes),
        formatoHorarioDia(horario.sabado),
        formatoHorarioDia(horario.domingo),
    ]);

    return (
        <div className="horario-docente-container">

            <div className="mensajeria-docente-header">
              <h1 className="mensajeria-docente-titulo">Mi Horario</h1>
            </div>

            <Card>
                <div className="horario-docente-filters">
                    <div className="filter-group">
                        <label htmlFor="ciclo-input">Ciclo:</label>
                        <input
                            id="ciclo-input"
                            type="text"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                            className="horario-docente-input"
                            placeholder="2025-2"
                        />
                    </div>
                    <ButtonPrincipal
                        icon={<EyeIcon />}
                        text="Ver"
                        onClick={handleVerClick}
                        disabled={loading}
                    />
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <DatosNoEncontrados />
                ) : (
                    <Tablas headers={headers} rows={rows} />
                )}
            </Card>
        </div>
    );
};

export default HorarioDocente;
