import { Page } from '@playwright/test';

export class CookieHandler {
    static async    acceptAllCookies(page: Page):Promise<boolean> {
        try {
            const selectors = [
                'button:has-text("Accept All Cookies")',
                'button:has-text("Accept All")',
                '[aria-label*="accept" i]',
                '.cookie-accept',
                '#accept-cookies'
            ];

            for (const selector of selectors) {
                const button = page.locator(selector);
                if (await button.isVisible({ timeout: 2000 })) {
                    await button.click();
                    console.log('Clicked cookie accept button with selector:', selector);
                    await page.waitForTimeout(1000); // Wait for banner to disappear
                    return true;
                }
            }
            console.log('No cookie banner found');
            return false;
        } catch (error) {
            console.log('Cookie banner not present or already handled');
            return false;
        }
    }

    static async rejectAllCookies(page: Page): Promise<boolean>  {
        try {
            const selectors = [
                'button:has-text("Reject All")',
                'button:has-text("Reject")',
                '[aria-label*="reject" i]',
                '.cookie-reject',
                '#reject-cookies'
            ];

            for (const selector of selectors) {
                const button = page.locator(selector);
                if (await button.isVisible({ timeout: 2000 })) {
                    await button.click();
                    console.log('Clicked cookie reject button with selector:', selector);
                    await page.waitForTimeout(1000);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log('Cookie reject button not found');
            return false;
        }
    }

    static async closeCookieBanner(page: Page): Promise<boolean>  {
        try {
            const closeSelectors = [
                'button:has-text("x")',
                '.close-cookies',
                '[aria-label="close"]',
                '.cookie-close'
            ];

            for (const selector of closeSelectors) {
                const button = page.locator(selector);
                if (await button.isVisible({ timeout: 2000 })) {
                    await button.click();
                    console.log('Closed cookie banner with selector:', selector);
                    await page.waitForTimeout(1000);
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.log('Cookie close button not found');
            return false;
        }
    }
}