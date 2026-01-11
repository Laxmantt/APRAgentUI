import api from './ApiClient';
import { ReportData } from '@/types/report.types';
import { downloadBlob } from '@/utils/fileUtils';
import { appConfig } from '@/config/appConfig';
import { reports as mockReports } from '@/mock-services/data/reports';

const USE_MOCKS = appConfig.api.useMocks;

export const ReportingService = {
    getAllReports: async (): Promise<ReportData[]> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockReports;
        }
        return await api.get<ReportData[]>('reports');
    },

    generateNewReport: async (type: ReportData['type'], format: ReportData['format']): Promise<ReportData> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            const newReport: ReportData = {
                id: Math.random().toString(36).substr(2, 9),
                name: `${type} Report`,
                type,
                format,
                generatedDate: new Date().toISOString(),
                size: '1.2 MB',
                status: 'ready',
                description: `Auto-generated ${type} in ${format} format.`
            };
            return newReport;
        }
        return await api.post<ReportData>('reports', { type, format });
    },

    downloadReportFile: async (reportId: string, filename: string = 'report.pdf'): Promise<void> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockBlob = new Blob(['Mock PDF Content'], { type: 'application/pdf' });
            downloadBlob(mockBlob, filename);
            return;
        }
        try {
            const blob = await api.get<Blob>(`reports/${reportId}/download`, {
                responseType: 'blob'
            });
            downloadBlob(blob, filename);
        } catch (error) {
            console.error('Download failed:', error);
            throw error;
        }
    },

    deleteReportRecord: async (reportId: string): Promise<void> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return;
        }
        await api.delete(`reports/${reportId}`);
    }
};
