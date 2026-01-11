import { useState, useEffect } from 'react';
import { UserAuthenticationService } from '@/services/UserAuthenticationService';
import { User } from '@/types/user.types';

export function useUserAuthentication() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
            setIsAuthenticated(true);
            setUser({ id: '1', name: 'Admin', email: 'admin@example.com', role: 'admin' });
        }
        setLoading(false);
    }, []);

    const performLogin = async (email: string, password: string) => {
        try {
            const loggedInUser = await UserAuthenticationService.authenticate(email, password);
            localStorage.setItem('token', loggedInUser.token || 'mock-token');
            setIsAuthenticated(true);
            setUser(loggedInUser);
            return true;
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const performLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return { isAuthenticated, user, loading, login: performLogin, logout: performLogout };
}
