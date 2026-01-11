import styled from 'styled-components';
import { Card } from '@/components/common/Card';

const StyledCard = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.data.largeValue}; /* Reduced to 1rem */
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

interface StatCardProps {
  label: string;
  value: number | string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  return (
    <StyledCard>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </StyledCard>
  );
};
