import styled, { css } from 'styled-components';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appConfig } from '@/config/appConfig';
import { useThemeToggle } from '@/pages/_app';
import { Button } from '@/components/common/Button';
import { Toast } from '@/components/common/Toast';
import { GlobalFooter } from './GlobalFooter';

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.surface}cc;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  text-decoration: none;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.gradient};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const LogoText = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.3px;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none; // Basic responsive hiding for now
  }
`;

interface NavLinkProps {
  active?: boolean;
}

const NavLink = styled(Link) <NavLinkProps>`
  text-decoration: none;
  color: ${({ theme, active }) => active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ active }) => active ? '600' : '500'};
  font-size: 0.9rem;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  transition: ${({ theme }) => theme.transitions.default};
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;

  ${({ active, theme }) => active && css`
    background: ${theme.colors.primary}12;
    color: ${theme.colors.primary};
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: ${({ theme }) => theme.spacing.md};
      right: ${({ theme }) => theme.spacing.md};
      height: 2px;
      background: ${theme.colors.primary};
      border-radius: 2px;
      box-shadow: 0 0 8px ${theme.colors.primary}40;
    }
  `}

  &:hover { 
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primary}08;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  width: 100%;
`;

import { FloatingChatWidget } from './FloatingChatWidget';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toggleTheme, mode } = useThemeToggle();
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Assessments', href: '/assessment' },
    { name: 'Waves', href: '/waves' },
    { name: 'Reports', href: '/reports' },
    { name: 'Data Ingestion', href: '/data-ingestion' },
  ];

  return (
    <LayoutWrapper>
      <Toast />
      <HeaderContainer>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <LogoWrapper>
            <LogoIcon>A</LogoIcon>
            <LogoText>APR<span>Agent</span></LogoText>
          </LogoWrapper>
        </Link>

        <NavLinks>
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              active={item.href === '/' ? router.pathname === '/' : router.pathname.startsWith(item.href)}
            >
              {item.name}
            </NavLink>
          ))}
        </NavLinks>

        <ActionWrapper>
          <Button
            size="sm"
            variant="outline"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            style={{ borderRadius: '10px', width: '36px', height: '36px', padding: 0 }}
          >
            {mode === 'light' ? '🌙' : '☀️'}
          </Button>
        </ActionWrapper>
      </HeaderContainer>

      <MainContent>{children}</MainContent>

      <GlobalFooter />
      <FloatingChatWidget />
    </LayoutWrapper>
  );
};
