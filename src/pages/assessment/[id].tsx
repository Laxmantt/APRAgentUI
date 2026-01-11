import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ApplicationDetailsContainer } from '@/containers/ApplicationDetailsContainer';

export default function AssessmentDetailsPage() {
    return (
        <Layout>
            <Head>
                <title>Application Details</title>
            </Head>
            <ApplicationDetailsContainer />
        </Layout>
    );
}
