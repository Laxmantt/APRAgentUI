import React from 'react';
import styled from 'styled-components';
import { DependencyNode } from '@/types/application.types';

const ChainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Tier = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TierTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const NodeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const NodeCard = styled.div<{ health: number; strength: 'hard' | 'soft' }>`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  border-left: 4px solid ${({ theme, health }) =>
    health < 50 ? theme.colors.error :
      health < 80 ? theme.colors.warning :
        theme.colors.success};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: transform 0.2s ease;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  ${({ strength, theme }) => strength === 'hard' && `
    border: 2px solid ${theme.colors.primary}40;
    &::after {
      content: 'HARD LINK';
      position: absolute;
      top: -10px;
      right: 10px;
      background: ${theme.colors.primary};
      color: white;
      font-size: 0.6rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
    }
  `}
`;

const NodeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const NodeName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const NodeType = styled.span`
  font-size: 0.7rem;
  padding: 2px 6px;
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  text-transform: capitalize;
`;

const NodeHealth = styled.div<{ health: number }>`
  height: 4px;
  width: 100%;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  margin-top: ${({ theme }) => theme.spacing.sm};
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${({ health }) => health}%;
    background: ${({ theme, health }) =>
    health < 50 ? theme.colors.error :
      health < 80 ? theme.colors.warning :
        theme.colors.success};
  }
`;

const HealthLabel = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 2px;
  text-align: right;
`;

interface DependencyChainProps {
  links: DependencyNode[];
}

export const DependencyChain: React.FC<DependencyChainProps> = ({ links }) => {
  const upstream = links.filter(l => l.direction === 'upstream');
  const downstream = links.filter(l => l.direction === 'downstream');

  const renderNode = (node: DependencyNode) => (
    <NodeCard key={node.id} health={node.health} strength={node.strength}>
      <NodeHeader>
        <NodeName>{node.name}</NodeName>
        <NodeType>{node.type}</NodeType>
      </NodeHeader>
      {node.description && (
        <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{node.description}</div>
      )}
      <NodeHealth health={node.health} />
      <HealthLabel>Health: {node.health}%</HealthLabel>
    </NodeCard>
  );

  return (
    <ChainContainer>
      {upstream.length > 0 && (
        <Tier>
          <TierTitle>Upstream Dependencies (Providers)</TierTitle>
          <NodeGrid>{upstream.map(renderNode)}</NodeGrid>
        </Tier>
      )}

      {downstream.length > 0 && (
        <Tier>
          <TierTitle>Downstream Consumers (Subscribers)</TierTitle>
          <NodeGrid>{downstream.map(renderNode)}</NodeGrid>
        </Tier>
      )}

      {links.length === 0 && (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '20px', fontSize: '0.75rem' }}>
          No complex dependencies identified for this application.
        </div>
      )}
    </ChainContainer>
  );
};
