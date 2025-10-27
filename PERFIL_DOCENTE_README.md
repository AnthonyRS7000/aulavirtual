# Perfil Docente - Implementación Completa

## ✅ Archivos Creados/Modificados

### Componentes Nuevos
1. **`/src/components/PerfilDropdownDocente.tsx`**
   - Dropdown del perfil del docente con opciones "Mi perfil" y "Cerrar sesión"
   - Integrado con hooks de tema y autenticación
   - Estilos con modo oscuro

2. **`/src/components/PerfilDropdownDocente.css`**
   - Estilos del dropdown con tema claro/oscuro
   - Animaciones y transiciones suaves
   - Responsive design

3. **`/src/features/docente/pages/PerfilDocente.tsx`**
   - Página completa del perfil del docente
   - Datos simulados (listos para ser reemplazados por API)
   - Formulario con campos editables (teléfono) y de solo lectura
   - Modal para subir fotografía

4. **`/src/features/docente/css/PerfilDocente.css`**
   - Estilos completos del perfil con variables CSS
   - Modo claro/oscuro
   - Responsive design (desktop, tablet, mobile)
   - Animaciones y transiciones

### Archivos Modificados
1. **`/src/features/docente/components/layout/TopbarDocente.tsx`**
   - Agregado estado para controlar el dropdown del perfil
   - Integrado componente `PerfilDropdownDocente`
   - Avatar clickeable para abrir/cerrar dropdown

2. **`/src/App.tsx`**
   - Importado componente `PerfilDocente`
   - Agregada ruta `/docente/perfil`

## 📋 Datos Simulados del Docente

Actualmente el perfil muestra datos de prueba:

```typescript
const usuarioSimulado = {
  nombres: 'Aldo Fernando',
  apellidos: 'Ramírez García',
  email: 'aldo.ramirez@udh.edu.pe',
  foto: null
};

const datosDocenteSimulado = {
  codigo: 'D00123456',
  documento: '43521876',
  dni: '43521876',
  facultad: 'FACULTAD DE INGENIERÍA',
  departamento: 'DEPARTAMENTO ACADÉMICO DE INGENIERÍA DE SISTEMAS',
  especialidad: 'Ingeniería de Software',
  categoria: 'Docente Ordinario - Asociado',
  regimen: 'Dedicación Exclusiva',
  telefono: '962123456',
  celular: '962123456',
  sedalu: 1, // 1 = Huánuco, 2 = Tingo María
  grado_academico: 'Doctor en Ingeniería de Sistemas',
  email_personal: 'aldo.ramirez@gmail.com'
};
```

## 🔌 Integración con API (Próximos Pasos)

### 1. Obtener Datos del Docente

Reemplazar el `useEffect` en `PerfilDocente.tsx`:

```typescript
useEffect(() => {
  // CAMBIAR ESTO:
  const usuarioSimulado = {...};
  const datosDocenteSimulado = {...};
  
  // POR ESTO:
  const obtenerDatosDocente = async () => {
    try {
      // Obtener del localStorage o hacer llamada a la API
      const usuario = JSON.parse(localStorage.getItem('usuario_docente') || '{}');
      const datosDocente = JSON.parse(localStorage.getItem('datos_docente') || '{}');
      
      // O hacer llamada directa a la API:
      // const response = await ApiService.get('/docente/perfil');
      // const { usuario, datos_docente } = response.data;
      
      setUserData(usuario);
      setDocenteData(datosDocente);
      
      // Inicializar foto y teléfono...
    } catch (error) {
      console.error('Error al obtener datos del docente:', error);
    }
  };
  
  obtenerDatosDocente();
}, []);
```

### 2. Actualizar Número de Teléfono

En la función `handlePhoneSubmit`:

