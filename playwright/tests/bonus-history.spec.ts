import { test, expect } from '@playwright/test';

test.describe('PlayJack Bonus History', () => {
    const testUser = {
        username: 'testuser',
        password: 'TestPassword123!'
    };

    test('should show registration bonus in account history', async ({ page }) => {
        // Login first
        await page.goto('/login');
        await page.fill('input[name="username"]', testUser.username);
        await page.fill('input[name="password"]', testUser.password);
        await page.click('button[type="submit"]');

        // Navigate to account history
        await page.goto('/my-account/account-history');

        // Switch to Bonuses tab
        await page.click('text=Bonuses');

        // Verify bonus history table
        await expect(page.locator('table')).toBeVisible();

        // Check for registration bonus
        await expect(page.locator('text=Registration - Endless')).toBeVisible();

        // Verify bonus amount
        await expect(page.locator('text=5,000')).toBeVisible();

        // Verify table structure and data
        const bonusRow = page.locator('table tbody tr').first();
        await expect(bonusRow.locator('td:nth-child(3)')).toContainText('Registration - Endless');
        await expect(bonusRow.locator('td:nth-child(5)')).toContainText('5,000');
    });
});