import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserData } from '../types';

export class RegistrationPage extends BasePage {
    readonly usernameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('input[name="username"]');
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitButton = page.locator('button[class="btn "]');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.usernameInput.isVisible();
    }

    async fillRegistrationForm(userData: UserData): Promise<void> {
        await this.usernameInput.fill(userData.username);
        await this.emailInput.fill(userData.email);
        await this.passwordInput.fill(userData.password);
    }

    async submitRegistration(): Promise<void> {
        await this.submitButton.click();
    }

    async completeRegistration(userData: UserData): Promise<void> {
        await this.fillRegistrationForm(userData);
        await this.submitRegistration();
    }
}