import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TermsPage } from '../pages/TermsPage';
import { WelcomeGiftPage } from '../pages/WelcomeGiftPage';
import { AccountPage } from '../pages/AccountPage';
import { LoginPage } from '../pages/LoginPage';
import { UserGenerator } from '../../shared/utils/userGenerator';
import { CookieHandler } from '../../shared/utils/cookieHandler';

test.describe('PlayJack Bonus History', () => {
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

    test('should show registration bonus in account history', async ({ page }) => {
        await homePage.clickSignUp();
        await registrationPage.waitForPageLoad();
        await registrationPage.completeRegistration(testUser);
        page.on('dialog', dialog => dialog.dismiss().catch(() => {}));
        await termsPage.acceptTermsAndContinue();
        await welcomeGiftPage.verifyAllContent();
        await welcomeGiftPage.closeWelcomeGift();
        page.on('dialog', dialog => dialog.dismiss().catch(() => {}));
        await accountPage.navigateToAccount();

        // Click on the Account Balance button
        await accountPage.navigateToAccountBalance();

        // Navigate to History tab
        await accountPage.navigateToHistory();

        // Switch to Bonuses tab
        await page.click('text=BONUS');

        // Verify Registration Description
        await expect(page.locator('(//td[normalize-space()="Welcome Aboard! Registration Bonus - 5000 chips"])[1]')).toBeVisible();
        await expect(page.locator('//td[@class="winnnings"][normalize-space()="5,000"]')).toBeVisible();
        console.log('✓ Registration bonus verification completed');

        //Verify Login Description
        await expect(page.locator('(//td[normalize-space()="Daily Login Bonus"])[1]')).toBeVisible();
        await expect(page.locator('(//td[@class="balance start"][normalize-space()="5,000"])[1]')).toBeVisible();
        console.log('✓ Daily login bonus verification completed');

        //Verify that Registration Balance and Login Balance is same
        const winningsValue = await page.locator('//td[@class="winnnings"][normalize-space()="5,000"]').textContent();
        const balanceValue = await page.locator('(//td[@class="balance start"][normalize-space()="5,000"])[1]').textContent();

        expect(winningsValue).toBe(balanceValue);
        console.log(`✓ Both values match: ${winningsValue}`);
    });
});