import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { WaveManagementContainer } from '@/containers/WaveManagementContainer';
import { withAuth } from '@/components/common/withAuth';
import { appConfig } from '@/config/appConfig';

function WaveManagementPage() {
    return (
        <Layout>
            <Head>
                <title>Wave Management - {appConfig.appName}</title>
                <meta name="description" content="Manage migration waves and track application dependencies" />
            </Head>
            <WaveManagementContainer />
        </Layout>
    );
}

export default withAuth(WaveManagementPage);
