import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ChatbotContainer } from '@/containers/ChatbotContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// ============================================================================
// Type Definitions
// ============================================================================

interface ChatbotContext {
    appName: string;
    context: string | null;
}

// ============================================================================
// Styled Components
// ============================================================================

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContextBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}10, ${({ theme }) => theme.colors.secondary}10);
  border: 2px solid ${({ theme }) => theme.colors.primary}30;
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const ContextIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const ContextContent = styled.div`
  flex: 1;
`;

const ContextLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ContextValue = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Extracts chatbot context from URL query parameters
 * @param query - Next.js router query object
 * @returns ChatbotContext object or undefined if appName is missing
 */
const extractContextFromQuery = (query: Record<string, string | string[] | undefined>): ChatbotContext | undefined => {
    const appName = typeof query.appName === 'string' ? query.appName : undefined;
    const context = typeof query.context === 'string' ? query.context : null;

    if (!appName) return undefined;

    return { appName, context };
};

/**
 * Generates initial chatbot message based on context
 * @param context - Chatbot context
 * @returns Initial message string or undefined
 */
const generateInitialMessage = (context: ChatbotContext | undefined): string | undefined => {
    if (!context) return undefined;

    if (context.context === 'provide-requirements') {
        return `I need help providing missing requirements for the application "${context.appName}". Can you help me understand what information is needed?`;
    }

    return `I have a question about the application "${context.appName}".`;
};

/**
 * Formats context type for display
 * @param contextType - Raw context type string
 * @returns Formatted display string
 */
const formatContextType = (contextType: string): string => {
    return contextType
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

// ============================================================================
// Main Component
// ============================================================================

export default function ChatbotPage() {
    const router = useRouter();
    const [chatContext, setChatContext] = useState<ChatbotContext | undefined>(undefined);
    const [initialMessage, setInitialMessage] = useState<string | undefined>(undefined);

    /**
     * Extracts context from URL when router is ready
     */
    useEffect(() => {
        if (!router.isReady) return;

        const context = extractContextFromQuery(router.query);
        setChatContext(context);

        const message = generateInitialMessage(context);
        setInitialMessage(message);
    }, [router.isReady, router.query]);

    /**
     * Renders the context banner if context is available
     */
    const renderContextBanner = (): React.ReactNode | null => {
        if (!chatContext) return null;

        return (
            <ContextBanner>
                <ContextIcon>📋</ContextIcon>
                <ContextContent>
                    <ContextLabel>Application Context</ContextLabel>
                    <ContextValue>{chatContext.appName}</ContextValue>
                    {chatContext.context && (
                        <ContextValue style={{ fontSize: '0.85rem', marginTop: '4px', opacity: 0.8 }}>
                            {formatContextType(chatContext.context)}
                        </ContextValue>
                    )}
                </ContextContent>
            </ContextBanner>
        );
    };

    return (
        <Layout>
            <Head>
                <title>Cloud Migration Assistant - Chatbot</title>
                <meta name="description" content="AI-powered chatbot for cloud migration assistance" />
            </Head>

            <PageContainer>
                <PageHeader>
                    <PageTitle>Cloud Migration Assistant</PageTitle>
                </PageHeader>

                {renderContextBanner()}

                <ChatbotContainer
                    initialContext={chatContext}
                    initialMessage={initialMessage}
                />
            </PageContainer>
        </Layout>
    );
}
