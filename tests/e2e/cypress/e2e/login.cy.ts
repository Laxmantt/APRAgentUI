describe('Login Flow', () => {
    it('should redirect to login page when accessing protected route', () => {
        cy.visit('/dashboard');
        cy.url().should('include', '/login');
    });

    it('should allow user to login and redirect back', () => {
        cy.visit('/login');

        // Check if elements exist
        cy.contains('Welcome Back');
        cy.get('input[placeholder="Enter your email"]').type('admin@example.com');
        cy.get('input[placeholder="Enter your password"]').type('password123');

        // Click login
        cy.get('button').contains('Log In').click();

        // Should verify redirect to home/dashboard
        cy.url().should('include', '/');

        // Verify auth state (e.g., by checking if "Assessments" link is visible/clickable without redirect)
        cy.contains('Assessments').click();
        cy.url().should('include', '/assessment');
    });
});
