import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TermsPage extends BasePage {
    readonly termsCheckbox: Locator;
    readonly continueButton: Locator;
    readonly termsContent: Locator;

    constructor(page: Page) {
        super(page);
        this.termsCheckbox = page.locator('.checkbox');
        this.continueButton = page.locator('button[type="submit"]');
        this.termsContent = page.locator('//h1[contains(text(),"To Continue You Must Read And Accept Our Terms And")]');
    }

    async isPageLoaded(): Promise<boolean> {
        return await this.termsContent.isVisible({ timeout: 10000 });
    }

    async scrollToBottom(): Promise<void> {
        await super.scrollToBottom();
    }

    async acceptTerms(): Promise<void> {
        await this.termsCheckbox.check({ force: true });
    }

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    async acceptTermsAndContinue(): Promise<void> {
        await this.scrollToBottom();
        await this.acceptTerms();
        await this.clickContinue();
    }

    async isCheckboxChecked(): Promise<boolean> {
        return await this.termsCheckbox.isChecked();
    }
}