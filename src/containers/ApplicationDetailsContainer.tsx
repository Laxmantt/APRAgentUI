import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Accordion, Button, Card, PageHeader } from '@/components/common';
import {
  AssessmentWorkflow,
  ComplianceCostPanel,
  DataGravityIndicator,
  DependencyChain,
  GenAIProfileCard,
  IntegrationRisksPanel,
  RationalizationConfidencePanel
} from '@/components/assessment';
import { ApplicationService } from '@/services';
import { ApplicationData } from '@/types/application.types';

// ============================================================================
// Styled Components
// ============================================================================

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const DetailCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.surface}, ${({ theme }) => theme.colors.background});
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-1px);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  border-left: 2px solid ${({ theme }) => theme.colors.primary};
  transition: all 0.2s ease;

  &:hover {
    border-left-color: ${({ theme }) => theme.colors.secondary};
    transform: translateX(4px);
  }
`;

const Label = styled.div`
  font-weight: 600;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Value = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const DependenciesList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};
  list-style-type: none;

  li {
    position: relative;
    padding: ${({ theme }) => theme.spacing.xs} 0;
    color: ${({ theme }) => theme.colors.text};

    &:before {
      content: '→';
      position: absolute;
      left: -${({ theme }) => theme.spacing.lg};
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
    }
  }
`;

const AccordionSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ErrorText = styled.div`
  font-size: ${({ theme }) => theme.typography.data.value};
  color: ${({ theme }) => theme.colors.error};
`;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Formats application complexity for display
 * @param complexity - Raw complexity value
 * @returns Formatted complexity string
 */
const formatComplexity = (complexity: string): string => {
  return complexity.charAt(0).toUpperCase() + complexity.slice(1);
};

/**
 * Renders application information section
 * @param app - Application data
 * @returns React node with application info
 */
const renderApplicationInfo = (app: ApplicationData): React.ReactNode => {
  return (
    <DetailCard>
      <InfoGrid>
        <InfoItem>
          <Label>Status</Label>
          <Value>{app.status}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Type</Label>
          <Value>{app.type}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Complexity</Label>
          <Value>{formatComplexity(app.complexity)}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Version</Label>
          <Value>{app.version}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Business Complexity</Label>
          <Value>{app.businessComplexity}</Value>
        </InfoItem>
        <InfoItem>
          <Label>NFR Complexity</Label>
          <Value>{app.nfrComplexity}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Regulatory Compliance</Label>
          <Value>{app.regulatoryCompliance}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Dependencies</Label>
          <Value>
            {app.dependencies.length > 0 ? (
              <DependenciesList>
                {app.dependencies.map((dep, index) => (
                  <li key={index}>{dep}</li>
                ))}
              </DependenciesList>
            ) : (
              'None'
            )}
          </Value>
        </InfoItem>
      </InfoGrid>
    </DetailCard>
  );
};

// ============================================================================
// Main Component
// ============================================================================

export const ApplicationDetailsContainer: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [app, setApp] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mutually exclusive accordion state
  const [activeSection, setActiveSection] = useState<string | null>('profile');

  const handleToggle = (section: string) => {
    setActiveSection(prev => prev === section ? null : section);
  };

  /**
   * Fetches application data when component mounts or ID changes
   */
  useEffect(() => {
    if (!id) return;

    const fetchApp = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        const found = await ApplicationService.getApplicationById(id as string);

        if (!found) {
          setError('Application not found');
          setApp(null);
        } else {
          setApp(found);
        }
      } catch (err) {
        console.error('Error fetching application:', err);
        setError('Failed to load application data');
        setApp(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApp();
  }, [id]);

  /**
   * Handles navigation back to application list
   */
  const handleBackClick = (): void => {
    router.back();
  };

  /**
   * Handles application update from assessment workflow
   * @param updatedApp - Updated application data
   */
  const handleAppUpdate = (updatedApp: ApplicationData): void => {
    setApp(updatedApp);
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div>⏳ Loading application details...</div>
        </LoadingContainer>
      </Container>
    );
  }

  // Error state
  if (error || !app) {
    return (
      <Container>
        <ErrorContainer>
          <ErrorText>{error || 'Application not found'}</ErrorText>
          <Button variant="outline" onClick={handleBackClick}>
            ← Back to List
          </Button>
        </ErrorContainer>
      </Container>
    );
  }

  // Main render
  return (
    <Container>
      <PageHeader
        title={`${app.name} Granular Details`}
        subtitle="Manage detailed application configurations, dependencies, and risk assessments."
        actions={
          <Button variant="secondary" onClick={() => router.push('/')}>
            Back to Dashboard
          </Button>
        }
      />

      <AccordionSection>
        {/* Section 1: Intelligent App Profile */}
        {app.genAIProfile && (
          <Accordion
            title="Intelligent App Profile"
            icon="🧠"
            isExpanded={activeSection === 'profile'}
            onToggle={() => handleToggle('profile')}
            defaultExpanded={true}
          >
            <GenAIProfileCard profile={app.genAIProfile} />
          </Accordion>
        )}

        {/* Section 2: Modernization Advisory */}
        {app.assessment?.advisory && app.assessment.strategy && (
          <Accordion
            title="Modernization Advisory"
            icon="🤖"
            isExpanded={activeSection === 'advisory'}
            onToggle={() => handleToggle('advisory')}
          >
            <RationalizationConfidencePanel
              advisory={app.assessment.advisory}
              strategy={app.assessment.strategy}
            />
          </Accordion>
        )}

        {/* Section 3: Compliance & Cost (NEW) */}
        <Accordion
          title="Compliance & Financial Analysis"
          icon="⚖️"
          isExpanded={activeSection === 'compliance'}
          onToggle={() => handleToggle('compliance')}
        >
          <ComplianceCostPanel app={app} />
        </Accordion>

        {/* Section 4: Application Information */}
        <Accordion
          title="Application Information"
          icon="📋"
          isExpanded={activeSection === 'info'}
          onToggle={() => handleToggle('info')}
        >
          {renderApplicationInfo(app)}
        </Accordion>

        {/* Section 5: Assessment Workflow */}
        <Accordion
          title="Assessment Workflow"
          icon="🔍"
          isExpanded={activeSection === 'workflow'}
          onToggle={() => handleToggle('workflow')}
        >
          <AssessmentWorkflow
            app={app}
            appName={app.name}
            onUpdate={handleAppUpdate}
          />
        </Accordion>

        {/* Section 6: Integration Risks (NEW) */}
        {app.links && app.links.length > 0 && (
          <Accordion
            title="Integration & Migration Risks"
            icon="⚠️"
            isExpanded={activeSection === 'risks'}
            onToggle={() => handleToggle('risks')}
          >
            <IntegrationRisksPanel links={app.links} />
          </Accordion>
        )}

        {/* Section 7: Dependency Network */}
        {app.links && app.links.length > 0 && (
          <Accordion
            title="Dependency Network Mapping"
            icon="🔗"
            isExpanded={activeSection === 'deps'}
            onToggle={() => handleToggle('deps')}
          >
            <DependencyChain links={app.links} />
          </Accordion>
        )}

        {app.dataGravity && (
          <Accordion
            title="Data Gravity & Migration Drag"
            icon="⚖️"
            isExpanded={activeSection === 'gravity'}
            onToggle={() => handleToggle('gravity')}
          >
            <DataGravityIndicator gravity={app.dataGravity} />
          </Accordion>
        )}
      </AccordionSection>
    </Container>
  );
};
