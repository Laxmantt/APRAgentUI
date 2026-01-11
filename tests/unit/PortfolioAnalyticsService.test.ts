import { PortfolioAnalyticsService } from '@/services/PortfolioAnalyticsService';
import api from '@/services/ApiClient';

jest.mock('@/services/ApiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
    create: jest.fn(() => ({
        interceptors: {
            response: { use: jest.fn() }
        }
    }))
}));

describe('PortfolioAnalyticsService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getPortfolioOverviewStats fetches statistics correctly', async () => {
        const mockStats = { totalApps: 10, assessedApps: 5, cloudReady: 2, pendingReview: 3 };
        (api.get as jest.Mock).mockResolvedValue({ data: mockStats });

        const result = await PortfolioAnalyticsService.getPortfolioOverviewStats();
        expect(api.get).toHaveBeenCalledWith('/stats');
        expect(result).toEqual(mockStats);
    });

    it('getRecentSystemActivities fetches activity log correctly', async () => {
        const mockActivity = [{ id: '1', user: 'Test', action: 'Login', target: 'App', timestamp: '2023-01-01' }];
        (api.get as jest.Mock).mockResolvedValue({ data: mockActivity });

        const result = await PortfolioAnalyticsService.getRecentSystemActivities();
        expect(api.get).toHaveBeenCalledWith('/activity');
        expect(result).toEqual(mockActivity);
    });
});
