import api from './ApiClient';
import { WaveGroupResponse, WaveRisk, Wave, CreateWaveRequest, UpdateWaveRequest, WaveGroup } from '@/types/wave.types';

export const WaveManagementService = {
    // Legacy method for backward compatibility
    getMigrationWaveGroups: async (): Promise<WaveGroup[]> => {
        const response = await api.get<WaveGroupResponse>('/waves/groups');
        return response.groups;
    },

    getWaveMigrationRisks: async (waveNumber: number): Promise<WaveRisk[]> => {
        return await api.get<WaveRisk[]>(`/waves/${waveNumber}/risks`);
    },

    // New Management Methods
    getAllWaves: async (): Promise<Wave[]> => {
        return await api.get<Wave[]>('/waves');
    },

    getWaveById: async (id: number): Promise<Wave> => {
        return await api.get<Wave>(`/waves/${id}`);
    },

    createWave: async (data: CreateWaveRequest): Promise<Wave> => {
        return await api.post<Wave>('/waves', data);
    },

    updateWave: async (id: number, data: UpdateWaveRequest): Promise<Wave> => {
        return await api.put<Wave>(`/waves/${id}`, data);
    },

    deleteWave: async (id: number): Promise<void> => {
        await api.delete(`/waves/${id}`);
    }
};
