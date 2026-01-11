import styled from 'styled-components';
import { Card } from '@/components/common/Card';
import { ActivityLog } from '@/types/dashboard';
import { formatDate } from '@/utils/formatUtils';

const ListContainer = styled(Card)`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }
`;

const Action = styled.div`
  font-weight: 500;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const Target = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.typography.data.value};
`;

const Time = styled.div`
  font-size: ${({ theme }) => theme.typography.data.label};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface ActivityListProps {
  activities: ActivityLog[];
}

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
  return (
    <ListContainer>
      {activities.length === 0 ? (
        <p>No recent activity.</p>
      ) : (
        activities.map(log => (
          <ActivityItem key={log.id}>
            <div>
              <Action>{log.user} {log.action} <Target>{log.target}</Target></Action>
            </div>
            <Time>{formatDate(log.timestamp)}</Time>
          </ActivityItem>
        ))
      )}
    </ListContainer>
  );
};
