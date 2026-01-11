import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-top: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const FooterContainer = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TopLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Copyright = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 500;
`;

const DisclaimerLine = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.data.label};
  line-height: 1.4;
  opacity: 0.7;
  margin: 0;
`;

export const GlobalFooter: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <TopLine>
          <Copyright>
            &copy; {new Date().getFullYear()} APRAgent Enterprise
          </Copyright>
        </TopLine>
        <DisclaimerLine>
          Disclaimer: Recommendations are AI-generated based on available data. Final decisions should be reviewed by qualified cloud architects. For rationalization assessment purposes only.
        </DisclaimerLine>
      </FooterContainer>
    </FooterWrapper>
  );
};
