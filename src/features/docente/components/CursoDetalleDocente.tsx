import { useState } from 'react';
import {
    FaArrowLeft,
    FaVideo,
    FaEllipsisV,
    FaCalendarAlt,
    FaInfoCircle,
    FaPlus,
    FaClipboardList,
    FaFileAlt,
    FaTasks,
    FaQuestionCircle
} from 'react-icons/fa';
import './CursoDetalleDocente.css';

// ⭐ INTERFACES
interface Curso {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    ciclo: string;
    creditos: number;
    estudiantes: number;
    estado: 'activo' | 'inactivo' | 'archivado';
    fechaCreacion: string;
    ultimaActividad: string;
    codigoAcceso: string;
}

interface Material {
    id: number;
    titulo: string;
    tipo: 'documento' | 'video' | 'enlace' | 'presentacion';
    fechaSubida: string;
    descargas: number;
    cursoId: number;
}

interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    fechaLimite: string;
    puntuacion: number;
    entregas: number;
    totalEstudiantes: number;
    estado: 'publicada' | 'borrador' | 'cerrada';
    cursoId: number;
}

interface Anuncio {
    id: number;
    titulo: string;
    contenido: string;
    fecha: string;
    fijado: boolean;
    cursoId: number;
}

interface Props {
    curso: Curso;
    onVolver: () => void;
    onAbrirModal: (tipo: 'material' | 'tarea' | 'anuncio') => void;
    onEntrarTarea?: (tareaId: number) => void;      // ✅ Nueva función
    onEntrarAnuncio?: (anuncioId: number) => void;  // ✅ Nueva función
    materiales: Material[];
    tareas: Tarea[];
    anuncios: Anuncio[];
}

