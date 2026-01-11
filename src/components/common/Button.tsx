import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const getVariantStyles = (variant: ButtonProps['variant'] = 'primary', theme: any) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.gradient};
        color: white;
        border: none;
        &:hover {
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.md};
        }
      `;
    case 'secondary':
      return css`
        background: ${theme.colors.secondary};
        color: white;
        border: none;
        &:hover {
          background: ${theme.colors.primary};
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${theme.colors.secondary};
        border: 2px solid ${theme.colors.secondary};
        &:hover {
          background: ${theme.colors.secondary};
          color: white;
        }
      `;
    default:
      return css``;
  }
};

const getSizeStyles = (size: ButtonProps['size'] = 'md', theme: any) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.sm};
        font-size: 0.75rem;
      `;
    case 'lg':
      return css`
        padding: ${theme.spacing.sm} ${theme.spacing.lg};
        font-size: 1rem;
      `;
    case 'md':
    default:
      return css`
        padding: ${theme.spacing.xs} ${theme.spacing.md};
        font-size: 0.875rem;
      `;
  }
};

export const Button = styled.button<ButtonProps>`
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: ${({ theme }) => theme.transitions.default};
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${({ variant, theme }) => getVariantStyles(variant, theme)}
  ${({ size, theme }) => getSizeStyles(size, theme)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
