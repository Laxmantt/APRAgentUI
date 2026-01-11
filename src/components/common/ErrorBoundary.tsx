import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Details = styled.pre`
    background: ${({ theme }) => theme.colors.surface};
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 800px;
    overflow-x: auto;
    margin-bottom: 2rem;
    text-align: left;
`;

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            return (
                <ErrorContainer>
                    <Title>Oops! Something went wrong.</Title>
                    <Message>
                        We encountered an unexpected error. Please try reloading the page.
                    </Message>
                    {this.state.error && (
                        <Details>
                            {this.state.error.toString()}
                        </Details>
                    )}
                    <Button onClick={this.handleReload} variant="primary">
                        Reload Application
                    </Button>
                </ErrorContainer>
            );
        }

        return this.props.children;
    }
}
