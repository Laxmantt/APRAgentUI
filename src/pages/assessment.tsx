import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ApplicationListContainer } from '@/containers/ApplicationListContainer';
import { withAuth } from '@/components/common/withAuth';
import { appConfig } from '@/config/appConfig';

function AssessmentPage() {
    return (
        <Layout>
            <Head>
                <title>Assessments - {appConfig.appName}</title>
            </Head>
            <ApplicationListContainer />
        </Layout>
    );
}

export default withAuth(AssessmentPage);
