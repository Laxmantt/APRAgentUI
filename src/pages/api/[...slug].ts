import type { NextApiRequest, NextApiResponse } from 'next';
import { appConfig } from '@/config/appConfig';

/**
 * Catch-all API handler.
 * Since we are primarily using Client-Side Mocking (MSW) or an external Backend,
 * there are no actual Next.js API routes for business logic.
 * 
 * This handler catches requests to /api/* that fall through to the server
 * and returns a helpful message instead of a 404 HTML page.
 */
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    res.status(404).json({
        error: 'API Endpoint Not Found on Next.js Server',
        message: 'You are likely seeing this because:',
        reasons: [
            'You are trying to access a Mock API endpoint directly in the browser (Mocks are Client-Side only).',
            'The external backend URL is not configured correctly for Server-Side requests.',
            'This route does not exist.'
        ],
        config: {
            useMocks: appConfig.api.useMocks,
            backendUrl: appConfig.api.baseUrl
        }
    });
}
