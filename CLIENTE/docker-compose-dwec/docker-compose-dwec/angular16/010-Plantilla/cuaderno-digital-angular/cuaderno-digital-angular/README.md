# Cuaderno Digital Angular 16

Migración completa de la aplicación "Cuaderno Digital" desde HTML/CSS/JavaScript vanilla a Angular 16.

## 📋 Descripción

Esta es una aplicación web tipo cuaderno digital que permite a los usuarios registrarse, iniciar sesión, y gestionar contenido educativo. Cuenta con un sistema completo de autenticación con roles (admin/user) y utiliza IndexedDB para el almacenamiento local de datos.

## ✨ Características

- ✅ **Sistema de Autenticación**: Login y registro de usuarios
- ✅ **Gestión de Perfiles**: Cada usuario puede tener su foto de perfil
- ✅ **Roles de Usuario**: Usuarios normales y administradores
- ✅ **CRUD de Usuarios**: Los administradores pueden gestionar usuarios (solo accesible para admins)
- ✅ **IndexedDB**: Almacenamiento local persistente
- ✅ **Integración con API**: Obtención de usuarios aleatorios desde randomuser.me
- ✅ **Consejos Aleatorios**: Integración con API de consejos en inglés
- ✅ **Reproductor de Música**: Música de fondo opcional
- ✅ **Diseño Responsive**: Diseño tipo cuaderno con decoraciones
- ✅ **Guards de Ruta**: Protección de rutas privadas y de administrador

## 🏗️ Estructura del Proyecto

```
src/
├── app/
│   ├── pages/              # Páginas principales
│   │   ├── home/           # Página principal
│   │   ├── login/          # Página de login
│   │   ├── registro/       # Página de registro
│   │   └── crud/           # CRUD de usuarios (solo admin)
│   ├── services/           # Servicios
│   │   ├── auth.service.ts          # Servicio de autenticación
│   │   ├── indexeddb.service.ts     # Servicio de IndexedDB
│   │   ├── api.service.ts           # Servicio de API externa
│   │   └── music.service.ts         # Servicio de música
│   ├── guards/             # Guards de Angular
│   │   ├── auth.guard.ts            # Guard de autenticación
│   │   └── admin.guard.ts           # Guard de administrador
│   ├── models/             # Modelos/Interfaces
│   │   └── usuario.model.ts         # Interface de Usuario
│   ├── app-routing.module.ts        # Configuración de rutas
│   └── app.module.ts                # Módulo principal
├── assets/
│   ├── estilos/            # Archivos CSS
│   └── img/                # Imágenes y recursos
└── styles.css              # Estilos globales
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js (versión 16 o superior)
- npm (viene con Node.js)
- Docker (si usas contenedores)

### Pasos para ejecutar

#### Opción 1: Ejecución Normal
1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar la aplicación**
   ```bash
   npm start
   # o
   ng serve
   ```

3. **Abrir en el navegador**
   - Navegar a `http://localhost:4200`

#### Opción 2: Con Docker (Puerto 4216)
1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Ejecutar en puerto específico**
   ```bash
   ng serve --host 0.0.0.0 --port 4216
   ```

3. **Abrir en el navegador**
   - Navegar a `http://localhost:4216`

### Configuración para Docker

Si estás ejecutando en Docker, asegúrate de:
- Usar `--host 0.0.0.0` para que Angular escuche en todas las interfaces
- Exponer el puerto 4216 en tu configuración de Docker
- El comando completo sería: `ng serve --host 0.0.0.0 --port 4216 --disable-host-check`

## 👤 Usuario por Defecto

El sistema viene con un usuario administrador preconfigurado:

- **Usuario**: `admin`
- **Contraseña**: `admin123`

Puedes usar estas credenciales para acceder al panel de administración (CRUD de usuarios).

## 🛣️ Rutas

- `/` - Página principal (Home)
- `/login` - Inicio de sesión
- `/registro` - Registro de nuevo usuario
- `/crud` - CRUD de usuarios (solo administradores)

## 🔐 Características de Seguridad

- **Auth Guard**: Protege rutas que requieren autenticación
- **Admin Guard**: Protege rutas que solo los administradores pueden acceder
- **IndexedDB**: Los datos se almacenan localmente de forma segura

## 🎨 Personalización

Los estilos están organizados en módulos en la carpeta `assets/estilos/`:

- `base.css` - Estilos base
- `notebook-layout.css` - Diseño tipo cuaderno
- `buttons.css` - Estilos de botones
- `cards.css` - Estilos de tarjetas
- `forms.css` - Estilos de formularios
- `decorative.css` - Elementos decorativos

## 📦 Tecnologías Utilizadas

- **Angular 16** - Framework principal
- **TypeScript** - Lenguaje de programación
- **IndexedDB** - Base de datos local
- **RxJS** - Programación reactiva
- **Angular Router** - Sistema de rutas
- **HttpClient** - Peticiones HTTP

## 🔄 APIs Externas

- **RandomUser API** (`https://randomuser.me/api/`) - Para generar usuarios aleatorios
- **Advice Slip API** (`https://api.adviceslip.com/advice`) - Para consejos en inglés

## 📝 Funcionalidades Principales

### Sistema de Autenticación
- Registro de nuevos usuarios con foto de perfil
- Login con validación
- Cierre de sesión
- Persistencia de sesión en IndexedDB

### CRUD de Usuarios (Solo Admin)
- Ver lista de todos los usuarios
- Crear nuevos usuarios manualmente
- Crear usuarios desde API externa
- Editar usuarios existentes
- Eliminar usuarios
- Cambiar roles (admin/user)

### Interfaz de Usuario
- Diseño responsive tipo cuaderno
- Música de fondo opcional
- Post-its con consejos
- Stickers decorativos
- Animaciones suaves

## 🏃‍♂️ Scripts Disponibles

```bash
# Desarrollo normal
npm start                    # Inicia servidor en puerto 4200

# Desarrollo con Docker (puerto 4216)
npm run start:docker         # Inicia servidor en puerto 4216 para Docker

# Build
npm run build               # Construye para producción

# Tests
npm test                    # Ejecuta tests unitarios
```

### 🐳 Usando Docker

**Opción 1: Con Docker Compose (Recomendado)**
```bash
# Construir y ejecutar
docker-compose up

# Ejecutar en segundo plano
docker-compose up -d

# Detener
docker-compose down
```

**Opción 2: Docker directo**
```bash
# Construir imagen
docker build -t cuaderno-digital-angular .

# Ejecutar contenedor
docker run -p 4216:4216 -v $(pwd):/app cuaderno-digital-angular
```

Luego abrir en navegador: `http://localhost:4216`

## 💡 Diferencias con la Versión Original

### Mejoras Arquitectónicas
1. **Separación de Responsabilidades**: Código organizado en servicios, componentes y guards
2. **Inyección de Dependencias**: Mejor mantenibilidad y testabilidad
3. **TypeScript**: Tipado fuerte para prevenir errores
4. **Observables (RxJS)**: Mejor manejo de operaciones asíncronas
5. **Routing Declarativo**: Navegación más robusta y predecible

### Características Nuevas
1. **Guards de Ruta**: Protección automática de rutas
2. **Servicios Singleton**: Estado compartido entre componentes
3. **Lifecycle Hooks**: Mejor control del ciclo de vida de componentes
4. **Modularización**: Código más organizado y reutilizable

---

**Made by: Carmen Castillo Gaitán ❤️**  
**Migrated to Angular 16**
