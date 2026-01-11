export const lightTheme = {
    mode: 'light' as const,
    colors: {
        primary: '#3B82F6', // Blue 500
        secondary: '#6366F1', // Indigo 500
        accent: '#8B5CF6', // Violet 500
        background: '#F1F5F9', // Slate 100
        surface: '#FFFFFF', // Pure white surface
        text: '#334155', // Slate 700
        textSecondary: '#64748B', // Slate 500 
        border: '#E2E8F0', // Slate 200
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
        cardGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)',
        hover: 'rgba(59, 130, 246, 0.08)',
    },
    spacing: {
        xs: '0.15rem',
        sm: '0.35rem',
        md: '0.6rem',
        lg: '1rem',
        xl: '1.25rem',
        xxl: '2rem',
    },
    breakpoints: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(148, 163, 184, 0.1)',
        md: '0 2px 4px -1px rgba(148, 163, 184, 0.1), 0 1px 2px -2px rgba(148, 163, 184, 0.05)',
        lg: '0 4px 6px -1px rgba(148, 163, 184, 0.1), 0 2px 4px -2px rgba(148, 163, 184, 0.05)',
        xl: '0 10px 15px -3px rgba(148, 163, 184, 0.1), 0 4px 6px -4px rgba(148, 163, 184, 0.05)',
        hover: '0 12px 20px -5px rgba(148, 163, 184, 0.15)',
        inner: 'inset 0 1px 2px 0 rgba(148, 163, 184, 0.03)',
    },
    transitions: {
        default: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    typography: {
        fontFamily: '"Inter", "system-ui", "-apple-system", "sans-serif"',
        headers: { panel: '0.85rem', section: '0.8rem' },
        data: { label: '0.65rem', value: '0.75rem', cell: '0.75rem', largeValue: '0.95rem' },
        h1: { size: '1.4rem', weight: 700, lineHeight: 1.2 },
        h2: { size: '1.15rem', weight: 600, lineHeight: 1.3 },
        h3: { size: '0.95rem', weight: 600, lineHeight: 1.4 },
        body: { size: '0.825rem', weight: 400, lineHeight: 1.5 },
        caption: { size: '0.7rem', weight: 400, lineHeight: 1.5 },
    }
};

export const darkTheme = {
    ...lightTheme,
    mode: 'dark' as const,
    colors: {
        primary: '#0284C7', // Sky 600
        secondary: '#0EA5E9', // Sky 500
        accent: '#38BDF8', // Sky 400
        background: '#F0F9FF', // Sky 50
        surface: '#FFFFFF', // Pure white surface
        text: '#0C4A6E', // Sky 900
        textSecondary: '#64748B',
        border: '#E0F2FE', // Sky 100
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        gradient: 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%)',
        cardGradient: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)',
        hover: 'rgba(14, 165, 233, 0.08)',
    },
    shadows: {
        ...lightTheme.shadows,
        sm: '0 1px 2px 0 rgba(2, 132, 199, 0.08)',
        md: '0 2px 4px -1px rgba(2, 132, 199, 0.08), 0 1px 2px -2px rgba(2, 132, 199, 0.04)',
        lg: '0 4px 6px -1px rgba(2, 132, 199, 0.08), 0 2px 4px -2px rgba(2, 132, 199, 0.04)',
        xl: '0 10px 15px -3px rgba(2, 132, 199, 0.08), 0 4px 6px -4px rgba(2, 132, 199, 0.03)',
        hover: '0 15px 30px -12px rgba(2, 132, 199, 0.12)',
        inner: 'inset 0 1px 2px 0 rgba(2, 132, 199, 0.03)',
    },
};

export type Theme = typeof lightTheme & { mode: 'light' | 'dark' };
