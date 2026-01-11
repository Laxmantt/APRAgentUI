import React, { useState } from 'react';
import styled from 'styled-components';
import { ApplicationData } from '@/types/application.types';
import { MigrationStrategy } from '@/types/assessment.types';
import { AssessmentStrategyService } from '@/services/AssessmentStrategyService';
import { RiskScorePanel } from '@/components/assessment/RiskScorePanel';
import { RPathSelector } from '@/components/assessment/RPathSelector';
import { WavePlanAssignment } from '@/components/assessment/WavePlanAssignment';
import { DataAvailabilityMatrix } from '@/components/assessment/DataAvailabilityMatrix';
import { Button } from '@/components/common/Button';

const WorkflowContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ActionBar = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: flex-end;
`;

const LoadingOverlay = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface AssessmentWorkflowProps {
    app: ApplicationData;
    /** Application name for chatbot context */
    appName?: string;
    onUpdate?: (app: ApplicationData) => void;
}

export const AssessmentWorkflow: React.FC<AssessmentWorkflowProps> = ({ app, appName, onUpdate }) => {
    const [localApp, setLocalApp] = useState<ApplicationData>(app);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleStartAssessment = async () => {
        setIsAnalyzing(true);
        try {
            const result = await AssessmentStrategyService.analyzeApplication(localApp);

            const updatedApp: ApplicationData = {
                ...localApp,
                assessment: {
                    dataAvailability: result.dataAvailability,
                    risk: {
                        total: result.risk.total,
                        breakdown: result.risk.breakdown,
                        status: 'derived',
                        reasoning: result.risk.reasoning
                    },
                    strategy: {
                        value: result.strategy.value,
                        status: 'derived',
                        reasoning: result.strategy.reasoning
                    },
                    wave: {
                        value: result.wave.value,
                        status: 'derived',
                        reasoning: result.wave.reasoning
                    }
                }
            };

            setLocalApp(updatedApp);
            onUpdate?.(updatedApp);
        } catch (error) {
            console.error('Assessment failed:', error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleRPathChange = (newPath: MigrationStrategy) => {
        if (!localApp.assessment?.strategy) return;

        const updatedApp: ApplicationData = {
            ...localApp,
            assessment: {
                ...localApp.assessment,
                strategy: {
                    ...localApp.assessment.strategy,
                    value: newPath,
                    status: 'reviewed'
                }
            }
        };

        setLocalApp(updatedApp);
        onUpdate?.(updatedApp);
    };

    const handleWaveChange = (newWave: number) => {
        if (!localApp.assessment?.wave) return;

        const updatedApp: ApplicationData = {
            ...localApp,
            assessment: {
                ...localApp.assessment,
                wave: {
                    ...localApp.assessment.wave,
                    value: newWave,
                    status: 'reviewed'
                }
            }
        };

        setLocalApp(updatedApp);
        onUpdate?.(updatedApp);
    };

    const handleApprove = async () => {
        if (!localApp.assessment) return;

        const updatedApp: ApplicationData = {
            ...localApp,
            assessment: {
                risk: localApp.assessment.risk ? {
                    ...localApp.assessment.risk,
                    status: 'approved'
                } : undefined,
                strategy: localApp.assessment.strategy ? {
                    ...localApp.assessment.strategy,
                    status: 'approved'
                } : undefined,
                wave: localApp.assessment.wave ? {
                    ...localApp.assessment.wave,
                    status: 'approved'
                } : undefined
            }
        };

        await AssessmentStrategyService.approveAssessment(localApp.id);
        setLocalApp(updatedApp);
        onUpdate?.(updatedApp);
    };

    const handleLock = async () => {
        if (!localApp.assessment || localApp.assessment.risk?.status !== 'approved') return;

        const updatedApp: ApplicationData = {
            ...localApp,
            status: 'Locked'
        };

        setLocalApp(updatedApp);
        onUpdate?.(updatedApp);
    };

    const isApproved = localApp.assessment?.risk?.status === 'approved';
    const isLocked = localApp.assessment?.risk?.status === 'approved' && localApp.status === 'Locked';
    const hasAssessment = !!localApp.assessment;

    if (isAnalyzing) {
        return (
            <LoadingOverlay>
                <h3>🤖 Analyzing Application with AI...</h3>
                <p>Querying knowledge base and generating recommendations...</p>
            </LoadingOverlay>
        );
    }

    if (!hasAssessment) {
        return (
            <WorkflowContainer>
                <Button onClick={handleStartAssessment}>
                    🚀 Start AI-Powered Assessment
                </Button>
            </WorkflowContainer>
        );
    }

    return (
        <WorkflowContainer>
            {localApp.assessment?.dataAvailability && (
                <DataAvailabilityMatrix dataPoints={localApp.assessment.dataAvailability} />
            )}

            {localApp.assessment?.risk && (
                <RiskScorePanel
                    total={localApp.assessment.risk.total}
                    breakdown={localApp.assessment.risk.breakdown}
                    status={localApp.assessment.risk.status}
                    reasoning={localApp.assessment.risk.reasoning}
                    appName={appName}
                />
            )}

            {localApp.assessment?.strategy && (
                <RPathSelector
                    value={localApp.assessment.strategy.value}
                    status={localApp.assessment.strategy.status}
                    reasoning={localApp.assessment.strategy.reasoning}
                    onSelect={handleRPathChange}
                />
            )}

            {localApp.assessment?.wave && (
                <WavePlanAssignment
                    value={localApp.assessment.wave.value}
                    status={localApp.assessment.wave.status}
                    reasoning={localApp.assessment.wave.reasoning}
                    dependencies={localApp.dependencies}
                    onSelect={handleWaveChange}
                />
            )}

            <ActionBar>
                {!isApproved && (
                    <>
                        <Button variant="outline" onClick={handleStartAssessment}>
                            🔄 Re-analyze
                        </Button>
                        <Button onClick={handleApprove}>
                            ✓ Approve App Assessment
                        </Button>
                    </>
                )}
                {isApproved && !isLocked && (
                    <>
                        <div style={{ color: '#10b981', fontWeight: 600, marginRight: 'auto' }}>
                            ✓ Assessment Approved
                        </div>
                        <Button onClick={handleLock}>
                            🔒 Lock App Assessment
                        </Button>
                    </>
                )}
                {isLocked && (
                    <div style={{ color: '#10b981', fontWeight: 600 }}>
                        ✓ Assessment Approved & Locked
                    </div>
                )}
            </ActionBar>
        </WorkflowContainer>
    );
};
