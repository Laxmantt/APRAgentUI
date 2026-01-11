import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { handleError, AppError } from '@/utils/errorHandler';
import { appConfig } from '@/config/appConfig';
import { messages } from '@/config/messages';
import { ApiResponse, ApiErrorDetails } from '@/types/api.types';

// Extend AxiosRequestConfig if needed
declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean;
    }
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: appConfig.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: appConfig.api.timeout,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Potential Auth Token injection here
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        const data = response.data;

        // If it's a standard ApiResponse envelope, unwrap it
        if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
            return data.data;
        }

        return data;
    },
    (error: AxiosError) => {
        let message = messages.errors.default;
        let statusCode = 500;
        let details: ApiErrorDetails | undefined;

        if (error.response) {
            // Server responded with a status code outside 2xx
            statusCode = error.response.status;
            const data = error.response.data as any;

            if (typeof data === 'string') {
                message = data;
            } else if (data && typeof data === 'object') {
                message = data.message || message;
                details = data.error || data;
            }

            if (statusCode === 401) message = messages.errors.unauthorized;
            if (statusCode === 403) message = 'Access Denied';
            if (statusCode === 404) message = messages.errors.notFound;
            if (statusCode >= 500) message = messages.errors.server;

        } else if (error.request) {
            // Request made but no response
            message = messages.errors.network;
            statusCode = 503;
        } else if (error.code === 'ECONNABORTED') {
            message = messages.errors.timeout;
            statusCode = 408;
        } else {
            message = error.message || messages.errors.default;
        }

        const appError = new AppError(message, statusCode);
        handleError(appError); // Global Toast Notification
        return Promise.reject(appError);
    }
);

// Generic Wrapper Methods
const api = {
    get: <T>(url: string, config?: any): Promise<T> =>
        axiosInstance.get<T, T>(url, config),
    post: <T>(url: string, data?: any, config?: any): Promise<T> =>
        axiosInstance.post<T, T>(url, data, config),
    put: <T>(url: string, data?: any, config?: any): Promise<T> =>
        axiosInstance.put<T, T>(url, data, config),
    delete: <T>(url: string, config?: any): Promise<T> =>
        axiosInstance.delete<T, T>(url, config),
    patch: <T>(url: string, data?: any, config?: any): Promise<T> =>
        axiosInstance.patch<T, T>(url, data, config),
};

export default api;