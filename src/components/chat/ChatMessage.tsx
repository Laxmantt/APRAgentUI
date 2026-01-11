import React from 'react';
import styled from 'styled-components';
import { ChatMessage as IChatMessage } from '@/types/chat.types';

const MessageGroup = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  max-width: 85%;
  align-self: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
`;

const BubbleWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  gap: 8px;
  flex-direction: ${({ isUser }) => isUser ? 'row-reverse' : 'row'};
  align-items: flex-end;
`;

const Avatar = styled.div<{ isUser: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, isUser }) => isUser ? theme.colors.primary : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const StyledBubble = styled.div<{ isUser: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 16px;
  border-bottom-${({ isUser }) => isUser ? 'right' : 'left'}-radius: 4px;
  background-color: ${({ theme, isUser }) =>
    isUser ? theme.colors.primary : theme.colors.surface};
  color: ${({ theme, isUser }) =>
    isUser ? 'white' : theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  line-height: 1.5;
  font-size: 0.9rem;
`;

const CitationList = styled.div`
  margin-top: 6px;
  margin-left: 40px;
  font-size: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const CitationChip = styled.span`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2px 8px;
  border-radius: 12px;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
`;

const MetaInfo = styled.div`
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 4px;
    margin-left: 40px;
`;

const AttachmentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const AttachmentChip = styled.div<{ isUser: boolean }>`
  background: ${({ theme, isUser }) => isUser ? 'rgba(255, 255, 255, 0.2)' : theme.colors.background};
  color: ${({ theme, isUser }) => isUser ? 'white' : theme.colors.text};
  border: 1px solid ${({ theme, isUser }) => isUser ? 'rgba(255, 255, 255, 0.3)' : theme.colors.border};
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

interface ChatMessageProps {
  message: IChatMessage;
  children?: React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> & {
  Bubble: React.FC<{ isUser: boolean; content: string; attachments?: IChatMessage['attachments'] }>;
  Citations: React.FC<{ citations?: IChatMessage['citations'] }>;
} = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <MessageGroup isUser={isUser}>
      <BubbleWrapper isUser={isUser}>
        <Avatar isUser={isUser}>{isUser ? '👤' : '🤖'}</Avatar>
        <ChatMessage.Bubble isUser={isUser} content={message.content} attachments={message.attachments} />
      </BubbleWrapper>

      {!isUser && message.citations && (
        <ChatMessage.Citations citations={message.citations} />
      )}

      {message.metadata?.model && (
        <MetaInfo>Model: {message.metadata.model}</MetaInfo>
      )}
    </MessageGroup>
  );
};

ChatMessage.Bubble = ({ isUser, content, attachments }) => (
  <StyledBubble isUser={isUser}>
    {content}
    {attachments && attachments.length > 0 && (
      <AttachmentList>
        {attachments.map((file, idx) => (
          <AttachmentChip key={idx} isUser={isUser}>
            📎 {file.name}
          </AttachmentChip>
        ))}
      </AttachmentList>
    )}
  </StyledBubble>
);

ChatMessage.Citations = ({ citations }) => {
  if (!citations || citations.length === 0) return null;
  return (
    <CitationList>
      {citations.map((cit, idx) => (
        <CitationChip key={idx} title={cit.snippet}>
          📄 {cit.title}
        </CitationChip>
      ))}
    </CitationList>
  );
};
