import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserAuthentication } from '@/hooks/useUserAuthentication';

export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    const ComponentWithAuth = (props: P) => {
        const { isAuthenticated, loading } = useUserAuthentication();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, loading, router]);

        if (loading || !isAuthenticated) {
            return <div>Loading...</div>; // Or a proper LoadingSpinner component
        }

        return <WrappedComponent {...props} />;
    };

    return ComponentWithAuth;
}
