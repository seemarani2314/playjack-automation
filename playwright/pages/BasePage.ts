import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    async waitForNetworkIdle(): Promise<void> {
        await this.page.waitForLoadState('networkidle');
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async scrollToTop(): Promise<void> {
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }

    async takeScreenshot(name: string): Promise<void> {
        await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    }

    async getTitle(): Promise<string> {
        return await this.page.title();
    }

    async getCurrentURL(): Promise<string> {
        return this.page.url();
    }

    abstract isPageLoaded(): Promise<boolean>;
}