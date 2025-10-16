import React, { useState, useEffect } from "react";
import { cache } from "./Cache";
import { ApiService } from "./ApiService";
import "../css/HistorialAcademico.css";
import TituloPage from "./TituloPage";
import DatosNoEncontrados from "./DatosNoEncontrados";
import Loading from "./Loading";
import Tablas from "./Tablas";
import Card from "./Card";

const obtenerFechaHora = () => {
    const fecha = new Date();
    const opciones: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const fechaStr = fecha.toLocaleDateString("es-PE", opciones);
    const horaStr = fecha.toLocaleTimeString("es-PE", { hour12: false });
    return { fechaStr, horaStr };
};

const HistorialAcademico: React.FC = () => {
    const [historial, setHistorial] = useState<any[]>([]);
    const [udhData, setUdhData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nombre, setNombre] = useState("");
    const [ultimaConsulta, setUltimaConsulta] = useState<{ fechaStr: string; horaStr: string }>(obtenerFechaHora());

    const [cicloFiltro, setCicloFiltro] = useState<string>("");
    const [busqueda, setBusqueda] = useState<string>("");

    const CACHE_KEY = "historialAcademico";
    const CACHE_EXPIRATION_MINUTES = 10;

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        const datos_udh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        setUdhData(datos_udh);
        setNombre(
            usuario.apellidos + ", " + usuario.nombres || ""
        );
    }, []);

    useEffect(() => {
        if (udhData && udhData.codigo) {
            const cachedData = cache.get(CACHE_KEY);
            if (cachedData) {
                setHistorial(cachedData);
                setError(false);
            } else {
                fetchHistorial();
            }
        }
    }, [udhData]);

    const fetchHistorial = async () => {
        if (!udhData || !udhData.codigo) {
            setLoading(false);
            setError(true);
            return;
        }
        try {
            setLoading(true);
            const codigoAlumno = udhData.codigo;
            const data_historial = await ApiService.get(
                `/estudiantes/historial-academico?codalu=${codigoAlumno}`
            );
            
            console.log("Respuesta de API (Historial Académico):", data_historial);
            console.log("data_historial.data:", data_historial.data);
            console.log("data_historial.data.data:", data_historial.data.data);
            console.log("Tipo de data_historial.data.data:", typeof data_historial.data.data);
            console.log("¿Es array?:", Array.isArray(data_historial.data.data));
            
            if (!data_historial.data || data_historial.status === "error") {
                setError(true);
                setHistorial([]);
            } else {
                // La API devuelve: { data: { status: 'success', data: {...}, code: 200, ... } }
                // Los datos del historial están en data_historial.data.data
                let historialArray = [];
                const innerData = data_historial.data.data;
                
                if (Array.isArray(data_historial.data)) {
                    // Si data_historial.data es directamente un array
                    historialArray = data_historial.data;
                    console.log("Caso 1: data es array directo");
                } else if (Array.isArray(innerData)) {
                    // Los datos están en data_historial.data.data como array
                    historialArray = innerData;
                    console.log("✅ Caso 2: Historial en data.data como array:", historialArray.length, "registros");
                } else if (innerData && typeof innerData === 'object') {
                    // Es un objeto, buscar el array dentro
                    console.log("Caso 3: innerData es un objeto, claves:", Object.keys(innerData));
                    
                    // Buscar posibles propiedades con arrays
                    if (Array.isArray(innerData.data)) {
                        historialArray = innerData.data;
                        console.log("✅ Encontrado en innerData.data:", historialArray.length);
                    } else if (Array.isArray(innerData.cursos)) {
                        historialArray = innerData.cursos;
                        console.log("✅ Encontrado en innerData.cursos:", historialArray.length);
                    } else if (Array.isArray(innerData.historial)) {
                        historialArray = innerData.historial;
                        console.log("✅ Encontrado en innerData.historial:", historialArray.length);
                    } else {
                        console.warn("❌ No se encontró array en innerData");
                    }
                } else {
                    console.warn("Formato de respuesta inesperado:", data_historial.data);
                }
                
                console.log("historialArray final:", historialArray);
                
                setHistorial(historialArray);
                setError(historialArray.length === 0);
                cache.set(CACHE_KEY, historialArray, CACHE_EXPIRATION_MINUTES);
                setUltimaConsulta(obtenerFechaHora());
            }
        } catch (error) {
            console.error("Error al cargar el historial:", error);
            setError(true);
            setHistorial([]);
        } finally {
            setLoading(false);
        }
    };

    // Obtener ciclos únicos para el filtro
    const ciclosUnicos = Array.isArray(historial) 
        ? Array.from(new Set(historial.map((c: any) => c.ciclo))).sort((a: any, b: any) => a - b)
        : [];

    // Filtrado de historial
    const historialFiltrados = Array.isArray(historial) 
        ? historial.filter((historial_curso: any) => {
            const coincideCiclo =
                cicloFiltro === "" || String(historial_curso.ciclo) === cicloFiltro;
            const coincideBusqueda =
                busqueda.trim() === "" ||
                historial_curso.nombre_curso.toLowerCase().includes(busqueda.toLowerCase()) ||
                historial_curso.codigo_curso.includes(busqueda) ||
                (historial_curso.especializacion &&
                    historial_curso.especializacion.toLowerCase().includes(busqueda.toLowerCase()));
            return coincideCiclo && coincideBusqueda;
        })
        : [];

    // Encabezados de la tabla
    const headers = [
        "CÓDIGO",
        "CURSO",
        "CICLO",
        "NOTA",
        "PREREQ.",
        "PREREQ2.",
        "N° Veces Llevado",
        "Especialización",
    ];
    
    // Filas de la tabla
    const rows = historialFiltrados.map((historial: any) => [
        historial.codigo_curso,
        historial.nombre_curso,
        historial.ciclo,
        historial.nota,
        historial.PRERECUR || "-",
        historial.PRERECUR2 || "-",
        historial.nveces,
        historial.especializacion || "-",
    ]);

    return (
        <div className="historial-container">
            <TituloPage titulo="Historial Académico" />
            <Card>
                <div className="historial-barra-superior">
                    <div className="historial-filtros-row">
                        <div className="historial-nombre-usuario">
                            <label>Apellidos y Nombres:</label>
                            {nombre}
                        </div>
                        <div className="historial-nombre-usuario">
                            <label htmlFor="busqueda">Buscar:</label>
                            <input
                                id="busqueda"
                                type="text"
                                placeholder="Buscar curso, código..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <label htmlFor="filtro-ciclo">Ciclo:</label>
                            <select
                                id="filtro-ciclo"
                                value={cicloFiltro}
                                onChange={(e) => setCicloFiltro(e.target.value)}
                            >
                                <option value="">Todos</option>
                                {ciclosUnicos.map((ciclo: any) => (
                                    <option key={ciclo} value={ciclo}>
                                        {ciclo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : error ? (
                    <DatosNoEncontrados />
                ) : (
                    <Tablas headers={headers} rows={rows} />
                )}

                <div className="historial-footer">
                    <div>
                        Oficina de Matrícula {ultimaConsulta.fechaStr}. Hora: {ultimaConsulta.horaStr}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default HistorialAcademico;
