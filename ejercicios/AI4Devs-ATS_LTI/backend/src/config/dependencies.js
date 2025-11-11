// Configuración de inyección de dependencias
// Aquí se configuran todas las dependencias del sistema

import prisma from '../infrastructure/database/prisma/client.js';

// Repositories (Infrastructure)
// import { UserRepository } from '../infrastructure/database/repositories/UserRepository.js';

// Use Cases (Application)
// import { CreateUserUseCase } from '../application/use-cases/CreateUserUseCase.js';
// import { GetUserUseCase } from '../application/use-cases/GetUserUseCase.js';

// Controllers (Presentation)
// import { UserController } from '../presentation/controllers/UserController.js';

// Health Check
import { HealthController } from '../presentation/controllers/HealthController.js';

// Crear instancias
// const userRepository = new UserRepository(prisma);
// const createUserUseCase = new CreateUserUseCase(userRepository);
// const getUserUseCase = new GetUserUseCase(userRepository);
// const userController = new UserController(createUserUseCase, getUserUseCase);

const healthController = new HealthController();

// Exportar dependencias
export const dependencies = {
    // userController,
    healthController,
    prisma
};

