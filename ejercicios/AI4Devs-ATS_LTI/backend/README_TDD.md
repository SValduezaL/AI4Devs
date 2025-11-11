# Test-Driven Development (TDD) - Backend LTI ATS

Este proyecto está configurado para seguir TDD (Test-Driven Development).

## Estructura de Tests

```
backend/
├── src/
│   ├── __tests__/
│   │   ├── unit/              # Tests unitarios
│   │   │   ├── controllers/
│   │   │   └── routes/
│   │   ├── integration/       # Tests de integración
│   │   └── setup.js           # Configuración global de tests
│   ├── controllers/
│   ├── routes/
│   └── index.js
├── jest.config.js             # Configuración de Jest
└── package.json
```

## Comandos Disponibles

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm run test:watch
```

### Ejecutar tests con cobertura
```bash
npm run test:coverage
```

### Ejecutar solo tests unitarios
```bash
npm run test:unit
```

### Ejecutar solo tests de integración
```bash
npm run test:integration
```

## Flujo TDD

### 1. Red (Red) - Escribir un test que falle
```javascript
// src/__tests__/unit/controllers/example.test.js
import { describe, it, expect } from '@jest/globals';
import { nuevaFuncion } from '../../../controllers/example.js';

describe('Example Controller', () => {
    it('debería hacer algo específico', () => {
        const result = nuevaFuncion();
        expect(result).toBe('esperado');
    });
});
```

### 2. Verde (Green) - Escribir el código mínimo para que pase
```javascript
// src/controllers/example.js
export const nuevaFuncion = () => {
    return 'esperado';
};
```

### 3. Refactorizar - Mejorar el código manteniendo los tests verdes

## Tipos de Tests

### Tests Unitarios
- Prueban funciones/controladores de forma aislada
- Ubicación: `src/__tests__/unit/`
- Ejemplo: `src/__tests__/unit/controllers/index.test.js`

### Tests de Integración
- Prueban el flujo completo de la aplicación
- Incluyen requests HTTP reales
- Ubicación: `src/__tests__/integration/`
- Ejemplo: `src/__tests__/integration/app.test.js`

## Configuración

### Jest
La configuración de Jest está en `jest.config.js` y soporta:
- ES Modules (import/export)
- Supertest para tests de API
- Cobertura de código
- Timeouts configurables

### Variables de Entorno para Tests
Crea un archivo `.env.test` para variables específicas de testing:
```env
NODE_ENV=test
PORT=5001
```

## Ejemplos

### Test de Controlador
```javascript
import { describe, it, expect } from '@jest/globals';
import { getHealth } from '../../../controllers/index.js';

describe('Controllers', () => {
    it('debería retornar status ok', () => {
        const req = {};
        const res = { json: jest.fn() };
        
        getHealth(req, res);
        
        expect(res.json).toHaveBeenCalledWith({
            status: 'ok',
            message: 'LTI ATS Backend está funcionando'
        });
    });
});
```

### Test de API
```javascript
import { describe, it, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../index.js';

describe('API Tests', () => {
    it('GET / debería retornar mensaje', async () => {
        const response = await request(app)
            .get('/')
            .expect(200);
        
        expect(response.body.message).toBe('LTI ATS Backend API');
    });
});
```

## Mejores Prácticas

1. **Escribe tests primero** (TDD)
2. **Un test, una aserción** (cuando sea posible)
3. **Nombres descriptivos** para tests y describe blocks
4. **Tests independientes** - no deben depender unos de otros
5. **Limpieza** - usa `beforeEach`/`afterEach` para setup/teardown
6. **Mocking** - mockea dependencias externas (BD, APIs, etc.)

## Cobertura de Código

El objetivo es mantener una cobertura alta (idealmente >80%). Revisa el reporte con:
```bash
npm run test:coverage
```

El reporte se genera en `coverage/` y puedes abrir `coverage/index.html` en el navegador.

