import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { ApplicationData } from '@/types/application.types';
import { appConfig } from '@/config/appConfig';

const PanelContainer = styled(Card)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.background};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h4`
    font-size: ${({ theme }) => theme.typography.data.label};
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: 0.05em;
    margin: 0;
`;

const ComplianceGrid = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
`;

const ComplianceBadge = styled.div<{ active: boolean; type: 'gdpr' | 'pci' | 'hipaa' | 'sox' | 'none' }>`
    padding: 6px 12px;
    border-radius: 20px;
    font-size: ${({ theme }) => theme.typography.data.value};
    font-weight: 600;
    color: ${({ theme, active }) => active ? theme.colors.surface : theme.colors.textSecondary};
    background: ${({ theme, active, type }) => {
        if (!active) return theme.colors.background;
        switch (type) {
            case 'gdpr': return '#3b82f6';
            case 'pci': return '#ef4444';
            case 'hipaa': return '#10b981';
            case 'sox': return '#8b5cf6';
            default: return theme.colors.textSecondary;
        }
    }};
    opacity: ${({ active }) => active ? 1 : 0.5};
    border: 1px solid ${({ theme, active }) => active ? 'transparent' : theme.colors.border};
`;

const MetricsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
`;

const MetricCard = styled.div`
    background: ${({ theme }) => theme.colors.background};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: 8px;
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
`;

const MetricValue = styled.div`
    font-size: ${({ theme }) => theme.typography.data.largeValue};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const MetricLabel = styled.div`
    font-size: ${({ theme }) => theme.typography.data.value};
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const RiskBarContainer = styled.div`
    height: 8px;
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    margin-top: 8px;
    overflow: hidden;
`;

const RiskBar = styled.div<{ value: number; color: string }>`
    height: 100%;
    width: ${({ value }) => value}%;
    background: ${({ color }) => color};
`;

interface ComplianceCostPanelProps {
    app: ApplicationData;
}

export const ComplianceCostPanel: React.FC<ComplianceCostPanelProps> = ({ app }) => {
    const risk = app.assessment?.risk;

    const complianceList: Array<'gdpr' | 'pci' | 'hipaa' | 'sox'> = ['gdpr', 'pci', 'hipaa', 'sox'];
    const activeCompliance = app.regulatoryCompliance?.toLowerCase();

    const costRisk = risk?.breakdown?.costRisk || 0;
    const securityRisk = risk?.breakdown?.securityCompliance || 0;

    return (
        <PanelContainer>
            <Header>
                <Title>
                    <span>⚖️</span>
                    Compliance & Financial Impact
                </Title>
            </Header>

            <Section>
                <SectionTitle>Regulatory Frameworks</SectionTitle>
                <ComplianceGrid>
                    {complianceList.map(type => (
                        <ComplianceBadge
                            key={type}
                            type={type}
                            active={activeCompliance?.includes(type) ?? false}
                        >
                            {type.toUpperCase()}
                        </ComplianceBadge>
                    ))}
                    <ComplianceBadge key="none" type="none" active={activeCompliance === 'none' || !activeCompliance}>
                        Unregulated
                    </ComplianceBadge>
                </ComplianceGrid>
            </Section>

            <Section>
                <SectionTitle>Risk & Cost Analysis</SectionTitle>
                <MetricsGrid>
                    <MetricCard style={{ borderLeftColor: '#ef4444' }}>
                        <MetricLabel>Est. Cost Risk Score</MetricLabel>
                        <MetricValue>{costRisk}/100</MetricValue>
                        <RiskBarContainer>
                            <RiskBar value={costRisk} color={costRisk > appConfig.assessment.thresholds.complexity.high ? '#ef4444' : '#f59e0b'} />
                        </RiskBarContainer>
                        <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#64748b' }}>
                            Driven by complexity & volume
                        </div>
                    </MetricCard>

                    <MetricCard style={{ borderLeftColor: '#3b82f6' }}>
                        <MetricLabel>Security Compliance Gap</MetricLabel>
                        <MetricValue>{securityRisk}/100</MetricValue>
                        <RiskBarContainer>
                            <RiskBar value={securityRisk} color={securityRisk > appConfig.assessment.thresholds.risk.critical ? '#ef4444' : '#10b981'} />
                        </RiskBarContainer>
                        <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#64748b' }}>
                            Requires audit verification
                        </div>
                    </MetricCard>

                    {app.dataGravity && (
                        <MetricCard style={{ borderLeftColor: '#8b5cf6' }}>
                            <MetricLabel>Data Gravity Impact</MetricLabel>
                            <MetricValue>{app.dataGravity.volumeGB} GB</MetricValue>
                            <div style={{ fontSize: '0.75rem', marginTop: '4px', color: '#64748b' }}>
                                Egress cost factor: {app.dataGravity.complexity > appConfig.assessment.costs.dataEgressFactor ? 'High' : 'Low'}
                            </div>
                        </MetricCard>
                    )}
                </MetricsGrid>
            </Section>
        </PanelContainer>
    );
};
