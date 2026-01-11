import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ReportData } from '@/types/report.types';
import { formatDate } from '@/utils/formatUtils';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface ReportListProps {
    reports: ReportData[];
    onDownload: (id: string) => void;
}

export const ReportList: React.FC<ReportListProps> = ({ reports, onDownload }) => {
    if (reports.length === 0) {
        return (
            <Card>
                <EmptyState>No reports found. Create one to get started.</EmptyState>
            </Card>
        );
    }

    return (
        <Card>
            <Table>
                <thead>
                    <tr>
                        <Th>Name</Th>
                        <Th>Type</Th>
                        <Th>Generated Date</Th>
                        <Th>Actions</Th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <Td><strong>{report.name}</strong></Td>
                            <Td>{report.type}</Td>
                            <Td>{formatDate(report.generatedDate)}</Td>
                            <Td>
                                <Button size="sm" variant="outline" onClick={() => onDownload(report.id)}>
                                    Download
                                </Button>
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};
