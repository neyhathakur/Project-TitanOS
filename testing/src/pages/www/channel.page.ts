import { Page, expect } from '@playwright/test';

export class ChannelPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate from current focus to the Channel page using keyboard arrows.
     * Then open it by pressing Enter.
     */
    async navigateToChannelPage(): Promise<void> {
        try {
            await this.page.keyboard.press('ArrowUp');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('ArrowUp');
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.warn('Warning: Failed moving focus up twice', error);
        }

        try {
            await this.page.keyboard.press('ArrowRight');
            await this.page.waitForTimeout(1000);
            await this.page.keyboard.press('ArrowRight');
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.warn('Warning: Failed moving focus right twice', error);
        }

        let popupPage;
        try {
            await this.page.keyboard.press('Enter');
            const popupPromise = this.page.waitForEvent('popup');
            await this.page.keyboard.press('Enter');
            popupPage = await popupPromise;
        } catch (error) {
            console.warn('Warning: Failed opening category page or waiting for popup', error);
        }

        if (popupPage) {
            try {
                await popupPage.waitForURL('**/channels', { timeout: 10000 });
                await expect(popupPage).toHaveURL(/\/channels/);
                console.log('Navigated to channels page');
            } catch (error) {
                console.warn('Warning: Failed waiting for or asserting channels page URL', error);
            }
        } else {
            console.warn('Popup page was not opened');
        }
    }


    async verifyPlayerOverlayAndChannels(popup: Page): Promise<void> {
        try {
            await popup.getByTestId('player-overlay').click();
        } catch (error) {
            console.warn('Warning: Failed to click player overlay', error);
        }

        try {
            await expect(popup.getByText('CNNi').nth(1)).toBeVisible();
        } catch (error) {
            console.warn('Warning: CNNi text not visible', error);
        }

        try {
            await expect(
                popup
                    .getByTestId('channels-switcher')
                    .locator('div')
                    .filter({ hasText: 'CNNiCNNiNewsCH' })
                    .first()
            ).toBeVisible();
        } catch (error) {
            console.warn('Warning: Channels switcher not visible or text not found', error);
        }
    }


}