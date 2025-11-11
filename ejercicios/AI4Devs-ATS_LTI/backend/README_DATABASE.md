# Comandos de Base de Datos - PostgreSQL con Prisma

Este documento describe todos los comandos disponibles para trabajar con PostgreSQL usando Prisma.

## Configuración Inicial

### 1. Configurar Variables de Entorno

Asegúrate de tener un archivo `.env` en el directorio `backend/` con:

```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/lti_ats?schema=public"
```

### 2. Generar el Cliente de Prisma

Después de definir o modificar modelos en `prisma/schema.prisma`:

```bash
npm run db:generate
```

Este comando genera el cliente de Prisma basado en tu schema.

## Comandos Disponibles

### Generación y Validación

#### `npm run db:generate`
Genera el cliente de Prisma basado en el schema actual.

**Cuándo usarlo:**
- Después de modificar `prisma/schema.prisma`
- Después de clonar el proyecto
- Cuando el cliente está desactualizado

#### `npm run db:format`
Formatea el archivo `prisma/schema.prisma`.

#### `npm run db:validate`
Valida el schema de Prisma sin conectarse a la base de datos.

### Migraciones

#### `npm run db:migrate`
Crea una nueva migración en modo desarrollo. Te pedirá un nombre para la migración.

**Ejemplo:**
```bash
npm run db:migrate
# Te pedirá: "Enter a name for the new migration:"
# Escribe: init, add_users_table, etc.
```

**Cuándo usarlo:**
- Cuando modificas el schema y quieres crear una migración
- En desarrollo, para versionar cambios en la base de datos

#### `npm run db:migrate:deploy`
Aplica las migraciones pendientes en producción.

**Cuándo usarlo:**
- En producción o staging
- Para aplicar migraciones sin crear nuevas

#### `npm run db:migrate:reset`
Resetea la base de datos eliminando todos los datos y aplicando todas las migraciones desde cero.

⚠️ **CUIDADO:** Esto elimina todos los datos.

**Cuándo usarlo:**
- En desarrollo, para empezar desde cero
- Después de cambios importantes en el schema

#### `npm run db:migrate:status`
Muestra el estado de las migraciones (aplicadas y pendientes).

**Cuándo usarlo:**
- Para verificar qué migraciones están aplicadas
- Antes de desplegar a producción

### Sincronización

#### `npm run db:push`
Empuja los cambios del schema directamente a la base de datos sin crear migraciones.

**Cuándo usarlo:**
- En desarrollo rápido (prototipado)
- Para cambios experimentales
- ⚠️ No usar en producción

**Diferencia con `db:migrate`:**
- `db:push`: Cambios directos, sin historial
- `db:migrate`: Crea archivos de migración con historial

#### `npm run db:pull`
Introspecta la base de datos y actualiza el schema basándose en las tablas existentes.

**Cuándo usarlo:**
- Cuando la base de datos ya tiene tablas y quieres generar el schema
- Para sincronizar el schema con cambios hechos directamente en la BD

### Visualización y Datos

#### `npm run db:studio`
Abre Prisma Studio, una interfaz gráfica para ver y editar datos.

**Cuándo usarlo:**
- Para explorar los datos de la base de datos
- Para hacer cambios manuales durante desarrollo
- Para depurar problemas de datos

#### `npm run db:seed`
Ejecuta el script de seed para poblar la base de datos con datos iniciales.

**Configuración:**
El script de seed está en `prisma/seed.js`. Edítalo para agregar tus datos iniciales.

**Cuándo usarlo:**
- Después de crear la base de datos
- Después de resetear la base de datos
- Para poblar datos de prueba

## Flujo de Trabajo Recomendado

### Desarrollo

1. **Modificar el schema:**
   ```bash
   # Editar prisma/schema.prisma
   ```

2. **Crear migración:**
   ```bash
   npm run db:migrate
   # Escribir nombre de la migración
   ```

3. **Generar cliente:**
   ```bash
   npm run db:generate
   ```

4. **Opcional: Poblar datos:**
   ```bash
   npm run db:seed
   ```

### Producción

1. **Aplicar migraciones:**
   ```bash
   npm run db:migrate:deploy
   ```

2. **Generar cliente:**
   ```bash
   npm run db:generate
   ```

3. **Verificar estado:**
   ```bash
   npm run db:migrate:status
   ```

## Ejemplos de Uso

### Crear una nueva tabla

```bash
# 1. Editar prisma/schema.prisma y agregar el modelo
# 2. Crear migración
npm run db:migrate
# Nombre: add_users_table
# 3. Generar cliente
npm run db:generate
```

### Resetear base de datos en desarrollo

```bash
npm run db:migrate:reset
npm run db:seed
```

### Ver datos en Prisma Studio

```bash
npm run db:studio
# Se abrirá en http://localhost:5555
```

### Sincronizar schema con base de datos existente

```bash
npm run db:pull
npm run db:generate
```

## Troubleshooting

### Error: "Environment variable not found: DATABASE_URL"
- Verifica que el archivo `.env` existe en `backend/`
- Verifica que `DATABASE_URL` está correctamente configurada

### Error: "Migration engine failed to connect"
- Verifica que PostgreSQL está corriendo
- Verifica las credenciales en `DATABASE_URL`
- Verifica que la base de datos existe

### Error: "The database schema is not in sync"
- Ejecuta `npm run db:migrate` para sincronizar
- O `npm run db:push` si estás en desarrollo

### Cliente desactualizado
- Ejecuta `npm run db:generate` después de cada cambio en el schema

## Referencias

- [Documentación de Prisma](https://www.prisma.io/docs)
- [Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)

