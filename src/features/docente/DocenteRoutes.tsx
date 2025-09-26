import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardDocente from './pages/DashboardDocente';
import GestionCursos from './pages/GestionCursos';
import GestionEstudiantes from './pages/GestionEstudiantes';

const DocenteRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardDocente />} />
      <Route path="/cursos" element={<GestionCursos />} />
      <Route path="/estudiantes" element={<GestionEstudiantes />} />
    </Routes>
  );
};

export default DocenteRoutes;