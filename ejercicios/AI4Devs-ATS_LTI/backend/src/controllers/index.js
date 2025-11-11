// Este archivo se mantiene para compatibilidad temporal
// Los nuevos controladores deben ir en presentation/controllers/
import { getHealth } from '../application/use-cases/HealthUseCase.js';

export const getHealthController = (req, res) => {
    const health = getHealth();
    res.json(health);
};


