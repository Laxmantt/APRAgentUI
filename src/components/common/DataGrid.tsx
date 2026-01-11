import styled from 'styled-components';

interface DataGridProps {
  columns?: number;
  gap?: string;
  minWidth?: string;
}

export const DataGrid = styled.div<DataGridProps>`
  display: grid;
  gap: ${({ theme, gap }) => gap || theme.spacing.md};
  
  /* Default to responsive grid if minWidth is provided, else use static columns */
  grid-template-columns: ${({ columns, minWidth }) =>
    minWidth
      ? `repeat(auto-fit, minmax(${minWidth}, 1fr))`
      : `repeat(${columns || 1}, 1fr)`
  };

  width: 100%;
`;
