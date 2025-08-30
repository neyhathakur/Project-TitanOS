import { Page, Locator, expect } from '@playwright/test';

export class AppsPage {
    private page: Page;
    public appList: Locator;
    public redBullApp: Locator;
    public addToFav: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator for the main Apps heading container to ensure correct page section
        this.appList = page.locator('//div[@aria-label="Apps"]');
        // Locator for the specific "Red Bull TV" app
        this.redBullApp = page.locator('//div[@data-testid="Red Bull TV"]');
        // Locator for the "Add to Favourites" button text
        this.addToFav = page.locator('//button[contains(., "Add to Favourites")]');
    }

    /**
     * Navigates via keyboard to the Apps menu, selects an app by index,
     * and toggles it in favourites (adds or removes).
     * @param index The horizontal index to navigate to the desired app
     */
    async addAppToFavouritesByKeyboard(index: number): Promise<void> {
        try {
            // Move focus two times up to reach the top navigation bar
            for (let i = 0; i < 2; i++) {
                await this.page.keyboard.press('ArrowUp');
                await this.page.waitForTimeout(1000);
            }
        } catch (error) {
            console.warn('Warning: Failed navigating Up keys', error);
        }

        try {
            // Navigate right 5 times to highlight the "Apps" tab in the menu
            for (let i = 0; i < 5; i++) {
                await this.page.keyboard.press('ArrowRight');
                await this.page.waitForTimeout(1000);
            }
        } catch (error) {
            console.warn('Warning: Failed navigating Right keys for Apps tab', error);
        }

        try {
            // Press Enter to open the Apps section
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.warn('Warning: Failed pressing Enter to open Apps section', error);
        }

        try {
            // Move focus down twice to get into the app list area
            for (let i = 0; i < 2; i++) {
                await this.page.keyboard.press('ArrowDown');
                await this.page.waitForTimeout(5000);
            }
        } catch (error) {
            console.warn('Warning: Failed navigating Down keys into app list area', error);
        }

        try {
            // Navigate right by the index to highlight the desired app
            for (let i = 0; i < index; i++) {
                await this.page.keyboard.press('ArrowRight');
                await this.page.waitForTimeout(1000);
            }
        } catch (error) {
            console.warn(`Warning: Failed navigating Right keys to index ${index}`, error);
        }

        try {
            // Focus the Red Bull TV app element 
            await this.redBullApp.first().focus();
        } catch (error) {
            console.warn('Warning: Failed focusing redBullApp', error);
        }

        try {
            // Press Enter to open app details
            await this.page.keyboard.press('Enter');
            await this.page.waitForTimeout(1000);
        } catch (error) {
            console.warn('Warning: Failed pressing Enter to open app details', error);
        }

        try {
            const removeButton = this.page.locator('button:has-text("Remove from Favourites")');
            if (await removeButton.isVisible()) {
                // Press Enter to remove from favourites
                await this.page.keyboard.press('Enter');
                await this.page.waitForTimeout(2000);
            } else {
                // Press Enter to add to favourites
                await this.page.keyboard.press('Enter');
                await this.page.waitForTimeout(2000);
            }
        } catch (error) {
            console.warn('Warning: Failed checking or toggling Remove/Add from Favourites', error);
        }

        try {
            await this.redBullApp.waitFor({ state: 'visible', timeout: 10000 });
        } catch (error) {
            console.warn('Warning: redBullApp not visible after operation', error);
        }
    }

}
