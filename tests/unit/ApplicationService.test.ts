import { ApplicationService } from '@/services/ApplicationService';
import api from '@/services/ApiClient';

jest.mock('@/services/ApiClient', () => ({
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
        response: { use: jest.fn() }
    },
    create: jest.fn(() => ({
        interceptors: {
            response: { use: jest.fn() }
        }
    }))
}));

describe('ApplicationService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAllApplications calls api.get with /applications', async () => {
        const mockApps = [{ id: '1', name: 'Test App' }];
        (api.get as jest.Mock).mockResolvedValue({ data: mockApps });

        const result = await ApplicationService.getAllApplications();

        expect(api.get).toHaveBeenCalledWith('/applications');
        expect(result).toEqual(mockApps);
    });
});
