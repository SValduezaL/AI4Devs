# Application Layer (Capa de Aplicación)

Esta capa orquesta la lógica de negocio y coordina las operaciones entre el dominio y la infraestructura.

## Estructura

```
application/
├── use-cases/         # Casos de uso (orquestación)
├── services/          # Servicios de aplicación
├── dto/               # Data Transfer Objects
├── mappers/           # Mappers entre capas
└── validators/        # Validadores de aplicación
```

## Principios

- **Orquestación**: Coordina entidades y servicios de dominio
- **Sin lógica de negocio**: La lógica de negocio está en el dominio
- **Depende del dominio**: Puede usar entidades y servicios de dominio
- **Independiente de infraestructura**: Usa interfaces, no implementaciones

## Ejemplo de Use Case

```javascript
// application/use-cases/CreateUserUseCase.js
import { User } from '../../domain/entities/User.js';
import { IUserRepository } from '../../domain/repositories/IUserRepository.js';

export class CreateUserUseCase {
    constructor(userRepository) {
        if (!(userRepository instanceof IUserRepository)) {
            throw new Error('Invalid repository');
        }
        this.userRepository = userRepository;
    }

    async execute(userData) {
        // Validar datos de entrada
        if (!userData.email || !userData.name) {
            throw new Error('Email y nombre son requeridos');
        }

        // Verificar si el usuario ya existe
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('El usuario ya existe');
        }

        // Crear entidad de dominio
        const user = new User(
            null, // ID se genera en la BD
            userData.email,
            userData.name
        );

        // Persistir
        const savedUser = await this.userRepository.save(user);

        return {
            id: savedUser.id,
            email: savedUser.email,
            name: savedUser.name,
            createdAt: savedUser.createdAt
        };
    }
}
```

## Ejemplo de DTO

```javascript
// application/dto/CreateUserDTO.js
export class CreateUserDTO {
    constructor(data) {
        this.email = data.email;
        this.name = data.name;
    }

    validate() {
        const errors = [];
        if (!this.email) errors.push('Email es requerido');
        if (!this.name) errors.push('Nombre es requerido');
        return errors;
    }
}
```

