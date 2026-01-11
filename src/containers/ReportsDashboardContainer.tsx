import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReportingService } from '@/services/ReportingService';
import { ReportData } from '@/types/report.types';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { PageHeader } from '@/components/common/PageHeader';
import { DataGrid } from '@/components/common/DataGrid';
import { formatDate } from '@/utils/formatUtils';
import { appConfig } from '@/config/appConfig';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const GenerateModal = styled.div<{ show: boolean }>`
  display: ${({ show }) => show ? 'flex' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  max-width: 500px;
  width: 90%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ModalTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ReportCard = styled(Card)`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  transition: all 0.2s;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.secondary}50;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const ReportInfo = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ReportName = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const ReportMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  align-items: center;
`;

const MetaItem = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TypeBadge = styled.span<{ type: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme, type }) => {
        const colors: any = {
            'Portfolio Summary': theme.colors.primary,
            'Risk Analysis': theme.colors.error,
            'Wave Plan': theme.colors.success,
            'Dependency Matrix': theme.colors.secondary,
            'Cost Estimation': theme.colors.warning
        };
        return (colors[type] || theme.colors.primary) + '20';
    }};
  color: ${({ theme, type }) => {
        const colors: any = {
            'Portfolio Summary': theme.colors.primary,
            'Risk Analysis': theme.colors.error,
            'Wave Plan': theme.colors.success,
            'Dependency Matrix': theme.colors.secondary,
            'Cost Estimation': theme.colors.warning
        };
        return colors[type] || theme.colors.primary;
    }};
  white-space: nowrap;
`;

const FormatBadge = styled.span`
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-transform: uppercase;
`;

const ReportDescription = styled.p`
  margin: 2px 0 0 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
`;

const ReportActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ReportsDashboardContainer: React.FC = () => {
    const [reports, setReports] = useState<ReportData[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set());
    const [selectedType, setSelectedType] = useState<ReportData['type']>('Portfolio Summary');
    const [selectedFormat, setSelectedFormat] = useState<ReportData['format']>('PDF');

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const data = await ReportingService.getAllReports();
            setReports(data);
        } catch (error) {
            console.error('Failed to load reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            await ReportingService.generateNewReport(selectedType, selectedFormat);
            await loadReports();
            setShowModal(false);
        } catch (error) {
            console.error('Failed to generate report:', error);
        } finally {
            setGenerating(false);
        }
    };

    const handleDownload = async (report: ReportData) => {
        setDownloadingIds(prev => new Set(prev).add(report.id));
        try {
            const filename = `${report.name.replace(/\s+/g, '_')}.${report.format.toLowerCase()}`;
            await ReportingService.downloadReportFile(report.id, filename);
        } catch (error) {
            console.error('Failed to download report:', error);
        } finally {
            setDownloadingIds(prev => {
                const updated = new Set(prev);
                updated.delete(report.id);
                return updated;
            });
        }
    };

    const handleDelete = async (reportId: string) => {
        if (confirm('Are you sure you want to delete this report?')) {
            try {
                await ReportingService.deleteReportRecord(reportId);
                await loadReports();
            } catch (error) {
                console.error('Failed to delete report:', error);
            }
        }
    };

    if (loading) return <Container><div>Loading reports...</div></Container>;

    return (
        <Container>
            <PageHeader
                title={appConfig.ui.pageTitles.reports}
                subtitle="Generate, view, and download detailed portfolio analysis reports."
            />

            {reports.length === 0 ? (
                <EmptyState>
                    <p>No reports generated yet.</p>
                    <Button onClick={() => setShowModal(true)}>Generate Your First Report</Button>
                </EmptyState>
            ) : (
                <DataGrid columns={1} gap="1rem">
                    {reports.map(report => (
                        <ReportCard key={report.id}>
                            <ReportInfo>
                                <ReportName>{report.name}</ReportName>
                                <ReportMeta>
                                    <TypeBadge type={report.type}>{report.type}</TypeBadge>
                                    <FormatBadge>{report.format}</FormatBadge>
                                    <MetaItem>📅 {formatDate(report.generatedDate, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</MetaItem>
                                    <MetaItem>💾 {report.size}</MetaItem>
                                    {report.metadata?.appCount && (
                                        <MetaItem>📊 {report.metadata.appCount} Apps</MetaItem>
                                    )}
                                    {report.metadata?.targetCloud && (
                                        <FormatBadge style={{ background: '#3b82f610', color: '#3b82f6' }}>☁️ {report.metadata.targetCloud}</FormatBadge>
                                    )}
                                    {report.metadata?.rationalizationStrategy && (
                                        <FormatBadge style={{ background: '#10b98110', color: '#10b981' }}>🎯 {report.metadata.rationalizationStrategy}</FormatBadge>
                                    )}
                                </ReportMeta>
                                <ReportDescription>{report.description}</ReportDescription>
                            </ReportInfo>
                            <ReportActions>
                                <Button
                                    size="sm"
                                    onClick={() => handleDownload(report)}
                                    disabled={downloadingIds.has(report.id)}
                                >
                                    {downloadingIds.has(report.id) ? '⌛ Downloading...' : 'Download'}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDelete(report.id)}
                                    title="Delete Report"
                                >
                                    🗑️
                                </Button>
                            </ReportActions>
                        </ReportCard>
                    ))}
                </DataGrid>
            )}

            <GenerateModal show={showModal}>
                <ModalContent>
                    <ModalTitle>Generate New Report</ModalTitle>
                    <FormGroup>
                        <Label>Report Type</Label>
                        <Select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value as ReportData['type'])}
                        >
                            <option value="Portfolio Summary">Portfolio Summary</option>
                            <option value="Risk Analysis">Risk Analysis Summary</option>
                            <option value="Wave Plan">Wave Plan Report</option>
                            <option value="Dependency Matrix">Dependency Matrix</option>
                            <option value="Cost Estimation">Cost Estimation</option>
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Format</Label>
                        <Select
                            value={selectedFormat}
                            onChange={(e) => setSelectedFormat(e.target.value as ReportData['format'])}
                        >
                            <option value="PDF">PDF</option>
                            <option value="Excel">Excel</option>
                            <option value="CSV">CSV</option>
                        </Select>
                    </FormGroup>
                    <ModalActions>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleGenerate} disabled={generating}>
                            {generating ? 'Generating...' : 'Generate'}
                        </Button>
                    </ModalActions>
                </ModalContent>
            </GenerateModal>
        </Container>
    );
};
