# Tests - Backend LTI ATS

## Estructura

```
__tests__/
├── unit/              # Tests unitarios
│   ├── controllers/   # Tests de controladores
│   └── routes/        # Tests de rutas
├── integration/       # Tests de integración
│   └── app.test.js    # Tests de la aplicación completa
└── setup.js           # Configuración global
```

## Convenciones

- **Nombres de archivos**: `*.test.js` o `*.spec.js`
- **Ubicación**: Junto al código o en `__tests__/`
- **Organización**: Separar unitarios de integración

## Ejecutar Tests

```bash
# Todos los tests
npm test

# Modo watch (desarrollo)
npm run test:watch

# Con cobertura
npm run test:coverage

# Solo unitarios
npm run test:unit

# Solo integración
npm run test:integration
```

## Ejemplos

Ver los archivos de ejemplo en:
- `unit/controllers/index.test.js` - Test de controlador
- `unit/routes/index.test.js` - Test de ruta
- `integration/app.test.js` - Test de API completa

