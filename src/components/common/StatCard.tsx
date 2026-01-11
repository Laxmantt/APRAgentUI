import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.smooth};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.secondary}50;
  }
`;

const IconWrapper = styled.div<{ color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.data.cell};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, color }) => color ? `${color}15` : theme.colors.primary + '10'};
  color: ${({ theme, color }) => color || theme.colors.primary};
  border: 1px solid ${({ theme, color }) => color ? `${color}30` : theme.colors.primary + '20'};
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
`;

const Trend = styled.div<{ direction: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme, direction }) =>
    direction === 'up' ? theme.colors.success :
      direction === 'down' ? theme.colors.error :
        theme.colors.textSecondary};
`;

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconColor?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconColor,
  trend,
  className
}) => {
  return (
    <StyledCard className={className}>
      {icon && <IconWrapper color={iconColor}>{icon}</IconWrapper>}
      <Label>{label}</Label>
      <Value>{value}</Value>
      {trend && (
        <Trend direction={trend.direction}>
          <span>{trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '•'}</span>
          <span>{trend.value}</span>
        </Trend>
      )}
    </StyledCard>
  );
};
