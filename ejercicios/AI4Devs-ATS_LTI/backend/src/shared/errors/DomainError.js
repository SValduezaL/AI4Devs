// Error base del dominio
export class DomainError extends Error {
    constructor(message, code = 'DOMAIN_ERROR') {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.status = 400;
        Error.captureStackTrace(this, this.constructor);
    }
}

