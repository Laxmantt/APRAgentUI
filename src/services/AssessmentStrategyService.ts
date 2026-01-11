import { ApplicationData, AssessmentData } from '@/types/application.types';
import { DataAvailability, RiskScore } from '@/types/assessment.types';

export interface MigrationAssessmentResult {
    dataAvailability: DataAvailability[];
    risk: RiskScore;
    strategy: {
        value: 'Rehost' | 'Replatform' | 'Refactor' | 'Retire' | 'Retain' | 'Repurchase';
        status: 'pending' | 'derived' | 'reviewed' | 'approved';
        reasoning: string;
    };
    wave: {
        value: number;
        status: 'pending' | 'derived' | 'reviewed' | 'approved';
        reasoning: string;
    };
}

export const AssessmentStrategyService = {
    // Simulate RAG + LLM analysis
    analyzeApplication: async (app: ApplicationData): Promise<MigrationAssessmentResult> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock logic based on app attributes
        // Mock logic based on app attributes
        const breakdown = calculateRiskBreakdown(app);
        const totalRisk = calculateTotalRisk(breakdown);
        const strategy = determineMockRPath(app);
        const wave = determineMockWave(app);
        const dataAvailability = assessDataAvailability(app);

        return {
            dataAvailability,
            risk: {
                total: totalRisk,
                breakdown,
                status: 'derived',
                reasoning: `Aggregated risk assessment across ${Object.keys(breakdown).length} dimensions. Primary risk drivers: ${getTopRiskDrivers(breakdown)}.`
            },
            strategy: {
                value: strategy,
                status: 'derived',
                reasoning: `Recommended ${strategy} strategy considering application type (${app.type}) and risk profile.`
            },
            wave: {
                value: wave,
                status: 'derived',
                reasoning: `Assigned to Wave ${wave} based on dependency chain and risk profile.`
            }
        };
    },

    updateAssessmentStatus: async (appId: string, updates: Partial<AssessmentData>): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Assessment updated for app:', appId, updates);
    },

    approveAssessment: async (appId: string): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Assessment approved for app:', appId);
    }
};

// Helper functions for industry-standard cloud migration risk assessment
function calculateRiskBreakdown(app: ApplicationData) {
    return {
        technicalComplexity: calculateTechnicalComplexity(app),
        dataComplexity: calculateDataComplexity(app),
        securityCompliance: calculateSecurityCompliance(app),
        operationalReadiness: calculateOperationalReadiness(app),
        vendorDependency: calculateVendorDependency(app),
        performanceImpact: calculatePerformanceImpact(app),
        costRisk: calculateCostRisk(app)
    };
}

function calculateTechnicalComplexity(app: ApplicationData): number {
    let score = 20; // Base score
    if (app.type === 'On-Premise') score += 20;
    if (app.complexity === 'High') score += 25;
    if (app.dependencies.length > 5) score += 20;
    if (app.version && parseFloat(app.version.replace('v', '')) < 2) score += 15;
    return Math.min(score, 100);
}

function calculateDataComplexity(app: ApplicationData): number {
    let score = 15;
    const dataSourceCount = app.dataSources?.length || 0;
    score += dataSourceCount * 12;
    const hasLegacyDB = app.dataSources?.some(ds =>
        ds.includes('Oracle') || ds.includes('DB2') || ds.includes('Mainframe')
    );
    if (hasLegacyDB) score += 25;
    return Math.min(score, 100);
}

function calculateSecurityCompliance(app: ApplicationData): number {
    let score = 10;
    if (app.regulatoryCompliance === 'HIPAA') score += 40;
    else if (app.regulatoryCompliance === 'GDPR') score += 35;
    else if (app.regulatoryCompliance === 'SOX') score += 30;
    else if (app.regulatoryCompliance === 'PCI-DSS') score += 38;
    if (app.businessComplexity === 'Critical') score += 20;
    return Math.min(score, 100);
}

function calculateOperationalReadiness(app: ApplicationData): number {
    let score = 25;
    if (app.nfrComplexity === 'Critical') score += 35;
    if (app.businessComplexity === 'Critical') score += 20;
    if (app.type === 'On-Premise') score += 15;
    return Math.min(score, 100);
}

function calculateVendorDependency(app: ApplicationData): number {
    let score = 10;
    const externalDeps = app.dependencies.filter(dep =>
        dep.includes('API') || dep.includes('Service') || dep.includes('Okta')
    );
    score += externalDeps.length * 15;
    return Math.min(score, 100);
}

function calculatePerformanceImpact(app: ApplicationData): number {
    let score = 20;
    if (app.complexity === 'High') score += 25;
    if (app.businessComplexity === 'Critical') score += 30;
    return Math.min(score, 100);
}

function calculateCostRisk(app: ApplicationData): number {
    let score = 15;
    if (app.complexity === 'High') score += 20;
    if (app.regulatoryCompliance !== 'None') score += 20;
    return Math.min(score, 100);
}

function calculateTotalRisk(breakdown: any): number {
    const weights: any = {
        technicalComplexity: 0.25,
        securityCompliance: 0.20,
        dataComplexity: 0.15,
        operationalReadiness: 0.15,
        costRisk: 0.10,
        performanceImpact: 0.10,
        vendorDependency: 0.05
    };

    return Math.round(
        Object.keys(weights).reduce((acc, key) => acc + breakdown[key] * weights[key], 0)
    );
}

function getTopRiskDrivers(breakdown: any): string {
    const entries = Object.entries(breakdown).sort((a: any, b: any) => b[1] - a[1]);
    return entries.slice(0, 2).map(([key]) =>
        key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()
    ).join(', ');
}

function determineMockRPath(app: ApplicationData): 'Rehost' | 'Replatform' | 'Refactor' | 'Retire' | 'Retain' {
    if (app.type === 'Cloud-Native') return 'Rehost';
    if (app.businessComplexity === 'Critical') return 'Replatform';
    if (app.complexity === 'High') return 'Refactor';
    if (app.complexity === 'Low') return 'Rehost';
    return 'Replatform';
}

function determineMockWave(app: ApplicationData): number {
    if (app.dependencies.length === 0) return 1;
    if (app.businessComplexity === 'Critical') return 3;
    if (app.complexity === 'High') return 4;
    return 2;
}

function assessDataAvailability(app: ApplicationData): DataAvailability[] {
    return [
        { label: 'Application Architecture', status: app.type ? 'complete' : 'missing', value: app.type },
        { label: 'Technical Complexity', status: app.complexity ? 'complete' : 'missing', value: app.complexity },
        { label: 'Application Version', status: app.version ? 'complete' : 'missing', value: app.version },
        { label: 'Dependencies Mapping', status: app.dependencies?.length > 0 ? 'complete' : 'missing', value: app.dependencies ? `${app.dependencies.length} dependencies` : undefined },
        { label: 'Business Criticality', status: app.businessComplexity ? 'complete' : 'missing', value: app.businessComplexity },
        { label: 'NFR Requirements', status: app.nfrComplexity ? 'complete' : 'missing', value: app.nfrComplexity },
        { label: 'Regulatory Compliance', status: app.regulatoryCompliance !== 'None' ? 'complete' : 'partial', value: app.regulatoryCompliance },
        { label: 'Performance Metrics', status: 'partial', value: 'Partial data' },
        { label: 'Cost Baseline', status: 'missing' },
        { label: 'Security Controls', status: 'partial', value: 'Partial data' },
        { label: 'Team Readiness Assessment', status: 'missing' }
    ];
}
