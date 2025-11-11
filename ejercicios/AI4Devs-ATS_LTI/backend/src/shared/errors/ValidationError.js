// Error de validación
import { DomainError } from './DomainError.js';

export class ValidationError extends DomainError {
    constructor(message, details = null) {
        super(message, 'VALIDATION_ERROR');
        this.details = details;
        this.status = 400;
    }
}

