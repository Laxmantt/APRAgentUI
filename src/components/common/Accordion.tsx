import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// ============================================================================
// Type Definitions
// ============================================================================

export interface AccordionProps {
    /** Title displayed in the accordion header */
    title: string;
    /** Content to be shown/hidden */
    children: React.ReactNode;
    /** Whether the accordion is initially expanded */
    defaultExpanded?: boolean;
    /** Controlled expanded state */
    isExpanded?: boolean;
    /** Callback when accordion state changes */
    onToggle?: (isExpanded: boolean) => void;
    /** Optional icon to display before title */
    icon?: React.ReactNode;
    /** Optional className for custom styling */
    className?: string;
}

// ============================================================================
// Styled Components
// ============================================================================

const AccordionContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
`;

const AccordionHeader = styled.button<{ isExpanded: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, isExpanded }) =>
        isExpanded
            ? `linear-gradient(135deg, ${theme.colors.primary}08, ${theme.colors.secondary}08)`
            : theme.colors.surface};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;

  &:hover {
    background: ${({ theme }) =>
        `linear-gradient(135deg, ${theme.colors.primary}12, ${theme.colors.secondary}12)`};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }

  &:active {
    transform: scale(0.99);
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex: 1;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.data.largeValue};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.headers.panel};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

const ChevronIcon = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: transform 0.3s ease;
  transform: ${({ isExpanded }) => (isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
  font-size: ${({ theme }) => theme.typography.data.largeValue};
`;

const AccordionContent = styled.div<{ isExpanded: boolean; contentHeight: number }>`
  max-height: ${({ isExpanded, contentHeight }) => (isExpanded ? `${contentHeight}px` : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;

const ContentInner = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Determines if the accordion should be controlled or uncontrolled
 * @param isExpanded - Controlled expanded state
 * @returns true if controlled, false if uncontrolled
 */
const isControlled = (isExpanded: boolean | undefined): isExpanded is boolean => {
    return isExpanded !== undefined;
};

/**
 * Handles keyboard events for accessibility
 * @param event - Keyboard event
 * @param onToggle - Toggle callback function
 */
const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    onToggle: () => void
): void => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onToggle();
    }
};

/**
 * Calculates the content height for smooth animations
 * @param contentRef - Reference to content element
 * @returns Height in pixels
 */
const calculateContentHeight = (contentRef: React.RefObject<HTMLDivElement | null>): number => {
    if (!contentRef.current) return 0;
    return contentRef.current.scrollHeight;
};

// ============================================================================
// Main Component
// ============================================================================

export const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    defaultExpanded = false,
    isExpanded: controlledExpanded,
    onToggle,
    icon,
    className,
}) => {
    // State management
    const [internalExpanded, setInternalExpanded] = useState<boolean>(defaultExpanded);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number>(0);

    // Determine if component is controlled
    const controlled = isControlled(controlledExpanded);
    const expanded = controlled ? controlledExpanded : internalExpanded;

    /**
     * Updates content height when expanded state or children change
     */
    useEffect(() => {
        const height = calculateContentHeight(contentRef);
        setContentHeight(height);
    }, [expanded, children]);

    /**
     * Handles window resize to recalculate content height
     */
    useEffect(() => {
        const handleResize = (): void => {
            const height = calculateContentHeight(contentRef);
            setContentHeight(height);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Toggles accordion expanded state
     */
    const handleToggle = (): void => {
        const newExpandedState = !expanded;

        if (!controlled) {
            setInternalExpanded(newExpandedState);
        }

        onToggle?.(newExpandedState);
    };

    /**
     * Renders the chevron icon
     */
    const renderChevron = (): React.ReactNode => {
        return (
            <ChevronIcon isExpanded={expanded} aria-hidden="true">
                ▼
            </ChevronIcon>
        );
    };

    /**
     * Renders the optional icon
     */
    const renderIcon = (): React.ReactNode | null => {
        if (!icon) return null;
        return <IconWrapper>{icon}</IconWrapper>;
    };

    return (
        <AccordionContainer className={className}>
            <AccordionHeader
                isExpanded={expanded}
                onClick={handleToggle}
                onKeyDown={(e) => handleKeyDown(e, handleToggle)}
                aria-expanded={expanded}
                aria-controls="accordion-content"
                type="button"
            >
                <HeaderContent>
                    {renderIcon()}
                    <Title>{title}</Title>
                </HeaderContent>
                {renderChevron()}
            </AccordionHeader>

            <AccordionContent
                id="accordion-content"
                isExpanded={expanded}
                contentHeight={contentHeight}
                role="region"
                aria-hidden={!expanded}
            >
                <ContentInner ref={contentRef}>{children}</ContentInner>
            </AccordionContent>
        </AccordionContainer>
    );
};
