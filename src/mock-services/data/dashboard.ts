import { DashboardData } from '@/types/dashboard';

export const dashboardData: DashboardData = {
    stats: {
        totalApps: 45,
        assessedApps: 35,
        cloudReady: 18,
        pendingReview: 7,
    },
    recentActivity: [
        { id: '1', user: 'Admin', action: 'Approved assessment', target: 'Payment Gateway', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
        { id: '2', user: 'System', action: 'Initial assessment derived', target: 'Procurement Pro', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() },
        { id: '3', user: 'User', action: 'Updated security profile', target: 'Legacy CRM', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString() },
        { id: '4', user: 'Admin', action: 'Wave 1 cutover finalized', target: 'Pilot Phase', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
        { id: '5', user: 'System', action: 'Data synchronization', target: 'CMDB Import', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
        { id: '6', user: 'User', action: 'Added dependency', target: 'Inventory System', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() },
    ]
};
