# Base de Datos LTI ATS

## Crear la Base de Datos PostgreSQL

### Opción 1: Usando psql (Línea de comandos)

1. **Conectarse a PostgreSQL como superusuario:**
   ```bash
   psql -U postgres
   ```
   (Te pedirá la contraseña del usuario postgres)

2. **Crear la base de datos:**
   ```sql
   CREATE DATABASE lti_ats;
   ```

3. **Conectarse a la nueva base de datos:**
   ```sql
   \c lti_ats
   ```

4. **Ejecutar el script de inicialización:**
   ```sql
   \i init.sql
   ```
   O copiar y pegar el contenido de `init.sql` directamente en psql.

### Opción 2: Usando el script SQL

1. **Ejecutar el script de creación:**
   ```bash
   psql -U postgres -f create_database.sql
   ```

2. **Conectarse a la base de datos:**
   ```bash
   psql -U postgres -d lti_ats
   ```

3. **Ejecutar el script de inicialización:**
   ```bash
   psql -U postgres -d lti_ats -f init.sql
   ```

### Opción 3: Usando pgAdmin (Interfaz gráfica)

1. Abrir pgAdmin
2. Conectarse al servidor PostgreSQL
3. Click derecho en "Databases" → "Create" → "Database"
4. Nombre: `lti_ats`
5. Owner: `postgres` (o tu usuario)
6. Click en "Save"
7. Expandir la base de datos `lti_ats`
8. Click derecho en "Schemas" → "Query Tool"
9. Copiar y pegar el contenido de `init.sql`
10. Ejecutar (F5)

## Verificar la Creación

Para verificar que la base de datos se creó correctamente:

```sql
-- Listar todas las bases de datos
\l

-- Conectarse a lti_ats
\c lti_ats

-- Verificar extensiones
\dx

-- Verificar esquemas
\dn
```

## Configurar Variables de Entorno

Después de crear la base de datos, configura el archivo `.env` en el backend:

```bash
cd backend
cp .env.example .env
```

Edita `.env` y configura la `DATABASE_URL`:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/lti_ats?schema=public"
```

**Ejemplo con usuario postgres:**
```
DATABASE_URL="postgresql://postgres:tu_contraseña@localhost:5432/lti_ats?schema=public"
```

## Próximos Pasos

Una vez creada la base de datos y configurado el `.env`:

1. Generar el cliente de Prisma:
   ```bash
   cd backend
   npx prisma generate
   ```

2. Ejecutar migraciones:
   ```bash
   npx prisma migrate dev --name init
   ```

3. (Opcional) Abrir Prisma Studio para ver la base de datos:
   ```bash
   npx prisma studio
   ```


