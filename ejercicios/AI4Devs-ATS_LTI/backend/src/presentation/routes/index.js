// Rutas principales de la API
import express from 'express';

const router = express.Router();

// Health check
router.get('/', (req, res) => {
    res.json({ 
        message: 'LTI ATS Backend API',
        version: '0.0.0.0',
        status: 'running'
    });
});

// Aquí se agregarán más rutas según los módulos
// Ejemplo: router.use('/users', userRoutes);

export default router;

