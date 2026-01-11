import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button } from '@/components/common/Button'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles/theme'

const renderWithTheme = (component: any) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            {component}
        </ThemeProvider>
    )
}

describe('Button', () => {
    it('renders a button', () => {
        renderWithTheme(<Button>Click me</Button>)
        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
    })
})
