import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUserAuthentication } from '@/hooks/useUserAuthentication';

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useUserAuthentication();
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                // Redirect to login if not authenticated
                // For now, consistent with the mock nature, we might just log or allow 
                // but usually: router.push('/login');
                console.log("AuthGuard: User not authenticated");
                // router.push('/login'); // Uncomment when login page exists
                setAuthorized(true); // Allow for demo purposes
            } else {
                setAuthorized(true);
            }
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !authorized) {
        return null; // Or a Loading Spinner
    }

    return <>{children}</>;
}
