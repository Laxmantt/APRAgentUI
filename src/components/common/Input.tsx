import React from 'react';
import styled from 'styled-components';




const InputWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.border)};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.error};
`;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, wrapperClassName, wrapperStyle, className, ...props }, ref) => {
    return (
      <InputWrapper className={wrapperClassName} style={wrapperStyle}>
        {label && <StyledLabel>{label}</StyledLabel>}
        <StyledInput
          ref={ref}
          hasError={!!error}
          className={className}
          {...props}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
