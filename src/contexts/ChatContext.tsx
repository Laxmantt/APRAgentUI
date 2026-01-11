import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChatMessage, ChatRequest, ChatResponse } from '@/types/chat.types';
import { CloudAssistantChatService } from '@/services/CloudAssistantChatService';
import { appConfig } from '@/config/appConfig';

interface ChatContextType {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
    sendMessage: (text: string, context?: any) => Promise<void>;
    clearHistory: () => void;
    addMessage: (message: ChatMessage) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addMessage = useCallback((message: ChatMessage) => {
        setMessages(prev => [...prev, message]);
    }, []);

    const sendMessage = useCallback(async (text: string, context?: any) => {
        if (!text.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date(),
        };
        addMessage(userMsg);

        setIsLoading(true);
        setError(null);

        try {
            const request: ChatRequest = { message: text, context };
            const response = await CloudAssistantChatService.sendUserQuery(request);

            const aiMsg: ChatMessage = {
                id: response.responseId,
                role: 'assistant',
                content: response.message,
                timestamp: new Date(),
                citations: response.citations,
                metadata: {
                    model: response.metadata?.model,
                    processingTime: response.metadata?.usage?.totalTokens // Mocking some metadata
                }
            };
            addMessage(aiMsg);
        } catch (err) {
            console.error('Chat Error:', err);
            setError('Failed to get response');
            addMessage({
                id: 'error-' + Date.now(),
                role: 'assistant',
                content: "I'm having trouble connecting. Please try again.",
                timestamp: new Date(),
            });
        } finally {
            setIsLoading(false);
        }
    }, [addMessage]);

    const clearHistory = useCallback(() => {
        setMessages([]);
    }, []);

    return (
        <ChatContext.Provider value={{
            messages,
            isLoading,
            error,
            sendMessage,
            clearHistory,
            addMessage
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
};
