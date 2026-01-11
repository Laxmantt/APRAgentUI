import api from './ApiClient';
import { ChatRequest, ChatResponse } from '@/types/chat.types';
import { appConfig } from '@/config/appConfig';
import { applications } from '@/mock-services/data/applications';
import { chatPrompts } from '@/mock-services/data/chatPrompts';

const USE_MOCKS = appConfig.api.useMocks;

export const CloudAssistantChatService = {
    sendUserQuery: async (request: ChatRequest): Promise<ChatResponse> => {
        if (USE_MOCKS) {
            await new Promise(resolve => setTimeout(resolve, appConfig.chatbot.responseDelay));

            const query = request.message.toLowerCase();
            const matchingPrompt = chatPrompts.find(p => p.keywords.some(k => query.includes(k)));

            let message = "I've analyzed your portfolio. Most of your apps are ready for a Replatform strategy.";
            let citations = [
                { id: '1', title: 'Modernization Strategy Guide', uri: '/docs/strategy' }
            ];

            if (matchingPrompt) {
                message = matchingPrompt.answer;
                // Add specific citations based on context
                if (matchingPrompt.contextType === 'risk') {
                    citations.push({ id: '2', title: 'Risk Assessment Report', uri: '/reports/risk' });
                } else if (matchingPrompt.contextType === 'application') {
                    citations.push({ id: '3', title: 'Application Inventory', uri: '/applications' });
                } else if (matchingPrompt.contextType === 'wave') {
                    citations.push({ id: '4', title: 'Migration Wave Plan', uri: '/waves' });
                } else if (matchingPrompt.contextType === 'architecture') {
                    citations.push({ id: '5', title: 'Target Architecture Visual', uri: '/architecture' });
                }
            } else {
                // Fallback logic for unmapped queries (keep basic intelligence)
                if (query.includes('risk') || query.includes('high')) {
                    const highRiskApps = applications.filter(a => a.assessment?.risk?.total > 70);
                    message = `I found ${highRiskApps.length} high-risk applications, including ${highRiskApps[0]?.name}. I recommend prioritizing these for the first migration wave.`;
                    citations.push({ id: '2', title: 'Risk Assessment Report', uri: '/reports' });
                } else if (query.includes('inventory') || query.includes('how many')) {
                    message = `Your current inventory contains ${applications.length} applications across various business units.`;
                } else if (query.includes('complexity')) {
                    const complexApps = applications.filter(a => a.complexity === 'High');
                    message = `You have ${complexApps.length} high-complexity applications. These might require a 'Refactor' or 'Re-architect' strategy rather than a simple 'Rehost'.`;
                }
            }

            return {
                message,
                responseId: Math.random().toString(36).substr(2, 9),
                citations,
                metadata: {
                    model: 'gpt-4-migration-specialist',
                    usage: {
                        promptTokens: 150,
                        completionTokens: 80,
                        totalTokens: 230
                    },
                    confidence: 0.95
                }
            };
        }
        return await api.post<ChatResponse>('/chat', request);
    },
};
