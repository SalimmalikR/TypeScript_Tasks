class CustomError extends Error {
    statuscode: number;
    status: string;
    isOperational: boolean;

    constructor(statuscode: number, message: string) {
        super(message);
        this.statuscode = statuscode;
        this.status = statuscode >= 400 && statuscode <= 500 ? 'failed' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;
