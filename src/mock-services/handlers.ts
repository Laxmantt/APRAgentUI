import { http, HttpResponse } from 'msw';
import { appConfig } from '@/config/appConfig';
import { applications } from './data/applications';
import { waves } from './data/waves';
import { dashboardData } from './data/dashboard';
import { reports } from './data/reports';
import { assessments } from './data/assessments';

const baseUrl = appConfig.api.baseUrl;

export const handlers = [
    // Health Check
    http.get(`${baseUrl}/health`, () => {
        return HttpResponse.json({ status: 'ok' });
    }),

    // Applications
    http.get(`${baseUrl}/applications`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                applications,
                total: applications.length
            }
        });
    }),

    http.get(`${baseUrl}/applications/:id`, ({ params }) => {
        const { id } = params;
        const app = applications.find(a => a.id === id);
        if (!app) {
            return new HttpResponse(null, { status: 404, statusText: 'Application not found' });
        }
        return HttpResponse.json({ success: true, data: app });
    }),

    http.post(`${baseUrl}/applications/upload`, async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return HttpResponse.json({
            success: true,
            data: {
                count: 10,
                success: true
            }
        });
    }),

    http.get(`${baseUrl}/search`, ({ request }) => {
        const url = new URL(request.url);
        const query = url.searchParams.get('q')?.toLowerCase() || '';

        const results = applications.filter(app =>
            app.name.toLowerCase().includes(query) ||
            app.status.toLowerCase().includes(query)
        );
        return HttpResponse.json({ success: true, data: results });
    }),

    // Waves
    http.get(`${baseUrl}/waves`, () => {
        return HttpResponse.json({ success: true, data: waves });
    }),

    http.get(`${baseUrl}/waves/groups`, () => {
        const waveGroups = [1, 2, 3, 4, 5].map(waveNum => {
            const waveApps = applications.filter(a => a.assessment?.wave?.value === waveNum);
            const totalApps = waveApps.length;
            const avgRisk = totalApps > 0
                ? Math.round(waveApps.reduce((acc, val) => acc + (val.assessment?.risk?.total || 0), 0) / totalApps)
                : 0;

            return {
                waveNumber: waveNum,
                applications: waveApps,
                totalApps,
                avgRiskScore: avgRisk,
                criticalApps: waveApps.filter(a => (a.assessment?.risk?.total || 0) >= 75).length,
                readyApps: waveApps.filter(a => a.assessment?.risk?.status === 'approved').length,
                blockedApps: waveApps.filter(a => (a.dependencies || []).length > 0).length
            };
        });
        return HttpResponse.json({
            success: true,
            data: {
                groups: waveGroups
            }
        });
    }),

    http.get(`${baseUrl}/waves/:id`, ({ params }) => {
        const { id } = params;
        const wave = waves.find(w => w.id === Number(id));
        if (!wave) return new HttpResponse(null, { status: 404 });
        return HttpResponse.json({ success: true, data: wave });
    }),

    http.post(`${baseUrl}/waves`, async ({ request }) => {
        const body = await request.json() as any;
        return HttpResponse.json({
            ...body,
            id: Math.floor(Math.random() * 1000) + 10,
            status: 'Draft',
            risks: [],
            dependencies: []
        });
    }),

    http.put(`${baseUrl}/waves/:id`, async ({ request, params }) => {
        const body = await request.json() as any;
        const { id } = params;
        return HttpResponse.json({ ...body, id: Number(id) });
    }),

    http.delete(`${baseUrl}/waves/:id`, () => {
        return HttpResponse.json({ success: true });
    }),

    http.get(`${baseUrl}/waves/:id/risks`, ({ params }) => {
        const { id } = params;
        const wave = waves.find(w => w.id === Number(id));
        return HttpResponse.json({ success: true, data: wave?.risks || [] });
    }),

    // Reports
    http.get(`${baseUrl}/reports`, () => {
        return HttpResponse.json({
            success: true,
            data: { reports }
        });
    }),

    http.post(`${baseUrl}/reports`, async ({ request }) => {
        const body = await request.json() as { type: string, format: string };
        return HttpResponse.json({
            success: true,
            data: {
                id: Math.random().toString(36).substring(7),
                name: `${body.type} Report`,
                generatedDate: new Date().toISOString(),
                type: body.type,
                format: body.format,
                size: '1.2 MB',
                description: `Automatically generated ${body.type} in ${body.format} format.`
            }
        });
    }),

    // Assessments
    http.get(`${baseUrl}/assessments`, () => {
        return HttpResponse.json({
            success: true,
            data: assessments
        });
    }),

    http.get(`${baseUrl}/assessments/:id`, ({ params }) => {
        const { id } = params;
        const assessment = assessments.find(a => a.assessmentId === id);
        if (!assessment) return new HttpResponse(null, { status: 404 });
        return HttpResponse.json({ success: true, data: assessment });
    }),

    // Business Logic
    http.get(`${baseUrl}/stats`, () => {
        return HttpResponse.json({
            success: true,
            data: { stats: dashboardData.stats }
        });
    }),

    http.get(`${baseUrl}/activity`, () => {
        return HttpResponse.json({
            success: true,
            data: { activities: dashboardData.recentActivity }
        });
    }),

    http.post(`${baseUrl}/auth/login`, async ({ request }) => {
        const body = await request.json() as any;
        return HttpResponse.json({
            success: true,
            data: {
                user: {
                    id: '1',
                    name: 'Admin User',
                    email: body.email,
                    role: 'admin'
                },
                token: 'mock-jwt-token'
            }
        });
    }),

    http.get(`${baseUrl}/auth/me`, () => {
        return HttpResponse.json({
            success: true,
            data: {
                id: '1',
                name: 'Admin User',
                email: 'admin@example.com',
                role: 'admin'
            }
        });
    }),
];
