export interface Citation {
    id: string;
    title: string;
    uri?: string;
    snippet?: string;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    citations?: Citation[];
    metadata?: {
        model?: string;
        tokens?: number;
        processingTime?: number;
    };
    attachments?: { name: string; type: string; size: number }[];
}

export interface ChatRequest {
    message: string;
    context?: Record<string, any>;
    sessionId?: string;
    stream?: boolean;
}

export interface ChatResponse {
    message: string;
    responseId: string;
    citations?: Citation[];
    metadata?: {
        model: string;
        usage?: {
            promptTokens: number;
            completionTokens: number;
            totalTokens: number;
        };
        confidence: number;
    };
}
