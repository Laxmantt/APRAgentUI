import React from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { GenAIProfile } from '@/types/application.types';

const ProfileContainer = styled(Card)`
  padding: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}15, ${({ theme }) => theme.colors.secondary}15);
  padding: ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  color: ${({ theme }) => theme.colors.text};
`;

const AIChip = styled.span`
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const ConfidenceBadge = styled.div<{ score: number }>`
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme, score }) =>
    score > 80 ? theme.colors.success :
      score > 60 ? theme.colors.warning :
        theme.colors.error};
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 600;
`;

const TextBlock = styled.p`
  margin: 0;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const VitalsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const VitalItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
`;

const VitalValue = styled.div<{ value?: number; risk?: string }>`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  font-weight: 700;
  color: ${({ theme, value, risk }) => {
    if (risk) {
      if (risk === 'Critical' || risk === 'High') return theme.colors.error;
      if (risk === 'Medium') return theme.colors.warning;
      return theme.colors.success;
    }
    if (value !== undefined) {
      if (value < 50) return theme.colors.error;
      if (value < 80) return theme.colors.warning;
      return theme.colors.success;
    }
    return theme.colors.text;
  }};
`;

const HelperText = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface GenAIProfileCardProps {
  profile: GenAIProfile;
}

export const GenAIProfileCard: React.FC<GenAIProfileCardProps> = ({ profile }) => {
  return (
    <ProfileContainer>
      <Header>
        <Title>
          <AIChip>GEN-AI</AIChip>
          Intelligent App Profile
        </Title>
        <ConfidenceBadge score={profile.confidence}>
          {profile.confidence}% Confidence
        </ConfidenceBadge>
      </Header>

      <Content>
        <Section>
          <Label>Business Purpose</Label>
          <TextBlock>{profile.businessPurpose}</TextBlock>
        </Section>

        <Section>
          <Label>User Base & Context</Label>
          <TextBlock>{profile.userBase}</TextBlock>
        </Section>

        <VitalsGrid>
          <VitalItem>
            <VitalValue value={profile.technicalHealth}>{profile.technicalHealth}%</VitalValue>
            <HelperText>Technical Health</HelperText>
          </VitalItem>
          <VitalItem>
            <VitalValue risk={profile.obsolescenceRisk}>{profile.obsolescenceRisk}</VitalValue>
            <HelperText>Obsolescence Risk</HelperText>
          </VitalItem>
          <VitalItem>
            <VitalValue value={profile.cloudReadiness}>{profile.cloudReadiness}%</VitalValue>
            <HelperText>Cloud Readiness</HelperText>
          </VitalItem>
        </VitalsGrid>
      </Content>
    </ProfileContainer>
  );
};
