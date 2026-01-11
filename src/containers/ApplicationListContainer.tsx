import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/common/Button';
import { ApplicationCard } from '@/components/assessment/ApplicationCard';
import { ApplicationService } from '@/services/ApplicationService';
import { ApplicationData } from '@/types/application.types';
import { PageHeader } from '@/components/common/PageHeader';
import { DataGrid } from '@/components/common/DataGrid';
import { useRouter } from 'next/router';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;

export const ApplicationListContainer: React.FC = () => {
    const [apps, setApps] = useState<ApplicationData[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const data = await ApplicationService.getAllApplications();
                setApps(data);
            } catch (error) {
                console.error('Failed to fetch apps', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const handleNewAssessment = () => {
        // Logic for new assessment or navigation
        console.log('Start new assessment');
    };

    if (loading) return <Container><div>Loading assessments...</div></Container>;

    return (
        <Container>
            <PageHeader
                title="Application Assessments"
                subtitle="Manage and review detailed assessments for your application portfolio."
            />

            {apps.length > 0 ? (
                <DataGrid minWidth="250px">
                    {apps.map(app => (
                        <ApplicationCard
                            key={app.id}
                            app={app}
                            onViewDetails={(id) => router.push(`/assessment/${id}`)}
                        />
                    ))}
                </DataGrid>
            ) : (
                <EmptyState>
                    <h3>No assessments found</h3>
                    <p>Get started by creating your first application assessment.</p>
                </EmptyState>
            )}
        </Container>
    );
};
