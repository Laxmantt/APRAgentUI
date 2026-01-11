import React from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeaderContainer = styled.div`
  background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%); /* Light blue gradient (Sky 100 -> Sky 200) */
  color: ${({ theme }) => theme.colors.text}; /* Dark text for contrast on light background */
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md}; /* Further reduced padding */
  border-radius: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid #BAE6FD;
  width: 100%;

  /* Abstract Shapes - Adjusted for light theme opacity */
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -20%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.h1.size}; /* Consistent header size */
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.primary}; /* Use primary blue color */
  -webkit-text-fill-color: ${({ theme }) => theme.colors.primary};
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 768px) {
    font-size: 1.25rem; /* Reduced by ~30% from 1.75rem */
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.data.value}; /* Reduced for readability */
  opacity: 0.9;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.4;
  animation: ${fadeIn} 0.8s ease-out;
  color: ${({ theme }) => theme.colors.textSecondary}; /* Darker text for readability */

  @media (min-width: 768px) {
    font-size: 0.8rem; /* Reduced by ~30% from 1.1rem~0.9rem range */
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.sm}; /* Reduced margin */
  animation: ${fadeIn} 1s ease-out;
`;

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <HeaderContainer>
      <ContentWrapper>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {actions && <ActionGroup>{actions}</ActionGroup>}
      </ContentWrapper>
    </HeaderContainer>
  );
};
