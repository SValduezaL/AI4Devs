# Estructura DDD - Visualización

## Árbol de Directorios

```
backend/src/
│
├── 📁 domain/                    # 🎯 Lógica de Negocio Pura
│   ├── entities/                  # Entidades de dominio
│   ├── value-objects/             # Objetos de valor (inmutables)
│   ├── services/                  # Servicios de dominio
│   ├── repositories/              # Interfaces de repositorios
│   ├── events/                    # Eventos de dominio
│   └── exceptions/                # Excepciones de dominio
│
├── 📁 application/                # 🔄 Orquestación y Casos de Uso
│   ├── use-cases/                 # Casos de uso (orquestación)
│   ├── services/                  # Servicios de aplicación
│   ├── dto/                       # Data Transfer Objects
│   ├── mappers/                   # Mappers entre capas
│   └── validators/                # Validadores de aplicación
│
├── 📁 infrastructure/             # 🔧 Implementaciones Técnicas
│   ├── database/
│   │   ├── prisma/
│   │   │   └── client.js          # Cliente de Prisma (singleton)
│   │   ├── repositories/           # Implementaciones de repositorios
│   │   └── mappers/                # Mappers de persistencia
│   ├── external/                  # Servicios externos (APIs)
│   ├── config/                     # Configuración
│   └── logging/                    # Sistema de logging
│
├── 📁 presentation/               # 🌐 Capa HTTP/API
│   ├── controllers/               # Controladores HTTP
│   ├── routes/                    # Definición de rutas
│   ├── middlewares/               # Middlewares de Express
│   ├── dto/                       # DTOs de request/response
│   └── validators/                # Validadores de entrada
│
├── 📁 shared/                     # 🔗 Código Compartido
│   ├── errors/                    # Errores personalizados
│   │   ├── DomainError.js
│   │   ├── NotFoundError.js
│   │   └── ValidationError.js
│   ├── types/                     # Tipos y constantes
│   ├── utils/                     # Utilidades generales
│   │   └── result.js              # Clase Result
│   └── validators/                # Validadores compartidos
│
├── 📁 config/                     # ⚙️ Configuración
│   └── dependencies.js            # Inyección de dependencias
│
└── index.js                        # Punto de entrada
```

## Flujo de Dependencias

```
┌─────────────┐
│ Presentation│ ───┐
└─────────────┘    │
       │           │
       ▼           │
┌─────────────┐   │
│ Application │ ──┼──┐
└─────────────┘   │  │
       │           │  │
       ▼           │  │
┌─────────────┐   │  │
│   Domain    │ ◄─┘  │
└─────────────┘      │
       ▲             │
       │             │
┌─────────────┐     │
│Infrastructure│ ────┘
└─────────────┘
       │
       ▼
┌─────────────┐
│   Shared    │
└─────────────┘
```

## Reglas de Dependencias

| Desde → Hacia | Domain | Application | Infrastructure | Presentation | Shared |
|---------------|--------|-------------|---------------|-------------|--------|
| **Domain**     | ✅     | ❌          | ❌            | ❌          | ✅     |
| **Application**| ✅    | ✅          | ❌            | ❌          | ✅     |
| **Infrastructure**| ✅ | ✅      | ✅            | ❌          | ✅     |
| **Presentation**| ✅   | ✅          | ❌            | ✅          | ✅     |
| **Shared**     | ❌     | ❌          | ❌            | ❌          | ✅     |

## Ejemplo de Flujo Completo

### 1. Request HTTP
```
GET /api/users/123
```

### 2. Presentation Layer
```javascript
// presentation/routes/user.routes.js
router.get('/:id', userController.getById);

// presentation/controllers/UserController.js
async getById(req, res, next) {
    const user = await getUserUseCase.execute(req.params.id);
    res.json(user);
}
```

### 3. Application Layer
```javascript
// application/use-cases/GetUserUseCase.js
async execute(id) {
    const user = await userRepository.findById(id);
    if (!user) throw new NotFoundError('Usuario');
    return user;
}
```

### 4. Domain Layer
```javascript
// domain/entities/User.js
class User {
    updateEmail(email) {
        if (!this.isValidEmail(email)) {
            throw new ValidationError('Email inválido');
        }
        this.email = email;
    }
}
```

### 5. Infrastructure Layer
```javascript
// infrastructure/database/repositories/UserRepository.js
async findById(id) {
    const data = await prisma.user.findUnique({ where: { id } });
    return UserMapper.toDomain(data);
}
```

## Archivos Clave

### Configuración
- `src/index.js` - Punto de entrada, configura Express
- `src/config/dependencies.js` - Inyección de dependencias

### Presentación
- `src/presentation/routes/index.js` - Rutas principales
- `src/presentation/middlewares/errorHandler.js` - Manejo de errores

### Infraestructura
- `src/infrastructure/database/prisma/client.js` - Cliente de Prisma

### Compartido
- `src/shared/errors/` - Errores personalizados
- `src/shared/utils/result.js` - Manejo funcional de resultados

## Próximos Pasos

1. ✅ Estructura creada
2. ⏳ Crear entidades de dominio (User, Candidate, Job, etc.)
3. ⏳ Definir interfaces de repositorios
4. ⏳ Implementar casos de uso
5. ⏳ Crear implementaciones de repositorios
6. ⏳ Crear controladores y rutas

