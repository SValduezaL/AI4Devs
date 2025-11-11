// Middleware para manejo de errores
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Errores de validación
    if (err.name === 'ValidationError' || err.name === 'DomainError') {
        return res.status(400).json({
            error: err.message || 'Error de validación',
            code: err.code || 'VALIDATION_ERROR'
        });
    }

    // Errores de recurso no encontrado
    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            error: err.message || 'Recurso no encontrado',
            code: err.code || 'NOT_FOUND'
        });
    }

    // Error por defecto
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'production' 
            ? 'Error interno del servidor' 
            : err.message,
        code: err.code || 'INTERNAL_ERROR'
    });
};

