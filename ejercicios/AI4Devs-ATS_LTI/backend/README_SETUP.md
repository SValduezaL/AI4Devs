# Configuración de la Base de Datos - LTI ATS

## Estado Actual

✅ La conexión a PostgreSQL funciona correctamente  
⚠️ La base de datos está vacía (sin tablas)

## Solución: Crear la Primera Migración

Tienes dos opciones:

### Opción 1: Usar el Script Automático (Recomendado)

Ejecuta el script de inicialización:

```powershell
cd backend
.\init_database.ps1
```

Este script:
1. Ejecutará `init.sql` para crear las extensiones necesarias
2. Creará la primera migración de Prisma con el modelo `Example`

### Opción 2: Pasos Manuales

#### Paso 1: Ejecutar init.sql

Primero, ejecuta el script de inicialización para crear las extensiones:

```powershell
# Opción A: Usando psql directamente
$env:PGPASSWORD = "tu_contraseña"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgresql -d lti_ats -f ..\database\init.sql
Remove-Item Env:\PGPASSWORD
```

#### Paso 2: Crear la Migración Inicial

Luego, crea la primera migración de Prisma:

```powershell
cd backend
npx prisma migrate dev --name init
```

Esto creará las tablas basadas en los modelos definidos en `schema.prisma`.

#### Paso 3: Generar el Cliente de Prisma

```powershell
npx prisma generate
```

## Verificar que Funciona

Después de crear la migración, puedes verificar:

```powershell
# Ver las tablas creadas
npx prisma db pull

# O abrir Prisma Studio para ver la base de datos
npx prisma studio
```

## Nota sobre `prisma db pull`

El comando `prisma db pull` se usa para **introspectar** una base de datos existente y generar modelos Prisma a partir de las tablas. 

Como tu base de datos está vacía, primero necesitas:
- **Crear tablas** usando `prisma migrate dev` (recomendado)
- O crear tablas manualmente con SQL

Una vez que tengas tablas, `prisma db pull` funcionará correctamente.

