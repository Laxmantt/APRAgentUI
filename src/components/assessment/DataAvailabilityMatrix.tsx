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
    content: '📊';
    font-size: ${({ theme }) => theme.typography.data.largeValue};
  }
`;

const CompletionBadge = styled.div<{ percentage: number }>`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 700;
  background: ${({ theme, percentage }) =>
    percentage === 100 ? theme.colors.success + '20' :
      percentage >= 70 ? theme.colors.primary + '20' :
        percentage >= 40 ? theme.colors.secondary + '20' :
          theme.colors.error + '20'};
  color: ${({ theme, percentage }) =>
    percentage === 100 ? theme.colors.success :
      percentage >= 70 ? theme.colors.primary :
        percentage >= 40 ? theme.colors.secondary :
          theme.colors.error};
  border: 1px solid currentColor;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ProgressBarContainer = styled.div`
  position: relative;
  height: 24px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const ProgressFill = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background: ${({ theme, percentage }) =>
    percentage === 100 ? `linear-gradient(90deg, ${theme.colors.success}, ${theme.colors.success}dd)` :
      percentage >= 70 ? `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.primary}dd)` :
        percentage >= 40 ? `linear-gradient(90deg, ${theme.colors.secondary}, ${theme.colors.secondary}dd)` :
          `linear-gradient(90deg, ${theme.colors.error}, ${theme.colors.error}dd)`};
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const DataItem = styled.div<{ status: 'complete' | 'partial' | 'missing' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme, status }) =>
    status === 'complete' ? theme.colors.success + '40' :
      status === 'partial' ? theme.colors.secondary + '40' :
        theme.colors.error + '40'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${({ theme, status }) =>
    status === 'complete' ? theme.colors.success :
      status === 'partial' ? theme.colors.secondary :
        theme.colors.error};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme, status }) =>
    status === 'complete' ? theme.colors.success :
      status === 'partial' ? theme.colors.secondary :
        theme.colors.error};
  }
`;

const StatusIcon = styled.div<{ status: 'complete' | 'partial' | 'missing' }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  flex-shrink: 0;
  background: ${({ theme, status }) =>
    status === 'complete' ? `linear-gradient(135deg, ${theme.colors.success}, ${theme.colors.success}dd)` :
      status === 'partial' ? `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.secondary}dd)` :
        `linear-gradient(135deg, ${theme.colors.error}, ${theme.colors.error}dd)`};
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const DataContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const DataLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DataValue = styled.div<{ status: 'complete' | 'partial' | 'missing' }>`
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme, status }) =>
    status === 'complete' ? theme.colors.success :
      status === 'partial' ? theme.colors.secondary :
        theme.colors.textSecondary};
  font-style: ${({ status }) => status === 'missing' ? 'italic' : 'normal'};
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.typography.data.value};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LegendDot = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ color }) => color};
  box-shadow: 0 0 0 2px ${({ color }) => color}40;
`;

interface DataPoint {
  label: string;
  status: 'complete' | 'partial' | 'missing';
  value?: string;
}

interface DataAvailabilityMatrixProps {
  dataPoints: DataPoint[];
}

export const DataAvailabilityMatrix: React.FC<DataAvailabilityMatrixProps> = ({ dataPoints }) => {
  const completeCount = dataPoints.filter(dp => dp.status === 'complete').length;
  const partialCount = dataPoints.filter(dp => dp.status === 'partial').length;
  const missingCount = dataPoints.filter(dp => dp.status === 'missing').length;
  const completionPercentage = Math.round((completeCount / dataPoints.length) * 100);

  const getStatusIcon = (status: 'complete' | 'partial' | 'missing') => {
    if (status === 'complete') return '✓';
    if (status === 'partial') return '!';
    return '✕';
  };

  const getStatusValue = (item: DataPoint) => {
    if (item.status === 'complete' && item.value) return item.value;
    if (item.status === 'partial') return 'Incomplete';
    return 'Missing Data';
  };

  return (
    <Container>
      <Header>
        <Title>Data Availability</Title>
        <CompletionBadge percentage={completionPercentage}>
          {completionPercentage}% Ready
        </CompletionBadge>
      </Header>

      <ProgressBarContainer>
        <ProgressBar>
          <ProgressFill percentage={completionPercentage} />
        </ProgressBar>
      </ProgressBarContainer>

      <Legend>
        <LegendItem>
          <LegendDot color="#10b981" />
          <span>Complete ({completeCount})</span>
        </LegendItem>
        <LegendItem>
          <LegendDot color="#3B82F6" />
          <span>Partial ({partialCount})</span>
        </LegendItem>
        <LegendItem>
          <LegendDot color="#ef4444" />
          <span>Missing ({missingCount})</span>
        </LegendItem>
      </Legend>

      <DataGrid>
        {dataPoints.map((item, index) => (
          <DataItem key={index} status={item.status}>
            <StatusIcon status={item.status}>
              {getStatusIcon(item.status)}
            </StatusIcon>
            <DataContent>
              <DataLabel>{item.label}</DataLabel>
              <DataValue status={item.status}>
                {getStatusValue(item)}
              </DataValue>
            </DataContent>
          </DataItem>
        ))}
      </DataGrid>
    </Container>
  );
};

