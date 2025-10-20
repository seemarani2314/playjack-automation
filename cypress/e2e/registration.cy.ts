describe('PlayJack Registration', () => {
    let testUser: any;

    beforeEach(() => {
        cy.generateRandomUser().then((user) => {
            testUser = user;
        });
    });

    it('should successfully register a new user', () => {
        cy.visit('/register');

        // Fill registration form
        cy.get('input[name="firstName"]').type(testUser.firstName);
        cy.get('input[name="lastName"]').type(testUser.lastName);
        cy.get('input[name="email"]').type(testUser.email);
        cy.get('input[name="username"]').type(testUser.username);
        cy.get('input[name="password"]').type(testUser.password);
        cy.get('input[name="confirmPassword"]').type(testUser.password);
        cy.get('input[name="dateOfBirth"]').type(testUser.dateOfBirth);

        // Accept terms and conditions
        cy.get('input[name="terms"]').check({ force: true });

        // Submit registration
        cy.get('button[type="submit"]').click();

        // Verify successful registration
        cy.url().should('include', '/my-account');
        cy.contains('Welcome').should('be.visible');
        cy.contains(testUser.username).should('be.visible');
    });
});