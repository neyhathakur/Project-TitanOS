import * as dotenv from 'dotenv';
dotenv.config();
import { test, expect } from '@playwright/test';
import { AppsPage } from '../../pages/www/apps.page';
import { SearchPage } from '../../pages/www/search.page';
import { ChannelPage } from '../../pages/www/channel.page';
import { HomePage } from '../../pages/www/home.page';
import { log } from '../../utils/logger';


test.describe('Titanos tv E2E Test', () => {

    // Navigate to the URL before each test to ensure a clean start
    test.beforeEach(async ({ page }) => {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL environment variable is not set.');
        }
        await page.goto(baseUrl, { waitUntil: 'networkidle' });
    });

    const timestamp = new Date().toISOString().replace(/:/g, '-');

    // Test: Add an app to favourites on home page via the Apps page using keyboard navigation
    test('Add app to home page favourites from apps page', async ({ page },
        testInfo) => {
        const appsPage = new AppsPage(page);

        // Add the app to favourites by keyboard navigation
        await appsPage.addAppToFavouritesByKeyboard(7);

        // Verify the added app (redBullApp) is visible on UI
        await expect(appsPage.redBullApp).toBeVisible({ timeout: 10000 });
        log("Successfully pinned the app to the Home Page favourites.");
        await page.screenshot({
            path: `screenshots/${testInfo.title}_${timestamp}.png`

        });
    });

    // Test: Run full search with keyboard navigation and validate category & counts
    test('Search and category navigation flow', async ({ page },
        testInfo) => {
        const searchPage = new SearchPage(page);

        //Stored categories in Array to validate.
        const sections = ['Movies', 'TV Shows', 'Apps', 'Channels', 'Games', 'Sport', 'YouTube'];

        // Performed full search and navigation flow with the term 'crime'
        await searchPage.fullSearchAndNavigateFlow('crime', sections);
        log("Search categories are available to use");
        await page.screenshot({
            path: `screenshots/${testInfo.title}_${timestamp}.png`
        });
    });


    test('Channel page navigation and player overlay validation with keyboard', async ({ page },
        testInfo) => {
        const channelPage = new ChannelPage(page);

        // Prepare to wait for popup event before triggering it
        const popupPromise = page.waitForEvent('popup');

        // Use keyboard to navigate to Channel page
        await channelPage.navigateToChannelPage();

        // Wait for the popup page to open after navigation
        const popupPage = await popupPromise;

        // Verify popup player overlay and channel elements using the popup page context
        await channelPage.verifyPlayerOverlayAndChannels(popupPage);
        log("Channel page is available to use");
        await page.screenshot({
            path: `screenshots/${testInfo.title}_${timestamp}.png`
        });
    });

    test('Long-press Enter to remove or log favourite apps using keyboard', async ({ page },
        testInfo) => {
        const homePage = new HomePage(page);
        await page.waitForLoadState('networkidle');
        await homePage.handleFavouriteAppsWithKeyboard();
        await page.screenshot({
            path: `screenshots/${testInfo.title}_${timestamp}.png`
        });
    });


});
