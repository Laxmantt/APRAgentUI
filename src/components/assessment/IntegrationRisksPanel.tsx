import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { DependencyNode } from '@/types/application.types';
import { appConfig } from '@/config/appConfig';

const PanelContainer = styled(Card)`
  background: linear-gradient(to right, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.background});
  border-left: 4px solid ${({ theme }) => theme.colors.warning};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RiskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const RiskItem = styled.div<{ severity: 'critical' | 'warning' }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  background: ${({ theme, severity }) => severity === 'critical' ? `${theme.colors.error}10` : `${theme.colors.warning}10`};
  border: 1px solid ${({ theme, severity }) => severity === 'critical' ? `${theme.colors.error}30` : `${theme.colors.warning}30`};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RiskTitle = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const RiskDescription = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const MitigationAction = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 4px;

  &::before {
    content: '💡';
  }
`;

interface IntegrationRisksPanelProps {
    links: DependencyNode[];
}

export const IntegrationRisksPanel: React.FC<IntegrationRisksPanelProps> = ({ links }) => {
    // Identify risks
    const criticalRisks = links.filter(l => l.health < appConfig.assessment.thresholds.risk.critical);
    const warningRisks = links.filter(l => l.health >= appConfig.assessment.thresholds.risk.critical && l.health < appConfig.assessment.thresholds.risk.warning);
    const vendorRisks = links.filter(l => l.type === 'external' && l.strength === 'hard');

    if (criticalRisks.length === 0 && warningRisks.length === 0 && vendorRisks.length === 0) {
        return null;
    }

    return (
        <PanelContainer>
            <Header>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <div>
                    <Title>Integration & Migration Risks</Title>
                    <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                        Critical dependencies identifying potential migration blockers.
                    </div>
                </div>
            </Header>

            <RiskGrid>
                {criticalRisks.map(link => (
                    <RiskItem key={`crit-${link.id}`} severity="critical">
                        <RiskTitle>Critical: {link.name}</RiskTitle>
                        <RiskDescription>
                            Connection health is critically low ({link.health}%).
                            {link.direction === 'upstream' ? ' This provider is unstable.' : ' This consumer may break.'}
                        </RiskDescription>
                        <MitigationAction>
                            Stabilize connection before migration or decouple logic.
                        </MitigationAction>
                    </RiskItem>
                ))}

                {vendorRisks.map(link => (
                    // Avoid duplicates if already in critical
                    !criticalRisks.find(c => c.id === link.id) && (
                        <RiskItem key={`vend-${link.id}`} severity="warning">
                            <RiskTitle>Vendor Lock-in: {link.name}</RiskTitle>
                            <RiskDescription>
                                Hard dependency on external service. Migration may require contract/SLA validation.
                            </RiskDescription>
                            <MitigationAction>
                                Review API compatibility and egress costs.
                            </MitigationAction>
                        </RiskItem>
                    )
                ))}

                {warningRisks.map(link => (
                    // Avoid duplicates
                    !criticalRisks.find(c => c.id === link.id) && !vendorRisks.find(v => v.id === link.id) && (
                        <RiskItem key={`warn-${link.id}`} severity="warning">
                            <RiskTitle>Unstable Link: {link.name}</RiskTitle>
                            <RiskDescription>
                                Connection health is degrading ({link.health}%).
                            </RiskDescription>
                            <MitigationAction>
                                Monitor latency during peak load tests.
                            </MitigationAction>
                        </RiskItem>
                    )
                ))}
            </RiskGrid>
        </PanelContainer>
    );
};
