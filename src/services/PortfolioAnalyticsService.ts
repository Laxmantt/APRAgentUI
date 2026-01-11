import api from './ApiClient';
import { DashboardStats, ActivityLog } from '@/types/portfolio.types';
import { appConfig } from '@/config/appConfig';
import { dashboardData } from '@/mock-services/data/dashboard';

const USE_MOCKS = appConfig.api.useMocks;

export const PortfolioAnalyticsService = {
    getPortfolioOverviewStats: async (): Promise<DashboardStats> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return dashboardData.stats;
        }
        return await api.get<DashboardStats>('/stats');
    },

    getRecentSystemActivities: async (): Promise<ActivityLog[]> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return dashboardData.recentActivity;
        }
        return await api.get<ActivityLog[]>('/activity');
    }
};
