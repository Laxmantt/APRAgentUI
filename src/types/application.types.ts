import { ApplicationAssessment } from './assessment.types';

export interface DependencyNode {
    id: string; // Target app ID or service name
    name: string;
    type: 'internal' | 'external' | 'database' | 'middleware';
    direction: 'upstream' | 'downstream';
    strength: 'hard' | 'soft'; // Hard link means move-together
    health: number; // 0-100
    description?: string;
}

export interface DataGravity {
    volumeGB: number;
    complexity: number; // 0-100
    growthRate: number; // Percentage per month
}

export interface GenAIProfile {
    businessPurpose: string;
    userBase: string; // e.g. "Internal HR, 5000 users"
    technicalHealth: number; // 0-100
    obsolescenceRisk: 'Low' | 'Medium' | 'High' | 'Critical';
    cloudReadiness: number; // 0-100
    confidence: number; // 0-100 (AI Trust Score)
    generatedDate: string;
}

export interface ApplicationData {
    id: string;
    name: string;
    type: string;
    dependencies: string[]; // Legacy simple list
    links?: DependencyNode[]; // New complex network
    dataGravity?: DataGravity;
    trafficIntensity?: number; // 0-100
    status: string;
    complexity: string; // Overall complexity
    version: string;
    dataSources: string[];
    businessComplexity: 'Low' | 'Medium' | 'High' | 'Critical';
    nfrComplexity: 'Low' | 'Medium' | 'High' | 'Critical';
    regulatoryCompliance: 'None' | 'GDPR' | 'HIPAA' | 'SOX' | 'PCI-DSS';
    assessment?: ApplicationAssessment;
    genAIProfile?: GenAIProfile;
}

export interface ApplicationListResponse {
    applications: ApplicationData[];
    total: number;
}

export interface UploadResponse {
    count: number;
    success: boolean;
}

export type AssessmentData = ApplicationAssessment;

