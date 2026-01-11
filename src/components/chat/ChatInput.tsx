import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface ChatInputProps {
    onSend: (message: string) => void;
    onFileUpload?: (file: File) => void;
    isLoading: boolean;
    placeholder?: string;
}

const InputContainer = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.surface};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    align-items: center;
`;

const VisuallyHiddenLabel = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const AttachmentButton = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    cursor: pointer;
    font-size: 1.2rem;
    padding: ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    border-radius: 4px;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.primary}10;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, onFileUpload, isLoading, placeholder = "Type your query..." }) => {
    const [value, setValue] = useState('');
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSend = () => {
        if (value.trim() && !isLoading) {
            onSend(value);
            setValue('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileUpload) {
            onFileUpload(file);
        }
        // Reset input value to allow uploading same file again
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <InputContainer>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept=".csv,.json,.pdf,.docx,.xlsx"
                disabled={isLoading}
            />
            <AttachmentButton
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                title="Attach discovery data or documents"
                type="button"
            >
                📎
            </AttachmentButton>
            <div style={{ flex: 1 }}>
                <label htmlFor="chat-input-field">
                    <VisuallyHiddenLabel>Chat Input Prompt</VisuallyHiddenLabel>
                </label>
                <Input
                    id="chat-input-field"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    disabled={isLoading}
                    aria-label="Chat input query"
                    wrapperStyle={{ marginBottom: 0 }}
                />
            </div>
            <Button onClick={handleSend} disabled={isLoading || !value.trim()}>
                Send
            </Button>
        </InputContainer>
    );
};
