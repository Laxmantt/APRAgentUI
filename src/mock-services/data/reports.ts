import { ReportData } from '@/types/report.types';

export const reports: ReportData[] = [
    {
        id: '101',
        name: 'Migration Assessment - Q1',
        type: 'Portfolio Summary',
        format: 'PDF',
        generatedDate: '2024-01-15T10:00:00Z',
        size: '2.4 MB',
        status: 'ready',
        description: 'Quarterly migration assessment report covering 12 enterprise apps.',
        metadata: {
            appCount: 12,
            rationalizationStrategy: '6R Framework',
            targetCloud: 'AWS Multi-Region',
            riskLevel: 'Medium'
        }
    },
    {
        id: '102',
        name: 'Wave Plan Report',
        type: 'Wave Plan',
        format: 'Excel',
        generatedDate: '2024-01-10T14:30:00Z',
        size: '1.8 MB',
        status: 'ready',
        description: 'Detailed wave transition plan for Waves 1-3.',
        metadata: {
            appCount: 12,
            dependencyDepth: 'L3 Matrix',
            targetCloud: 'Mix: AWS/SaaS'
        }
    },
    {
        id: '103',
        name: 'Risk Analysis Summary',
        type: 'Risk Analysis',
        format: 'PDF',
        generatedDate: '2024-01-05T09:15:00Z',
        size: '3.2 MB',
        status: 'ready',
        description: 'Comprehensive risk posture for on-prem to cloud migration.',
        metadata: {
            riskLevel: 'High',
            dependencyDepth: 'Deep-Scan'
        }
    }
];
