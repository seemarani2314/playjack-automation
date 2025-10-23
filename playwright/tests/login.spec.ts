import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountPage } from '../pages/AccountPage';
import { CookieHandler } from '../../shared/utils/cookieHandler';

test.describe('PlayJack Login Flow', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let accountPage: AccountPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        accountPage = new AccountPage(page);

        await homePage.navigateToHomePage();
        await CookieHandler.acceptAllCookies(page);
    });

    test('should login with registered username and verify username matches', async ({ page }) => {
        const registeredUsername = 'user1234eev';
        const password = 'Test@123';

        // Step 1: Navigate to login
        await loginPage.navigateToLogin();
        await loginPage.waitForPageLoad();

        // Step 2: Fill and submit login form
        await loginPage.login(registeredUsername, password);

        // Step 3: Verify login success and redirect
        await expect(page).toHaveURL(/.*\/my-account/);
        await expect(accountPage.welcomeText).toBeVisible();

        // Step 4: Verify username matches the registered username
        await accountPage.verifyUserLoggedIn(registeredUsername);

        console.log(`✓ Login successful! Verified username: ${registeredUsername}`);

        // Step 5: Logout
        await accountPage.logout();
        await expect(loginPage.loginNavigationButton).toBeVisible();

        console.log('✓ Logout successful');
    });

    test('should show error for invalid login credentials', async ({ page }) => {
        await loginPage.navigateToLogin();
        await loginPage.login('invaliduser', 'wrongpassword');

        // Verify error message
        await expect(page.locator('text=Invalid username or password')).toBeVisible();
    });
});