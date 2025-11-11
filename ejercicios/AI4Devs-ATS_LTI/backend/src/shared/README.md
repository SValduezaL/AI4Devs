# Shared Layer (Capa Compartida)

Esta capa contiene código compartido entre todas las capas: utilidades, tipos, constantes, etc.

## Estructura

```
shared/
├── errors/           # Errores personalizados
├── types/            # Tipos y constantes
├── utils/            # Utilidades generales
└── validators/       # Validadores compartidos
```

## Principios

- **Sin dependencias**: No depende de otras capas
- **Reutilizable**: Código usado por múltiples capas
- **Genérico**: No contiene lógica de negocio específica

## Ejemplo de Error Personalizado

```javascript
// shared/errors/DomainError.js
export class DomainError extends Error {
    constructor(message, code) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}

// shared/errors/NotFoundError.js
import { DomainError } from './DomainError.js';

export class NotFoundError extends DomainError {
    constructor(resource) {
        super(`${resource} no encontrado`, 'NOT_FOUND');
    }
}
```

## Ejemplo de Utilidad

```javascript
// shared/utils/result.js
export class Result {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static ok(data) {
        return new Result(true, data, null);
    }

    static fail(error) {
        return new Result(false, null, error);
    }
}
```

