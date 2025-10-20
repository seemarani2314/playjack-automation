import { test, expect } from '@playwright/test';
import { UserData } from '../../shared/types';

test.describe('PlayJack Registration', () => {
    let testUser: UserData;

    test.beforeEach(() => {
        const timestamp = Date.now();
        testUser = {
            username: `playwrightuser${timestamp}`,
            email: `playwright${timestamp}@example.com`,
            password: 'Playwright123!',
            firstName: 'Playwright',
            lastName: 'Test',
            dateOfBirth: '1990-01-01'
        };
    });

    test('should successfully register a new user', async ({ page }) => {
        await page.goto('/register');

        // Fill registration form
        await page.fill('input[name="firstName"]', testUser.firstName);
        await page.fill('input[name="lastName"]', testUser.lastName);
        await page.fill('input[name="email"]', testUser.email);
        await page.fill('input[name="username"]', testUser.username);
        await page.fill('input[name="password"]', testUser.password);
        await page.fill('input[name="confirmPassword"]', testUser.password);
        await page.fill('input[name="dateOfBirth"]', testUser.dateOfBirth);

        // Accept terms
        await page.check('input[name="terms"]');

        // Submit registration
        await page.click('button[type="submit"]');

        // Verify successful registration
        await expect(page).toHaveURL(/.*\/my-account/);
        await expect(page.locator('text=Welcome')).toBeVisible();
        await expect(page.locator(`text=${testUser.username}`)).toBeVisible();
    });
});