export const CursoDetalle = ({ 
    curso, 
    onVolver, 
    onAbrirModal, 
    onEntrarTarea,      // ✅ Nueva prop
    onEntrarAnuncio,    // ✅ Nueva prop
    materiales, 
    tareas, 
    anuncios 
}: Props) => {
    const [pestañaActiva, setPestañaActiva] = useState<'tablón' | 'trabajo' | 'personas'>('tablón');

    return (
        <div className="classroom-container">

            {/* Header exacto como Google Classroom */}
            <div className="classroom-header">
                <button className="btn-volver-classroom" onClick={onVolver}>
                    <FaArrowLeft />
                </button>

                <div className="classroom-header-content">
                    <div className="curso-title-area">
                        <h1 className="curso-nombre-classroom">{curso.nombre.toUpperCase()}</h1>
                        <p className="curso-codigo-classroom">({curso.codigo})</p>
                        <p className="curso-seccion-classroom">A</p>
                    </div>

                    <div className="classroom-header-actions">
                        <button className="classroom-icon-btn">
                            <FaVideo />
                        </button>
                        <button className="classroom-icon-btn">
                            <FaCalendarAlt />
                        </button>
                        <button className="classroom-icon-btn">
                            <FaInfoCircle />
                        </button>
                    </div>
                </div>

                {/* Decoración con iconos graduación */}
                <div className="graduation-decoration">
                    <div className="graduation-cap-1"></div>
                    <div className="graduation-cap-2"></div>
                </div>
            </div>

            {/* Navegación de pestañas exacta */}
            <div className="classroom-tabs">
                <button
                    className={`classroom-tab ${pestañaActiva === 'tablón' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('tablón')}
                >
                    Tablón
                </button>
                <button
                    className={`classroom-tab ${pestañaActiva === 'trabajo' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('trabajo')}
                >
                    Trabajo de clase
                </button>
                <button
                    className={`classroom-tab ${pestañaActiva === 'personas' ? 'active' : ''}`}
                    onClick={() => setPestañaActiva('personas')}
                >
                    Personas
                </button>
            </div>

            {/* Contenido principal */}
            <div className="classroom-content">

                {/* PESTAÑA TABLÓN - Como Google Classroom */}
                {pestañaActiva === 'tablón' && (
                    <div className="classroom-main-layout">

                        {/* Sidebar izquierdo */}
                        <div className="classroom-sidebar">

                            {/* Card de Meet */}
                            <div className="meet-card">
                                <div className="meet-header">
                                    <div className="meet-icon">
                                        <FaVideo />
                                    </div>
                                    <span>Meet</span>
                                    <button className="meet-menu">
                                        <FaEllipsisV />
                                    </button>
                                </div>
                                <button className="meet-join-btn">
                                    Unirse
                                </button>
                            </div>

                            {/* Próximas entregas */}
                            <div className="upcoming-card">
                                <h3>Próximas entregas</h3>
                                {tareas.length > 0 ? (
                                    <div className="upcoming-assignments">
                                        {tareas.slice(0, 3).map(tarea => (
                                            <div key={tarea.id} className="assignment-preview">
                                                <h4 
                                                    onClick={() => onEntrarTarea && onEntrarTarea(tarea.id)}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {tarea.titulo}
                                                </h4>
                                                <p>Vence {new Date(tarea.fechaLimite).toLocaleDateString('es-ES')}</p>
                                            </div>
                                        ))}
                                        <button className="ver-todo-btn">Ver todo</button>
                                    </div>
                                ) : (
                                    <div className="no-assignments">
                                        <p>¡Yuju! ¡No tienes que entregar nada pronto!</p>
                                        <button className="ver-todo-btn">Ver todo</button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Contenido principal del tablón */}
                        <div className="classroom-feed">

                            {/* Área para crear anuncio/tarea */}
                            <div className="create-announcement">
                                <div className="teacher-avatar">
                                    <div className="avatar-circle">
                                        {curso.nombre.charAt(0)}
                                    </div>
                                </div>
                                <div
                                    className="announcement-input"
                                    onClick={() => onAbrirModal('anuncio')}
                                >
                                    Anuncia algo a tu clase
                                </div>
                            </div>

                            {/* Botones de acción del docente */}
                            <div className="teacher-actions">
                                <button
                                    className="action-btn create-assignment"
                                    onClick={() => onAbrirModal('tarea')}
                                >
                                    <FaTasks />
                                    <span>Crear</span>
                                    <div className="dropdown-arrow">
                                        <div className="create-dropdown">
                                            <button onClick={() => onAbrirModal('tarea')}>
                                                <FaTasks /> Tarea
                                            </button>
                                            <button onClick={() => onAbrirModal('material')}>
                                                <FaFileAlt /> Material
                                            </button>
                                            <button>
                                                <FaQuestionCircle /> Pregunta
                                            </button>
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* Feed de actividades */}
                            <div className="activity-feed">

                                {/* ✅ ANUNCIOS CLICKEABLES */}
                                {anuncios.map(anuncio => (
                                    <div 
                                        key={anuncio.id} 
                                        className="classroom-post"
                                        onClick={() => onEntrarAnuncio && onEntrarAnuncio(anuncio.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="post-header">
                                            <div className="teacher-avatar">
                                                <div className="avatar-circle">
                                                    {curso.nombre.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="post-info">
                                                <span className="teacher-name">Aldo Ramirez Chaupis</span>
                                                <span className="post-action">ha publicado: {anuncio.titulo}</span>
                                                <span className="post-date">{new Date(anuncio.fecha).toLocaleDateString('es-ES')}</span>
                                            </div>
                                            <button 
                                                className="post-menu"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FaEllipsisV />
                                            </button>
                                        </div>
                                        <div className="post-content">
                                            <p>{anuncio.contenido.substring(0, 100)}...</p>
                                        </div>
                                    </div>
                                ))}

                                {/* ✅ TAREAS CLICKEABLES */}
                                {tareas.map(tarea => (
                                    <div 
                                        key={tarea.id} 
                                        className="classroom-post assignment-post"
                                        onClick={() => onEntrarTarea && onEntrarTarea(tarea.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="post-header">
                                            <div className="assignment-icon">
                                                <FaClipboardList />
                                            </div>
                                            <div className="post-info">
                                                <span className="teacher-name">Aldo Ramirez Chaupis</span>
                                                <span className="post-action">ha publicado una nueva tarea: {tarea.titulo}</span>
                                                <span className="post-date">26 sept</span>
                                            </div>
                                            <button 
                                                className="post-menu"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <FaEllipsisV />
                                            </button>
                                        </div>
                                        <div className="assignment-preview">
                                            <h4>{tarea.titulo}</h4>
                                            <p>{tarea.descripcion}</p>
                                            <div className="assignment-stats">
                                                <span>{tarea.entregas}/{tarea.totalEstudiantes} entregadas</span>
                                                <span>{tarea.puntuacion} puntos</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Estudiante comentario (ejemplo) */}
                                <div className="classroom-post student-comment">
                                    <div className="post-header">
                                        <div className="student-avatar">
                                            <div className="avatar-circle student">I</div>
                                        </div>
                                        <div className="post-info">
                                            <span className="student-name">INGRID SARAHI ROSALES CARLOS</span>
                                            <span className="post-date">28 ago</span>
                                        </div>
                                        <button className="post-menu">
                                            <FaEllipsisV />
                                        </button>
                                    </div>
                                    <div className="post-content">
                                        <a href="#" className="whatsapp-link">
                                            https://chat.whatsapp.com/Fze7bo5KOZx2yHtx0zAEak?mode=ems_copy_c
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* PESTAÑA TRABAJO DE CLASE */}
                {pestañaActiva === 'trabajo' && (
                    <div className="classroom-work">
                        <div className="work-header">
                            <button
                                className="create-work-btn"
                                onClick={() => onAbrirModal('tarea')}
                            >
                                <FaPlus />
                                Crear
                            </button>
                        </div>

                        <div className="work-list">
                            {/* ✅ TAREAS CLICKEABLES EN TRABAJO DE CLASE */}
                            {tareas.map(tarea => (
                                <div 
                                    key={tarea.id} 
                                    className="work-item"
                                    onClick={() => onEntrarTarea && onEntrarTarea(tarea.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="work-icon">
                                        <FaClipboardList />
                                    </div>
                                    <div className="work-content">
                                        <h4>{tarea.titulo}</h4>
                                        <p>Vence {new Date(tarea.fechaLimite).toLocaleDateString('es-ES')} • {tarea.puntuacion} puntos</p>
                                    </div>
                                    <div className="work-stats">
                                        <span>{tarea.entregas} entregadas</span>
                                    </div>
                                </div>
                            ))}

                            {materiales.map(material => (
                                <div key={material.id} className="work-item">
                                    <div className="work-icon">
                                        <FaFileAlt />
                                    </div>
                                    <div className="work-content">
                                        <h4>{material.titulo}</h4>
                                        <p>Publicado {new Date(material.fechaSubida).toLocaleDateString('es-ES')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PESTAÑA PERSONAS */}
                {pestañaActiva === 'personas' && (
                    <div className="classroom-people">
                        <div className="teachers-section">
                            <h3>Profesores</h3>
                            <div className="person-item teacher">
                                <div className="person-avatar">
                                    <div className="avatar-circle">A</div>
                                </div>
                                <span>Aldo Ramirez Chaupis</span>
                            </div>
                        </div>

                        <div className="students-section">
                            <h3>Estudiantes <span className="count">{curso.estudiantes}</span></h3>
                            <div className="students-list">
                                <div className="person-item student">
                                    <div className="person-avatar">
                                        <div className="avatar-circle student">I</div>
                                    </div>
                                    <span>Ingrid Sarahi Rosales Carlos</span>
                                </div>
                                {/* Más estudiantes... */}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};