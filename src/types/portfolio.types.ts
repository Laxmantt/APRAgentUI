export interface DashboardStats {
    totalApps: number;
    assessedApps: number;
    cloudReady: number;
    pendingReview: number;
}

export interface ActivityLog {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
}
