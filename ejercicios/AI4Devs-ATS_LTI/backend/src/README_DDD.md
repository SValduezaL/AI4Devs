# Domain-Driven Design (DDD) - Estructura del Backend

Este proyecto sigue los principios de **Domain-Driven Design (DDD)** para organizar el código de manera clara y mantenible.

## Estructura de Capas

```
src/
├── domain/              # Capa de Dominio (Lógica de negocio pura)
│   ├── entities/        # Entidades de dominio
│   ├── value-objects/   # Objetos de valor
│   ├── services/        # Servicios de dominio
│   ├── repositories/    # Interfaces de repositorios
│   ├── events/          # Eventos de dominio
│   └── exceptions/      # Excepciones de dominio
│
├── application/         # Capa de Aplicación (Orquestación)
│   ├── use-cases/       # Casos de uso
│   ├── services/        # Servicios de aplicación
│   ├── dto/             # Data Transfer Objects
│   ├── mappers/         # Mappers entre capas
│   └── validators/      # Validadores
│
├── infrastructure/      # Capa de Infraestructura (Implementaciones técnicas)
│   ├── database/        # Acceso a datos
│   │   ├── prisma/      # Cliente de Prisma
│   │   ├── repositories/# Implementaciones de repositorios
│   │   └── mappers/     # Mappers de persistencia
│   ├── external/        # Servicios externos
│   ├── config/          # Configuración
│   └── logging/         # Sistema de logging
│
├── presentation/        # Capa de Presentación (HTTP, API)
│   ├── controllers/     # Controladores HTTP
│   ├── routes/          # Definición de rutas
│   ├── middlewares/     # Middlewares de Express
│   ├── dto/             # DTOs de request/response
│   └── validators/      # Validadores de entrada
│
└── shared/              # Capa Compartida (Utilidades)
    ├── errors/          # Errores personalizados
    ├── types/           # Tipos y constantes
    ├── utils/           # Utilidades generales
    └── validators/      # Validadores compartidos
```

## Principios DDD

### 1. Domain Layer (Dominio)
- **Sin dependencias externas**: No depende de frameworks, bases de datos, etc.
- **Lógica de negocio pura**: Contiene las reglas de negocio
- **Entidades ricas**: Las entidades tienen comportamiento, no solo datos
- **Inmutabilidad**: Los value objects son inmutables

### 2. Application Layer (Aplicación)
- **Orquestación**: Coordina entidades y servicios de dominio
- **Sin lógica de negocio**: La lógica está en el dominio
- **Depende del dominio**: Puede usar entidades y servicios de dominio
- **Independiente de infraestructura**: Usa interfaces, no implementaciones

### 3. Infrastructure Layer (Infraestructura)
- **Implementa interfaces**: Los repositorios implementan interfaces del dominio
- **Dependencias técnicas**: Contiene toda la lógica técnica
- **Aislada del dominio**: El dominio no conoce esta capa

### 4. Presentation Layer (Presentación)
- **Delgada**: Solo maneja HTTP, no lógica de negocio
- **Usa casos de uso**: Los controladores llaman a casos de uso
- **Validación de entrada**: Valida y transforma requests
- **Serialización**: Transforma respuestas a formato HTTP

## Flujo de Datos

```
Request → Presentation (Controller) 
       → Application (Use Case) 
       → Domain (Entity/Service) 
       → Infrastructure (Repository) 
       → Database
```

## Ejemplo de Flujo Completo

### 1. Domain - Entidad
```javascript
// domain/entities/User.js
export class User {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }

    updateEmail(newEmail) {
        if (!this.isValidEmail(newEmail)) {
            throw new ValidationError('Email inválido');
        }
        this.email = newEmail;
    }
}
```

### 2. Domain - Repository Interface
```javascript
// domain/repositories/IUserRepository.js
export class IUserRepository {
    async findById(id) {
        throw new Error('Method not implemented');
    }
    async save(user) {
        throw new Error('Method not implemented');
    }
}
```

### 3. Application - Use Case
```javascript
// application/use-cases/CreateUserUseCase.js
export class CreateUserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const user = new User(null, userData.email, userData.name);
        return await this.userRepository.save(user);
    }
}
```

### 4. Infrastructure - Repository Implementation
```javascript
// infrastructure/database/repositories/UserRepository.js
export class UserRepository extends IUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async save(user) {
        return await this.prisma.user.create({
            data: { email: user.email, name: user.name }
        });
    }
}
```

### 5. Presentation - Controller
```javascript
// presentation/controllers/UserController.js
export class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async create(req, res, next) {
        try {
            const user = await this.createUserUseCase.execute(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    }
}
```

## Inyección de Dependencias

Para mantener las capas desacopladas, usa inyección de dependencias:

```javascript
// src/index.js o src/config/dependencies.js
import { UserRepository } from './infrastructure/database/repositories/UserRepository.js';
import { CreateUserUseCase } from './application/use-cases/CreateUserUseCase.js';
import { UserController } from './presentation/controllers/UserController.js';
import prisma from './infrastructure/database/prisma/client.js';

// Crear instancias
const userRepository = new UserRepository(prisma);
const createUserUseCase = new CreateUserUseCase(userRepository);
const userController = new UserController(createUserUseCase);

// Usar en rutas
router.post('/users', (req, res, next) => 
    userController.create(req, res, next)
);
```

## Reglas de Dependencias

```
✅ Domain → Nada (independiente)
✅ Application → Domain, Shared
✅ Infrastructure → Domain, Application, Shared
✅ Presentation → Application, Domain, Shared
✅ Shared → Nada (independiente)

❌ Domain → NO debe depender de otras capas
❌ Application → NO debe depender de Infrastructure o Presentation
```

## Beneficios

1. **Separación de responsabilidades**: Cada capa tiene un propósito claro
2. **Testabilidad**: Fácil de testear cada capa de forma independiente
3. **Mantenibilidad**: Cambios en una capa no afectan otras
4. **Escalabilidad**: Fácil agregar nuevas funcionalidades
5. **Independencia de frameworks**: El dominio no depende de Express, Prisma, etc.

## Próximos Pasos

1. Crear entidades de dominio según el modelo de negocio
2. Definir interfaces de repositorios
3. Implementar casos de uso
4. Crear implementaciones de repositorios con Prisma
5. Crear controladores y rutas

## Referencias

- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/performance-and-optimization)

