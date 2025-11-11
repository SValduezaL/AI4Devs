# LTI - ATS (Applicant Tracking System)

Sistema de seguimiento de candidatos desarrollado con React + Vite (frontend) y Node.js + Express (backend), utilizando PostgreSQL como base de datos. El proyecto sigue los principios de **Domain-Driven Design (DDD)** y **Test-Driven Development (TDD)**.

## 📋 Estructura del Proyecto

```
AI4Devs-ATS_LTI/
├── frontend/          # Aplicación React + Vite
│   ├── src/           # Código fuente
│   ├── public/        # Archivos públicos
│   └── package.json
│
├── backend/           # API Node.js + Express (DDD)
│   ├── src/
│   │   ├── domain/         # Capa de Dominio (lógica de negocio)
│   │   ├── application/    # Capa de Aplicación (casos de uso)
│   │   ├── infrastructure/ # Capa de Infraestructura (Prisma, etc.)
│   │   ├── presentation/   # Capa de Presentación (HTTP, controllers)
│   │   ├── shared/         # Código compartido
│   │   ├── config/         # Configuración e inyección de dependencias
│   │   └── __tests__/      # Tests (unitarios e integración)
│   ├── prisma/        # Schema y migraciones de Prisma
│   └── package.json
│
├── database/          # Scripts SQL y migraciones
│   ├── init.sql       # Script de inicialización
│   ├── create_database.sql
│   └── migrations/    # Migraciones manuales
│
└── README.md
```

## 🏗️ Arquitectura

### Backend - Domain-Driven Design (DDD)

El backend está organizado siguiendo los principios de DDD con las siguientes capas:

-   **Domain**: Lógica de negocio pura, entidades, value objects, interfaces de repositorios
-   **Application**: Casos de uso, orquestación, DTOs
-   **Infrastructure**: Implementaciones técnicas (Prisma, servicios externos)
-   **Presentation**: Controllers, rutas, middlewares HTTP
-   **Shared**: Errores personalizados, utilidades compartidas

Ver documentación completa en [`backend/src/README_DDD.md`](backend/src/README_DDD.md) y [`backend/ESTRUCTURA_DDD.md`](backend/ESTRUCTURA_DDD.md).

## 📦 Requisitos Previos

-   **Node.js** (v18 o superior)
-   **PostgreSQL** (v14 o superior)
-   **npm** o **yarn**

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd AI4Devs-ATS_LTI
```

### 2. Frontend

```bash
cd frontend
npm install
```

### 3. Backend

```bash
cd backend
npm install
```

### 4. Base de Datos

#### Opción A: Usando pgAdmin (Recomendado para Windows)

1. Abrir pgAdmin
2. Crear base de datos: `lti_ats`
3. Configurar variables de entorno (ver siguiente paso)

#### Opción B: Usando psql

```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear base de datos
CREATE DATABASE lti_ats;
```

#### Configurar Variables de Entorno

```bash
cd backend
cp .env.example .env
# Editar .env con tus credenciales de PostgreSQL
```

Ejemplo de `.env`:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/lti_ats?schema=public"
PORT=5000
NODE_ENV=development
```

#### Inicializar Base de Datos

```bash
cd backend

# Generar cliente de Prisma
npm run db:generate

# Crear primera migración
npm run db:migrate
# Escribir nombre: init

# (Opcional) Poblar datos iniciales
npm run db:seed
```

## ▶️ Arranque

### Frontend

```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:3000`

### Backend

```bash
cd backend
npm run dev
```

El backend estará disponible en `http://localhost:5000`

### Producción

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
npm start
```

## 🧪 Testing (TDD)

El backend está configurado para seguir **Test-Driven Development**.

### Comandos de Testing

```bash
cd backend

# Ejecutar todos los tests
npm test

# Modo watch (desarrollo TDD)
npm run test:watch

# Con cobertura de código
npm run test:coverage

# Solo tests unitarios
npm run test:unit

# Solo tests de integración
npm run test:integration
```

Ver documentación completa en [`backend/README_TDD.md`](backend/README_TDD.md).

## 🗄️ Comandos de Base de Datos

### Generación y Validación

```bash
cd backend

# Generar cliente de Prisma
npm run db:generate

