export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;

    constructor(message: string, statusCode: number, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const handleError = (error: unknown): void => {
    let message = 'An unexpected error occurred';
    let type: 'error' | 'warning' | 'info' = 'error';

    if (error instanceof AppError) {
        console.error(`[AppError] ${error.statusCode}: ${error.message}`);
        message = error.message;
        if (error.statusCode < 500 && error.statusCode >= 400) type = 'warning';
    } else if (error instanceof Error) {
        console.error(`[UnhandledError]: ${error.message}`, error.stack);
        message = error.message;
    } else {
        console.error(`[UnknownError]:`, error);
    }

    // Dispatch event for UI components (Toast)
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app-notification', {
            detail: { message, type }
        }));
    }
};

export const showSuccess = (message: string): void => {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('app-notification', {
            detail: { message, type: 'success' }
        }));
    }
};
