export interface ReportMetadata {
    appCount?: number;
    dependencyDepth?: string;
    targetCloud?: string;
    rationalizationStrategy?: string;
    riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ReportData {
    id: string;
    name: string;
    type: 'Portfolio Summary' | 'Risk Analysis' | 'Wave Plan' | 'Dependency Matrix' | 'Cost Estimation';
    format: 'PDF' | 'Excel' | 'CSV';
    generatedDate: string;
    size: string;
    status: 'ready' | 'processing' | 'error';
    description: string;
    metadata?: ReportMetadata;
}

export interface GenerateReportRequest {
    type: string;
    format: 'PDF' | 'Excel' | 'CSV';
    filters?: Record<string, any>;
}

export interface ReportListResponse {
    reports: ReportData[];
}