```typescript
const handlePhoneSubmit = async () => {
  const cleaned = (phoneNumber || '').trim();
  if (!cleaned || cleaned.length < 6) {
    setSaveMessage('Ingrese un número válido');
    setTimeout(() => setSaveMessage(null), 3000);
    return;
  }

  try {
    // AGREGAR LLAMADA A LA API:
    await ApiService.put('/docente/actualizar-telefono', {
      telefono: cleaned,
      celular: cleaned
    });
    
    // Actualizar localStorage
    const datos = { ...(docenteData || {}), telefono: cleaned, celular: cleaned };
    localStorage.setItem('datos_docente', JSON.stringify(datos));
    setDocenteData(datos);
    
    setSaveMessage('Número actualizado');
    setTimeout(() => setSaveMessage(null), 3000);
  } catch (error) {
    console.error('Error al actualizar teléfono:', error);
    setSaveMessage('Error al guardar');
    setTimeout(() => setSaveMessage(null), 3000);
  }
};
```

### 3. Subir Fotografía

En el botón "Guardar" del modal de foto:

```typescript
<button className="btn-primary" onClick={async () => {
  if (!photoFile) return;
  
  try {
    // AGREGAR LLAMADA A LA API:
    const formData = new FormData();
    formData.append('foto', photoFile);
    
    await ApiService.post('/docente/subir-foto', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    // Actualizar estado local
    const nuevaFotoUrl = URL.createObjectURL(photoFile);
    setPhoto(nuevaFotoUrl);
    
    setSaveMessage('Foto actualizada correctamente');
    
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setPhotoFile(null);
    setPhotoModalOpen(false);
  } catch (error) {
    console.error('Error al subir foto:', error);
    setPhotoError('Error al subir la imagen. Intenta nuevamente.');
  }
}} disabled={!photoFile}>Guardar</button>
```

## 🎨 Características Implementadas

### Funcionalidades
- ✅ Visualización de datos del docente (nombres, apellidos, DNI, facultad, departamento, etc.)
- ✅ Campo editable de número celular con validación
- ✅ Modal para subir fotografía con validaciones (tamaño máx 2MB, formatos JPG/PNG)
- ✅ Dropdown de perfil en el topbar con opciones de navegación
- ✅ Cerrar sesión integrado

### Diseño
- ✅ Modo claro/oscuro completamente funcional
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Animaciones suaves y transiciones
- ✅ Estilos consistentes con el resto de la aplicación
- ✅ Variables CSS para fácil personalización

### Validaciones
- ✅ Número de teléfono mínimo 6 dígitos
- ✅ Foto máximo 2MB
- ✅ Formatos permitidos: JPG, JPEG, PNG
- ✅ Preview de imagen antes de subir

## 🚀 Cómo Usar

1. **Acceder al perfil:**
   - Click en el avatar del docente en el topbar
   - Seleccionar "Mi perfil"
   - O navegar directamente a `/docente/perfil`

2. **Editar teléfono:**
   - Hacer click en el campo "Número Celular"
   - Editar el número
   - Presionar Enter o click fuera del campo para guardar
   - O hacer click en el botón "Actualizar"

3. **Subir foto:**
   - Click en el botón "Cargar Fotografía" (cuando se implemente)
   - Seleccionar imagen desde el dispositivo
   - Preview automático
   - Click en "Guardar" para confirmar

## 📝 Notas Importantes

- Los datos actuales son simulados y están hardcodeados en el componente
- La estructura de datos está lista para recibir información de la API
- Los campos de solo lectura incluyen: nombres, apellidos, DNI, facultad, departamento, especialidad, categoría, régimen, grado académico, código y correo institucional
- El único campo editable actualmente es el número celular
- La funcionalidad de subir foto está preparada pero requiere endpoint de API

## 🔄 Migración de Datos

Cuando la API esté lista, simplemente:
1. Reemplazar los datos simulados con llamadas a la API
2. Descomentar las líneas marcadas con `// TODO: API`
3. Verificar que los nombres de campos coincidan con la respuesta de la API
4. Probar la funcionalidad de actualización y subida de archivos

---

**Estado:** ✅ Completamente funcional con datos simulados, listo para integración con API
