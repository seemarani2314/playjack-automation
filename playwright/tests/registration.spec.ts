import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TermsPage } from '../pages/TermsPage';
import { WelcomeGiftPage } from '../pages/WelcomeGiftPage';
import { AccountPage } from '../pages/AccountPage';
import { LoginPage } from '../pages/LoginPage';
import { UserGenerator } from '../../shared/utils/userGenerator';
import { CookieHandler } from '../../shared/utils/cookieHandler';

test.describe('PlayJack Registration Flow', () => {
    let homePage: HomePage;
    let registrationPage: RegistrationPage;
    let termsPage: TermsPage;
    let welcomeGiftPage: WelcomeGiftPage;
    let accountPage: AccountPage;
    let loginPage: LoginPage;
    let testUser: any;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        registrationPage = new RegistrationPage(page);
        termsPage = new TermsPage(page);
        welcomeGiftPage = new WelcomeGiftPage(page);
        accountPage = new AccountPage(page);
        loginPage = new LoginPage(page);

        // Generate test user
        testUser = UserGenerator.generateUserData();

        // Navigate to home page and handle cookies
        await homePage.navigateToHomePage();
        await CookieHandler.acceptAllCookies(page);
    });

    test('should complete user registration successfully', async ({ page }) => {
        // Step 1: Navigate to registration
        await homePage.clickSignUp();
        await registrationPage.waitForPageLoad();

        // Step 2: Fill and submit registration form
        await registrationPage.completeRegistration(testUser);

        // Step 6: Set up dialog handler for any alerts
        page.on('dialog', dialog => dialog.dismiss().catch(() => {}));

        // Step 3: Accept terms and conditions
        await termsPage.acceptTermsAndContinue();

        // Step 4: Verify registration success
        await page.waitForURL(/.*registrationSuccess=true/);
        await expect(page).toHaveURL(/.*registrationSuccess=true/);

        // Step 5: Handle welcome gift
        await welcomeGiftPage.verifyAllContent();
        await welcomeGiftPage.closeWelcomeGift();

        // Step 6: Set up dialog handler for any alerts
        page.on('dialog', dialog => dialog.dismiss().catch(() => {}));

        // Step 7: Verify user is logged in and on account page
        await accountPage.verifyUserLoggedIn(testUser.username);

        console.log(`✓ Registration successful for user: ${testUser.username}`);

        // NEW: Logout after registration
        await accountPage.logout();
        await expect(loginPage.loginNavigationButton).toBeVisible();

        // NEW: Login again with the same credentials to verify username
        console.log('Verifying username via login...');
        await loginPage.navigateToLogin();
        await loginPage.login(testUser.username, testUser.password);

        // Verify username matches the registered username
        await accountPage.verifyUserLoggedIn(testUser.username);

        console.log(`✓ Username verification successful: ${testUser.username}`);

        // Final logout
        await accountPage.logout();
        await expect(loginPage.loginNavigationButton).toBeVisible();
    });

    test('should handle registration with existing username', async ({ page }) => {
        // First registration
        await homePage.clickSignUp();
        await registrationPage.completeRegistration(testUser);
        await termsPage.acceptTermsAndContinue();
        await welcomeGiftPage.closeWelcomeGift();
        await accountPage.logout();

        // Try to register with same username again
        await homePage.clickSignUp();
        await registrationPage.completeRegistration(testUser);

        // Should show error for duplicate username
        await expect(page.locator('text=Username already exists')).toBeVisible();
    });

    test('should validate registration form fields', async ({ page }) => {
        // Implementation for form validation tests
    });
});