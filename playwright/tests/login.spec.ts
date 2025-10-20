import { test, expect } from '@playwright/test';

test.describe('PlayJack Login', () => {
    const existingUser = {
        username: 'existinguser',
        password: 'ExistingPassword123!'
    };

    test('should successfully login with valid credentials', async ({ page }) => {
        await page.goto('/login');

        // Fill login form
        await page.fill('input[name="username"]', existingUser.username);
        await page.fill('input[name="password"]', existingUser.password);

        // Submit login
        await page.click('button[type="submit"]');

        // Verify successful login
        await expect(page).toHaveURL(/.*\/my-account/);
        await expect(page.locator('text=Welcome')).toBeVisible();
        await expect(page.locator(`text=${existingUser.username}`)).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.fill('input[name="username"]', 'invaliduser');
        await page.fill('input[name="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        await expect(page.locator('text=Invalid username or password')).toBeVisible();
    });
});