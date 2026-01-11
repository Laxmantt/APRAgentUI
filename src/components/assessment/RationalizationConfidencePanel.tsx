import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { ModernizationAdvisory, AssessmentRecommendation, MigrationStrategy } from '@/types/assessment.types';

const AdvisoryCard = styled(Card)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 2px solid ${({ theme }) => theme.colors.background};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h4`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.headers.panel};
`;

const RobotIcon = styled.span`
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  padding: 4px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.data.largeValue};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BlockTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const ArchitectureBox = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 500;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
`;

const ListItem = styled.li<{ type?: 'assumption' | 'gap' }>`
  color: ${({ theme, type }) =>
    type === 'gap' ? theme.colors.error : theme.colors.text};
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const EffortBadge = styled.span`
  background: ${({ theme }) => theme.colors.warning}20;
  color: ${({ theme }) => theme.colors.warning};
  padding: 2px 6px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
`;

interface Props {
  advisory: ModernizationAdvisory;
  strategy: AssessmentRecommendation<MigrationStrategy>;
}

export const RationalizationConfidencePanel: React.FC<Props> = ({ advisory, strategy }) => {
  return (
    <AdvisoryCard>
      <Header>
        <Title>
          <RobotIcon>🤖</RobotIcon>
          Modernization Advisory
        </Title>
        <EffortBadge>Est. Effort: {advisory.effortEstimate}</EffortBadge>
      </Header>

      <Grid>
        <Column>
          <div>
            <BlockTitle>Recommended Strategy (6R)</BlockTitle>
            <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
              {strategy.value}
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
              {strategy.reasoning}
            </div>
          </div>

          <div>
            <BlockTitle>Target Architecture</BlockTitle>
            <ArchitectureBox>
              {advisory.targetArchitecture}
            </ArchitectureBox>
          </div>
        </Column>

        <Column>
          <div>
            <BlockTitle>AI Assumptions</BlockTitle>
            <List>
              {advisory.assumptions.map((a, i) => (
                <ListItem key={i} type="assumption">{a}</ListItem>
              ))}
            </List>
          </div>

          {advisory.validationGaps.length > 0 && (
            <div>
              <BlockTitle style={{ color: '#ef4444' }}>Missing Information</BlockTitle>
              <List>
                {advisory.validationGaps.map((g, i) => (
                  <ListItem key={i} type="gap">{g}</ListItem>
                ))}
              </List>
            </div>
          )}
        </Column>
      </Grid>
    </AdvisoryCard>
  );
};
