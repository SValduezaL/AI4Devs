# Presentation Layer (Capa de Presentación)

Esta capa maneja la entrada y salida: HTTP, validación de requests, serialización de responses.

## Estructura

```
presentation/
├── controllers/       # Controladores HTTP
├── routes/           # Definición de rutas
├── middlewares/      # Middlewares de Express
├── dto/              # DTOs de request/response
└── validators/       # Validadores de entrada
```

## Principios

- **Delgada**: Solo maneja HTTP, no lógica de negocio
- **Usa casos de uso**: Los controladores llaman a casos de uso
- **Validación de entrada**: Valida y transforma requests
- **Serialización**: Transforma respuestas a formato HTTP

## Ejemplo de Controller

```javascript
// presentation/controllers/UserController.js
import { CreateUserUseCase } from '../../application/use-cases/CreateUserUseCase.js';
import { GetUserUseCase } from '../../application/use-cases/GetUserUseCase.js';

export class UserController {
    constructor(createUserUseCase, getUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
    }

    async create(req, res, next) {
        try {
            const userData = req.body;
            const user = await this.createUserUseCase.execute(userData);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await this.getUserUseCase.execute(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}
```

## Ejemplo de Route

```javascript
// presentation/routes/user.routes.js
import express from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();

// Inyección de dependencias (se hará en index.js)
let userController;

export const setUserController = (controller) => {
    userController = controller;
};

router.post('/', (req, res, next) => userController.create(req, res, next));
router.get('/:id', (req, res, next) => userController.getById(req, res, next));

export default router;
```

## Ejemplo de Middleware

```javascript
// presentation/middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Error de validación',
            details: err.message
        });
    }

    res.status(500).json({
        error: 'Error interno del servidor'
    });
};
```

