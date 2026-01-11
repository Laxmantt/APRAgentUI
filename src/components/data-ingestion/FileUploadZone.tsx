import React, { useRef, useState, DragEvent, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import { Button } from '@/components/common/Button';
import { appConfig } from '@/config/appConfig';

const UploadContainer = styled.div<{ isDragging: boolean }>`
  border: 2px dashed ${({ theme, isDragging }) => isDragging ? theme.colors.primary : theme.colors.border};
  background: ${({ theme, isDragging }) => isDragging ? `${theme.colors.primary}10` : theme.colors.surface};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 80px;
  justify-content: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.surface}f0;
  }
`;

const IconWrapper = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const UploadTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const UploadSubtitle = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface FileUploadZoneProps {
    onFileSelected: (file: File) => void;
    acceptedFileTypes?: string[];
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
    onFileSelected,
    acceptedFileTypes = appConfig.data.ingestion.acceptedFormats
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndSelect(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            validateAndSelect(e.target.files[0]);
        }
    };

    const validateAndSelect = (file: File) => {
        // Simple client-side validation logic can be added here
        // For now, we pass it up and let the parent handle detailed validation/errors
        onFileSelected(file);
    };

    const handleClick = () => {
        inputRef.current?.click();
    };

    return (
        <UploadContainer
            isDragging={isDragging}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <IconWrapper>📂</IconWrapper>
            <UploadTitle>Drag & Drop files here</UploadTitle>
            <UploadSubtitle>
                or click to browse from your computer <br />
                Supports: {acceptedFileTypes.join(', ')}
            </UploadSubtitle>

            <HiddenInput
                ref={inputRef}
                type="file"
                accept={acceptedFileTypes.join(',')}
                onChange={handleChange}
            />

            <Button size="sm" variant="outline" style={{ marginTop: '16px', pointerEvents: 'none' }}>
                Browse Files
            </Button>
        </UploadContainer>
    );
};
