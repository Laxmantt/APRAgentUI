import api from './ApiClient';
import { ApplicationData, UploadResponse, ApplicationListResponse } from '@/types/application.types';
import { appConfig } from '@/config/appConfig';

interface CacheStore {
    all: ApplicationData[] | null;
    byId: Map<string, ApplicationData>;
    timestamp: number;
}

const CACHE: CacheStore = {
    all: null,
    byId: new Map(),
    timestamp: 0
};

const CACHE_TTL = appConfig.data.cacheTTL;

export const ApplicationService = {
    clearCache: () => {
        CACHE.all = null;
        CACHE.byId.clear();
        CACHE.timestamp = 0;
    },

    uploadInventory: async (file: File): Promise<UploadResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        return await api.post<UploadResponse>('/applications/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    getAllApplications: async (): Promise<ApplicationData[]> => {
        const now = Date.now();
        if (CACHE.all && (now - CACHE.timestamp < CACHE_TTL)) {
            return CACHE.all;
        }

        const response = await api.get<ApplicationListResponse>('/applications');
        CACHE.all = response.applications;
        CACHE.timestamp = now;
        return response.applications;
    },

    getApplicationById: async (id: string): Promise<ApplicationData | undefined> => {
        if (CACHE.byId.has(id)) {
            return CACHE.byId.get(id);
        }

        const response = await api.get<ApplicationData>(`/applications/${id}`);
        if (response) CACHE.byId.set(id, response);
        return response;
    }
};
