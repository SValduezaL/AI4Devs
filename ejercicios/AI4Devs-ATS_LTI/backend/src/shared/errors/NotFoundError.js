// Error para recursos no encontrados
import { DomainError } from './DomainError.js';

export class NotFoundError extends DomainError {
    constructor(resource = 'Recurso') {
        super(`${resource} no encontrado`, 'NOT_FOUND');
        this.status = 404;
    }
}

