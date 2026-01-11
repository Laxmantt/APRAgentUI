import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Card, PageHeader } from '@/components/common';
import { Layout } from '@/components/layout';
import { FileUploadZone, UploadedFilesList } from '@/components/data-ingestion';
import { initialUploadedFiles, UploadedFile } from '@/mock-services/data/uploadedFiles';
import { useToast } from '@/hooks/useToast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const InfoBox = styled(Card)`
    background: ${({ theme }) => theme.colors.primary}08;
    border: 1px solid ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    gap: 12px;
    align-items: flex-start;
`;

const InfoText = styled.p`
    margin: 4px 0 0 0;
    opacity: 0.8;
    font-size: ${({ theme }) => theme.typography.body.size};
`;

export default function DataIngestionPage() {
    const [files, setFiles] = useState<UploadedFile[]>(initialUploadedFiles);
    const { addToast } = useToast();

    // Mock file processing
    const handleFileSelect = async (file: File) => {
        // 1. Validation
        const validExtensions = ['csv', 'json', 'xml', 'xlsx'];
        const extension = file.name.split('.').pop()?.toLowerCase();

        if (!extension || !validExtensions.includes(extension)) {
            addToast({
                type: 'error',
                title: 'Invalid File Format',
                message: `The file type .${extension} is not supported. Please upload CSV, JSON, XML, or XLSX.`,
            });
            return;
        }

        // 2. Create temporary entry (optimistic UI)
        const tempId = Date.now().toString();
        const newFile: UploadedFile = {
            id: tempId,
            fileName: file.name,
            date: new Date().toISOString().split('T')[0],
            size: formatFileSize(file.size),
            timestamp: Date.now(),
            status: 'uploading',
            type: file.type
        };

        setFiles(prev => [newFile, ...prev]);

        // 3. Simulate Upload
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Randomly fail for demo purposes if name contains 'error'
            if (file.name.includes('error')) {
                throw new Error('Simulated upload failure');
            }

            // Success
            setFiles(prev => prev.map(f =>
                f.id === tempId ? { ...f, status: 'success' } : f
            ));
            addToast({
                type: 'success',
                title: 'Upload Complete',
                message: `${file.name} was processed successfully.`
            });

        } catch (error) {
            // Error handling
            setFiles(prev => prev.map(f =>
                f.id === tempId ? { ...f, status: 'error' } : f
            ));
            addToast({
                type: 'error',
                title: 'Upload Failed',
                message: `Failed to upload ${file.name}. Please try again.`
            });
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    return (
        <Layout>
            <Head>
                <title>Data Ingestion - APR Agent</title>
            </Head>
            <Container>
                <PageHeader
                    title="Data Ingestion"
                    subtitle="Upload and manage external data sources for portfolio analysis. (Last updated: Today, 10:43 AM)"
                />

                <InfoBox>
                    <span style={{ fontSize: '1.2rem' }}>ℹ️</span>
                    <div>
                        <strong>Data Requirements</strong>
                        <InfoText>
                            Ensure your files follow the standard schema for Application Inventory and Dependency Mapping.
                            Large files (&gt;5MB) may take a few minutes to process.
                        </InfoText>
                    </div>
                </InfoBox>

                <Section>
                    <SectionTitle>Upload Data Source</SectionTitle>
                    <FileUploadZone onFileSelected={handleFileSelect} />
                </Section>

                <Section>
                    <SectionTitle>Recent Uploads</SectionTitle>
                    <UploadedFilesList files={files} />
                </Section>
            </Container>
        </Layout>
    );
}
