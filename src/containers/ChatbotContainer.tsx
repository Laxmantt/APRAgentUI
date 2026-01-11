import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { appConfig } from '@/config/appConfig';
import { useChat } from '@/hooks/useChat';
import { ChatMessage as IChatMessage } from '@/types/chat.types';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatMessage } from '@/components/chat/ChatMessage';

const ChatContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
`;

const MessageList = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
`;

const SystemMessage = styled.div`
    padding: ${({ theme }) => theme.spacing.md};
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: ${({ theme }) => theme.typography.data.cell};
    font-style: italic;
`;

interface ChatbotContainerProps {
    initialContext?: { appName: string };
    initialMessage?: string;
}

export const ChatbotContainer: React.FC<ChatbotContainerProps> = ({
    initialContext,
    initialMessage,
}) => {
    const { messages, sendMessage, isLoading, addMessage } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    // Initial greeting / message logic
    useEffect(() => {
        if (!initialized.current) {
            if (messages.length === 0) {
                // First time greeting
                addMessage({
                    id: 'init-greet',
                    role: 'assistant',
                    content: initialContext?.appName
                        ? `Hello! I'm here to help you with "${initialContext.appName}".`
                        : appConfig.chatbot.greeting,
                    timestamp: new Date()
                });
            }

            if (initialMessage && !messages.some(m => m.content === initialMessage)) {
                sendMessage(initialMessage, initialContext);
            }
            initialized.current = true;
        }
    }, [addMessage, initialContext, initialMessage, messages, sendMessage]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = (text: string) => {
        sendMessage(text, initialContext);
    };

    const handleFileUpload = (file: File) => {
        // 1. Add User Message with Attachment info
        const userMsg: IChatMessage = {
            id: 'upload-' + Date.now(),
            role: 'user',
            content: `I've uploaded a file: ${file.name}`,
            timestamp: new Date(),
            attachments: [{ name: file.name, type: file.type, size: file.size }]
        };
        addMessage(userMsg);

        // 2. Simulate "Thinking" and AI Response
        setTimeout(() => {
            let analysis = "";
            const ext = file.name.split('.').pop()?.toLowerCase();

            if (ext === 'csv' || ext === 'xlsx') {
                analysis = `I've processed **${file.name}**. I've identified 12 new dependency mappings and updated the resource utilization scores for 3 on-premise applications. You can now see these updates in the Dependency Mapping dashboard.`;
            } else if (ext === 'pdf' || ext === 'docx') {
                analysis = `I've analyzed the architecture specifications in **${file.name}**. I've extracted the high-availability requirements and identified a potential bottleneck in the database replication layer for the 'Legacy CRM' migration plan.`;
            } else {
                analysis = `I've received **${file.name}**. My analysis is complete. I've updated the application metadata with the findings from this discovery document.`;
            }

            addMessage({
                id: 'ai-analysis-' + Date.now(),
                role: 'assistant',
                content: analysis,
                timestamp: new Date()
            });
        }, 1500);
    };

    // Quick suggestions for testing
    const suggestions = [
        "Show me the details for the Legacy CRM application.",
        "Which applications have the highest risk score?",
        "What is the timeline for Wave 2?",
        "Describe the source architecture of the Trading System.",
        "How will the database be migrated considering dependencies?"
    ];

    const SuggestedChips = styled.div`
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 0 ${({ theme }) => theme.spacing.lg};
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    `;

    const Chip = styled.button`
        background: ${({ theme }) => theme.colors.surface};
        border: 1px solid ${({ theme }) => theme.colors.primary}40;
        color: ${({ theme }) => theme.colors.primary};
        padding: 4px 12px;
        border-radius: 12px;
        font-size: ${({ theme }) => theme.typography.data.label};
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: ${({ theme }) => theme.colors.primary}10;
            transform: translateY(-1px);
        }
    `;

    return (
        <ChatContainer>
            <MessageList>
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <SystemMessage>Thinking...</SystemMessage>
                )}
                <div ref={messagesEndRef} />
            </MessageList>

            {messages.length < 3 && !isLoading && (
                <SuggestedChips>
                    {suggestions.map((s, i) => (
                        <Chip key={i} onClick={() => handleSend(s)}>{s}</Chip>
                    ))}
                </SuggestedChips>
            )}

            <ChatInput onSend={handleSend} onFileUpload={handleFileUpload} isLoading={isLoading} />
        </ChatContainer>
    );
};

