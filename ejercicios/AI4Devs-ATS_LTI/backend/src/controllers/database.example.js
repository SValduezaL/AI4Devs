// Ejemplo de cómo usar Prisma Client en controladores
// Este archivo es solo de referencia, puedes eliminarlo

import prisma from '../utils/prisma.js';

// Ejemplo: Obtener todos los registros
export const getAllExamples = async (req, res) => {
    try {
        const examples = await prisma.example.findMany();
        res.json(examples);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ejemplo: Obtener un registro por ID
export const getExampleById = async (req, res) => {
    try {
        const { id } = req.params;
        const example = await prisma.example.findUnique({
            where: { id },
        });

        if (!example) {
            return res.status(404).json({ error: 'No encontrado' });
        }

        res.json(example);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ejemplo: Crear un nuevo registro
export const createExample = async (req, res) => {
    try {
        const example = await prisma.example.create({
            data: req.body,
        });
        res.status(201).json(example);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ejemplo: Actualizar un registro
export const updateExample = async (req, res) => {
    try {
        const { id } = req.params;
        const example = await prisma.example.update({
            where: { id },
            data: req.body,
        });
        res.json(example);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ejemplo: Eliminar un registro
export const deleteExample = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.example.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

