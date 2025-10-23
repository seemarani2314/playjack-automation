import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WelcomeGiftPage extends BasePage {
    readonly congratsText: Locator;
    readonly welcomeGiftText: Locator;
    readonly chipsText: Locator;
    readonly letsStartButton: Locator;

    constructor(page: Page) {
        super(page);
        this.congratsText = page.locator('text=Congrats!');
        this.welcomeGiftText = page.locator('text=Collect your welcome gift');
        this.chipsText = page.locator('text=10,000 CHIPS');
        this.letsStartButton = page.locator('button[type="button"]');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.congratsText.isVisible({ timeout: 15000 });
    }

    async waitForWelcomeGift(): Promise<void> {
        await this.congratsText.waitFor({ state: 'visible', timeout: 15000 });
        await this.welcomeGiftText.waitFor({ state: 'visible' });
        await this.chipsText.waitFor({ state: 'visible' });
        await this.letsStartButton.waitFor({ state: 'visible' });
    }

    async closeWelcomeGift(): Promise<void> {
        await this.letsStartButton.click();
        await this.congratsText.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async isVisible(): Promise<boolean> {
        return await this.congratsText.isVisible();
    }

    async verifyAllContent(): Promise<void> {
        await this.waitForWelcomeGift();
        // All content should be visible after waitForWelcomeGift
    }
}