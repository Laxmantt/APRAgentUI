import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ReportsDashboardContainer } from '@/containers/ReportsDashboardContainer';
import { withAuth } from '@/components/common/withAuth';
import { appConfig } from '@/config/appConfig';

function ReportsPage() {
    return (
        <Layout>
            <Head>
                <title>Reports - {appConfig.appName}</title>
            </Head>
            <ReportsDashboardContainer />
        </Layout>
    );
}

export default withAuth(ReportsPage);
