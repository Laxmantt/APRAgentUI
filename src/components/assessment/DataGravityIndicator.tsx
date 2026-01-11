import React from 'react';
import styled from 'styled-components';
import { DataGravity } from '@/types/application.types';

const GravityCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.background});
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
`;

const GravitySphere = styled.div<{ volume: number }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => `radial-gradient(circle at 30% 30%, ${theme.colors.primary}44, ${theme.colors.primary})`};
  box-shadow: 0 10px 30px ${({ theme }) => theme.colors.primary}44;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px dashed ${({ theme }) => theme.colors.primary}88;
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const MetricItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const MetricLabel = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MetricValue = styled.span`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const DragIndicator = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.warning}15;
  border-radius: 6px;
  border-left: 3px solid ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.text};
`;

interface DataGravityIndicatorProps {
  gravity: DataGravity;
}

export const DataGravityIndicator: React.FC<DataGravityIndicatorProps> = ({ gravity }) => {
  const formatVolume = (gb: number) => {
    if (gb >= 1000) return `${(gb / 1000).toFixed(1)}TB`;
    return `${gb}GB`;
  };

  const calculateDrag = () => {
    const volumeFactor = gravity.volumeGB / 1000;
    const complexityFactor = gravity.complexity / 50;
    const drag = (volumeFactor * complexityFactor).toFixed(1);
    return drag;
  };

  return (
    <GravityCard>
      <GravitySphere volume={gravity.volumeGB}>
        {formatVolume(gravity.volumeGB)}
      </GravitySphere>

      <div>
        <MetricsGrid>
          <MetricItem>
            <MetricLabel>Total Volume</MetricLabel>
            <MetricValue>{formatVolume(gravity.volumeGB)}</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Growth Rate</MetricLabel>
            <MetricValue>+{gravity.growthRate}%/mo</MetricValue>
          </MetricItem>
          <MetricItem>
            <MetricLabel>Data Complexity</MetricLabel>
            <MetricValue>{gravity.complexity}%</MetricValue>
          </MetricItem>
        </MetricsGrid>

        <DragIndicator>
          <strong>Migration Coefficient: {calculateDrag()}x</strong> -
          {parseFloat(calculateDrag()) > 5 ? ' High data gravity may require offline transfer or snowball devices.' : ' manageable online migration.'}
        </DragIndicator>
      </div>
    </GravityCard>
  );
};
