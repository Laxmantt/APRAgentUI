import { useState, useEffect, useCallback } from 'react';
import api from '@/services/ApiClient';
import { AxiosRequestConfig } from 'axios';

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useDataFetching<T>(url: string, options?: AxiosRequestConfig) {
    const [state, setState] = useState<FetchState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const executeFetch = useCallback(async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
            const response = await api.get<T>(url, options);
            setState({ data: response, loading: false, error: null });
        } catch (err: any) {
            const errorMessage = err.message || 'An error occurred';
            setState({ data: null, loading: false, error: errorMessage });
        }
    }, [url, JSON.stringify(options)]);

    useEffect(() => {
        executeFetch();
    }, [executeFetch]);

    return { ...state, refetch: executeFetch };
}
