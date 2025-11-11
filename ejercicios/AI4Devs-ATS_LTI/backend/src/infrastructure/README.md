# Infrastructure Layer (Capa de Infraestructura)

Esta capa contiene las implementaciones técnicas: acceso a datos, servicios externos, etc.

## Estructura

```
infrastructure/
├── database/          # Implementaciones de acceso a datos
│   ├── prisma/        # Configuración de Prisma
│   └── repositories/  # Implementaciones de repositorios
├── external/          # Servicios externos (APIs, etc.)
├── config/            # Configuración
└── logging/          # Sistema de logging
```

## Principios

- **Implementa interfaces del dominio**: Los repositorios implementan las interfaces del dominio
- **Dependencias técnicas**: Contiene toda la lógica técnica
- **Aislada del dominio**: El dominio no conoce esta capa

## Ejemplo de Repository Implementation

```javascript
// infrastructure/database/repositories/UserRepository.js
import { IUserRepository } from '../../../domain/repositories/IUserRepository.js';
import prisma from '../prisma/client.js';
import { UserMapper } from '../mappers/UserMapper.js';

export class UserRepository extends IUserRepository {
    async findById(id) {
        const userData = await prisma.user.findUnique({
            where: { id }
        });
        return userData ? UserMapper.toDomain(userData) : null;
    }

    async findByEmail(email) {
        const userData = await prisma.user.findFirst({
            where: { email }
        });
        return userData ? UserMapper.toDomain(userData) : null;
    }

    async save(user) {
        const userData = UserMapper.toPersistence(user);
        const saved = await prisma.user.create({
            data: userData
        });
        return UserMapper.toDomain(saved);
    }

    async delete(id) {
        await prisma.user.delete({
            where: { id }
        });
    }
}
```

## Ejemplo de Mapper

```javascript
// infrastructure/database/mappers/UserMapper.js
import { User } from '../../../domain/entities/User.js';

export class UserMapper {
    static toDomain(persistenceUser) {
        return new User(
            persistenceUser.id,
            persistenceUser.email,
            persistenceUser.name
        );
    }

    static toPersistence(domainUser) {
        return {
            id: domainUser.id,
            email: domainUser.email,
            name: domainUser.name,
            createdAt: domainUser.createdAt
        };
    }
}
```

