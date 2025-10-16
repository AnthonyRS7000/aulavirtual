// Servidor mock simple para probar la aplicación
// Ejecutar con: node server-mock.js

const http = require('http');
const url = require('url');

const PORT = 8000;

// Datos de prueba
const mockData = {
  estudiantes: {
    notas: [
      {
        codigo_curso: "IISIS101",
        nombre_curso: "Introducción a la Ingeniería",
        seccion: "A",
        TA1: "15",
        TA2: "14",
        TA3: "16",
        TA4: "15",
        PTA: "15",
        EMC: "14",
        EFC: "16",
        SUS: "00",
        pfin: 15,
        pfinL: "QUINCE",
        PorcInasis: "5%",
        vecesLlevado: 1
      },
      {
        codigo_curso: "MATH102",
        nombre_curso: "Cálculo I",
        seccion: "B",
        TA1: "10",
        TA2: "09",
        TA3: "11",
        TA4: "10",
        PTA: "10",
        EMC: "11",
        EFC: "11",
        SUS: "00",
        pfin: 11,
        pfinL: "ONCE",
        PorcInasis: "15%",
        vecesLlevado: 2
      },
      {
        codigo_curso: "PROG103",
        nombre_curso: "Programación Básica",
        seccion: "C",
        TA1: "18",
        TA2: "17",
        TA3: "19",
        TA4: "18",
        PTA: "18",
        EMC: "17",
        EFC: "18",
        SUS: "00",
        pfin: 18,
        pfinL: "DIECIOCHO",
        PorcInasis: "3%",
        vecesLlevado: 1
      },
      {
        codigo_curso: "PHYS104",
        nombre_curso: "Física General",
        seccion: "A",
        TA1: "08",
        TA2: "09",
        TA3: "07",
        TA4: "08",
        PTA: "08",
        EMC: "09",
        EFC: "10",
        SUS: "00",
        pfin: 9,
        pfinL: "NUEVE",
        PorcInasis: "25%",
        vecesLlevado: 3
      }
    ]
  }
};

const server = http.createServer((req, res) => {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  console.log(`[${new Date().toISOString()}] ${req.method} ${pathname}`);
  console.log('Query params:', query);

  // Responder a /api/estudiantes/notas
  if (pathname === '/api/estudiantes/notas' && req.method === 'GET') {
    const codalu = query.codalu;
    const semsem = query.semsem;
    
    console.log(`Código alumno: ${codalu}, Semestre: ${semsem}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockData.estudiantes.notas));
    return;
  }

  // Responder a /api/horarios (para ClasesContext)
  if (pathname.includes('/api/horarios') && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: "success",
      data: []
    }));
    return;
  }

  // Ruta no encontrada
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`\n🚀 Servidor mock corriendo en http://127.0.0.1:${PORT}`);
  console.log(`📝 Endpoints disponibles:`);
  console.log(`   - GET http://127.0.0.1:${PORT}/api/estudiantes/notas?codalu=XXX&semsem=2025-2`);
  console.log(`\n✅ Listo para recibir peticiones del frontend\n`);
});
