import express from 'express';
import dotenv from 'dotenv';
import routes from './presentation/routes/index.js';
import { errorHandler } from './presentation/middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ 
        message: 'LTI ATS Backend API',
        version: '0.0.0.0',
        status: 'running'
    });
});

app.use('/api', routes);

// Error handler (debe ir al final)
app.use(errorHandler);

// Exportar app para testing
export default app;

// Iniciar servidor solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });
}


