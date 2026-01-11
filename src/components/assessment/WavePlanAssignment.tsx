import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';

const Container = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.background});
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:before {
    content: '📅';
    font-size: ${({ theme }) => theme.typography.data.largeValue};
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 700;
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
  border: 1px solid currentColor;
  text-transform: capitalize;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-top: ${({ theme }) => theme.spacing.sm};
  
  /* Connecting line */
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 20px;
    right: 20px;
    height: 4px;
    background: ${({ theme }) => theme.colors.border};
    border-radius: 2px;
    z-index: 0;
    transform: translateY(-50%);
  }
`;

const WaveTimeline = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const WaveOption = styled.button<{ selected: boolean; disabled: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: none;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.6 : 1};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  position: relative;

  /* The circle on the timeline */
  &:before {
    content: '';
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.surface};
    border: 4px solid ${({ theme, selected }) => selected ? theme.colors.primary + '40' : theme.colors.border};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:hover {
    ${({ disabled, theme, selected }) => !disabled && `
      transform: translateY(-4px);
      &:before {
        border-color: ${selected ? theme.colors.primary : theme.colors.primary};
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transform: scale(1.1);
      }
    `}
  }

  &:focus-visible {
    &:before {
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
    }
  }
`;

const WaveCard = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.surface};
  border: 1px solid ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.border};
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: ${({ theme, selected }) => selected ? theme.shadows.md : theme.shadows.sm};
  
  ${WaveOption}:hover & {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const WaveNumber = styled.div<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 800;
  color: ${({ theme, selected }) => selected ? 'white' : theme.colors.primary};
  margin-bottom: 2px;
`;

const WaveLabel = styled.div<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  color: ${({ theme, selected }) => selected ? 'rgba(255,255,255,0.9)' : theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ReasoningContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.secondary};
`;

const ReasoningTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const ReasoningText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  line-height: 1.6;
  margin: 0;
`;

const DependencyWarning = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.secondary + '10'};
  border: 1px solid ${({ theme }) => theme.colors.secondary + '30'};
  border-radius: 8px;
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const WarningIcon = styled.span`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
`;

const WarningContent = styled.div`
  flex: 1;
`;

const WarningTitle = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  margin-bottom: 2px;
`;

const WarningText = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

interface WavePlanAssignmentProps {
  value: number; // 1-5
  status: 'pending' | 'derived' | 'reviewed' | 'approved';
  reasoning?: string;
  dependencies?: string[];
  onSelect?: (wave: number) => void;
}

export const WavePlanAssignment: React.FC<WavePlanAssignmentProps> = ({
  value,
  status,
  reasoning,
  dependencies = [],
  onSelect
}) => {
  const isDisabled = status === 'approved';
  const waves = [1, 2, 3, 4, 5];

  return (
    <Container>
      <Header>
        <Title>Wave Plan Assignment</Title>
        <StatusBadge status={status}>{status}</StatusBadge>
      </Header>

      <TimelineContainer>
        <WaveTimeline>
          {waves.map(wave => (
            <WaveOption
              key={wave}
              selected={value === wave}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect?.(wave)}
              as="button"
            >
              <WaveCard selected={value === wave}>
                <WaveNumber selected={value === wave}>{wave}</WaveNumber>
                <WaveLabel selected={value === wave}>Wave</WaveLabel>
              </WaveCard>
            </WaveOption>
          ))}
        </WaveTimeline>
      </TimelineContainer>

      {reasoning && (
        <ReasoningContainer>
          <ReasoningTitle>AI Reasoning Analysis</ReasoningTitle>
          <ReasoningText>{reasoning}</ReasoningText>
        </ReasoningContainer>
      )}

      {dependencies.length > 0 && (
        <DependencyWarning>
          <WarningIcon>⚠️</WarningIcon>
          <WarningContent>
            <WarningTitle>Dependency Alert</WarningTitle>
            <WarningText>
              This application has upstream dependencies on <strong>{dependencies.join(', ')}</strong>.
              Ensure these dependencies are scheduled for migration in earlier waves to avoid service disruption.
            </WarningText>
          </WarningContent>
        </DependencyWarning>
      )}
    </Container>
  );
};
