import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { PortfolioAnalyticsService } from '@/services/PortfolioAnalyticsService';
import { DashboardStats, ActivityLog } from '@/types/portfolio.types';
import { StatCard } from '@/components/common/StatCard';
import { ActivityList } from '@/components/dashboard/ActivityList';
import { PageHeader } from '@/components/common/PageHeader';
import { DataGrid } from '@/components/common/DataGrid';
import { Accordion } from '@/components/common/Accordion';
import { Card } from '@/components/common/Card';
import { DependencyRiskHeatmap } from '@/components/dashboard/DependencyRiskHeatmap';
import { BlockerDashboard } from '@/components/enterprise/BlockerDashboard';
import { CloudMigrationAssessmentPanel } from '@/components/assessment/CloudMigrationAssessmentPanel';
import { AssessmentService } from '@/services/AssessmentService';
import { CloudMigrationAssessment } from '@/types/assessment.types';
import { appConfig } from '@/config/appConfig';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const AccordionList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CommandCenterContainer: React.FC = () => {
    const router = useRouter();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [activity, setActivity] = useState<ActivityLog[]>([]);
    const [assessments, setAssessments] = useState<CloudMigrationAssessment[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState<string | null>('assessment');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData, assessmentData] = await Promise.all([
                    PortfolioAnalyticsService.getPortfolioOverviewStats(),
                    PortfolioAnalyticsService.getRecentSystemActivities(),
                    AssessmentService.getAllAssessments()
                ]);
                setStats(statsData);
                setActivity(activityData);
                setAssessments(assessmentData);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleToggle = (section: string) => {
        setActiveSection(prev => prev === section ? null : section);
    };

    if (loading) return <Container><div>Loading Command Center...</div></Container>;

    return (
        <Container>
            <PageHeader
                title="Command Center"
                subtitle="Real-time strategic insights and portfolio modernization management."
            />

            <AccordionList>
                {/* 0. Cloud Migration Assessment & Vitals */}
                <Accordion
                    title="Cloud Migration Assessment & Vitals"
                    icon="🚀"
                    isExpanded={activeSection === 'assessment'}
                    onToggle={() => handleToggle('assessment')}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Assessment Section */}
                        {assessments.length > 0 ? (
                            assessments.map(assessment => (
                                <CloudMigrationAssessmentPanel
                                    key={assessment.assessmentId}
                                    assessment={assessment}
                                />
                            ))
                        ) : (
                            <div>No active assessments.</div>
                        )}

                        {/* Vitals Section */}
                        {stats && (
                            <DataGrid minWidth="240px" gap="1.5rem">
                                <StatCard
                                    label="Total Apps"
                                    value={stats.totalApps}
                                    icon="📦"
                                    trend={{ value: "+5 added", direction: "up" }}
                                />
                                <StatCard
                                    label="Assessed"
                                    value={stats.assessedApps}
                                    icon="✅"
                                    trend={{ value: "85% complete", direction: "neutral" }}
                                />
                                <StatCard
                                    label="Cloud Ready"
                                    value={stats.cloudReady}
                                    icon="☁️"
                                    iconColor="#3B82F6"
                                />
                                <StatCard
                                    label="Pending Review"
                                    value={stats.pendingReview}
                                    icon="📋"
                                    iconColor="#F59E0B"
                                />
                            </DataGrid>
                        )}
                    </div>
                </Accordion>

                {/* 2. Strategic Blockers */}
                <Accordion
                    title="Strategic Insights & Blockers"
                    icon="🛡️"
                    isExpanded={activeSection === 'blockers'}
                    onToggle={() => handleToggle('blockers')}
                >
                    <BlockerDashboard />
                </Accordion>

                {/* 4. Risk Heatmap */}
                <Accordion
                    title="Systemic Dependency Exposure"
                    icon="🔗"
                    isExpanded={activeSection === 'exposure'}
                    onToggle={() => handleToggle('exposure')}
                >
                    <DependencyRiskHeatmap />
                </Accordion>

                {/* 5. Activity Log */}
                <Accordion
                    title="Recent System Activity"
                    icon="🕒"
                    isExpanded={activeSection === 'activity'}
                    onToggle={() => handleToggle('activity')}
                >
                    <ActivityList activities={activity} />
                </Accordion>
            </AccordionList>
        </Container>
    );
};
