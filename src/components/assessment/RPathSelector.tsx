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
    content: '🎯';
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

const PathGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const PathOption = styled.button<{ selected: boolean; disabled: boolean }>`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border: 2px solid ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.border};
  border-radius: 12px;
  background: ${({ theme, selected }) => selected ? theme.colors.primary + '08' : theme.colors.surface};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ disabled }) => disabled ? 0.7 : 1};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  outline: none;

  &:hover {
    ${({ disabled, theme, selected }) => !disabled && `
      border-color: ${selected ? theme.colors.primary : theme.colors.primary}80;
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.md};
      background: ${selected ? theme.colors.primary + '12' : theme.colors.background};
    `}
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}40;
  }

  ${({ selected, theme }) => selected && `
    box-shadow: ${theme.shadows.sm};
    &:after {
      content: '✓';
      position: absolute;
      top: 8px;
      right: 8px;
      width: 20px;
      height: 20px;
      background: ${theme.colors.primary};
      color: white;
      border-radius: 50%;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;

const PathIcon = styled.div<{ selected: boolean }>`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  margin-bottom: 4px;
  filter: ${({ selected }) => selected ? 'none' : 'grayscale(100%)'};
  opacity: ${({ selected }) => selected ? 1 : 0.7};
  transition: all 0.2s;

  ${PathOption}:hover & {
    filter: none;
    opacity: 1;
    transform: scale(1.1);
  }
`;

const PathName = styled.div<{ selected: boolean }>`
  font-weight: 700;
  color: ${({ theme, selected }) => selected ? theme.colors.primary : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const PathDesc = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const ReasoningContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
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

import { MigrationStrategy, AssessmentStatus } from '@/types/assessment.types';

// ... (imports)

// ... (styled components)

interface RPathSelectorProps {
  value: MigrationStrategy;
  status: AssessmentStatus;
  reasoning?: string;
  onSelect?: (path: MigrationStrategy) => void;
}

const rPathOptions = [
  { value: 'Rehost', desc: 'Lift & Shift without changes', icon: '🚚' },
  { value: 'Replatform', desc: 'Lift, Tinker & Shift', icon: '🛠️' },
  { value: 'Refactor', desc: 'Re-architect for Cloud', icon: '🏗️' },
  { value: 'Retire', desc: 'Decommission application', icon: '🗑️' },
  { value: 'Retain', desc: 'Keep On-Premise', icon: '💾' },
  { value: 'Repurchase', desc: 'Move to SaaS', icon: '💳' }
] as const;

export const RPathSelector: React.FC<RPathSelectorProps> = ({ value, status, reasoning, onSelect }) => {
  const isDisabled = status === 'approved';

  return (
    <Container>
      <Header>
        <Title>Migration Strategy</Title>
        <StatusBadge status={status}>{status}</StatusBadge>
      </Header>
      <PathGrid>
        {rPathOptions.map(option => (
          <PathOption
            key={option.value}
            selected={value === option.value}
            disabled={isDisabled}
            onClick={() => !isDisabled && onSelect?.(option.value)}
            as="button"
          >
            <PathIcon selected={value === option.value}>{option.icon}</PathIcon>
            <PathName selected={value === option.value}>{option.value}</PathName>
            <PathDesc>{option.desc}</PathDesc>
          </PathOption>
        ))}
      </PathGrid>
      {reasoning && (
        <ReasoningContainer>
          <ReasoningTitle>AI Reasoning Analysis</ReasoningTitle>
          <ReasoningText>{reasoning}</ReasoningText>
        </ReasoningContainer>
      )}
    </Container>
  );
};
