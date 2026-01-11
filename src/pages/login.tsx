import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { appConfig } from '@/config/appConfig';
import { useUserAuthentication } from '@/hooks/useUserAuthentication';
import { useState } from 'react';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding-top: ${({ theme }) => theme.spacing.xl};
`;

const LoginCard = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export default function LoginPage() {
    const router = useRouter();
    const { login } = useUserAuthentication();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            setError('');
            await login(email, password);
            router.push('/');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <Layout>
            <Head>
                <title>Login - {appConfig.appName}</title>
            </Head>
            <LoginContainer>
                <LoginCard>
                    <Title>Welcome Back</Title>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
                    <Button onClick={handleLogin}>Log In</Button>
                </LoginCard>
            </LoginContainer>
        </Layout>
    );
}
