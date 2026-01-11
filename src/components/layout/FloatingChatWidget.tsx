import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ChatbotContainer } from '@/containers/ChatbotContainer';
import { Card } from '@/components/common/Card';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const WidgetContainer = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
`;

const ChatWindow = styled(Card) <{ isOpen: boolean; isFullScreen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  
  /* Responsive sizing based on mode */
  ${({ isFullScreen }) => isFullScreen ? `
    position: fixed;
    top: 24px;
    left: 24px;
    right: 24px;
    bottom: 24px;
    width: calc(100vw - 48px);
    height: calc(100vh - 48px);
    max-height: none;
    z-index: 1001;
  ` : `
    width: 400px;
    height: 600px;
    max-height: 80vh;
  `}

  box-shadow: ${({ theme }) => theme.shadows.xl};
  overflow: hidden;
  animation: ${slideIn} 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: ${({ theme }) => theme.colors.surface}f2;
  backdrop-filter: blur(24px);
  border: 1px solid ${({ theme }) => theme.colors.primary}40;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: calc(100vw - 32px);
    height: ${({ isFullScreen }) => isFullScreen ? 'calc(100vh - 32px)' : '70vh'};
    right: 16px;
    left: 16px;
    bottom: ${({ isFullScreen }) => isFullScreen ? '16px' : '88px'};
  }
`;

const ChatHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 48px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ToggleButton = styled.button<{ isOpen: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: ${({ theme, isOpen }) => (isOpen ? theme.colors.surface : theme.colors.gradient)};
  color: ${({ theme, isOpen }) => (isOpen ? theme.colors.primary : 'white')};
  border: none;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: ${({ theme, isOpen }) => (isOpen ? `2px solid ${theme.colors.primary}` : 'none')};

  &:hover {
    transform: scale(1.1) rotate(${({ isOpen }) => (isOpen ? '-90deg' : '0deg')});
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(!isFullScreen);
  };

  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsFullScreen(false);
  };

  return (
    <WidgetContainer>
      <ChatWindow isOpen={isOpen} isFullScreen={isFullScreen}>
        <ChatHeader>
          <Title>
            <span>🤖</span> AI Assistant
          </Title>
          <HeaderActions>
            <ActionButton
              onClick={toggleFullScreen}
              title={isFullScreen ? "Collapse" : "Full Screen"}
            >
              {isFullScreen ? '❐' : '⛶'}
            </ActionButton>
            <ActionButton onClick={closeChat} title="Close">
              ✕
            </ActionButton>
          </HeaderActions>
        </ChatHeader>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ChatbotContainer />
        </div>
      </ChatWindow>
      {!isFullScreen && (
        <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} title="AI Assistant">
          {isOpen ? '✕' : '🤖'}
        </ToggleButton>
      )}
    </WidgetContainer>
  );
};
