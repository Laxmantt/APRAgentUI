import { ApplicationData } from './application.types';
import { MigrationStrategy } from './assessment.types';

export type WaveStatus = 'Draft' | 'Planning' | 'Ready' | 'In Progress' | 'Completed' | 'Delayed';
// export type MigrationStrategy is now imported


export interface WaveDetailItem {
    id: string;
    type: string;
    techStack: string;
    currentEnv: string;
    targetEnv: string;
    description: string;
    criticality: 'High' | 'Medium' | 'Low' | 'Critical';
    status?: string;
}

export interface ExternalIntegration extends WaveDetailItem {
    name: string;
    owner: string;
}

export interface WaveDependency extends WaveDetailItem {
    sourceAppId: string;
    targetAppId: string;
}

export interface DataSource extends WaveDetailItem {
    name: string;
    size?: string;
}

export interface InfrastructureSetup extends WaveDetailItem {
    component: string;
}

export interface WaveRisk {
    id: string;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    probablity: 'Low' | 'Medium' | 'High';
    impact: 'Cost' | 'Timeline' | 'Quality' | 'Security';
    remediationPlan: string;
    status: 'Open' | 'Monitoring' | 'Closed';
}

export interface WaveActionPlan {
    steps: string[];
    quickWins: string[]; // e.g. "Decommission App X"
    dependencyRisks: string[]; // Cross-wave issues
}

export interface Wave {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: WaveStatus;
    strategy: MigrationStrategy;

    // Relationships
    applications: string[]; // IDs of apps in this wave
    dependencies: WaveDependency[];
    externalIntegrations: ExternalIntegration[];
    dataSources: DataSource[];
    infrastructure: InfrastructureSetup[];
    risks: WaveRisk[];
    actionPlan?: WaveActionPlan;

    // Calculated fields
    totalApps?: number;
    completedApps?: number;
}

export interface WaveGroupResponse {
    groups: WaveGroup[];
}

export interface WaveGroup {
    waveNumber: number;
    applications: ApplicationData[];
    totalApps: number;
    avgRiskScore: number;
    criticalApps: number;
    readyApps: number;
    blockedApps: number;
}

export type CreateWaveRequest = Omit<Wave, 'id' | 'totalApps' | 'completedApps'>;
export type UpdateWaveRequest = Partial<CreateWaveRequest>;
