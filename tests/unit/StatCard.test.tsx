import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '@/styles/theme';

const renderWithTheme = (component: React.ReactNode) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            {component}
        </ThemeProvider>
    );
};

describe('StatCard', () => {
    it('renders label and value', () => {
        renderWithTheme(<StatCard label="Total Apps" value={42} />);
        expect(screen.getByText('Total Apps')).toBeTruthy(); // Using truthy as jest-dom might not be fully loaded in unit env without setup
        expect(screen.getByText('42')).toBeTruthy();
    });
});
