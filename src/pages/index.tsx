import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { appConfig } from '@/config/appConfig';
import { CommandCenterContainer } from '@/containers/CommandCenterContainer';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{appConfig.appName}</title>
        <meta name="description" content="AI-powered application portfolio assessment" />
      </Head>
      <CommandCenterContainer />
    </Layout>
  );
}
