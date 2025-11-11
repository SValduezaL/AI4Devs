# Estructura del Proyecto - DDD

## Migración de Archivos Existentes

Los siguientes archivos han sido movidos/actualizados para seguir DDD:

### Movidos:
- `src/utils/prisma.js` → `src/infrastructure/database/prisma/client.js`
- `src/routes/index.js` → `src/presentation/routes/index.js`
- `src/controllers/index.js` → Mantenido temporalmente (usar `presentation/controllers/` para nuevos)

### Nuevos:
- `src/presentation/middlewares/errorHandler.js` - Manejo de errores
- `src/shared/errors/` - Errores personalizados
- `src/shared/utils/result.js` - Clase Result para manejo funcional
- `src/config/dependencies.js` - Configuración de inyección de dependencias

## Próximos Pasos

1. **Crear entidades de dominio** según el modelo de negocio del ATS
2. **Definir interfaces de repositorios** en `domain/repositories/`
3. **Implementar casos de uso** en `application/use-cases/`
4. **Crear implementaciones de repositorios** en `infrastructure/database/repositories/`
5. **Crear controladores** en `presentation/controllers/`
6. **Configurar rutas** en `presentation/routes/`

## Convenciones

- **Nombres de archivos**: PascalCase para clases, camelCase para funciones
- **Imports**: Usar rutas absolutas desde `src/`
- **Tests**: Mantener estructura similar en `__tests__/`

