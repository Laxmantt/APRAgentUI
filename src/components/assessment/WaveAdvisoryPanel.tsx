import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { WaveActionPlan } from '@/types/wave.types';

const AdvisoryContainer = styled(Card)`
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.background});
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.headers.panel};
`;

const ActionIcon = styled.span`
  background: ${({ theme }) => theme.colors.secondary}20;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 6px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.typography.headers.panel};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SubHeader = styled.h4`
  margin: 0 0 8px 0;
  font-size: ${({ theme }) => theme.typography.headers.section};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StepList = styled.ol`
  margin: 0;
  padding-left: 1.5rem;
`;

const StepItem = styled.li`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
  line-height: 1.5;
`;

const QuickWinBox = styled.div`
  background: ${({ theme }) => theme.colors.success}10;
  border-left: 3px solid ${({ theme }) => theme.colors.success};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
`;

const RiskBox = styled.div`
  background: ${({ theme }) => theme.colors.warning}10;
  border-left: 3px solid ${({ theme }) => theme.colors.warning};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
`;

const CleanList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const CleanItem = styled.li`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.typography.data.value};
  display: flex;
  gap: 8px;
  
  &:last-child {
    margin-bottom: 0;
  }

  &::before {
    content: '•';
    font-weight: bold;
  }
`;

interface Props {
  plan: WaveActionPlan;
}

export const WaveAdvisoryPanel: React.FC<Props> = ({ plan }) => {
  if (!plan) return null;

  return (
    <AdvisoryContainer>
      <Header>
        <ActionIcon>🚀</ActionIcon>
        <Title>Wave Action Plan & Roadmap</Title>
      </Header>

      <Grid>
        <Column>
          <div>
            <SubHeader>Recommended Next Steps</SubHeader>
            <StepList>
              {plan.steps.map((step, i) => (
                <StepItem key={i}>{step}</StepItem>
              ))}
            </StepList>
          </div>
        </Column>

        <Column>
          <div>
            <SubHeader style={{ color: '#10b981' }}>⚡ Quick Wins</SubHeader>
            <QuickWinBox>
              <CleanList>
                {plan.quickWins.map((win, i) => (
                  <CleanItem key={i}>{win}</CleanItem>
                ))}
              </CleanList>
            </QuickWinBox>
          </div>

          <div>
            <SubHeader style={{ color: '#f59e0b' }}>⚠️ Dependency Risks</SubHeader>
            <RiskBox>
              <CleanList>
                {plan.dependencyRisks.map((risk, i) => (
                  <CleanItem key={i}>{risk}</CleanItem>
                ))}
              </CleanList>
            </RiskBox>
          </div>
        </Column>
      </Grid>
    </AdvisoryContainer>
  );
};
