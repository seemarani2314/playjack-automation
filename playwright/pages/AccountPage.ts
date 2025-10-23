import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
    readonly accountNavigationButton: Locator;
    readonly userName: Locator;
    readonly welcomeText: Locator;
    readonly logoutButton: Locator;
    readonly balance: Locator;

    constructor(page: Page) {
        super(page);
        this.accountNavigationButton = page.locator('span[role="button"]');
        this.userName = page.locator('.account-username');
        this.welcomeText = page.locator('text=Welcome');
        this.logoutButton = page.locator('button[title="Logout"]');
        this.balance = page.locator('div[data-qa="balance"]');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.welcomeText.isVisible();
    }

    async navigateToAccount(): Promise<void> {
        await this.accountNavigationButton.click();
        await this.waitForPageLoad();
    }

    async getUserName(): Promise<string> {
        const usernameText = await this.userName.textContent();
        return usernameText ? usernameText.trim() : '';
    }

    async verifyUserLoggedIn(expectedUsername: string): Promise<void> {
        await this.navigateToAccount();
        const actualUsername = await this.getUserName();

        if (actualUsername !== expectedUsername) {
            throw new Error(`Username mismatch! Expected: "${expectedUsername}", Actual: "${actualUsername}"`);
        }

        console.log(`✓ Verified username: ${actualUsername}`);
    }

    async logout(): Promise<void> {
        await this.logoutButton.click();
        // Wait for logout to complete
        await this.page.waitForURL(/.*\/login|.*playjack\.com\/?$/);
    }

    async isLoggedOut(): Promise<boolean> {
        return await this.page.locator('#Header_loginBtn__HhRS_').isVisible();
    }

    async getBalance(): Promise<string> {
        return await this.balance.textContent() || '';
    }
}