import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { UploadedFile } from '@/mock-services/data/uploadedFiles';

const ListContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0;
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  gap: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const FileRow = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 100px;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.1s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const FileName = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const FileIcon = styled.span<{ type: string }>`
  font-size: 1.2rem;
`;

const FileMetric = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const StatusBadge = styled.span<{ status: UploadedFile['status'] }>`
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  width: fit-content;
  
  ${({ status, theme }) => {
        switch (status) {
            case 'success':
                return `background: ${theme.colors.success}20; color: ${theme.colors.success}; border: 1px solid ${theme.colors.success}40;`;
            case 'error':
                return `background: ${theme.colors.error}20; color: ${theme.colors.error}; border: 1px solid ${theme.colors.error}40;`;
            case 'uploading':
                return `background: ${theme.colors.secondary}20; color: ${theme.colors.secondary}; border: 1px solid ${theme.colors.secondary}40;`;
            default:
                return `background: ${theme.colors.border}; color: ${theme.colors.textSecondary};`;
        }
    }}
`;

interface UploadedFilesListProps {
    files: UploadedFile[];
}

const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.csv')) return '📊';
    if (fileName.endsWith('.json')) return '📦';
    if (fileName.endsWith('.xml')) return '📄';
    return '📁';
};

const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ files }) => {
    if (files.length === 0) {
        return (
            <Card style={{ padding: '32px', textAlign: 'center', color: 'gray' }}>
                No files uploaded yet.
            </Card>
        );
    }

    return (
        <ListContainer>
            <ListHeader>
                <div>File Name</div>
                <div>Date</div>
                <div>Time</div>
                <div>Size</div>
                <div>Status</div>
            </ListHeader>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {files.map((file) => (
                    <FileRow key={file.id}>
                        <FileName>
                            <FileIcon type={file.type}>{getFileIcon(file.fileName)}</FileIcon>
                            {file.fileName}
                        </FileName>
                        <FileMetric>{file.date}</FileMetric>
                        <FileMetric>{formatTime(file.timestamp)}</FileMetric>
                        <FileMetric>{file.size}</FileMetric>
                        <StatusBadge status={file.status}>{file.status}</StatusBadge>
                    </FileRow>
                ))}
            </div>
        </ListContainer>
    );
};
