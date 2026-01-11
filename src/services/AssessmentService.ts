import api from './ApiClient';
import { CloudMigrationAssessment } from '@/types/assessment.types';

// Assuming ApiClient unwraps or we define the full response structure
interface AssessmentListResponse {
    success: boolean;
    data: CloudMigrationAssessment[];
}

export const AssessmentService = {
    getAllAssessments: async (): Promise<CloudMigrationAssessment[]> => {
        return await api.get<CloudMigrationAssessment[]>('/assessments');
    },

    getAssessmentById: async (id: string): Promise<CloudMigrationAssessment | undefined> => {
        return await api.get<CloudMigrationAssessment>(`/assessments/${id}`);
    }
};
