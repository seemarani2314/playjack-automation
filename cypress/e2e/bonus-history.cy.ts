describe('PlayJack Bonus History', () => {
    const testUser = {
        username: 'testuser',
        password: 'TestPassword123!'
    };

    it('should show registration bonus in account history', () => {
        // Login first
        cy.login(testUser.username, testUser.password);

        // Navigate to account history
        cy.visit('/my-account/account-history');

        // Switch to Bonuses tab
        cy.contains('Bonuses').click();

        // Verify bonus history table exists
        cy.get('table').should('be.visible');

        // Check for registration bonus
        cy.contains('Registration - Endless').should('be.visible');

        // Verify bonus amount (assuming 5,000 as per screenshot)
        cy.contains('5,000').should('be.visible');

        // Verify the bonus reference format
        cy.get('table tbody tr').first()
            .within(() => {
                cy.get('td').eq(2).should('contain', 'Registration - Endless');
                cy.get('td').eq(4).should('contain', '5,000');
            });
    });
});