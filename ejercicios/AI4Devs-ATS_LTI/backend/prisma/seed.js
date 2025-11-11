// Script de seed para poblar la base de datos con datos iniciales
// Ejecutar con: npm run db:seed

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Ejemplo: Crear datos iniciales
    // const example = await prisma.example.create({
    //     data: {
    //         // datos aquí
    //     },
    // });

    // console.log('✅ Datos creados:', example);

    console.log('✅ Seed completado exitosamente!');
}

main()
    .catch((e) => {
        console.error('❌ Error en seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

