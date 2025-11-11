-- Script de inicialización de la base de datos LTI ATS
-- PostgreSQL
-- Este script debe ejecutarse DESPUÉS de crear la base de datos
-- Conectarse primero a la base de datos: \c lti_ats;

-- Crear esquema si no existe
CREATE SCHEMA IF NOT EXISTS public;

-- Extensiones útiles
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Aquí se pueden agregar tablas iniciales
-- Las migraciones de Prisma se encargarán de crear las tablas

