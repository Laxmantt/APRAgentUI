import api from './ApiClient';
import { ApplicationData, ApplicationListResponse } from '@/types/application.types';

export const AppSearchService = {
    executeApplicationSearch: async (query: string): Promise<ApplicationData[]> => {
        const response = await api.get<ApplicationData[]>('/search', { params: { q: query } });
        return response;
    },
};
