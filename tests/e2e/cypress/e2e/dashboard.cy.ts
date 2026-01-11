describe('Dashboard', () => {
    beforeEach(() => {
        // Mock login by visiting login and clicking through
        cy.visit('/login');
        cy.get('input[placeholder="Enter your email"]').type('admin@example.com');
        cy.get('input[placeholder="Enter your password"]').type('password123');
        cy.get('button').contains('Log In').click();
        cy.visit('/dashboard');
    });

    it('should display dashboard statistics', () => {
        // These values match the mock data
        cy.contains('Total Apps').parent().should('contain', '45');
        cy.contains('Assessed').parent().should('contain', '12');
    });

    it('should display recent activity', () => {
        cy.contains('Recent Activity');
        // Check for at least one activity item
        cy.get('div').contains('Admin');
    });

    it('should navigate to reports', () => {
        cy.get('nav').contains('Reports').click();
        cy.url().should('include', '/reports');
        cy.contains('Reports & Analytics');
    });
});
