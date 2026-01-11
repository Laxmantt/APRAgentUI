import { CloudMigrationAssessment } from '@/types/assessment.types';

export const assessments: CloudMigrationAssessment[] = [
    {
        assessmentId: 'CMA-2024-001',
        assessmentName: 'Portfolio Apps Modernization Assessment',
        assessmentStatus: 'In Progress',
        assessmentOwner: 'arch_lead_01',

        sourceEnvironment: 'On-Premise (VMWare vSphere)',
        targetEnvironment: 'AWS EKS (US–East-1)',

        plannedStartDate: '2025-02-01',
        plannedEndDate: '2025-05-15',

        securityControlsEnabled: true,
        complianceApproval: false,
        riskLevel: 'Medium',
        signoffStatus: 'Pending',

        createdDate: '2024-01-10T08:00:00Z',
        lastUpdatedDate: '2024-01-11T14:30:00Z',

        assessmentNotes: 'Initial discovery complete. Pending detailed dependency mapping.',
        successCriteria: {
            uptime: '99.99%',
            latency: '<100ms',
            costReduction: '20%'
        }
    }
];
