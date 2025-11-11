// Configuración global para los tests
import dotenv from 'dotenv';

// Cargar variables de entorno de test
dotenv.config({ path: '.env.test' });

// Configuraciones globales para tests
global.console = {
    ...console,
    // Silenciar logs en tests (opcional)
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
};

