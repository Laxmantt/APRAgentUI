import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ReportList } from '@/components/reports/ReportList'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles/theme'
import { ReportData } from '@/types/report.types'

const renderWithTheme = (component: any) => {
    return render(
        <ThemeProvider theme={lightTheme}>
            {component}
        </ThemeProvider>
    )
}

const mockReports: ReportData[] = [
    {
        id: '1',
        name: 'Test Report 1',
        generatedDate: '2023-01-01',
        type: 'Risk Analysis',
        format: 'PDF',
        size: '1MB',
        description: 'Test'
    },
    {
        id: '2',
        name: 'Test Report 2',
        generatedDate: '2023-01-02',
        type: 'Wave Plan',
        format: 'Excel',
        size: '2MB',
        description: 'Test'
    }
]

describe('ReportList', () => {
    it('renders list of reports', () => {
        renderWithTheme(<ReportList reports={mockReports} onDownload={jest.fn()} />)
        expect(screen.getByText('Test Report 1')).toBeInTheDocument()
        expect(screen.getByText('Test Report 2')).toBeInTheDocument()
    })

    it('renders empty state when no reports', () => {
        renderWithTheme(<ReportList reports={[]} onDownload={jest.fn()} />)
        expect(screen.getByText('No reports found. Create one to get started.')).toBeInTheDocument()
    })

    it('calls onDownload when button clicked', () => {
        const handleDownload = jest.fn()
        renderWithTheme(<ReportList reports={mockReports} onDownload={handleDownload} />)

        const buttons = screen.getAllByText('Download')
        fireEvent.click(buttons[0])
        expect(handleDownload).toHaveBeenCalledWith('1')
    })
})
