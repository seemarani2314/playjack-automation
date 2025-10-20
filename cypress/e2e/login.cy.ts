describe('PlayJack Login', () => {
    const existingUser = {
        username: 'existinguser',
        password: 'ExistingPassword123!'
    };

    it('should successfully login with valid credentials', () => {
        cy.visit('/login');

        // Fill login form
        cy.get('input[name="username"]').type(existingUser.username);
        cy.get('input[name="password"]').type(existingUser.password);

        // Submit login
        cy.get('button[type="submit"]').click();

        // Verify successful login
        cy.url().should('include', '/my-account');
        cy.contains('Welcome').should('be.visible');
        cy.contains(existingUser.username).should('be.visible');
    });

    it('should show error with invalid credentials', () => {
        cy.visit('/login');

        cy.get('input[name="username"]').type('invaliduser');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.contains('Invalid username or password').should('be.visible');
    });
});