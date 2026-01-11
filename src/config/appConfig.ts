export const appConfig = {
    appName: 'Application Portfolio Rationalization Agent',
    appDescription: 'Rationalize your application portfolio for cloud migration',
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
        useMocks: process.env.NEXT_PUBLIC_USE_MOCKS !== 'false',
        timeout: 10000,
    },
    chatbot: {
        greeting: 'Hello! I am your Applications Assessment Agent. How can I help you today?',
        responseDelay: 1000,
    },
    server: {
        isDevelopment: process.env.NODE_ENV === 'development',
    },
    ui: {
        pagination: {
            defaultPageSize: 10,
        },
        pageTitles: {
            waves: 'Wave Management',
            reports: 'Reports Center',
            applications: 'Application Assessment',
            dashboard: 'Dashboard',
        },
        messages: {
            loading: 'Loading...',
            comingSoon: 'Coming Soon',
            noData: 'No data available',
        },
        alerts: {
            createWaveComingSoon: 'Create Wave Modal - Coming Soon',
        }
    },
    assessment: {
        thresholds: {
            risk: {
                critical: 50, // Health score below this is critical
                warning: 75,  // Health score below this is a warning
            },
            complexity: {
                high: 70, // Complexity score above this is high
            }
        },
        costs: {
            baseEffortCost: 1500, // Cost per effort point
            dataEgressFactor: 70, // Complexity threshold for high egress cost
        },
        effortPoints: {
            high: 10,
            medium: 5,
            low: 2,
        }
    },
    waves: {
        defaults: {
            maxAppsPerWave: 10,
        }
    },
    data: {
        cacheTTL: 300000, // 5 minutes
        ingestion: {
            acceptedFormats: ['.csv', '.json', '.xml', '.xlsx'],
            maxFileSize: 10 * 1024 * 1024, // 10MB
        }
    }
};
