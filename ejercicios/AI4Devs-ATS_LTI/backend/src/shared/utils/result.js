// Clase Result para manejo funcional de errores
export class Result {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }

    static ok(data) {
        return new Result(true, data, null);
    }

    static fail(error) {
        return new Result(false, null, error);
    }

    isSuccess() {
        return this.success;
    }

    isFailure() {
        return !this.success;
    }

    getValue() {
        if (this.isFailure()) {
            throw new Error('Cannot get value from failed result');
        }
        return this.data;
    }

    getError() {
        if (this.isSuccess()) {
            throw new Error('Cannot get error from successful result');
        }
        return this.error;
    }
}

