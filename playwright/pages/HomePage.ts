import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    readonly signUpButton: Locator;
    readonly loginButton: Locator;
    readonly cookieBanner: Locator;

    constructor(page: Page) {
        super(page);
        this.signUpButton = page.locator('#Header_signupBtn__WxllR');
        this.loginButton = page.locator('div[data-qa="login_btn"]');
        this.cookieBanner = page.locator('button:has-text("Accept All Cookies")');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.signUpButton.isVisible();
    }

    async navigateToHomePage(): Promise<void> {
        await this.navigateTo('https://playjack.com/');
        await this.waitForPageLoad();
    }

    async clickSignUp(): Promise<void> {
        await this.signUpButton.click();
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async acceptCookies(): Promise<void> {
        if (await this.cookieBanner.isVisible({ timeout: 5000 })) {
            await this.cookieBanner.click();
        }
    }
}