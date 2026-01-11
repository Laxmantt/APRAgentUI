export type AssessmentStatus = 'pending' | 'derived' | 'reviewed' | 'approved';

export type MigrationStrategy = 'Rehost' | 'Replatform' | 'Refactor' | 'Retire' | 'Repurchase' | 'Retain';

export interface AssessmentRecommendation<T> {
    value: T;
    status: AssessmentStatus;
    reasoning?: string;
}

export interface RiskBreakdown {
    technicalComplexity: number;
    dataComplexity: number;
    securityCompliance: number;
    operationalReadiness: number;
    vendorDependency: number;
    performanceImpact: number;
    costRisk: number;
}

export interface RiskScore {
    total: number; // 0-100
    breakdown: RiskBreakdown;
    status: AssessmentStatus;
    reasoning?: string;
}

export interface DataAvailability {
    label: string;
    status: 'complete' | 'partial' | 'missing';
    value?: string;
}

export interface ApplicationAssessment {
    dataAvailability?: DataAvailability[];
    risk?: RiskScore;
    strategy?: AssessmentRecommendation<MigrationStrategy>;
    wave?: AssessmentRecommendation<number>;
    advisory?: ModernizationAdvisory;
}

export interface ModernizationAdvisory {
    targetArchitecture: string;
    effortEstimate: string; // e.g. "3-6 months"
    assumptions: string[];
    validationGaps: string[];
}

export interface CloudMigrationAssessment {
    // Primary Key
    assessmentId: string;
    assessmentName: string;

    // Status Tracking
    assessmentStatus: 'Draft' | 'In Progress' | 'Completed' | 'Cancelled';
    assessmentOwner: string; // User ID

    // Environment Details
    sourceEnvironment?: string;
    targetEnvironment?: string;

    // Timeline
    plannedStartDate?: string; // ISO date string
    plannedEndDate?: string; // ISO date string
    actualStartDate?: string; // ISO date string
    actualEndDate?: string; // ISO date string

    // Governance & Compliance
    securityControlsEnabled: boolean;
    complianceApproval: boolean;
    riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
    signoffStatus: 'Pending' | 'Approved' | 'Rejected';

    // Audit Trail
    createdDate: string; // ISO datetime string
    lastUpdatedDate: string; // ISO datetime string

    // Additional Details
    assessmentNotes?: string;
    rollbackPlan?: string;
    successCriteria?: Record<string, any>; // JSONB equivalent
}
