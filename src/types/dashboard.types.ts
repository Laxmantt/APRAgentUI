export interface RiskHeatmapItem {
    name: string;
    avgRisk: number; // 0-100
    count: number;
}

export interface DashboardStats {
    totalApps: number;
    assessedApps: number;
    cloudReady: number;
    pendingReview: number;
}

export interface RecentActivity {
    id: string;
    user: string;
    action: string;
    target: string;
    timestamp: string;
}

export interface DashboardData {
    stats: DashboardStats;
    recentActivity: RecentActivity[];
}

export interface DashboardStatsResponse {
    stats: DashboardStats;
}

export interface DashboardActivityResponse {
    activities: RecentActivity[];
}
