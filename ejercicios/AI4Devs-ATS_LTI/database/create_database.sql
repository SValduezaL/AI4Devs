-- Script para crear la base de datos LTI ATS
-- Ejecutar este script como superusuario (postgres) o con permisos de creación de base de datos

-- Crear base de datos
CREATE DATABASE lti_ats
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Comentario en la base de datos
COMMENT ON DATABASE lti_ats IS 'Base de datos para el sistema ATS LTI';


