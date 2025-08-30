import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    private page: Page;
    public favouriteApps: Locator;
    public removeIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator for all favourite app tiles (adjust selector per your markup)
        this.favouriteApps = page.locator('//div[@id="favourite-apps"]/div');
        this.removeIcon = page.locator('//div[@data-testid="editmode-remove-app" and @data-focused="focused"]');
    }

    /**
     * Iterates favourite apps, tries to remove via cross icon; prints name if not removable.
     */
    async handleFavouriteAppsWithKeyboard(): Promise<void> {
        const count = await this.favouriteApps.count();
        console.log(`Total favourite apps: ${count}`);

        for (let i = 0; i < count; i++) {

            // Navigate to the desired app tile
            if (i > 0) {
                await this.page.keyboard.press('ArrowRight');
                await this.favouriteApps.nth(i).waitFor({ state: 'visible', timeout: 5000 });
            }

            let appName = '';
            try {
                appName = (await this.favouriteApps.nth(i).innerText()).trim();
            } catch {
                appName = `App #${i + 1}`;
            }

            console.log(`Processing app: ${appName}`);

            // Simulate long press Enter for edit mode, then wait for cross icon to appear
            await this.page.keyboard.down('Enter');
            await this.page.waitForTimeout(2000); // Just enough to simulate long press
            await this.page.keyboard.up('Enter');

            const crossIcon = this.favouriteApps
                .nth(i)
                .locator(this.removeIcon);

            let isCrossVisible = false;
            try {
                await crossIcon.waitFor({ state: 'visible', timeout: 5000 });
                isCrossVisible = await crossIcon.isVisible();
            } catch {
                isCrossVisible = false;
            }

            if (isCrossVisible) {
                console.log(`Remove icon visible for app: ${appName}`);

                let removed = false;
                for (let attempt = 1; attempt <= 3 && !removed; attempt++) {
                    console.log(`Attempt ${attempt} to remove app: ${appName}`);

                    await this.page.keyboard.press('ArrowDown');
                    await crossIcon.waitFor({ state: 'visible', timeout: 3000 }); // Make sure still visible before action
                    await this.page.keyboard.press('Enter');

                    try {
                        await expect(this.favouriteApps.nth(i)).not.toBeVisible({ timeout: 3000 });
                        removed = true;
                        console.log(`Removed app: ${appName} on attempt ${attempt}`);
                    } catch {
                        if (attempt < 3) {
                            console.warn(`App '${appName}' still visible, retrying (attempt ${attempt + 1})...`);
                        } else {
                            console.error(`Failed to remove app '${appName}' after 3 attempts.`);
                        }
                    }
                }

                // After 3 failed attempts, try ArrowUp + ArrowRight then try again on next app focus
                if (!removed) {
                    console.log(`Switching app after failed delete for ${appName}`);
                    await this.page.keyboard.press('ArrowUp');
                    await this.page.waitForTimeout(2000);
                    await this.page.keyboard.press('ArrowRight');
                    await this.favouriteApps.nth(i).waitFor({ state: 'visible', timeout: 3000 });

                    let newAppName = 'Next app';
                    try {
                        newAppName = (await this.favouriteApps.nth(i).innerText()).trim();
                    } catch { }

                    console.log(`Processing new app after switch: ${newAppName}`);
                    let newAppRemoved = false;
                    for (let extraAttempt = 1; extraAttempt <= 3 && !newAppRemoved; extraAttempt++) {
                        console.log(`Extra attempt ${extraAttempt} to remove app: ${newAppName}`);

                        await this.page.keyboard.press('ArrowDown');
                        await crossIcon.waitFor({ state: 'visible', timeout: 3000 });
                        await this.page.keyboard.press('Enter');

                        try {
                            await expect(this.favouriteApps.nth(i)).not.toBeVisible({ timeout: 3000 });
                            newAppRemoved = true;
                            console.log(`Removed app: ${newAppName} on extra attempt ${extraAttempt}`);
                        } catch {
                            if (extraAttempt < 3) {
                                console.warn(`App '${newAppName}' still visible, retrying (extra attempt ${extraAttempt + 1})...`);
                            } else {
                                console.error(`Failed to remove app '${newAppName}' after extra 3 attempts.`);
                            }
                        }
                    }
                }
            } else {
                console.log(`Cannot remove app (no remove icon): ${appName}`);
            }
        }

        console.log('Finished processing all favourite apps.');
    }


}
