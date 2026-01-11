import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Accordion, Button, Card, DataGrid, PageHeader } from '@/components/common';
import { ApplicationService, WaveManagementService } from '@/services';
import { WaveAdvisoryPanel } from '@/components/assessment';
import { DependencyRiskHeatmap } from '@/components/dashboard';
import { WaveRiskRollup } from '@/components/waves';
import { appConfig } from '@/config/appConfig';
import { WaveGroup, WaveRisk, Wave, WaveDependency, ExternalIntegration, DataSource, InfrastructureSetup } from '@/types/wave.types';
import { getRiskColor, getStatusColor } from '@/utils/styleUtils';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const WaveCard = styled(Card) <{ selected: boolean }>`
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid ${({ theme, selected }) =>
    selected ? theme.colors.primary : 'transparent'};
  background: ${({ theme, selected }) =>
    selected ? `${theme.colors.primary}05` : theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary}80;
  }
`;

const WaveHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const WaveNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const WaveStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Stat = styled.div`
  display: grid;
`;

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatValue = styled.span<{ highlight?: boolean }>`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  color: ${({ theme, highlight }) =>
    highlight ? theme.colors.error : theme.colors.text};
`;

const DetailSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.headers.panel};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const DataTable = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.div <{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, minmax(100px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  align-items: center;
  font-size: ${({ theme }) => theme.typography.data.value};

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeader = styled(TableRow)`
  background: ${({ theme }) => theme.colors.background};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  position: sticky;
  top: 0;
`;

const AppName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const RiskBadge = styled.div<{ score: number | string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 600;
  text-align: center;
  background: ${({ theme, score }) => {
    if (typeof score === 'string') return theme.colors.secondary + '20';
    return score >= 75 ? getRiskColor('high') + '20' :
      score >= 50 ? getRiskColor('medium') + '20' :
        getRiskColor('low') + '20';
  }};
  color: ${({ theme, score }) => {
    if (typeof score === 'string') return theme.colors.secondary;
    return score >= 75 ? getRiskColor('high') :
      score >= 50 ? getRiskColor('medium') :
        getRiskColor('low');
  }};
  width: fit-content;
`;

const CriticalityBadge = styled.div<{ criticality: string }>`
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background: ${({ criticality }) => getRiskColor(criticality.toLowerCase())}15;
  color: ${({ criticality }) => getRiskColor(criticality.toLowerCase())};
  border: 1px solid ${({ criticality }) => getRiskColor(criticality.toLowerCase())}40;
  width: fit-content;
`;

const TechBadge = styled.span`
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  font-family: monospace;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const StatusIcon = styled.div<{ status: string }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  background: ${({ status }) => getStatusColor(status)}20;
  color: ${({ status }) => getStatusColor(status)};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.background}50;
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
`;

export const WaveManagementContainer: React.FC = () => {
  const router = useRouter();
  const [waveGroups, setWaveGroups] = useState<WaveGroup[]>([]);
  const [selectedWave, setSelectedWave] = useState<number | null>(null);
  const [waveDetails, setWaveDetails] = useState<Wave | null>(null);
  const [waveRisks, setWaveRisks] = useState<WaveRisk[]>([]);
  const [allApps, setAllApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mutually exclusive accordion state
  const [activeSection, setActiveSection] = useState<string | null>('advisory');

  const handleToggle = (section: string) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  useEffect(() => {
    loadWaveData();
  }, []);

  useEffect(() => {
    if (selectedWave !== null) {
      loadWaveRisks(selectedWave);
      loadWaveDetails(selectedWave);
    }
  }, [selectedWave]);

  const loadWaveDetails = async (id: number) => {
    try {
      const details = await WaveManagementService.getWaveById(id);
      setWaveDetails(details);
    } catch (e) {
      console.error("Failed to load wave details", e);
    }
  };

  const loadWaveData = async () => {
    try {
      const [groups, apps] = await Promise.all([
        WaveManagementService.getMigrationWaveGroups(),
        ApplicationService.getAllApplications()
      ]);
      setWaveGroups(groups);
      setAllApps(apps);
      if (groups.length > 0) {
        setSelectedWave(groups[0].waveNumber);
      }
    } catch (error) {
      console.error('Failed to load wave data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWaveRisks = async (waveNumber: number) => {
    try {
      const risks = await WaveManagementService.getWaveMigrationRisks(waveNumber);
      setWaveRisks(risks);
    } catch (error) {
      console.error('Failed to load wave risks:', error);
    }
  };

  const handleAppClick = (appId: string) => {
    router.push(`/assessment/${appId}`);
  };

  const getStatusIcon = (status?: string) => {
    if (status === 'approved') return '✓';
    if (status === 'reviewed') return '◐';
    return '○';
  };

  const getClusterRisk = (app: any) => {
    if (!app.links) return null;
    const splitHardLinks = app.links.filter((link: any) => {
      if (link.strength !== 'hard') return false;
      const targetApp = allApps.find(a => a.id === link.id || a.name === link.name);
      if (!targetApp) return false;
      return targetApp.assessment?.wave?.value !== selectedWave;
    });

    if (splitHardLinks.length > 0) {
      return {
        count: splitHardLinks.length,
        targets: splitHardLinks.map((l: any) => l.name).join(', ')
      };
    }
    return null;
  };

  if (loading) return <Container><div>Loading wave management...</div></Container>;

  const selectedWaveGroup = waveGroups.find(w => w.waveNumber === selectedWave);

  return (
    <Container>
      <PageHeader
        title={appConfig.ui.pageTitles.waves}
        subtitle="Organize and schedule your migration waves based on risk and complexity."
      />

      <DataGrid minWidth="280px">
        {waveGroups.map(wave => (
          <WaveCard
            key={wave.waveNumber}
            selected={selectedWave === wave.waveNumber}
            onClick={() => setSelectedWave(wave.waveNumber)}
          >
            <WaveHeader>
              <WaveNumber>Wave {wave.waveNumber}</WaveNumber>
              <span>{wave.totalApps} Apps</span>
            </WaveHeader>
            <WaveRiskRollup wave={wave} />
          </WaveCard>
        ))}
      </DataGrid>

      {selectedWave && (
        <DetailSection>
          {waveDetails?.actionPlan && (
            <Accordion
              title="Wave Action Plan"
              icon="🚀"
              isExpanded={activeSection === 'advisory'}
              onToggle={() => handleToggle('advisory')}
            >
              <WaveAdvisoryPanel plan={waveDetails.actionPlan} />
            </Accordion>
          )}

          <Accordion
            title={`Section 1: Wave ${selectedWave} Apps`}
            icon="📊"
            isExpanded={activeSection === 'management'}
            onToggle={() => handleToggle('management')}
          >
            {selectedWaveGroup ? (
              <DataTable>
                <TableHeader columns={6}>
                  <div>Application</div>
                  <div>Type</div>
                  <div>Risk Score</div>
                  <div>Migration Path</div>
                  <div>Cluster Maturity</div>
                  <div>Status</div>
                </TableHeader>
                {selectedWaveGroup.applications.map(app => {
                  const clusterRisk = getClusterRisk(app);
                  return (
                    <TableRow key={app.id} columns={6} onClick={() => handleAppClick(app.id)} style={{ cursor: 'pointer' }}>
                      <div>
                        <AppName>{app.name}</AppName>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{app.version}</div>
                      </div>
                      <div>{app.type}</div>
                      <RiskBadge score={app.assessment?.risk?.total || 0}>
                        {app.assessment?.risk?.total || 'N/A'}
                      </RiskBadge>
                      <div>
                        <TechBadge>{app.assessment?.strategy?.value || 'Pending'}</TechBadge>
                      </div>
                      <div>
                        {clusterRisk ? (
                          <div style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 'bold' }}>
                            ⚠️ Split Cluster: Needs {clusterRisk.targets}
                          </div>
                        ) : (
                          <div style={{ color: '#10b981', fontSize: '0.75rem' }}>✓ Cluster Integrity OK</div>
                        )}
                      </div>
                      <StatusIcon status={app.assessment?.risk?.status || 'pending'}>
                        {getStatusIcon(app.assessment?.risk?.status)}
                      </StatusIcon>
                    </TableRow>
                  );
                })}
              </DataTable>
            ) : (
              <EmptyState>No applications found for this wave</EmptyState>
            )}
          </Accordion>

          <Accordion
            title="Section 2: Dependencies & Integrations"
            icon="🔗"
            isExpanded={activeSection === 'deps'}
            onToggle={() => handleToggle('deps')}
          >
            {waveDetails?.dependencies && waveDetails.dependencies.length > 0 ? (
              <DataTable>
                <TableHeader columns={7}>
                  <div>Source</div>
                  <div>Type</div>
                  <div>Tech Stack</div>
                  <div>Current</div>
                  <div>Target</div>
                  <div>Description</div>
                  <div>Criticality</div>
                </TableHeader>
                {waveDetails.dependencies.map(dep => (
                  <TableRow key={dep.id} columns={7}>
                    <AppName>{dep.sourceAppId} → {dep.targetAppId}</AppName>
                    <div>{dep.type}</div>
                    <div><TechBadge>{dep.techStack}</TechBadge></div>
                    <div>{dep.currentEnv}</div>
                    <div>{dep.targetEnv}</div>
                    <div title={dep.description}>{dep.description}</div>
                    <CriticalityBadge criticality={dep.criticality}>{dep.criticality}</CriticalityBadge>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No dependencies detected for this wave</EmptyState>
            )}
          </Accordion>

          <Accordion
            title="Section 3: External Integrations"
            icon="🌐"
            isExpanded={activeSection === 'external'}
            onToggle={() => handleToggle('external')}
          >
            {waveDetails?.externalIntegrations && waveDetails.externalIntegrations.length > 0 ? (
              <DataTable>
                <TableHeader columns={7}>
                  <div>Name</div>
                  <div>Type</div>
                  <div>Tech Stack</div>
                  <div>Current</div>
                  <div>Target</div>
                  <div>Description</div>
                  <div>Criticality</div>
                </TableHeader>
                {waveDetails.externalIntegrations.map(int => (
                  <TableRow key={int.id} columns={7}>
                    <AppName>{int.name}</AppName>
                    <div>{int.type}</div>
                    <div><TechBadge>{int.techStack}</TechBadge></div>
                    <div>{int.currentEnv}</div>
                    <div>{int.targetEnv}</div>
                    <div title={int.description}>{int.description}</div>
                    <CriticalityBadge criticality={int.criticality}>{int.criticality}</CriticalityBadge>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No external integrations detected for this wave</EmptyState>
            )}
          </Accordion>

          <Accordion
            title="Section 4: Data Sources"
            icon="💾"
            isExpanded={activeSection === 'data'}
            onToggle={() => handleToggle('data')}
          >
            {waveDetails?.dataSources && waveDetails.dataSources.length > 0 ? (
              <DataTable>
                <TableHeader columns={7}>
                  <div>Name</div>
                  <div>Type</div>
                  <div>Tech Stack</div>
                  <div>Current</div>
                  <div>Target</div>
                  <div>Description</div>
                  <div>Criticality</div>
                </TableHeader>
                {waveDetails.dataSources.map(ds => (
                  <TableRow key={ds.id} columns={7}>
                    <AppName>{ds.name}</AppName>
                    <div>{ds.type}</div>
                    <div><TechBadge>{ds.techStack}</TechBadge></div>
                    <div>{ds.currentEnv}</div>
                    <div>{ds.targetEnv}</div>
                    <div title={ds.description}>{ds.description}</div>
                    <CriticalityBadge criticality={ds.criticality}>{ds.criticality}</CriticalityBadge>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No data sources detected for this wave</EmptyState>
            )}
          </Accordion>

          <Accordion
            title="Section 5: Current Infrastructure Setup Environment"
            icon="☁️"
            isExpanded={activeSection === 'infra'}
            onToggle={() => handleToggle('infra')}
          >
            {waveDetails?.infrastructure && waveDetails.infrastructure.length > 0 ? (
              <DataTable>
                <TableHeader columns={7}>
                  <div>Component</div>
                  <div>Type</div>
                  <div>Tech Stack</div>
                  <div>Current</div>
                  <div>Target</div>
                  <div>Description</div>
                  <div>Criticality</div>
                </TableHeader>
                {waveDetails.infrastructure.map(inf => (
                  <TableRow key={inf.id} columns={7}>
                    <AppName>{inf.component}</AppName>
                    <div>{inf.type}</div>
                    <div><TechBadge>{inf.techStack}</TechBadge></div>
                    <div>{inf.currentEnv}</div>
                    <div>{inf.targetEnv}</div>
                    <div title={inf.description}>{inf.description}</div>
                    <CriticalityBadge criticality={inf.criticality}>{inf.criticality}</CriticalityBadge>
                  </TableRow>
                ))}
              </DataTable>
            ) : (
              <EmptyState>No infrastructure components detected for this wave</EmptyState>
            )}
          </Accordion>
        </DetailSection >
      )}

      {
        waveRisks.length > 0 && selectedWave && (
          <DetailSection style={{ marginTop: '3rem' }}>
            <SectionTitle>⚠️ Overarching Wave Risks</SectionTitle>
            <DataGrid minWidth="400px" gap="1rem">
              {waveRisks.map((risk, index) => (
                <Card key={index} style={{ borderLeft: `4px solid ${getRiskColor(risk.severity.toLowerCase())}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <AppName>{risk.title}</AppName>
                    <CriticalityBadge criticality={risk.severity}>{risk.severity}</CriticalityBadge>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748B' }}>{risk.description}</p>
                </Card>
              ))}
            </DataGrid>
          </DetailSection>
        )
      }
    </Container >
  );
};
