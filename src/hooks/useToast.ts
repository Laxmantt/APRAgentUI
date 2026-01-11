export type ToastType = 'error' | 'warning' | 'success' | 'info';

export interface ToastOptions {
    type: ToastType;
    message: string;
    title?: string;
}

export const useToast = () => {
    const addToast = (options: ToastOptions) => {
        const message = options.title
            ? `${options.title}: ${options.message}`
            : options.message;

        const event = new CustomEvent('app-notification', {
            detail: {
                message,
                type: options.type
            }
        });
        window.dispatchEvent(event);
    };

    return { addToast };
};
