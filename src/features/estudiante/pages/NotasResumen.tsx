import React, { useEffect, useState } from "react";
import { cache } from "../../../components/pages/Cache";
import { ApiService } from "../../../components/pages/ApiService";
import "../css/NotasResumen.css";
import { AcademicCapIcon, ChartBarIcon, XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import TituloPage from "../../../components/pages/TituloPage";
import Card from "../../../components/pages/Card";
import DatosNoEncontrados from "../../../components/pages/DatosNoEncontrados";
import Loading from "../../../components/pages/Loading";
import ButtonPrincipal from "../../../components/pages/ButtonPrincipal";

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

const NotasResumen: React.FC = () => {
    const [notas, setNotas] = useState<any[]>([]); 
    const [udhData, setUdhData] = useState<any>(null);
    const [nombre, setNombre] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [semestre, setSemestre] = useState(calcularSemestre());

    const [showModal, setShowModal] = useState(false);
    const [promedioGeneral, setPromedioGeneral] = useState(0);
    const [cursosAprobados, setCursosAprobados] = useState(0);
    const [cursosDesaprobados, setCursosDesaprobados] = useState(0);

    const CACHE_KEY = `notasResumen_${semestre}`;
    const CACHE_EXPIRATION_MINUTES = 10;

    // Estado para notas parciales (semestre actual)
    const [notasParciales, setNotasParciales] = useState<any[]>([]);
    const CACHE_KEY_PARCIALES = `notasParciales_${calcularSemestre()}`;

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
                calcularEstadisticas(cachedData);
                setError(false);
            } else {
                fetchNotas();
            }
            // también cargamos las parciales del semestre actual
            fetchNotasParciales();
        }
    }, [udhData]);
        
    const fetchNotas = async () => {
        try {
            setLoading(true); 
            const codigoAlumno = udhData.codigo;
            const data_notas = await ApiService.get(`/estudiantes/notas?codalu=${codigoAlumno}&semsem=${semestre}`);
            
            if (!data_notas.data || data_notas.status === "error" || data_notas.data.status === "error") {
                setError(true);
                setNotas([]); 
            } else {
                setNotas(data_notas.data);
                calcularEstadisticas(data_notas.data);
                setError(false);
                cache.set(CACHE_KEY, data_notas.data, CACHE_EXPIRATION_MINUTES);
            }
        } catch (error) {
            console.error("Error al cargar las notas:", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // Cargar notas parciales (semestre actual)
    const fetchNotasParciales = async () => {
        try {
            const codigoAlumno = udhData?.codigo;
            if (!codigoAlumno) return;
            const cached = cache.get(CACHE_KEY_PARCIALES);
            if (cached) {
                setNotasParciales(cached);
                return;
            }
            const res = await ApiService.get(`/estudiantes/notas?codalu=${codigoAlumno}&semsem=${calcularSemestre()}`);
            if (res && res.data && res.status !== 'error') {
                setNotasParciales(res.data);
                cache.set(CACHE_KEY_PARCIALES, res.data, CACHE_EXPIRATION_MINUTES);
            }
        } catch (err) {
            console.error('Error al cargar notas parciales', err);
        }
    };

    const calcularEstadisticas = (notasData: any[]) => {
        if (notasData.length === 0) return;
        
        const sumaPromedios = notasData.reduce((acc, nota) => acc + nota.pfin, 0);
        const promedio = sumaPromedios / notasData.length;
        setPromedioGeneral(parseFloat(promedio.toFixed(2)));

        const aprobados = notasData.filter(nota => nota.pfin >= 11).length;
        const desaprobados = notasData.filter(nota => nota.pfin < 11).length;
        
        setCursosAprobados(aprobados);
        setCursosDesaprobados(desaprobados);

        // Mostrar modal si hay cursos desaprobados
        if (desaprobados > 0) {
            setShowModal(true);
        }
    };

    const getPromedioIcon = (promedio: number) => {
        if (promedio < 11) return "😞";
        if (promedio === 11) return "😌";
        return "😊";
    };

    const getPromedioColor = (promedio: number) => {
        if (promedio < 11) return "#d32f2f";
        if (promedio === 11) return "#e6b800";
        return "#388e3c";
    };

    const getEstadoTexto = (promedio: number) => {
        if (promedio < 11) return "Desaprobado";
        return "Aprobado";
    };

    const getEstadoColor = (promedio: number) => {
        if (promedio < 11) return "#d32f2f";
        return "#388e3c";
    };

    const handleVerClick = () => {
        const cachedData = cache.get(CACHE_KEY);
        if (cachedData) {
            setNotas(cachedData);
            calcularEstadisticas(cachedData);
            setError(false);
        } else {
            fetchNotas();
        }
    };

    return (
        <div className="notas-resumen-container">
            <TituloPage titulo="Notas Parciales" />

            {/* Sección: Notas Parciales (semestre actual) */}
            <div style={{ marginTop: 16 }}>
                <Card>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="notas-resumen-tabla-titulo">Semestre Actual</h3>
                  
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <label style={{ fontWeight: 600, color: '#333' }}>Semestre actual:</label>
                            <span>{calcularSemestre()}</span>
                        </div>
                    </div>

                    <div className="notas-resumen-tabla" style={{ marginTop: 16 }}>
                        <div className="tabla-responsive">
                            <table className="tabla-notas">
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Curso</th>
                                        <th>Sec.</th>
                                        <th>TA1</th>
                                        <th>TA2</th>
                                        <th>TA3</th>
                                        <th>TA4</th>
                                        <th>PTA</th>
                                        <th>EMC</th>
                                        <th>EFC</th>
                                        <th>SUS</th>
                                        <th>Promedio (Letras)</th>
                                        <th>Inasistencia</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notasParciales.length === 0 ? (
                                        <tr>
                                            <td colSpan={13} style={{ textAlign: 'center', padding: '20px' }}>No hay notas parciales para el semestre actual.</td>
                                        </tr>
                                    ) : (
                                        notasParciales.map((n: any, i: number) => (
                                            <tr key={i}>
                                                <td>{n.codigo_curso}</td>
                                                <td className="curso-nombre">{n.nombre_curso}</td>
                                                <td>{n.seccion}</td>
                                                <td>{n.TA1}</td>
                                                <td>{n.TA2}</td>
                                                <td>{n.TA3}</td>
                                                <td>{n.TA4}</td>
                                                <td>{n.PTA}</td>
                                                <td>{n.EMC}</td>
                                                <td>{n.EFC}</td>
                                                <td>{n.SUS}</td>
                                                <td>{n.pfin} ({n.pfinL})</td>
                                                <td>{n.PorcInasis}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Modal de advertencia */}
            {showModal && (
                <div className="notas-resumen-modal-overlay">
                    <div className="notas-resumen-modal" onClick={e => e.stopPropagation()}>
                        <button
                            className="notas-resumen-modal-close"
                            onClick={() => setShowModal(false)}
                        >
                            <XMarkIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                        </button>
                        <h3>⚠️ Atención</h3>
                        <p>
                            Tienes <strong style={{ color: "#dc2626" }}>{cursosDesaprobados} curso(s) desaprobado(s)</strong> en este semestre.
                            <br /><br />
                            Recuerda que según el <strong>Art. 102 de la Ley Universitaria 30220</strong>, 
                            la desaprobación de una misma materia por <strong style={{ color: "#dc2626" }}>tres veces</strong> puede 
                            condicionar tu matrícula.
                        </p>
                        <button
                            className="notas-resumen-modal-cerrar"
                            onClick={() => setShowModal(false)}
                        >
                            Entendido
                        </button>
                    </div>
                </div>
            )}

            {/* Sección: Historial Academico */}
            
            
                <TituloPage titulo="Historial Académico" />
           

            {/* Card principal */}
            <Card>
                <div className="notas-resumen-header">
                    <div className="notas-resumen-info">
                        <label>Apellidos y Nombres:</label>
                        <span>{nombre}</span>
                    </div>
                    <div className="notas-resumen-filter-group">
                        <label htmlFor="semestre">Semestre:</label>
                        <input
                            id="semestre"
                            type="text"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                            className="notas-resumen-input-semestre"
                            placeholder={calcularSemestre()}
                        />
                        <ButtonPrincipal icon={<EyeIcon />} text="Ver" onClick={handleVerClick} />
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : error ? (
                    <DatosNoEncontrados />
                ) : (
                    <>
                        {/* Estadísticas generales */}
                        <div className="notas-resumen-estadisticas">
                            <div className="estadistica-card promedio-general">
                                <div className="estadistica-icon">
                                    <ChartBarIcon style={{ width: "2rem", height: "2rem" }} />
                                </div>
                                <div className="estadistica-content">
                                    <span className="estadistica-label">Promedio General</span>
                                    <div className="estadistica-valor-container">
                                        <span 
                                            className="estadistica-valor" 
                                            style={{ color: getPromedioColor(promedioGeneral) }}
                                        >
                                            {promedioGeneral.toFixed(2)}
                                        </span>
                                        <span className="estadistica-emoji">
                                            {getPromedioIcon(promedioGeneral)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="estadistica-card cursos-total">
                                <div className="estadistica-icon">
                                    <AcademicCapIcon style={{ width: "2rem", height: "2rem" }} />
                                </div>
                                <div className="estadistica-content">
                                    <span className="estadistica-label">Total de Cursos</span>
                                    <span className="estadistica-valor">{notas.length}</span>
                                </div>
                            </div>

                            <div className="estadistica-card cursos-aprobados">
                                <div className="estadistica-content">
                                    <span className="estadistica-label">Cursos Aprobados</span>
                                    <span className="estadistica-valor" style={{ color: "#388e3c" }}>
                                        {cursosAprobados}
                                    </span>
                                </div>
                            </div>

                            <div className="estadistica-card cursos-desaprobados">
                                <div className="estadistica-content">
                                    <span className="estadistica-label">Cursos Desaprobados</span>
                                    <span className="estadistica-valor" style={{ color: "#d32f2f" }}>
                                        {cursosDesaprobados}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de cursos */}
                        <div className="notas-resumen-tabla">
                            <h3 className="notas-resumen-tabla-titulo">Detalle por Curso</h3>
                            <div className="tabla-responsive">
                                <table className="tabla-notas">
                                    <thead>
                                        <tr>
                                            <th>Código</th>
                                            <th>Curso</th>
                                            <th>Promedio</th>
                                            <th>Estado</th>
                                            <th>Veces Llevado</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notas.map((nota: any, index: number) => (
                                            <tr key={index}>
                                                <td>{nota.codigo_curso}</td>
                                                <td className="curso-nombre">{nota.nombre_curso}</td>
                                                <td>
                                                    <div className="promedio-cell">
                                                        <span 
                                                            style={{ 
                                                                color: getPromedioColor(nota.pfin),
                                                                fontWeight: 600 
                                                            }}
                                                        >
                                                            {nota.pfin}
                                                        </span>
                                                        <span className="promedio-letra">
                                                            ({nota.pfinL.trim()})
                                                        </span>
                                                        <span>{getPromedioIcon(nota.pfin)}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span 
                                                        className="estado-badge"
                                                        style={{ 
                                                            backgroundColor: getEstadoColor(nota.pfin) + "20",
                                                            color: getEstadoColor(nota.pfin),
                                                            border: `1px solid ${getEstadoColor(nota.pfin)}`
                                                        }}
                                                    >
                                                        {getEstadoTexto(nota.pfin)}
                                                    </span>
                                                </td>
                                                <td className="veces-llevado">
                                                    {nota.vecesLlevado === 3 ? (
                                                        <span style={{ color: "#d32f2f", fontWeight: 700 }}>
                                                            ⚠️ {nota.vecesLlevado}
                                                        </span>
                                                    ) : (
                                                        nota.vecesLlevado
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </Card>

            {/* Card de información adicional */}
            {!loading && !error && notas.length > 0 && (
                <div className="notas-resumen-info-card">
                    <div className="notas-resumen-info-header">
                        📊 INFORMACIÓN IMPORTANTE
                    </div>
                    <div className="notas-resumen-info-body">
                        <p>
                            <strong>Nota Aprobatoria:</strong> 11.00 puntos
                        </p>
                        <p>
                            <strong>Sistema de Evaluación:</strong> El promedio final se calcula con 
                            Tareas Académicas (PTA), Examen de Medio Curso (EMC) y Examen de Fin de Curso (EFC).
                        </p>
                        <p>
                            <strong>Importante:</strong> Puedes ver el detalle completo de tus notas 
                            (incluyendo cada evaluación parcial) en la sección de "Notas Parciales".
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotasResumen;
