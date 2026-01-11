import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { ApplicationData } from '@/types/application.types';

const StyledAppCard = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AppName = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  color: ${({ theme }) => theme.colors.primary};
`;

const Version = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  background: ${({ theme }) => theme.colors.background};
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.data.label};
  font-weight: 600;
  background-color: ${({ theme, status }) =>
    status === 'Completed' ? theme.colors.success + '20' :
      status === 'In Progress' ? theme.colors.primary + '20' :
        theme.colors.textSecondary + '20'};
  color: ${({ theme, status }) =>
    status === 'Completed' ? theme.colors.success :
      status === 'In Progress' ? theme.colors.primary :
        theme.colors.textSecondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Attribute = styled.div`
  display: grid;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Value = styled.span`
  font-size: ${({ theme }) => theme.typography.data.value};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const Tag = styled.span`
  font-size: ${({ theme }) => theme.typography.data.label};
  background: ${({ theme }) => theme.colors.secondary + '15'};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 2px 6px;
  border-radius: 4px;
`;

interface AppCardProps {
  app: ApplicationData;
  onViewDetails: (id: string) => void;
}

export const ApplicationCard: React.FC<AppCardProps> = ({ app, onViewDetails }) => {
  return (
    <StyledAppCard>
      <Header>
        <div>
          <AppName>
            {app.name}
            <Version>{app.version}</Version>
          </AppName>
        </div>
        <StatusBadge status={app.status}>{app.status}</StatusBadge>
      </Header>

      <Grid>
        <Attribute>
          <Label>Type</Label>
          <Value>{app.type}</Value>
        </Attribute>
        <Attribute>
          <Label>Business Complexity</Label>
          <Value>{app.businessComplexity}</Value>
        </Attribute>
        <Attribute>
          <Label>NFR Complexity</Label>
          <Value>{app.nfrComplexity}</Value>
        </Attribute>
        <Attribute>
          <Label>Compliance</Label>
          <Value>{app.regulatoryCompliance}</Value>
        </Attribute>
      </Grid>

      <Attribute>
        <Label>Data Sources</Label>
        <Value>{app.dataSources.join(', ')}</Value>
      </Attribute>

      <Attribute>
        <Label>Dependencies</Label>
        <TagContainer>
          {app.dependencies.map(dep => <Tag key={dep}>{dep}</Tag>)}
        </TagContainer>
      </Attribute>

      <Button size="sm" variant="outline" onClick={() => onViewDetails(app.id)}>
        View Details
      </Button>
    </StyledAppCard>
  );
};
