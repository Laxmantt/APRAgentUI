import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { CloudMigrationAssessment } from '@/types/assessment.types';

const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
  background: ${({ theme, status }) => {
        switch (status.toLowerCase()) {
            case 'completed': return theme.colors.success + '20';
            case 'in progress': return theme.colors.primary + '20';
            case 'cancelled': return theme.colors.error + '20';
            default: return theme.colors.textSecondary + '20';
        }
    }};
  color: ${({ theme, status }) => {
        switch (status.toLowerCase()) {
            case 'completed': return theme.colors.success;
            case 'in progress': return theme.colors.primary;
            case 'cancelled': return theme.colors.error;
            default: return theme.colors.textSecondary;
        }
    }};
  border: 1px solid currentColor;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.headers.section};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const FieldLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.label};
`;

const FieldValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

interface Props {
    assessment: CloudMigrationAssessment;
}

export const CloudMigrationAssessmentPanel: React.FC<Props> = ({ assessment }) => {
    return (
        <PanelContainer>
            <Header>
                <Title>{assessment.assessmentName}</Title>
                <StatusBadge status={assessment.assessmentStatus}>{assessment.assessmentStatus}</StatusBadge>
            </Header>

            <SectionGrid>
                {/* Governance Section */}
                <SectionCard>
                    <SectionTitle>Governance & Compliance</SectionTitle>
                    <FieldRow>
                        <FieldLabel>Owner</FieldLabel>
                        <FieldValue>{assessment.assessmentOwner}</FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Risk Level</FieldLabel>
                        <FieldValue style={{ color: assessment.riskLevel === 'High' ? '#ef4444' : assessment.riskLevel === 'Medium' ? '#f59e0b' : '#10b981' }}>
                            {assessment.riskLevel}
                        </FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Signoff Status</FieldLabel>
                        <FieldValue>{assessment.signoffStatus}</FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Security Controls</FieldLabel>
                        <FieldValue>{assessment.securityControlsEnabled ? 'Enabled' : 'Disabled'}</FieldValue>
                    </FieldRow>
                </SectionCard>

                {/* Timeline Section */}
                <SectionCard>
                    <SectionTitle>Timeline</SectionTitle>
                    <FieldRow>
                        <FieldLabel>Planned Start</FieldLabel>
                        <FieldValue>{assessment.plannedStartDate}</FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Planned End</FieldLabel>
                        <FieldValue>{assessment.plannedEndDate}</FieldValue>
                    </FieldRow>
                    {assessment.actualStartDate && (
                        <FieldRow>
                            <FieldLabel>Actual Start</FieldLabel>
                            <FieldValue>{assessment.actualStartDate}</FieldValue>
                        </FieldRow>
                    )}
                    <FieldRow>
                        <FieldLabel>Last Updated</FieldLabel>
                        <FieldValue>{new Date(assessment.lastUpdatedDate).toLocaleDateString()}</FieldValue>
                    </FieldRow>
                </SectionCard>

                {/* Environment Section */}
                <SectionCard>
                    <SectionTitle>Environment Strategy</SectionTitle>
                    <FieldRow>
                        <FieldLabel>Source</FieldLabel>
                        <FieldValue>{assessment.sourceEnvironment || 'N/A'}</FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Target</FieldLabel>
                        <FieldValue>{assessment.targetEnvironment || 'Pending'}</FieldValue>
                    </FieldRow>
                    <FieldRow>
                        <FieldLabel>Success Criteria</FieldLabel>
                        <FieldValue>{assessment.successCriteria ? Object.keys(assessment.successCriteria).length + ' Defined' : 'None'}</FieldValue>
                    </FieldRow>
                </SectionCard>
            </SectionGrid>
        </PanelContainer>
    );
};
