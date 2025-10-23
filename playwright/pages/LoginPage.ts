import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginNavigationButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
        this.loginNavigationButton = page.locator('#Header_loginBtn__HhRS_');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.usernameInput.isVisible();
    }

    async navigateToLogin(): Promise<void> {
        await this.loginNavigationButton.click();
        await this.waitForPageLoad();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async isLoginSuccessful(): Promise<boolean> {
        return this.page.url().includes('/my-account') ||
            await this.page.locator('text=Welcome').isVisible();
    }
}