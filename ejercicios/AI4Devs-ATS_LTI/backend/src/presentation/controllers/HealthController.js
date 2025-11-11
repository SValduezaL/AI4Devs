// Controlador de health check
import { getHealth } from '../../application/use-cases/HealthUseCase.js';

export class HealthController {
    async check(req, res) {
        try {
            const health = getHealth();
            res.json(health);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

