import { lightTheme as theme } from '@/styles/theme';

export const getRiskColor = (severity: string): string => {
    switch (severity.toLowerCase()) {
        case 'critical':
        case 'high':
            return theme.colors.error;
        case 'medium':
            return theme.colors.warning;
        case 'low':
            return theme.colors.success;
        default:
            return theme.colors.textSecondary;
    }
};

export const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
        case 'completed':
        case 'active':
        case 'resolved':
            return theme.colors.success;
        case 'in progress':
        case 'planning':
            return theme.colors.primary;
        case 'delayed':
        case 'blocked':
        case 'open':
            return theme.colors.error;
        case 'mitigated':
            return theme.colors.warning;
        default:
            return theme.colors.textSecondary;
    }
};

export const getGradient = (type: 'blue' | 'purple' | 'orange' = 'blue') => {
    switch (type) {
        case 'blue':
            return `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`;
        case 'purple':
            return 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)';
        case 'orange':
            return 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)';
        default:
            return 'none';
    }
};
