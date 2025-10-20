// <reference types="cypress" />

// Define the UserData interface
interface UserData {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
}

declare global {
    namespace Cypress {
        interface Chainable {
            generateRandomUser(): Chainable<UserData>;
            login(username: string, password: string): Chainable<void>;
        }
    }
}

// Custom command implementation
Cypress.Commands.add('generateRandomUser', () => {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);

    const userData: UserData = {
        username: `testuser${timestamp}${randomNum}`,
        email: `test${timestamp}${randomNum}@example.com`,
        password: 'TestPassword123!',
        firstName: 'Test',
        lastName: 'User',
        dateOfBirth: '1990-01-01'
    };

    // Wrap the userData in cy.wrap() to make it Chainable
    return cy.wrap(userData);
});

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/login');
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

// Prevent TypeScript errors
export {};