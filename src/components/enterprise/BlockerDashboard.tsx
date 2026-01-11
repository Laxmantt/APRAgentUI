import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ApplicationService } from '@/services/ApplicationService';
import { ApplicationData } from '@/types/application.types';
import { Card } from '@/components/common/Card';
import { useRouter } from 'next/router';

const BlockerCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.error}33;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.error}08);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.headers.panel};
`;

const BlockerList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BlockerItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.colors.error};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    background: ${({ theme }) => theme.colors.error}0a;
  }
`;

const AppInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AppName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const AppMeta = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RiskBadge = styled.div<{ risk: number }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  background: ${({ theme, risk }) => risk > 80 ? theme.colors.error : theme.colors.warning}22;
  color: ${({ theme, risk }) => risk > 80 ? theme.colors.error : theme.colors.warning};
`;

const GravityBadge = styled.div`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const BlockerDashboard: React.FC = () => {
  const [blockers, setBlockers] = useState<ApplicationData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlockers = async () => {
      const apps = await ApplicationService.getAllApplications();
      // Logic: Apps with Critical Risk OR > 2000GB data OR Hard Link dependencies with low health
      const filtered = apps.filter(app => {
        const hasHighRisk = (app.assessment?.risk?.total || 0) > 75;
        const hasHighGravity = (app.dataGravity?.volumeGB || 0) > 2000;
        const hasCriticalLinks = app.links?.some(l => l.strength === 'hard' && l.health < 60);
        return hasHighRisk || hasHighGravity || hasCriticalLinks;
      }).sort((a, b) => (b.assessment?.risk?.total || 0) - (a.assessment?.risk?.total || 0));

      setBlockers(filtered.slice(0, 5));
    };

    fetchBlockers();
  }, []);

  return (
    <BlockerCard>
      <Header>
        <Title>🛑 Critical Migration Blockers</Title>
        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Requiring Stakeholder Review</span>
      </Header>

      <BlockerList>
        {blockers.map(app => (
          <BlockerItem key={app.id} onClick={() => router.push(`/assessment/${app.id}`)}>
            <AppInfo>
              <AppName>{app.name}</AppName>
              <AppMeta>{app.type} • {app.dependencies?.length || 0} Hard Dependencies</AppMeta>
            </AppInfo>
            {app.dataGravity && (
              <GravityBadge>⚖️ {app.dataGravity.volumeGB >= 1000 ? `${(app.dataGravity.volumeGB / 1000).toFixed(1)}TB` : `${app.dataGravity.volumeGB}GB`}</GravityBadge>
            )}
            <RiskBadge risk={app.assessment?.risk?.total || 0}>
              RISK: {app.assessment?.risk?.total || 0}%
            </RiskBadge>
          </BlockerItem>
        ))}
        {blockers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
            No critical blockers identified in the current assessment cycle.
          </div>
        )}
      </BlockerList>
    </BlockerCard>
  );
};
