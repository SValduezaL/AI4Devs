// Cliente de Prisma - Singleton pattern
// Mover desde src/utils/prisma.js a la estructura DDD

import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // En desarrollo, reutilizar la instancia para evitar múltiples conexiones
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ['query', 'error', 'warn'],
        });
    }
    prisma = global.prisma;
}

export default prisma;

