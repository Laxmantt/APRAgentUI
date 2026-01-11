import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';

const ScoreCard = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.headers.panel};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  background-color: ${({ theme, status }) =>
    status === 'approved' ? theme.colors.success + '20' :
      status === 'reviewed' ? theme.colors.primary + '20' :
        status === 'derived' ? theme.colors.secondary + '20' :
          theme.colors.textSecondary + '20'};
  color: ${({ theme, status }) =>
    status === 'approved' ? theme.colors.success :
      status === 'reviewed' ? theme.colors.primary :
        status === 'derived' ? theme.colors.secondary :
          theme.colors.textSecondary};
  text-transform: capitalize;
`;

const TotalScoreSection = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}10, ${({ theme }) => theme.colors.secondary}10);
  border-radius: 12px;
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
`;

const TotalGauge = styled.div<{ score: number }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: grid;
  place-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  background: ${({ theme, score }) =>
    score >= 75 ? `linear-gradient(135deg, ${theme.colors.error}20, ${theme.colors.error}40)` :
      score >= 50 ? `linear-gradient(135deg, ${theme.colors.secondary}20, ${theme.colors.secondary}40)` :
        `linear-gradient(135deg, ${theme.colors.success}20, ${theme.colors.success}40)`};
  color: ${({ theme, score }) =>
    score >= 75 ? theme.colors.error :
      score >= 50 ? theme.colors.secondary :
        theme.colors.success};
  border: 3px solid ${({ theme, score }) =>
    score >= 75 ? theme.colors.error :
      score >= 50 ? theme.colors.secondary :
        theme.colors.success};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const TotalLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
`;

const TotalInfo = styled.div``;

const RiskLevel = styled.div<{ score: number }>`
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 700;
  color: ${({ theme, score }) =>
    score >= 75 ? theme.colors.error :
      score >= 50 ? theme.colors.secondary :
        theme.colors.success};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Reasoning = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  line-height: 1.6;
  margin: 0;
`;

const BreakdownSection = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BreakdownTitle = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const BreakdownGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const BreakdownItem = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BreakdownLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const BreakdownBar = styled.div`
  position: relative;
  height: 32px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const BreakdownFill = styled.div<{ score: number }>`
  height: 100%;
  width: ${({ score }) => score}%;
  background: ${({ theme, score }) =>
    score >= 75 ? `linear-gradient(90deg, ${theme.colors.error}, ${theme.colors.error}dd)` :
      score >= 50 ? `linear-gradient(90deg, ${theme.colors.secondary}, ${theme.colors.secondary}dd)` :
        `linear-gradient(90deg, ${theme.colors.success}, ${theme.colors.success}dd)`};
  transition: width 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
`;

const BreakdownValue = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 700;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
`;

const BreakdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled(Button)`
  font-size: ${({ theme }) => theme.typography.data.value};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

import { RiskScore, RiskBreakdown, AssessmentStatus } from '@/types/assessment.types';

// ...

interface RiskScorePanelProps extends Omit<RiskScore, 'status'> {
  status: AssessmentStatus;
  appName?: string;
}

export const RiskScorePanel: React.FC<RiskScorePanelProps> = ({
  total,
  breakdown,
  status,
  reasoning,
  appName
}) => {
  const router = useRouter();
  const getRiskLevel = (score: number) => {
    if (score >= 75) return 'Critical Risk';
    if (score >= 50) return 'Medium Risk';
    if (score >= 25) return 'Low Risk';
    return 'Minimal Risk';
  };

  const breakdownLabels = {
    technicalComplexity: 'Technical Complexity',
    dataComplexity: 'Data Migration Complexity',
    securityCompliance: 'Security & Compliance',
    operationalReadiness: 'Operational Readiness',
    vendorDependency: 'Vendor & Licensing Risk',
    performanceImpact: 'Performance Impact',
    costRisk: 'Cost & Budget Risk'
  };

  /**
   * Navigates to chatbot page with application context
   */
  const handleProvideMissingInfo = (): void => {
    if (!appName) {
      console.warn('Cannot navigate to chatbot: appName is not provided');
      return;
    }

    router.push({
      pathname: '/chatbot',
      query: {
        appName,
        context: 'provide-requirements'
      }
    });
  };

  return (
    <ScoreCard>
      <Header>
        <Title>Risk Assessment</Title>
        <StatusBadge status={status}>{status}</StatusBadge>
      </Header>

      <TotalScoreSection>
        <TotalGauge score={total}>
          {total}
          <TotalLabel>Total</TotalLabel>
        </TotalGauge>
        <TotalInfo>
          <RiskLevel score={total}>{getRiskLevel(total)}</RiskLevel>
          {reasoning && <Reasoning>{reasoning}</Reasoning>}
        </TotalInfo>
      </TotalScoreSection>

      <BreakdownSection>
        <BreakdownHeader>
          <BreakdownTitle>Risk Score Breakdown</BreakdownTitle>
          {appName && (
            <ActionButton
              variant="outline"
              onClick={handleProvideMissingInfo}
              title="Get help providing missing application requirements"
            >
              💬 Provide Missing Information
            </ActionButton>
          )}
        </BreakdownHeader>
        <BreakdownGrid>
          {Object.entries(breakdown).map(([key, value]) => (
            <BreakdownItem key={key}>
              <BreakdownLabel>{breakdownLabels[key as keyof typeof breakdownLabels]}</BreakdownLabel>
              <BreakdownBar>
                <BreakdownFill score={value}>
                  <BreakdownValue>{value}</BreakdownValue>
                </BreakdownFill>
              </BreakdownBar>
            </BreakdownItem>
          ))}
        </BreakdownGrid>
      </BreakdownSection>
    </ScoreCard>
  );
};
