import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { ApplicationService } from '@/services/ApplicationService';
import { ApplicationData } from '@/types/application.types';

const HeatmapCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeatmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const HeatmapCell = styled.div<{ riskScore: number }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  
  background: ${({ theme, riskScore }) =>
        riskScore > 80 ? `${theme.colors.error}22` :
            riskScore > 60 ? `${theme.colors.error}11` :
                riskScore > 40 ? `${theme.colors.warning}22` :
                    `${theme.colors.success}22`};
    
  border: 1px solid ${({ theme, riskScore }) =>
        riskScore > 80 ? theme.colors.error :
            riskScore > 60 ? `${theme.colors.error}88` :
                riskScore > 40 ? theme.colors.warning :
                    theme.colors.success};

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.md};
    z-index: 1;
  }
`;

const CategoryName = styled.div`
  font-size: ${({ theme }) => theme.typography.data.cell};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const AppCount = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const AvgRisk = styled.div<{ riskScore: number }>`
  font-size: ${({ theme }) => theme.typography.data.largeValue};
  font-weight: 800;
  color: ${({ theme, riskScore }) =>
        riskScore > 70 ? theme.colors.error :
            riskScore > 40 ? theme.colors.warning :
                theme.colors.success};
`;

import { RiskHeatmapItem } from '@/types/dashboard.types';


const ExplanationContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.typography.data.value};
  }
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const DependencyRiskHeatmap: React.FC = () => {
    const [categories, setCategories] = useState<RiskHeatmapItem[]>([]);

    useEffect(() => {
        const processData = async () => {
            const apps = await ApplicationService.getAllApplications();

            // Group by tech stack / datasource / dependency types
            const techRisk: Record<string, { total: number; count: number }> = {};

            apps.forEach(app => {
                const risk = app.assessment?.risk?.total || 0;

                // Strategy: Categorize by data sources or type
                const tags = [...app.dataSources, app.type];
                tags.forEach(tag => {
                    if (!techRisk[tag]) techRisk[tag] = { total: 0, count: 0 };
                    techRisk[tag].total += risk;
                    techRisk[tag].count += 1;
                });
            });

            const formatted = Object.entries(techRisk)
                .map(([name, data]) => ({
                    name,
                    avgRisk: Math.round(data.total / data.count),
                    count: data.count
                }))
                .sort((a, b) => b.avgRisk - a.avgRisk);

            setCategories(formatted);
        };

        processData();
    }, []);

    return (
        <HeatmapCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <HeaderTitle>Systemic Dependency Risk Heatmap</HeaderTitle>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Portfolio Exposure by Tech Stack</span>
            </div>

            <HeatmapGrid>
                {categories.map(cat => (
                    <HeatmapCell key={cat.name} riskScore={cat.avgRisk}>
                        <CategoryName>{cat.name}</CategoryName>
                        <AvgRisk riskScore={cat.avgRisk}>{cat.avgRisk}%</AvgRisk>
                        <AppCount>{cat.count} Applications</AppCount>
                    </HeatmapCell>
                ))}
            </HeatmapGrid>

            <ExplanationContainer>
                <LegendItem>
                    <strong>Understanding the Map</strong>
                    <span>
                        Each percentage represents the <strong>Average Risk Score</strong> (0-100)
                        for all applications using that technology.
                        Higher % = Greater Systemic Risk.
                    </span>
                </LegendItem>
                <LegendItem>
                    <strong>Usefulness</strong>
                    <span>
                        Identifies "Toxic Dependencies"—technologies (like <em>Oracle</em> or <em>Legacy CRM</em>)
                        that consistently drive up risk across the entire portfolio, prioritizing them for modernization.
                    </span>
                </LegendItem>
            </ExplanationContainer>
        </HeatmapCard>
    );
};
