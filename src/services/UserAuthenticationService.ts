import api from './ApiClient';
import { User } from '@/types/user.types';
import { users } from '@/mock-services/data/users';
import { appConfig } from '@/config/appConfig';

const USE_MOCKS = appConfig.api.useMocks;

export const UserAuthenticationService = {
    authenticate: async (email: string, password: string): Promise<User> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const user = users.find((u: any) => u.email === email && u.password === password);
            if (user) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: 'mock-jwt-token-' + user.id
                };
            } else {
                throw new Error('Invalid credentials');
            }
        } else {
            const response = await api.post<User>('/auth/login', { email, password });
            return response;
        }
    },

    verifyCurrentUser: async (): Promise<User | null> => {
        if (USE_MOCKS) {
            return null;
        } else {
            const response = await api.get<User>('/auth/me');
            return response;
        }
    }
};
