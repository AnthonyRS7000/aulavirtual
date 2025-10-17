import React, { useEffect, useState, useRef } from "react";
import { cache } from "./Cache";
import { ApiService } from "./ApiService";
import "../css/NotaParcial.css";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TituloPage from "./TituloPage";
import Card from "./Card";
import ButtonPrincipal from "./ButtonPrincipal";
import Tablas from "./Tablas";
import DatosNoEncontrados from "./DatosNoEncontrados";
import Loading from "./Loading";

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

const NotaParcial: React.FC = () => {
    const [notas, setNotas] = useState([]); 
    const [udhData, setUdhData] = useState<any>(null);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [semestre, setSemestre] = useState(calcularSemestre());

    const [showModal, setShowModal] = useState(false);
    const [showModalInasistencia, setShowModalInasistencia] = useState(false);

    // advertenciaRef removed — informational cards were removed

    const CACHE_KEY = `notasParciales_${semestre}`;
    const CACHE_EXPIRATION_MINUTES = 10;

    useEffect(() => {
        const datosUdh = JSON.parse(localStorage.getItem("datos_udh") || "{}");
        const nombresUser = JSON.parse(localStorage.getItem("usuario") || "{}");
        setUdhData(datosUdh);
        setNombre(`${nombresUser.apellidos}, ${nombresUser.nombres}`);
    }, []);

    useEffect(() => {
        if (udhData && udhData.codigo) {
            const cachedData = cache.get(CACHE_KEY);
            if (cachedData) {
                setNotas(cachedData);
                setError(false);
            } else {
                fetchNotas();
            }
        }
    }, [udhData, semestre]);
        
    const fetchNotas = async () => {
        try {
        setLoading(true); 
        const codigoAlumno = udhData.codigo;
        const data_notas = await ApiService.get(`/estudiantes/notas?codalu=${codigoAlumno}&semsem=${semestre}`);
        
        console.log("Respuesta de API:", data_notas);
        
        if (!data_notas.data || data_notas.status === "error" || data_notas.data.status === "error") {
            setError(true);
            setNotas([]); 
        } else {
            // La API puede devolver { data: [...] } o directamente [...]
            const notasArray = Array.isArray(data_notas.data) 
                ? data_notas.data 
                : (data_notas.data.data || []);
            
            setNotas(notasArray);
            setError(false);
            cache.set(CACHE_KEY, notasArray, CACHE_EXPIRATION_MINUTES);
        }
        } catch (error) {
        console.error("Error al cargar las notas:", error);
        setError(true);
        setNotas([]);
        } finally {
        setLoading(false);
        }
    };

    // Mostrar los modales según condiciones
    useEffect(() => {
        if (!loading && notas.length > 0) {
            // Modal de advertencia por veces llevado
            const hayTresVeces = notas.some((n: any) => n.vecesLlevado === 3);
            setShowModal(hayTresVeces);

            // Modal de advertencia por inasistencia
            const hayInasistencia = notas.some((n: any) => parseFloat(n.PorcInasis.replace("%", "")) > 20);
            setShowModalInasistencia(hayInasistencia);
        }
    }, [notas, loading]);
    
    // Funciones utilitarias para colores e iconos
    const getPromedioIcon = (promedio: number) => {
        if (promedio < 11) return "😞"; // triste
        if (promedio === 11) return "😌"; // alivio
        return "😊"; // feliz
    };

    const getPromedioColor = (promedio: number) => {
        if (promedio < 11) return "#d32f2f"; // rojo
        if (promedio === 11) return "#e6b800"; // amarillo
        return "#388e3c"; // verde
    };

    const getInasistenciaColor = (inasistencia: string) => {
        const valor = parseFloat(inasistencia.replace("%", ""));
        if (valor < 10) return "#388e3c"; // verde
        if (valor < 20) return "#e6b800"; // amarillo
        return "#d32f2f"; // rojo
    };

    const handleVerClick = () => {
        const cachedData = cache.get(CACHE_KEY);
        if (cachedData) {
            setNotas(cachedData);
            setError(false);
        } else {
            fetchNotas();
        }
    };

    const headersNotas = [
        "Código", "Curso", "Sec.", "TA1", "TA2", "TA3", "TA4", "PTA", "EMC", "EFC", "SUS", "Promedio (Letras)", "Inasistencia"
    ];
    const rowsNotas = notas.map((nota: any) => [
        nota.codigo_curso,
        nota.nombre_curso,
        nota.seccion,
        nota.TA1,
        nota.TA2,
        nota.TA3,
        nota.TA4,
        nota.PTA,
        nota.EMC,
        nota.EFC,
        nota.SUS,
        <div className="promedio-container" style={{ color: getPromedioColor(nota.pfin) }}>
            <span>{nota.pfin}</span>
            <span>({nota.pfinL.trim()})</span>
            <span>{getPromedioIcon(nota.pfin)}</span>
        </div>,
        <span style={{ color: getInasistenciaColor(nota.PorcInasis) }}>{nota.PorcInasis}</span>
    ]);

    return (
        <div className="notas-container">
            <TituloPage titulo="Notas Parciales" />

            {/* Modal de advertencia por veces llevado */}
            {showModal && (
                <div className="notas-modal-overlay">
                    <div className="notas-modal" onClick={e => e.stopPropagation()}>
                        <button
                            className="notas-modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                        <h3>⚠️ Atención</h3>
                        <p>
                            Según el <strong>Art. 102 de la Ley Universitaria 30220</strong>, la matrícula puede ser condicionada por rendimiento académico si desaprueba una <strong style={{ color: "#dc2626" }}>materia tres veces.</strong>
                        </p>
                        <button
                            className="notas-modal-saber-mas"
                            onClick={() => {
                                setShowModal(false);
                                setTimeout(() => {
                                    document.querySelector('.notas-card.notas-info-extra')?.scrollIntoView({ behavior: "smooth" });
                                }, 200);
                            }}
                        >
                            Saber más
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de advertencia por inasistencia */}
            {showModalInasistencia && (
                <div className="notas-modal-overlay">
                    <div className="notas-modal" onClick={e => e.stopPropagation()}>
                        <button
                            className="notas-modal-close"
                            onClick={() => setShowModalInasistencia(false)}
                        >
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                        <h3>⚠️ Atención</h3>
                        <p>
                            <strong>ART.73 REGLAMENTO GENERAL DE ESTUDIOS PREGRADO SEMIPRESENCIAL. Asistencia de los estudiantes.</strong><br />
                            El alumno, que tiene más de <span style={{ color: "#dc2626", fontWeight: 600 }}>30 por ciento</span> de inasistencias, sobre el total de horas programadas para una asignatura, estará impedido de rendir las evaluaciones.
                        </p>
                    </div>
                </div>
            )}

            {/* Card */}
            <Card>
                <div className="notas-datos-row">
                    <div>
                        <label >Apellidos y Nombres:</label>
                        {nombre}
                    </div>
                    <div className="notas-datos-row">
                        <label htmlFor="semestre" >Semestre:</label>
                        <div className="notas-filter-group">
                            <input
                                id="semestre-input"
                                type="text"
                                value={semestre}
                                onChange={(e) => setSemestre(e.target.value)}
                                className="notas-input-semestre"
                                placeholder={calcularSemestre()}
                            />
                            <ButtonPrincipal icon={<EyeIcon />} text="Ver" onClick={handleVerClick} />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : error ? (
                <DatosNoEncontrados />
                ) : (
                <Tablas headers={headersNotas} rows={rowsNotas} />
                )}
            </Card>
            {/* Informational cards removed (advertencia / evaluacion) */}
        </div>
    );
};

export default NotaParcial;