# Formatear schema
npm run db:format

# Validar schema
npm run db:validate
```

### Migraciones

```bash
# Crear nueva migración (desarrollo)
npm run db:migrate

# Aplicar migraciones (producción)
npm run db:migrate:deploy

# Ver estado de migraciones
npm run db:migrate:status

# Resetear base de datos (⚠️ elimina todos los datos)
npm run db:migrate:reset
```

### Sincronización

```bash
# Push directo (sin migraciones, solo desarrollo)
npm run db:push

# Introspectar BD y actualizar schema
npm run db:pull
```

### Visualización y Datos

```bash
# Abrir Prisma Studio (interfaz gráfica)
npm run db:studio

# Ejecutar seed (datos iniciales)
npm run db:seed
```

Ver documentación completa en [`backend/README_DATABASE.md`](backend/README_DATABASE.md).

## 🛠️ Tecnologías

### Frontend

-   **React** 18
-   **Vite** 7
-   **JavaScript (ES Modules)**

### Backend

-   **Node.js** (ES Modules)
-   **Express** 4.21
-   **Prisma** 6.19 (ORM)
-   **Jest** 29.7 (Testing)
-   **Supertest** 7.1 (Testing HTTP)

### Base de Datos

-   **PostgreSQL** 14+
-   **Prisma** (ORM y migraciones)

## 📚 Documentación Adicional

### Backend

-   [`backend/src/README_DDD.md`](backend/src/README_DDD.md) - Guía completa de DDD
-   [`backend/ESTRUCTURA_DDD.md`](backend/ESTRUCTURA_DDD.md) - Visualización de la estructura
-   [`backend/README_TDD.md`](backend/README_TDD.md) - Guía de Test-Driven Development
-   [`backend/README_DATABASE.md`](backend/README_DATABASE.md) - Comandos y guía de base de datos
-   [`backend/README_SETUP.md`](backend/README_SETUP.md) - Guía de configuración inicial
-   [`backend/README_STRUCTURE.md`](backend/README_STRUCTURE.md) - Estructura y migración

### Base de Datos

-   [`database/README.md`](database/README.md) - Guía de creación y configuración de BD

## 🔄 Flujo de Desarrollo

### 1. Desarrollo con TDD

```bash
# 1. Escribir test que falle
npm run test:watch

# 2. Implementar código mínimo para que pase

# 3. Refactorizar manteniendo tests verdes
```

### 2. Agregar Nueva Funcionalidad

```bash
# 1. Crear entidad en domain/entities/
# 2. Definir interface de repositorio en domain/repositories/
# 3. Crear caso de uso en application/use-cases/
# 4. Implementar repositorio en infrastructure/database/repositories/
# 5. Crear controlador en presentation/controllers/
# 6. Agregar rutas en presentation/routes/
```

### 3. Modificar Base de Datos

```bash
# 1. Modificar prisma/schema.prisma
# 2. Crear migración
npm run db:migrate

# 3. Generar cliente
npm run db:generate
```

## 📝 Scripts Disponibles

### Frontend

-   `npm run dev` - Servidor de desarrollo
-   `npm run build` - Build de producción
-   `npm run preview` - Preview del build

### Backend

-   `npm run dev` - Servidor de desarrollo (watch mode)
-   `npm start` - Servidor de producción
-   `npm test` - Ejecutar tests
-   `npm run test:watch` - Tests en modo watch
-   `npm run test:coverage` - Tests con cobertura
-   Ver sección "Comandos de Base de Datos" para más comandos

## 🏷️ Versión

Versión actual: `0.0.0.0` (ver archivo [`VERSION`](VERSION))

## 📄 Licencia

MIT License - Ver [LICENSE.md](LICENSE.md) para más detalles.

Copyright (c) 2025 L1DR AI4Devs 202510

## 🤝 Contribuir

1. Crear una rama para la funcionalidad
2. Seguir TDD (escribir tests primero)
3. Seguir la arquitectura DDD
4. Asegurar que todos los tests pasen
5. Crear un Pull Request

## 📞 Soporte

Para más información sobre la estructura y arquitectura, consulta la documentación en las carpetas correspondientes.

---

**Desarrollado con ❤️ siguiendo DDD y TDD**
