export const messages = {
    errors: {
        default: 'An unexpected error occurred. Please try again later.',
        network: 'Unable to connect to the server. Please check your internet connection.',
        timeout: 'The request timed out. Please try again.',
        unauthorized: 'You are not authorized to perform this action.',
        notFound: 'The requested resource was not found.',
        server: 'Internal server error. Our team has been notified.',
        validation: 'Please check your input and try again.'
    },
    success: {
        default: 'Operation completed successfully.',
        saved: 'Changes saved successfully.',
        created: 'Created successfully.',
        deleted: 'Deleted successfully.'
    },
    info: {
        loading: 'Loading...',
        processing: 'Processing your request...'
    }
};

export const getErrorMessage = (code: string): string => {
    return (messages.errors as any)[code] || messages.errors.default;
};
