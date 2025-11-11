# Domain Layer (Capa de Dominio)

Esta capa contiene la lógica de negocio pura, sin dependencias de frameworks o infraestructura.

## Estructura

```
domain/
├── entities/          # Entidades de dominio (agregados raíz)
├── value-objects/     # Objetos de valor
├── services/          # Servicios de dominio
├── repositories/      # Interfaces de repositorios (contratos)
├── events/            # Eventos de dominio
└── exceptions/        # Excepciones de dominio
```

## Principios

- **Sin dependencias externas**: No debe depender de frameworks, bases de datos, etc.
- **Lógica de negocio pura**: Contiene las reglas de negocio del dominio
- **Entidades ricas**: Las entidades contienen comportamiento, no solo datos
- **Inmutabilidad**: Los value objects son inmutables

## Ejemplo de Entidad

```javascript
// domain/entities/User.js
export class User {
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.createdAt = new Date();
    }

    updateEmail(newEmail) {
        if (!this.isValidEmail(newEmail)) {
            throw new Error('Email inválido');
        }
        this.email = newEmail;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}
```

## Ejemplo de Value Object

```javascript
// domain/value-objects/Email.js
export class Email {
    constructor(value) {
        if (!this.isValid(value)) {
            throw new Error('Email inválido');
        }
        this.value = value;
    }

    isValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    equals(other) {
        return this.value === other.value;
    }
}
```

## Ejemplo de Repository Interface

```javascript
// domain/repositories/IUserRepository.js
export class IUserRepository {
    async findById(id) {
        throw new Error('Method not implemented');
    }

    async findByEmail(email) {
        throw new Error('Method not implemented');
    }

    async save(user) {
        throw new Error('Method not implemented');
    }

    async delete(id) {
        throw new Error('Method not implemented');
    }
}
```

