import React from 'react';
import styled from 'styled-components';
import { WaveGroup } from '@/types/wave.types';
import { ApplicationData } from '@/types/application.types';
import { appConfig } from '@/config/appConfig';

const RollupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px dashed ${({ theme }) => theme.colors.border};
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
`;

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.div<{ color?: string }>`
  font-weight: 600;
  color: ${({ theme, color }) => color || theme.colors.text};
`;

const ProgressBarContainer = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  overflow: hidden;
  display: flex;
`;

const BarSegment = styled.div<{ width: number; color: string }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: ${({ color }) => color};
`;

const MiniBadges = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const MiniBadge = styled.span<{ active: boolean; type: string }>`
  font-size: 0.65rem;
  padding: 2px 4px;
  border-radius: 3px;
  background: ${({ active, type, theme }) => {
    if (!active) return theme.colors.background;
    switch (type) {
      case 'gdpr': return '#3b82f640';
      case 'pci': return '#ef444440';
      default: return theme.colors.secondary + '40';
    }
  }};
  color: ${({ active, type, theme }) => {
    if (!active) return theme.colors.textSecondary;
    switch (type) {
      case 'gdpr': return '#3b82f6';
      case 'pci': return '#ef4444';
      default: return theme.colors.secondary;
    }
  }};
  opacity: ${({ active }) => active ? 1 : 0.4};
  font-weight: 700;
`;

interface Props {
  wave: WaveGroup;
}

export const WaveRiskRollup: React.FC<Props> = ({ wave }) => {
  const apps = wave.applications || [];
  const total = apps.length || 1; // avoid divide by zero

  // 1. Compliance Calc
  const gdprCount = apps.filter(a => a.regulatoryCompliance?.toLowerCase().includes('gdpr')).length;
  const pciCount = apps.filter(a => a.regulatoryCompliance?.toLowerCase().includes('pci')).length;
  const gdprPercent = Math.round((gdprCount / total) * 100);

  // 2. Effort Estimation (Simple heuristic based on complexity)
  const calculateEffort = (app: ApplicationData) => {
    switch (app.complexity.toLowerCase()) {
      case 'high': return appConfig.assessment.effortPoints.high;
      case 'medium': return appConfig.assessment.effortPoints.medium;
      default: return appConfig.assessment.effortPoints.low;
    }
  };
  const totalEffortPoints = apps.reduce((sum, app) => sum + calculateEffort(app), 0);
  const forecastedCost = totalEffortPoints * appConfig.assessment.costs.baseEffortCost; // Arbitrary cost unit per point

  // 3. Ready vs Blocked Chart
  const ready = wave.readyApps;
  const blocked = wave.blockedApps;
  const others = wave.totalApps - ready - blocked;
  const readyPct = (ready / wave.totalApps) * 100;
  const blockedPct = (blocked / wave.totalApps) * 100;
  const othersPct = (others / wave.totalApps) * 100;

  return (
    <RollupContainer>
      <MetricRow>
        <Label>Compliance Readiness</Label>
        <MiniBadges>
          <MiniBadge active={gdprCount > 0} type="gdpr">GDPR {gdprPercent}%</MiniBadge>
          <MiniBadge active={pciCount > 0} type="pci">PCI {pciCount}</MiniBadge>
        </MiniBadges>
      </MetricRow>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <MetricRow>
          <Label>Wave Velocity</Label>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {ready}/{wave.totalApps} Ready
          </div>
        </MetricRow>
        <ProgressBarContainer>
          <BarSegment width={readyPct} color="#10b981" />
          <BarSegment width={othersPct} color="#e2e8f0" />
          <BarSegment width={blockedPct} color="#ef4444" />
        </ProgressBarContainer>
      </div>

      <MetricRow style={{ marginTop: '4px' }}>
        <Label>Forecasted Cost</Label>
        <Value color="#6366f1">${forecastedCost.toLocaleString()}</Value>
      </MetricRow>
    </RollupContainer>
  );
};
