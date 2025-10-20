describe('Fixed Custom Commands', () => {
    it('should generate random user using custom command', () => {
        cy.generateRandomUser().then((user) => {
            expect(user.username).to.include('testuser');
            expect(user.email).to.include('@example.com');
            expect(user.password).to.equal('TestPassword123!');
        });
    });

    it('should use generated user in registration', () => {
        cy.generateRandomUser().then((user) => {
            cy.visit('/register');
            cy.get('input[name="username"]').type(user.username);
            cy.get('input[name="email"]').type(user.email);
            cy.get('input[name="password"]').type(user.password);
            // Continue with other form fields...
        });
    });
});