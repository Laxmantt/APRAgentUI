import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideOut = keyframes`
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(100%); opacity: 0; }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastItem = styled.div<{ type: 'error' | 'warning' | 'success' | 'info'; isClosing: boolean }>`
  background: ${({ theme, type }) => {
        switch (type) {
            case 'error': return theme.colors.error;
            case 'warning': return '#f59e0b';
            case 'success': return theme.colors.success;
            default: return theme.colors.primary;
        }
    }};
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 300px;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${({ isClosing }) => isClosing ? slideOut : slideIn} 0.3s ease forwards;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2rem;
  opacity: 0.8;
  &:hover { opacity: 1; }
`;

interface Notification {
    id: string;
    message: string;
    type: 'error' | 'warning' | 'success' | 'info';
    isClosing: boolean;
}

export const Toast: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleNotification = (event: CustomEvent<{ message: string; type: Notification['type'] }>) => {
            const id = Math.random().toString(36).substr(2, 9);
            const newNotification: Notification = {
                id,
                message: event.detail.message,
                type: event.detail.type || 'info',
                isClosing: false
            };

            setNotifications(prev => [...prev, newNotification]);

            // Auto dismiss
            setTimeout(() => {
                closeNotification(id);
            }, 5000);
        };

        window.addEventListener('app-notification' as any, handleNotification);
        return () => {
            window.removeEventListener('app-notification' as any, handleNotification);
        };
    }, []);

    const closeNotification = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, isClosing: true } : n));
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 300);
    };

    return (
        <ToastContainer>
            {notifications.map(n => (
                <ToastItem key={n.id} type={n.type} isClosing={n.isClosing}>
                    {n.message}
                    <CloseButton onClick={() => closeNotification(n.id)}>×</CloseButton>
                </ToastItem>
            ))}
        </ToastContainer>
    );
};
